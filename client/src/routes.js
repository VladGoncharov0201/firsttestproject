import React from "react"
import {Switch, Route, Redirect} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Redirect to="/main" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/auth" exact>
                <LoginPage />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    )
}