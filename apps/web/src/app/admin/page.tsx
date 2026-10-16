import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Package,
  Plus,
  ArrowUpRight,
  Truck,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatLKR, formatDateLK } from '@/lib/utils';
import { OrderStatus, PaymentStatus } from '@lankadirect/contracts';

export default function AdminDashboardPage() {
  const metrics = [
    {
      title: 'Gross Revenue (Month)',
      value: formatLKR(124500000), // LKR 1,245,000.00
      change: '+14.2% vs last month',
      icon: DollarSign,
      color: 'text-brand-primary',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Active Orders',
      value: '28 Orders',
      change: '8 awaiting dispatch',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending COD Collections',
      value: formatLKR(38500000), // LKR 385,000.00
      change: '14 orders with couriers',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Catalog Items',
      value: '142 SKUs',
      change: '3 items low on stock',
      icon: Package,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const recentOrders = [
    {
      id: 'LD-9821',
      customer: 'Kamal Perera',
      city: 'Nugegoda, Colombo',
      paymentMethod: 'COD',
      itemsCount: 3,
      totalCents: 850000,
      orderStatus: OrderStatus.CONFIRMED,
      paymentStatus: PaymentStatus.UNPAID,
      courierRef: 'PRONET-COL-4412',
      date: new Date().toISOString(),
    },
    {
      id: 'LD-9820',
      customer: 'Dilani Fernando',
      city: 'Kandy Outstation',
      paymentMethod: 'COD',
      itemsCount: 1,
      totalCents: 2450000,
      orderStatus: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.UNPAID,
      courierRef: 'PENDING',
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'LD-9819',
      customer: 'Suresh Jayawardena',
      city: 'Galle Outstation',
      paymentMethod: 'COD',
      itemsCount: 2,
      totalCents: 470000,
      orderStatus: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      courierRef: 'DOMEX-GL-9021',
      date: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-brand-text">
            Store Owner Dashboard
          </h1>
          <p className="text-sm text-brand-muted mt-0.5">
            Overview of LankaDirect online storefront and courier fulfillment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  {m.title}
                </span>
                <div className={`w-9 h-9 rounded-lg ${m.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-heading font-bold text-xl text-brand-text">
                  {m.value}
                </div>
                <p className="text-xs text-brand-muted mt-1">{m.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two-Column Grid: Recent Orders & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Recent Orders & Fulfillment</CardTitle>
                <CardDescription>
                  Real-time status of orders awaiting courier pickup or remittance
                </CardDescription>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-bg text-brand-muted uppercase tracking-wider font-semibold border-y border-brand-border">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer & Location</th>
                      <th className="py-2.5 px-3">Amount (LKR)</th>
                      <th className="py-2.5 px-3">Order Status</th>
                      <th className="py-2.5 px-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-subtle">
                    {recentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-brand-bg/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-brand-text">
                          {ord.id}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-brand-text">{ord.customer}</div>
                          <div className="text-[11px] text-brand-muted">{ord.city}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-brand-text">
                          {formatLKR(ord.totalCents)}
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={
                              ord.orderStatus === OrderStatus.DELIVERED
                                ? 'success'
                                : 'brand'
                            }
                          >
                            {ord.orderStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={
                              ord.paymentStatus === PaymentStatus.PAID
                                ? 'success'
                                : 'warning'
                            }
                          >
                            {ord.paymentStatus} ({ord.paymentMethod})
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development & Stitch Reference Status */}
        <div className="space-y-6">
          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-primary" />
                <CardTitle className="text-base">Courier Delivery Zones</CardTitle>
              </div>
              <CardDescription>
                Configured Sri Lankan courier fulfillment settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-orange-200/50">
                <span className="font-medium text-brand-text">Colombo & Suburbs</span>
                <span className="font-bold text-brand-text">LKR 350.00</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-orange-200/50">
                <span className="font-medium text-brand-text">Outstation Districts</span>
                <span className="font-bold text-brand-text">LKR 550.00</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="font-medium text-brand-text">Free Delivery Threshold</span>
                <span className="font-bold text-emerald-700">LKR 10,000.00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-base">Stock Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex justify-between items-center">
                <span>Wireless Fast Charging Station</span>
                <Badge variant="warning">3 Left</Badge>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex justify-between items-center">
                <span>Mesh Desk Chair - Colombo</span>
                <Badge variant="warning">5 Left</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
