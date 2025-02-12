// models/UserService.js
import mongoose from 'mongoose';

const userServiceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  usos: [{
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  estado: {
    type: String,
    enum: ['activo', 'completado', 'cancelado'],
    default: 'activo'
  },
  // Campos para suscripciones
  subscriptionId: String,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  },
  stripeStatus: String
});

const UserService = mongoose.models.UserService || mongoose.model('UserService', userServiceSchema, 'user_service');

export default UserService;