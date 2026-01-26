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
      "Alat Reformer standar dengan pencahayaan alami dekat jendela.",
    capacity: 12,
    available: true,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Reformer B (Mirror Side)",
    description:
      "Alat Reformer yang menghadap langsung ke cermin besar untuk koreksi postur.",
    capacity: 11,
    available: true,
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Cadillac Private Room",
    description:
      "Ruangan khusus dengan alat Cadillac untuk sesi privat yang lebih intensif.",
    capacity: 15,
    available: true,
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Wunda Chair Station",
    description:
      "Station khusus Wunda Chair untuk melatih keseimbangan dan kekuatan kaki.",
    capacity: 20,
    available: true,
    image:
      "https://images.unsplash.com/photo-1574680096141-9c32f2785bd0?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Mat Pilates Area",
    description:
      "Area luas dengan matras premium untuk latihan floor exercises.",
    capacity: 30,
    available: true,
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800",
  },
];

export const bookings = [
  {
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    startTime: "09:00",
    customerName: "John Doe",
    status: BookingStatus.confirmed,
  },
  {
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    startTime: "10:00",
    customerName: "Jane Smith",
    status: BookingStatus.confirmed,
  },
  {
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    startTime: "14:00",
    customerName: "Michael Jordan",
    status: BookingStatus.confirmed,
  },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
