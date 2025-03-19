
import { Link } from "wouter";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
      
      <div className="prose prose-lg">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using Rescue Bite, you agree to be bound by these Terms and Conditions.</p>
        
        <h2 className="text-2xl font-semibold mb-4">2. User Registration</h2>
        <p className="mb-4">Users must provide accurate information during registration, including valid identification when required.</p>
        
        <h2 className="text-2xl font-semibold mb-4">3. Food Safety</h2>
        <p className="mb-4">Restaurants must ensure all donated food meets safety standards. NGOs must handle food according to safety guidelines.</p>
        
        <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
        <p className="mb-4">Users agree to use the platform responsibly and not engage in any fraudulent or harmful activities.</p>
        
        <h2 className="text-2xl font-semibold mb-4">5. Liability</h2>
        <p className="mb-4">Rescue Bite is not liable for any issues arising from food quality or delivery problems between parties.</p>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}
