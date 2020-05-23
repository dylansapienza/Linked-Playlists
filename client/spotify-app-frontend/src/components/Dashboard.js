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
  IonMenu,
  IonList,
  IonItem,
  menuController,
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
      <IonMenu side="start" menuId="custom" className="my-custom-menu">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Custom Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </IonPage>
  );
}

export default Dashboard;
