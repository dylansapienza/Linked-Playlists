import React, { useState } from "react";
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
  IonList,
  IonItem,
  IonInput,
  IonItemDivider,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function postInfo(username, fname, lname, email, password, user_id) {
  const p_info = {
    spotify_id: user_id,
    username: username,
    fname: fname,
    lname: lname,
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:8888/accountcreation", p_info, {
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

function AddAccountInfo(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("id");

  const [username, setUsername] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
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
              expand="block"
              color="success"
              strong="true"
              onClick={() =>
                postInfo(username, fname, lname, email, password, user_id)
              }
            >
              Submit
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default AddAccountInfo;
