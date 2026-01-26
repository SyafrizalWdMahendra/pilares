import prisma from "./prisma";

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

export interface Court {
  id: number;
  name: string;
  description: string;
  capacity: number;
  available: boolean;
  image: string;
}

export interface Reservation {
  date: Date;
  timeSlot: TimeSlot;
  court: Court;
}

// export const getTimeSlotsForDate = async (date: Date) => {
//   const dayOfWeek = date.getDay();
//   const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

//   // const baseSlots: TimeSlot[] = [
//   //   { id: 1, time: "06:00 - 07:00 AM", available: true, spotsLeft: 8 },
//   //   { id: 2, time: "07:00 - 08:00 AM", available: true, spotsLeft: 5 },
//   //   { id: 3, time: "08:00 - 09:00 AM", available: true, spotsLeft: 3 },
//   //   { id: 4, time: "09:00 - 10:00 AM", available: true, spotsLeft: 10 },
//   //   { id: 5, time: "10:00 - 11:00 AM", available: true, spotsLeft: 6 },
//   //   { id: 6, time: "11:00 - 12:00 AM", available: false, spotsLeft: 0 },
//   //   { id: 7, time: "12:00 - 01:00 PM", available: true, spotsLeft: 4 },
//   //   { id: 8, time: "02:00 - 03:00 PM", available: true, spotsLeft: 7 },
//   //   { id: 9, time: "04:00 - 05:00 PM", available: true, spotsLeft: 2 },
//   //   { id: 10, time: "05:00 - 06:00 PM", available: false, spotsLeft: 0 },
//   //   { id: 11, time: "06:00 - 07:00 PM", available: true, spotsLeft: 9 },
//   //   { id: 12, time: "07:00 - 08:00 PM", available: true, spotsLeft: 5 },
//   // ];

//   const baseSlots: TimeSlot[] = [
//     { id: 1, time: "06:00 - 07:00 AM", available: true, spotsLeft: 8 },
//     { id: 2, time: "07:00 - 08:00 AM", available: true, spotsLeft: 5 },
//     { id: 3, time: "08:00 - 09:00 AM", available: true, spotsLeft: 3 },
//     { id: 4, time: "09:00 - 10:00 AM", available: true, spotsLeft: 10 },
//     { id: 5, time: "10:00 - 11:00 AM", available: true, spotsLeft: 6 },
//     { id: 6, time: "11:00 - 12:00 AM", available: false, spotsLeft: 0 },
//     { id: 7, time: "12:00 - 01:00 PM", available: true, spotsLeft: 4 },
//     { id: 8, time: "02:00 - 03:00 PM", available: true, spotsLeft: 7 },
//     { id: 9, time: "04:00 - 05:00 PM", available: true, spotsLeft: 2 },
//     { id: 10, time: "05:00 - 06:00 PM", available: false, spotsLeft: 0 },
//     { id: 11, time: "06:00 - 07:00 PM", available: true, spotsLeft: 9 },
//     { id: 12, time: "07:00 - 08:00 PM", available: true, spotsLeft: 5 },
//   ];

//   const dateHash = date.getDate() + date.getMonth();
//   return baseSlots
//     .map((slot, index) => ({
//       ...slot,
//       spotsLeft: isWeekend
//         ? Math.max(0, slot.spotsLeft - ((index + dateHash) % 5))
//         : slot.spotsLeft,
//     }))
//     .map((slot) => ({
//       ...slot,
//       available: slot.spotsLeft > 0,
//     }));
// };

// export const getCourtsForSlot = (date: Date, timeSlotId: number): Court[] => {
//   const courts: Court[] = [
//     {
//       id: 1,
//       name: "Reformer Studio A",
//       description: "Premium reformer machines with city views",
//       capacity: 12,
//       available: true,
//       image: "🏛️",
//     },
//     {
//       id: 2,
//       name: "Reformer Studio B",
//       description: "Intimate setting with natural lighting",
//       capacity: 8,
//       available: true,
//       image: "🌿",
//     },
//     {
//       id: 3,
//       name: "Mat Pilates Room",
//       description: "Spacious floor for mat exercises",
//       capacity: 15,
//       available: true,
//       image: "🧘",
//     },
//     {
//       id: 4,
//       name: "Tower & Cadillac Suite",
//       description: "Advanced equipment for experienced practitioners",
//       capacity: 6,
//       available: true,
//       image: "⭐",
//     },
//   ];

//   const hash = date.getDate() + timeSlotId;
//   return courts.map((court, index) => ({
//     ...court,
//     available: (index + hash) % 4 !== 0,
//   }));
// };

export const BOOKING_PRICE = 35;
