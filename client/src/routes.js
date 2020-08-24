import React from "react"
import {Switch, Route, Redirect} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";
import {ChangeNamePage} from "./pages/ChangeNamePage";
import {ChangePasswordPage} from "./pages/ChangePasswordPage";
import {ChangeEmailPage} from "./pages/ChangeEmailPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Route path="/name" exact>
                    <ChangeNamePage />
                </Route>
                <Route path="/email" exact>
                    <ChangeEmailPage />
                </Route>
                <Route path="/password" exact>
                    <ChangePasswordPage />
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