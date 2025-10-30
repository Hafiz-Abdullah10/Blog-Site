import ImageKit from 'imagekit';

// Initialize ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Optional: verify configuration (useful for debugging)
if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
  console.warn("⚠️ Missing ImageKit environment variables. Check your .env or Vercel settings.");
}

export default imagekit;
