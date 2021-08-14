import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CallRoom from "screens/CallRoom";
import CreateRoom from "screens/CreateRoom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CreateRoom} />
        <Route exact path="/call/:callId" component={CallRoom} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
