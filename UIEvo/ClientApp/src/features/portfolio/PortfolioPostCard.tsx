import * as React from "react";
import { Link } from "react-router-dom";
import { Card, Nav, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IPortfolioPost } from "./IPortfolioPost";
import "./PortfolioPostCardStyles.scss";

export default class PortfolioPostCard extends React.PureComponent<IPortfolioPost> {

    public constructor(props: IPortfolioPost) {
        super(props);
        this.props = props;
        this.postPartOneRef = React.createRef();
        this.postPartTwoRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    public props: IPortfolioPost;

    private postPartOneRef: React.RefObject<Card<"div">> & React.RefObject<HTMLDivElement>;
    private postPartTwoRef: React.RefObject<Card<"div">> & React.RefObject<HTMLDivElement>;

    public componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    private handleScroll(): void {
        if (this.postPartOneRef.current && this.postPartTwoRef.current) {
            if (this.postPartOneRef.current.offsetTop + 100 < window.pageYOffset + document.documentElement.clientHeight) {
                this.postPartOneRef.current.classList.add("fade-in");
            }
            else {
                this.postPartOneRef.current.classList.remove("fade-in");
            } 

            if (this.postPartTwoRef.current.offsetTop < window.pageYOffset + document.documentElement.clientHeight) {
                this.postPartTwoRef.current.classList.add("fade-in");
            }
            else {
                this.postPartTwoRef.current.classList.remove("fade-in");
            } 
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

    public render() {
        return (
            <Nav.Link
                eventKey={this.props.id}
                as={Link}
                to={`/portfolio/${this.props.header.replace(/[^A-Za-z0-9]/g, "-").toLowerCase()}=${this.props.id}`}
                className="d-inline-block p-0"
            >
                <Card
                    ref={this.postPartOneRef}
                    className="postPartOne"
                >
                    <Card.Img
                        variant="top"
                        src={this.props.imageSource}
                    />
                </Card>    
                <Card
                    ref={this.postPartTwoRef}
                    className="postPartTwo"
                >
                    <Card.Body style={{ backgroundColor: "#333366" }}>                        
                        <Card.Title className="ff-lobsterTwo-bold txt-light-color fs-large">
                            {this.props.header}
                        </Card.Title>
                        <Row>
                            <Col
                                xs={"auto"}
                                className="d-flex align-items-center"
                            >
                                <i className="material-icons md-24 txt-light-color">
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
                                    <Card.Text className="ff-lobsterTwo-italic txt-light-color ml-1">
                                        {this.formatDates(this.props.startDate, this.props.finishDate)}
                                    </Card.Text>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>               
            </Nav.Link>                               
        );
    }
}