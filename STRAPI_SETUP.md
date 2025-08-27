# Strapi CMS Integration Setup Guide

This document provides instructions for integrating Strapi CMS with the Concerti con Mamma e Papà website.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL or SQLite for database

## Step 1: Install Strapi

```bash
# Create a new Strapi project
npx create-strapi-app@latest concerto-mamma-papa-cms --quickstart

# Or with a specific database
npx create-strapi-app@latest concerto-mamma-papa-cms --dbclient=postgres --dbhost=localhost --dbport=5432 --dbname=concerto_cms --dbusername=your_username --dbpassword=your_password
```

## Step 2: Content Types Schema

Create the following content types in Strapi Admin Panel:

### Event Content Type
- **Collection Type Name**: `event`
- **API ID**: `events`

#### Fields:
- `title` (Text) - Required
- `description` (Rich Text) - Required
- `date` (Date) - Required
- `time` (Text) - Required, format: "HH:MM"
- `duration` (Number) - Required, in minutes
- `location` (Text) - Required
- `ageMin` (Number) - Required, minimum age
- `ageMax` (Number) - Required, maximum age
- `price` (Number) - Required, price in euros
- `isFree` (Boolean) - Default: false
- `availableSeats` (Number) - Required
- `totalSeats` (Number) - Required
- `featured` (Boolean) - Default: false
- `tags` (JSON) - Array of strings
- `image` (Media) - Single image
- `slug` (UID) - Required, based on title

### Booking Content Type
- **Collection Type Name**: `booking`
- **API ID**: `bookings`

#### Fields:
- `parentName` (Text) - Required
- `email` (Email) - Required
- `phone` (Text) - Required
- `childrenCount` (Number) - Required
- `childrenAges` (Text) - Required
- `eventId` (Relation) - Many to One with Event
- `specialNeeds` (Text) - Optional
- `status` (Enumeration) - Values: pending, confirmed, cancelled
- `confirmationSent` (Boolean) - Default: false

### Contact Content Type
- **Collection Type Name**: `contact`
- **API ID**: `contacts`

#### Fields:
- `name` (Text) - Required
- `email` (Email) - Required
- `subject` (Text) - Required
- `message` (Rich Text) - Required
- `status` (Enumeration) - Values: unread, read, replied
- `replied` (Boolean) - Default: false

## Step 3: API Permissions

In Strapi Admin Panel:

1. Go to **Settings > Users & Permissions Plugin > Roles**
2. Edit **Public** role:
   - **Event**: Find, FindOne
   - **Booking**: Create
   - **Contact**: Create
3. Create **API Token** in Settings > API Tokens for authenticated requests

## Step 4: Environment Configuration

Copy `.env.example` to `.env.local` and update:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_api_token
```

## Step 5: Update Next.js Code

Replace mock data usage with Strapi API calls:

### Update Event Components
```typescript
// In components/EventsSection.tsx
import { strapiEventAPI } from '@/lib/strapi';

// Replace mockEvents with:
const { data: events } = await strapiEventAPI.getEvents({
  populate: 'image',
  filters: { featured: true },
  sort: 'date:asc'
});
```

### Update Booking Form
```typescript
// In components/BookingForm.tsx
import { strapiBookingAPI } from '@/lib/strapi';

// In form submission:
await strapiBookingAPI.createBooking(formData);
```

### Update Contact Form
```typescript
// In components/ContactForm.tsx
import { strapiContactAPI } from '@/lib/strapi';

// In form submission:
await strapiContactAPI.submitContact(formData);
```

## Step 6: Image Handling

For images in Strapi:

1. Enable **Upload** plugin in Strapi
2. Configure image sizes in `config/plugins.js`:

```javascript
module.exports = {
  upload: {
    config: {
      sizeLimit: 1000000, // 1MB
      formats: ['thumbnail', 'small', 'medium', 'large'],
    },
  },
};
```

3. Update Next.js to handle Strapi images:

```typescript
// In next.config.js
module.exports = {
  images: {
    domains: ['localhost', 'your-strapi-domain.com'],
  },
};
```

## Step 7: Email Notifications

Install email plugin in Strapi:

```bash
npm install @strapi/provider-email-nodemailer
```

Configure in `config/plugins.js`:

```javascript
module.exports = {
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      settings: {
        defaultFrom: process.env.FROM_EMAIL,
      },
    },
  },
};
```

## Step 8: Deployment

### Deploy Strapi:
- **Heroku**: Use Heroku Postgres addon
- **Railway**: Connect PostgreSQL database
- **DigitalOcean**: Use managed database
- **AWS**: Use RDS

### Update Next.js environment:
```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_api_token
```

## Step 9: Data Migration

To migrate existing mock data to Strapi:

1. Create a migration script:

```typescript
// scripts/migrate-data.ts
import { mockEvents } from '../src/data/mockEvents';
import { strapiEventAPI } from '../src/lib/strapi';

async function migrateEvents() {
  for (const event of mockEvents) {
    await strapiEventAPI.createEvent({
      ...event,
      ageMin: event.ageRange.min,
      ageMax: event.ageRange.max,
    });
  }
}

migrateEvents();
```

2. Run the migration:
```bash
npx ts-node scripts/migrate-data.ts
```

## Step 10: Admin Dashboard

Create admin users in Strapi to manage:
- Events (create, update, delete)
- Bookings (view, update status)
- Contact messages (view, mark as read)
- Media files (upload, organize)

## Security Best Practices

1. Use strong admin passwords
2. Enable rate limiting
3. Use HTTPS in production
4. Restrict API permissions
5. Regular backups
6. Monitor logs

## Troubleshooting

### Common Issues:
1. **CORS errors**: Configure CORS in `config/middlewares.js`
2. **Database connection**: Check connection string
3. **API permissions**: Verify role permissions
4. **Image uploads**: Check file size limits

### Debug Mode:
Add to `.env` in Strapi:
```env
NODE_ENV=development
APP_KEYS=toBeReplaced
API_TOKEN_SALT=toBeReplaced
ADMIN_JWT_SECRET=toBeReplaced
JWT_SECRET=toBeReplaced
```

For more information, visit the [Strapi Documentation](https://docs.strapi.io/).