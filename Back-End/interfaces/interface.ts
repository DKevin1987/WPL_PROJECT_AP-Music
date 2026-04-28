export interface artist {
    id: number
    name: string
    sort_name: string
    area_name: string
    area_iso_3166_1_codes: string
    type: string
    genre: string
    link: string
    picture: string
    picture_small: string
    picture_medium: string
    picture_big: string
    picture_xl: string
    nb_album: number
    nb_fan: number
}

export interface track {
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
}

// ✅ Nieuw: Song interface voor het muziekspel
export interface Song {
    id: number
    title: string
    artist: string
    cover: string
    lastfmQuery: string
}