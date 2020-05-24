import React from "react";
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
  IonSlider,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonListHeader,
  IonAvatar,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import PlaylistItem from "./PlaylistItem";

var MyPlaylists = ["Playlist 1", "Playlist 2", "Playlist 3"];

var FriendPlaylists = ["Playlist 4", "Playlist 5"];

function getPlaylists() {
  var user_token = Cookies.get("key");
  var data = { user_token: user_token };
  axios
    .post("http://localhost:8888/getPlaylists", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      MyPlaylists = response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function MyPlaylist() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonListHeader>My Playlists</IonListHeader>
          <IonList>
            {MyPlaylists.map((playlist) => (
              <PlaylistItem playlist={playlist} />
            ))}
          </IonList>

          <IonListHeader>Following Playlists</IonListHeader>
          <IonList>
            {FriendPlaylists.map((playlist) => (
              <PlaylistItem playlist={playlist} />
            ))}
          </IonList>
          <IonCardContent>
            <IonButton
              expand="block"
              color="success"
              strong="true"
              onClick={() => getPlaylists()}
            >
              Submit
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default MyPlaylist;
