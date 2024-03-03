import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://dane:test@testcluster.kyu97aj.mongodb.net/?retryWrites=true&w=majority'

let client;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
