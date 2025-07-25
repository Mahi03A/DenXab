import emailjs from 'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js';

export async function sendLinkToCustomer(name, email, websiteLink) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_name: name,
      to_email: email,
      message: `Your website is ready! 🎉\n\n🔗 Link: ${websiteLink}\nThank you for choosing AB Tech!`
    }
  );
}