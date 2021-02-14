import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import TestimonialsCarousel from "./TestimonialsCarousel";
import "./HomePageStyles.scss";

export default function HomePage() {

    return (
        <section>
            <Container
                fluid
                className="vh-100"
            >
                <Row className="vh-100 align-content-center">
                    <Col
                        xs={12}
                        className="text-center ff-lobsterTwo-bold txt-light-color fade-home-2"
                    >
                        <CSSTransition
                            classNames="homePartOne"
                            timeout={1500}
                            appear
                            in
                        >
                            <p className="fs-huge mb-0">
                                Volodymyr Karpenko
                            </p>
                        </CSSTransition>
                    </Col>
                    <Col
                        xs={12}
                        className="text-center ff-comfortaa-thin txt-light-color fade-home-2"
                    >
                        <CSSTransition
                            classNames="homePartOne"
                            timeout={1500}
                            appear
                            in
                        >
                            <p className="fs-medium mb-0">
                                Software Engineer
                            </p>
                        </CSSTransition>
                    </Col>
                    <Col
                        xs={12}
                        className="text-center ff-comfortaa-thin txt-light-color fade-home-2"
                    >
                        <CSSTransition
                            classNames="homePartOne"
                            timeout={1500}
                            appear
                            in
                        >
                            <p className="fs-medium mb-3">
                                .NET Core | Xamarin | React
                            </p>
                        </CSSTransition>
                    </Col>
                    <Col
                        xs={12}
                        className="text-center ff-quicksand-dash txt-light-color fade-home-1"
                    >
                        <CSSTransition
                            classNames="homePartTwo"
                            timeout={1500}
                            appear
                            in
                        >
                            <p className="fs-huge mb-0">
                                Testimonials
                            </p>
                        </CSSTransition>
                    </Col>
                    <Col
                        xs={12}
                        sm={{ span: 10, offset: 1 }}
                        xl={{ span: 8, offset: 2 }}
                        className="ff-comfortaa-thin txt-light-color fade-home-3"
                        style={{ minHeight: "14.5rem" }}
                    >
                        <CSSTransition
                            classNames="homePartThree"
                            timeout={1500}
                            appear
                            in
                        >
                            <TestimonialsCarousel />
                        </CSSTransition>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};