import * as React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { CookieSlice } from "./CookieSlice";
import { IAppState } from "../../app/IAppState";
import { ICookieState } from "./ICookieState";

export class CookieModal extends React.PureComponent<ICookieState & typeof CookieSlice.actions> {

    public constructor(props: ICookieState & typeof CookieSlice.actions) {
        super(props);
        this.props = props;
        this.toggleModal = this.toggleModal.bind(this);
    }

    public props: ICookieState & typeof CookieSlice.actions;

    private toggleModal(): void {
        this.props.toggleModal(!this.props.isModalCollapsed);
    }

    public render() {
        return (
            <Modal
                size="xl"
                show={!this.props.isModalCollapsed}
                onHide={this.toggleModal}
                aria-labelledby="cookie-policy"
                centered
                scrollable
            >
                <Modal.Header className="p-0">
                    <div
                        className="px-4 py-2 py-lg-5 bg_cover"
                        style={{ backgroundImage: "url(/img/img_cookie.jpg)", color: "#ffffff" }}
                    >
                        <h1 className="ff-comfortaa-thin fs-large">
                            Cookie Policy
                        </h1>
                        <p className="ff-comfortaa-regular fs-medium pt-2 mb-0">
                            To make this site work properly, we sometimes place small data files called 
                            cookies on your device. Most big websites do this too.
                        </p>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Container className="p-0">
                        <Row>
                            <Col xs={12}>
                                <h2 className="ff-lobsterTwo-bold txt-dark-color fs-large">
                                    What are cookies?
                                </h2>
                                <div className="cookie-header-underline"></div>
                                <p className="ff-comfortaa-regular fs-medium txt-primary-color pt-3">
                                    A cookie is a small text file that a website saves on your computer or mobile 
                                    device when you visit the site. It enables the website to remember your actions 
                                    and preferences (such as login, language, font size and other display preferences) 
                                    over a period of time, so you don’t have to keep re-entering them whenever you 
                                    come back to the site or browse from one page to another.
                                </p>
                            </Col>
                            <Col xs={12}>
                                <h2 className="ff-lobsterTwo-bold txt-dark-color fs-large pt-3">
                                    How do we use cookies?
                                </h2>
                                <div className="cookie-header-underline"></div>
                                <p className="ff-comfortaa-regular fs-medium txt-primary-color pt-3">
                                    A number of our pages use cookies to remember:
                                </p>
                                <ul className="ff-comfortaa-regular fs-medium txt-primary-color">
                                    <li>
                                        your display preferences, such as contrast color settings or font size;
                                    </li>
                                    <li>
                                        if you have already replied to a survey pop-up that asks you if the content
                                        was helpful or not (so you won&apos;t be asked again);
                                    </li>
                                    <li>
                                        if you have agreed (or not) to our use of cookies on this site;
                                    </li>
                                    <li>
                                        Google Analytics is used to anonymously track who is visiting our site, 
                                        how long they are staying and where they are coming from in order to allow us 
                                        to improve our service. Google allows you to block their tracking cookies from working
                                            <a
                                                className="link ff-lobsterTwo-bold"
                                                href="https://tools.google.com/dlpage/gaoptout"
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                <span className="d-inline-flex align-items-center pl-2">                                                
                                                    here
                                                    <i className="material-icons md-accent ml-1">
                                                        open_in_new
                                                    </i>
                                                </span>
                                            </a>.
                                        </li>
                                </ul>
                                <p className="ff-comfortaa-regular fs-medium txt-primary-color">
                                    Also, some videos embedded in our pages use a cookie to anonymously
                                    gather statistics on how you got there and what videos you visited. Some 
                                    third party cookies may be used for purpose other than those described here, 
                                    but the cookie-related information is not used to identify you personally. Enabling 
                                    these cookies is not strictly necessary for the website to work but it will provide 
                                    you with a better browsing experience. You can delete or block these cookies,
                                    but if you do that some features of this site may not work as intended.
                                </p>
                            </Col>
                            <Col xs={12}>
                                <h2 className="ff-lobsterTwo-bold txt-dark-color fs-large pt-3">
                                    How to control cookies?
                                </h2>
                                <div className="cookie-header-underline"></div>
                                <p className="ff-comfortaa-regular fs-medium txt-primary-color pt-3">
                                    You can control and/or delete cookies as you wish – for details, see
                                    <a
                                        className="link ff-lobsterTwo-bold"
                                        href="http://aboutcookies.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="d-inline-flex align-items-center pl-2">
                                            aboutcookies.org
                                            <i className="material-icons md-accent ml-1">
                                                open_in_new
                                            </i>
                                        </span>                                        
                                    </a>. 
                                    You can delete all cookies that are already on your computer and you can set 
                                    most browsers to prevent them from being placed. If you do this, however, you 
                                    may have to manually adjust some preferences every time you visit a site and 
                                    some services and functionalities may not work.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn_primary ff-lobsterTwo-bold fs-medium"
                        onClick={this.toggleModal}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
        );
    }
}

export default connect((state: IAppState) => state.cookie, CookieSlice.actions)(CookieModal);