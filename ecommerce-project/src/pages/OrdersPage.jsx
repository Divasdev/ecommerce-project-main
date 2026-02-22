import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import './OrdersPage.css';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Orders fetch error:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Loading Orders...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {orders.length === 0 && <div>No orders found.</div>}

          {orders.map((order) => (
            <div className="order-container" key={order.id}>
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{order.date}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${order.total}</div>
                  </div>
                </div>
                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products?.map((product, index) => (
                  <div key={index}>
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-details">
                      <div className="product-name">{product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on: {product.deliveryDate}
                      </div>
                      <div className="product-quantity">
                        Quantity: {product.quantity}
                      </div>
                      <button className="buy-again-button button-primary">
                        <img
                          className="buy-again-icon"
                          src="/images/icons/buy-again.png"
                          alt="buy again"
                        />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>
                    <div className="product-actions">
                      <a href="/tracking">
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}