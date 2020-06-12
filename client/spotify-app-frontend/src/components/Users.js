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
import UserElement from "./UserElement";
import NavMenu from "./NavMenu";

function Users(params) {
  const [searchText, setSearchText] = useState("");
  const [UserData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function checkLogin() {
    if (Cookies.get("key") === "") {
      window.location.replace("/");
    }
  }

  function getUsers() {
    console.log(searchText);

    var data = { searchquery: searchText };
    //Get Search Query

    //Set Loading
    setLoading(true);

    //Ping Database with Search Query

    axios
      .post("/api/users", data, {
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

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
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
        <IonContent>
          <IonList>
            {UserData.map((user) => (
              <UserElement user={user} />
            ))}
          </IonList>
        </IonContent>
      ) : (
        <IonCard></IonCard>
      )}
    </IonPage>
  );
}
export default Users;
