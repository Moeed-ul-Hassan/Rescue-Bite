
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Loader2, Users, Package, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function AdminDashboard() {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/users");
      return res.json();
    },
  });

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ["/api/listings"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/listings");
      return res.json();
    },
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ["/api/requests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/requests");
      return res.json();
    },
  });

  const statsData = [
    {
      name: "Total Users",
      value: users?.length || 0,
      icon: Users,
    },
    {
      name: "Active Listings",
      value: listings?.filter((l) => l.status === "available").length || 0,
      icon: Package,
    },
    {
      name: "Completed Donations",
      value: requests?.filter((r) => r.status === "completed").length || 0,
      icon: CheckCircle,
    },
    {
      name: "Success Rate",
      value: `${Math.round((requests?.filter((r) => r.status === "completed").length || 0) / (requests?.length || 1) * 100)}%`,
      icon: TrendingUp,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="activity">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
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
                      {listings?.slice(0, 5).map((listing) => (
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
                      {requests?.slice(0, 5).map((request) => (
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
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users</CardDescription>
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
                        <TableHead>Contact</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users?.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell className="capitalize">{user.userType}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Low pickup rate in North Region</p>
                      <p className="text-sm text-muted-foreground">
                        Consider reaching out to more NGOs in this area
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
