import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { NavigationSlice } from "./NavigationSlice";
import { IAppState } from "../../app/IAppState";
import { INavigationState } from "./INavigationState";
import { CookieServiceContext } from "../../services/cookie/CookieServiceContext";

export class Video extends React.PureComponent<INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; }> {

    public constructor(props: INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; }) {
        super(props);
        this.props = props;
        this.getVideoRes = this.getVideoRes.bind(this);
        this.setVideoTitle = this.setVideoTitle.bind(this);
        this.toggleVideoLoaded = this.toggleVideoLoaded.bind(this);
    }

    public props: INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; };

    public static contextType = CookieServiceContext;

    public componentDidMount() {
        window.addEventListener("resize", this.getVideoRes);
        window.addEventListener("popstate", this.setVideoTitle);

        const videoRes = this.context.getCookie("Video-Resolution");
        (videoRes !== "") ? this.props.setVideoRes(videoRes) : this.props.setVideoRes(this.getVideoRes());   

        this.setVideoTitle();
    }   

    public componentWillUnmount() {
        window.removeEventListener("resize", this.getVideoRes);
        window.removeEventListener("popstate", this.setVideoTitle);
    }

    private getVideoRes(): string {
        const windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let videoRes = "";

        switch (true) {
            case windowWidth < 768:
                videoRes = "360";
                break;
            case windowWidth >= 768 && windowWidth < 992:
                videoRes = "540";
                break;
            case windowWidth >= 992 && windowWidth < 1200:
                videoRes = "720";
                break;
            case windowWidth >= 1200:
                videoRes = "1080";
                break;
        }

        this.context.setCookie("Video-Resolution", videoRes, 7, "/", "strict");

        return videoRes;
    }      

    private setVideoTitle(): void {
        if (!this.props.isNavigationCollapsed) {
            this.props.toggleNavigation(true);
        }

        switch (true) {
            case (this.props.route.history.location.pathname === "/"):
                this.props.setVideoTitle("home");
                break;
            case (this.props.route.history.location.pathname.toLowerCase().startsWith("/portfolio")):
                this.props.setVideoTitle("portfolio");
                break;
            case (this.props.route.history.location.pathname.toLowerCase().startsWith("/about")):
                this.props.setVideoTitle("about");
                break;
            case (this.props.route.history.location.pathname.toLowerCase().startsWith("/contact")):
                this.props.setVideoTitle("contact");
                break;
            default:
                this.props.setVideoTitle("about");
        }
    }

    private toggleVideoLoaded(): void {
        this.props.toggleVideoLoaded(true);
    }

    public render() {
        return (
            <>
                <video
                    onLoadedData={this.toggleVideoLoaded}
                    className={
                        (this.props.isVideoLoaded && this.props.isNavigationCollapsed)
                            ? "min-vw-100 min-vh-100 position-fixed"
                            : "d-none"
                    }
                    preload="metadata"
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{ objectFit: "cover" }}
                    src={"/video/" + this.props.videoTitle + "_" + this.props.videoRes + ".mp4"}
                />
                <div
                    className="min-vw-100 min-vh-100 position-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                </div> 
            </>
        );
    }
};

export default connect((state: IAppState) => state.navigation, NavigationSlice.actions)(Video);