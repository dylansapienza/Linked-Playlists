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

function SearchItem(props) {
  const [trackModal, setTrackModal] = useState(false);
  const [recommendationInfo, setRecommendationInfo] = useState(false);
  const [recommender, setRecommender] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function selectSong() {
    props.setTrackName(props.track.uri);
    setTrackModal(false);
    props.setSongSearch(false);
  }

  return (
    <>
      <IonModal isOpen={trackModal} cssClass="my-custom-class">
        <IonCard>
          <img src={props.track.album.images[0].url}></img>
          <IonCardContent>
            <IonCardTitle>{props.track.name}</IonCardTitle>
          </IonCardContent>
        </IonCard>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>{props.track.artists[0].name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{props.track.album.name}</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonButton onClick={() => selectSong()}></IonButton>
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
          <img src={props.track.album.images[0].url}></img>
        </IonThumbnail>
        <IonLabel>
          <h2>{props.track.name}</h2>
          <h3>{props.track.artists[0].name}</h3>
        </IonLabel>
      </IonItem>
    </>
  );
}

export default SearchItem;
