import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertFoodListingSchema, insertFoodRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Food Listings Routes
  app.post("/api/listings", async (req, res) => {
    if (!req.isAuthenticated() || req.user.userType !== "restaurant") {
      return res.status(403).send("Only restaurants can create listings");
    }

    try {
      const validated = insertFoodListingSchema.parse({
        ...req.body,
        restaurantId: req.user.id,
        status: "available"
      });
      const listing = await storage.createFoodListing(validated);
      res.status(201).json(listing);
    } catch (error) {
      res.status(400).json({ error: "Invalid listing data" });
    }
  });

  app.get("/api/listings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    if (req.user.userType === "restaurant") {
      const listings = await storage.getFoodListingsByRestaurant(req.user.id);
      res.json(listings);
    } else {
      const listings = await storage.getAvailableFoodListings();
      res.json(listings);
    }
  });

  // Food Requests Routes
  app.post("/api/requests", async (req, res) => {
    if (!req.isAuthenticated() || req.user.userType !== "ngo") {
      return res.status(403).send("Only NGOs can create requests");
    }

    try {
      const validated = insertFoodRequestSchema.parse({
        ...req.body,
        ngoId: req.user.id,
        status: "pending",
        requestedAt: new Date()
      });
      const request = await storage.createFoodRequest(validated);
      await storage.updateFoodListingStatus(validated.listingId, "requested");
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/requests", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    if (req.user.userType === "ngo") {
      const requests = await storage.getFoodRequestsByNgo(req.user.id);
      res.json(requests);
    } else if (req.user.userType === "restaurant") {
      const listings = await storage.getFoodListingsByRestaurant(req.user.id);
      const requests = [];
      for (const listing of listings) {
        const listingRequests = await storage.getFoodRequestsByListing(listing.id);
        requests.push(...listingRequests);
      }
      res.json(requests);
    }
  });

  // Update request status
  app.patch("/api/requests/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const { status } = req.body;
    if (!status || !["accepted", "completed", "rejected"].includes(status)) {
      return res.status(400).send("Invalid status");
    }

    try {
      const request = await storage.updateFoodRequestStatus(
        parseInt(req.params.id),
        status
      );
      res.json(request);
    } catch (error) {
      res.status(404).json({ error: "Request not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
