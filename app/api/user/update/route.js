import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req) {
  try {
    await dbConnect();
    
    const userData = await req.json();
    
    // Buscar y actualizar usuario, excluyendo username que no se puede modificar
    const user = await User.findOneAndUpdate(
      { username: userData.username },
      {
        nombre: userData.nombre,
        apellidos: userData.apellidos,
        email: userData.email,
        telefono: userData.telefono,
        direccion: userData.direccion
      },
      { new: true } // Retorna el documento actualizado
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Crear objeto de usuario sin campos sensibles
    const userResponse = {
      username: user.username,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion
    };

    return NextResponse.json(
      { 
        message: 'Usuario actualizado correctamente',
        user: userResponse
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}