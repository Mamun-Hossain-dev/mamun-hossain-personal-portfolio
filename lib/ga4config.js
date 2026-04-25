"use client";

// GA4 Configuration
export const GA4Config = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  // Service account credentials will be used server-side
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY,
  },
  propertyId: process.env.GA_PROPERTY_ID, // This will be the numeric ID of your GA4 property
};

// Helper function to check if GA4 is properly configured
export const isGA4Configured = () => {
  return !!(
    GA4Config.measurementId &&
    GA4Config.credentials.client_email &&
    GA4Config.credentials.private_key &&
    GA4Config.propertyId
  );
};

// Function to format date for GA4 queries
export const formatGADate = (date) => {
  return date.toISOString().split("T")[0];
};

// Get date range for last N days
export const getDateRange = (days) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return {
    startDate: formatGADate(startDate),
    endDate: formatGADate(endDate),
  };
};
