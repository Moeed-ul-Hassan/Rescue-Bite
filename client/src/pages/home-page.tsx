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
  Phone,
  Calendar,
  Newspaper,
  HandHeart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import "../styles/animations.css";
import { CookieConsent } from "@/components/ui/cookie-consent";

gsap.registerPlugin(ScrollTrigger);

// Show scroll markers in development
ScrollTrigger.defaults({
  markers: process.env.NODE_ENV === "development"
});

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const impactRef = useRef(null);
  const eventsRef = useRef(null);
  const partnersRef = useRef(null);
  const ctaRef = useRef(null);
  const socialMediaRef = useRef(null); // Added ref for social media section

  useEffect(() => {
    // Debug logs to verify refs
    console.log("Refs check:", {
      hero: heroRef.current,
      stats: statsRef.current,
      features: featuresRef.current,
      impact: impactRef.current,
      events: eventsRef.current,
      partners: partnersRef.current,
      cta: ctaRef.current
    });

    const animations = [];

    // Hero animation
    if (heroRef.current) {
      const heroAnim = gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
        onStart: () => console.log("Hero animation started"),
        onComplete: () => console.log("Hero animation completed")
      });
      animations.push(heroAnim);
    }

    // Stats animation with counter effect
    const statElements = document.querySelectorAll('.stat-card');
    console.log("Found stat cards:", statElements.length);
    statElements.forEach((card, index) => {
      const numberElement = card.querySelector('.stat-number');
      const targetNumber = parseInt(numberElement?.textContent || "0", 10);

      const cardAnim = gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          onEnter: () => console.log(`Stat card ${index} animation triggered`),
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          // Animate number counting up
          gsap.to(numberElement, {
            textContent: targetNumber,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            onUpdate: () => console.log(`Updating number: ${numberElement?.textContent}`),
          });
        }
      });
      animations.push(cardAnim);
    });

    // Features animation
    const featureCards = document.querySelectorAll('.feature-card');
    console.log("Found feature cards:", featureCards.length);
    const featuresAnim = gsap.from(featureCards, {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 70%",
        onEnter: () => console.log("Features animation triggered")
      },
      opacity: 0,
      y: 100,
      scale: 0.8,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.2)"
    });
    animations.push(featuresAnim);

    // Impact stories animation
    if (impactRef.current) {
      const impactCards = document.querySelectorAll('.impact-card');
      console.log("Found impact cards:", impactCards.length);
      const impactAnim = gsap.from(impactCards, {
        scrollTrigger: {
          trigger: impactRef.current,
          start: "top 70%",
          onEnter: () => console.log("Impact animation triggered"),
        },
        x: -100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out"
      });
      animations.push(impactAnim);
    }

    // Return cleanup function
    return () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Kill all animations
      animations.forEach(anim => anim.kill());
    };
  }, []); // Empty dependency array since we want this to run once

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
                <h3 className="text-5xl font-bold stat-number">1,234</h3>
              </div>
              <p className="text-xl text-muted-foreground">Meals Rescued</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                <Store className="h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="text-5xl font-bold stat-number">56</h3>
              </div>
              <p className="text-xl text-muted-foreground">Partner Restaurants</p>
            </div>
            <div className="stat-card bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="text-5xl font-bold stat-number">23</h3>
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

      {/* Events & News Section */}
      <section ref={eventsRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="event-card bg-muted/30 rounded-xl p-8">
              <Calendar className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Food Drive</h3>
              <p className="text-muted-foreground mb-4">Join us this weekend for our biggest food rescue event of the year.</p>
              <Link href="/events">
                <Button variant="link" className="p-0">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="event-card bg-muted/30 rounded-xl p-8">
              <Newspaper className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">1000th Meal Rescued!</h3>
              <p className="text-muted-foreground mb-4">We've hit a major milestone in our mission to reduce food waste.</p>
              <Link href="/news">
                <Button variant="link" className="p-0">
                  Read Story <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="event-card bg-muted/30 rounded-xl p-8">
              <HandHeart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">New Partnerships</h3>
              <p className="text-muted-foreground mb-4">Five new restaurants have joined our network this month.</p>
              <Link href="/partners">
                <Button variant="link" className="p-0">
                  View Partners <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
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

      {/* Partners Section */}
      <section ref={partnersRef} className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ( // Added one more partner logo
              <div key={i} className="partner-logo aspect-square bg-white rounded-xl p-8 flex items-center justify-center shadow-sm border hover:shadow-md transition-shadow duration-300 ease-in-out"> {/* Added hover animation */}
                <img src={`/logos/partner-${i}.png`} alt={`Partner ${i}`} className="w-24 h-auto" /> {/* Replaced placeholder with image */}
              </div>
            ))}
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

      {/* Social Media Integration */}
      <section ref={socialMediaRef} className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 justify-center">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>


      {/* Enhanced Footer */}
      <footer className="bg-[#1E3A1E] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-8 w-8" />
                <span className="font-bold text-2xl">Food Rescue</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Building a more sustainable and compassionate world through food rescue.
                Together, we can make a difference in our community.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/how-it-works">How It Works</Link></li>
                <li><Link href="/impact">Our Impact</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Get Involved</h3>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/volunteer">Volunteer</Link></li>
                <li><Link href="/donate">Donate</Link></li>
                <li><Link href="/partners">Partner With Us</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Connect With Us</h3>
              <div className="space-y-4">
                <p className="text-white/70">Sign up for our newsletter:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
                  />
                  <Button className="bg-white text-[#1E3A1E] hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
                <div className="flex gap-4 mt-6">
                  <a href="#" className="text-white/70 hover:text-white">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
            <p>© {new Date().getFullYear()} Food Rescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}