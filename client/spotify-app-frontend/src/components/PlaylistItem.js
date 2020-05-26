import React from "react";
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
  IonAvatar,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";

function PlaylistItem(props) {
  return (
    <IonItem
      button
      onClick={() => {
        console.log(props.playlist);
      }}
    >
      <IonAvatar slot="start">
        <img src="https://www.playlist.com/playlist-logo-1.png"></img>
      </IonAvatar>
      <IonLabel>
        <h2>{props.playlist.p_name}</h2>
        <h3>{props.playlist.p_desc}</h3>
        <p>Last Add........</p>
      </IonLabel>
    </IonItem>
  );
}

export default PlaylistItem;
