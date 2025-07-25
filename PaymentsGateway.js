export function initiatePayment(name, email, amount, orderId) {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount * 100, // Convert ₹ to paisa
    currency: "INR",
    name: "AB Tech",
    description: "Website Template Payment",
    handler: function (response) {
      window.location.href = "thankyou.html?payment_id=" + response.razorpay_payment_id;
    },
    prefill: {
      name: name,
      email: email
    },
    theme: {
      color: "#00ff00"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}