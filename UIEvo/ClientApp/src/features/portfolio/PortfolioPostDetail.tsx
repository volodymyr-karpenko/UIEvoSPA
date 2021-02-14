import * as React from "react";
import { Card, Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { RouteComponentProps } from "react-router-dom";
import { IPortfolioPost } from "./IPortfolioPost";
import { DataServiceContext } from "../../services/data/DataServiceContext";
import "./PortfolioPostDetailStyles.scss";

export default class PortfolioPostDetail extends React.PureComponent<IPortfolioPost & { route: RouteComponentProps<{ header: string; }>;}> {

    public constructor(props: IPortfolioPost & { route: RouteComponentProps<{ header: string; }>; }) {
        super(props);
        this.props = props;
        this.goBack = this.goBack.bind(this);
    }

    public props: IPortfolioPost & { route: RouteComponentProps<{ header: string; }>; };  

    public static contextType = DataServiceContext;

    public componentDidMount() {
        window.scrollTo(0, 0);   

        if (!this.props.id) {
            const id = this.props.route.match.params.header.substring(this.props.route.match.params.header.lastIndexOf("=") + 1);
            this.context.readDataAsync(id)
                .then((res: IPortfolioPost) => {
                    if (!res.id) {
                        this.props.route.history.replace(`/${this.props.route.match.params.header}`);
                    }
                    this.setState(res);
                })
                .catch((err: Error) => console.log(`API Request Error: ${err}`));  
        }        
    }   
    
    private formatDates(startDate: Date | undefined, finishDate: Date | undefined): string {
        const formatterOptions = { month: "short", year: "numeric" };
        const formatter = new Intl.DateTimeFormat("en-GB", formatterOptions);
        if (startDate && finishDate) {
            if (startDate === finishDate) {
                return formatter.format(new Date(finishDate));
            }
            return formatter.format(new Date(startDate)) + " - " + formatter.format(new Date(finishDate));
        }
        return "";
    }

    private goBack(): void {
        if (this.props.route.history.length > 1) {
            this.props.route.history.goBack();
        }
        else {
            this.props.route.history.push("/portfolio");
        }
    }

    public render() {
        let heroElement: React.ReactNode = <></>;

        if (this.props.videoSource) {
            heroElement = (
                <div style={{ position: "relative", height: 0, overflow: "hidden", maxWidth: "100%", paddingBottom: "56.25%" }}>
                    <iframe
                        title={this.props.header}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        src={this.props.videoSource}
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }
        else {
            heroElement = (
                <Card.Img
                    variant="top"
                    className="rounded-0"
                    src={this.props.imageSource}
                    alt={`${this.props.header} - screenshot`}
                />
            );
        }       

        return (
            <section>
                <Container
                    fluid
                    className="min-vh-100"
                    style={{ overflow: "hidden" }}
                >
                    <Row className="min-vh-100 align-content-center">
                        <Col
                            md={{ span: 10, offset: 1 }}
                            xl={{ span: 8, offset: 2 }}
                        >                            
                            <CSSTransition
                                classNames="postDetailPartOne"
                                timeout={600}
                                appear
                                in
                            >
                                <Card
                                    className="border-0 rounded-0 ff-comfortaa-regular fs-medium txt-light-color"
                                    style={{ backgroundColor: "transparent", paddingTop: "5rem" }}
                                >
                                    <Card.Body
                                        className="pb-4"
                                        style={{ backgroundColor: "#333366" }}
                                    >
                                        <Row className="justify-content-between">
                                            <Col
                                                xs={"auto"}
                                                className="d-flex align-items-center"
                                            >
                                                <i className="material-icons md-24">
                                                    business
                                                </i>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="customerTitle">
                                                            Customer Title
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Card.Text className="ff-lobsterTwo-italic ml-1">
                                                        {this.props.customerTitle}
                                                    </Card.Text>
                                                </OverlayTrigger>                                                
                                            </Col>
                                            <Col
                                                xs={"auto"}
                                                className="d-flex align-items-center"
                                            >
                                                <i className="material-icons md-24">
                                                    pin_drop
                                                </i>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="customerLocation">
                                                            Customer Location
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Card.Text className="ff-lobsterTwo-italic">
                                                        {this.props.location}
                                                    </Card.Text>
                                                </OverlayTrigger>                                                
                                            </Col>
                                            <Col
                                                xs={"auto"}
                                                className="d-flex align-items-center"
                                            >
                                                <i className="material-icons md-24">
                                                    date_range
                                                </i>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="developmentPeriod">
                                                            Development Period
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Card.Text className="ff-lobsterTwo-italic ml-1">
                                                        {this.formatDates(this.props.startDate, this.props.finishDate)}
                                                    </Card.Text>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                        <Card.Title className="ff-comfortaa-thin fs-large mt-3">
                                            {this.props.header}
                                        </Card.Title>
                                        <Card.Text className="text-justify" >
                                            {this.props.mainText}
                                        </Card.Text>
                                        <Card.Text className="text-right mb-0">
                                            {this.props.footer}
                                        </Card.Text>
                                        <Row className="justify-content-between">
                                            {this.props.playStoreSource && this.props.playStoreText &&
                                                <Col
                                                    xs={12}
                                                    className="text-right mt-2"
                                                >
                                                    <a
                                                    href={this.props.playStoreSource}
                                                        className="link ff-lobsterTwo-bold"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span className="d-inline-flex align-items-center pl-2">
                                                        {this.props.playStoreText}
                                                            <i className="material-icons md-accent ml-1">
                                                                open_in_new
                                                            </i>
                                                        </span>                                                    
                                                    </a>
                                                </Col>
                                            }

                                            {this.props.appStoreSource && this.props.appStoreText &&
                                                <Col
                                                    xs={12}
                                                    className="text-right mt-2"
                                                >
                                                    <a
                                                    href={this.props.appStoreSource}
                                                        className="link ff-lobsterTwo-bold"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span className="d-inline-flex align-items-center pl-2">
                                                        {this.props.appStoreText}
                                                            <i className="material-icons md-accent ml-1">
                                                                open_in_new
                                                            </i>
                                                        </span>                                                    
                                                    </a>
                                                </Col>
                                            }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </CSSTransition>
                            <CSSTransition
                                classNames="postDetailPartTwo"
                                timeout={1200}
                                appear
                                in
                            >
                                <Card
                                    className="border-0 rounded-0"
                                    style={{ backgroundColor: "transparent", paddingBottom: "5rem" }}
                                >
                                    {heroElement}
                                    <Card.Body className="text-center">
                                        <Button
                                            className="btn_secondary ff-lobsterTwo-bold fs-medium mt-3"
                                            onClick={this.goBack}
                                        >
                                            Back
                                        </Button>
                                    </Card.Body>
                                </Card>                                
                            </CSSTransition>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}