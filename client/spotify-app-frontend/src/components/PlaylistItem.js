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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonVirtualScroll,
  IonThumbnail,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import TrackItem from "../components/TrackItem";

function PlaylistItem(props) {
  const [isLoading, setLoading] = useState(true);
  const [showSongs, setShowSongs] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [trackName, setTrackName] = useState("");

  function openPlaylist() {
    setShowSongs(true);
    var user_token = Cookies.get("key");
    var data = { user_token: user_token, playlist_id: props.playlist.p_id };
    axios
      .post("http://localhost:8888/api/getTracks", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.trackArray.items);
        setTracks(response.data.trackArray.items);
        console.log(tracks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <IonModal isOpen={showAdd} cssClass="my-custom-class">
        <IonCard>
          <IonCardTitle>Add Song to {props.playlist.p_name}</IonCardTitle>
          <IonCardContent>
            <IonList inset="true">
              <IonItem>
                <IonInput
                  value={trackName}
                  placeholder="Track Name"
                  required="true"
                  onIonChange={(e) => setTrackName(e.detail.value)}
                ></IonInput>
              </IonItem>
            </IonList>
            {isLoading ? (
              <>
                <IonHeader>Adding Song...</IonHeader>
                <IonProgressBar type="indeterminate"></IonProgressBar>
              </>
            ) : (
              <IonButton
                color="success"
                expand="block"
                // onClick={() => ()}
              >
                Add Track
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="medium" onClick={() => setShowAdd(false)}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonModal>

      <IonModal isOpen={showSongs} cssClass="my-custom-class">
        <IonCard>
          <IonCardContent>
            <IonCardTitle>{props.playlist.p_name}</IonCardTitle>
            <IonCardSubtitle>{props.playlist.p_desc}</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        {isLoading ? (
          <>
            <IonHeader>Getting Tracks...</IonHeader>
            <IonProgressBar type="indeterminate"></IonProgressBar>
          </>
        ) : (
          <IonContent>
            <IonList>
              {tracks.map((track) => (
                <TrackItem track={track} />
              ))}
            </IonList>
          </IonContent>
        )}

        <IonFab horizontal="start" vertical="bottom">
          <IonFabButton color="success" onClick={() => setShowAdd(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="medium" onClick={() => setShowSongs(false)}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonModal>

      <IonItem
        button
        onClick={() => {
          openPlaylist();
        }}
      >
        <IonThumbnail slot="start">
          <img src={props.playlist.p_images[0].url}></img>
          {/* <img src="https://i.etsystatic.com/5302623/r/il/92edd2/1963352064/il_570xN.1963352064_a17y.jpg"></img> */}
        </IonThumbnail>
        <IonLabel>
          <h2>{props.playlist.p_name}</h2>
          <h3>{props.playlist.p_desc}</h3>
          <p>Last Add........</p>
        </IonLabel>
      </IonItem>
    </>
  );
}

export default PlaylistItem;
