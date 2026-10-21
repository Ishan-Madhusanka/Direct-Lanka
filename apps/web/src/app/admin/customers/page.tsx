'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Search,
  Download,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  CheckCircle2,
  Lock,
  ChevronDown,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  MessageCircle,
  X,
  Check,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  MoreVertical,
  Layers,
  ArrowUpDown,
  Home,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerAddress {
  label: string;
  badge: string;
  badgeColor: string;
  address: string;
  note?: string;
}

interface CustomerOrderHistory {
  id: string;
  status: string;
  statusColor: string;
  date: string;
  items: string;
  amount: number;
  paymentMethod: string;
}

interface CustomerProfile {
  id: string;
  avatar: string;
  avatarBg: string;
  name: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  registeredDate: string;
  ordersCount: number;
  totalSpent: number;
  avgBasket: number;
  status: string;
  addresses: CustomerAddress[];
  recentOrders: CustomerOrderHistory[];
}

const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    avatar: 'DF',
    avatarBg: 'bg-orange-100 text-brand-hover',
    name: 'Dinuka Fernando',
    city: 'Colombo 03',
    province: 'Western Province',
    phone: '+94 77 123 4567',
    email: 'dinuka.f@gmail.com',
    registeredDate: 'May 10, 2024',
    ordersCount: 3,
    totalSpent: 24150,
    avgBasket: 8050,
    status: 'Active Registered Shopper',
    addresses: [
      {
        label: 'Default Home Address',
        badge: 'Doorstep COD Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        address: 'No. 42, Galle Road, Colombo 03, Western Province, 00300',
        note: 'Assigned Hub: Colombo Central Express Dispatch',
      },
      {
        label: 'Office',
        badge: 'Daytime 9am - 5pm',
        badgeColor: 'bg-slate-100 text-slate-700',
        address: 'Level 4, World Trade Center, Echelon Square, Colombo 01',
      },
    ],
    recentOrders: [
      {
        id: '#LD-84920',
        status: 'Pending Confirmation',
        statusColor: 'bg-orange-100 text-brand-hover',
        date: 'Today, 10:42 AM',
        items: 'Singer Kettle & Dilmah Tea Selection',
        amount: 7550,
        paymentMethod: 'Cash on Delivery',
      },
      {
        id: '#LD-82104',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-800',
        date: 'Apr 12, 2025',
        items: 'Spa Ceylon De-Stress Balm (50g)',
        amount: 4200,
        paymentMethod: 'Paid via Commercial Bank Direct Transfer',
      },
      {
        id: '#LD-79811',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-800',
        date: 'Mar 02, 2025',
        items: 'Pure Cotton Handloom Casual Shirt (L)',
        amount: 3400,
        paymentMethod: 'COD Settled via PromptX Courier',
      },
    ],
  },
  {
    id: 'cust-2',
    avatar: 'MS',
    avatarBg: 'bg-blue-100 text-blue-700',
    name: 'Malkanthi Silva',
    city: 'Kandy Central',
    province: 'Central Province',
    phone: '+94 71 884 9201',
    email: 'malkanthi.s@yahoo.com',
    registeredDate: 'Apr 18, 2024',
    ordersCount: 2,
    totalSpent: 16300,
    avgBasket: 8150,
    status: 'Active Registered Shopper',
    addresses: [
      {
        label: 'Home Address',
        badge: 'Doorstep COD Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        address: '14/2, Peradeniya Road, Kandy, Central Province, 20000',
        note: 'Assigned Hub: Kandy Outstation Node',
      },
    ],
    recentOrders: [
      {
        id: '#LD-84919',
        status: 'Confirmed (Processing)',
        statusColor: 'bg-blue-100 text-blue-800',
        date: 'Today, 09:15 AM',
        items: 'Prestige Pressure Cooker 3L, Spices',
        amount: 8650,
        paymentMethod: 'Bank Transfer (Slip Verified)',
      },
    ],
  },
  {
    id: 'cust-3',
    avatar: 'RJ',
    avatarBg: 'bg-purple-100 text-purple-700',
    name: 'Rohan Jayasuriya',
    city: 'Galle Fort',
    province: 'Southern Province',
    phone: '+94 77 552 1190',
    email: 'rohan.j@gmail.com',
    registeredDate: 'Mar 22, 2024',
    ordersCount: 4,
    totalSpent: 38900,
    avgBasket: 9725,
    status: 'VIP Customer',
    addresses: [
      {
        label: 'Galle Residence',
        badge: 'Doorstep COD Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        address: '88 Lighthouse Street, Galle Fort, Southern Province, 80000',
        note: 'Assigned Hub: Galle Regional Node',
      },
    ],
    recentOrders: [
      {
        id: '#LD-84918',
        status: 'Dispatched',
        statusColor: 'bg-sky-100 text-sky-800',
        date: 'Yesterday, 04:30 PM',
        items: 'Ceylon Tea 500g, Pure Cotton Handloom Shirt',
        amount: 11400,
        paymentMethod: 'COD In Transit',
      },
    ],
  },
  {
    id: 'cust-4',
    avatar: 'AP',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    name: 'Anura Perera',
    city: 'Colombo 05',
    province: 'Western Province',
    phone: '+94 76 339 4812',
    email: 'anura.p@outlook.com',
    registeredDate: 'May 02, 2024',
    ordersCount: 1,
    totalSpent: 4200,
    avgBasket: 4200,
    status: 'New Customer',
    addresses: [
      {
        label: 'Home Address',
        badge: 'Doorstep COD Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        address: '22 Havelock Road, Colombo 05, Western Province, 00500',
      },
    ],
    recentOrders: [
      {
        id: '#LD-84917',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-800',
        date: 'Yesterday, 02:18 PM',
        items: 'Borosil Glass Containers (3-Piece)',
        amount: 4200,
        paymentMethod: 'COD Paid & Settled',
      },
    ],
  },
  {
    id: 'cust-5',
    avatar: 'DW',
    avatarBg: 'bg-amber-100 text-amber-800',
    name: 'Dilani Wickramasinghe',
    city: 'Negombo',
    province: 'Western Province',
    phone: '+94 70 214 7720',
    email: 'dilani.w@gmail.com',
    registeredDate: 'Feb 15, 2024',
    ordersCount: 2,
    totalSpent: 12800,
    avgBasket: 6400,
    status: 'Active Registered Shopper',
    addresses: [
      {
        label: 'Home Address',
        badge: 'Doorstep COD Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        address: '55 Lewis Place, Negombo, Western Province, 11500',
      },
    ],
    recentOrders: [
      {
        id: '#LD-78401',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-800',
        date: 'Jan 29, 2025',
        items: 'MD Woodapple Jam & Spices Pack',
        amount: 3200,
        paymentMethod: 'Bank Transfer',
      },
    ],
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile>(INITIAL_CUSTOMERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [orderCountFilter, setOrderCountFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('recent');
  const [activeTab, setActiveTab] = useState<'all' | 'repeat' | 'new'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Bottom Sheet modal
  const [mobileCustomerModal, setMobileCustomerModal] = useState<CustomerProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered customer directory
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Search query
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        cust.name.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        cust.email.toLowerCase().includes(q) ||
        cust.city.toLowerCase().includes(q);

      // District filter
      const matchesDistrict =
        districtFilter === 'All'
          ? true
          : cust.province.toLowerCase().includes(districtFilter.toLowerCase());

      // Order count filter
      const matchesOrderCount =
        orderCountFilter === 'All'
          ? true
          : orderCountFilter === 'repeat'
          ? cust.ordersCount >= 2
          : cust.ordersCount === 1;

      // Tab
      const matchesTab =
        activeTab === 'all'
          ? true
          : activeTab === 'repeat'
          ? cust.ordersCount >= 2
          : cust.ordersCount === 1;

      return matchesSearch && matchesDistrict && matchesOrderCount && matchesTab;
    });
  }, [customers, searchQuery, districtFilter, orderCountFilter, activeTab]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP HEADER (1440px Artboard)                                          */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Link href="/admin" className="hover:text-brand-primary">
            Admin
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">Customers</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-heading font-black text-slate-900">
                Customer Directory &amp; Profiles
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                ● Live Storefront DB
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              View registered shoppers, order histories, and verified doorstep delivery contacts. Guest checkout orders remain in Orders Management.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2 max-w-xs shadow-2xs">
            <Lock className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="text-[11px] leading-tight">
              Single-store privacy enforced: No plaintext passwords stored.
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-heading font-black text-slate-900">
              Customers <span className="text-slate-400 font-normal">(412)</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
              Demo Store
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5 KPI METRICS ROW                                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* 1. Registered Shoppers */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Registered Shoppers
              </span>
              <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 text-[9px] font-bold">
                Verified
              </span>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                412
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <span>↗</span>
            <span>+28 new this month</span>
          </div>
        </div>

        {/* 2. New This Month */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                New This Month
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-heading font-black text-brand-primary tracking-tight">
                28
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
            <strong className="text-emerald-600 font-bold">↗ +14.2%</strong> vs prev 30 days
          </div>
        </div>

        {/* 3. Avg Lifetime Value */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Avg Lifetime Value
              </span>
              <ShoppingBag className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-slate-900 tracking-tight">
                <span className="text-xs font-bold text-slate-400">Rs. </span>18,450
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium truncate">
            Per registered customer profile
          </div>
        </div>

        {/* 4. Repeat Shopper Rate */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Repeat Shopper Rate
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold">
                High Loyalty
              </span>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                64%
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium truncate">
            2+ confirmed island deliveries
          </div>
        </div>

        {/* 5. Guest Checkouts */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Guest Checkouts
              </span>
              <UserCheck className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                124
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium truncate">
            Tracked directly in Orders tab
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone (+94), or email..."
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns & CSV */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
            >
              <option value="All">All Districts (Western, Central, Southern)</option>
              <option value="Western">Western Province</option>
              <option value="Central">Central Province</option>
              <option value="Southern">Southern Province</option>
            </select>

            <select
              value={orderCountFilter}
              onChange={(e) => setOrderCountFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
            >
              <option value="All">Order Count: All</option>
              <option value="repeat">Repeat Buyers (2+)</option>
              <option value="new">First Time (1)</option>
            </select>

            <Button
              variant="outline"
              onClick={() => showToast('Customer Directory CSV exported.')}
              className="h-10 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Customer List (CSV)</span>
            </Button>
          </div>
        </div>

        {/* Quick Filter Tabs for Mobile / Tablet */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All (412)
          </button>
          <button
            onClick={() => setActiveTab('repeat')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'repeat'
                ? 'bg-brand-primary text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Repeat Shoppers (264)
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'new'
                ? 'bg-slate-800 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            New (28)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TWO-COLUMN SPLIT: Directory Table (Left) & Customer Profile (Right)*/}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        {/* Left: Customer Directory Table (col-span-7) */}
        <div className="col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Registered Shopper Directory
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                  412 total
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Click any customer to inspect profile &amp; delivery addresses
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4 font-black">Customer</th>
                    <th className="py-3 px-4 font-black">Contact Info</th>
                    <th className="py-3 px-4 font-black text-right">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {filteredCustomers.map((cust) => {
                    const isSelected = selectedCustomer.id === cust.id;

                    return (
                      <tr
                        key={cust.id}
                        onClick={() => setSelectedCustomer(cust)}
                        className={`hover:bg-slate-50/90 transition-colors cursor-pointer ${
                          isSelected ? 'bg-orange-50/50 border-l-4 border-brand-primary' : ''
                        }`}
                      >
                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full font-heading font-black text-xs flex items-center justify-center shrink-0 ${cust.avatarBg}`}
                            >
                              {cust.avatar}
                            </div>
                            <div>
                              <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                                {cust.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                📍 {cust.city}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td className="py-3.5 px-4">
                          <p className="font-mono text-slate-800 text-[11px] font-bold">
                            {cust.phone}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {cust.email}
                          </p>
                        </td>

                        {/* Registered */}
                        <td className="py-3.5 px-4 text-right text-slate-500 font-medium">
                          {cust.registeredDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <strong className="text-slate-800">1 to 5</strong> of{' '}
              <strong className="text-slate-800">412</strong> registered shoppers
            </div>

            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-lg font-bold text-xs bg-brand-primary text-white shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs">
                2
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs">
                3
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs">
                83
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Customer Profile Panel (col-span-5) */}
        <div className="col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            {/* Customer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl font-heading font-black text-base flex items-center justify-center shrink-0 shadow-xs ${selectedCustomer.avatarBg}`}
                >
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-black text-base text-slate-900 leading-tight">
                      {selectedCustomer.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{selectedCustomer.status}</span>
                    </span>
                    <span>•</span>
                    <span>Member Since {selectedCustomer.registeredDate}</span>
                  </div>
                </div>
              </div>

              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Metric Stat Boxes */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Orders
                </span>
                <span className="font-heading font-black text-base text-slate-900 block mt-0.5">
                  {selectedCustomer.ordersCount} Total
                </span>
              </div>

              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover block">
                  Spent
                </span>
                <span className="font-heading font-black text-base text-brand-primary block mt-0.5">
                  Rs. {selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Avg Basket
                </span>
                <span className="font-heading font-black text-base text-slate-900 block mt-0.5">
                  Rs. {selectedCustomer.avgBasket.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Contact & Notification Channels */}
            <div className="space-y-2 pt-1 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Contact &amp; Notification Channels
              </span>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-800">{selectedCustomer.email}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="font-mono font-bold text-slate-900">{selectedCustomer.phone}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified
                </span>
              </div>
            </div>

            {/* Saved Delivery Addresses */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Saved Delivery Addresses
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {selectedCustomer.addresses.length} Locations Registered
                </span>
              </div>

              {selectedCustomer.addresses.map((addr, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      {idx === 0 ? <Home className="w-3.5 h-3.5 text-brand-primary" /> : <Briefcase className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{addr.label}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${addr.badgeColor}`}>
                      {addr.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {addr.address}
                  </p>
                  {addr.note && (
                    <p className="text-[10px] text-slate-400 font-medium pt-0.5">
                      {addr.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Recent Order History */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Recent Order History
                </span>
                <Link
                  href="/admin/orders"
                  className="text-[11px] font-bold text-brand-primary hover:underline flex items-center gap-1"
                >
                  <span>All Orders</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {selectedCustomer.recentOrders.map((ord) => (
                <div key={ord.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-xs text-brand-primary">
                        {ord.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.statusColor}`}>
                        {ord.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{ord.date}</span>
                  </div>

                  <p className="text-[11px] text-slate-700 font-medium">
                    {ord.items}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-400">{ord.paymentMethod}</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">
                        Rs. {ord.amount.toLocaleString()}
                      </strong>
                      <Link
                        href={`/admin/orders/${ord.id.replace('#', '')}`}
                        className="text-brand-primary font-bold hover:underline"
                      >
                        View Order →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sri Lanka Privacy Protocol Box */}
            <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 flex items-start gap-2.5 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-bold block text-[11px]">
                  Sri Lanka Privacy &amp; Guest Order Protocol
                </strong>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  No passwords or banking credentials stored. Guest checkout customers are strictly not auto-registered. Account data is populated only upon shopper opt-in during checkout or registration.
                </p>
              </div>
            </div>
          </div>

          {/* Active Hub Distribution Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs text-slate-900">
                Active Hub Distribution
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Sri Lanka Provinces
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">Western Province (Colombo, Gampaha, Kalutara)</span>
                  <span className="font-bold text-slate-900">294 shoppers (71.3%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '71.3%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">Central Province (Kandy, Matale, Nuwara Eliya)</span>
                  <span className="font-bold text-slate-900">68 shoppers (16.5%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '16.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">Southern &amp; Other Districts (Galle, Matara)</span>
                  <span className="font-bold text-slate-900">50 shoppers (12.2%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '12.2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE CUSTOMER CARDS (390px Artboard)                                    */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3.5">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-11 h-11 rounded-2xl font-heading font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${cust.avatarBg}`}
              >
                {cust.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
                    {cust.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Active Registered
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-brand-primary shrink-0" />
                  <span>{cust.phone} • {cust.city}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Shopping History
                </span>
                <span className="font-heading font-black text-xs text-slate-900 block mt-0.5">
                  {cust.ordersCount} orders
                </span>
              </div>
              <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                <span className="text-[10px] font-bold uppercase text-brand-hover block">
                  Lifetime Spent
                </span>
                <span className="font-heading font-black text-xs text-brand-primary block mt-0.5">
                  Rs. {cust.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Latest Order Preview */}
            {cust.recentOrders[0] && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">
                    Latest: {cust.recentOrders[0].id}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Rs. {cust.recentOrders[0].amount.toLocaleString()} • COD
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold uppercase">
                  Pending
                </span>
              </div>
            )}

            <Button
              onClick={() => setMobileCustomerModal(cust)}
              className="w-full h-9 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>View Profile &amp; History</span>
            </Button>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM SHEET: CUSTOMER PROFILE                                     */}
      {/* ========================================================================= */}
      {mobileCustomerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setMobileCustomerModal(null)}
          ></div>

          <div className="relative bg-white rounded-t-3xl max-w-md w-full p-5 shadow-2xl space-y-4 z-10 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2"></div>

            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl font-heading font-black text-sm flex items-center justify-center shrink-0 ${mobileCustomerModal.avatarBg}`}
                >
                  {mobileCustomerModal.avatar}
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900 leading-tight">
                    {mobileCustomerModal.name}
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 block">
                    Registered Direct Customer
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileCustomerModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact details */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Email</span>
                <span className="font-bold text-brand-primary">{mobileCustomerModal.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Phone</span>
                <span className="font-mono font-bold text-slate-900">{mobileCustomerModal.phone}</span>
              </div>
              <div className="pt-1 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">Delivery</span>
                <span className="font-medium text-slate-800 text-[11px] block mt-0.5">
                  {mobileCustomerModal.addresses[0]?.address}
                </span>
              </div>
            </div>

            {/* 2 Stat Boxes */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-indigo-50/30 border border-indigo-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Lifetime Volume
                </span>
                <span className="font-heading font-black text-base text-slate-900 block mt-0.5">
                  {mobileCustomerModal.ordersCount} Orders
                </span>
              </div>
              <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100">
                <span className="text-[10px] font-bold uppercase text-brand-hover block">
                  Total Value
                </span>
                <span className="font-heading font-black text-base text-brand-primary block mt-0.5">
                  Rs. {mobileCustomerModal.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Recent Order */}
            {mobileCustomerModal.recentOrders[0] && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Recent Order: {mobileCustomerModal.recentOrders[0].id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
                    Pending Confirmation
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Placed today at 11:42 AM</span>
                  <strong className="text-slate-900 font-bold">
                    Rs. {mobileCustomerModal.recentOrders[0].amount.toLocaleString()} (Cash on Delivery)
                  </strong>
                </div>
              </div>
            )}

            {/* Quick Action Buttons: WhatsApp & Call */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={`https://wa.me/${mobileCustomerModal.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${mobileCustomerModal.phone}`}
                className="h-10 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Customer</span>
              </a>
            </div>

            {/* Info footnote */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Guest checkouts are not auto-converted to registered profiles. Dinuka verified via SMS login.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
