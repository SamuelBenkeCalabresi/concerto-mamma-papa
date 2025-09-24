# Strapi Registration Setup Guide

## Current Status
The registration functionality is currently using a localStorage fallback since the Strapi backend doesn't have the registration endpoints configured yet.

## To Enable Real Strapi Registration

### 1. Create Registration Content Type in Strapi Admin

1. Go to your Strapi Admin Panel: `http://localhost:1337/admin`
2. Navigate to **Content-Type Builder**
3. Click **Create new collection type**
4. Name it `registration`
5. Add these fields:
   - `name` (Text, Required)
   - `email` (Email, Required)  
   - `event` (Relation: Many-to-One with Events)
   - `status` (Enumeration: pending, confirmed, cancelled, Default: pending)
   - `createdAt` (DateTime, auto-generated)

### 2. Configure Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Find **Registration** in the permissions list
4. Enable the **create** permission
5. Save the changes

### 3. Update the API Function

Once the above is set up, replace the localStorage fallback in `src/lib/strapi.ts` with:

```typescript
export async function createRegistration(eventId: string, name: string, email: string) {
  const res = await fetch(`${STRAPI_URL}/api/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        name,
        email,
        event: eventId,
        status: 'pending'
      }
    }),
  });
  
  if (!res.ok) {
    throw new Error("Failed to create registration");
  }
  
  return res.json();
}
```

## Current Behavior

- Registrations are stored in browser localStorage
- Console logs show registration details
- Users see success confirmation
- Data can be viewed in browser dev tools → Application → Local Storage

## Testing Registration Data

To view stored registrations, run this in browser console:
```javascript
JSON.parse(localStorage.getItem('event_registrations') || '[]')
```