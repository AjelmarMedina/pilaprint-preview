import { B } from "@/app/components/shared";

export const UNIVERSITIES = [
  { abbr: "NU-D", name: "National University – Dasmariñas", color: B.azure },
  { abbr: "DLSU-D", name: "De La Salle University – Dasmariñas", color: B.verdant },
  { abbr: "EAC", name: "Emilio Aguinaldo College – Cavite", color: B.tangerine },
  { abbr: "NCST", name: "National College of Science & Technology", color: B.sakura },
  { abbr: "AISAT", name: "AISAT College", color: B.solar },
  { abbr: "CVSU", name: "CVSU Indang", color: B.verdant },
  { abbr: "SJC-PCU", name: "Saint Jude Dasma PCU", color: B.azure },
  { abbr: "TUP", name: "Technological University Philippines", color: B.tangerine },
  { abbr: "KLD", name: "KLD College", color: B.sakura },
  { abbr: "MOL", name: "MOL Magsaysay", color: B.solar },
  { abbr: "DLSHI", name: "De La Salle Health Sciences Institute", color: B.azure },
  { abbr: "FEPC", name: "FEPC", color: B.verdant },
];

export const SHOPS = [
  { id: 1, name: "PrintMaster Dasmariñas", university: "NU-D", distance: "150m from NU-D", rating: 4.8, reviews: 234, services: ["B&W Printing", "Color Printing", "Binding", "Laminating"], hours: "7:00 AM – 9:00 PM", priceFrom: 2, color: B.azure },
  { id: 2, name: "Quick Copy Hub", university: "DLSU-D", distance: "200m from DLSU-D", rating: 4.6, reviews: 189, services: ["B&W Printing", "Color Printing", "Thesis Packages", "Scanning"], hours: "8:00 AM – 8:00 PM", priceFrom: 1.5, color: B.verdant },
  { id: 3, name: "Campus Print Station", university: "EAC", distance: "80m from EAC", rating: 4.9, reviews: 312, services: ["All Services", "Thesis Packages", "Group Orders"], hours: "7:30 AM – 10:00 PM", priceFrom: 2, color: B.tangerine },
  { id: 4, name: "UniPrint Express", university: "NCST", distance: "300m from NCST", rating: 4.5, reviews: 156, services: ["B&W Printing", "Color Printing", "Binding"], hours: "8:00 AM – 7:00 PM", priceFrom: 1.5, color: B.sakura },
  { id: 5, name: "TUP Copy Center", university: "TUP", distance: "50m from TUP", rating: 4.7, reviews: 201, services: ["B&W Printing", "Scanning", "Laminating", "Spiral Binding"], hours: "7:00 AM – 8:00 PM", priceFrom: 1.5, color: B.solar },
  { id: 6, name: "AcadPrint CVSU", university: "CVSU", distance: "120m from CVSU", rating: 4.4, reviews: 98, services: ["B&W Printing", "Color Printing", "Thesis Binding"], hours: "8:00 AM – 6:00 PM", priceFrom: 2, color: B.verdant },
];

export const STUDENT_ORDERS = [
  { id: "PP-108", service: "Defense Package", pages: 80, amount: 850, status: "pending", shop: "PrintMaster Dasmariñas", date: "Jun 18, 2026" },
  { id: "PP-105", service: "Thesis Binding", pages: 80, amount: 350, status: "ongoing", shop: "Quick Copy Hub", date: "Jun 17, 2026" },
  { id: "PP-104", service: "Colored Printing", pages: 15, amount: 120, status: "completed", shop: "PrintMaster Dasmariñas", date: "Jun 17, 2026" },
  { id: "PP-103", service: "Laminating", pages: 5, amount: 75, status: "completed", shop: "UniPrint Express", date: "Jun 15, 2026" },
];

export const BIZ_ORDERS = [
  { 
    id: "PP-104", 
    customer: "Maria Santos", 
    service: "Colored Printing", 
    payment: "GCash", 
    amount: 120, 
    status: "completed",
    date: "Jun 17, 2026",
    files: [
      { name: "Thesis_Abstract.pdf", type: "pdf", size: "2.4 MB" },
      { name: "Thesis_Chapter1.pdf", type: "pdf", size: "5.1 MB" }
    ],
    specifications: {
      color: "Full Color",
      sides: "Double-sided",
      copies: 3,
      paperSize: "A4",
      binding: "Spiral",
      laminating: false
    },
    paymentDetails: {
      method: "GCash",
      status: "Paid",
      total: 120,
      breakdown: [
        { item: "Color Printing (8 pages)", cost: 80 },
        { item: "Double-sided", cost: 20 },
        { item: "Spiral Binding", cost: 20 }
      ]
    },
    delivery: {
      type: "Pickup",
      schedule: "Jun 18, 2026, 3:00 PM",
      location: "PrintMaster Dasmariñas",
      queueNumber: "PP-104"
    }
  },
  { 
    id: "PP-105", 
    customer: "Juan dela Cruz", 
    service: "Thesis Binding", 
    payment: "Cash", 
    amount: 350, 
    status: "ongoing",
    date: "Jun 17, 2026",
    files: [
      { name: "Thesis_Final.docx", type: "docx", size: "8.7 MB" },
      { name: "Thesis_Figures.pptx", type: "pptx", size: "15.2 MB" }
    ],
    specifications: {
      color: "Black & White",
      sides: "Single-sided",
      copies: 1,
      paperSize: "Legal",
      binding: "Hardbound",
      laminating: true
    },
    paymentDetails: {
      method: "Cash upon pickup",
      status: "Processing",
      total: 350,
      breakdown: [
        { item: "Printing (80 pages)", cost: 200 },
        { item: "Hardbound Binding", cost: 100 },
        { item: "Laminating", cost: 50 }
      ]
    },
    delivery: {
      type: "Pickup",
      schedule: "Jun 19, 2026, 2:00 PM",
      location: "Quick Copy Hub",
      queueNumber: "PP-105"
    }
  },
  { 
    id: "PP-106", 
    customer: "Ana Reyes", 
    service: "B&W Printing", 
    payment: "Maya", 
    amount: 45, 
    status: "pending",
    date: "Jun 18, 2026",
    files: [
      { name: "Essay.pdf", type: "pdf", size: "0.8 MB" }
    ],
    specifications: {
      color: "Black & White",
      sides: "Single-sided",
      copies: 5,
      paperSize: "A4",
      binding: "None",
      laminating: false
    },
    paymentDetails: {
      method: "Maya",
      status: "Pending Payment",
      total: 45,
      breakdown: [
        { item: "B&W Printing (9 pages)", cost: 45 }
      ]
    },
    delivery: {
      type: "Pickup",
      schedule: "Jun 19, 2026, 10:00 AM",
      location: "PrintMaster Dasmariñas",
      queueNumber: "PP-106"
    }
  },
  { 
    id: "PP-107", 
    customer: "Carlos Mendoza", 
    service: "Laminating", 
    payment: "GCash", 
    amount: 75, 
    status: "ready",
    date: "Jun 18, 2026",
    files: [
      { name: "ID_Picture.jpg", type: "jpg", size: "1.2 MB" },
      { name: "Certificate.pdf", type: "pdf", size: "0.5 MB" }
    ],
    specifications: {
      color: "N/A",
      sides: "N/A",
      copies: 1,
      paperSize: "A4",
      binding: "N/A",
      laminating: true
    },
    paymentDetails: {
      method: "GCash",
      status: "Paid",
      total: 75,
      breakdown: [
        { item: "Laminating (2 items)", cost: 75 }
      ]
    },
    delivery: {
      type: "Pickup",
      schedule: "Ready for pickup",
      location: "PrintMaster Dasmariñas",
      queueNumber: "PP-107"
    }
  },
  { 
    id: "PP-108", 
    customer: "Liza Cruz", 
    service: "Defense Package", 
    payment: "Card", 
    amount: 850, 
    status: "completed",
    date: "Jun 16, 2026",
    files: [
      { name: "Defense_Presentation.pptx", type: "pptx", size: "22.4 MB" },
      { name: "Handouts.docx", type: "docx", size: "1.1 MB" }
    ],
    specifications: {
      color: "Full Color",
      sides: "Double-sided",
      copies: 10,
      paperSize: "A4",
      binding: "Spiral",
      laminating: false
    },
    paymentDetails: {
      method: "Credit Card",
      status: "Paid",
      total: 850,
      breakdown: [
        { item: "Color Printing (50 pages)", cost: 500 },
        { item: "Double-sided", cost: 125 },
        { item: "Spiral Binding", cost: 100 },
        { item: "10 Copies", cost: 125 }
      ]
    },
    delivery: {
      type: "Pickup",
      schedule: "Jun 17, 2026, 11:00 AM",
      location: "PrintMaster Dasmariñas",
      queueNumber: "PP-108"
    }
  },
];

export const REVENUE_DATA = [
  { day: "Mon", revenue: 3200, expenses: 900 },
  { day: "Tue", revenue: 4100, expenses: 1100 },
  { day: "Wed", revenue: 3800, expenses: 950 },
  { day: "Thu", revenue: 5200, expenses: 1800 },
  { day: "Fri", revenue: 6100, expenses: 2000 },
  { day: "Sat", revenue: 7200, expenses: 2200 },
  { day: "Sun", revenue: 4500, expenses: 1200 },
];

export const WEEKLY_DATA = [
  { week: "Week 1", revenue: 22000 },
  { week: "Week 2", revenue: 28000 },
  { week: "Week 3", revenue: 25000 },
  { week: "Week 4", revenue: 31000 },
];

export const SERVICE_DATA = [
  { name: "B&W Print", value: 38, color: B.azure },
  { name: "Color Print", value: 27, color: B.tangerine },
  { name: "Binding", value: 20, color: B.verdant },
  { name: "Laminating", value: 10, color: B.solar },
  { name: "Scanning", value: 5, color: B.sakura },
];

export const INVENTORY = [
  { item: "A4 Bond Paper (500s)", stock: 12, unit: "reams", low: 5, color: B.azure },
  { item: "Black Ink Cartridge", stock: 3, unit: "pcs", low: 3, color: B.tangerine },
  { item: "Color Ink Cartridge", stock: 2, unit: "sets", low: 3, color: B.sakura },
  { item: "Spiral Coil (A4)", stock: 45, unit: "pcs", low: 20, color: B.verdant },
  { item: "Laminating Film (100s)", stock: 8, unit: "packs", low: 5, color: B.solar },
  { item: "Softcover Board", stock: 18, unit: "pcs", low: 10, color: B.azure },
];