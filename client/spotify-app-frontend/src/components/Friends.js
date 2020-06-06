import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
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
  IonSearchbar,
  IonFooter,
  IonMenuButton,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import UserElement from "./UserElement";
import NavMenu from "./NavMenu";

function Friends() {
  const [friends, setFriends] = useState([]);

  function getFriends() {
    const user_token = Cookies.get("key");
    var data = { user_token: user_token };

    axios
      .post("http://localhost:8888/api/getfriends", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
          <IonTitle>Friends</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonButton onClick={() => getFriends()}></IonButton>
    </IonPage>
  );
}

export default Friends;
