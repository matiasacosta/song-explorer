import React from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { Player, Track } from '../Player/Player';
import './App.css';

const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "";
const redirectUri = "http://localhost:3000";

interface IState{
  token: string;
  songName: string;
  track: Track;
}

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split("&")
  .map(function(item){
    if (item) {
      let parts: string[] = item.split("=");
      if(parts[0] === "access_token"){
        return parts[1];
      }
    }
    return "";
  });

window.location.hash = "";

class App extends React.Component<{}, IState> {
  
  public constructor(props: {}){
    super(props);
    this.state = {
      token: "",
      songName: "",
      track: {name:"",artists:[],image:"",preview:""}
    }
  }

  public componentDidMount() {
    for (let value of hash){
      if (value !== "") {
        // Set token
        this.setState({token:value});
      }
    }  
  }

  private handleSongNameChange = (songName: string) => {
    this.setState({ songName });
  }

  private handleClick = () => {
    const headers = new Headers({'Authorization': `Bearer ${this.state.token}`});
    const init = {method: "GET", headers: headers};

    if(this.state.token !== ""){
      let songName = this.state.songName.replace(" ","%20");
      fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=1`, init)
      .then(response => response.json())
      .then(response => {
          let trackItem = response.tracks.items[0];
          let newTrack: Track = {
            name: trackItem.name,
            artists: trackItem.artists.map(
              (artist:any) => { return {name:artist.name}}
            ),
            image: trackItem.album.images[1].url,
            preview: trackItem.preview_url
          }
          this.setState({track:newTrack});
      })
      .catch(error => console.log("Error"));
    }
  }

  public render(){
    return (
      <div className="App">
        {!this.state.token && (
          <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
          >
          Login to Spotify
          </a>
        )}
        {this.state.token && (
          <React.Fragment>
            <h1>Song Explorer</h1>
            <SearchBox songName={this.state.songName} onSongNameChange={this.handleSongNameChange} onClick={this.handleClick}/>
          </React.Fragment>
        )}
        {this.state.track &&(
          <Player track={this.state.track}/>
        )}
      </div>
    )
  };
}

export default App;
