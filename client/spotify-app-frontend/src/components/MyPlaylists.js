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
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonRadioGroup,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import { add } from "ionicons/icons";
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

function createPlaylist(p_name, p_desc) {
  var token = Cookies.get("key");
  var data = { token: token, p_name: p_name, p_desc: p_desc };
  console.log(data);

  axios
    .post("http://localhost:8888/api/playlist", data, {
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

function MyPlaylist() {
  const [showModal, setShowModal] = useState(false);
  const [playlist_name, setPlaylist_Name] = useState();
  const [playlist_description, setPlaylist_Description] = useState();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <IonCard>
            <IonCardContent>
              <IonCardTitle>Create A Playlist</IonCardTitle>
              <IonList inset="true">
                <IonItem>
                  <IonInput
                    value={playlist_name}
                    placeholder="Playlist Name"
                    required="true"
                    onIonChange={(e) => setPlaylist_Name(e.detail.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    value={playlist_description}
                    required="true"
                    placeholder="Description"
                    onIonChange={(e) => setPlaylist_Description(e.detail.value)}
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton
                color="success"
                expand="block"
                onClick={() =>
                  createPlaylist(playlist_name, playlist_description)
                }
              >
                Create Playlist
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
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
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="success" onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default MyPlaylist;
