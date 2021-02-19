import React from "react";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, /*Redirect, */ 
Redirect} from "react-router-dom";
import { ROUTES } from "../../consts/index.js";
import Home from "../Home.jsx";
import { useStores } from "../../hooks/useStores.js";
import ThemeHeader from "../ThemeHeader.jsx";
import Detail from "../Detail.jsx";
import AddBookPage from "../AddBookPage.jsx";


const Authentication = () => {

  const {uiStore} = useStores();

  return useObserver(() => (
    <div className={`contentWrapper ${uiStore.themeClass}`}>
      <ThemeHeader/>
      <Switch>
          <Route path={ROUTES.detail.path}>
            <Detail/>
          </Route>

          <Route path={ROUTES.add}>
            <AddBookPage/>
          </Route>

          <Route path={ROUTES.home}>
            <Home/>
          </Route>
          <Redirect to={ROUTES.home}/>

        </Switch>
    </div>
  ));
};

export default Authentication;
