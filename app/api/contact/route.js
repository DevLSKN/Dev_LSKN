// app/api/contact/route.js
import { NextResponse } from 'next/server';
import emailService from '@/services/emailService';

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.nombre || !data.email || !data.mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    await emailService.sendContactForm(data);
    
    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}