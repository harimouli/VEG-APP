import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/productItem';

import Cookies from 'js-cookie';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/common/products');
        setProducts(response.data);
        setLoading(false);
      } catch {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Product Catalog</h1>

      {loading ? (
        <div className="text-xl text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-xl text-center text-red-500">{error}</div>
      ) : (
        <div className="flex-grow w-full flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
