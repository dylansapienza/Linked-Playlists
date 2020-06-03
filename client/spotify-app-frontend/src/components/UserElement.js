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
  IonSpinner,
} from "@ionic/react";
import { add, arrowDown, addCircle } from "ionicons/icons";
import "@ionic/core/css/ionic.bundle.css";
import PlaylistItem from "./PlaylistItem";

function UserElement(props) {
  const [userModal, setUserModal] = useState(false);
  const [Waiting, setWaiting] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isFriend, setFriend] = useState(<IonSpinner name="crescent" />);

  function followUser() {
    console.log(props.user.username);
  }

  function getFriend() {
    var user_token2 = Cookies.get("key");
    var username2 = props.user.username;
    var data2 = { user_token: user_token2, username: username2 };
    axios
      .post("http://localhost:8888/api/getFriend", data2, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPlaylists() {
    getFriend();
    setUserModal(true);
    Cookies.set("discovery", "y");
    var username = props.user.username;
    var data = { username: username };
    console.log(data);
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

  var notFriends = (
    <IonButton
      expand="block"
      color="medium"
      onClick={() => {
        followUser();
      }}
    >
      + Friend
    </IonButton>
  );

  var sendingFriend = (
    <IonButton
      expand="block"
      color="medium"
      onClick={() => {
        console.log("Waiting!");
      }}
    >
      Pending...
    </IonButton>
  );

  var recievingFriend = (
    <IonButton
      expand="block"
      color="medium"
      onClick={() => {
        console.log("Waiting!");
      }}
    >
      Accept?
    </IonButton>
  );

  var areFriends = (
    <IonButton
      expand="block"
      color="success"
      onClick={() => {
        console.log("Waiting!");
      }}
    >
      Friends
    </IonButton>
  );

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
            {isFriend}
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
