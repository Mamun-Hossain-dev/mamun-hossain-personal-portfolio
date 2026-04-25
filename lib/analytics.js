// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
};

// Track page views
export const pageview = (url) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Get user location data
export const getUserLocation = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    // Try to get location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        () => {
          resolve(null);
        }
      );
    } else {
      resolve(null);
    }
  });
};

// Track user behavior
export const trackUserBehavior = (behavior) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.gtag("event", "user_behavior", {
    ...behavior,
    timestamp: new Date().toISOString(),
  });
};

// Track session duration
export const startSessionTimer = () => {
  if (typeof window === "undefined") return;
  window.sessionStartTime = new Date();
};

export const endSessionTimer = () => {
  if (typeof window === "undefined" || !window.sessionStartTime) return;
  const duration = new Date() - window.sessionStartTime;
  trackUserBehavior({
    action: "session_duration",
    duration_seconds: Math.floor(duration / 1000),
  });
};

// Track device info
export const getDeviceInfo = () => {
  if (typeof window === "undefined") return null;

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const screenSize = {
    width: window.screen.width,
    height: window.screen.height,
  };

  return {
    userAgent,
    platform,
    screenSize,
    isMobile: /Mobile|Android|iPhone/i.test(userAgent),
    isTablet: /Tablet|iPad/i.test(userAgent),
    isDesktop: !/Mobile|Android|iPhone|Tablet|iPad/i.test(userAgent),
  };
};
