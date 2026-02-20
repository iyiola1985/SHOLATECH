// Central config for easy updates - services, portfolio, testimonials, contact

export const siteConfig = {
  name: "SholaTech",
  tagline: "NETWORKING",
  logo: "/logo.jpg",
  email: "iyiolaolusolatech@gmail.com",
  phone: "+254 700 130 036 · +234 806 193 6196",
  phoneTel: "254700130036",
  phoneTel2: "2348061936196",
  whatsapp: "234700130036",
  social: {
    twitter: "https://twitter.com/sholatech",
    instagram: "https://instagram.com/sholatech",
    linkedin: "https://linkedin.com/company/sholatech",
    facebook: "https://facebook.com/sholatech",
  },
  /** Optional: path to image for "What We Do" DJ block (e.g. "/dj-hero.jpg"). If not set, a dark gradient is used. */
  djHeroImage: "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/booking", label: "Book a Project" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    id: "website-development",
    title: "Website Development",
    shortDesc: "Custom, fast, and scalable websites built with modern tech.",
    description: "We build custom websites tailored to your brand and goals. From landing pages to multi-page sites, we use modern frameworks for speed, SEO, and scalability.",
    benefits: [
      "Responsive design for all devices",
      "SEO-optimized structure",
      "Fast loading and performance",
      "Easy content updates",
      "Ongoing support options",
    ],
    startingPrice: "From $100",
    icon: "🌐",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDesc: "User-centered interfaces that look great and convert.",
    description: "We design intuitive, beautiful interfaces that improve user experience and drive conversions. Research, wireframes, prototypes, and high-fidelity designs.",
    benefits: [
      "User research and personas",
      "Wireframes and prototypes",
      "Visual design systems",
      "Usability testing",
      "Design handoff for development",
    ],
    startingPrice: "From $55",
    icon: "✨",
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    shortDesc: "Online stores that sell: secure checkout and inventory.",
    description: "Full e-commerce websites with product catalogs, cart, secure payment integration, and order management. We help you sell online with confidence.",
    benefits: [
      "Product catalog and categories",
      "Secure payment integration",
      "Order and inventory management",
      "Shipping and tax options",
      "Mobile-friendly checkout",
    ],
    startingPrice: "From $170",
    icon: "🛒",
  },
  {
    id: "event-booking",
    title: "Event & DJ Booking Websites",
    shortDesc: "Sites for DJs and event pros: bookings and schedules.",
    description: "Specialized websites for DJs, event planners, and entertainers. Include booking forms, event calendars, portfolios, and contact flows.",
    benefits: [
      "Booking and inquiry forms",
      "Event calendar and availability",
      "Portfolio and media galleries",
      "Pricing and packages display",
      "Contact and WhatsApp integration",
    ],
    startingPrice: "From $80",
    icon: "🎧",
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Flyers",
    shortDesc: "Logos, flyers, and brand visuals that stand out.",
    description: "Professional graphic design for logos, flyers, social media graphics, and brand collateral. Clean, on-brand visuals that get attention.",
    benefits: [
      "Logo and brand identity",
      "Flyers and posters",
      "Social media graphics",
      "Business cards and letterheads",
      "Print-ready files",
    ],
    startingPrice: "From $20",
    icon: "🎨",
  },
];

export const portfolioItems = [
  {
    id: 1,
    title: "Abilat Transport",
    category: "Transport / Logistics",
    description: "ABI-LAT Transport Services Limited – reliable, efficient transportation solutions.",
    image: "/portfolio/abilat-screenshot.png",
    demoUrl: "https://abilattransport-ltqt.vercel.app/",
    tags: ["Next.js", "Logistics", "Transport"],
  },
  {
    id: 2,
    title: "CWORT – Assessment & Advisory",
    category: "UI/UX Design",
    description: "Assessment and advisory workspace for consulting teams – powered by AI.",
    image: "/portfolio/cwort-screenshot.png",
    demoUrl: "https://cwort.com/",
    tags: ["UI/UX", "Dashboard", "Design System"],
  },
  {
    id: 3,
    title: "DJ03 – DJ & Music Producer",
    category: "Event / Booking",
    description: "DJ landing page – music, videos, booking via WhatsApp, unmatched vibe and energy.",
    image: "/portfolio/dj03-screenshot.png",
    demoUrl: "https://www.dj03ent.com",
    tags: ["Next.js", "Booking", "Music"],
  },
  {
    id: 4,
    title: "SecoBeautyHub",
    category: "E-commerce / Beauty",
    description: "Premium skincare and beauty essentials – glow with confidence.",
    image: "/portfolio/secowhite-screenshot.png",
    demoUrl: "https://secowhitehub.vercel.app/",
    tags: ["Next.js", "Beauty", "E-commerce"],
  },
  {
    id: 5,
    title: "3PLE A Photography",
    category: "Web / Photography",
    description: "Capturing moments, creating memories – photography and storytelling.",
    image: "/portfolio/3plea-screenshot.png",
    demoUrl: "https://3-ple-a.vercel.app/",
    tags: ["Next.js", "Photography", "Brand"],
  },
  {
    id: 6,
    title: "Zaza Logistics",
    category: "Logistics",
    description: "Your only trusted logistics partner – maximum flexibility, global connect.",
    image: "/portfolio/zaza-screenshot.png",
    demoUrl: "https://zaza-global-connect.vercel.app/",
    tags: ["Next.js", "Tailwind", "Logistics"],
  },
  {
    id: 7,
    title: "FreshCart – E-commerce",
    category: "E-commerce",
    description: "Online grocery store – fresh produce, delivery, and supermarket shopping.",
    image: "/portfolio/ecommerce-screenshot.png",
    demoUrl: "https://ecommerce-hazel-five.vercel.app/",
    tags: ["Next.js", "E-commerce", "Tailwind"],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Chioma O.",
    role: "Founder, StyleHub",
    content: "SholaTech built our e-commerce site from scratch. Sales went up and the site is easy to manage. Highly recommend.",
    avatar: "C",
  },
  {
    id: 2,
    name: "Tunde M.",
    role: "DJ & Event Host",
    content: "My booking website gets me more gigs. Professional look and the booking form works perfectly. Great team.",
    avatar: "T",
  },
  {
    id: 3,
    name: "Amina K.",
    role: "Marketing Manager",
    content: "Our new website and flyers have given our brand a real upgrade. Fast, clear communication and quality delivery.",
    avatar: "A",
  },
];

export const businessTypes = [
  "Startup",
  "Small Business",
  "Medium / Enterprise",
  "Personal Brand",
  "Event / Entertainment",
  "E-commerce",
  "Other",
];

export const budgetRanges = [
  "Under $100",
  "$100 - $250",
  "$250 - $500",
  "$500 - $1,000",
  "Above $1,000",
];

export const timelineOptions = [
  "ASAP (1–2 weeks)",
  "2–4 weeks",
  "1–2 months",
  "2–3 months",
  "Flexible",
];
