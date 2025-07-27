import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view customers");
      setLoading(false);
      return;
    }

    console.log("Fetching customers...");
    
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Customers response:", res.data); 
        
        // Handle both array and object responses
        let customersData;
        if (Array.isArray(res.data)) {
          customersData = res.data;
        } else if (res.data.list && Array.isArray(res.data.list)) {
          customersData = res.data.list;
        } else if (res.data.customersList && Array.isArray(res.data.customersList)) {
          customersData = res.data.customersList;
        } else {
          console.error("Expected array but got:", typeof res.data, res.data);
          customersData = [];
        }

        // Filter only customers (extra safety check)
        const filteredCustomers = customersData.filter(user => 
          user.type === 'customer' || !user.type // Include users without type field as customers
        );

        setCustomers(filteredCustomers);
        console.log("Filtered customers:", filteredCustomers.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err.response?.data || err.message);
        
        // Handle specific error cases
        if (err.response?.status === 401) {
          toast.error("Please login to view customers");
          // Optionally redirect to login
        } else if (err.response?.status === 403) {
          toast.error("Access denied. Admin privileges required.");
        } else {
          toast.error("Failed to fetch customers. Please try again.");
        }
        
        setCustomers([]); 
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setDetailModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setDetailModalVisible(false);
  };

  return (
    <div className="w-full min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Customer Management</h1>
          <p className="text-accent/70">View and manage all registered customers</p>
        </div>

        {/* Debug info */}
        <div className="mb-6 p-4 bg-secondary/20 rounded-lg border border-accent/20">
          <div className="flex justify-between items-center text-sm text-accent/80">
            <span>Total customers: <span className="font-semibold text-accent">{customers.length}</span></span>
            <span>Status: <span className="font-semibold text-accent">{loading ? 'Loading...' : 'Ready'}</span></span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-accent text-lg">Loading customers...</p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-16 bg-secondary/40 rounded-2xl border border-accent/20">
            <div className="mb-6">
              <svg className="w-16 h-16 text-accent/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-accent mb-2">No Customers Found</h3>
              <p className="text-accent/70 mb-6">There are no customers to display at the moment.</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Refresh Customers
            </button>
          </div>
        ) : (
          <div className="bg-secondary/40 rounded-2xl shadow-xl border border-accent/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent text-primary">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">User Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Join Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent/10">
                  {customers.map((customer, index) => (
                    <tr key={customer._id || customer.email} className={`hover:bg-accent/5 transition-colors ${index % 2 === 0 ? 'bg-primary/50' : 'bg-secondary/20'}`}>
                      <td className="px-6 py-4 text-accent font-medium">
                        {`${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-accent/80">
                        {customer.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-accent/80">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          customer.type === 'admin' ? 'bg-red-100 text-red-800' :
                          customer.type === 'customer' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.type || 'customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-accent/80">
                        {customer.createdAt 
                          ? new Date(customer.createdAt).toLocaleDateString()
                          : 'N/A'
                        }
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                          onClick={() => handleViewDetails(customer)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {detailModalVisible && selectedCustomer && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-primary border border-accent/20 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-accent text-primary px-6 py-4 rounded-t-2xl">
                <h2 className="text-2xl font-bold">Customer Details</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-accent/70 text-sm">Full Name</span>
                      <p className="font-semibold text-accent">
                        {`${selectedCustomer.firstName || ''} ${selectedCustomer.lastName || ''}`.trim() || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Email</span>
                      <p className="font-semibold text-accent">{selectedCustomer.email || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">User Type</span>
                      <p className="font-semibold text-accent">{selectedCustomer.type || 'customer'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-accent/70 text-sm">Join Date</span>
                      <p className="font-semibold text-accent">
                        {selectedCustomer.createdAt 
                          ? new Date(selectedCustomer.createdAt).toLocaleString()
                          : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Last Updated</span>
                      <p className="font-semibold text-accent">
                        {selectedCustomer.updatedAt 
                          ? new Date(selectedCustomer.updatedAt).toLocaleString()
                          : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Customer ID</span>
                      <p className="font-semibold text-accent">{selectedCustomer._id || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* If you have order statistics, you can add them here */}
                {selectedCustomer.orderStats && (
                  <div className="border-t border-accent/20 pt-4">
                    <h3 className="text-lg font-bold text-accent mb-4">Order Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/20 rounded-lg p-4 border border-accent/10">
                        <span className="text-accent/70 text-sm">Total Orders</span>
                        <p className="text-2xl font-bold text-accent">{selectedCustomer.orderStats.totalOrders}</p>
                      </div>
                      <div className="bg-secondary/20 rounded-lg p-4 border border-accent/10">
                        <span className="text-accent/70 text-sm">Total Spent</span>
                        <p className="text-2xl font-bold text-accent">LKR {selectedCustomer.orderStats.totalSpent}</p>
                      </div>
                      <div className="bg-secondary/20 rounded-lg p-4 border border-accent/10">
                        <span className="text-accent/70 text-sm">Last Order</span>
                        <p className="text-sm font-semibold text-accent">
                          {selectedCustomer.orderStats.lastOrderDate 
                            ? new Date(selectedCustomer.orderStats.lastOrderDate).toLocaleDateString()
                            : 'Never'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="sticky bottom-0 bg-primary border-t border-accent/20 px-6 py-4 rounded-b-2xl">
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
