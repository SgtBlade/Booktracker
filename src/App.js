//Library stuff
import React,{ useContext } from 'react';
import { useObserver } from "mobx-react-lite";
import { Switch, Route, Redirect } from "react-router-dom";
//Components
import Home from "./js/comps/Home.jsx";
import Add from "./js/comps/AddBookPage.jsx";
import Detail from "./js/comps/Detail.jsx";
import ThemeHeader from "./js/comps/ThemeHeader.jsx";
//Base styles
import './css/reset.css';
import './css/vars.css';
import './css/style.css';
import './css/light.css';
import './css/responsive.css';
//Classes
import { storeContext } from "./js/hooks/context";
import {ROUTES} from './js/consts/routes.js'


function App() {

      
  const {uiStore} = useContext(storeContext);
  return useObserver(() => (
    <div className={`contentWrapper ${uiStore.themeClass}`}>
      <ThemeHeader/>
      <Switch>
          <Route path={ROUTES.detail}>
            <Detail /> 
          </Route>

          <Route path={ROUTES.add}>
            <Add />
          </Route>

          <Route path={ROUTES.home}>
            <Home/>
          </Route>

          <Route path={ROUTES.default}>
          <Redirect to={ROUTES.home}/>
          </Route>

        </Switch>
    </div>
  ));
}

export default App;
