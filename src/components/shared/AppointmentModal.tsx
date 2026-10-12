import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentOpen, setIsAppointmentOpen, showNotification } = useShop();

  const [appointmentType, setAppointmentType] = useState<'boutique' | 'video'>('video');
  const [location, setLocation] = useState('Mumbai Flagship — Bandra West');
  const [date, setDate] = useState('2026-10-18');
  const [time, setTime] = useState('03:00 PM IST');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAppointmentOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    showNotification('Private Consultation booked successfully.');
    setTimeout(() => {
      setIsSuccess(false);
      setIsAppointmentOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsAppointmentOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl z-10 p-6 md:p-8">
        <button
          onClick={() => setIsAppointmentOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-white">Private Consultation Reserved</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Reference: <span className="font-mono text-amber-300">#OBV-APP-7821</span>. Our Master Concierge will contact {phone || 'you'} with encrypted calendar invites and sample preview kits.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private High Joaillerie Concierge</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-white">Book Your Consultation</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Experience bespoke private viewing in our luxury salons or via an encrypted high-definition video suite.
              </p>
            </div>

            {/* Type Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setAppointmentType('video')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  appointmentType === 'video'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Virtual Video Atelier
              </button>
              <button
                type="button"
                onClick={() => setAppointmentType('boutique')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  appointmentType === 'boutique'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                In-Salon Boutique
              </button>
            </div>

            {appointmentType === 'boutique' && (
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Select Flagship Salon:</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Mumbai Flagship — Bandra West</option>
                    <option>Delhi Atelier — The Chanakya</option>
                    <option>Bangalore Salon — Lavelle Road</option>
                    <option>London Salon — Mayfair, W1K</option>
                    <option>Dubai Suite — Opera District, Downtown</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Preferred Date:</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Preferred Time:</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option>11:00 AM IST</option>
                  <option>01:30 PM IST</option>
                  <option>03:00 PM IST</option>
                  <option>05:30 PM IST</option>
                  <option>07:00 PM IST</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Phone / WhatsApp:</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
            >
              <span>Confirm Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
