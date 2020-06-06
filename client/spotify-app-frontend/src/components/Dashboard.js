import React from "react";
import Cookies from "js-cookie";
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

function Dashboard() {
  return (
    <IonPage>
      <IonMenu contentId="menu" side="start" type="overlay">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonIcon icon={musicalNotes}></IonIcon>
              <IonLabel>Playlists</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={people}></IonIcon>
              <IonLabel>Friends</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Discovery</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="menu"></IonRouterOutlet>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
          <IonTitle>{Cookies.get("key")}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
}

export default Dashboard;
