import React, { useState, useEffect } from "react";
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
  IonLabel,
  IonRow,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function Home(props) {
  const [error, setError] = useState("");

  function getError() {
    const query = new URLSearchParams(props.location.search);
    const error = query.get("error");
    if (error !== "") {
      setError(error);
    }
  }

  useEffect(() => {
    getError();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Linked Playlists</IonTitle>
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
            <IonText color="dark">
              Linked Playlists allows you to add extended funtionality to your
              playlists! We need to authententicate you first! Press the button
              below to begin.
            </IonText>
            <hr></hr>
            <IonText color="danger">
              <i>{error}</i>
            </IonText>
            <IonButton
              href="http://localhost:8888/login"
              expand="block"
              color="success"
              strong="true"
            >
              Connect
            </IonButton>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <IonText color="dark">
              <h2>Already have an account?</h2>
            </IonText>
            <hr></hr>
            <IonButton
              href="/login"
              expand="block"
              color="primary"
              strong="true"
            >
              Login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default Home;
