// Strapi integration configuration and utilities
// This file prepares the project for Strapi CMS integration
/* eslint-disable @typescript-eslint/no-explicit-any */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const STRAPI_CONFIG = {
  // Update these values when connecting to your Strapi instance
  API_URL: STRAPI_URL,
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
    console.log('🔄 Fetching from URL:', url);
    console.log('📋 Request options:', mergedOptions);
    console.log('🌐 Current window origin:', typeof window !== 'undefined' ? window.location.origin : 'Server side');
    
    const response = await fetch(url, mergedOptions);
    console.log('📡 Response status:', response.status, response.statusText);
    console.log('📄 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`Strapi API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ API Response successful, data length:', Array.isArray(data.data) ? data.data.length : 'not an array');
    return data;
  } catch (error) {
    console.error('💥 Error fetching from Strapi:', error);
    console.error('🔍 Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('📝 Error message:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🚫 Network error detected - is Strapi running?');
      throw new Error('Unable to connect to Strapi server. Make sure it is running on ' + STRAPI_CONFIG.API_URL);
    }
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
      const buildFilters = (obj: any, prefix = 'filters') => {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Handle nested objects like { date: { $gte: "2025-01-01" } }
            buildFilters(value, `${prefix}[${key}]`);
          } else {
            searchParams.append(`${prefix}[${key}]`, String(value));
          }
        });
      };
      buildFilters(params.filters);
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

// Open Events API functions
export async function getOpenEvents() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/events?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_CONFIG.API_TOKEN && {
          'Authorization': `Bearer ${STRAPI_CONFIG.API_TOKEN}`,
        }),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error in getOpenEvents:', error);
    throw error;
  }
}

// Registration API functions
export async function createRegistration(eventId: string, name: string, email: string) {
  try {
    console.log(`Processing registration for event ${eventId}:`);
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    
    // For now, simulate successful registration since Strapi endpoints aren't configured yet
    // In a real implementation, you would:
    // 1. Set up a registrations content type in Strapi admin
    // 2. Configure proper permissions for public access
    // 3. Enable POST method on the registrations endpoint
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store registration in localStorage for demonstration
    const registration = {
      id: Date.now().toString(),
      eventId,
      name,
      email,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    // Get existing registrations
    const existingRegistrations = JSON.parse(localStorage.getItem('event_registrations') || '[]');
    existingRegistrations.push(registration);
    localStorage.setItem('event_registrations', JSON.stringify(existingRegistrations));
    
    console.log('Registration stored locally:', registration);
    
    return {
      data: registration,
      message: 'Registration received! You will be contacted soon.'
    };
    
  } catch (error) {
    console.error('Error in createRegistration:', error);
    throw error;
  }
}

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
    bookingEnabled: boolean;
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