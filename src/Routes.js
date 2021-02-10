import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ResetPwPage from "./Pages/ResetPwPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CreateEvent from "./Pages/CreateEvent/CreateEventItemPage";
import CreateEventDate from "./Pages/CreateEvent/CreateEventDatePage";
import CreditsPage from "./Pages/Credits/CreditsPage";
import ThankYou from "./Pages/Congrats/ThankYou";
import Congrats from "./Pages/Congrats/Congrats";
import Order from "./Pages/Order/Order";
import Nav from "./Components/nav";
import MobileFrame from "./Components/MobileFrame";
import Profile from "./Pages/Profile/Profile";
import { useMediaQuery } from "react-responsive";
import { NewUserProvider } from "./Context/newUserContext";
import axios from "axios";
import { headers, getUserInfo, getCart } from "./Config/urls";

function Routes() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });

  const accessToken = localStorage.getItem("access_token");

  const [isNewUser, setIsNewUser] = useState(true); // 최초접속이면 true 아니면 false

  const newUserValue = useMemo(() => ({ isNewUser, setIsNewUser }), [
    isNewUser,
    setIsNewUser
  ]);

  return (
    <NewUserProvider value={newUserValue}>
      <Router>
        {/* {accessToken && <Nav />} */}
        {/* 모바일 여부에 따라서 다른 네비게이션을 보여주기 위함 */}
        {accessToken ? isMobile ? <MobileFrame /> : <Nav /> : null}
        <Switch>
          {accessToken || <Route exact path="/" component={HomePage} />}
          <Route exact path="/resetpwpage" component={ResetPwPage} />
          <Route
            exact
            path="/forgotpasswordpage"
            component={ForgotPasswordPage}
          />
          <Route exact path="/CreateEvent" component={CreateEvent} />
          <Route
            exact
            path="/CreateEvent/CreateDate"
            component={CreateEventDate}
          />
          <Route exact path="/CreditsPage" component={CreditsPage} />
          <Route exact path="/ThankYou" component={ThankYou} />
          <Route exact path="/Congrats" component={Congrats} />
          <Route exact path="/Order" component={Order} />
          <Route exact path="/Profile" component={Profile} />
          <Redirect to="/CreateEvent" />
        </Switch>
      </Router>
    </NewUserProvider>
  );
}

export default Routes;
