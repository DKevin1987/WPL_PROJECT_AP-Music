
export type User = {
  email     :string,
  username  :string,
  password  :string,
  mood      :Mood,
  collection:Track_liked[]
}


export type Track_liked = {
  track_id: number,
  label   :string,
  added_on:Date
}




export enum Mood {
  angry   = "angry",
  sad     = "sad",
  happy   = "happy",
  neutral = "neutral",
} 


export type Playlist_track = {
  id         : number,
  preview    : string
  title      : string,
  artist     : string,
  image      : string,
  liked      : boolean,
}

export type Collection_track = {
  id         : number,
  preview    : string
  title      : string,
  artist     : string,
  image      : string,
  liked      : boolean,
  label      : string,
}


export type User_login = {
  email   :string,
  password:string,
}


export type User_register = {
  email     :string,
  username  :string,
  password  :string,
}