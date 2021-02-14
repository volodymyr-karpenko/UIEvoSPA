import * as React from "react";
import { Nav, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { NavigationSlice } from "../navigation/NavigationSlice";
import { IAppState } from "../../app/IAppState";
import { INavigationState } from "./INavigationState";
import "./NavigationPageStyles.scss";

export class NavigationPage extends React.PureComponent<INavigationState & typeof NavigationSlice.actions> {

    public constructor(props: INavigationState & typeof NavigationSlice.actions) {
        super(props);
        this.props = props;
        this.toggleNavigation = this.toggleNavigation.bind(this);
    }

    public props: INavigationState & typeof NavigationSlice.actions;    

    private toggleNavigation(event: React.SyntheticEvent): void {
        const title = event.currentTarget.textContent!.toLowerCase();

        this.props.setVideoTitle(title);
        this.props.toggleNavigation(!this.props.isNavigationCollapsed);
    }

    public render() {
        return (
            <Container
                fluid
                className={this.props.isNavigationCollapsed ? "d-none" : "fixed-top"}
                style={{ backgroundColor: "#333366" }}
            >
                <Row>
                    <Col xs={12}>
                        <nav>
                            <Nav
                                as="ul"
                                className="vh-100 flex-column justify-content-center align-content-center text-center"
                            >
                                <CSSTransition
                                    classNames="navigationPartOne"
                                    timeout={700}
                                    in={!this.props.isNavigationCollapsed}
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link
                                            onClick={this.toggleNavigation}
                                            eventKey="0"
                                            as={Link}
                                            to="/"
                                            className="d-inline-block text-center ff-sportrop fs-large"
                                        >
                                            Home
                                        </Nav.Link>
                                    </Nav.Item>
                                </CSSTransition>
                                <CSSTransition
                                    classNames="navigationPartTwo"
                                    timeout={700}
                                    in={!this.props.isNavigationCollapsed}
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link
                                            onClick={this.toggleNavigation}
                                            eventKey="1"
                                            as={Link}
                                            to="/portfolio"
                                            className="d-inline-block text-center ff-sportrop fs-large"
                                        >
                                            Portfolio
                                        </Nav.Link>
                                    </Nav.Item>
                                </CSSTransition>
                                <CSSTransition
                                    classNames="navigationPartThree"
                                    timeout={700}
                                    in={!this.props.isNavigationCollapsed}
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link
                                            onClick={this.toggleNavigation}
                                            eventKey="2"
                                            as={Link}
                                            to="/about"
                                            className="d-inline-block text-center ff-sportrop fs-large"
                                        >
                                            About
                                        </Nav.Link>
                                    </Nav.Item>
                                </CSSTransition>
                                <CSSTransition
                                    classNames="navigationPartFour"
                                    timeout={700}
                                    in={!this.props.isNavigationCollapsed}
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link
                                            onClick={this.toggleNavigation}
                                            eventKey="3"
                                            as={Link}
                                            to="/contact"
                                            className="d-inline-block text-center ff-sportrop fs-large"
                                        >
                                            Contact
                                        </Nav.Link>
                                    </Nav.Item>
                                </CSSTransition>
                                <CSSTransition
                                    classNames="navigationPartFive"
                                    timeout={700}
                                    in={!this.props.isNavigationCollapsed}
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link
                                            onClick={() => this.props.toggleNavigation(!this.props.isNavigationCollapsed)}
                                            eventKey="4"
                                            className="d-inline-block text-center p-2"
                                            href="https://github.com/volodymyr-karpenko"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="GitHub"
                                        >
                                            <span className="ff-font-awesome-brands fs-huge">
                                                &#xf09b;
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </CSSTransition>
                            </Nav>
                        </nav>
                    </Col>
                </Row>
            </Container> 
        );
    }
}

export default connect((state: IAppState) => state.navigation, NavigationSlice.actions)(NavigationPage);