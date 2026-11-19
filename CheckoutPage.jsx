import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        cardDetails: "",
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.06;
    const total = subtotal + tax;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        onClearCart();
    };

    if (isSubmitted) {
        return (
            <div className="checkout-success">
                <h2>Order Confirmed!</h2>
                <p>Thank you for shopping at VinylVault.</p>
                <Link className="btn btn-primary" to="/">
                    Return to Catalog
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your Cart is Empty</h2>
                <Link className="btn btn-secondary" to="/">
                    Browse Albums
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Checkout & Order Confirmation</h1>

            <div className="checkout-grid">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Shipping & Payment Details</h2>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code *</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            pattern="[0-9]{5}"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardDetails">Card Details *</label>
                        <input
                            type="text"
                            id="cardDetails"
                            name="cardDetails"
                            value={formData.cardDetails}
                            onChange={handleChange}
                            pattern="[0-9]{16}"
                            maxLength="16"
                            placeholder="Enter 16-digit number"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                        Place Order (${total.toFixed(2)})
                    </button>
                </form>
            </div>
            <div className="order-summary-card">
                <h2>Order Summary</h2>
                <ul className="summary-row">
                    {cart.map((item) => (
                        <li key={item.id} className="summary-row">
                            <span>{item.title} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="summary-row total-row">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Taxes (6%): ${tax.toFixed(2)}</p>
                    <p>Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
