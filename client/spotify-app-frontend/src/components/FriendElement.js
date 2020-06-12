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
  IonProgressBar,
} from "@ionic/react";
import { add, arrowDown, addCircle } from "ionicons/icons";
import "@ionic/core/css/ionic.bundle.css";
import PlaylistItem from "./PlaylistItem";

function FriendElement(props) {
  const [userModal, setUserModal] = useState(false);
  const [Waiting, setWaiting] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFriend, setFriend] = useState(<IonSpinner name="crescent" />);

  function followUser() {
    var user_token3 = Cookies.get("key");
    var username3 = props.friend.username;

    var data3 = { user_token: user_token3, username: username3 };
    axios
      .post("/api/friendrequest", data3, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFriend(sendingFriend);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function acceptFriend() {
    var user_token4 = Cookies.get("key");
    var username4 = props.friend.username;

    var data4 = { user_token: user_token4, username: username4 };
    axios
      .post("/api/friendaccept", data4, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFriend(areFriends);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFriend() {
    var user_token2 = Cookies.get("key");
    var username2 = props.friend.username;
    var data2 = { user_token: user_token2, username: username2 };
    console.log(data2);
    axios
      .post("/api/getFriend", data2, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.isFriend);
        if (response.data.isFriend === 400) {
          setFriend(selfUser);
        }
        if (response.data.isFriend === -1) {
          setFriend(notFriends);
        }
        if (response.data.isFriend === 2) {
          setFriend(sendingFriend);
        }
        if (response.data.isFriend === 0) {
          setFriend(recievingFriend);
        }
        if (response.data.isFriend === 1) {
          setFriend(areFriends);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPlaylists() {
    getFriend();
    setUserModal(true);
    setLoading(true);
    var username = props.friend.username;
    var data = { username: username };
    console.log(data);
    axios
      .post("/api/getuserplaylists", data, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000 * 6,
      })
      .then((response) => {
        console.log(response);
        setUserPlaylists(response.data);
        console.log(response.data);
        setWaiting(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
  }
  useEffect(() => {
    getFriend();
  }, []);

  var notFriends = (
    <IonButton
      slot="end"
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
      slot="end"
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
      slot="end"
      expand="block"
      color="medium"
      onClick={() => {
        acceptFriend();
      }}
    >
      Accept?
    </IonButton>
  );

  var areFriends = (
    <IonButton
      slot="end"
      expand="block"
      color="success"
      onClick={() => {
        console.log("Friends");
      }}
    >
      Friends
    </IonButton>
  );

  var selfUser = <div></div>;

  return (
    <>
      <IonModal isOpen={userModal} cssClass="my-custom-class">
        <IonCard>
          <IonItem>
            <IonThumbnail slot="start">
              {props.friend.profile_picture !== "" ? (
                <img src={props.friend.profile_picture} />
              ) : (
                <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
              )}
            </IonThumbnail>
            <IonCardTitle>
              {props.friend.fname} {props.friend.lname}
            </IonCardTitle>
            {isFriend}
          </IonItem>
          <IonListHeader>Playlists</IonListHeader>
          {isLoading ? (
            <IonCard>
              <IonCardContent>
                <IonHeader>Loading Playlists...</IonHeader>
                <IonProgressBar type="indeterminate"></IonProgressBar>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonList>
              {userPlaylists.map((playlist) => (
                <PlaylistItem playlist={playlist} />
              ))}
            </IonList>
          )}
        </IonCard>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="medium" onClick={() => setUserModal(false)}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonModal>
      <IonCard>
        <IonItem
          lines="none"
          button
          onClick={() => {
            getPlaylists();
          }}
        >
          <IonAvatar slot="start">
            {props.friend.profile_picture !== "" ? (
              <img src={props.friend.profile_picture} />
            ) : (
              <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
            )}
          </IonAvatar>
          <h1>{props.friend.username}</h1>
          {isFriend}
        </IonItem>
      </IonCard>
    </>
  );
}

export default FriendElement;
