import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/common/Loader';
import { FiPackage, FiEye, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, total, pages } = useSelector((state) => state.orders);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getMyOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FiPackage className="w-5 h-5 text-blue-500" />;
      case 'Confirmed':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'Shipped':
        return <FiTruck className="w-5 h-5 text-purple-500" />;
      case 'Delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />;
      case 'Cancelled':
        return <FiXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiPackage className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiPackage className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Orders Yet
          </h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold mb-8">
          My Orders
          <span className="text-lg text-gray-600 font-normal ml-3">
            ({total} total)
          </span>
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold">#{order._id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-lg text-primary-600">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {order.orderItems.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-semibold">₹{item.quantity * item.price}</p>
                    </div>
                  ))}
                  {order.orderItems.length > 2 && (
                    <p className="text-sm text-gray-600">
                      +{order.orderItems.length - 2} more items
                    </p>
                  )}
                </div>

                {/* Payment & Delivery Status */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Payment</p>
                      <p className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                        {order.isPaid ? 'Paid' : order.paymentMethod}
                      </p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Tracking</p>
                        <p className="font-semibold text-blue-600">
                          {order.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/orders/${order._id}`}
                    className="btn-primary flex items-center"
                  >
                    <FiEye className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(pages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;