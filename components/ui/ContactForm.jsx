import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Por ahora solo mostraremos un alert
      alert('Mensaje enviado correctamente');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-50 p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 rounded border border-gray-300 text-black"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-300 text-black"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Mensaje"
            className="w-full p-3 rounded border border-gray-300 h-32 text-black"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded text-white ${
            isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;