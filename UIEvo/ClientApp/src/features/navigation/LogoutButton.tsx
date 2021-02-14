import * as React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { AdminSlice } from "../admin/AdminSlice";
import { IAppState } from "../../app/IAppState";
import { IAdminState } from "../admin/IAdminState";
import { AuthServiceContext } from "../../services/auth/AuthServiceContext";

export class LogoutButton extends React.PureComponent<IAdminState & typeof AdminSlice.actions> {

    public constructor(props: IAdminState & typeof AdminSlice.actions) {
        super(props);
        this.props = props;
        this.logout = this.logout.bind(this);
    }

    public props: IAdminState & typeof AdminSlice.actions;

    public static contextType = AuthServiceContext;

    private logout(): void {
        if (!this.props.isAuthenticated) {
            return;
        }

        this.context.logout(this.props.antiForgeryData)
            .then((res: { isAuthenticated: boolean; }) => {
                this.props.setIsAuthenticated(res.isAuthenticated);
            })
            .catch((err: Error) => {
                console.log(`Account API Request Error: ${err}`);
            });
    }

    public render() {
        return (
            <OverlayTrigger
                placement={"left"}
                overlay={
                    <Tooltip id="logout">
                        Log out
                    </Tooltip>
                }
            >
                <Button
                    hidden={!this.props.isAuthenticated}
                    onClick={this.logout}
                    aria-controls="log out"
                    className="p-0"
                    style={{ width: 26, height: 26 }}
                >
                    <i
                        className="material-icons"
                        style={{ color: "#a0c334", backgroundColor: "#333366", border: "1px solid #a0c334" }}
                    >
                        directions_run
                    </i>
                </Button> 
            </OverlayTrigger> 
        );
    }
}

export default connect((state: IAppState) => state.admin, AdminSlice.actions)(LogoutButton);