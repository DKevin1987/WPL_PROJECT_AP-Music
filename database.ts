import { MongoClient, Collection, GridFSBucket } from "mongodb";
import {Artist, Mood, Track, type User} from "./data/interfaces"
import dotenv from "dotenv";
import mood from "./routers/mood";


dotenv.config();

const uri = process.env.CONNECTION_STRING!;

export const client = new MongoClient(uri);


const DBName            = "wpl_test"

const User_collection   = "users"
const Track_collection  = "tracks"
const Artist_collection = "artists"

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}


export const user_collection:  Collection<User> =
    client.db(DBName).collection<User>(User_collection);

export const artist_collection: Collection<Artist> =
    client.db(DBName).collection<Artist>(Artist_collection);

export const track_collection:     Collection<Track> =
    client.db(DBName).collection<Track>(Track_collection);

export const bucket = 
    new GridFSBucket(client.db(DBName), { bucketName: 'music' });









