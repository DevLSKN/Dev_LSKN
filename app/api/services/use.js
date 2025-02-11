import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();

    const { serviceId, username } = await request.json();

    if (!serviceId || !username) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const servicio = await Service.findById(serviceId);
    
    if (!servicio) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      );
    }

    // Verificar los usos máximos según el tipo de servicio
    const maxUsos = {
      'DAY PASS': 1,
      'BONO (5 DAY PASS)': 5,
      'BONO (10 DAY PASS)': 10
    };

    if (!servicio.usos) {
      servicio.usos = [];
    }

    if (servicio.usos.length >= maxUsos[servicio.servicio]) {
      return NextResponse.json(
        { error: 'Este servicio ya no tiene usos disponibles' },
        { status: 400 }
      );
    }

    // Añadir el nuevo uso
    servicio.usos.push({
      fecha: new Date()
    });

    // Si alcanza el máximo de usos, marcar como completado
    if (servicio.usos.length === maxUsos[servicio.servicio]) {
      servicio.estado = 'completado';
    }

    await servicio.save();
    
    return NextResponse.json({
      message: 'Uso registrado correctamente',
      servicio: servicio
    });

  } catch (error) {
    console.error('Error al registrar el uso:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}