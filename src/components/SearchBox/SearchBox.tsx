import React from "react";
import { useForm } from "react-hook-form";

type Song = {
  name: string;
};

export const SearchBox = () => {
  const { register, handleSubmit } = useForm<Song>();
  const onSubmit = (data: Song) => {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <input type="text" id="name" name="name" ref={register}/>
      </div>
      <button type="submit">Find</button>
    </form>
  );
};
