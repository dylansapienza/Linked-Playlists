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
} from "@ionic/react";
import { add, arrowDown, addCircle } from "ionicons/icons";
import "@ionic/core/css/ionic.bundle.css";

function UserElement(props) {
  const [userModal, setUserModal] = useState(false);

  return (
    <>
      <IonModal isOpen={userModal} cssClass="my-custom-class">
        <IonCard>
          <IonItem>
            <IonThumbnail slot="start">
              <img src={props.user.profile_picture} />
            </IonThumbnail>
            <IonCardTitle>
              {props.user.fname} {props.user.lname}
            </IonCardTitle>
          </IonItem>
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
          setUserModal(true);
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
