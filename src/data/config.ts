// Central config for site, services, portfolio, testimonials, contact

export const siteConfig = {
  name: "SholaTech",
  tagline: "NETWORKING",
  logo: "/logo.jpg",
  email: "iyiolaolusolatech@gmail.com",
  phone: "+254 700 130 036 · +234 806 193 6196",
  phoneTel: "254700130036",
  whatsapp: "234700130036",
  social: {
    twitter: "https://twitter.com/sholatech",
    instagram: "https://instagram.com/sholatech",
    linkedin: "https://linkedin.com/company/sholatech",
    facebook: "https://facebook.com/sholatech",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/booking", label: "Book a Project" },
  { href: "/contact", label: "Contact" },
  { href: "/feedback", label: "Client reviews" },
];

export const services = [
  { id: "website-development", title: "Website Development", shortDesc: "Custom, fast, and scalable websites built with modern tech.", icon: "🌐", description: "We build custom websites tailored to your brand and goals. From landing pages to multi-page sites, we use modern frameworks for speed, SEO, and scalability.", benefits: ["Responsive design for all devices", "SEO-optimized structure", "Fast loading and performance", "Easy content updates", "Ongoing support options"], startingPrice: "From $100" },
  { id: "ui-ux-design", title: "UI/UX Design", shortDesc: "User-centered interfaces that look great and convert.", icon: "✨", description: "We design intuitive, beautiful interfaces that improve user experience and drive conversions. Research, wireframes, prototypes, and high-fidelity designs.", benefits: ["User research and personas", "Wireframes and prototypes", "Visual design systems", "Usability testing", "Design handoff for development"], startingPrice: "From $55" },
  { id: "ecommerce", title: "E-commerce Solutions", shortDesc: "Online stores that sell: secure checkout and inventory.", icon: "🛒", description: "Full e-commerce websites with product catalogs, cart, secure payment integration, and order management. We help you sell online with confidence.", benefits: ["Product catalog and categories", "Secure payment integration", "Order and inventory management", "Shipping and tax options", "Mobile-friendly checkout"], startingPrice: "From $170" },
  { id: "event-booking", title: "Event & DJ Booking Websites", shortDesc: "Sites for DJs and event pros: bookings and schedules.", icon: "🎧", description: "Professional sites for DJs, artists, and event professionals. Showcase your work, manage bookings, and let clients get in touch or book directly.", benefits: ["Portfolio and media galleries", "Booking and inquiry forms", "Event calendar and availability", "Social and music links", "Mobile-first design"], startingPrice: "From $80" },
  { id: "graphic-design", title: "Graphic Design", shortDesc: "Logos, flyers, and brand assets that stand out.", icon: "🎨", description: "Logos, flyers, social graphics, and brand identity that make you stand out. We create visuals that match your message and appeal to your audience.", benefits: ["Logo and brand identity", "Flyers and posters", "Social media graphics", "Print-ready files", "Style guides"], startingPrice: "From $45" },
];

export const portfolioItems = [
  { id: 1, title: "ABI-LAT Transport Services", category: "Transport & Logistics", description: "Corporate site for ABI-LAT Transport Services Limited — reliable, efficient transportation solutions.", image: "/portfolio/abilat.png", demoUrl: "https://abilattransport-ltqt.vercel.app" },
  { id: 2, title: "3PLE A Photography", category: "Web / Photography", description: "Capturing moments, creating memories — photography and storytelling.", image: "/portfolio/3plea.png", demoUrl: "https://3-ple-a.vercel.app" },
  { id: 3, title: "CWORT – Assessment & Advisory", category: "UI/UX Design", description: "Assessment and advisory workspace for consulting teams — powered by AI.", image: "/portfolio/cwort.png", demoUrl: "https://cwort.com" },
  { id: 4, title: "DJ03 – DJ & Music Producer", category: "Event / Booking", description: "DJ landing page — music, videos, booking via WhatsApp, unmatched vibe and energy.", image: "/portfolio/dj03.png", demoUrl: "https://dj-03.vercel.app" },
  { id: 5, title: "SecoBeautyHub", category: "Beauty & Skincare", description: "Beauty brand site — premium skincare and beauty essentials, self-care and confidence.", image: "/portfolio/secobeautyhub.png", demoUrl: "https://secowhitehub.vercel.app" },
  { id: 6, title: "FreshCart", category: "E-commerce", description: "Supermarket for fresh grocery — online shopping and convenient home delivery.", image: "/portfolio/freshcart.png", demoUrl: "https://ecommerce-hazel-five.vercel.app" },
  { id: 7, title: "Zaza Logistics", category: "Logistics", description: "Global logistics and sourcing — buy, ship, and deliver goods safely across the world.", image: "/portfolio/zaza.png", demoUrl: "https://zaza-global-connect.vercel.app" },
];

export const testimonials = [
  { id: 1, name: "Chioma O.", role: "Founder, StyleHub", content: "SholaTech built our e-commerce site from scratch. Sales went up and the site is easy to manage. Highly recommend.", avatar: "C" },
  { id: 2, name: "Tunde M.", role: "DJ & Event Host", content: "My booking website gets me more gigs. Professional look and the booking form works perfectly. Great team.", avatar: "T" },
  { id: 3, name: "Amina K.", role: "Marketing Manager", content: "Our new website and flyers have given our brand a real upgrade. Fast, clear communication and quality delivery.", avatar: "A" },
];
