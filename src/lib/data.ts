import { BookingStatus } from "@prisma/client";

export const users = [
  {
    email: "admin@gmail.com",
    name: "admin",
    password: "admin_123",
  },
  {
    email: "user@gmail.com",
    name: "user",
    password: "user_123",
  },
];

export const courts = [
  {
    name: "Reformer A (Window Side)",
    description:
      "Standard Reformer equipment with natural light next to the window.",
    capacity: 12,
    available: true,
    amount: 250000,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Reformer B (Mirror Side)",
    description:
      "Reformer equipment facing a large mirror for posture correction.",
    capacity: 11,
    available: true,
    amount: 250000,
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Cadillac Private Room",
    description:
      "Private room with Cadillac equipment for more intensive one-on-one sessions.",
    capacity: 15,
    available: true,
    amount: 400000,
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Wunda Chair Station",
    description:
      "Dedicated Wunda Chair station to train balance and leg strength.",
    capacity: 20,
    available: true,
    amount: 200000,
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Mat Pilates Area",
    description: "Spacious area with premium mats for floor exercise workouts.",
    capacity: 30,
    available: true,
    amount: 150000,
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800",
  },
];

const todayUTC = new Date();
const dateToday = new Date(
  Date.UTC(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate()),
);

export const bookings = [
  {
    date: dateToday,
    startTime: "09:00 - 10:00 AM",
    customerName: "John Doe",
    status: BookingStatus.confirmed,
  },
  {
    date: dateToday,
    startTime: "10:00 - 11:00 AM",
    customerName: "Jane Smith",
    status: BookingStatus.confirmed,
  },
  {
    date: dateToday,
    startTime: "02:00 - 03:00 PM",
    customerName: "Michael Jordan",
    status: BookingStatus.confirmed,
  },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
