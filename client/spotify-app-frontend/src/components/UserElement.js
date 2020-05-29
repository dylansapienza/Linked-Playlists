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
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function UserElement(props) {
  return (
    <IonCard>
      <IonCardContent>
        <h1>{props.user.username}</h1>
      </IonCardContent>
    </IonCard>
  );
}

export default UserElement;
