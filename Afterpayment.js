import emailjs from 'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js';
import { db } from './firebase.js';
import { collection, query, where, getDocs, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { generateWebsite } from './generateWebsite.js';
import { sendLinkToCustomer } from './linkSender.js';

const websiteLink = await generateWebsite({ brandName, websiteType, color, style });
await sendLinkToCustomer(customerName, customerEmail, websiteLink);

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("payment_id");
  const customerEmail = localStorage.getItem("email");
  const customerName = localStorage.getItem("name");

  if (!paymentId || !customerEmail) {
    document.getElementById("status").innerText = "❌ Payment details missing.";
    return;
  }

  document.getElementById("status").innerText = "✅ Payment received! Preparing your website...";

  try {
    // 1. Send website link via email
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_name: customerName,
        to_email: customerEmail,
        message: `Thanks for your payment! Your website will be ready shortly.\nDownload: https://yourdomain.com/templates/auto-template.zip`
      }
    );

    // 2. Optional: Update Firestore status
    const q = query(collection(db, "inquiries"), where("email", "==", customerEmail));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (docRef) => {
      await updateDoc(docRef.ref, {
        status: "delivered",
        paymentId: paymentId
      });
    });

    // 3. Auto-download ZIP (optional)
    const link = document.createElement('a');
    link.href = "/templates/auto-template.zip";
    link.download = "website.zip";
    link.click();

    document.getElementById("status").innerText = "🚀 Website delivered & email sent!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Error delivering website.";
  }
});