import React from "react";
import {
  IonApp,
  IonMenu,
  IonItem,
  IonCard,
  IonCardContent,
  IonRouterOutlet,
} from "@ionic/react";
import { BrowserRouter, Route } from "react-router-dom";
import "@ionic/core/css/ionic.bundle.css";
import "./App.css";
import Home from "./components/Home";
import AddAccountInfo from "./components/AddAccountInfo";
import MyPlaylists from "./components/MyPlaylists";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Friends from "./components/Friends";

function App() {
  return (
    <BrowserRouter>
      <IonApp>
        <Route exact path="/" component={Home} />
        <Route path="/accountinfo" component={AddAccountInfo} />
        <Route path="/login" component={Login} />
        <Route path="/playlists" component={MyPlaylists} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={Users} />
        <Route path="/friends" component={Friends} />
      </IonApp>
    </BrowserRouter>
  );
}

export default App;
