import React from "react";
import { Route, Switch } from "react-router-dom";
// Views:
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Challenges from "./containers/Challenges";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/challenges/new">
                <NewNote />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/challenges/:id">
                <Challenges />
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
}