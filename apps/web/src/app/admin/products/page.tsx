'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Plus,
  Download,
  Filter,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  Trash2,
  Edit2,
  ChevronDown,
  ScanBarcode,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductItem {
  id: string;
  name: string;
  brand: string;
  details: string;
  sku: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  stockQty: number;
  stockThreshold: number;
  isActive: boolean;
  image: string;
  badgeType: 'LOW' | 'OK' | 'EMPTY';
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Singer 1.8L Stainless Steel Cordless Electric Kettle',
    brand: 'Singer',
    details: '1500W Fast Boil • Automatic Shut-off',
    sku: 'SIN-KT-1800',
    category: 'Home & Kitchen',
    sellingPrice: 4950,
    costPrice: 3600,
    stockQty: 4,
    stockThreshold: 5,
    isActive: true,
    image: '/images/product-kettle.jpg',
    badgeType: 'LOW',
  },
  {
    id: 'prod-2',
    name: 'Dilmah Ceylon Black Tea 500g',
    brand: 'Dilmah',
    details: 'Single Origin 100% Pure Ceylon Tea',
    sku: 'DLM-TEA-500',
    category: 'Foods & Grocery',
    sellingPrice: 2150,
    costPrice: 1600,
    stockQty: 3,
    stockThreshold: 5,
    isActive: true,
    image: '/images/product-tea.jpg',
    badgeType: 'LOW',
  },
  {
    id: 'prod-3',
    name: 'Philips Daily Collection Food Processor 450W',
    brand: 'Philips',
    details: '1.5L Bowl Capacity • 2 Speed Pulse Control',
    sku: 'PHI-FP-450',
    category: 'Home & Kitchen',
    sellingPrice: 14800,
    costPrice: 11200,
    stockQty: 12,
    stockThreshold: 5,
    isActive: true,
    image: '/images/product-processor.jpg',
    badgeType: 'OK',
  },
  {
    id: 'prod-4',
    name: 'Anker Soundcore R50i True Wireless Earbuds',
    brand: 'Anker',
    details: '30H Playtime • IPX5 Water Resistant • 10mm Drivers',
    sku: 'ANK-EAR-R50',
    category: 'Electronics',
    sellingPrice: 6850,
    costPrice: 5200,
    stockQty: 34,
    stockThreshold: 10,
    isActive: true,
    image: '/images/product-earbuds.jpg',
    badgeType: 'OK',
  },
  {
    id: 'prod-5',
    name: 'Pure Cotton Handloom Casual Shirt',
    brand: 'Barefoot Heritage',
    details: 'Size: M • Indigo • Eco-friendly Dyes',
    sku: 'BFT-SH-M',
    category: 'Fashion & Apparel',
    sellingPrice: 4200,
    costPrice: 2850,
    stockQty: 18,
    stockThreshold: 8,
    isActive: true,
    image: '/images/product-cinnamon.jpg',
    badgeType: 'OK',
  },
  {
    id: 'prod-6',
    name: 'Borosil Klip N Store Airtight Glass Set (3-Piece)',
    brand: 'Borosil',
    details: 'Microwave & Oven Safe • BPA Free Lids',
    sku: 'BOR-GS-3PC',
    category: 'Home & Kitchen',
    sellingPrice: 4200,
    costPrice: 3100,
    stockQty: 0,
    stockThreshold: 5,
    isActive: false,
    image: '/images/product-storage.jpg',
    badgeType: 'EMPTY',
  },
  {
    id: 'prod-7',
    name: 'Spa Ceylon De-Stress Calming Wellness Balm 50g',
    brand: 'Spa Ceylon',
    details: 'Luxury Ayurveda • 50g Glass Jar',
    sku: 'SPA-BALM-50',
    category: 'Beauty & Care',
    sellingPrice: 3250,
    costPrice: 2400,
    stockQty: 8,
    stockThreshold: 5,
    isActive: true,
    image: '/images/product-balm.jpg',
    badgeType: 'OK',
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockFilter, setSelectedStockFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'low' | 'drafts'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers state
  const [deleteProductTarget, setDeleteProductTarget] = useState<ProductItem | null>(null);
  const [editProductTarget, setEditProductTarget] = useState<ProductItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    details: '',
    sku: '',
    category: 'Home & Kitchen',
    sellingPrice: 0,
    costPrice: 0,
    stockQty: 10,
    isActive: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle active/inactive
  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = !p.isActive;
          showToast(`"${p.name}" is now ${updated ? 'Active (Live on Storefront)' : 'Inactive / Draft'}`);
          return { ...p, isActive: updated };
        }
        return p;
      })
    );
  };

  // Delete product confirmation
  const handleConfirmDelete = () => {
    if (!deleteProductTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteProductTarget.id));
    showToast(`Product "${deleteProductTarget.name}" deleted from catalog.`);
    setDeleteProductTarget(null);
  };

  // Select all handler
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open Edit Modal
  const handleOpenEdit = (product: ProductItem) => {
    setEditProductTarget(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      details: product.details,
      sku: product.sku,
      category: product.category,
      sellingPrice: product.sellingPrice,
      costPrice: product.costPrice,
      stockQty: product.stockQty,
      isActive: product.isActive,
    });
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductTarget) return;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === editProductTarget.id) {
          return {
            ...p,
            ...formData,
            badgeType: formData.stockQty === 0 ? 'EMPTY' : formData.stockQty <= 5 ? 'LOW' : 'OK',
          };
        }
        return p;
      })
    );
    showToast(`Product "${formData.name}" updated successfully.`);
    setEditProductTarget(null);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brand: '',
      details: '',
      sku: `LD-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Home & Kitchen',
      sellingPrice: 4500,
      costPrice: 3200,
      stockQty: 25,
      isActive: true,
    });
    setIsAddModalOpen(true);
  };

  // Save Add
  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      ...formData,
      stockThreshold: 5,
      image: '/images/product-kettle.jpg',
      badgeType: formData.stockQty === 0 ? 'EMPTY' : formData.stockQty <= 5 ? 'LOW' : 'OK',
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New product "${formData.name}" added to catalog.`);
    setIsAddModalOpen(false);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);

      // Category
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      // Stock
      const matchesStock =
        selectedStockFilter === 'All'
          ? true
          : selectedStockFilter === 'Low'
          ? p.stockQty > 0 && p.stockQty <= p.stockThreshold
          : selectedStockFilter === 'Out'
          ? p.stockQty === 0
          : p.stockQty > p.stockThreshold;

      // Tab
      const matchesTab =
        activeTab === 'all'
          ? true
          : activeTab === 'active'
          ? p.isActive
          : activeTab === 'low'
          ? p.stockQty <= p.stockThreshold
          : !p.isActive;

      return matchesSearch && matchesCategory && matchesStock && matchesTab;
    });
  }, [products, searchQuery, selectedCategory, selectedStockFilter, activeTab]);

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
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Product Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover text-xs font-bold">
              Node: Colombo (01)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="font-semibold text-slate-700">148 Total Products</span>
            <span className="mx-1.5">•</span>
            <span className="text-emerald-600 font-semibold">132 Active</span>
            <span className="mx-1.5">•</span>
            <span className="text-slate-400 font-semibold">16 Inactive / Draft</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Export CSV */}
          <Button
            variant="outline"
            onClick={() => showToast('Product catalog CSV exported successfully.')}
            className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </Button>

          {/* + Add New Product */}
          <Button
            onClick={handleOpenAdd}
            className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-heading font-black text-slate-900">
            Products
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            148
          </span>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, brand, or SKU..."
              className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
            {/* Mobile Barcode Scanner Icon */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-primary"
              aria-label="Scan Barcode"
            >
              <ScanBarcode className="w-4 h-4" />
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
            >
              <option value="All">All Categories (148)</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Foods & Grocery">Foods & Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Beauty & Care">Beauty & Care</option>
            </select>
          </div>

          {/* Stock Filter Dropdown */}
          <div className="sm:col-span-2 lg:col-span-2">
            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
            >
              <option value="All">All Stock</option>
              <option value="In">In Stock (&gt;5)</option>
              <option value="Low">Low Stock (≤5)</option>
              <option value="Out">Out of Stock (0)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="sm:col-span-1 lg:col-span-1 flex items-center justify-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStockFilter('All');
                setActiveTab('all');
                showToast('Filters reset to default.');
              }}
              className="w-full sm:w-auto h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Tabs Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All (148)
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'active'
                  ? 'bg-brand-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Active (132)
            </button>
            <button
              onClick={() => setActiveTab('low')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === 'low'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>Low Stock (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'drafts'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Drafts (11)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-time sync to Colombo Express Storefront</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BULK ACTIONS BAR (When items are selected)                                */}
      {/* ========================================================================= */}
      {selectedIds.length > 0 && (
        <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-brand-hover">
              {selectedIds.length} Products Selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setProducts((prev) =>
                  prev.map((p) =>
                    selectedIds.includes(p.id) ? { ...p, isActive: true } : p
                  )
                );
                showToast(`Marked ${selectedIds.length} products as Active.`);
              }}
              className="h-8 rounded-xl text-xs font-bold border-orange-200"
            >
              Set Active
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setProducts((prev) =>
                  prev.map((p) =>
                    selectedIds.includes(p.id) ? { ...p, isActive: false } : p
                  )
                );
                showToast(`Marked ${selectedIds.length} products as Inactive.`);
              }}
              className="h-8 rounded-xl text-xs font-bold border-orange-200"
            >
              Set Draft
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedIds([])}
              className="h-8 rounded-xl text-xs font-bold text-slate-500"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP TABLE VIEW (1440px Artboard)                                      */}
      {/* ========================================================================= */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedIds.length === filteredProducts.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-brand-primary accent-brand-primary cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-black">Product</th>
                <th className="py-3 px-4 font-black">SKU</th>
                <th className="py-3 px-4 font-black">Category</th>
                <th className="py-3 px-4 font-black">Selling Price</th>
                <th className="py-3 px-4 font-black">Stock Qty</th>
                <th className="py-3 px-4 text-right font-black">Status / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredProducts.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                const isLowStock = p.stockQty > 0 && p.stockQty <= p.stockThreshold;
                const isOutOfStock = p.stockQty === 0;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-orange-50/40' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(p.id)}
                        className="w-4 h-4 rounded text-brand-primary accent-brand-primary cursor-pointer"
                      />
                    </td>

                    {/* Product Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            Brand: {p.brand} {p.details ? `• ${p.details}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 font-bold">
                      {p.sku}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {p.category}
                      </span>
                    </td>

                    {/* Selling Price & Cost */}
                    <td className="py-3.5 px-4">
                      <p className="font-heading font-black text-slate-900 text-xs">
                        Rs. {p.sellingPrice.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Cost: Rs. {p.costPrice.toLocaleString()}
                      </p>
                    </td>

                    {/* Stock Qty */}
                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-bold">
                          0 units (Out of Stock)
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold">
                          {p.stockQty} units (Low Stock)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-bold">
                          {p.stockQty} units
                        </span>
                      )}
                    </td>

                    {/* Status & Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {/* Active Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggleActive(p.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            p.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                          aria-label={`Toggle active state for ${p.name}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              p.isActive ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-brand-primary flex items-center justify-center transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteProductTarget(p)}
                          className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">1 to {filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-800">148</strong> products
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              &lt; Previous
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 1
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 2
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 3
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => setCurrentPage(22)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
            >
              22
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LIST VIEW (390px Artboard)                                         */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3.5">
        {filteredProducts.map((p) => {
          const isLowStock = p.stockQty > 0 && p.stockQty <= p.stockThreshold;
          const isOutOfStock = p.stockQty === 0;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
            >
              {/* Top row: Thumbnail & Title & Price & Badge */}
              <div className="flex items-start gap-3">
                {/* Thumbnail with overlay badge */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                  {/* Badge overlay */}
                  {p.badgeType === 'LOW' && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-black uppercase">
                      LOW
                    </span>
                  )}
                  {p.badgeType === 'OK' && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-black uppercase">
                      OK
                    </span>
                  )}
                  {p.badgeType === 'EMPTY' && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-slate-800 text-white text-[9px] font-black uppercase">
                      EMPTY
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-black text-xs text-slate-900 leading-snug line-clamp-2">
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    SKU: {p.sku}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading font-black text-sm text-amber-800">
                      Rs. {p.sellingPrice.toLocaleString()}
                    </span>

                    {/* Stock status pill */}
                    {isOutOfStock ? (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                        ⊘ 0 units
                      </span>
                    ) : isLowStock ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center gap-1">
                        <span>⚠ {p.stockQty} units left</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <span>✓ {p.stockQty} units</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action bar on card bottom */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                {/* Active switch */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(p.id)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      p.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        p.isActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-bold ${
                      p.isActive ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Edit & Delete buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="h-8 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteProductTarget(p)}
                    className="w-8 h-8 rounded-xl border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: DELETE PRODUCT (Desktop Centered & Mobile Slide-Up)                 */}
      {/* Matches both artboard screenshots precisely!                              */}
      {/* ========================================================================= */}
      {deleteProductTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          {/* Backdrop click */}
          <div
            className="absolute inset-0"
            onClick={() => setDeleteProductTarget(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 z-10 animate-in slide-in-from-bottom sm:zoom-in-95">
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2"></div>

            {/* Desktop Close X */}
            <button
              onClick={() => setDeleteProductTarget(null)}
              className="hidden sm:block absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with red trash icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-base text-slate-900 leading-tight">
                  Delete &ldquo;{deleteProductTarget.name}&rdquo;?
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  LankaDirect Catalog Action • SKU: {deleteProductTarget.sku}
                </p>
              </div>
            </div>

            {/* Warning Text */}
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs text-slate-700 space-y-1">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Are you sure you want to delete{' '}
                  <strong className="text-slate-900 font-bold">
                    &ldquo;{deleteProductTarget.name}&rdquo;
                  </strong>
                  ? Customers will no longer be able to view or purchase this item across LankaDirect stores.
                </p>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">
                Outstanding orders will remain intact. This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeleteProductTarget(null)}
                className="h-10 rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="h-10 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-800 text-white flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Product</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT                                                 */}
      {/* ========================================================================= */}
      {(isAddModalOpen || editProductTarget) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  {isAddModalOpen ? 'Add New Product to Catalog' : 'Edit Catalog Product'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditProductTarget(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Singer 1.8L Stainless Steel Cordless Electric Kettle"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Singer"
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-mono font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800"
                >
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Foods & Grocery">Foods & Grocery</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Beauty & Care">Beauty & Care</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Selling Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, sellingPrice: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cost Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, costPrice: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stockQty}
                    onChange={(e) =>
                      setFormData({ ...formData, stockQty: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Features / Specifications</label>
                <input
                  type="text"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="e.g. 1500W Fast Boil • Automatic Shut-off"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-primary accent-brand-primary"
                />
                <label htmlFor="activeToggle" className="font-bold text-slate-700 cursor-pointer">
                  Publish to storefront immediately (Active status)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditProductTarget(null);
                  }}
                  className="h-9 px-4 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-9 px-4 rounded-xl text-xs font-bold">
                  {isAddModalOpen ? 'Create Product' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BARCODE SCANNER (Mobile simulation)                                */}
      {/* ========================================================================= */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-heading font-black text-sm text-slate-900">
                Camera Barcode Scanner
              </span>
              <button onClick={() => setIsScannerOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white">
              <ScanBarcode className="w-16 h-16 text-brand-primary animate-pulse" />
              <div className="w-40 h-0.5 bg-red-500 shadow-md animate-bounce mt-4"></div>
              <p className="text-[10px] text-slate-300 mt-2">
                Align barcode within camera viewfinder
              </p>
            </div>

            <Button
              onClick={() => {
                setSearchQuery('SIN-KT-1800');
                setIsScannerOpen(false);
                showToast('Scanned barcode: SIN-KT-1800 (Singer Kettle)');
              }}
              className="w-full h-9 rounded-xl text-xs font-bold"
            >
              Simulate Scan: Singer Kettle (SIN-KT-1800)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
