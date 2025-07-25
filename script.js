import { db } from './firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { sendMail } from './notification.js'; // You already made this function

const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: 19900, // ₹199
    currency: "INR",
    name: "AB Tech",
    description: "AB AutoPilot Website Order",
    handler: async function (response) {
      try {
        await addDoc(collection(db, "orders"), {
          name,
          email,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          createdAt: new Date()
        });

        // ✅ Send email via EmailJS
        sendMail(name, email);

        // ✅ Redirect
        window.location.href = "/thankyou.html";
      } catch (err) {
        console.error("Error in payment handler:", err);
      }
    },
    prefill: {
      name,
      email
    },
    theme: {
      color: "#00ff00"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});