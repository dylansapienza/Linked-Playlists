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
  menuController,
  IonSearchbar,
  IonFooter,
  IonAvatar,
  IonModal,
  IonFab,
  IonFabButton,
  IonIcon,
  IonThumbnail,
  IonListHeader,
} from "@ionic/react";
import { add, arrowDown, addCircle } from "ionicons/icons";
import "@ionic/core/css/ionic.bundle.css";
import PlaylistItem from "./PlaylistItem";

function UserElement(props) {
  const [userModal, setUserModal] = useState(false);
  const [Waiting, setWaiting] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);

  function getPlaylists() {
    setUserModal(true);
    Cookies.set("discovery", "y");
    var username = props.user.username;
    var data = { username: username };
    axios
      .post("http://localhost:8888/api/getPlaylists", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setUserPlaylists(response.data);
        console.log(response.data);
        setWaiting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <IonModal isOpen={userModal} cssClass="my-custom-class">
        <IonCard>
          <IonItem>
            <IonThumbnail slot="start">
              {props.user.profile_picture !== "" ? (
                <img src={props.user.profile_picture} />
              ) : (
                <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
              )}
            </IonThumbnail>
            <IonCardTitle>
              {props.user.fname} {props.user.lname}
            </IonCardTitle>
          </IonItem>
          <IonListHeader>My Playlists</IonListHeader>
          <IonList>
            {userPlaylists.map((playlist) => (
              <PlaylistItem playlist={playlist} />
            ))}
          </IonList>
        </IonCard>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="medium" onClick={() => setUserModal(false)}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonModal>

      <IonItem
        button
        onClick={() => {
          getPlaylists();
        }}
      >
        <IonAvatar slot="start">
          {props.user.profile_picture !== "" ? (
            <img src={props.user.profile_picture} />
          ) : (
            <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
          )}
        </IonAvatar>
        <h1>{props.user.username}</h1>
      </IonItem>
    </>
  );
}

export default UserElement;
