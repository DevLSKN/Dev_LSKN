// app/api/auth/reset-password/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    await dbConnect();
    const db = mongoose.connection.db;

    // Buscar usuario con token válido
    const user = await db.collection('users').findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña y limpiar token
    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json(
      { error: 'Error al restablecer la contraseña' },
      { status: 500 }
    );
  }
}