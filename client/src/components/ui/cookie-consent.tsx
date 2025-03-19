import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "./button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set(COOKIE_CONSENT_KEY, "true", { expires: 365 });
    setShowBanner(false);
  };

  const declineCookies = () => {
    Cookies.set(COOKIE_CONSENT_KEY, "false", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:p-6 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Cookie Settings</h3>
          <p className="text-muted-foreground">
            We use cookies to enhance your experience and analyze our website traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={declineCookies}
            className="min-w-[100px]"
          >
            Decline
          </Button>
          <Button
            onClick={acceptCookies}
            className="min-w-[100px]"
          >
            Accept
          </Button>
        </div>
        <button
          onClick={declineCookies}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
