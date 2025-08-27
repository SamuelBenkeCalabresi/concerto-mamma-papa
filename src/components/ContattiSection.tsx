'use client';

import { useState } from 'react';

export default function ContattiSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          Contatti
        </h2>
        <p className="text-lg text-neutral/70 max-w-3xl mx-auto">
          Hai domande sui nostri concerti? Vuoi organizzare un evento speciale? 
          Contattaci, saremo felici di rispondere a tutte le tue domande.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg border border-primary/10 p-8">
            <h3 className="text-2xl font-bold text-neutral mb-6">
              Informazioni di Contatto
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral">Telefono</h4>
                  <p className="text-neutral/70">+39 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral">Email</h4>
                  <p className="text-neutral/70">info@concertoconmammaepapa.it</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral">Indirizzo</h4>
                  <p className="text-neutral/70">Via della Musica, 123<br />70100 Bari, Italia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral">Orari</h4>
                  <p className="text-neutral/70">Lun-Ven: 9:00-18:00<br />Sab: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg border border-primary/10 p-8">
            <h3 className="text-2xl font-bold text-neutral mb-6">
              Inviaci un Messaggio
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Nome *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Telefono</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Oggetto</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered select-primary w-full"
                  >
                    <option value="">Seleziona un oggetto</option>
                    <option value="info">Informazioni generali</option>
                    <option value="booking">Prenotazione evento</option>
                    <option value="collaboration">Collaborazione</option>
                    <option value="other">Altro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Messaggio *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="textarea textarea-bordered textarea-primary w-full resize-none"
                  placeholder="Scrivi qui il tuo messaggio..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full bg-primary hover:bg-primary/80 border-primary"
              >
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}