export interface BookingFormData {
  parentName: string;
  email: string;
  phone: string;
  childrenCount: number;
  childrenAges: string;
  eventId: string;
  specialNeeds?: string;
}

export interface BookingSubmission extends BookingFormData {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}