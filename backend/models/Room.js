import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['PG', 'Hostel', 'Room', 'Shared Room']
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  facilities: [{
    type: String
  }],
  photos: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Co-ed']
  },
  foodIncluded: {
    type: Boolean,
    default: false
  },
  area: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  depositAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate deposit before saving
roomSchema.pre('save', function(next) {
  this.depositAmount = Math.round(this.price * 1.5);
  next();
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
