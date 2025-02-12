// components/ui/ContactForm.js
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '', // Nuevo campo
    telefono: '',
    mensaje: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          telefono: '',
          mensaje: ''
        });
      } else {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.nombre}
            onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Asunto"
            className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.asunto}
            onChange={(e) => setFormData(prev => ({ ...prev, asunto: e.target.value }))}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Teléfono (opcional)"
            className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.telefono}
            onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <textarea
          placeholder="Mensaje"
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all h-32"
          value={formData.mensaje}
          onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
          required
        />
      </div>

      {status.error && (
        <div className="bg-red-500 bg-opacity-20 text-red-100 p-3 rounded">
          {status.error}
        </div>
      )}

      {status.success && (
        <div className="bg-green-500 bg-opacity-20 text-green-100 p-3 rounded">
          Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={status.loading}
          className={`px-8 py-3 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transform hover:scale-105 transition-all ${
            status.loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;