import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy route for fetching doctors data since we need to handle CORS
  app.get('/api/doctors', async (req, res) => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors data');
      }
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return res.status(500).json({ error: 'Failed to fetch doctors data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
