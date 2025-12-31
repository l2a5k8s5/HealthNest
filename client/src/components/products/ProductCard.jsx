import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartLocal } from '../../redux/slices/cartSlice';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // Safety check (important for async data)
  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (product.stock <= 0) {
      toast.error('Product out of stock');
      return;
    }

    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.images?.[0]?.url || 'https://via.placeholder.com/400',
      price:
        product.discountPrice > 0
          ? product.discountPrice
          : product.price,
      stock: product.stock,
      quantity: 1,
      weight: product.weight
        ? `${product.weight.value}${product.weight.unit}`
        : 'N/A',
    };

    dispatch(addToCartLocal(cartItem));
    toast.success('Added to cart!');
  };

  const discountPercentage =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  return (
    <Link to={`/products/${product._id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Out of Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-primary-500 hover:text-white"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
          {product.category || 'General'}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            {product.rating || 0} ({product.numReviews || 0} reviews)
          </span>
        </div>

        {/* Weight */}
        <p className="text-sm text-gray-600 mb-3">
          {product.weight
            ? `${product.weight.value}${product.weight.unit}`
            : 'Weight not available'}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {product.discountPrice > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">
                  ₹{product.discountPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>
            )}
          </div>

          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-xs text-red-600 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
