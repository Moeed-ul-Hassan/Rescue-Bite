import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  Heart, 
  Clock, 
  Store, 
  Building2,
  ArrowRight,
  LogOut,
  UtensilsCrossed,
  Users
} from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">Food Rescue</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href={`/${user.userType}`}>
                  <Button variant="ghost" className="font-medium">Dashboard</Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => logoutMutation.mutate()}
                  className="font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="font-medium">Login / Register</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              Fight Food Waste, Feed Hope
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect restaurants with excess food to NGOs, creating a sustainable solution 
              for food waste while helping those in need. Join our mission to build a 
              better, more compassionate world.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?type=restaurant">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join as Restaurant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth?type=ngo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Join as NGO
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <UtensilsCrossed className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-4xl font-bold">1,234</h3>
              </div>
              <p className="text-lg text-muted-foreground">Meals Rescued</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <Store className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-4xl font-bold">56</h3>
              </div>
              <p className="text-lg text-muted-foreground">Partner Restaurants</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-4xl font-bold">23</h3>
              </div>
              <p className="text-lg text-muted-foreground">NGO Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">
          How Food Rescue Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6 transition-transform group-hover:rotate-3" />
              <div className="relative bg-white p-6 rounded-full border shadow-sm">
                <Store className="h-12 w-12 text-primary mx-auto" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">List Excess Food</h3>
            <p className="text-muted-foreground leading-relaxed">
              Restaurants can easily list their surplus food, specifying type, 
              quantity, and pickup details.
            </p>
          </div>
          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6 transition-transform group-hover:rotate-3" />
              <div className="relative bg-white p-6 rounded-full border shadow-sm">
                <Building2 className="h-12 w-12 text-primary mx-auto" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">NGOs Make Requests</h3>
            <p className="text-muted-foreground leading-relaxed">
              NGOs can browse available listings and request food based on their 
              community's needs.
            </p>
          </div>
          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6 transition-transform group-hover:rotate-3" />
              <div className="relative bg-white p-6 rounded-full border shadow-sm">
                <Clock className="h-12 w-12 text-primary mx-auto" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Quick Coordination</h3>
            <p className="text-muted-foreground leading-relaxed">
              Coordinate pickup times efficiently to ensure food reaches those who 
              need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Food Rescue</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Food Rescue. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}