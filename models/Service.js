// ./models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
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
    enum: ['activo', 'completado'],
    default: 'activo'
  }
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;