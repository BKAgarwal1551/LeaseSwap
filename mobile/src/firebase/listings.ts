import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Listing } from '../types';

const listingsCol = collection(db, 'listings');

export async function createListing(input: Omit<Listing, 'id'>) {
  const docRef = await addDoc(listingsCol, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function fetchListings(max = 20): Promise<Listing[]> {
  const q = query(listingsCol, orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Listing[];
}
