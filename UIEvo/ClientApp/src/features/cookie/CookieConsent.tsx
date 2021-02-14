import * as React from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { CookieSlice } from "./CookieSlice";
import { IAppState } from "../../app/IAppState";
import { ICookieState } from "./ICookieState";
import { CookieServiceContext } from "../../services/cookie/CookieServiceContext";
import "./CookieConsentStyles.scss";

export class CookieConsent extends React.PureComponent<ICookieState & typeof CookieSlice.actions> {

    public constructor(props: ICookieState & typeof CookieSlice.actions) {
        super(props);
        this.props = props;
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleConsent = this.toggleConsent.bind(this);
        this.readCookie = this.readCookie.bind(this);
    }

    public props: ICookieState & typeof CookieSlice.actions;

    public static contextType = CookieServiceContext;

    private cookieConsentTimer: number = 0;

    public componentDidMount() {
        window.addEventListener("click", this.readCookie);
        this.cookieConsentTimer = window.setTimeout(this.readCookie, 10000);
    }

    public componentWillUnmount() {
        window.removeEventListener("click", this.readCookie);
        window.clearTimeout(this.cookieConsentTimer);
    }

    private toggleModal(): void {
        this.props.toggleModal(!this.props.isModalCollapsed);
    }

    private toggleConsent(): void {
        this.context.setCookie("Cookie-Consent", "Agreed to the Cookie Policy on " + new Date().toUTCString(), 365, "/", "strict");
        this.props.toggleConsent(!this.props.isConsentCollapsed);
    }

    private readCookie(): void {
        const cookieConsentAgreed = this.context.getCookie("Cookie-Consent");
        cookieConsentAgreed.startsWith("Agreed to the Cookie Policy") ? this.props.toggleConsent(true) : this.props.toggleConsent(false);        
    }   

    public render() {
        return (
            <Container className={this.props.isConsentCollapsed ? "d-none" : "fixed-bottom pb-5 txt-light-color"}>
                <Row>
                    <CSSTransition
                        timeout={2500}
                        classNames="cookie"
                        in={!this.props.isConsentCollapsed}    
                    >
                        <Col
                            xs={12}
                            md={{ span: 8, offset: 2 }}
                            style={{ paddingTop: 15, paddingBottom: 15, backgroundColor: "#333366" }}
                        >
                            <Row className="justify-content-between">
                                <Col
                                    xs={9}
                                    sm={10}
                                    className="fs-medium"
                                >
                                    <Alert
                                        onClose={this.toggleConsent}
                                        className="m-0 p-0 border-0"
                                    >
                                        <Alert.Heading className="ff-comfortaa-thin fs-large mb-0">
                                            This site uses cookies!
                                        </Alert.Heading>
                                    </Alert>
                                </Col>
                                <Col
                                    xs={"auto"}
                                    style={{ transform: "translate(5px, -5px)" }}
                                >
                                    <Button
                                        className="btn_accent_transparent p-0"
                                        onClick={this.toggleConsent}
                                    >
                                        <i className="material-icons md-24">
                                            close
                                        </i>
                                    </Button>
                                </Col>
                            </Row>
                            <div className="ff-comfortaa-bold fs-medium">
                                By using this site you confirm that you agree to the&#x202F;&#x202F;                                
                                <Button
                                    className="btn_accent_transparent ff-lobsterTwo-bold fs-medium p-0"
                                    onClick={this.toggleModal}
                                >
                                    Cookie Policy
                                </Button>
                            </div>                            
                        </Col>
                    </CSSTransition>
                </Row>
            </Container>    
        );
    }
}

export default connect((state: IAppState) => state.cookie, CookieSlice.actions)(CookieConsent);