
import { Link } from "wouter";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
        <p className="mb-4">We collect personal information including name, email, phone number, and national ID for verification purposes.</p>
        
        <h2 className="text-2xl font-semibold mb-4">2. Data Usage</h2>
        <p className="mb-4">Your data is used to facilitate food rescue operations and ensure platform security.</p>
        
        <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
        <p className="mb-4">We implement security measures to protect your personal information from unauthorized access.</p>
        
        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
        <p className="mb-4">We only share your information with other users as necessary for platform functionality.</p>
        
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">You have the right to access, correct, or delete your personal information.</p>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}
