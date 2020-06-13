import React from 'react';
import ReactPlayer from 'react-player';


interface Artists {
    name: string
}

export interface Track {
    name: string,
    artists: Artists[],
    image: string,
    preview: string
}

interface IProps{
    track: Track
}


export const Player: React.FC<IProps> = props => {
    return (
        <React.Fragment>
        <ReactPlayer 
        url={props.track.preview} 
        controls={true} 
        config={{
            file:{
                forceAudio: true
            }
        }}/>
        </React.Fragment>
    );
}

