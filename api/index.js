// Vercel serverless function to handle API and frontend requests
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

// Import API route handlers
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
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

// Serve static files from the build directory
const distPath = path.join(process.cwd(), 'dist/public');
app.use(express.static(distPath));

// For all other routes, serve the index.html
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Create HTTP server
const server = createServer(app);

// Start server if not being imported
if (require.main === module) {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for serverless
export default app; 