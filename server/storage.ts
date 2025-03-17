import { User, InsertUser, FoodListing, InsertFoodListing, FoodRequest, InsertFoodRequest } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Food listing operations
  createFoodListing(listing: InsertFoodListing): Promise<FoodListing>;
  getFoodListing(id: number): Promise<FoodListing | undefined>;
  getFoodListingsByRestaurant(restaurantId: number): Promise<FoodListing[]>;
  getAvailableFoodListings(): Promise<FoodListing[]>;
  updateFoodListingStatus(id: number, status: string): Promise<FoodListing>;
  
  // Food request operations
  createFoodRequest(request: InsertFoodRequest): Promise<FoodRequest>;
  getFoodRequestsByNgo(ngoId: number): Promise<FoodRequest[]>;
  getFoodRequestsByListing(listingId: number): Promise<FoodRequest[]>;
  updateFoodRequestStatus(id: number, status: string): Promise<FoodRequest>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foodListings: Map<number, FoodListing>;
  private foodRequests: Map<number, FoodRequest>;
  sessionStore: session.Store;
  private currentUserId: number;
  private currentListingId: number;
  private currentRequestId: number;

  constructor() {
    this.users = new Map();
    this.foodListings = new Map();
    this.foodRequests = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.currentUserId = 1;
    this.currentListingId = 1;
    this.currentRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFoodListing(listing: InsertFoodListing): Promise<FoodListing> {
    const id = this.currentListingId++;
    const newListing: FoodListing = { ...listing, id };
    this.foodListings.set(id, newListing);
    return newListing;
  }

  async getFoodListing(id: number): Promise<FoodListing | undefined> {
    return this.foodListings.get(id);
  }

  async getFoodListingsByRestaurant(restaurantId: number): Promise<FoodListing[]> {
    return Array.from(this.foodListings.values()).filter(
      (listing) => listing.restaurantId === restaurantId,
    );
  }

  async getAvailableFoodListings(): Promise<FoodListing[]> {
    return Array.from(this.foodListings.values()).filter(
      (listing) => listing.status === 'available',
    );
  }

  async updateFoodListingStatus(id: number, status: string): Promise<FoodListing> {
    const listing = this.foodListings.get(id);
    if (!listing) throw new Error('Listing not found');
    const updatedListing = { ...listing, status };
    this.foodListings.set(id, updatedListing);
    return updatedListing;
  }

  async createFoodRequest(request: InsertFoodRequest): Promise<FoodRequest> {
    const id = this.currentRequestId++;
    const newRequest: FoodRequest = { ...request, id };
    this.foodRequests.set(id, newRequest);
    return newRequest;
  }

  async getFoodRequestsByNgo(ngoId: number): Promise<FoodRequest[]> {
    return Array.from(this.foodRequests.values()).filter(
      (request) => request.ngoId === ngoId,
    );
  }

  async getFoodRequestsByListing(listingId: number): Promise<FoodRequest[]> {
    return Array.from(this.foodRequests.values()).filter(
      (request) => request.listingId === listingId,
    );
  }

  async updateFoodRequestStatus(id: number, status: string): Promise<FoodRequest> {
    const request = this.foodRequests.get(id);
    if (!request) throw new Error('Request not found');
    const updatedRequest = { ...request, status };
    this.foodRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();
