import React from "react";
import Cookies from "js-cookie";
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
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function Dashboard() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{Cookies.get("key")}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
}

export default Dashboard;
