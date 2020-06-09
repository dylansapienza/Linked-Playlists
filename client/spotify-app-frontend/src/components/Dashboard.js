import React from "react";
import Cookies from "js-cookie";
import ReactDOM from "react-dom";
import {
  Redirect,
  BrowserRouter,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import {
  add,
  arrowDown,
  addCircle,
  starOutline,
  musicalNotes,
  people,
  search,
} from "ionicons/icons";
import {
  IonApp,
  IonHeader,
  IonTitle,
  IonCard,
  IonToolbar,
  IonCardContent,
  IonCardTitle,
  IonPage,
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonText,
  IonMenu,
  IonList,
  IonItem,
  menuController,
  IonRouterOutlet,
  IonMenuButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import NavMenu from "./NavMenu";

function Dashboard() {
  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar color="dark">
          {/* <IonLabel position="floating">
            Black Lives Matter
            <a href="https://www.8cantwait.org/"> Join Campaign Zero</a>
          </IonLabel> */}
        </IonToolbar>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
          <IonTitle>{Cookies.get("key")}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
}

export default Dashboard;
