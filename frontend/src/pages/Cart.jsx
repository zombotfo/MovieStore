import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

export default function Cart({ cart, removeFromCart, clearCart }) {

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [slip, setSlip] = useState(null);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // 🎟️ ใช้คูปอง
  const applyCoupon = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/coupons/${coupon}` // ✅ แก้ตรงนี้
      );

      setDiscount(res.data.discount);
      alert("Coupon applied! 🎉");
    } catch {
      alert("Invalid coupon ❌");
    }
  };

  // 💰 คำนวณราคา
  const finalPrice =
    discount < 1
      ? totalPrice - totalPrice * discount
      : totalPrice - discount;
  // 📸 อัปโหลดสลิป
  const handleFileChange = (e) => {
    setSlip(e.target.files[0]);
  };
  // 📸 อัปโหลดสลิป
  const handleCheckout = async () => {
  if (!slip) {
    alert("Please upload payment slip first!");
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post(`${API_URL}/orders`, {
      userId: user._id,  // 🔥 ใครซื้อ
      items: cart,       // 🔥 ซื้ออะไร
      total: finalPrice  // 🔥 ราคา
    });

    alert("Payment successful 🎉");

    clearCart();
    setCoupon("");
    setDiscount(0);
    setSlip(null);

    } catch (err) {
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={{ maxWidth: "600px",
      margin: "50px auto",
      background: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)"}}>
      <h1 style={{ color: "black" }}>Cart Page</h1>

      {cart.map((item, index) => (
        <div style={{color: "black"}} key={index}>
          {item.title} - ${item.price}
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <hr />

      <h3 style={{color: "black"}}>Total: ${totalPrice}</h3>

      {/* 🎟️ คูปอง */}
      <div style={{ margin: "20px 0" ,background: "#f5f7fa"}}>
        <input
          type="text"
          placeholder="Enter coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon}>Apply</button>
      </div>

      <h2 style={{color: "black"}}>Final: ${finalPrice}</h2>

      {/* 📱 QR Code จำลอง */}
      <div style={{ margin: "20px 0" ,background: "#f5f7fa"}}>
        <h3 style={{color: "black"}}>Scan to Pay</h3>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT-DEMO"
          alt="QR Code"
        />
      </div>

      {/* 📸 อัปโหลดสลิป */}
      <div style={{ margin: "20px 0" ,background: "#f5f7fa"}}>
        <input type="file" onChange={handleFileChange} />
      </div>

      {slip && <p style={{color: "black"}}>Uploaded: {slip.name}</p>}

      {/* 💳 ปุ่มชำระเงิน */}
      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Pay Now
      </button>
    </div>
  );
}