import React from "react";
import ReactPlayer from "react-player";
import {
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

interface Artists {
  name: string;
}

export interface Track {
  name: string;
  artists: Artists[];
  image: string;
  preview: string;
}

interface IProps {
  track: Track;
}

export const Player: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.track.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            {props.track.artists.map(artist => artist.name)}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={props.track.image}
          title={props.track.name}
        />
      </Card>
      <ReactPlayer
        url={props.track.preview}
        controls={true}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />
    </React.Fragment>
  );
};
