import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Users, Package, Clock } from "lucide-react";
import { format } from "date-fns";
import type { User, FoodListing, FoodRequest } from "@shared/schema";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: listings, isLoading: listingsLoading } = useQuery<FoodListing[]>({
    queryKey: ["/api/listings"],
  });

  const { data: requests, isLoading: requestsLoading } = useQuery<FoodRequest[]>({
    queryKey: ["/api/requests"],
  });

  if (!user || user.userType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Unauthorized access</p>
      </div>
    );
  }

  const restaurants = users?.filter((u) => u.userType === "restaurant") || [];
  const ngos = users?.filter((u) => u.userType === "ngo") || [];

  const statsData = [
    {
      name: "Total Listings",
      value: listings?.length || 0,
    },
    {
      name: "Active Listings",
      value: listings?.filter((l) => l.status === "available").length || 0,
    },
    {
      name: "Completed Donations",
      value: requests?.filter((r) => r.status === "completed").length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Export Data
            </Button>
            <Button size="sm">Generate Report</Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Registered Restaurants
                  </p>
                  <p className="text-2xl font-bold">{restaurants.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Registered NGOs
                  </p>
                  <p className="text-2xl font-bold">{ngos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Food Rescued
                  </p>
                  <p className="text-2xl font-bold">
                    {requests?.filter((r) => r.status === "completed").length || 0}{" "}
                    meals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>Overview of platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>
              Overview of all registered restaurants and NGOs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="capitalize">{user.userType}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest food listings and requests</CardDescription>
          </CardHeader>
          <CardContent>
            {listingsLoading || requestsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings?.map((listing) => (
                    <TableRow key={`listing-${listing.id}`}>
                      <TableCell>Listing</TableCell>
                      <TableCell>
                        {listing.foodType} - {listing.quantity}
                      </TableCell>
                      <TableCell className="capitalize">{listing.status}</TableCell>
                      <TableCell>
                        {format(new Date(listing.expiryTime), "PPp")}
                      </TableCell>
                    </TableRow>
                  ))}
                  {requests?.map((request) => (
                    <TableRow key={`request-${request.id}`}>
                      <TableCell>Request</TableCell>
                      <TableCell>Request #{request.id}</TableCell>
                      <TableCell className="capitalize">{request.status}</TableCell>
                      <TableCell>
                        {format(new Date(request.requestedAt), "PPp")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
