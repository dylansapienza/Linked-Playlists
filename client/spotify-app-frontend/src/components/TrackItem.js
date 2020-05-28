import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { add, arrowDown, addCircle } from "ionicons/icons";
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
  IonAvatar,
  IonModal,
  IonFab,
  IonFabButton,
  IonProgressBar,
  IonIcon,
  IonThumbnail,
  IonTextarea,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function TrackItem(props) {
  const [trackModal, setTrackModal] = useState(false);

  return (
    <>
      <IonModal isOpen={trackModal} cssClass="my-custom-class">
        <IonCard>
          <img src={props.track.track.album.images[0].url}></img>
          <IonCardContent>
            <IonCardTitle>{props.track.track.name}</IonCardTitle>
          </IonCardContent>
        </IonCard>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>{props.track.track.artists[0].name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{props.track.track.album.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Recommender: {props.track.track.album.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Rating: {props.track.track.album.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonTextarea readonly="true">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </IonTextarea>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="medium" onClick={() => setTrackModal(false)}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonModal>

      <IonItem
        button
        onClick={() => {
          setTrackModal(true);
        }}
      >
        <IonThumbnail slot="start">
          <img src={props.track.track.album.images[0].url}></img>
        </IonThumbnail>
        <IonLabel>
          <h2>{props.track.track.name}</h2>
          <h3>{props.track.track.artists[0].name}</h3>
        </IonLabel>
      </IonItem>
    </>
  );
}

export default TrackItem;
