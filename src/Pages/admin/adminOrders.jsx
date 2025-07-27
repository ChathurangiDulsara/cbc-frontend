import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view orders");
      setLoading(false);
      return;
    }

    console.log("Fetching orders..."); // Debug log
    
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Orders response:", res.data); // Debug log
        
        // Ensure we always set an array
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Expected array but got:", typeof res.data, res.data);
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err.response?.data || err.message);
        toast.error("Failed to fetch orders. Please try again.");
        setOrders([]); // Ensure orders is always an array
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems) => {
    if (!orderedItems || !Array.isArray(orderedItems)) {
      return 0;
    }
    return orderedItems.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status || "", notes: order.notes || "" });
    setUpdateModalVisible(true);
  };

  const closeModals = () => {
    setSelectedOrder(null);
    setUpdateModalVisible(false);
    setDetailModalVisible(false);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`,
        { status: updateData.status, notes: updateData.notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === selectedOrder.orderId
              ? { ...order, status: updateData.status, notes: updateData.notes }
              : order
          )
        );
        closeModals();
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        toast.error("Failed to update order. Please try again.");
      });
  };

  return (
    <div className="w-full min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Order Management</h1>
          <p className="text-accent/70">Manage and track all customer orders</p>
        </div>

        {/* Debug info */}
        <div className="mb-6 p-4 bg-secondary/20 rounded-lg border border-accent/20">
          <div className="flex justify-between items-center text-sm text-accent/80">
            <span>Total orders: <span className="font-semibold text-accent">{orders.length}</span></span>
            <span>Status: <span className="font-semibold text-accent">{loading ? 'Loading...' : 'Ready'}</span></span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-accent text-lg">Loading orders...</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-secondary/40 rounded-2xl border border-accent/20">
            <div className="mb-6">
              <svg className="w-16 h-16 text-accent/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-accent mb-2">No Orders Found</h3>
              <p className="text-accent/70 mb-6">There are no orders to display at the moment.</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Refresh Orders
            </button>
          </div>
        ) : (
          <div className="bg-secondary/40 rounded-2xl shadow-xl border border-accent/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent text-primary">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Total</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent/10">
                  {orders.map((order, index) => (
                    <tr key={order.orderId || order._id} className={`hover:bg-accent/5 transition-colors ${index % 2 === 0 ? 'bg-primary/50' : 'bg-secondary/20'}`}>
                      <td className="px-6 py-4 text-accent font-medium">{order.orderId || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-accent/80">
                        {order.createdAt 
                          ? new Date(order.createdAt).toLocaleDateString()
                          : order.date 
                            ? new Date(order.date).toLocaleDateString()
                            : 'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 text-accent font-semibold">
                        LKR {calculateTotal(order.orderedItems).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                            onClick={() => handleViewDetails(order)}
                          >
                            View
                          </button>
                          <button
                            className="bg-accent hover:bg-accent/90 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                            onClick={() => handleUpdateOrder(order)}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {detailModalVisible && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-primary border border-accent/20 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-accent text-primary px-6 py-4 rounded-t-2xl">
                <h2 className="text-2xl font-bold">Order Details</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-accent/70 text-sm">Order ID</span>
                      <p className="font-semibold text-accent">{selectedOrder.orderId}</p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Status</span>
                      <p className="font-semibold text-accent">{selectedOrder.status || 'pending'}</p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Date</span>
                      <p className="font-semibold text-accent">
                        {selectedOrder.createdAt 
                          ? new Date(selectedOrder.createdAt).toLocaleString()
                          : selectedOrder.date
                            ? new Date(selectedOrder.date).toLocaleString()
                            : 'N/A'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-accent/70 text-sm">Customer Name</span>
                      <p className="font-semibold text-accent">{selectedOrder.name || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Phone</span>
                      <p className="font-semibold text-accent">{selectedOrder.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-accent/70 text-sm">Email</span>
                      <p className="font-semibold text-accent">{selectedOrder.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-accent/70 text-sm">Delivery Address</span>
                  <p className="font-semibold text-accent">{selectedOrder.address || 'N/A'}</p>
                </div>

                <div>
                  <span className="text-accent/70 text-sm">Notes</span>
                  <p className="font-semibold text-accent">{selectedOrder.notes || selectedOrder.Notes || "No notes"}</p>
                </div>
                
                <div className="border-t border-accent/20 pt-4">
                  <h3 className="text-lg font-bold text-accent mb-4">Ordered Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.orderedItems && Array.isArray(selectedOrder.orderedItems) ? (
                      selectedOrder.orderedItems.map((item, index) => (
                        <div key={index} className="bg-secondary/20 rounded-lg p-4 border border-accent/10">
                          <div className="flex items-start space-x-4">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name || item.productName || 'Product'}
                                className="w-16 h-16 rounded-lg object-cover border border-accent/20"
                                onError={(e) => {e.target.style.display = 'none'}}
                              />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold text-accent">{item.name || item.productName || 'N/A'}</h4>
                              <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                                <div>
                                  <span className="text-accent/70">Price:</span>
                                  <p className="font-semibold text-accent">LKR {(item.price || 0).toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="text-accent/70">Quantity:</span>
                                  <p className="font-semibold text-accent">{item.quantity || 0}</p>
                                </div>
                                <div>
                                  <span className="text-accent/70">Subtotal:</span>
                                  <p className="font-semibold text-accent">LKR {((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-accent/70 text-center py-4">No items found</p>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-accent/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-accent">Total Amount:</span>
                      <span className="text-xl font-bold text-accent">LKR {calculateTotal(selectedOrder.orderedItems).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-primary border-t border-accent/20 px-6 py-4 rounded-b-2xl">
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    onClick={closeModals}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {updateModalVisible && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-primary border border-accent/20 w-full max-w-md rounded-2xl shadow-2xl">
              <div className="bg-accent text-primary px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-bold">Update Order</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">Order Status</label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                    className="w-full p-3 border border-accent/30 rounded-lg bg-secondary/20 text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">Order Notes</label>
                  <textarea
                    value={updateData.notes}
                    onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                    className="w-full p-3 border border-accent/30 rounded-lg bg-secondary/20 text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                    rows="4"
                    placeholder="Add notes about the order..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border-t border-accent/20 px-6 py-4 rounded-b-2xl">
                <div className="flex justify-end space-x-3">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    onClick={closeModals}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-accent hover:bg-accent/90 text-primary px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    onClick={handleUpdate}
                  >
                    Update Order
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
