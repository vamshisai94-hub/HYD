import React, { useState } from 'react';
import { 
  LayoutDashboard, PlusCircle, Car, MessageSquare, 
  CreditCard, Settings, LogOut, ChevronRight, 
  TrendingUp, Users, CheckCircle2, Clock, AlertCircle,
  Image as ImageIcon, MapPin, Fuel, Gauge, Calendar, Search
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { VEHICLES, ENQUIRIES, HYDERABAD_AREAS } from '../mockData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'add-vehicle', label: 'Add Vehicle', icon: PlusCircle },
    { id: 'my-vehicles', label: 'My Vehicles', icon: Car },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Hyd<span className="text-blue-600">Wheels</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              AH
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Auto Hub Hyd</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Verified Dealer</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-black text-slate-900">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subscription</p>
              <p className="text-sm font-bold text-emerald-600">Professional Plan</p>
            </div>
            <div className="h-10 w-px bg-slate-100 mx-2" />
            <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-rose-500 border-2 border-white rounded-full" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'add-vehicle' && <AddVehicleTab />}
          {activeTab === 'my-vehicles' && <MyVehiclesTab />}
          {activeTab === 'enquiries' && <EnquiriesTab />}
          {activeTab === 'subscription' && <SubscriptionTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: 'Total Listings', value: '45', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Listings', value: '38', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Enquiries', value: '124', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Profile Views', value: '2.4k', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Enquiries</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {ENQUIRIES.map((enquiry) => (
              <div key={enquiry.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {enquiry.buyerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{enquiry.buyerName}</p>
                      <p className="text-xs text-slate-500">{enquiry.buyerPhone}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{enquiry.date}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{enquiry.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h3 className="font-bold text-slate-900 mb-6">Subscription Status</h3>
          <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Plan</p>
            <p className="text-xl font-black mb-4">Professional Plan</p>
            <div className="flex items-center justify-between text-sm mb-6">
              <span className="text-slate-400">Renewal Date</span>
              <span className="font-bold">24 Mar 2024</span>
            </div>
            <button className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Manage Plan
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Listings Used</span>
              <span className="font-bold text-slate-900">38 / 50</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[76%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddVehicleTab() {
  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Vehicle Information</h3>
          <p className="text-sm text-slate-500">Fill in the details below to list your vehicle on the marketplace.</p>
        </div>
        
        <form className="p-8 space-y-8">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle Title</label>
              <input 
                type="text" 
                placeholder="e.g. 2021 Honda City ZX"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Brand</label>
              <input 
                type="text" 
                placeholder="e.g. Honda"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model</label>
              <input 
                type="text" 
                placeholder="e.g. City"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year</label>
              <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Select Year</option>
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 1250000"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">KM Driven</label>
              <input 
                type="number" 
                placeholder="e.g. 25000"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Area (Hyderabad)</label>
              <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Select Area</option>
                {HYDERABAD_AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fuel Type</label>
              <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>CNG</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transmission</label>
              <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle Type</label>
              <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Car</option>
                <option>Bike</option>
              </select>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button type="button" className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <PlusCircle className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Add Main</span>
              </button>
              {[1, 2, 3].map(i => (
                <button key={i} type="button" className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                  <ImageIcon className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Add Photo</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Upload at least 4 high-quality photos. Max size 5MB per image.</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
            <textarea 
              rows={5}
              placeholder="Describe the vehicle condition, service history, and any special features..."
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-8 border-t border-slate-50 flex justify-end gap-4">
            <button type="button" className="px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
              Save Draft
            </button>
            <button type="submit" className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MyVehiclesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['All', 'Approved', 'Pending', 'Sold'].map(tab => (
            <button 
              key={tab}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                tab === 'All' ? "bg-slate-900 text-white" : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search my vehicles..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Views</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {VEHICLES.slice(0, 5).map((v) => (
              <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={v.images[0]} className="h-12 w-16 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{v.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{v.area}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(v.price)}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest",
                    v.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">124</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-500">{v.createdAt}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-bold text-xs hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EnquiriesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {ENQUIRIES.map((e) => (
            <button key={e.id} className="w-full text-left bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    {e.buyerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{e.buyerName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{e.date}</p>
                  </div>
                </div>
                <div className="h-2 w-2 bg-blue-600 rounded-full" />
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Interested in:</p>
              <p className="text-sm font-bold text-slate-900 mb-4 truncate">2021 Honda City ZX</p>
              <div className="flex items-center justify-between text-blue-600 text-xs font-bold">
                <span>View Message</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center p-20 text-center">
          <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mb-8">
            <MessageSquare className="h-12 w-12 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Select an enquiry</h3>
          <p className="text-slate-500 max-w-sm">
            Choose an enquiry from the left to view the full message and contact details.
          </p>
        </div>
      </div>
    </div>
  );
}

function SubscriptionTab() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[100px] rounded-full translate-x-1/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-xl">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Current Subscription</span>
          </div>
          <h2 className="text-4xl font-black mb-4">Professional Plan</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl">
            You are currently on our most popular plan. You have used 38 out of 50 available listings for this month.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-100 transition-all">
              Upgrade Plan
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-2xl font-bold hover:bg-white/20 transition-all">
              View Billing History
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <Users className="h-8 w-8 text-blue-600 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">Listing Limit</h4>
          <p className="text-sm text-slate-500 mb-6">You have 12 listings remaining for this month.</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[76%]" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <TrendingUp className="h-8 w-8 text-emerald-600 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">Visibility Boost</h4>
          <p className="text-sm text-slate-500">Your listings are appearing 40% higher in search results.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <Clock className="h-8 w-8 text-amber-600 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">Next Renewal</h4>
          <p className="text-sm text-slate-500">Your plan will automatically renew on March 24, 2024.</p>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-900">Showroom Profile</h3>
        </div>
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-8">
            <div className="h-24 w-24 rounded-[2rem] bg-slate-100 border border-slate-200 flex items-center justify-center relative group cursor-pointer overflow-hidden">
              <img src="https://picsum.photos/seed/autohub/200/200" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlusCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Showroom Logo</h4>
              <p className="text-xs text-slate-500 mb-4">Recommended size: 512x512px. JPG or PNG.</p>
              <button className="text-sm font-bold text-blue-600 hover:underline">Change Logo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showroom Name</label>
              <input type="text" defaultValue="Auto Hub Hyderabad" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Person</label>
              <input type="text" defaultValue="Rahul Sharma" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showroom Address</label>
            <textarea rows={3} defaultValue="Plot 45, Beside Metro Station, Kukatpally, Hyderabad" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="pt-8 border-t border-slate-50 flex justify-end">
            <button className="px-10 py-3.5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-900">Security</h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Change Password</p>
              <p className="text-sm text-slate-500">Update your account password regularly for security.</p>
            </div>
            <button className="px-6 py-2.5 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
              Update
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
            </div>
            <button className="px-6 py-2.5 rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
