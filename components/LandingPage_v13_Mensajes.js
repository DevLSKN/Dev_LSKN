'use client';

import React, { useState, useEffect } from 'react';
import ContactForm from './ui/ContactForm';
import Toast from './ui/Toast';
console.log('Toast component:', Toast);

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isProcessingService, setIsProcessingService] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
  setToast({ show: true, message, type });
};
  const [loginModalData, setLoginModalData] = useState({
    username: '',
    password: ''
  });
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

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowUserPanel(true);
      loadUserServices(user.username);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentUser && showUserPanel) {
      loadUserServices(currentUser.username);
    }
  }, [isLoggedIn, currentUser, showUserPanel]);

  const handleEdit = () => {
    setEditedUserData({...currentUser});
    setIsEditing(true);
  };

  const handleUpdateUser = async () => {
    const phoneRegex = /^(?:(?:\+|00)34|34)?[6789]\d{8}$/;
    if (!phoneRegex.test(editedUserData.telefono)) {
      showToast('El formato del teléfono no es válido. Debe ser un número español válido.');
      return;
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setIsEditing(false);
        showToast('Datos actualizados correctamente');
      } else {
        showToast(data.error || 'Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error al conectar con el servidor');
    }
  };
// Reemplaza las funciones handleLogin y handleContratarServicio con estas versiones:

const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: showLoginModal ? loginModalData.username : loginData.username,
        password: showLoginModal ? loginModalData.password : loginData.password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Actualizar estado del usuario
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      
      // Limpiar estados de login
      setLoginData({ username: '', password: '' });
      setLoginModalData({ username: '', password: '' });

      // Si hay un servicio pendiente, procésalo
      if (pendingService) {
        // Guardar el servicio en una variable temporal y limpiar el estado
        const serviceToProcess = pendingService;
        setPendingService(null);
        setShowLoginModal(false);

        // Procesar el servicio
        try {
          const serviceResponse = await fetch('/api/services/contratar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: data.user.username,
              serviceName: serviceToProcess
            }),
          });

          if (serviceResponse.ok) {
            showToast('Servicio contratado correctamente');
            await loadUserServices(data.user.username);
          } else {
            const errorData = await serviceResponse.json();
            throw new Error(errorData.error || 'Error al contratar el servicio');
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('Error al contratar el servicio: ' + error.message);
        }
      } else {
        // Si no hay servicio pendiente, simplemente cierra el modal y muestra el panel
        setShowLoginModal(false);
        setShowUserPanel(true);
      }

      // Cargar servicios del usuario
      loadUserServices(data.user.username);
    } else {
      console.error('Error al iniciar sesión:', data.error);
      showToast(data.error || 'Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    showToast('Error al conectar con el servidor');
  }
};

const handleContratarServicio = async (serviceName) => {
  // Si no está logueado, guardar el servicio y mostrar el modal de login
  if (!isLoggedIn) {
    setPendingService(serviceName);
    setShowLoginModal(true);
    return;
  }

  // Mostrar mensaje de confirmación
  const confirmar = window.confirm(`¿Estás seguro de que deseas contratar el servicio "${serviceName}"?`);
  if (!confirmar) return;

  // Si está logueado y confirma, procesar el servicio
  try {
    const response = await fetch('/api/services/contratar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: currentUser.username,
        serviceName: serviceName
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al contratar el servicio');
    }

    showToast('Servicio contratado correctamente');
    await loadUserServices(currentUser.username);
  } catch (error) {
    console.error('Error:', error);
    showToast('Error al contratar el servicio: ' + error.message);
  }
};

  const loadUserServices = async (username) => {
    try {
      const response = await fetch(`/api/user/services?username=${username}`);
      const data = await response.json();
      
      if (response.ok) {
        setUserServices(data.services);
      } else {
        console.error('Error:', data.error);
        showToast('Error al cargar los servicios');
      }
    } catch (error) {
      console.error('Error al cargar servicios:', error);
      showToast('Error al conectar con el servidor');
    }
  };

  const heroSections = [
    {
      title: "PRESENTACIÓN",
      content: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA"
    },
    {
      title: "SERVICIOS",
      content: (
        <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            {
              name: "DAY PASS",
              description: "Acceso diario completo a todas nuestras instalaciones",
              price: "8€"
            },
            {
              name: "BONO (5 DAY PASS)",
              description: "Pack de 5 accesos para usar cuando quieras",
              price: "35€"
            },
            {
              name: "BONO (10 DAY PASS)",
              description: "Pack de 10 accesos con precio especial",
              price: "60€"
            },
            {
              name: "MENSUALIDAD",
              description: "Acceso ilimitado durante un mes",
              price: "45€"
            },
            {
              name: "ENTRENAMIENTO PERSONAL",
              description: "Sesiones personalizadas con nuestros profesionales",
              price: "30€/sesión"
            },
            {
              name: "DIETA + RUTINA",
              description: "Plan personalizado de nutrición y entrenamiento",
              price: "50€"
            }
          ].map((servicio, index) => (
            <div key={index} className="bg-black bg-opacity-50 p-6 rounded-lg hover:bg-opacity-60 transition-all flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{servicio.name}</h3>
              <p className="text-lg mb-2">{servicio.description}</p>
              <p className="text-2xl font-bold text-blue-400 mb-4">{servicio.price}</p>
              <button
                onClick={() => handleContratarServicio(servicio.name)}
                className="w-full mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                style={{ zIndex: 1000 }}
              >
                Contratar
              </button>
            </div>
          ))}
        </div>
      )
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
      content: (
        <div className="w-full max-w-6xl">
          <div className="flex flex-col gap-8">
            <ContactForm />
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Teléfono</h3>
                <p className="text-lg">+34 123 456 789</p>
              </div>
              <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Email</h3>
                <p className="text-lg">info@laiesken.com</p>
              </div>
              <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Dirección</h3>
                <p className="text-lg">Calle Deporte 123, 28001 Madrid</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showRegister && !isPaused) {
        setCurrentSection((prev) => (prev + 1) % heroSections.length);
      }
    }, 6000); // Cambiado de 4000 a 6000
    return () => clearInterval(timer);
  }, [showRegister, isPaused]);

  const handleRegister = async (e) => {
  e.preventDefault();
    
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{8,})/;
  const phoneRegex = /^\d{9}$/;  // Exactamente 9 dígitos
    
  if (!passwordRegex.test(registerData.password)) {
    showToast('La contraseña no cumple con los requisitos');
    return;
  }

  if (registerData.password !== registerData.confirmPassword) {
    showToast('Las contraseñas no coinciden');
    return;
  }

  if (!phoneRegex.test(registerData.telefono)) {
    showToast('El teléfono debe tener exactamente 9 dígitos');
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
        showToast('Usuario registrado correctamente');
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
        showToast(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error al conectar con el servidor');
    }
  };
  const NavigationDots = ({ sections, currentSection, onSectionChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (index) => {
    setHoveredIndex(index);
    onSectionChange(index);
  };

  return (
    <div className="fixed right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="relative group flex justify-end" // Añadido justify-end
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => currentSection === index ? null : setHoveredIndex(null)}
        >
          <button
            onClick={() => handleClick(index)}
            className={`relative flex items-center gap-4 transition-all duration-300 ease-in-out
              ${hoveredIndex === index || currentSection === index ? 'w-64' : 'w-16'}
              ${currentSection === index 
                ? 'bg-blue-500 shadow-lg' 
                : 'bg-white hover:bg-blue-100'} 
              h-16 rounded-full cursor-pointer
              flex flex-row-reverse`} // Añadido flex-row-reverse
          >
            <div className={`
              min-w-[4rem] h-16 rounded-full
              flex items-center justify-center
              ${currentSection === index ? 'text-white' : 'text-blue-500'}
              text-2xl font-bold
            `}></div>
            
            <span className={`
              whitespace-nowrap text-xl font-medium
              transition-opacity duration-300
              ${hoveredIndex === index || currentSection === index ? 'opacity-100' : 'opacity-0'}
              ${currentSection === index ? 'text-white' : 'text-gray-700'}
              pl-6`} // Cambiado pr-6 por pl-6
            >
              {section.title}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="w-full flex justify-between items-center px-4">
          <h1 className="text-6xl font-bold text-black">LAIESKEN</h1>
          <div className="flex items-center">
            {isLoggedIn ? (
  <div className="flex flex-col items-end gap-2">
    <span className="text-gray-700 font-semibold">
      {currentUser?.username}
    </span>
    <button
      onClick={() => setShowUserPanel(true)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
    >
      Menú de Usuario
    </button>
  </div>
) : (
  <div className="flex flex-col gap-2">
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
    </form>
    <p className="text-sm text-gray-600">
      ¿Aún no tienes cuenta?{' '}
      <button
        type="button"
        onClick={() => setShowRegister(true)}
        className="text-blue-500 underline"
      >
        Regístrate
      </button>
    </p>
  </div>
)}
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {isLoggedIn && showUserPanel ? (
          <div className="absolute inset-0 flex items-center">
            <div className="text-white p-6 ml-20 w-full max-w-7xl">
              <h2 className="text-7xl font-bold mb-10 text-shadow">Panel de Usuario</h2>
              <div className="flex gap-8">
                {/* Columna izquierda */}
                <div className="space-y-8 flex-1">
                  <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-3xl font-semibold mb-4">Información de la cuenta</h3>
                    <div className="grid grid-cols-2 gap-6 text-xl">
                      <p>Usuario: <span className="font-semibold">{currentUser?.username}</span></p>
                      {isEditing ? (
                        <>
                          <div>
                            <p>Email:</p>
                            <input
                              type="email"
                              className="w-full p-2 border rounded text-black"
                              value={editedUserData.email}
                              onChange={(e) => setEditedUserData({...editedUserData, email: e.target.value})}
                            />
                          </div>
                          <div>
                            <p>Nombre:</p>
                            <input
                              type="text"
                              className="w-full p-2 border rounded text-black"
                              value={editedUserData.nombre}
                              onChange={(e) => setEditedUserData({...editedUserData, nombre: e.target.value})}
                            />
                          </div>
                          <div>
                            <p>Apellidos:</p>
                            <input
                              type="text"
                              className="w-full p-2 border rounded text-black"
                              value={editedUserData.apellidos}
                              onChange={(e) => setEditedUserData({...editedUserData, apellidos: e.target.value})}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Email: <span className="font-semibold">{currentUser?.email}</span></p>
                          <p>Nombre: <span className="font-semibold">{currentUser?.nombre}</span></p>
                          <p>Apellidos: <span className="font-semibold">{currentUser?.apellidos}</span></p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-3xl font-semibold mb-4">Datos de contacto</h3>
                    <div className="grid grid-cols-2 gap-6 text-xl">
                      {isEditing ? (
                        <>
                          <div>
                            <p>Teléfono:</p>
                            <input
                              type="tel"
                              className="w-full p-2 border rounded text-black"
                              value={editedUserData.telefono}
                              onChange={(e) => setEditedUserData({...editedUserData, telefono: e.target.value})}
                            />
                          </div>
                          <div>
                            <p>Dirección:</p>
                            <input
                              type="text"
                              className="w-full p-2 border rounded text-black"
                              value={editedUserData.direccion}
                              onChange={(e) => setEditedUserData({...editedUserData, direccion: e.target.value})}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Teléfono: <span className="font-semibold">{currentUser?.telefono}</span></p>
                          <p>Dirección: <span className="font-semibold">{currentUser?.direccion}</span></p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
  {isEditing ? (
    <>
      <button
        onClick={handleUpdateUser}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
      >
        Guardar Cambios
      </button>
      <button
        onClick={() => setIsEditing(false)}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xl"
      >
        Cancelar
      </button>
    </>
  ) : (
    <>
      <div className="flex gap-4">
        <button
          onClick={handleEdit}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
        >
          Editar Datos
        </button>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            setShowUserPanel(false);
            localStorage.removeItem('currentUser');
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl"
        >
          Cerrar Sesión
        </button>
      </div>
      <button
        onClick={() => setShowUserPanel(false)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl w-fit"
      >
        Menú Principal
      </button>
    </>
  )}
</div>
                </div>

                {/* Columna derecha */}
                <div className="w-96">
                  <div className="bg-black bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-3xl font-semibold mb-4">Historial de Servicios</h3>
                    <div className="max-h-[500px] overflow-y-auto">
                      {userServices.length > 0 ? (
  <div className="space-y-3">
    {userServices.map((service, index) => (
      <div 
        key={index}
        className="bg-white bg-opacity-10 p-3 rounded flex justify-between items-center"
      >
        <div>
          <p className="font-semibold">{service.servicio}</p>
          <p className="text-sm">
            {new Date(service.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-300">No hay servicios contratados</p>
)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showRegister ? (
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
          <>
            {heroSections.map((section, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
                  currentSection === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="text-white p-6 ml-20">
                  <h2 className="text-7xl font-bold mb-6 text-shadow">{section.title}</h2>
                  <div className="text-xl">
                    {typeof section.content === 'string' 
                      ? <p className="text-4xl text-shadow">{section.content}</p>
                      : section.content
                    }
                  </div>
                </div>
              </div>
            ))}

            {!showRegister && (
  <NavigationDots
    sections={heroSections}
    currentSection={currentSection}
    onSectionChange={(index) => {
      setCurrentSection(index);
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 15000);
    }}
  />
)}
          </>
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

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Usuario"
                  className="w-full p-2 border rounded"
                  value={loginModalData.username}
                  onChange={(e) => setLoginModalData(prev => ({...prev, username: e.target.value}))}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full p-2 border rounded"
                  value={loginModalData.password}
                  onChange={(e) => setLoginModalData(prev => ({...prev, password: e.target.value}))}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setPendingService(null);
                  }}
                  className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowRegister(true);
                  }}
                  className="w-full px-4 py-2 text-blue-500 hover:text-blue-700 underline"
                >
                  Regístrate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
	  {toast.show && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast({ show: false, message: '', type: 'success' })}
  />
)}
    </div>
  );
};

export default LandingPage;