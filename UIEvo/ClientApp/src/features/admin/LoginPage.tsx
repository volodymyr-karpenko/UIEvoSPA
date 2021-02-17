import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageHeader from "../../common/header/PageHeader";
import LoginForm from "./LoginForm";
import "./LoginPageStyles.scss";

export default class LoginPage extends React.PureComponent {

    public constructor(props: {}) {
        super(props);
        this.partOneRef = React.createRef();
        this.partTwoRef = React.createRef();
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    private partOneRef: React.RefObject<typeof Col> & React.RefObject<HTMLDivElement>;
    private partTwoRef: React.RefObject<typeof Col> & React.RefObject<HTMLDivElement>;

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

            if (this.partTwoRef.current.offsetTop + 300 < window.pageYOffset + document.documentElement.clientHeight) {
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
                <Container fluid>
                    <PageHeader header="Login" />
                    <Row
                        className="min-vh-100 justify-content-center align-content-center txt-light-color"
                        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
                    >
                        <Col
                            ref={this.partOneRef}
                            xs={12}
                            className="mb-0 mb-lg-5 fadePage"
                        >
                            <h2 className="ff-comfortaa-thin fs-large text-center">
                                Administrator&apos;s Entrance
                            </h2>
                        </Col>
                        <Col
                            ref={this.partTwoRef}
                            xs={12}
                            className="fadePage"
                        >
                            <LoginForm />
                        </Col>
                    </Row>                    
                </Container>
            </section>    
        );
    }
}