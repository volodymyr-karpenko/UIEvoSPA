import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

export default class NoMatch extends React.PureComponent<RouteComponentProps> {

    public constructor(props: RouteComponentProps) {
        super(props);
        this.props = props;
    }

    public props: RouteComponentProps;

    public render() {
        return (
            <section>
                <Container fluid>
                    <Row className="min-vh-100 align-content-center">
                        <Col xs={12}>
                            <h1 className="ff-comfortaa-thin txt-light-color fs-huge text-center">
                                Something went wrong!
                            </h1>
                            <h2 className="ff-comfortaa-bold txt-light-color fs-medium text-center">
                                An error occurred while processing your request.
                            </h2>   
                            <h2 className="ff-comfortaa-bold txt-light-color fs-medium text-center">
                                Please, make sure your request is valid and try again.
                            </h2>
                        </Col>
                        <Col xs={12}>
                            <h3 className="ff-comfortaa-thin txt-light-color fs-large text-center mt-3">
                                <span
                                    className="ff-lobsterTwo-bold"
                                    style={{ color: "#bb3042" }}
                                >
                                    Request:
                                </span> {this.props.match.url}
                            </h3>
                        </Col>
                        <Col xs={12}>
                            <h3 className="ff-comfortaa-thin txt-light-color fs-large text-center mt-3">
                                <span
                                    className="ff-lobsterTwo-bold"
                                    style={{ color: "#bb3042" }}
                                >
                                    Status:
                                    </span> Not Found
                            </h3>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}