// models/UserService.js
import mongoose from 'mongoose';

const userServiceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  servicio: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['activo', 'usado', 'cancelado'],
    default: 'activo'
  }
});

// Evitar crear el modelo si ya existe
const UserService = mongoose.models.UserService || mongoose.model('UserService', userServiceSchema);

export default UserService;