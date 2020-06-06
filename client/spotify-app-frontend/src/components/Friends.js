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
  IonMenuButton,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import FriendElement from "./FriendElement";
import NavMenu from "./NavMenu";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function getFriends() {
    const user_token = Cookies.get("key");
    var data = { user_token: user_token };

    axios
      .post("http://localhost:8888/api/getfriends", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setFriends(response.data.friends);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
          <IonTitle>Friends</IonTitle>
        </IonToolbar>
      </IonHeader>
      {friends !== [] ? (
        <IonContent>
          <IonList>
            {friends.map((friend) => (
              <FriendElement friend={friend} />
            ))}
          </IonList>
        </IonContent>
      ) : (
        <IonCard></IonCard>
      )}
    </IonPage>
  );
}

export default Friends;
