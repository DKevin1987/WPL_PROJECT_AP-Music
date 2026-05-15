
export function Check_if_valid_enum<T,K>(enum_a: { [s: string] : T } | ArrayLike<T>, text:string | undefined, default_value:K): T | K{
  const result = Object.values(enum_a).find(x => x == text) 
  if (!result) {
    return default_value
  }
  return result
}


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

export type Email = {
  value:string
} 


export enum Mood {
  angry   = "angry",
  sad     = "sad",
  happy   = "happy",
  neutral = "neutral",
} 



export type Mp3_header = {
    'Content-Type': string
    'Accept-Ranges': string,
    'Content-Length':number
}



export type Artist = {
    id:number
    name:string
    sort_name:string
    area_name:string
    area_iso_3166_1_codes:string
    type:string
    genre:string
    link:string
    picture:string
    picture_small:string
    picture_medium:string
    picture_big:string
    picture_xl:string
    nb_album:number
    nb_fan:number 
}

//track

export type Track = {
    id: number
    title: string
    title_short: string
    title_version: string
    album_title: string
    artist: string
    link: string
    duration: number
    rank: number
    explicit_lyrics: boolean
    preview: string
    artist_id: number
    album_cover: string
    album_cover_small: string
    album_cover_medium: string
    album_cover_big: string
    album_cover_xl: string
    album_type: string
    genre: string
    acousticness: number
    danceability: number
    energy: number
    liveness: number
    loudness: number
    speechiness: number
    tempo: number
    popularity: number
    mood:Mood
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


export function track_to_collection_track(track:Playlist_track,liked:boolean, track_liked:Track_liked):Collection_track {

  const collection_track:Collection_track = {
    id: track.id,
    preview: `/api/music/${track.id}.mp3`,
    title : track.title,
    artist: track.artist,
    image: track.image,
    liked: liked,
    label: track_liked.label,
  }
  return collection_track

}


const MAX_TITLE_LENGTH = 20

export function track_to_playlist_track(track:Track, liked:boolean) {
  

  const title_shortend =   track.title_short.length > 20 ? track.title_short.substring(0,20) : track.title_short 

  const playlist_track: Playlist_track = {
    id: track.id,
    preview: `/api/music/${track.id}.mp3`,
    title : title_shortend,
    artist: track.artist,
    image: track.album_cover_medium,
    liked: liked
  } 

  return playlist_track
}


export function playlist_track_to_Track_liked(collection:Track_liked[], tracks:Track[]):Playlist_track[] {

    let playlist_tracks:Playlist_track[] = tracks.map(track => {

            const if_liked = collection.find(collection_track => collection_track.track_id == track.id) ? true : false

            const playlist_track = track_to_playlist_track(track, if_liked)

            return playlist_track
        })

    return playlist_tracks
}



