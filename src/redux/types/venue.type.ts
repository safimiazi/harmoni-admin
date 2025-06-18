export type VenueStatus = "active" | "hold" | "suspend";

export interface Venue {
  id: string;
  venueName: string;
  status: VenueStatus;
  address: string;
  totalEarning: number;
  commission: number;
  photo: string;
  coverImage?: string;
}
