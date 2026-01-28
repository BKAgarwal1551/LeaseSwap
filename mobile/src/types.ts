export type ListingIntent = 'swap' | 'let_go';

export type Listing = {
  id: string;
  ownerId: string;
  suburb: string;
  state: string;
  rentWeekly: number;
  beds: number;
  baths: number;
  parking: number;
  images: string[];
  verified: boolean;
  description: string;
  intent: ListingIntent;
};

export type ChatThread = {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  avatarUrl?: string;
  unread?: boolean;
};
