import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    
    const userData = await req.json();
    console.log('Datos recibidos:', userData);

    // Verificar si el usuario ya existe
    const existingUsername = await User.findOne({ username: userData.username });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'El nombre de usuario ya está registrado' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Crear nuevo usuario
    const user = await User.create(userData);
    console.log('Usuario creado:', user);

    return NextResponse.json(
      { message: 'Usuario registrado correctamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error al registrar usuario: ' + error.message },
      { status: 500 }
    );
  }
}