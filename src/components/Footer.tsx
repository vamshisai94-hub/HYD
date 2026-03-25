import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Hyd<span className="text-blue-400">Wheels</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hyderabad's most trusted marketplace for used cars and bikes. 
              Connecting verified dealers with genuine buyers across the city.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/buy" className="hover:text-white transition-colors">Browse Vehicles</Link></li>
              <li><Link to="/dealers" className="hover:text-white transition-colors">Trusted Dealers</Link></li>
              <li><Link to="/become-seller" className="hover:text-white transition-colors">Sell Your Vehicle</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dealer Dashboard</Link></li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-white font-semibold mb-6">Popular Areas</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/buy?area=Kukatpally" className="hover:text-white transition-colors">Kukatpally</Link></li>
              <li><Link to="/buy?area=Gachibowli" className="hover:text-white transition-colors">Gachibowli</Link></li>
              <li><Link to="/buy?area=Secunderabad" className="hover:text-white transition-colors">Secunderabad</Link></li>
              <li><Link to="/buy?area=LB Nagar" className="hover:text-white transition-colors">LB Nagar</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span>Hitech City, Hyderabad, Telangana 500081</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span>+91 40 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <span>support@hydwheels.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HydWheels Marketplace. All rights reserved. Built for Hyderabad.</p>
        </div>
      </div>
    </footer>
  );
}
