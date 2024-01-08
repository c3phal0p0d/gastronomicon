import { MongoClient } from "mongodb";

let uri: string = process.env.MONGODB_URI || '';
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    let globalWithMongoClientPromise = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>;
    };

    if (!globalWithMongoClientPromise._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongoClientPromise._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;