import React from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  ShoppingBagIcon, 
  CurrencyRupeeIcon, 
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      trend: 'up',
      icon: UsersIcon
    },
    {
      title: 'Total Orders',
      value: '8,432',
      change: '+8%',
      trend: 'up',
      icon: ShoppingBagIcon
    },
    {
      title: 'Revenue',
      value: '₹45,67,890',
      change: '+15%',
      trend: 'up',
      icon: CurrencyRupeeIcon
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2%',
      trend: 'down',
      icon: ChartBarIcon
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Priya Sharma',
      amount: '₹2,499',
      status: 'Delivered',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customer: 'Ananya Patel',
      amount: '₹1,799',
      status: 'Shipped',
      date: '2024-01-14'
    },
    {
      id: 'ORD-003',
      customer: 'Kavya Reddy',
      amount: '₹3,299',
      status: 'Processing',
      date: '2024-01-14'
    },
    {
      id: 'ORD-004',
      customer: 'Meera Singh',
      amount: '₹999',
      status: 'Confirmed',
      date: '2024-01-13'
    }
  ];

  const topProducts = [
    {
      name: 'Hydrating Face Serum',
      sales: 234,
      revenue: '₹2,09,466'
    },
    {
      name: 'Matte Lipstick Set',
      sales: 189,
      revenue: '₹1,03,761'
    },
    {
      name: 'Vitamin C Face Wash',
      sales: 156,
      revenue: '₹66,300'
    },
    {
      name: 'Nourishing Hair Oil',
      sales: 143,
      revenue: '₹42,757'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your beauty store performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;