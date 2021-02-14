import * as React from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { IAppState } from "../../app/IAppState";
import { NavigationSlice } from "./NavigationSlice";
import { INavigationState } from "./INavigationState";

export class VideoPoster extends React.PureComponent<INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; }> {

    public constructor(props: INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; }) {
        super(props);
        this.props = props;
        this.setVideoTitle = this.setVideoTitle.bind(this);
    }

    public props: INavigationState & typeof NavigationSlice.actions & { route: RouteComponentProps; };

    public componentDidMount() {
        window.addEventListener("popstate", this.setVideoTitle);
        this.setVideoTitle();
    }

    public componentWillUnmount() {
        window.removeEventListener("popstate", this.setVideoTitle);
    }

    private setVideoTitle(): void {
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

    public render() {
        return (
            <>
                <Image
                    className={
                        (this.props.videoTitle === "home")
                            ? "d-inline-block min-vw-100 min-vh-100 position-fixed"
                            : "d-none"
                    }
                    src="/img/home_poster.jpg"
                    style={{ objectFit: "cover" }}
                />
                <Image
                    className={
                        (this.props.videoTitle === "portfolio")
                            ? "d-inline-block min-vw-100 min-vh-100 position-fixed"
                            : "d-none"
                    }
                    src="/img/portfolio_poster.jpg"
                    style={{ objectFit: "cover" }}
                />
                <Image
                    className={
                        (this.props.videoTitle === "about")
                            ? "d-inline-block min-vw-100 min-vh-100 position-fixed"
                            : "d-none"
                    }
                    src="/img/about_poster.jpg"
                    style={{ objectFit: "cover" }}
                />
                <Image
                    className={
                        (this.props.videoTitle === "contact")
                            ? "d-inline-block min-vw-100 min-vh-100 position-fixed"
                            : "d-none"
                    }
                    src="/img/contact_poster.jpg"
                    style={{ objectFit: "cover" }}
                />
            </>   
        );
    }
}

export default connect((state: IAppState) => state.navigation, NavigationSlice.actions)(VideoPoster);