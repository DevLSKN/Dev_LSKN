// models/Service.js
const serviceSchema = new mongoose.Schema({
  username: String,
  servicio: String,
  createdAt: { type: Date, default: Date.now },
  usos: [{
    fecha: { type: Date, default: Date.now }
  }],
  estado: { type: String, enum: ['activo', 'completado'], default: 'activo' }
});