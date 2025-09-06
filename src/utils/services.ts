// utils/services.ts
export const serviceTypes = [
  {
    id: "car-detailing",
    name: "Car Detailing",
    description: "Professional detailing services for your vehicle",
    packages: [
      { id: "basic-wash", name: "Basic Wash Package", price: "$150", description: "Exterior hand wash, tire dressing, basic rim cleaning, window cleaning" },
      { id: "premium-exterior", name: "Premium Exterior Package", price: "$190", description: "Basic + clay bar treatment, hand wax, wheel well cleaning, trim treatment" },
      { id: "basic-interior", name: "Basic Interior Package", price: "$170", description: "Complete vacuuming, dashboard/console cleaning, door panels, basic mat cleaning" },
      { id: "premium-interior", name: "Premium Interior Package", price: "$220", description: "Basic + leather/vinyl conditioning, carpet shampooing, headliner cleaning, odor elimination" },
      { id: "full-basic", name: "Full Basic Detail", price: "$220", description: "Basic Exterior + Basic Interior" },
      { id: "full-premium", name: "Full Premium Detail", price: "$299", description: "Premium Exterior + Premium Interior + Engine bay cleaning, Interior UV protectant" }
    ],
  },
  {
    id: "window-tinting",
    name: "Window Tinting",
    description: "Professional window tinting services",
    packages: [
      { id: "basic-tint", name: "Basic Tint Package", price: "$199", description: "Standard tint for all side windows" },
      { id: "premium-tint", name: "Premium Tint Package", price: "$299", description: "Premium ceramic tint for all side windows" },
      { id: "full-tint", name: "Full Vehicle Tint", price: "$399", description: "Premium tint for all windows including windshield strip" },
    ],
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Long-lasting protection for your vehicle",
    packages: [
      { id: "basic-ceramic", name: "Basic Ceramic Package", price: "$400", description: "6-month ceramic coating application" },
      { id: "premium-ceramic", name: "Premium Ceramic Package", price: "$700", description: "1-year ceramic coating with paint correction" },
      { id: "elite-ceramic", name: "Elite Ceramic Package", price: "$1200", description: "2-year ceramic coating with full paint correction" },
    ],
  },
  {
    id: "specialty",
    name: "Specialty Vehicles",
    description: "Services for RVs, boats, and other specialty vehicles",
    packages: [
      { id: "rv-detailing", name: "RV Detailing", price: "$25-50/ft", description: "Comprehensive detailing for your RV" },
      { id: "boat-detailing", name: "Boat Detailing", price: "$25-50/ft", description: "Complete detailing for boats and watercraft" },
      { id: "boat-tinting", name: "Boat Window Tinting", price: "Custom", description: "Custom window tinting for boats" },
    ],
  }
];

// Add-on services
export const additionalServices = [
  { id: "headlight-restoration", name: "Headlight Restoration", price: "$99", category: "exterior" },
  { id: "paint-correction", name: "Paint Correction", price: "$150+", category: "exterior" },
  { id: "engine-detailing", name: "Engine Bay Detailing", price: "$75", category: "exterior" },
  { id: "pet-hair-removal", name: "Pet Hair Removal", price: "$40", category: "interior" },
  { id: "stain-removal", name: "Stain Removal", price: "$60", category: "interior" },
  { id: "odor-treatment", name: "Odor Bomb Treatment", price: "$50", category: "interior" },
  { id: "fabric-protection", name: "Fabric Protection", price: "$80", category: "protection" },
  { id: "leather-conditioning", name: "Leather Conditioning", price: "$60", category: "protection" },
];

// Vehicle types
export const vehicleTypes = [
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "SUV" },
  { id: "truck", name: "Truck" },
  { id: "van", name: "Van" },
  { id: "sports", name: "Sports Car" },
  { id: "rv", name: "RV/Motorhome" },
  { id: "boat", name: "Boat" },
];

export const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM"
];

export const usStates = [
  { name: "Alabama", abbreviation: "AL" },
  /* ... include all states as you had before ... */
  { name: "Wyoming", abbreviation: "WY" }
];
