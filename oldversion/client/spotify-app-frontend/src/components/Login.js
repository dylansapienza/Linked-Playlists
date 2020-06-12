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
  IonList,
  IonItem,
  IonInput,
  IonItemDivider,
  IonToast,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function Login(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const newacc = urlParams.get("n");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  function postInfo(username, password) {
    const p_info = {
      username: username,
      password: password,
    };
    axios
      .post("/login", p_info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //window.location.replace(response.data);
        if (response.data === "Invalid Username/Password") {
          console.log("INVALID");
          setError(response.data);
          return;
        }
        Cookies.set("key", "");
        Cookies.set("key", response.data);
        window.location.replace("http://localhost:3000/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            <IonCardTitle class="ion-text-center">Login</IonCardTitle>
          </IonCardHeader>

          <IonCardContent class="ion-text-center ion-text-bold">
            <IonText color="dark">
              Enter Your Account Information
              <br />
            </IonText>
            <IonText color="danger">{error}</IonText>
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
              onClick={() => postInfo(username, password)}
            >
              Login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default Login;
