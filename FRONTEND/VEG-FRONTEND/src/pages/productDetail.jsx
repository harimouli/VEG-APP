import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [orderQty, setOrderQty] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/common/products/${id}`)

      .then((res) => setProduct(res.data))
      .catch(() => setMessage('Failed to load product details'));
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/orders/order/add', {
        productId: id,
        quantity: orderQty,
      
      });
      setMessage('Order placed successfully');
    } catch {
      setMessage('Order failed');
    }
  };

  if (!product) return <p className="text-center mt-10">{message || 'Loading...'}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl mt-4 font-semibold text-gray-800">Rs {product.price} / Kilo</p>

      <form onSubmit={handleOrder} className="mt-6">
        <label className="block mb-2 text-sm font-medium">Quantity (in Kg)</label>
        <input
          type="number"
          value={orderQty}
          onChange={(e) => setOrderQty(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ProductDetail;
