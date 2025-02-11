import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password es requerido'],
    minlength: [8, 'Password debe tener al menos 8 caracteres'],
    select: false // No incluir password en las consultas por defecto
  },
  nombre: {
    type: String,
    required: [true, 'Nombre es requerido'],
    trim: true
  },
  apellidos: {
    type: String,
    required: [true, 'Apellidos son requeridos'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    trim: true,
    lowercase: true // Convertir siempre a minúsculas
  },
  telefono: {
    type: String,
    required: [true, 'Teléfono es requerido'],
    trim: true
  },
  direccion: {
    type: String,
    required: [true, 'Dirección es requerida'],
    trim: true
  },
  fechaNacimiento: {
    type: String,
    required: [true, 'Fecha de nacimiento es requerida'],
    trim: true,
    validate: {
      validator: function(v) {
        // Validar formato dd/mm/aaaa
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
      },
      message: props => `${props.value} no es un formato de fecha válido (dd/mm/aaaa)`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'users',
  timestamps: true // Añadir createdAt y updatedAt automáticamente
});

// Método para verificar contraseña
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Asegurarse de no devolver la contraseña
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    ret._id = ret._id.toString();
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;