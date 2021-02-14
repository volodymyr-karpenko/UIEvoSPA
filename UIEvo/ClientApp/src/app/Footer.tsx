import * as React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { CookieSlice } from "../features/cookie/CookieSlice";
import { IAppState } from "./IAppState";
import { ICookieState } from "../features/cookie/ICookieState";

export class Footer extends React.PureComponent<ICookieState & typeof CookieSlice.actions> {

    public constructor(props: ICookieState & typeof CookieSlice.actions) {
        super(props);
        this.props = props;
        this.toggleModal = this.toggleModal.bind(this);
    }

    private year: number = new Date().getFullYear();

    public props: ICookieState & typeof CookieSlice.actions;

    private toggleModal(): void {
        this.props.toggleModal(!this.props.isModalCollapsed);
    }

    public render() {
        return (
            <footer
                className="position-absolute w-100"
                style={{ bottom: 0 }}
            >
                <Container fluid className="py-2">
                    <Row className="no-gutters justify-content-between align-items-center">
                        <Col
                            xs={"auto"}
                            className="ff-comfortaa-thin txt-light-color fs-small mr-3"
                        >
                            &copy; <span className="ff-sportrop">{this.year}</span> Volodymyr Karpenko
                        </Col>
                        <Col
                            xs={"auto"}
                            className="d-flex p-0"
                        >
                            <Button
                                className="btn_accent_transparent ff-lobsterTwo-bold fs-medium p-0"
                                onClick={this.toggleModal}
                            >
                                Cookie Policy
                            </Button>
                            <a
                                className="d-inline-block text-center ml-4 link"
                                href="https://github.com/volodymyr-karpenko"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <span className="ff-font-awesome-brands fs-medium">
                                    &#xf09b;
                                </span>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
};

export default connect((state: IAppState) => state.cookie, CookieSlice.actions)(Footer);