export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  ageRange: {
    min: number;
    max: number;
  };
  price: number;
  isFree: boolean;
  availableSeats: number;
  totalSeats: number;
  image?: string;
  featured?: boolean;
  tags?: string[];
}