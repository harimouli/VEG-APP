import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [orderQty, setOrderQty] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/common/products/${id}`);
        setProduct(res.data[0]);
      } catch {
        setMessage('⚠️ Failed to load product details');
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/orders/order/add', {
        productId: id,
        quantity: parseInt(orderQty),
        deliveryAddress: address,
        contactNumber: contact,
      });
      setMessage('✅ Order placed successfully');
      setOrderQty('');
      setAddress('');
      setContact('');
    } catch {
      setMessage('❌ Failed to place order');
    }
  };

  if (!product) {
    return <p className="text-center mt-10 text-lg text-gray-600">{message || 'Loading product...'}</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-blue-400 hover:bg-gray-200 text-sm rounded-md font-medium text-gray-800"
      >
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Product Details */}
        <div className="w-full lg:w-2/5 px-4 py-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-gray-800 mt-4">Rs {product.price} / Kg</p>
        </div>

        {/* Order Form (Aside) */}
        <aside className="w-full lg:w-3/5 px-4 py-6 bg-gray-50 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Place an Order</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity (in Kg)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={orderQty}
                onChange={(e) => setOrderQty(Number(e.target.value))}
                required
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Place Order
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center font-medium text-red-500">{message}</p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProductDetail;
