import * as React from "react";
import { CardColumns, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { IAppState } from "../../app/IAppState";
import { PortfolioSlice } from "./PortfolioSlice";
import { IPortfolioState } from "./IPortfolioState";
import { IPortfolioPost } from "./IPortfolioPost";
import PageHeader from "../../common/header/PageHeader";
import PortfolioPostCard from "./PortfolioPostCard";
import PortfolioPostDetail from "./PortfolioPostDetail";
import { DataServiceContext } from "../../services/data/DataServiceContext";
import "./PortfolioPageStyles.scss";

export class PortfolioPage extends React.PureComponent<IPortfolioState & typeof PortfolioSlice.actions> {

    public constructor(props: IPortfolioState & typeof PortfolioSlice.actions) {
        super(props);
        this.props = props;
        this.getPost = this.getPost.bind(this);
    }

    public props: IPortfolioState & typeof PortfolioSlice.actions;

    public static contextType = DataServiceContext;

    public componentDidMount() {
        window.scrollTo(0, 0);   

        this.context.readAllDataAsync()
            .then((res: IPortfolioPost[]) => {
                this.props.setPosts(res);
            })
            .catch((err: Error) => console.log(`API Request Error: ${err}`));
    }

    private getPost(header: string): IPortfolioPost {
        const post = this.props.portfolioPosts.filter(post => {
            const id = header.substring(header.lastIndexOf("=") + 1);
            return (id === post.id);
        })[0];
        return post;
    }

    public render() {
        return (
            <section>
                <Container fluid>
                    <Switch>
                        <Route
                            exact
                            path="/portfolio"
                        >
                            <>
                                <PageHeader header="Portfolio" />
                                <CardColumns>
                                    {this.props.portfolioPosts.map((post, index): React.ReactNode => {
                                        if (index === Math.ceil(this.props.portfolioPosts.length / 3)) {
                                            return (
                                                <div
                                                    key={post.id}
                                                    className="add-margin-top"
                                                >
                                                    <PortfolioPostCard {...post} />
                                                </div>
                                            );
                                        }
                                        else {
                                            return (
                                                <PortfolioPostCard key={post.id} {...post} />
                                            );
                                        }
                                    })}
                                </CardColumns>
                            </>
                        </Route>
                        <Route
                            path="/portfolio/:header"
                            render={route => {
                                const post = this.getPost(route.match.params.header);
                                return (
                                    <PortfolioPostDetail route={route} {...post} />
                                );
                            }}
                        />
                    </Switch>
                </Container>
            </section>                        
        );
    }
}

export default connect((state: IAppState) => state.portfolio, PortfolioSlice.actions)(PortfolioPage);