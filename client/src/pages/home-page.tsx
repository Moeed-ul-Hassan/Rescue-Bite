import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  Heart, 
  Clock, 
  Store, 
  Building2,
  ArrowRight,
  LogOut 
} from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Food Rescue</span>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href={`/${user.userType}`}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login / Register</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 font-heading">
          Fight Hunger, Reduce Waste
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connecting restaurants with NGOs to save food and lives. Join our mission
          to create a more sustainable and compassionate world.
        </p>
        {!user && (
          <div className="flex gap-4 justify-center">
            <Link href="/auth?type=restaurant">
              <Button size="lg">
                Register as Restaurant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth?type=ngo">
              <Button size="lg" variant="outline">
                Register as NGO
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">1,234</h3>
              <p className="text-muted-foreground">Meals Saved</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">56</h3>
              <p className="text-muted-foreground">Partner Restaurants</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">23</h3>
              <p className="text-muted-foreground">NGO Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 font-heading">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Store className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Restaurants List Food</h3>
            <p className="text-muted-foreground">
              Upload excess food details and make it available for NGOs.
            </p>
          </div>
          <div className="text-center">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">NGOs Request Food</h3>
            <p className="text-muted-foreground">
              Browse available listings and request food based on needs.
            </p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Quick Delivery</h3>
            <p className="text-muted-foreground">
              Coordinate pickup times and deliver food to those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Food Rescue</span>
          </div>
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Food Rescue. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
