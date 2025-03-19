import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Heart, 
  Clock, 
  Store, 
  Building2,
  ArrowRight,
  LogOut,
  UtensilsCrossed,
  Users,
  CheckCircle,
  MapPin,
  Phone
} from "lucide-react";
import "../styles/animations.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const impactRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Stats animation
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top center",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8
    });

    // Features animation
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top center",
      },
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1
    });

    // Impact stories animation
    gsap.from(".impact-card", {
      scrollTrigger: {
        trigger: impactRef.current,
        start: "top center",
      },
      opacity: 0,
      x: -30,
      stagger: 0.3,
      duration: 0.8
    });

    // CTA animation
    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top center",
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8
    });
  }, []);

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
      <section ref={heroRef} className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Fight Food Waste, Feed Hope
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Connect restaurants with excess food to NGOs, creating a sustainable solution 
              for food waste while helping those in need. Join our mission to build a 
              better, more compassionate world.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?type=restaurant">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                    Join as Restaurant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth?type=ngo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
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
      <section ref={statsRef} className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                <UtensilsCrossed className="h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="text-5xl font-bold">1,234</h3>
              </div>
              <p className="text-xl text-muted-foreground">Meals Rescued</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                <Store className="h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="text-5xl font-bold">56</h3>
              </div>
              <p className="text-xl text-muted-foreground">Partner Restaurants</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="text-5xl font-bold">23</h3>
              </div>
              <p className="text-xl text-muted-foreground">NGO Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="feature-card p-8 rounded-xl bg-muted/30">
              <Store className="h-16 w-16 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4">Restaurant Dashboard</h3>
              <p className="text-muted-foreground leading-relaxed">
                Easy-to-use interface for restaurants to list surplus food and manage donations.
              </p>
            </div>
            <div className="feature-card p-8 rounded-xl bg-muted/30">
              <MapPin className="h-16 w-16 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4">Location Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Smart matching system to connect nearby restaurants with NGOs.
              </p>
            </div>
            <div className="feature-card p-8 rounded-xl bg-muted/30">
              <Phone className="h-16 w-16 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4">Real-time Updates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instant notifications for food availability and pickup coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section ref={impactRef} className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Impact Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="impact-card bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Store className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Fresh Bites Restaurant</h3>
                  <p className="text-muted-foreground">
                    "We've reduced our food waste by 75% and helped feed over 500 people 
                    in our community through Food Rescue."
                  </p>
                </div>
              </div>
            </div>
            <div className="impact-card bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Building2 className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Hope Foundation NGO</h3>
                  <p className="text-muted-foreground">
                    "Food Rescue has helped us serve 200% more meals to families in need 
                    while saving on food costs."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="cta-gradient text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Movement Today</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Whether you're a restaurant with surplus food or an NGO serving the community, 
            be part of the solution to reduce food waste and hunger.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?type=restaurant">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                  Register Your Restaurant
                </Button>
              </Link>
              <Link href="/auth?type=ngo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Register Your NGO
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A1E] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="font-bold text-xl">Food Rescue</span>
              </div>
              <p className="text-white/70">
                Building a more sustainable and compassionate world through food rescue.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-white/70">
                <li>info@foodrescue.org</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Social</h3>
              <div className="flex gap-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
            <p>© {new Date().getFullYear()} Food Rescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}