import * as React from "react";
import { Container, Row, Col, CardImg } from "react-bootstrap";
import PageHeader from "../../common/header/PageHeader";
import ContactForm from "./ContactForm";
import "./ContactPageStyles.scss";

export default class ContactPage extends React.PureComponent {

    public constructor(props: any) {
        super(props);
        this.partOneRef = React.createRef();
        this.partTwoRef = React.createRef();
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    private partOneRef: React.RefObject<Row<"div">> & React.RefObject<HTMLDivElement>;
    private partTwoRef: React.RefObject<Row<"div">> & React.RefObject<HTMLDivElement>;

    public componentDidMount() {
        window.addEventListener("scroll", this.scrollHandler);
        window.scrollTo(0, 0);
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    private scrollHandler(): void {
        if (this.partOneRef.current && this.partTwoRef.current) {
            if (this.partOneRef.current.offsetTop + 200 < window.pageYOffset + document.documentElement.clientHeight) {
                this.partOneRef.current.classList.add("fade-in");
            }
            else {
                this.partOneRef.current.classList.remove("fade-in");
            }

            if (this.partTwoRef.current.offsetTop + 200 < window.pageYOffset + document.documentElement.clientHeight) {
                this.partTwoRef.current.classList.add("fade-in");
            }
            else {
                this.partTwoRef.current.classList.remove("fade-in");
            }
        }
    }

    public render() {
        return (
            <section>
                <Container
                    fluid="md"
                    style={{ paddingBottom: "5rem" }}
                >
                    <PageHeader header="Contact" />
                    <Row
                        ref={this.partOneRef}
                        className="justify-content-center justify-content-sm-around align-items-center txt-light-color fadePage"
                    >
                        <Col xs={12}>
                            <h2 className="ff-comfortaa-thin fs-large text-justify">
                                Feel free to click the badge below and contact me via the LinkedIn platform.
                                </h2>
                        </Col>
                        <Col
                            xs={12}
                            className="text-center mt-5"
                        >
                            <a
                                href="https://www.linkedin.com/in/volodymyr-karpenko/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CardImg
                                    src="/img/ic_LI.png"
                                    className="p-1"
                                    style={{ height: 50, width: "auto", objectFit: "cover", backgroundColor: "#ffffff" }}
                                />
                            </a>
                        </Col>
                    </Row>
                    <Row
                        ref={this.partTwoRef}
                        className="fadePage"
                    >
                        <Col
                            xs={12}
                            style={{ paddingTop: "5rem", paddingBottom: "3rem" }}
                        >
                            <h2 className="ff-comfortaa-thin txt-light-color fs-large text-justify">
                                Alternatively, you are welcome to use the following contact form to get in touch.
                            </h2>
                        </Col>
                        <Col xs={12}>
                            <ContactForm />
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
};