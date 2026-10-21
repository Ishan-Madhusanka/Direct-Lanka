'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers,
  Package,
  Plus,
  Search,
  RotateCcw,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  GripVertical,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  Tag,
  ArrowUpDown,
  Upload,
  FolderTree,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubcategoryItem {
  id: string;
  name: string;
  count: number;
}

interface CategoryItem {
  id: string;
  number: number;
  name: string;
  slug: string;
  description: string;
  mobileDescription?: string;
  productCount: number;
  subcategories: SubcategoryItem[];
  isActive: boolean;
  image: string;
  badgeColor?: string;
  colorName?: string;
  sortOrder: number;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    number: 1,
    name: 'Home & Kitchen',
    slug: '/home-kitchen',
    description:
      'Quality kitchenware and reliable home appliances for everyday Sri Lankan living.',
    mobileDescription:
      'Artisanal homeware, cookware, traditional clay pots and brass dining essentials curated across island artisans.',
    productCount: 42,
    subcategories: [
      { id: 'sub-1-1', name: 'Cookware & Clay', count: 16 },
      { id: 'sub-1-2', name: 'Small Appliances', count: 12 },
      { id: 'sub-1-3', name: 'Tableware', count: 8 },
      { id: 'sub-1-4', name: 'Glassware & Cutlery', count: 7 },
    ],
    isActive: true,
    image: '/images/banner-cooker.jpg',
    badgeColor: '#F15A24',
    colorName: 'Primary Island Tangerine',
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    number: 2,
    name: 'Ceylon Grocery',
    slug: '/ceylon-grocery',
    description:
      'Pure Ceylon spices, export-grade tea, organic kithul treacle, and island pantry staples.',
    mobileDescription:
      'Pure spices, organic teas, kithul treacle, organic coconut, and traditional Sri Lankan pantry essentials.',
    productCount: 24,
    subcategories: [
      { id: 'sub-2-1', name: 'Spices & Seasoning', count: 10 },
      { id: 'sub-2-2', name: 'Ceylon Tea & Infusions', count: 8 },
      { id: 'sub-2-3', name: 'Preserves & Treacle', count: 4 },
      { id: 'sub-2-4', name: 'Rice & Grains', count: 2 },
    ],
    isActive: true,
    image: '/images/banner-pantry.jpg',
    badgeColor: '#10B981',
    colorName: 'Pure Ceylon Emerald',
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    number: 3,
    name: 'Electronics & Gadgets',
    slug: '/electronics',
    description:
      'High-reliability mobile accessories, audio gear, and personal rechargeable lifestyle electronics.',
    mobileDescription:
      'High-reliability mobile accessories, audio gear, and personal rechargeable lifestyle electronics.',
    productCount: 36,
    subcategories: [
      { id: 'sub-3-1', name: 'Audio & Earbuds', count: 18 },
      { id: 'sub-3-2', name: 'Power & Charging', count: 11 },
      { id: 'sub-3-3', name: 'Personal Appliances', count: 7 },
    ],
    isActive: true,
    image: '/images/product-earbuds.jpg',
    badgeColor: '#3B82F6',
    colorName: 'Colombo Sky Indigo',
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    number: 4,
    name: 'Fashion & Living',
    slug: '/fashion-living',
    description:
      'Contemporary handwoven cotton apparel, breathable linen, footwear, and relaxed tropical home goods.',
    mobileDescription:
      'Contemporary handwoven cotton apparel, breathable linen, footwear, and relaxed tropical home goods.',
    productCount: 28,
    subcategories: [
      { id: 'sub-4-1', name: 'Handloom Cotton', count: 15 },
      { id: 'sub-4-2', name: 'Footwear', count: 8 },
      { id: 'sub-4-3', name: 'Island Apparel', count: 5 },
    ],
    isActive: true,
    image: '/images/product-cinnamon.jpg',
    badgeColor: '#F59E0B',
    colorName: 'Ceylon Amber Honey',
    sortOrder: 4,
  },
  {
    id: 'cat-5',
    number: 5,
    name: 'Beauty & Personal Care',
    slug: '/beauty-wellness',
    description:
      'Herbal body oils, traditional pain balms, gentle botanical face serums, and bath essences.',
    mobileDescription:
      'Herbal body oils, traditional pain balms, gentle botanical face serums, and bath essences.',
    productCount: 18,
    subcategories: [
      { id: 'sub-5-1', name: 'Ayurveda & Balms', count: 10 },
      { id: 'sub-5-2', name: 'Wellness', count: 5 },
      { id: 'sub-5-3', name: 'Skin Care', count: 3 },
    ],
    isActive: true,
    image: '/images/product-balm.jpg',
    badgeColor: '#8B5CF6',
    colorName: 'Ayurveda Royal Violet',
    sortOrder: 5,
  },
  {
    id: 'cat-6',
    number: 6,
    name: 'Seasonal / Deals',
    slug: '/seasonal-deals',
    description:
      'Avurudu and festive limited promotions, bundle boxes, and timed clearance collections.',
    mobileDescription:
      'Avurudu and festive limited promotions, bundle boxes, and timed clearance collections.',
    productCount: 0,
    subcategories: [],
    isActive: false,
    image: '/images/bundle-kettle-tea.jpg',
    badgeColor: '#EF4444',
    colorName: 'Festive Flash Crimson',
    sortOrder: 6,
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modals state
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTargetCategory, setDeleteTargetCategory] = useState<CategoryItem | null>(null);
  const [addingSubcategoryCatId, setAddingSubcategoryCatId] = useState<string | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [isMegaMenuModalOpen, setIsMegaMenuModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form edit state
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    parentCategory: 'None (Top-Level Category)',
    sortOrder: 1,
    description: '',
    isActive: true,
    badgeColor: '#F15A24',
    colorName: 'Primary Island Tangerine',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setEditForm({
      name: cat.name,
      slug: cat.slug,
      parentCategory: 'None (Top-Level Category)',
      sortOrder: cat.sortOrder,
      description: cat.description,
      isActive: cat.isActive,
      badgeColor: cat.badgeColor || '#F15A24',
      colorName: cat.colorName || 'Primary Island Tangerine',
    });
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: editForm.name,
              slug: editForm.slug,
              sortOrder: Number(editForm.sortOrder),
              description: editForm.description,
              isActive: editForm.isActive,
              badgeColor: editForm.badgeColor,
              colorName: editForm.colorName,
            }
          : c
      )
    );
    showToast(`Category "${editForm.name}" updated successfully.`);
    setEditingCategory(null);
  };

  // Add Subcategory
  const handleAddSubcategory = (catId: string) => {
    if (!newSubcategoryName.trim()) return;
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const newSub: SubcategoryItem = {
            id: `sub-${Date.now()}`,
            name: newSubcategoryName.trim(),
            count: 0,
          };
          return {
            ...c,
            subcategories: [...c.subcategories, newSub],
          };
        }
        return c;
      })
    );
    showToast(`Subcategory "${newSubcategoryName}" added.`);
    setNewSubcategoryName('');
    setAddingSubcategoryCatId(null);
  };

  // Delete Category Check
  const handleDeleteCheck = (cat: CategoryItem) => {
    if (cat.productCount > 0) {
      // Trigger protection alert in modal
      setDeleteTargetCategory(cat);
    } else {
      // Deletable
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      showToast(`Category "${cat.name}" removed from catalog.`);
    }
  };

  // Filtered & Sorted Categories
  const filteredCategories = useMemo(() => {
    return categories
      .filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.subcategories.some((sub) => sub.name.toLowerCase().includes(q))
        );
      })
      .sort((a, b) =>
        sortOrder === 'asc' ? a.sortOrder - b.sortOrder : b.sortOrder - a.sortOrder
      );
  }, [categories, searchQuery, sortOrder]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
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
              Category Architecture
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              ● Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Department hierarchy, navigation routing, and catalog taxonomy
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Top highlight card */}
          <div className="px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 flex items-center gap-2.5 text-xs">
            <div className="w-6 h-6 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
              🍛
            </div>
            <div>
              <span className="font-heading font-black text-slate-900">
                Home &amp; Kitchen - 42 items
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                28.4% of total inventory footprint
              </span>
            </div>
          </div>

          {/* + Add New Category */}
          <Button
            onClick={() => {
              setEditForm({
                name: '',
                slug: '/category/new-shelf',
                parentCategory: 'None (Top-Level Category)',
                sortOrder: categories.length + 1,
                description: '',
                isActive: true,
                badgeColor: '#F15A24',
                colorName: 'Primary Island Tangerine',
              });
              setIsAddModalOpen(true);
            }}
            className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Category</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER & METRICS (390px Artboard)                                  */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-heading font-black text-slate-900">
              Category Hub
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            ● Live Sync
          </span>
        </div>

        {/* 2 Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block leading-tight">
                Architecture
              </span>
              <span className="font-heading font-black text-sm text-slate-900 block mt-0.5">
                6 Categories
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block leading-tight">
                Catalog Volume
              </span>
              <span className="font-heading font-black text-sm text-slate-900 block mt-0.5">
                148 Products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOOLBAR: Search & Sort Order                                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories, subcategories, or slugs..."
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

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
          >
            <option value="asc">Sort Order (Ascending)</option>
            <option value="desc">Sort Order (Descending)</option>
          </select>

          {/* Mobile + Add Button */}
          <Button
            onClick={() => {
              setEditForm({
                name: '',
                slug: '/category/new-shelf',
                parentCategory: 'None (Top-Level Category)',
                sortOrder: categories.length + 1,
                description: '',
                isActive: true,
                badgeColor: '#F15A24',
                colorName: 'Primary Island Tangerine',
              });
              setIsAddModalOpen(true);
            }}
            className="lg:hidden h-10 px-3.5 rounded-xl text-xs font-bold gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CATEGORY CARDS LIST (Both Desktop & Mobile Layout)                        */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all hover:border-slate-300"
          >
            {/* Top row: Category info */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                {/* Drag handle & Order Number */}
                <div className="flex items-center text-slate-400 hover:text-slate-600 cursor-grab shrink-0">
                  <GripVertical className="w-4 h-4" />
                  <span className="font-heading font-black text-xs text-slate-400 sm:ml-1">
                    #{cat.number}
                  </span>
                </div>

                {/* Category Thumbnail */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                </div>

                {/* Name, Slug, Description */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-black text-sm text-slate-900 leading-tight">
                      {cat.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        cat.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.isActive ? 'Active' : 'Inactive (Draft)'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {cat.slug}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-2xl leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Right: Product count, Sub-levels count, and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Stats */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                  <div className="text-left sm:text-right">
                    <span className="font-heading font-black text-slate-900 block leading-tight text-sm">
                      {cat.productCount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      Products
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-heading font-black text-slate-900 block leading-tight text-sm">
                      {cat.subcategories.length}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      Sub-levels
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-primary flex items-center justify-center transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteCheck(cat)}
                    className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Subcategories Bar */}
            <div className="bg-slate-50/70 border-t border-slate-100 px-4 sm:px-5 py-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                Subcategories:
              </span>

              {cat.subcategories.length === 0 ? (
                <span className="text-[11px] text-slate-400 italic">
                  No subcategories defined for this draft shelf.
                </span>
              ) : (
                cat.subcategories.map((sub) => (
                  <span
                    key={sub.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs"
                  >
                    <span>{sub.name}</span>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1 rounded">
                      {sub.count}
                    </span>
                  </span>
                ))
              )}

              {/* Add Subcategory Inline */}
              {addingSubcategoryCatId === cat.id ? (
                <div className="inline-flex items-center gap-1 ml-1">
                  <input
                    type="text"
                    autoFocus
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                    placeholder="Subcategory name"
                    className="h-7 px-2 rounded-lg border border-brand-primary text-xs font-semibold focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddSubcategory(cat.id)}
                    className="h-7 px-2.5 rounded-lg bg-brand-primary text-white text-xs font-bold"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setAddingSubcategoryCatId(null);
                      setNewSubcategoryName('');
                    }}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingSubcategoryCatId(cat.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-primary hover:underline ml-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Subcategory</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MEGA-MENU SYNCHRONIZATION FOOTER BANNER                                   */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl p-4 sm:p-5 border border-orange-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-black text-sm text-slate-900 leading-tight">
              Mega-Menu Synchronization
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Changes made to top-level order and active statuses propagate instantly to consumer web and mobile navigation bars.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsMegaMenuModalOpen(true)}
          className="w-full sm:w-auto h-9 px-4 rounded-xl border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 shrink-0 flex items-center justify-center gap-2 shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Preview Storefront Navigation</span>
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDIT CATEGORY (Desktop Centered & Mobile Slide-Up)                 */}
      {/* ========================================================================= */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setEditingCategory(null)}
          ></div>

          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 z-10 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95">
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2"></div>

            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <FolderTree className="w-4 h-4" />
                </div>
                <div>
                  <span className="sm:hidden text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Catalog Architecture
                  </span>
                  <h3 className="font-heading font-black text-base text-slate-900 leading-tight">
                    Edit Category: {editingCategory.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Department configuration &amp; storefront behavior
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Protection Alert Rule */}
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-black text-red-700 block text-[11px] uppercase tracking-wider">
                  Category Protection Rule (Catalog Lock Engaged)
                </strong>
                <p className="mt-0.5 leading-relaxed text-red-800 text-[11px]">
                  Cannot delete directly: <strong className="font-bold">{editingCategory.productCount} active products</strong> linked. Reassign or delete associated products before attempting removal.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              {/* Row 1: Category Name & URL Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">Category Name *</label>
                    <span className="text-[9px] text-slate-400 font-medium">
                      Sinhala &amp; Tamil auto-mapped
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editForm.slug}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-600 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Row 2: Parent Category & Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Parent Category</label>
                  <select
                    value={editForm.parentCategory}
                    onChange={(e) =>
                      setEditForm({ ...editForm, parentCategory: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-brand-primary"
                  >
                    <option value="None (Top-Level Category)">
                      None (Top-Level Category)
                    </option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Ceylon Grocery">Ceylon Grocery</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Display Sort Order</label>
                  <input
                    type="number"
                    value={editForm.sortOrder}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sortOrder: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 font-mono font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  Description (SEO &amp; Department Header)
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-brand-primary resize-y leading-relaxed text-xs"
                />
              </div>

              {/* Thumbnail / Icon Row */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Category Thumbnail / Icon</label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                      <Image
                        src={editingCategory.image}
                        alt={editingCategory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold text-slate-800 block">
                        {editingCategory.slug.replace('/', '')}-cover.webp
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Recommended: 400×400px WEBP or PNG. Transparent or soft-tone background.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('Image replaced with new media asset.')}
                      className="h-7 px-2.5 text-[11px] font-bold"
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              </div>

              {/* Storefront Badge Color (Mobile Swatches) */}
              <div className="space-y-1.5 pt-1">
                <label className="font-bold text-slate-800 block">Storefront Badge Color</label>
                <div className="flex items-center gap-3">
                  {[
                    { color: '#F15A24', name: 'Primary Island Tangerine' },
                    { color: '#10B981', name: 'Ceylon Emerald' },
                    { color: '#3B82F6', name: 'Sky Indigo' },
                    { color: '#8B5CF6', name: 'Royal Violet' },
                  ].map((swatch) => (
                    <button
                      key={swatch.color}
                      type="button"
                      onClick={() =>
                        setEditForm({
                          ...editForm,
                          badgeColor: swatch.color,
                          colorName: swatch.name,
                        })
                      }
                      style={{ backgroundColor: swatch.color }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                        editForm.badgeColor === swatch.color
                          ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-xs'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {editForm.badgeColor === swatch.color && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                  <span className="text-[11px] font-bold text-slate-600 ml-1">
                    {editForm.colorName}
                  </span>
                </div>
              </div>

              {/* Department Active Status */}
              <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-200/80 flex items-center justify-between">
                <div>
                  <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                    Department Active Status
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Make this category and its items visible on customer front-end navigation
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditForm({ ...editForm, isActive: !editForm.isActive })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    editForm.isActive ? 'bg-brand-primary' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      editForm.isActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Modal Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCategory(null)}
                  className="h-10 rounded-xl text-xs font-bold border-slate-200"
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-10 rounded-xl text-xs font-bold shadow-xs">
                  Save Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CATEGORY                                                       */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Add New Category Department
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newCat: CategoryItem = {
                  id: `cat-${Date.now()}`,
                  number: categories.length + 1,
                  name: editForm.name,
                  slug: editForm.slug.startsWith('/') ? editForm.slug : `/${editForm.slug}`,
                  description: editForm.description || 'New departmental shelf in catalog.',
                  productCount: 0,
                  subcategories: [],
                  isActive: editForm.isActive,
                  image: '/images/banner-pantry.jpg',
                  sortOrder: editForm.sortOrder,
                };
                setCategories((prev) => [...prev, newCat]);
                showToast(`New category "${editForm.name}" created.`);
                setIsAddModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sports & Fitness"
                  value={editForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = `/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                    setEditForm({ ...editForm, name, slug });
                  }}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Brief description for SEO and customer navigation..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-9 px-4 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-9 px-4 rounded-xl text-xs font-bold">
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETE PROTECTION ALERT (When products exist)                       */}
      {/* ========================================================================= */}
      {deleteTargetCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-black text-base text-slate-900 leading-tight">
              Cannot Delete &ldquo;{deleteTargetCategory.name}&rdquo;
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              This department currently holds{' '}
              <strong className="text-red-600 font-bold">
                {deleteTargetCategory.productCount} active products
              </strong>{' '}
              in your store. LankaDirect system protection prevents deletion of populated categories to preserve active buyer carts and SEO URLs.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left">
              <p className="font-bold text-slate-800">Required Steps:</p>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                <li>Reassign existing products to another category in Product Management</li>
                <li>Or archive the products from catalog</li>
                <li>Then return here to delete the empty shelf</li>
              </ul>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setDeleteTargetCategory(null)}
                className="w-full h-9 rounded-xl text-xs font-bold"
              >
                Understood, Keep Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PREVIEW STOREFRONT MEGA-MENU                                       */}
      {/* ========================================================================= */}
      {isMegaMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Storefront Mega-Menu Live Preview
                </h3>
              </div>
              <button
                onClick={() => setIsMegaMenuModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              This is how your active category taxonomy renders inside LankaDirect customer storefront headers across Sri Lanka:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {categories
                .filter((c) => c.isActive)
                .map((cat) => (
                  <div key={cat.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-200/80">
                      <div className="relative w-6 h-6 rounded overflow-hidden shrink-0">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                      </div>
                      <span className="font-heading font-black text-xs text-slate-900">
                        {cat.name}
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.id} className="flex items-center justify-between text-slate-600 hover:text-brand-primary cursor-pointer">
                          <span>{sub.name}</span>
                          <span className="text-[10px] text-slate-400">{sub.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <Button
                size="sm"
                onClick={() => setIsMegaMenuModalOpen(false)}
                className="h-9 px-4 rounded-xl text-xs font-bold"
              >
                Done Previewing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
