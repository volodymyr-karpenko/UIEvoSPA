import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { Store } from "./app/Store";
import App from "./app/App";
import { DataServiceContext, DataServiceDefault } from "./services/data/DataServiceContext";
import { CookieServiceContext, CookieServiceDefault } from "./services/cookie/CookieServiceContext";
import { AuthServiceContext, AuthServiceDefault } from "./services/auth/AuthServiceContext";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
export const history = createBrowserHistory({ basename: baseUrl });

ReactDOM.render(
    <Provider store={Store}>
        <Router history={history}>
            <DataServiceContext.Provider value={DataServiceDefault}>
                <CookieServiceContext.Provider value={CookieServiceDefault}>
                    <AuthServiceContext.Provider value={AuthServiceDefault}>
                        <App />
                    </AuthServiceContext.Provider>
                </CookieServiceContext.Provider>
            </DataServiceContext.Provider>            
        </Router>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();