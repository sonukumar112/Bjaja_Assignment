// Minimal serverless function for Vercel
import express from 'express';

// Create Express app
const app = express();
app.use(express.json());

// Add CORS headers for API requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// API endpoint for doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    if (!response.ok) {
      throw new Error("Failed to fetch doctors data");
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: "Failed to fetch doctors data" });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Export the Express handler
export default app; 