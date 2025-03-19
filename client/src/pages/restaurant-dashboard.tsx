import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertFoodListingSchema, type FoodListing } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function RestaurantDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertFoodListingSchema),
    defaultValues: {
      foodType: "",
      quantity: "",
      expiryTime: "",
      pickupLocation: "",
    },
  });

  const { data: listings, isLoading } = useQuery<FoodListing[]>({
    queryKey: ["/api/listings"],
  });

  const createListingMutation = useMutation({
    mutationFn: async (data: FoodListing) => {
      const res = await apiRequest("POST", "/api/listings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/listings"] });
      form.reset();
      toast({
        title: "Success",
        description: "Food listing created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
          <p className="text-gray-600">Manage your food listings and requests</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => form.reset()}>
            Clear Form
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Listing Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create Food Listing</CardTitle>
              <CardDescription>
                List excess food for NGOs to request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    createListingMutation.mutate({
                      ...data,
                      restaurantId: user.id,
                      status: "available",
                    } as FoodListing)
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="foodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Cooked meals, Bread" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10 portions, 5kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Time</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pickup address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={createListingMutation.isPending}
                  >
                    {createListingMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Create Listing
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Active Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
              <CardDescription>
                Manage your current food listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : listings && listings.length > 0 ? (
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{listing.foodType}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {listing.quantity}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires:{" "}
                              {format(new Date(listing.expiryTime), "PPp")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Status: {listing.status}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No active listings
                </p>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}