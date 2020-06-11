import React from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import './App.css';

interface IState{
  songName: string;
}

class App extends React.Component<{}, IState> {
  
  public constructor(props: {}){
    super(props);
    this.state = {
      songName: ""
    }
  }

  private handleSongNameChange = (songName: string) => {
    this.setState({ songName });
  }

  private handleClick = () => {
    console.log("Click Works!");
  }

  public render(){
    return (
      <div className="App">
        <h1>Song Explorer</h1>
        <SearchBox songName={this.state.songName} onSongNameChange={this.handleSongNameChange} onClick={this.handleClick}/>
      </div>
    )
  };
}

export default App;
