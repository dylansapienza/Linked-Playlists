import React, { useState, useEffect } from "react";
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
  IonLoading,
  IonProgressBar,
  IonToast,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import { add, arrowDown, addCircle } from "ionicons/icons";
import PlaylistItem from "./PlaylistItem";

// function getPlaylists() {
//   var user_token = Cookies.get("key");
//   var data = { user_token: user_token };
//   axios
//     .post("http://localhost:8888/api/getPlaylists", data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       console.log(response);
//       MyPlaylists = response;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

//Clean this up and Work on some Caching System
//Delete Playlist Function, Although NOT IMPORTANT NOW

function MyPlaylist() {
  const [showModal, setShowModal] = useState(false);
  const [playlist_name, setPlaylist_Name] = useState();
  const [playlist_description, setPlaylist_Description] = useState();
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isWaiting, setWaiting] = useState(true);
  const [MyPlaylists, setPlaylists] = useState([]);
  const [FriendPlaylists, setFriendPlaylists] = useState([]);

  function getPlaylists() {
    var user_token = Cookies.get("key");
    var data = { user_token: user_token };
    axios
      .post("http://localhost:8888/api/getPlaylists", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setPlaylists(response.data);
        console.log(MyPlaylist);
        setWaiting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createPlaylist(p_name, p_desc) {
    var token = Cookies.get("key");
    var data = { token: token, p_name: p_name, p_desc: p_desc };
    console.log(data);
    setLoading(true);
    axios
      .post("http://localhost:8888/api/playlist", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("RESPONSE:" + JSON.stringify(response));
        setLoading(false);
        setShowModal(false);
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getPlaylists();
  }, []);

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
              {isLoading ? (
                <>
                  <IonHeader>Creating Playlist...</IonHeader>
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                </>
              ) : (
                <IonButton
                  color="success"
                  expand="block"
                  onClick={() =>
                    createPlaylist(playlist_name, playlist_description)
                  }
                >
                  Create Playlist
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
          <IonFab horizontal="end" vertical="bottom">
            <IonFabButton color="medium" onClick={() => setShowModal(false)}>
              <IonIcon icon={arrowDown} />
            </IonFabButton>
          </IonFab>
        </IonModal>
        <IonCard>
          {isWaiting ? (
            <>
              <IonHeader>Loading Playlists...</IonHeader>
              <IonProgressBar type="indeterminate"></IonProgressBar>
            </>
          ) : (
            <>
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
            </>
          )}

          <IonCardContent></IonCardContent>
        </IonCard>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="success" onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonToast
          color="medium"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Your Playlist Has Been Created."
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
}

export default MyPlaylist;
