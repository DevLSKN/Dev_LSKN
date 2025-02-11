// app/api/login/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { username, password } = body;
    console.log('Login attempt:', { username });
    
    // Añadimos fechaNacimiento al select
    const user = await User.findOne({ username })
      .select('+password +role +username +nombre +apellidos +email +telefono +direccion +fechaNacimiento');
    
    console.log('Usuario encontrado en DB:', {
      username: user?.username,
      role: user?.role,
      _id: user?._id,
      fechaNacimiento: user?.fechaNacimiento // Añadimos log para debug
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Añadimos fechaNacimiento al objeto de respuesta
    const userResponse = {
      _id: user._id.toString(),
      username: user.username,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      fechaNacimiento: user.fechaNacimiento, // Añadimos este campo
      role: user.role
    };

    console.log('UserResponse preparado:', userResponse);

    return NextResponse.json({
      message: 'Login exitoso',
      user: userResponse
    }, {
      status: 200
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}