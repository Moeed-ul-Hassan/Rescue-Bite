import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // 'restaurant', 'ngo', 'admin'
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
});

export const foodListings = pgTable("food_listings", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id").notNull(),
  foodType: text("food_type").notNull(),
  quantity: text("quantity").notNull(),
  expiryTime: timestamp("expiry_time").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  status: text("status").notNull(), // 'available', 'requested', 'completed'
});

export const foodRequests = pgTable("food_requests", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  ngoId: integer("ngo_id").notNull(),
  status: text("status").notNull(), // 'pending', 'accepted', 'completed', 'rejected'
  requestedAt: timestamp("requested_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["restaurant", "ngo", "admin"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
});

export const insertFoodListingSchema = createInsertSchema(foodListings);
export const insertFoodRequestSchema = createInsertSchema(foodRequests);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type FoodListing = typeof foodListings.$inferSelect;
export type InsertFoodListing = typeof foodListings.$inferInsert;
export type FoodRequest = typeof foodRequests.$inferSelect;
export type InsertFoodRequest = typeof foodRequests.$inferInsert;
