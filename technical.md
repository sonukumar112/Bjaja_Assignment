# Doctor Directory Technical Documentation

## Overview

Doctor Directory is a full-stack web application built with React, TypeScript, Express, and PostgreSQL. It allows users to search for doctors, filter by specialties and consultation types, and view doctor details.

## Architecture

The application follows a client-server architecture:

- **Client**: React/TypeScript application with TailwindCSS for styling
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful endpoints served by Express

## Project Structure

```
DoctorDirectory/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript type definitions
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── vite.ts           # Vite configuration for development
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema definitions
└── db/                   # Database related code
    ├── index.ts          # Database connection
    └── seed.ts           # Database seed data
```

## Database Schema

The application uses Drizzle ORM with PostgreSQL. The schema is defined in `shared/schema.ts`:

```typescript
// User table definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});
```

## API Endpoints

The server exposes the following API endpoints:

### GET /api/doctors

Returns a list of doctors fetched from an external API.

```typescript
app.get('/api/doctors', async (req, res) => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors data');
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return res.status(500).json({ error: 'Failed to fetch doctors data' });
  }
});
```

## Frontend Components

### Doctor Listing Page (`DoctorListing.tsx`)

The main page of the application displays a list of doctors with filtering capabilities:

- Fetches doctor data using React Query
- Transforms the API response into the application's format
- Provides filtering by specialty, consultation type, and search term
- Implements sorting by fees or experience

### SearchBar Component

Allows users to search for doctors by name with autocomplete suggestions.

### FilterPanel Component

Provides various filtering options:
- Consultation type (Video/In-clinic)
- Specialty selection
- Sorting options (Fees/Experience)

### DoctorCard Component

Displays individual doctor information in a card format, including:
- Name and photo
- Specialties
- Experience
- Fees
- Clinic location
- Available consultation modes

## Data Flow

1. Frontend makes API request to `/api/doctors`
2. Server proxies the request to the external API to fetch doctor data
3. Data is transformed into the application's format in the frontend
4. User interactions (search, filter, sort) are processed on the client-side
5. Filtered/sorted results are displayed to the user

## Key Features

### Doctor Search

The application allows users to search for doctors by name with autocomplete suggestions:

```typescript
export function getTop3MatchingDoctors(doctors: Doctor[], searchTerm: string): Doctor[] {
  if (!searchTerm || searchTerm.length < 2) return [];
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return doctors
    .filter(doctor => doctor.name.toLowerCase().includes(lowercaseSearch))
    .slice(0, 3);
}
```

### Advanced Filtering

Comprehensive filtering options allow users to find doctors based on:

```typescript
export function filterDoctors(
  doctors: Doctor[], 
  search: string, 
  consultationType: string,
  specialties: string[],
  sortOption: string
): Doctor[] {
  let filteredDoctors = [...doctors];
  
  // Filter by search term, consultation mode, specialties
  // ...
  
  // Sort by fees or experience
  if (sortOption === 'fees') {
    filteredDoctors.sort((a, b) => a.fees - b.fees);
  } else if (sortOption === 'experience') {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }
  
  return filteredDoctors;
}
```

## Development Workflow

### Running Locally

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

3. Access the application at http://localhost:4000

### Database Setup

1. Configure database connection in `.env` file:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/doctor_directory
   ```

2. Run database migrations:
   ```
   npm run db:push
   ```

3. Seed database with initial data:
   ```
   npm run db:seed
   ```

## Production Deployment

1. Build the application:
   ```
   npm run build
   ```

2. Start production server:
   ```
   npm run start
   ```

## TypeScript Types

The application defines comprehensive TypeScript interfaces to ensure type safety:

### Doctor Types

```typescript
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  fees: number;
  clinicName?: string;
  location?: string;
  consultationMode: ("Video Consult" | "In Clinic")[];
  imageUrl?: string;
  gender?: string;
}

export type SortOption = 'fees' | 'experience' | '';
export type ConsultationType = 'video' | 'clinic' | '';
```

## State Management

The application uses React Query for server state management and local state with React hooks for UI state. URL query parameters are used to maintain filter state for shareable links. 