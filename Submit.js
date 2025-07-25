import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { sendAdminMail } from './Mailsend.js';
import { generateWebsite } from './generateWebsite.js';
import { sendWebsiteLink } from './linksender.js';

const form = document.getElementById("inquiryForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const brand = document.getElementById("brand").value;
  const style = document.getElementById("style").value;
  const colors = document.getElementById("colors").value;
  const type = document.getElementById("type").value;

  const requestData = {
    name,
    email,
    phone,
    brand,
    style,
    colors,
    type,
    status: "requested",
    createdAt: new Date()
  };

  try {
    // 1. Save inquiry to Firestore
    await addDoc(collection(db, "inquiries"), requestData);

    // 2. Send admin email notification
    await sendAdminMail(requestData);

    // 3. Generate mock website link
    const siteLink = await generateWebsite(requestData);

    // 4. Send website link to customer
    await sendWebsiteLink(email, name, siteLink);

    // 5. Redirect to confirmation page
    window.location.href = "RequestReceived.html";
  } catch (err) {
    console.error("❌ Something went wrong:", err);
    alert("Something went wrong. Please try again.");
  }
});