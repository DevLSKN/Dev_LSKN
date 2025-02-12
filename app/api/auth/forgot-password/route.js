// app/api/auth/forgot-password/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import crypto from 'crypto';
import emailService from '@/services/emailService';

export async function POST(request) {
  try {
    const { email } = await request.json();
    await dbConnect();
    const db = mongoose.connection.db;

    // Buscar el usuario por email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'No existe un usuario con ese email' },
        { status: 404 }
      );
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Guardar token en la base de datos
    await db.collection('users').updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        }
      }
    );

    // Enviar email
    await emailService.sendPasswordReset(email, resetToken);

    return NextResponse.json({
      success: true,
      message: 'Email de recuperación enviado'
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}