import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { add, arrowDown, addCircle, starOutline } from "ionicons/icons";
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
  IonItemDivider,
  IonThumbnail,
  IonTextarea,
  IonRange,
} from "@ionic/react";
import "@ionic/core/css/ionic.bundle.css";
import TrackItem from "../components/TrackItem";

function PlaylistItem(props) {
  const [isLoading, setLoading] = useState(true);
  const [showSongs, setShowSongs] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [imgExists, setExists] = useState(false);
  const [fabButton, setFabButton] = useState(<div></div>);

  var owneradd = (
    <IonFab horizontal="start" vertical="bottom">
      <IonFabButton color="success" onClick={() => setShowAdd(true)}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );

  var friendadd = (
    <IonFab horizontal="start" vertical="bottom">
      <IonFabButton color="tertiary" onClick={() => setShowAdd(true)}>
        <IonIcon icon={starOutline} />
      </IonFabButton>
    </IonFab>
  );

  function addSong() {
    //Check if its a recommender or not to add song!

    var user_token = Cookies.get("key");
    var data;
    if (props.playlist.p_owner == 2) {
      data = {
        host_id: props.playlist.p_spotify_id,
        friend_id: user_token,
        playlist_id: props.playlist.p_id,
        comment: comment,
        rating: rating,
        song_id: trackName,
      };
    } else {
      data = {
        host_id: user_token,
        friend_id: "",
        playlist_id: props.playlist.p_id,
        comment: comment,
        rating: rating,
        song_id: trackName,
      };
    }
    setLoading(true);

    axios
      .post("http://localhost:8888/api/recommendation", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //Loading...
        setLoading(false);
        setShowAdd(false);
        setShowSongs(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openPlaylist() {
    setShowSongs(true);
    checkRelation();
    console.log(props);
    var user_token;
    var data;
    //For Security if Coming from discovery page, dont get other users token
    //This is a bug
    //Discovery is remaining set after user navigates away from discovery.
    //Should set discovery to N when on localhost:3000/playlists?
    // if (Cookies.get("discovery") === "y") {
    //   var username = props.playlist.p_spotify_id;
    //   data = { username: username, playlist_id: props.playlist.p_id };
    // } else {
    user_token = Cookies.get("key");
    data = { user_token: user_token, playlist_id: props.playlist.p_id };
    //}
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

  function checkRelation() {
    var user_token2 = Cookies.get("key");
    var p_owner = props.playlist.p_spotify_id;
    var data2 = { user_token: user_token2, p_owner: p_owner };
    console.log(data2);
    axios
      .post("http://localhost:8888/api/checkrelation", data2, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          setFabButton(owneradd);
        }
        if (response.data === 2) {
          setFabButton(friendadd);
          props.playlist.p_owner = 2;
        }
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
                  placeholder="Track ID"
                  required="true"
                  onIonChange={(e) => setTrackName(e.detail.value)}
                ></IonInput>
              </IonItem>
              {props.playlist.p_owner === 1 ? (
                <></>
              ) : (
                <>
                  <IonItem>
                    <IonTextarea
                      autoGrow="true"
                      value={comment}
                      placeholder="Comments"
                      onIonChange={(e) => setComment(e.detail.value)}
                    ></IonTextarea>
                  </IonItem>
                  <IonItem>
                    <IonRange
                      pin={true}
                      value={rating}
                      min={1}
                      max={10}
                      step={1}
                      snaps={true}
                      onIonChange={(e) => setRating(e.detail.value)}
                      color="success"
                    />
                  </IonItem>
                </>
              )}
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
                onClick={() => addSong()}
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
                <TrackItem track={track} playlist={props.playlist} />
              ))}
            </IonList>
          </IonContent>
        )}

        {/* <IonFab horizontal="start" vertical="bottom">
          <IonFabButton color="success" onClick={() => setShowAdd(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}
        {fabButton}
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
        {props.playlist.p_images ? (
          <IonThumbnail slot="start">
            {props.playlist.p_images[0] ? (
              <img src={props.playlist.p_images[0].url}></img>
            ) : (
              <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
            )}
          </IonThumbnail>
        ) : (
          <div></div>
        )}
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
