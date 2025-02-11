'use client';

import React, { useState, useEffect } from 'react';
import ContactForm from './ui/ContactForm';
import Toast from './ui/Toast';
import FAQ from './ui/FAQ';
import apiServices from '../app/services/apiServices';
import { useRouter } from 'next/navigation';
import { Instagram, MessageCircle, MessageSquare, MapPin } from 'lucide-react';

const ServiceCard = ({ service, onUseService }) => {
  const [showHistory, setShowHistory] = useState(false);

  if (!service) return null;

  const getUsosMaximos = (serviceName) => {
    if (!serviceName) return null;
    const nameUpper = serviceName.toUpperCase();
    
    if (nameUpper.includes('BONO (10)') || nameUpper.includes('BONO10') || nameUpper.includes('BONO (10 DAY PASS)')) return 10;
    if (nameUpper.includes('BONO (5)') || nameUpper.includes('BONO5') || nameUpper.includes('BONO (5 DAY PASS)')) return 5;
    if (nameUpper.includes('DAY PASS') || nameUpper === 'DAYPASS') return 1;
    return null;
  };

  const usosMaximos = getUsosMaximos(service.servicio);
  const usosActuales = Array.isArray(service.usos) ? service.usos.length : 0;
  const usosRestantes = usosMaximos - usosActuales;
  const puedeUsarse = usosMaximos !== null && usosRestantes > 0;

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-lg">{service.servicio}</h4>
          <p className="text-sm text-gray-300">
            Comprado: {formatearFecha(service.createdAt)}
          </p>
        </div>
        {usosMaximos !== null && (
          <div className="text-right bg-black bg-opacity-30 p-2 rounded">
            <span className={`block px-3 py-1 rounded-full text-sm font-medium
              ${usosRestantes > 0 ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
              {usosActuales} de {usosMaximos} usos
            </span>
            <p className="text-sm mt-1 text-gray-300">
              {usosRestantes} usos restantes
            </p>
          </div>
        )}
      </div>

      {service.usos && service.usos.length > 0 && (
        <div className="mt-2">
          {showHistory ? (
            <div className="bg-black bg-opacity-30 p-3 rounded mt-2">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold text-sm">Historial de Usos</h5>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Ocultar
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {service.usos.map((uso, index) => (
                  <div 
                    key={index}
                    className="text-sm bg-black bg-opacity-20 p-2 rounded flex justify-between items-center"
                  >
                    <span>Uso {index + 1}</span>
                    <span className="text-gray-300">
                      {formatearFecha(uso.fecha)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300">
                Último uso: {formatearFecha(service.usos[service.usos.length - 1].fecha)}
              </p>
              <button 
                onClick={() => setShowHistory(true)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Ver historial
              </button>
            </div>
          )}
        </div>
      )}

      {puedeUsarse && (
        <button
          onClick={() => onUseService(service._id)}
          className="mt-3 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Usar Ahora
        </button>
      )}
    </div>
  );
};

const LandingPage = () => {
  const router = useRouter();
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
  const [toast, setToast] = useState({ 
  show: false, 
  message: '', 
  type: 'success',
  onConfirm: null 
});
  const [isProcessingService, setIsProcessingService] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success', onConfirm = null) => {
  setToast({ 
    show: true, 
    message, 
    type, 
    onConfirm 
  });
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
      
      // Redirigir al admin dashboard si el usuario es admin
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        setShowUserPanel(true);
        loadUserServices(user.username);
      }
    }
  }, [router]); // Añadir router como dependencia

  // Segundo useEffect para cargar servicios cuando cambia el estado del usuario
  useEffect(() => {
    if (isLoggedIn && currentUser && showUserPanel && currentUser.role !== 'admin') {
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
    showToast('El formato del teléfono no es válido. Debe ser un número español válido.', 'error');
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
      showToast('Datos actualizados correctamente', 'success');
    } else {
      showToast(data.error || 'Error al actualizar los datos', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Error al conectar con el servidor', 'error');
  }
};

const handleUseService = async (serviceId) => {
  if (!serviceId || !currentUser?.username) {
    showToast('Error: Información incompleta', 'error');
    return;
  }

  const service = userServices.find(s => s._id === serviceId);
  if (!service) {
    showToast('No encontramos el servicio solicitado', 'error');
    return;
  }

  const maxUsos = service.servicio.includes('10') ? 10 : 
                 service.servicio.includes('5') ? 5 : 1;
  const usosActuales = service.usos?.length || 0;

  if (usosActuales >= maxUsos) {
    showToast('Has alcanzado el límite de usos para este servicio', 'error');
    return;
  }

  const realizarUso = async () => {
    try {
      setIsProcessingService(true);
      await apiServices.useService(serviceId, currentUser.username);
      showToast('¡Perfecto! Tu servicio ha sido registrado', 'success');
      await loadUserServices(currentUser.username);
    } catch (error) {
      console.error('Error al usar servicio:', error);
      showToast('Ups, algo salió mal al registrar el uso', 'error');
    } finally {
      setIsProcessingService(false);
    }
  };

  showToast(
    `¿Confirmas que quieres usar ${service.servicio} hoy?`,
    'confirm',
    realizarUso
  );
};

const ServiceHistoryModal = ({ service, onClose }) => {
  const maxUsos = {
    'DAY PASS': 1,
    'BONO (5 DAY PASS)': 5,
    'BONO (10 DAY PASS)': 10
  };

  const usosRestantes = maxUsos[service.servicio] - (service.usos?.length || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{service.servicio}</h3>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {usosRestantes} usos restantes
          </span>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Historial de Usos</h4>
          {service.usos && service.usos.length > 0 ? (
            <div className="space-y-2">
              {service.usos.map((uso, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-3 rounded flex justify-between items-center"
                >
                  <span>
                    {new Date(uso.fecha).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="text-sm text-gray-500">
                    Uso {index + 1} de {maxUsos[service.servicio]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No se ha utilizado aún</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {usosRestantes > 0 && (
            <button
              onClick={() => handleUseService(service._id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Usar Ahora
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

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
    console.log('Respuesta completa del login:', data);

    if (response.ok) {
      const { user } = data;
      console.log('Usuario:', user);
      console.log('Rol del usuario:', user.role);

      // Primero actualizamos el estado del usuario y la sesión
      await new Promise(resolve => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve();
      });

      // Limpiar datos de login
      setLoginData({ username: '', password: '' });
      setLoginModalData({ username: '', password: '' });
      setShowLoginModal(false);

      if (user.role === 'admin') {
        window.location.href = '/admin/dashboard';
        return;
      }

      showToast('Inicio de sesión exitoso', 'success');

      // Procesar servicio pendiente si existe
      if (pendingService) {
        console.log('Procesando servicio pendiente:', pendingService);
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que los estados se actualicen
        await realizarContratacion(pendingService, user);
        setPendingService(null);
      } else {
        setShowUserPanel(true);
      }

      // Cargar servicios
      await loadUserServices(user.username);
    } else {
      showToast(data.error || 'Usuario o contraseña incorrectos', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Error al conectar con el servidor', 'error');
  }
};

// Función separada para realizar la contratación
const realizarContratacion = async (servicio, usuario) => {
  try {
    console.log('Realizando contratación para:', usuario.username, servicio);
    setIsProcessingService(true);
    
    const result = await apiServices.contractService(usuario.username, servicio);
    console.log('Resultado de contratación:', result);

    if (result.success) {
      showToast('¡Servicio contratado correctamente!', 'success');
      await loadUserServices(usuario.username);
    } else {
      throw new Error(result.error || 'Error en la contratación');
    }
  } catch (error) {
    console.error('Error en contratación:', error);
    showToast(error.message || 'Error al contratar el servicio', 'error');
  } finally {
    setIsProcessingService(false);
  }
};

const handleContratarServicio = async (serviceName) => {
  console.log('Iniciando contratación:', { serviceName, isLoggedIn, currentUser });
  
  if (!serviceName) {
    showToast('Error: Servicio no válido', 'error');
    return;
  }

  if (!isLoggedIn || !currentUser?.username) {
    console.log('Usuario no logueado, guardando servicio pendiente');
    setPendingService(serviceName);
    setShowLoginModal(true);
    return;
  }

  showToast(
    `¿Quieres contratar ${serviceName}?`,
    'confirm',
    () => realizarContratacion(serviceName, currentUser)
  );
};

	const buttonTitles = {
  "FREQUENT ASKED QUESTIONS": "FAQ",
  // Añade aquí otros mappings si los necesitas
};
// Función mejorada para cargar servicios
const loadUserServices = async (username) => {
  if (!username) {
    console.warn('Se intentó cargar servicios sin username');
    setUserServices([]);
    return;
  }

  try {
    console.log('Intentando cargar servicios para:', username);
    const data = await apiServices.fetchUserServices(username);
    console.log('Datos recibidos de la API:', data);
    
    if (!data || !Array.isArray(data.services)) {
      console.error('Formato de respuesta inválido:', data);
      showToast('Error en el formato de los datos recibidos', 'error');
      return;
    }

    // Asegurarse de que cada servicio tenga la estructura correcta
    const processedServices = data.services.map(service => ({
      ...service,
      usos: Array.isArray(service.usos) ? service.usos : [],
      _id: service._id || `temp-${Date.now()}-${Math.random()}`,
      createdAt: service.createdAt || new Date().toISOString()
    }));

    console.log('Servicios procesados:', processedServices);
    setUserServices(processedServices);
  } catch (error) {
    console.error('Error detallado al cargar servicios:', error);
    showToast(`Error: ${error.message}`, 'error');
    setUserServices([]); // Resetear el estado en caso de error
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
    _id: 'daypass',
    name: "DAY PASS",
    servicio: "DAY PASS",
    description: "Acceso diario completo a todas nuestras instalaciones",
    price: "8€"
  },
  {
    _id: 'bono5',
    name: "BONO (5 DAY PASS)",
    servicio: "BONO (5 DAY PASS)",
    description: "Pack de 5 accesos para usar cuando quieras",
    price: "35€"
  },
  {
    _id: 'bono10',
    name: "BONO (10 DAY PASS)",
    servicio: "BONO (10 DAY PASS)",
    description: "Pack de 10 accesos con precio especial",
    price: "60€"
  },
  {
    _id: 'mensualidad',
    name: "MENSUALIDAD",
    servicio: "MENSUALIDAD",
    description: "Acceso ilimitado durante un mes",
    price: "45€"
  },
  {
    _id: 'personal',
    name: "ENTRENAMIENTO PERSONAL",
    servicio: "ENTRENAMIENTO PERSONAL",
    description: "Sesiones personalizadas con nuestros profesionales",
    price: "30€/sesión"
  },
  {
    _id: 'dieta',
    name: "DIETA + RUTINA",
    servicio: "DIETA + RUTINA",
    description: "Plan personalizado de nutrición y entrenamiento",
    price: "50€"
  }
].map((servicio) => (
  <div key={servicio._id} className="bg-black bg-opacity-50 p-6 rounded-lg hover:bg-opacity-60 transition-all flex flex-col">
    <h3 className="text-2xl font-bold mb-2">{servicio.name}</h3>
    <p className="text-lg mb-2">{servicio.description}</p>
    <p className="text-2xl font-bold text-blue-400 mb-4">{servicio.price}</p>
    <button
      onClick={() => handleContratarServicio(servicio.servicio)}
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
  title: "FREQUENT ASKED QUESTIONS",
  content: (
    <div className="relative w-full isolate" style={{ zIndex: 30 }}>
      <FAQ />
    </div>
  )
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
          className="relative group flex justify-end"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => currentSection === index ? null : setHoveredIndex(null)}
        >
          <button
            onClick={() => handleClick(index)}
            className={`relative flex items-center justify-start gap-4 transition-all duration-300 ease-in-out
              ${hoveredIndex === index || currentSection === index ? 'w-64' : 'w-16'}
              ${currentSection === index 
                ? 'bg-blue-500 shadow-lg' 
                : 'bg-white hover:bg-blue-100'} 
              h-16 rounded-full cursor-pointer`}
          >
            <span className={`
              whitespace-nowrap text-xl font-medium
              transition-opacity duration-300 ml-6
              ${hoveredIndex === index || currentSection === index ? 'opacity-100' : 'opacity-0'}
              ${currentSection === index ? 'text-white' : 'text-gray-700'}`}
            >
              {buttonTitles[section.title] || section.title}
            </span>
            
            <div className={`
              absolute right-0 min-w-[4rem] h-16 rounded-full
              flex items-center justify-center
              ${currentSection === index ? 'text-white' : 'text-blue-500'}
              text-2xl font-bold`}
            ></div>
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
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {userServices && userServices.length > 0 ? (
                userServices.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onUseService={handleUseService}
                  />
                ))
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
    className={`absolute inset-0 flex items-center transition-all duration-700 ${
      currentSection === index 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-full'
    }`}
  >
    <div className="text-white p-6 ml-20">
      <h2 className={`text-7xl font-bold mb-6 text-shadow animate-slideInLeft ${
        currentSection === index ? 'opacity-100' : 'opacity-0'
      }`}>
        {section.title}
      </h2>
      <div className={`text-xl animate-slideInRight delay-200 ${
        currentSection === index ? 'opacity-100' : 'opacity-0'
      }`}>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Columna de Contacto */}
      <div>
        <h3 className="text-xl font-bold mb-4">Contacto</h3>
        <div className="flex flex-col gap-3">
          <p className="mb-2">Email: info@laiesken.com</p>
          <a 
            href="https://wa.me/34620564257" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <MessageSquare size={20} />
            WhatsApp: +34 620 564 257
          </a>
          <a 
            href="https://www.instagram.com/laieskenbarcelona" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Instagram size={20} />
            @laieskenbarcelona
          </a>
        </div>
      </div>

      {/* Columna de Ubicación */}
      <div>
        <h3 className="text-xl font-bold mb-4">Ubicación</h3>
        <div className="flex flex-col gap-2">
          <p>C/ Torrassa 94</p>
          <p>(Pasaje Josefina Vidal) Nave 2</p>
          <p>08930, Sant Adrià de Besòs</p>
          <p>Barcelona</p>
          <a 
            href="https://maps.google.com/?q=C/+Torrassa+94+Pasaje+Josefina+Vidal+Nave+2+08930+Sant+Adria+de+Besos+Barcelona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <MapPin size={20} />
            Ver en Google Maps
          </a>
        </div>
      </div>

      {/* Columna de Horario */}
      <div>
        <h3 className="text-xl font-bold mb-4">Horario</h3>
        <p className="mb-2">Lunes a Viernes: 7:00 - 22:00</p>
        <p className="mb-2">Sábados: 9:00 - 20:00</p>
        <p>Domingos: 9:00 - 14:00</p>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
      <p>&copy; {new Date().getFullYear()} LAIESKEN. Todos los derechos reservados.</p>
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
    onConfirm={toast.onConfirm}
    onClose={() => setToast({ show: false, message: '', type: 'success', onConfirm: null })}
  />
)}
    </div>
  );
};

export default LandingPage;