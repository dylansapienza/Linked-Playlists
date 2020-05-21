import React, { useState } from "react";
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
  IonList,
  IonItem,
  IonInput,
  IonItemDivider,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function AddAccountInfo(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("id");

  const [username, setUsername] = useState();
  const [fname, setFname] = useState();
  const [lanme, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Spotify Playlist App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle class="ion-text-center">
              Account Creation
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent class="ion-text-center ion-text-bold">
            <IonText color="dark">
              We found your associated spotify account. To register we need to
              know a little bit more about you first.
            </IonText>
            <IonList inset="true">
              <IonItem>
                <IonInput
                  value={username}
                  placeholder="Username"
                  required="true"
                  onIonChange={(e) => setUsername(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={fname}
                  placeholder="First Name"
                  onIonChange={(e) => setFname(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={lname}
                  placeholder="Last Name"
                  onIonChange={(e) => setLname(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={email}
                  inputmode="email"
                  pattern="email"
                  required="true"
                  placeholder="Email Address"
                  onIonChange={(e) => setEmail(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={password}
                  type="password"
                  required="true"
                  placeholder="Password"
                  onIonChange={(e) => setPassword(e.detail.value)}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonCardContent>

          <IonCardContent>
            <IonButton
              href="http://localhost:8888/login"
              expand="block"
              color="success"
              strong="true"
            >
              Connect
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default AddAccountInfo;
