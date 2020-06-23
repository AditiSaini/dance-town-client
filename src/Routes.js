import React from "react";
import { Route, Switch } from "react-router-dom";
// Views:
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile"
import NewNote from "./containers/NewNote";
import Challenges from "./containers/Challenges";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        <AuthenticatedRoute exact component={Profile} props={childProps} path="/profile" />
        <AuthenticatedRoute exact path="/challenges/new">
            <NewNote />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/challenges/:id">
            <Challenges />
        </AuthenticatedRoute>
        <Route component={NotFound} />

    </Switch>;