
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = Cookies.get("user");
    console.log(userData);
    axios
      .get("http://localhost:3000/api/orders/user", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={order.image_url}
                  alt={order.product_name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{order.product_name}</h2>
                  <p className="text-sm text-gray-600">{order.description}</p>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{order.total_price}
                </p>
                <p>
                  <strong>Ordered On:</strong>{" "}
                  {new Date(order.order_date).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {order.delivery_address}
                </p>
                <p>
                  <strong>Contact:</strong> {order.contact}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
