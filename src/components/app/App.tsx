import React, { useState, useEffect } from "react";
import { SearchBox } from "../SearchBox/SearchBox";
import { Player, Track } from "../Player/Player";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

/* Styles */
const customTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#11cb5f",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: theme.spacing(2)
  },
  loginButton: {
    margin: theme.spacing(2)
  }
}));
/* End Styles */

const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "";
const redirectUri = "http://localhost:3000";

interface IState {
  token: string;
  songName: string;
  track?: Track;
}

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split("&")
  .map(function (item) {
    if (item) {
      let parts: string[] = item.split("=");
      if (parts[0] === "access_token") {
        return parts[1];
      }
    }
    return "";
  });

window.location.hash = "";

export const App: React.FC = () => {
  const classes = useStyles();

  const [token, setToken] = useState("");
  const [songName, setSongName] = useState("");
  const [track, setTrack] = useState<Track>();

  useEffect(() => {
    for (let value of hash) {
      if (value !== "") {
        // Set token
        setToken(value);
      }
    }
  }, [token]);

  const handleSongNameChange = (songName: string) => {
    setSongName(songName);
  };

  const handleClick = () => {
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const init = { method: "GET", headers: headers };

    if (token !== "") {
      let songNameUrl = songName.replace(" ", "%20");
      fetch(
        `https://api.spotify.com/v1/search?q=${songNameUrl}&type=track&limit=1`,
        init
      )
        .then((response) => response.json())
        .then((response) => {
          let trackItem = response.tracks.items[0];
          let newTrack: Track = {
            name: trackItem.name,
            artists: trackItem.artists.map((artist: any) => {
              return { name: artist.name };
            }),
            image: trackItem.album.images[1].url,
            preview: trackItem.preview_url,
          };
          setTrack(newTrack);
        })
        .catch((error) => console.log("Error"));
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h3" className={classes.title} gutterBottom>
            Song Explorer
          </Typography>
          {!token && (
            <Button
              className={classes.loginButton}
              variant="outlined"
              color="primary"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
            >
              Login With Spotify
            </Button>
          )}
          {token && (
            <React.Fragment>
              <SearchBox
                songName={songName}
                onSongNameChange={handleSongNameChange}
                onClick={handleClick}
              />
            </React.Fragment>
          )}
          {track && token && <Player track={track} />}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
