import * as React from "react";
import { Container, Row, Col, Accordion, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { IAppState } from "../../app/IAppState";
import { PortfolioSlice } from "../portfolio/PortfolioSlice";
import { AdminSlice } from "./AdminSlice";
import { IPortfolioPost } from "../portfolio/IPortfolioPost";
import { IAntiForgeryData } from "../../services/auth/IAntiForgeryData";
import AddEditPortfolioForm from "./AddEditPortfolioForm";
import { DataServiceContext } from "../../services/data/DataServiceContext";
import { AuthServiceContext } from "../../services/auth/AuthServiceContext";

export class AdminPage extends React.PureComponent<IAppState & typeof PortfolioSlice.actions & typeof AdminSlice.actions> {

    public constructor(props: IAppState & typeof PortfolioSlice.actions & typeof AdminSlice.actions) {
        super(props);
        this.props = props;
        this.deletePost = this.deletePost.bind(this);
    }

    public props: IAppState & typeof PortfolioSlice.actions & typeof AdminSlice.actions;

    public static contextType = DataServiceContext;

    private newPost: IPortfolioPost = { id: "", header: "" };

    public componentDidMount() {
        window.scrollTo(0, 0);

        this.context.readAllDataAsync()
            .then((res: IPortfolioPost[]) => {
                this.props.setPosts(res);
            })
            .catch((err: Error) => console.log(`API Request Error: ${err}`));
    }

    private deletePost(post: IPortfolioPost, antiForgeryData: IAntiForgeryData): void {
        const confirm: boolean = window.confirm(`Delete this post: ${post.header}?`);

        if (!confirm) {
            return;
        }

        this.context.deleteDataAsync(post.id, antiForgeryData)
            .then((res: string) => {
                if (res === "Post successfully deleted!") {
                    window.alert(res);       
                    this.context.readAllDataAsync()
                        .then((res: IPortfolioPost[]) => {
                            this.props.setPosts(res);
                        })
                        .catch((err: Error) => console.log(`API Request Error: ${err}`));
                }
                else if (res === "Invalid post ID.") {
                    window.alert(res);
                }
                else {
                    console.log(`Delete API Request Error: ${res}`);
                    window.alert("Something went wrong. Try again!");
                }
            })
            .catch((err: Error) => console.log(`API Request Error: ${err}`));
    }

    public render() {
        return (
            <section>
                <Container style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
                    <Row>
                        <Col
                            xs={12}
                            xl={{ span: 10, offset: 1 }}
                        >
                            <Accordion>
                                <Card
                                    key="0"
                                    className="text-center ff-lobsterTwo-bold txt-light-color fs-huge"
                                    style={{ backgroundColor: "transparent" }}
                                >
                                    <Card.Header>
                                        <AuthServiceContext.Consumer>
                                            {authService => {
                                                return (
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        eventKey="0"
                                                        onClick={async () => {
                                                            const response = await authService.getAntiForgeryDataAsync();
                                                            this.props.setAntiForgeryData(response);
                                                        }}
                                                        className="ff-comfortaa-bold fs-medium"
                                                        style={{ color: "#ff502f" }}
                                                    >
                                                        <span className="d-flex align-items-center">
                                                            <i className="material-icons md-accent mr-2">
                                                                add_circle_outline
                                                            </i>
                                                            Add New Portfolio Post
                                                        </span>
                                                    </Accordion.Toggle>    
                                                );
                                            }}
                                        </AuthServiceContext.Consumer>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <AddEditPortfolioForm post={this.newPost} />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                {this.props.portfolio.portfolioPosts.map((post: IPortfolioPost): React.ReactNode => {
                                    return (
                                        <Card
                                            key={post.id}
                                            className="ff-lobsterTwo-bold txt-light-color fs-large"
                                            style={{ backgroundColor: "transparent" }}
                                        >
                                            <Card.Header>
                                                <Row>
                                                    <Col
                                                        xs={8}
                                                        sm={10}
                                                        className="px-0 pl-sm-3"
                                                    >
                                                        {post.header}
                                                    </Col>
                                                    <Col
                                                        xs={2}
                                                        sm={1}
                                                        className="text-right p-0"
                                                    >
                                                        <AuthServiceContext.Consumer>
                                                            {authService => {
                                                                return (
                                                                    <OverlayTrigger
                                                                        placement={"left"}
                                                                        overlay={
                                                                            <Tooltip id="edit_post">
                                                                                Edit post
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <Accordion.Toggle
                                                                            as={Button}
                                                                            eventKey={post.id}
                                                                            onClick={async () => {
                                                                                const response = await authService.getAntiForgeryDataAsync();
                                                                                this.props.setAntiForgeryData(response);
                                                                            }}
                                                                            className="px-3 py-2"
                                                                            aria-controls="edit post"
                                                                        >
                                                                            <i className="material-icons md-accent">
                                                                                edit
                                                                            </i>
                                                                        </Accordion.Toggle>
                                                                    </OverlayTrigger>    
                                                                );
                                                            }}
                                                        </AuthServiceContext.Consumer>                                                        
                                                    </Col>
                                                    <Col
                                                        xs={2}
                                                        sm={1}
                                                        className="text-right p-0"
                                                    >
                                                        <AuthServiceContext.Consumer>
                                                            {authService => {
                                                                return (
                                                                    <OverlayTrigger
                                                                        placement={"right"}
                                                                        overlay={
                                                                            <Tooltip id="delete_post">
                                                                                Delete post
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <Button
                                                                            onClick={async () => {
                                                                                const response = await authService.getAntiForgeryDataAsync();
                                                                                this.props.setAntiForgeryData(response);
                                                                                this.deletePost(post, response);
                                                                            }}
                                                                            className="px-3 py-2"
                                                                            aria-controls="delete post"
                                                                        >
                                                                            <i className="material-icons md-accent">
                                                                                delete_outline
                                                                            </i>
                                                                        </Button>
                                                                    </OverlayTrigger>    
                                                                );
                                                            }}
                                                        </AuthServiceContext.Consumer>                                                       
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={post.id}>
                                                <Card.Body>
                                                    <AddEditPortfolioForm post={post} />                                                   
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    );
                                })}
                            </Accordion>                            
                        </Col>                        
                    </Row>
                </Container>
            </section>
        );
    }
}

export default connect((state: IAppState) => state, { ...PortfolioSlice.actions, ...AdminSlice.actions })(AdminPage);