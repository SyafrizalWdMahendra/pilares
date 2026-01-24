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
  },
  {
    name: "Reformer B (Mirror Side)",
    description:
      "Alat Reformer yang menghadap langsung ke cermin besar untuk koreksi postur.",
  },
  {
    name: "Cadillac Private Room",
    description:
      "Ruangan khusus dengan alat Cadillac untuk sesi privat yang lebih intensif.",
  },
  {
    name: "Wunda Chair Station",
    description:
      "Station khusus Wunda Chair untuk melatih keseimbangan dan kekuatan kaki.",
  },
  {
    name: "Mat Pilates Area",
    description:
      "Area luas dengan matras premium untuk latihan floor exercises.",
  },
];

export const bookings = [
  {
    date: new Date(new Date().setHours(9, 0, 0, 0)),
    startTime: "09:00",
    customerName: "John Doe",
    status: BookingStatus.confirmed,
  },
  {
    date: new Date(new Date().setHours(10, 0, 0, 0)),
    startTime: "10:00",
    customerName: "Jane Smith",
    status: BookingStatus.confirmed,
  },
  {
    date: new Date(new Date().setHours(14, 0, 0, 0)),
    startTime: "14:00",
    customerName: "Michael Jordan",
    status: BookingStatus.confirmed,
  },
];
