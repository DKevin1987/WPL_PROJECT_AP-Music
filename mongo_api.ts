import { type User, Mood, Playlist_track, Track, Track_liked, track_to_playlist_track} from "./data/interfaces";
import { track_collection, user_collection } from "./database";
import { WithId } from "mongodb";



export async function db_add_user(user:User): Promise<boolean> {
    const result = await user_collection.insertOne(user);
    return result.acknowledged
    
}


export async function db_get_all_users():Promise<User[]> {
    const users = await user_collection.find<User>({}).toArray();
    return  users
}

export async function db_like_track(useremail:string, liked_track:Track_liked) {
    
    console.log(liked_track, " is likde ad");
    
    await user_collection.updateOne(
        { email: useremail, 'collection.track_id': { $ne: liked_track.track_id } },
        { $push: { collection: liked_track } }
        );


}

export async function db_remove_liked_track(usermail:string, track_id:number) {
    await user_collection.updateOne(
        { email: usermail },
        { $pull: { collection: { track_id: track_id } } }
        );

}




export async function db_get_user_by_email(useremail: string | undefined): Promise<User | null> {   
    
    let result = await user_collection.findOne<User>( {"email":useremail} );
    
    return result
}




export async function db_change_user_mood(email:string, mood:Mood) {
    console.log(mood);
    
    await user_collection.updateOne({ email: email }, { $set: { mood: mood } });
}


export async function db_get_tracks_by_mood(mood:Mood): Promise<Track[]> {
 
    const tracks = await track_collection.find({mood:mood}).toArray()

    let playlist_gen: WithId<Track>[] = []

    for (let i = 0; i < 10; i++) {

        const rand_num = Math.round( Math.random() * (tracks.length - 1) )
        
        playlist_gen.push( tracks[rand_num] )
    }

    return playlist_gen

}

export async function db_get_track_by_id(id:number | undefined): Promise<Track | null> {
    
    let result = await track_collection.findOne<Track>( {"id": id} );

    return result
}


export async function db_search_songs(query:string): Promise<Track[]> {
    const result = await track_collection
        .find({ title: { $regex: query, $options: 'i'} })
        .limit(10)
        .toArray()
    ;
    console.log(query);
    
    return result
}