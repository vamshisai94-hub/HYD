import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Car, CheckCircle2, Phone, MessageCircle, Calendar, ChevronLeft } from 'lucide-react';
import { DEALERS, VEHICLES } from '../mockData';
import VehicleCard from '../components/VehicleCard';

export default function DealerProfile() {
  const { id } = useParams();
  const dealer = DEALERS.find(d => d.id === id);
  
  if (!dealer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Dealer not found</h2>
        <Link to="/dealers" className="text-blue-600 font-bold hover:underline">Back to dealers</Link>
      </div>
    );
  }

  const dealerVehicles = VEHICLES.filter(v => v.dealerId === dealer.id);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dealer Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/dealers" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Dealers
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shrink-0">
              <img src={dealer.logo} alt={dealer.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{dealer.name}</h1>
                {dealer.isVerified && (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-fit">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified Dealer
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Location</p>
                    <p className="text-slate-700 font-medium">{dealer.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-50 p-2 rounded-xl">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Rating</p>
                    <p className="text-slate-700 font-medium">{dealer.rating} / 5.0</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-50 p-2 rounded-xl">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Member Since</p>
                    <p className="text-slate-700 font-medium">{new Date(dealer.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={`tel:${dealer.phone}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Phone className="h-5 w-5" />
                  Call Dealer
                </a>
                <a 
                  href={`https://wa.me/${dealer.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dealer Inventory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Showroom Inventory</h2>
            <p className="text-slate-500">Browse all {dealerVehicles.length} vehicles available at {dealer.name}</p>
          </div>
          <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-3">
            <Car className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-slate-900">{dealerVehicles.length} Total Vehicles</span>
          </div>
        </div>

        {dealerVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dealerVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100">
            <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No active listings</h3>
            <p className="text-slate-500">This dealer currently has no vehicles listed for sale.</p>
          </div>
        )}
      </div>
    </div>
  );
}
