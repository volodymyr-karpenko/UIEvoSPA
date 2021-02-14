import * as React from "react";
import { Container, Row, Col, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationSlice } from "../navigation/NavigationSlice";
import { IAppState } from "../../app/IAppState";
import { INavigationState } from "./INavigationState";
import LogoutButton from "./LogoutButton";

export class NavigationBar extends React.PureComponent<INavigationState & typeof NavigationSlice.actions> {

    public constructor(props: INavigationState & typeof NavigationSlice.actions) {
        super(props);
        this.props = props;
        this.handleLogoClick = this.handleLogoClick.bind(this);
        this.toggleNavigation = this.toggleNavigation.bind(this);
    }  

    public props: INavigationState & typeof NavigationSlice.actions;

    private handleLogoClick(): void {
        this.props.setVideoTitle("home");

        if (!this.props.isNavigationCollapsed) {
            this.toggleNavigation();
        }
    }

    private toggleNavigation(): void {
        this.props.toggleNavigation(!this.props.isNavigationCollapsed);
    }

    public render() {
        return (
            <Container
                fluid
                className="fixed-top"
            >
                <Row
                    className="justify-content-between"
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                >
                    <Col xs="auto">
                        <Nav.Link
                            onClick={this.handleLogoClick}
                            eventKey="brand"
                            as={Link}
                            to="/"
                            className="d-inline-block p-0"
                        >
                            <Image
                                className="d-inline-block"
                                src="/img/img_uievo_logo.png"
                                style={{ width: "auto", height: 26 }}
                                alt="UIEVO logo"
                            />
                        </Nav.Link>
                    </Col>
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <LogoutButton />                                                                                           
                            </Col>
                            <Col xs="auto">
                                <Button
                                    onClick={this.toggleNavigation}
                                    aria-controls="navigation toggler"
                                    className="p-0"
                                    style={{ width: 26, height: 26 }}
                                >
                                    <i
                                        className="material-icons md-accent"
                                        style={{ backgroundColor: "#333366", border: "1px solid #ff502f" }}
                                    >
                                        {this.props.isNavigationCollapsed ? "menu" : "close"}
                                    </i>
                                </Button>
                            </Col>
                        </Row>                                                                                             
                    </Col>
                </Row>
            </Container>    
        );
    }
}

export default connect((state: IAppState) => state.navigation, NavigationSlice.actions)(NavigationBar);