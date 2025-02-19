// app/api/check-matricula-status/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuario no especificado' },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    
    // Buscar si el usuario tiene un servicio de matrícula activo
    const matricula = await db.collection('user_service').findOne({
      username: userId,
      servicio: 'MATRICULA',
      estado: 'activo'
    });

    return NextResponse.json({ 
      hasMatricula: !!matricula,
      createdAt: matricula?.createdAt
    });

  } catch (error) {
    console.error('Error al verificar matrícula:', error);
    return NextResponse.json(
      { error: 'Error al verificar el estado de la matrícula' },
      { status: 500 }
    );
  }
}