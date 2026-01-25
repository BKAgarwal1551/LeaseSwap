
export enum AppScreen {
  DISCOVER = 'DISCOVER',
  MESSAGES = 'MESSAGES',
  SWAPS = 'SWAPS',
  PROFILE = 'PROFILE',
  CREATE_LISTING = 'CREATE_LISTING',
  CHAT_DETAIL = 'CHAT_DETAIL',
  MATCH_FOUND = 'MATCH_FOUND'
}

export interface Property {
  id: string;
  suburb: string;
  rent: number;
  beds: number;
  baths: number;
  parking: number;
  image: string;
  verified: boolean;
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  listingTitle?: string;
}
