import React from "react";


interface IProps {
  songName: string;
  onSongNameChange: (name: string) => void;
  onClick: () => void;
}

export const SearchBox: React.FC<IProps> = props => {
  const handleNameSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSongNameChange(e.currentTarget.value);
  };
  
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onClick();
  }

  return (
    <form>
      <div className="field">
        <input type="text" id="songName"
        name="songName" value={props.songName} onChange={handleNameSongChange}/>
      </div>
      <button onClick={handleClick}>Find</button>
    </form>
  );
};
