
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const isAvailable = product.is_active;

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden hover:scale-[1.03] transform transition-all duration-300 max-w-xs sm:max-w-sm md:max-w-md w-full">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover bg-cover"
      />

      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3">
          {product.description}
        </p>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2">
          RS {product.price} Kilo
        </p>

        <p
          className={`mt-1 text-sm font-medium ${
            isAvailable ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isAvailable ? 'Available' : 'Not Available'}
        </p>

        <div className="mt-auto pt-4">
          {isAvailable ? (
            <Link to={`/product/${product.id}`}>
              <button className="w-full py-2 px-4 text-sm sm:text-base text-white font-semibold rounded-lg transition-all bg-blue-500 hover:bg-blue-600 cursor-pointer">
                Buy Stock
              </button>
            </Link>
          ) : (
            <button
              className="w-full py-2 px-4 text-sm sm:text-base text-white font-semibold rounded-lg transition-all bg-gray-400 cursor-not-allowed"
              disabled
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
