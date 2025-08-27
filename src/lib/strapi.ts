// Strapi integration configuration and utilities
// This file prepares the project for Strapi CMS integration
/* eslint-disable @typescript-eslint/no-explicit-any */

export const STRAPI_CONFIG = {
  // Update these values when connecting to your Strapi instance
  API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  API_TOKEN: process.env.STRAPI_API_TOKEN || '',
};

// Generic API fetch utility for Strapi
export async function fetchFromStrapi(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${STRAPI_CONFIG.API_URL}/api/${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_CONFIG.API_TOKEN && {
        'Authorization': `Bearer ${STRAPI_CONFIG.API_TOKEN}`,
      }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

// Event-specific API functions
export const strapiEventAPI = {
  // Get all events
  async getEvents(params?: {
    populate?: string;
    filters?: any;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.populate) searchParams.append('populate', params.populate);
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }
    if (params?.pagination) {
      searchParams.append('pagination[page]', String(params.pagination.page));
      searchParams.append('pagination[pageSize]', String(params.pagination.pageSize));
    }
    
    const endpoint = `events?${searchParams.toString()}`;
    return fetchFromStrapi(endpoint);
  },

  // Get single event by ID
  async getEvent(id: string, populate?: string) {
    const searchParams = new URLSearchParams();
    if (populate) searchParams.append('populate', populate);
    
    const endpoint = `events/${id}?${searchParams.toString()}`;
    return fetchFromStrapi(endpoint);
  },

  // Create new event (admin only)
  async createEvent(eventData: any) {
    return fetchFromStrapi('events', {
      method: 'POST',
      body: JSON.stringify({ data: eventData }),
    });
  },

  // Update event (admin only)
  async updateEvent(id: string, eventData: any) {
    return fetchFromStrapi(`events/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: eventData }),
    });
  },

  // Delete event (admin only)
  async deleteEvent(id: string) {
    return fetchFromStrapi(`events/${id}`, {
      method: 'DELETE',
    });
  },
};

// Booking-specific API functions
export const strapiBookingAPI = {
  // Create new booking
  async createBooking(bookingData: any) {
    return fetchFromStrapi('bookings', {
      method: 'POST',
      body: JSON.stringify({ data: bookingData }),
    });
  },

  // Get bookings (admin only)
  async getBookings(params?: {
    filters?: any;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }
    if (params?.pagination) {
      searchParams.append('pagination[page]', String(params.pagination.page));
      searchParams.append('pagination[pageSize]', String(params.pagination.pageSize));
    }
    
    const endpoint = `bookings?${searchParams.toString()}`;
    return fetchFromStrapi(endpoint);
  },

  // Update booking status (admin only)
  async updateBooking(id: string, bookingData: any) {
    return fetchFromStrapi(`bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: bookingData }),
    });
  },
};

// Contact form API functions
export const strapiContactAPI = {
  // Submit contact form
  async submitContact(contactData: any) {
    return fetchFromStrapi('contacts', {
      method: 'POST',
      body: JSON.stringify({ data: contactData }),
    });
  },
};

// Type definitions for Strapi responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEvent {
  id: number;
  attributes: {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: number;
    location: string;
    ageMin: number;
    ageMax: number;
    price: number;
    isFree: boolean;
    availableSeats: number;
    totalSeats: number;
    featured: boolean;
    tags: string[];
    image?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiBooking {
  id: number;
  attributes: {
    parentName: string;
    email: string;
    phone: string;
    childrenCount: number;
    childrenAges: string;
    eventId: number;
    specialNeeds?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
  };
}