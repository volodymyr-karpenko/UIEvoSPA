import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AdminSlice } from "../features/admin/AdminSlice";
import { IAntiForgeryData } from "../services/auth/IAntiForgeryData";
import { IAppState } from "./IAppState";
import { IAdminState } from "../features/admin/IAdminState";
import HomePage from "../features/home/HomePage";
import PortfolioPage from "../features/portfolio/PortfolioPage";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import AdminPage from "../features/admin/AdminPage";
import LoginPage from "../features/admin/LoginPage";
import NoMatch from "./NoMatch";
import { AuthServiceContext } from "../services/auth/AuthServiceContext";

export class Main extends React.PureComponent<IAdminState & typeof AdminSlice.actions> {

    public constructor(props: IAdminState & typeof AdminSlice.actions) {
        super(props);
        this.props = props;
        this.getAuthStatus = this.getAuthStatus.bind(this);
    }

    public props: IAdminState & typeof AdminSlice.actions;

    public static contextType = AuthServiceContext;

    private timer?: any;

    public componentDidMount() {
        this.context.getAntiForgeryDataAsync()
            .then((res: IAntiForgeryData) => {
                this.props.setAntiForgeryData(res);
                this.timer = setTimeout(() => {
                    this.getAuthStatus(this.props.antiForgeryData);
                }, 0);
            })
            .catch((err: Error) => {
                console.log(`Account API Request Error: ${err}`);
            });     
    }

    public componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    private getAuthStatus(data: IAntiForgeryData): void {
        this.context.getAuthStatusAsync(data)
            .then((status: { isAuthenticated: boolean; }) => {
                this.props.setIsAuthenticated(status.isAuthenticated);
            })
            .catch((err: Error) => {
                console.log(`Account API Request Error: ${err}`);
            });
    }

    public render() {
        return (
            <main
                id="main"
                role="main"
            >
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/portfolio">
                        <PortfolioPage />
                    </Route>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/contact">
                        <ContactPage />
                    </Route>
                    <Route path="/admin">
                        {this.props.isAuthenticated ? <AdminPage /> : <LoginPage />}
                    </Route>
                    <Route
                        path="*"
                        component={NoMatch}
                    />
                </Switch>
            </main>
        );
    }
}

export default connect((state: IAppState) => state.admin, AdminSlice.actions)(Main);