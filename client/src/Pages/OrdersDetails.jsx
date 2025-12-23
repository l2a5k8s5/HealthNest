import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, cancelOrder } from '../redux/slices/orderSlice';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import { 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiMapPin, 
  FiCreditCard,
  FiArrowLeft,
  FiXCircle
} from 'react-icons/fi';

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(cancelOrder(id)).unwrap();
        toast.success('Order cancelled successfully');
        dispatch(getOrderById(id));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  if (isLoading || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const canCancel = ['Processing', 'Confirmed'].includes(order.orderStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-500';
      case 'Confirmed':
        return 'bg-green-500';
      case 'Shipped':
        return 'bg-purple-500';
      case 'Delivered':
        return 'bg-green-600';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const orderStatuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];
  const currentStatusIndex = orderStatuses.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Back Button */}
        <Link to="/orders" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FiArrowLeft className="mr-2" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Order #{order._id.slice(-8)}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </div>
              {canCancel && (
                <button
                  onClick={handleCancelOrder}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center"
                >
                  <FiXCircle className="mr-2" />
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Progress */}
            {order.orderStatus !== 'Cancelled' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Order Status</h2>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className={`h-full ${getStatusColor(order.orderStatus)} transition-all`}
                      style={{
                        width: `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Status Steps */}
                  <div className="relative flex justify-between">
                    {orderStatuses.map((status, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const icons = [FiPackage, FiCheckCircle, FiTruck, FiCheckCircle];
                      const Icon = icons[index];

                      return (
                        <div key={status} className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? `${getStatusColor(order.orderStatus)} text-white`
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <p className={`text-sm mt-2 font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                            {status}
                          </p>
                          {order.statusHistory.find(h => h.status === status) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(order.statusHistory.find(h => h.status === status).timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-1">Tracking Number</p>
                    <p className="font-semibold text-blue-900">{order.trackingNumber}</p>
                    {order.courierService && (
                      <p className="text-sm text-blue-700 mt-1">via {order.courierService}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Weight: {item.weight}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p className="font-bold text-lg">₹{item.quantity * item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <FiMapPin className="w-5 h-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-gray-600 mt-2">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className="text-gray-600">PIN: {order.shippingAddress.pincode}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total</span>
                  <span className="font-semibold">₹{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {order.shippingPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${order.shippingPrice}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-semibold">₹{order.taxPrice}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{order.discountAmount}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-primary-600">₹{order.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <FiCreditCard className="w-5 h-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">{order.paymentMethod}</p>
                <p className={`text-sm mt-2 ${order.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                  {order.isPaid ? (
                    <>
                      <FiCheckCircle className="inline mr-1" />
                      Paid on {new Date(order.paidAt).toLocaleDateString('en-IN')}
                    </>
                  ) : (
                    'Payment Pending'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;