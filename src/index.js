import React from "react";
import ReactDOM from "react-dom";

import MenuSelect from "./containers/MenuSelect";
import WishList from "./containers/WishList";
import OrderSheet from "./containers/OrderSheet";
import ErrorPage from "./containers/ErrorPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/MenuSelect/:table_no" component={MenuSelect} />
      <Route path="/OrderSheet/:table_no" component={OrderSheet} />
      <Route path="/WishList/:table_no" component={WishList} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
