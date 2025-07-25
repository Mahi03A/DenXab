import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import { storage } from './firebase.js';  // your initialized storage

export async function generateWebsite(data) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${data.brandName} - ${data.websiteType}</title>
    </head>
    <body style="background-color: black; color: ${data.color}; text-align: center;">
      <h1>Welcome to ${data.brandName}</h1>
      <p>This is a ${data.websiteType} website styled in ${data.style} format.</p>
    </body>
    </html>
  `;

  // Convert to Blob
  const blob = new Blob([htmlTemplate], { type: 'text/html' });

  // Create a unique file name
  const fileName = `${data.brandName}_${Date.now()}.html`;
  const fileRef = ref(storage, `generatedSites/${fileName}`);

  // Upload the file
  await uploadBytes(fileRef, blob);

  // Get public URL
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}