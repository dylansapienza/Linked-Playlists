import React from "react";
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
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function Home(props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Spotify Playlist App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img
            src="https://www.scdn.co/i/_global/open-graph-default.png"
            alt="SpotifyLogo"
          />
          <IonCardHeader>
            <IonCardTitle class="ion-text-center">Welcome!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent class="ion-text-center ion-text-bold">
            Spotify Playlist App allows you to add extended funtionality to your
            playlists! We need to authententicate you first! Press the button
            below to begin.
          </IonCardContent>

          <IonCardContent>
            <IonButton class="" expand="block" color="success" strong="true">
              Connect
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default Home;
