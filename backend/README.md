# Basera Backend - PG Room Finder API

This is the backend API for the Basera PG Room Finder application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Navigate to the server directory:
   
```
bash
   cd server
   
```

2. Install dependencies:
   
```
bash
   npm install
   
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Optionally change `PORT` (default: 5000)

## Running the Server

### Development Mode
```
bash
npm run dev
```

### Production Mode
```
bash
npm start
```

## Seeding Database

To populate the database with sample room data:
```
bash
npm run seed
```

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms with filtering support
- `GET /api/rooms/:id` - Get single room by ID
- `POST /api/rooms` - Create new room (admin)
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get single booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Health Check
- `GET /api/health` - Check if API is running

## Query Parameters for GET /api/rooms

- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `location` - Location filter
- `type` - Room type (PG, Hostel, Room, Shared Room)
- `gender` - Gender (Male, Female, Co-ed)
- `foodIncluded` - Food included (true/false)
- `facilities` - Comma-separated list of facilities
- `search` - Search in title, description, area, location

## Example

```
bash
# Get rooms with price between 3000 and 10000
curl "http://localhost:5000/api/rooms?minPrice=3000&maxPrice=10000"

# Get rooms in Bilaspur
curl "http://localhost:5000/api/rooms?location=Bilaspur"

# Search rooms
curl "http://localhost:5000/api/rooms?search=PG"
