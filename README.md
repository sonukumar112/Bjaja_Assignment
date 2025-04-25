# Doctor Directory

A modern web application for finding and filtering doctors by specialty, consultation type, and more.

## Features

- Search for doctors by name with autocomplete
- Filter doctors by specialty
- Filter by consultation type (video/in-clinic)
- Sort by fees or experience
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query, React Hooks
- **Styling**: TailwindCSS, Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/doctor-directory.git
   cd doctor-directory
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/doctor_directory
   PORT=4000
   ```

4. Run database migrations
   ```
   npm run db:push
   ```

5. Start development server
   ```
   npm run dev
   ```

6. Open your browser and visit `http://localhost:4000`

## Project Structure

```
DoctorDirectory/
├── client/             # React frontend
├── server/             # Express backend
├── shared/             # Shared code
└── db/                 # Database code
```

## Running in Production

1. Build the application
   ```
   npm run build
   ```

2. Start production server
   ```
   npm run start
   ```

## License

MIT 