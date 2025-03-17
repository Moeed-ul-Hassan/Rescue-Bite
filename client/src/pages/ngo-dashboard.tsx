import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { FoodListing, FoodRequest } from "@shared/schema";

export default function NgoDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: availableListings, isLoading: listingsLoading } = useQuery<
    FoodListing[]
  >({
    queryKey: ["/api/listings"],
  });

  const { data: requests, isLoading: requestsLoading } = useQuery<FoodRequest[]>({
    queryKey: ["/api/requests"],
  });

  const createRequestMutation = useMutation({
    mutationFn: async (listingId: number) => {
      const res = await apiRequest("POST", "/api/requests", { listingId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/listings"] });
      toast({
        title: "Success",
        description: "Food request sent successfully",
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">NGO Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Available Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Available Food</CardTitle>
              <CardDescription>
                Browse and request available food donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {listingsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : availableListings && availableListings.length > 0 ? (
                <div className="space-y-4">
                  {availableListings
                    .filter((listing) => listing.status === "available")
                    .map((listing) => (
                      <Card key={listing.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">
                                {listing.foodType}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {listing.quantity}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires:{" "}
                                {format(new Date(listing.expiryTime), "PPp")}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Pickup: {listing.pickupLocation}
                              </p>
                            </div>
                            <Button
                              onClick={() =>
                                createRequestMutation.mutate(listing.id)
                              }
                              disabled={createRequestMutation.isPending}
                            >
                              {createRequestMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Request"
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No available food listings
                </p>
              )}
            </CardContent>
          </Card>

          {/* Request History */}
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>Track your food requests</CardDescription>
            </CardHeader>
            <CardContent>
              {requestsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : requests && requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div>
                          <p className="font-semibold">
                            Request #{request.id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Status: {request.status}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Requested:{" "}
                            {format(new Date(request.requestedAt), "PPp")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No request history
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
