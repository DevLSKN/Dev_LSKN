import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    
    // Obtener el usuario del localStorage mediante headers
    const authHeader = req.headers.get('x-auth-user');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    let userData;
    try {
      userData = JSON.parse(authHeader);
    } catch (error) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Verificar el usuario en la base de datos
    const user = await User.findOne({ 
      username: userData.username,
      role: 'admin'
    });

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    return NextResponse.json({ 
      authorized: true,
      message: 'Verificación exitosa'
    });

  } catch (error) {
    console.error('Error en verificación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}