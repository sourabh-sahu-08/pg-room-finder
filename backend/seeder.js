import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basera';

const roomsData = [
  {
    title: 'Kshatriya Pg for boys',
    description: 'Well-furnished PG with AC, wifi, and food facility. Perfect for students and working professionals.',
    price: 3000,
    type: 'PG',
    location: 'Bilaspur',
    address: 'river view E30',
    contactNumber: '+91 9876543210',
    facilities: ['AC', 'WiFi', 'Food', 'Laundry', 'Parking', 'Security', 'TV'],
    photos: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Male',
    foodIncluded: true,
    area: 'River View Colony',
    rating: 4.5
  },
  {
    title: 'ritu bhawan',
    description: 'Safe and secure girls hostel with 24/7 security, CCTV, and all modern amenities.',
    price: 2500,
    type: 'Hostel',
    location: 'Bilaspur',
    address: 'koni riverview',
    contactNumber: '+91 9876543211',
    facilities: ['WiFi', 'Food', 'Laundry', 'Security', 'GYM', 'TV', 'Geyser'],
    photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Female',
    foodIncluded: true,
    area: 'Koni',
    rating: 4.8
  },
  {
    title: 'Budget Shared Room',
    description: 'Affordable shared accommodation with basic amenities for students and working professionals.',
    price: 4000,
    type: 'Shared Room',
    location: 'Bilaspur',
    address: 'sipat road',
    contactNumber: '+91 9876543212',
    facilities: ['WiFi', 'Laundry', 'Parking'],
    photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Co-ed',
    foodIncluded: false,
    area: 'Sipat Road',
    rating: 3.9
  },
  {
    title: 'Sahu PG',
    description: 'Private room with all modern amenities including attached bathroom and kitchen access.',
    price: 10000,
    type: 'Room',
    location: 'Bilaspur',
    address: 'near sai mandir koni',
    contactNumber: '+91 9876543213',
    facilities: ['AC', 'WiFi', 'Food', 'Laundry', 'Parking', 'TV', 'Geyser', 'Kitchen'],
    photos: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Male',
    foodIncluded: true,
    area: 'Koni',
    rating: 4.7
  },
  {
    title: 'raju PG',
    description: 'Modern PG with gym facility, study room, and high-speed internet.',
    price: 5000,
    type: 'PG',
    location: 'Bilaspur',
    address: 'nehru chowk',
    contactNumber: '+91 9876543214',
    facilities: ['AC', 'WiFi', 'Food', 'Laundry', 'GYM', 'Study Room', 'Parking'],
    photos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Co-ed',
    foodIncluded: true,
    area: 'Nehru Chowk',
    rating: 4.6
  },
  {
    title: 'Single Room for Working Professionals',
    description: 'Peaceful single room with work desk and high-speed internet for professionals.',
    price: 11000,
    type: 'Room',
    location: 'Bilaspur',
    address: 'koni birkona mod',
    contactNumber: '+91 9876543215',
    facilities: ['AC', 'WiFi', 'Laundry', 'Parking', 'Study Table', 'Geyser'],
    photos: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Co-ed',
    foodIncluded: false,
    area: 'Birkona',
    rating: 4.4
  },
  {
    title: 'City Center PG',
    description: 'Premium accommodation in the heart of Bilaspur with all modern facilities.',
    price: 8000,
    type: 'PG',
    location: 'Bilaspur',
    address: 'main road, city center',
    contactNumber: '+91 9876543216',
    facilities: ['AC', 'WiFi', 'Food', 'Laundry', 'Parking', 'Security', 'GYM', 'TV'],
    photos: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Male',
    foodIncluded: true,
    area: 'City Center',
    rating: 4.3
  },
  {
    title: 'Student Hostel',
    description: 'Affordable hostel accommodation for students with study facilities and mess.',
    price: 3500,
    type: 'Hostel',
    location: 'Bilaspur',
    address: 'near government college',
    contactNumber: '+91 9876543217',
    facilities: ['WiFi', 'Food', 'Laundry', 'Security', 'Study Room', 'Geyser'],
    photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    available: true,
    gender: 'Co-ed',
    foodIncluded: true,
    area: 'College Area',
    rating: 4.1
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert new rooms
    await Room.insertMany(roomsData);
    console.log('Seeded rooms successfully');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
