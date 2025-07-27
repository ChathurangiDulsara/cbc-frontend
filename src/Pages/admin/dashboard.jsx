import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BsGraphUp, 
  BsBoxSeam, 
  BsCart4, 
  BsPeopleFill,
  BsCurrencyDollar,
  BsEye,
  BsCheckCircle,
  BsXCircle
} from 'react-icons/bs';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Fetch orders
      const ordersResponse = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Fetch products
      const productsResponse = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const orders = ordersResponse.data || [];
      const products = productsResponse.data || [];

      // Calculate statistics
      const totalRevenue = orders.reduce((sum, order) => {
        const orderTotal = order.orderedItems?.reduce((itemSum, item) => 
          itemSum + (item.price * item.quantity), 0) || 0;
        return sum + orderTotal;
      }, 0);

      const pendingOrders = orders.filter(order => 
        order.status === 'pending' || order.status === 'preparing'
      ).length;

      const completedOrders = orders.filter(order => 
        order.status === 'completed' || order.status === 'delivered'
      ).length;

      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: [...new Set(orders.map(order => order.email))].length,
        totalRevenue,
        pendingOrders,
        completedOrders
      });

      // Get recent orders (last 5)
      const recent = orders
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
        .slice(0, 5);
      
      setRecentOrders(recent);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "bg-accent" }) => (
    <div className="bg-secondary/40 border border-accent/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent/70 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-accent">{value}</p>
          {subtitle && <p className="text-accent/60 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} p-4 rounded-xl text-primary`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-accent text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Dashboard</h1>
          <p className="text-accent/70">Welcome back! Here's an overview of your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BsCart4}
            title="Total Orders"
            value={stats.totalOrders}
            subtitle="All time orders"
            color="bg-blue-500"
          />
          <StatCard
            icon={BsBoxSeam}
            title="Total Products"
            value={stats.totalProducts}
            subtitle="In inventory"
            color="bg-green-500"
          />
          <StatCard
            icon={BsPeopleFill}
            title="Customers"
            value={stats.totalCustomers}
            subtitle="Unique customers"
            color="bg-purple-500"
          />
          <StatCard
            icon={BsCurrencyDollar}
            title="Revenue"
            value={`LKR ${stats.totalRevenue.toFixed(2)}`}
            subtitle="Total earnings"
            color="bg-accent"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            icon={BsCheckCircle}
            title="Completed Orders"
            value={stats.completedOrders}
            subtitle="Successfully delivered"
            color="bg-green-600"
          />
          <StatCard
            icon={BsEye}
            title="Pending Orders"
            value={stats.pendingOrders}
            subtitle="Awaiting processing"
            color="bg-orange-500"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-secondary/40 border border-accent/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-accent text-primary px-6 py-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <BsCart4 className="w-16 h-16 text-accent/40 mx-auto mb-4" />
              <p className="text-accent/70">No recent orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/20 border-b border-accent/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent/10">
                  {recentOrders.map((order, index) => {
                    const orderTotal = order.orderedItems?.reduce((sum, item) => 
                      sum + (item.price * item.quantity), 0) || 0;
                    
                    return (
                      <tr key={order.orderId} className={`hover:bg-accent/5 transition-colors ${index % 2 === 0 ? 'bg-primary/50' : 'bg-secondary/10'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                          {order.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                          {order.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-accent/80">
                          {order.createdAt 
                            ? new Date(order.createdAt).toLocaleDateString()
                            : order.date 
                              ? new Date(order.date).toLocaleDateString()
                              : 'N/A'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">
                          LKR {orderTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary/40 border border-accent/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <BsBoxSeam className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">Manage Products</h3>
            <p className="text-accent/70 text-sm mb-4">Add, edit, or remove products from your inventory</p>
            <button 
              onClick={() => window.location.href = '/admin/products'}
              className="bg-accent hover:bg-accent/90 text-primary px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Go to Products
            </button>
          </div>

          <div className="bg-secondary/40 border border-accent/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <BsCart4 className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">View Orders</h3>
            <p className="text-accent/70 text-sm mb-4">Track and manage all customer orders</p>
            <button 
              onClick={() => window.location.href = '/admin/adminOrders'}
              className="bg-accent hover:bg-accent/90 text-primary px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              View Orders
            </button>
          </div>

          <div className="bg-secondary/40 border border-accent/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <BsPeopleFill className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">Customer Management</h3>
            <p className="text-accent/70 text-sm mb-4">View and manage customer information</p>
            <button 
              onClick={() => window.location.href = '/admin/customers'}
              className="bg-accent hover:bg-accent/90 text-primary px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              View Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
