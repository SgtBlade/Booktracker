//Library stuff
import React,{ useContext } from 'react';
import { useObserver } from "mobx-react-lite";
import { Switch, Route, Redirect } from "react-router-dom";
//Components
import Home from "./js/comps/Home.jsx";
import Add from "./js/comps/AddBook.jsx";
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

  //GELIEVE TE LEZEN VOOR VERBTEREING WEEK 4
  //COMMENTAAR VAN WEEK 3

  //COMMENTAAR: Je App.js is nog te uitgebreid, nog meer opdelen in logische componenten.
  //REAC: App.js opgesplitst samen met enkele andere componenten

  //COMMENTAAR: Hou je handleSubmit functies in je je components zelf, nu geef je de handler mee vanuit de app en begin je met if / else / switch / case constructies te zitten.
  //REAC: Verplaatst

  //COMMENTAAR: Verzorg je naamgeving variabelen (const UIStore = props.uiStore moet uiStore zijn).
  //REAC: Hernoemt naar uiStore (ik verkier camelCase)

  //COMMENTAAR: Je hernoemt een deel variabelen die binnenkomen als props, waarom? Je kan destructuren wat je nodig hebt.
  //REAC: Ik doe dit omdat ik het overzichtelijker vind (heb het wel aangepast)

  //COMMENTAAR: Kijk om ook useState te gebruiken voor je comment Form / input.
  //REAC: Done

  //COMMENTAAR: Ik mis PropTypes in je Bookpost!
  //REAC: Fixed

  //OPMERKING: Ik heb mijn css files afgezonderd van mijn jsx files omdat ik liever css bij css houd en js bij js.

  //HOLD OP EEN POST OM NAAR DETAIl PAGINA TE GAAN
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
