import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('sample_restaurants');
    const usersCollection = db.collection('restaurants');

    const restaurants = await usersCollection.find({}).limit(100).toArray();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
