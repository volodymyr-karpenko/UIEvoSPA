import * as React from "react";
import { Container, CardImg, Row, Col } from "react-bootstrap";
import PageHeader from "../../common/header/PageHeader";
import CertificateCarousel from "./CertificateCarousel";
import "./AboutPageStyles.scss";

export default class AboutPage extends React.PureComponent {

    public constructor(props: any) {
        super(props);
        this.partOneRef = React.createRef();
        this.partTwoRef = React.createRef();
        this.partThreeRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    private partOneRef: React.RefObject<Row> & React.RefObject<HTMLDivElement>;
    private partTwoRef: React.RefObject<Row> & React.RefObject<HTMLDivElement>;
    private partThreeRef: React.RefObject<Row> & React.RefObject<HTMLDivElement>;

    public componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        window.scrollTo(0, 0);
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    private handleScroll(): void {
        if (this.partOneRef.current && this.partTwoRef.current && this.partThreeRef.current) {
            if (this.partOneRef.current.offsetTop + 200 < window.pageYOffset + document.documentElement.clientHeight) {
                this.partOneRef.current.classList.add("fade-in");
            }
            else {
                this.partOneRef.current.classList.remove("fade-in");
            }

            if (this.partTwoRef.current.offsetTop + 100 < window.pageYOffset + document.documentElement.clientHeight) {
                this.partTwoRef.current.classList.add("fade-in");
            }
            else {
                this.partTwoRef.current.classList.remove("fade-in");
            }

            if (this.partThreeRef.current.offsetTop + 200 < window.pageYOffset + document.documentElement.clientHeight) {
                this.partThreeRef.current.classList.add("fade-in");
            }
            else {
                this.partThreeRef.current.classList.remove("fade-in");
            }
        }
    }

    public render() {
        return (
            <section>
                <Container fluid>
                    <PageHeader header="About" />
                    <Container
                        style={{ paddingBottom: "5rem" }}>
                        <Row
                            ref={this.partOneRef}
                            className="align-items-end txt-light-color fadePage"
                        >
                            <Col
                                xs={12}
                                lg={4}
                                className="mt-5 mt-lg-0"
                            >
                                <CardImg
                                    className="d-block mx-auto"
                                    src="/img/profile_photo.png"
                                    style={{ height: 260, width: 260, objectFit: "contain" }}
                                    title="Volodymyr Karpenko photo"
                                    alt="Volodymyr Karpenko photo"
                                />
                                <h2 className="ff-lobsterTwo-bold fs-large text-center mt-3">
                                    Volodymyr Karpenko
                                </h2>
                                <div className="d-flex flex-row justify-content-center align-items-center px-0">
                                    <i
                                        className="material-icons md-24"
                                        title="Location"
                                    >
                                        pin_drop
                                    </i>
                                    <h4 className="ff-comfortaa-bold fs-small mb-0">
                                        Zhytomyr, Ukraine
                                    </h4>
                                </div>
                            </Col>
                            <Col
                                xs={12}
                                lg={8}
                                className="ff-comfortaa-thin text-justify fs-medium mt-5 mt-lg-0"
                            >
                                <p className="article">
                                    I am a software engineer with cross-platform development experience. The following is within my expertise:
                                </p>
                                <p className="article mt-1 mt-lg-0">
                                    1. Multi-page web application using C# programming language, ASP.NET Core MVC framework, 
                                    SQL or MySQL database as well as JavaScript programming language, Bootstrap framework, 
                                    and jQuery library for layout and styling.
                                </p>
                                <p className="article mt-1 my-lg-0">
                                    2. Single-page web application using C# programming language, ASP.NET Core API framework, 
                                    SQL, or MySQL database for server-side logic as well as TypeScript programming language, 
                                    React and Redux libraries, React Bootstrap or Semantic UI React frameworks for client-side logic.
                                </p>
                            </Col>
                            <Col
                                xs={12}
                                className="ff-comfortaa-thin text-justify fs-medium"
                            >
                                <p className="article mt-1 mt-lg-3">
                                    3. Native like mobile application for iOS and Android platforms using C# programming language, 
                                    ASP.NET Core API framework, SQL, or MySQL database for server-side logic as well as Xamarin and 
                                    MvvmCross frameworks for client-side logic. In a certain scenario, a local SQLite database stored on 
                                    a mobile device may replace a remote database.
                                </p>
                                <p className="article mt-1 mt-lg-0">
                                    I develop applications with efficient business logic and responsive markup that adapts different screen 
                                    sizes. I think about an app&apos;s future maintenance before I decide how to implement a certain feature.
                                </p>
                                <p className="article mt-1 mt-lg-0">
                                    Feel free to contact me, and we will have a chat regarding your project. I will offer you my strategy for successful
                                    solution delivery and share my best guess for the overall time scale and cost estimates.
                                </p>
                                <p className="article  mt-1 mt-lg-0 mb-0">
                                    I appreciate your time and interest in my profile.
                                </p>
                            </Col>
                        </Row>
                        <Row
                            ref={this.partTwoRef}
                            className="txt-light-color fadePage"
                        >
                            <Col xs={12}>
                                <h2 className="ff-lobsterTwo-boldItalic fs-large text-center mt-5">
                                    SKILLS
                                </h2>
                            </Col>
                            <Col
                                xs={12}
                                lg={4}
                                className="mt-3"
                            >
                                <h3 className="ff-lobsterTwo-italic fs-medium text-left p-0 m-0">
                                    Programming Languages:
                                </h3>
                            </Col>
                            <Col
                                xs={12}
                                lg={8}
                            >
                                <p className="ff-comfortaa-thin text-left fs-medium mt-lg-3 mb-0">
                                    C#, TypeScript, JavaScript, PHP, XML, XAML, HTML, CSS, LESS, SASS, GraphQL.
                                </p>
                            </Col>
                            <Col
                                xs={12}
                                lg={4}
                                className="mt-3"
                            >
                                <h3 className="ff-lobsterTwo-italic text-left fs-medium p-0 m-0">
                                    Libraries & Frameworks:
                                </h3>
                            </Col>
                            <Col
                                xs={12}
                                lg={8}
                            >
                                <p className="ff-comfortaa-thin text-left fs-medium mt-lg-3 mb-0">
                                    ASP.NET Core MVC/API, Xamarin, MvvmCross, Entity Framework, Bootstrap, ESLint, 
                                    React, Redux, React Bootstrap, Semantic UI React, Styled System, Sift, Lingui, gRPC, jQuery, 
                                    jQuery UI, AJAX, WordPress, Git, xUnit, Jest, React Testing Library, Cypress, Apollo Client.
                                </p>
                            </Col>  
                            <Col
                                xs={12}
                                lg={4}
                                className="mt-3"
                            >
                                <h3 className="ff-lobsterTwo-italic fs-medium text-left p-0 m-0">
                                    Other Tools:
                                </h3>
                            </Col>
                            <Col
                                xs={12}
                                lg={8}
                            >
                                <p className="ff-comfortaa-thin text-left fs-medium mt-lg-3 mb-0">
                                    Visual Studio Code, Visual Studio, Android Studio, Xcode, WebStorm, PhpStorm, Adobe XD, 
                                    Adobe Illustrator, Adobe Photoshop, Amazon EC2, WAMP, XAMPP, PhpMyAdmin, Bitbucket, Jira, 
                                    Node.js, NoSQLBooster, Linux Ubuntu.
                                </p>
                            </Col>
                        </Row>
                        <Row
                            ref={this.partThreeRef}
                            className="txt-light-color fadePage"
                        >                            
                            <Col
                                xs={12}
                                className="mt-5"
                            >
                                <CertificateCarousel />
                            </Col>
                            <Col
                                xs={12}
                                className="ff-comfortaa-thin fs-small"
                            >
                                <p className="text-justify mt-5 mb-0">
                                    This site is built using C# programming language, ASP.NET Core framework (API), and MySQL 
                                    database for server-side logic as well as TypeScript programming language, React
                                    and Redux libraries, React Bootstrap framework for client-side logic. Deployed to
                                    <a
                                        href="https://aws.amazon.com/amazon-linux-2/"
                                        className="link ff-lobsterTwo-bold"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="d-inline-flex align-items-center pl-2">
                                            AWS&#x202F;&#x202F;Linux
                                            <i className="material-icons md-accent ml-1">
                                                open_in_new
                                            </i>
                                        </span>
                                    </a>.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </section>
        );
    }
};