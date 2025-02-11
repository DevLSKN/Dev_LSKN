'use client';

import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Iniciando login con:', loginData); // Debug
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Debug

      if (response.ok) {
        alert('Login exitoso');
        setLoginData({
          username: '',
          password: ''
        });
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const heroSections = [
    {
      title: "PRESENTACIÓN",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    },
    {
      title: "SERVICIOS",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    },
    {
      title: "EL EQUIPO",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    },
    {
      title: "EVENTOS",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    },
    {
      title: "CONTACTANOS",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showRegister) {
        setCurrentSection((prev) => (prev + 1) % heroSections.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [showRegister]);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validar contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{8,})/;
    
    if (!passwordRegex.test(registerData.password)) {
      alert('La contraseña no cumple con los requisitos');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          nombre: registerData.nombre,
          apellidos: registerData.apellidos,
          email: registerData.email,
          telefono: registerData.telefono,
          direccion: registerData.direccion,
          password: registerData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado correctamente');
        setShowRegister(false);
        setRegisterData({
          username: '',
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          direccion: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="w-full flex justify-between items-center px-4">
          <h1 className="text-6xl font-bold text-black">LAIESKEN</h1>
          <div className="flex items-center">
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Usuario"
                className="border rounded px-2 py-1 text-sm w-32"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({...prev, username: e.target.value}))}
              />
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="border rounded px-2 py-1 text-sm w-32"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                />
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded h-8 hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
              <p className="text-sm text-gray-600">
                ¿Aún no tienes cuenta?{' '}
                <button 
                  onClick={() => setShowRegister(true)}
                  className="text-blue-500 underline"
                >
                  Regístrate
                </button>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        {/* Imagen de fondo fija */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {showRegister ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Registro</h2>
              <div className="mb-4 p-3 bg-blue-50 rounded text-sm">
                <p className="font-bold mb-1">Requisitos de contraseña:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Mínimo 8 caracteres</li>
                  <li>Al menos una mayúscula</li>
                  <li>Al menos una minúscula</li>
                  <li>Al menos un número o símbolo</li>
                </ul>
              </div>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Usuario"
                    className="w-full p-2 border rounded"
                    value={registerData.username}
                    onChange={(e) => setRegisterData(prev => ({...prev, username: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-2 border rounded"
                    value={registerData.nombre}
                    onChange={(e) => setRegisterData(prev => ({...prev, nombre: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Apellidos"
                    className="w-full p-2 border rounded"
                    value={registerData.apellidos}
                    onChange={(e) => setRegisterData(prev => ({...prev, apellidos: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full p-2 border rounded"
                    value={registerData.telefono}
                    onChange={(e) => setRegisterData(prev => ({...prev, telefono: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Dirección"
                    className="w-full p-2 border rounded"
                    value={registerData.direccion}
                    onChange={(e) => setRegisterData(prev => ({...prev, direccion: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-2 border rounded"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="w-full p-2 border rounded"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
                    required
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          heroSections.map((section, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
                currentSection === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white p-6 ml-20">
                <h2 className="text-7xl font-bold mb-6 text-shadow">{section.title}</h2>
                <p className="text-4xl text-shadow">{section.content}</p>
              </div>
            </div>
          ))
        )}
        
        {!showRegister && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
            {heroSections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-10 h-10 rounded-full bg-white transition-opacity duration-300 hover:scale-110 ${
                  currentSection === index ? 'opacity-100' : 'opacity-50'
                }`}
                aria-label={`Ir a la sección ${index + 1}`}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="mb-2">Teléfono: +34 123 456 789</p>
              <p className="mb-2">Email: info@laiesken.com</p>
              <p>WhatsApp: +34 987 654 321</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ubicación</h3>
              <p className="mb-2">Calle Deporte 123</p>
              <p className="mb-2">28001 Madrid</p>
              <p>España</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
              <p className="mb-2">Lunes a Viernes: 7:00 - 22:00</p>
              <p className="mb-2">Sábados: 9:00 - 20:00</p>
              <p>Domingos: 9:00 - 14:00</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 LAIESKEN. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;