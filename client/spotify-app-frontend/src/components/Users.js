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
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import UserElement from "./UserElement";

function Users(params) {
  const [searchText, setSearchText] = useState("");
  const [UserData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function getUsers() {
    console.log(searchText);

    var data = { searchquery: searchText };
    //Get Search Query

    //Set Loading
    setLoading(true);

    //Ping Database with Search Query

    axios
      .post("http://localhost:8888/api/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //Loading...
        setLoading(false);
        //setShowAdd(false);
        //setShowSongs(false);
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //On Return setUserData

    //UnSetLoading
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Discovery</IonTitle>
        </IonToolbar>
        <IonCard>
          <IonItem>
            <IonSearchbar
              value={searchText}
              placeholder="Username"
              onIonChange={(e) => setSearchText(e.detail.value)}
              animated
            ></IonSearchbar>
            <IonButton color="success" size="small" onClick={() => getUsers()}>
              Search
            </IonButton>
          </IonItem>
        </IonCard>
      </IonHeader>
      {UserData !== [] ? (
        <IonList>
          {UserData.map((user) => (
            <UserElement user={user} />
          ))}
        </IonList>
      ) : (
        <IonCard></IonCard>
      )}
    </IonPage>
  );
}
export default Users;
