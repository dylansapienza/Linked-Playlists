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
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function TrackItem(props) {
  return (
    <IonItem
    //   button
    //   onClick={() => {
    //     console.log(props.track);
    //   }}
    >
      <IonThumbnail slot="start">
        <img src={props.track.track.album.images[0].url}></img>
      </IonThumbnail>
      <IonLabel>
        <h2>{props.track.track.name}</h2>
        <h3>{props.track.track.artists[0].name}</h3>
      </IonLabel>
    </IonItem>
  );
}

export default TrackItem;
