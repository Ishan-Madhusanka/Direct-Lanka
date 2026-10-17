'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Edit2,
  Trash2,
  Plus,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  Headphones,
  Bell,
  Search,
  ExternalLink,
  X,
  Send,
  Home,
  Building,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const router = useRouter();

  // Active view tab (Desktop)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'settings'>('overview');

  // Profile data
  const [profile, setProfile] = useState({
    name: 'Dinuka Fernando',
    email: 'dinuka.f@gmail.com',
    phone: '+94 77 123 4567',
    city: 'Colombo 04',
  });

  // Saved Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'Home',
      isDefault: true,
      name: 'Dinuka Fernando',
      address: 'No. 42, Galle Road',
      cityDistrict: 'Colombo 03, Western Province',
      phone: '+94 77 123 4567',
    },
    {
      id: 'addr-2',
      type: 'Office',
      isDefault: false,
      name: 'Dinuka Fernando',
      address: 'Level 4, World Trade Center',
      cityDistrict: 'Echelon Square, Colombo 01',
      phone: '+94 77 123 4567',
    },
  ]);

  // Modals state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [modalFeedback, setModalFeedback] = useState('');

  // New address form state
  const [newAddressType, setNewAddressType] = useState<'Home' | 'Office'>('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    const newId = `addr-${Date.now()}`;
    setAddresses((prev) => [
      ...prev,
      {
        id: newId,
        type: newAddressType,
        isDefault: false,
        name: profile.name,
        address: newStreet,
        cityDistrict: newCity,
        phone: profile.phone,
      },
    ]);
    setShowAddressModal(false);
    setNewStreet('');
    setNewCity('');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handlePrintReceipt = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-24 sm:pb-20 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Desktop Breadcrumbs Bar */}
      {/* ======================================================== */}
      <div className="hidden sm:block border-b border-slate-200/80 bg-white py-3">
        <Container>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">My Account</span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Header Bar (Stitch Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary text-white font-heading font-black flex items-center justify-center text-sm shadow-xs">
            L
          </div>
          <div>
            <h1 className="font-heading font-black text-sm text-slate-900 leading-tight">
              LankaDirect
            </h1>
            <span className="text-[10px] text-slate-400 font-semibold block -mt-0.5">
              Colombo Express
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/search?q=" className="p-1 text-slate-600">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative p-1 text-slate-600">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </Link>
          <Link href="/account" className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <Image
              src="/images/dinuka-avatar.jpg"
              alt="Dinuka Fernando"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </div>

      <Container className="pt-4 sm:pt-8 max-w-6xl">
        {/* ======================================================== */}
        {/* 3. Mobile Account Overview Header */}
        {/* ======================================================== */}
        <div className="sm:hidden flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              ACCOUNT OVERVIEW
            </span>
            <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
              My Account
            </h2>
          </div>
          <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-brand-primary absolute top-2 right-2"></span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 4. Mobile Profile Card (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md relative bg-gradient-to-tr from-amber-500 to-orange-400">
                <Image
                  src="/images/dinuka-avatar.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0.5 right-0.5 shadow-xs"></span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-black text-base text-slate-900 truncate">
                  {profile.name}
                </h3>
                <span className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">{profile.phone}</p>
              <p className="text-xs text-slate-400 truncate">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{profile.city}</span>
            </span>

            <button
              onClick={() => setShowEditProfileModal(true)}
              className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 text-indigo-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-indigo-100/60"
            >
              <Edit2 className="w-3.5 h-3.5 text-indigo-700" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Mobile Recent Order Highlight Card */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Truck className="w-4 h-4 text-brand-primary" />
              <span>Order #LD-84920</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
              Pending Confirmation
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
            <div>
              <p className="font-heading font-bold text-xs text-slate-900">
                Singer 1.8L Kettle + Dilma...
              </p>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                2 items • Cash on Delivery
              </span>
            </div>
            <span className="font-heading font-black text-sm text-brand-hover shrink-0">
              Rs. 7,550
            </span>
          </div>

          <Link href="/order-confirmation?orderId=LD-84920" className="block">
            <Button className="w-full h-10 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Track / View Details</span>
            </Button>
          </Link>
        </div>

        {/* ======================================================== */}
        {/* 6. Desktop Main Layout: Left Sidebar + Right Content */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Profile Card & Sidebar Menu (lg:col-span-4) */}
          {/* ====================================================== */}
          <div className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
            {/* User Profile Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex items-center gap-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100/50 rounded-bl-full pointer-events-none" />
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-heading font-black text-lg flex items-center justify-center shadow-md">
                  DF
                </div>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
              </div>

              <div className="min-w-0 relative z-10">
                <h3 className="font-heading font-black text-base text-slate-900 truncate">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-500 truncate">{profile.email}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Shopper</span>
                </span>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xs space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-orange-100 text-brand-hover'
                  }`}
                >
                  1
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <span className="text-slate-400 font-bold">{addresses.length}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </div>
              </button>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <Link
                  href="/login"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </Link>
              </div>
            </div>

            {/* Need Delivery Help Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-heading font-bold text-slate-900 block">
                  Need Delivery Help?
                </span>
                <a href="tel:+94112345678" className="text-slate-500 hover:text-brand-primary mt-0.5 block">
                  Hotline: 011 234 5678
                </a>
              </div>
              <div className="w-9 h-9 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Portal Details Content (lg:col-span-8) */}
          {/* ====================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* Desktop Welcome Hero Banner */}
            <div className="hidden sm:flex rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-xs items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100/80 text-brand-hover text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  <span>Customer Portal</span>
                </span>
                <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
                  Ayubowan, {profile.name.split(' ')[0]}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
                  Manage your orders, doorstep delivery addresses, and personal details in one convenient place.
                </p>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-primary shrink-0 shadow-inner">
                <ShoppingBag className="w-9 h-9 stroke-[1.8]" />
              </div>
            </div>

            {/* 3 Metric Cards (Desktop Artboard) */}
            <div className="hidden sm:grid grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>ACTIVE ORDERS</span>
                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-heading font-black text-slate-900">1</span>
                    <span className="text-xs font-semibold text-slate-500">in transit / pending</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-brand-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>TOTAL ORDERS</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-heading font-black text-slate-900">3</span>
                    <span className="text-xs font-semibold text-slate-500">lifetime placed</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>SAVED PLACES</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-heading font-black text-slate-900">
                      {addresses.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Home &amp; Office</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* Section 1: Recent Orders Card (Desktop Artboard) */}
            {/* ====================================================== */}
            <div className="hidden sm:block rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Recent Orders
                  </h3>
                </div>
                <Link
                  href="/account?view=all-orders"
                  className="text-xs font-bold text-brand-primary hover:text-brand-hover flex items-center gap-1"
                >
                  <span>View All Orders (3)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Order Item Box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-sm text-slate-900">
                      Order ID: #LD-84920
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">Placed May 24, 2025</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover font-bold text-[10px]">
                    ● Pending Confirmation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
                  {/* Items */}
                  <div className="md:col-span-8 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                        <Image src="/images/product-kettle.jpg" alt="Singer Kettle" fill className="object-cover" />
                      </div>
                      <div className="text-xs">
                        <p className="font-heading font-bold text-slate-900">
                          Singer 1.8L Stainless Steel Cordless Kettle
                        </p>
                        <span className="text-slate-400 text-[11px]">Qty: 1 • Rs. 4,850</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                        <Image src="/images/product-tea.jpg" alt="Dilmah Tea" fill className="object-cover" />
                      </div>
                      <div className="text-xs">
                        <p className="font-heading font-bold text-slate-900">
                          Dilmah Single Estate Ceylon Tea 500g
                        </p>
                        <span className="text-slate-400 text-[11px]">Qty: 1 • Rs. 2,700</span>
                      </div>
                    </div>
                  </div>

                  {/* Total & Payment */}
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4 text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Total Amount
                    </span>
                    <span className="font-heading font-black text-xl text-slate-900 block">
                      Rs. 7,550
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      💵 Cash on Delivery (COD)
                    </span>
                  </div>
                </div>

                {/* Delivery Progress Status */}
                <div className="p-3.5 rounded-xl bg-[#EEF2FF]/60 border border-[#E0E7FF] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Order Processing</span>
                    </span>
                    <span className="text-slate-500 font-medium">Courier: Domex Express Islandwide</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-[11px] text-slate-500 block font-medium">
                    Estimated delivery to Colombo 03 by Tuesday, May 27
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    variant="outline"
                    onClick={handlePrintReceipt}
                    className="h-9 px-4 rounded-xl text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    <span>Print Receipt</span>
                  </Button>

                  <Link href="/order-confirmation?orderId=LD-84920">
                    <Button className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5">
                      <span>View Order Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* Section 2: Saved Delivery Addresses (Desktop Artboard) */}
            {/* ====================================================== */}
            <div className="hidden sm:block rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Saved Delivery Addresses
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="text-xs font-bold text-brand-primary hover:text-brand-hover flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5 text-xs text-slate-700 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center">
                          {addr.type === 'Home' ? <Home className="w-3.5 h-3.5" /> : <Building className="w-3.5 h-3.5" />}
                        </div>
                        <span className="font-heading font-bold text-sm text-slate-900">
                          {addr.type}
                        </span>
                      </div>

                      {addr.isDefault ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✔ Default Address
                        </span>
                      ) : (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[11px] font-semibold text-slate-400 hover:text-brand-primary cursor-pointer"
                        >
                          Set as default
                        </button>
                      )}
                    </div>

                    <div className="space-y-0.5 text-slate-600">
                      <p className="font-bold text-slate-800">{addr.name}</p>
                      <p>{addr.address}</p>
                      <p>{addr.cityDistrict}</p>
                      <p className="pt-1 flex items-center gap-1 text-slate-800 font-semibold">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{addr.phone}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80 text-[11px] font-bold text-slate-500">
                      <button
                        onClick={() => setShowAddressModal(true)}
                        className="hover:text-brand-primary flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="hover:text-red-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ====================================================== */}
            {/* Section 3: Profile & Security (Desktop Artboard) */}
            {/* ====================================================== */}
            <div className="hidden sm:block rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Profile &amp; Security
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Protected Account</span>
                </span>
              </div>

              {/* 3-column Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    FULL NAME
                  </span>
                  <span className="font-heading font-bold text-sm text-slate-900 block">
                    {profile.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block">Registered customer name</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    PRIMARY EMAIL
                  </span>
                  <span className="font-heading font-bold text-sm text-slate-900 block truncate">
                    {profile.email}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    Verified for order receipts
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    MOBILE NUMBER
                  </span>
                  <span className="font-heading font-bold text-sm text-slate-900 block">
                    {profile.phone}
                  </span>
                  <span className="text-[11px] text-slate-400 block">Used for SMS dispatch alerts</span>
                </div>
              </div>

              {/* Security Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Password last updated 3 months ago</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Change Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(true)}
                    className="h-9 px-4 rounded-xl bg-[#8A2C0D] hover:bg-[#74240A] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* Mobile Navigation List Group (Mobile Artboard) */}
            {/* ====================================================== */}
            <div className="sm:hidden rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs divide-y divide-slate-100 text-xs">
              <Link
                href="/account?view=orders"
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-xs">My Orders</h4>
                    <span className="text-[10px] text-slate-400">3 orders placed</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-xs">Saved Delivery Addresses</h4>
                    <span className="text-[10px] text-slate-400">2 saved (Home, Office)</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-xs">Account Details &amp; Password</h4>
                    <span className="text-[10px] text-slate-400">Change password &amp; security</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <Link
                href="/faq"
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-xs">Customer Support &amp; FAQs</h4>
                    <span className="text-[10px] text-slate-400">Hotline &amp; Colombo pickup info</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/terms"
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-xs">Terms &amp; Store Policies</h4>
                    <span className="text-[10px] text-slate-400">Return &amp; refund guidelines</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/login"
                className="p-4 flex items-center justify-between text-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-xs">Log Out</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </Link>
            </div>

            {/* Mobile Island-Wide Delivery Card */}
            <div className="sm:hidden p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  LankaDirect Island-Wide Delivery
                </h4>
                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Orders dispatched through reliable third-party courier services across Sri Lanka.
                </p>
              </div>
            </div>

            {/* Mobile Version note */}
            <p className="sm:hidden text-center text-[10px] font-mono text-slate-400 pt-2 pb-6">
              LankaDirect Express • v2.4.1 (Colombo)
            </p>
          </div>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 7. Modal: Add New Address */}
      {/* ======================================================== */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Add Delivery Address
                </h3>
              </div>
              <button onClick={() => setShowAddressModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Address Label</label>
                <div className="flex gap-2">
                  {(['Home', 'Office'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewAddressType(t)}
                      className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                        newAddressType === t
                          ? 'border-brand-primary bg-orange-50 text-brand-primary'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Street Address</label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="e.g. No. 15, Station Road"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">City / District</label>
                <input
                  type="text"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. Nugegoda, Colombo District"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl mt-2">
                Save Address
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. Modal: Change Password */}
      {/* ======================================================== */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Change Password
                </h3>
              </div>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setModalFeedback('Password changed successfully!');
                setTimeout(() => {
                  setModalFeedback('');
                  setShowPasswordModal(false);
                }, 1500);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 8 characters"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl mt-2">
                Update Password
              </Button>

              {modalFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                  ✔ {modalFeedback}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. Modal: Edit Profile */}
      {/* ======================================================== */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Edit Personal Profile
                </h3>
              </div>
              <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditProfileModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl mt-2">
                Save Profile Changes
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
