import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://dane:test@testcluster.kyu97aj.mongodb.net/?retryWrites=true&w=majority'

let client;
let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === 'development') {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   }
//
//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
// }

export default clientPromise;
