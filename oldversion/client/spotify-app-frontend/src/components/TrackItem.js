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
  const [recommendationInfo, setRecommendationInfo] = useState(false);
  const [recommender, setRecommender] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function getRecommendation() {
    const trackuri = props.track.track.uri;
    const playlist_id = props.playlist.p_id;
    console.log(
      "Checking Recommendation Info For",
      trackuri,
      "in playlist",
      playlist_id
    );

    var data = { trackuri: trackuri, playlist_id: props.playlist.p_id };
    //}
    axios
      .post("/api/getrecommendation", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.recommendationinfo);
        setRecommender(response.data.recommendationinfo.username);
        setRating(response.data.recommendationinfo.rating);
        setComment(response.data.recommendationinfo.comment);
        setRecommendationInfo(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            {recommendationInfo ? (
              <>
                <IonItem>
                  <IonLabel>Recommender: {recommender}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Rating: {rating}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonTextarea readonly="true">{comment}</IonTextarea>
                </IonItem>
              </>
            ) : (
              <IonItem>
                <IonLabel>Added By Host.</IonLabel>
              </IonItem>
            )}
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
          getRecommendation();
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
