import React, { useState } from 'react';
import './App.css'

function Form() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [sku, setSku] = useState('');
  const [stockInHand, setStockInHand] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total
    const totalPrice = price + (price * 0.18) - discount;
    setTotal(totalPrice);

    // Prepare data to send
    const formData = {
      productName,
      price,
      discount,
      total: totalPrice,
      sku,
      stockInHand
    };

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log('Form submitted successfully!', responseData);
      setProductName("");
      setPrice("");
      setDiscount("");
      setSku("");
      setStockInHand("");
      total("")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Discount:</label>
        <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>SKU:</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
      </div>
      <div>
        <label>Stock In Hand:</label>
        <input type="number" value={stockInHand} onChange={(e) => setStockInHand(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Total:</label>
        <span>{total.toFixed(2)}</span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
