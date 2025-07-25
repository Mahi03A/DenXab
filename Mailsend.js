import emailjs from 'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js';

export async function sendAdminMail(data) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const mailData = {
    from_name: "DenXAB Inquiry Bot",
    to_name: "AB Tech",
    message: `
    🔔 New Inquiry Received:
    👤 Name: ${data.name}
    📧 Email: ${data.email}
    📞 Phone: ${data.phone}
    🏷 Brand: ${data.brand}
    🎨 Style: ${data.style}
    🌈 Colors: ${data.colors}
    🌐 Website Type: ${data.type}
    `
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    mailData
  );
}