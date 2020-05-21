import React from "react";
import {
  IonApp,
  IonMenu,
  IonItem,
  IonCard,
  IonCardContent,
  IonRouterOutlet,
} from "@ionic/react";
import { BrowserRouter, Route } from "react-router-dom";
import "@ionic/core/css/ionic.bundle.css";
import "./App.css";
import Home from "./components/Home";
import AddAccountInfo from "./components/AddAccountInfo";
import MyPlaylists from "./components/MyPlaylists";

// const Menu = ({ history }) => {
//   <IonMenu>
//     <IonItem onClick={() => history.push("/")}>Home</IonItem>;
//     <IonItem onClick={() => history.push("/about")}>About</IonItem>;
//   </IonMenu>;
// };

const About = () => <p>About</p>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:8888/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <BrowserRouter>
        <IonApp>
          <Route exact path="/" component={Home} />
          <Route path="/accountinfo" component={AddAccountInfo} />
          <Route path="/playlists" component={MyPlaylists} />
        </IonApp>
      </BrowserRouter>
    );
  }
}

export default App;
