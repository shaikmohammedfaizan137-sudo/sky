"use client";

import { create } from "zustand";
import { BookingDetails, SelectedRoom } from "@/lib/bookingUtils";
import { getRoomById } from "@/lib/roomData";

export type BookingStep = 1 | 2 | 3 | 4;

interface BookingState {
  isOpen: boolean;
  currentStep: BookingStep;
  booking: BookingDetails;

  // Modal controls
  openBooking: () => void;
  closeBooking: () => void;
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Room controls
  addRoom: (roomId: string) => void;
  removeRoom: (roomId: string) => void;
  updateRoomQuantity: (roomId: string, quantity: number) => void;

  // Booking data
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  setGuestName: (name: string) => void;
  setGuestPhone: (phone: string) => void;
  setGuestEmail: (email: string) => void;
  setSpecialRequests: (requests: string) => void;

  resetBooking: () => void;
}

const defaultBooking: BookingDetails = {
  selectedRooms: [],
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  specialRequests: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  currentStep: 1,
  booking: { ...defaultBooking },

  openBooking: () => set({ isOpen: true, currentStep: 1 }),
  closeBooking: () => set({ isOpen: false }),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(4, state.currentStep + 1) as BookingStep,
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1) as BookingStep,
    })),

  addRoom: (roomId) =>
    set((state) => {
      const exists = state.booking.selectedRooms.find((r) => r.roomId === roomId);
      if (exists) {
        return {
          booking: {
            ...state.booking,
            selectedRooms: state.booking.selectedRooms.map((r) =>
              r.roomId === roomId ? { ...r, quantity: r.quantity + 1 } : r
            ),
          },
        };
      }
      const room = getRoomById(roomId);
      if (!room) return state;
      const newRoom: SelectedRoom = {
        roomId: room.id,
        roomName: room.name,
        pricePerNight: room.pricePerNight,
        quantity: 1,
      };
      return {
        booking: {
          ...state.booking,
          selectedRooms: [...state.booking.selectedRooms, newRoom],
        },
      };
    }),

  removeRoom: (roomId) =>
    set((state) => ({
      booking: {
        ...state.booking,
        selectedRooms: state.booking.selectedRooms.filter(
          (r) => r.roomId !== roomId
        ),
      },
    })),

  updateRoomQuantity: (roomId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          booking: {
            ...state.booking,
            selectedRooms: state.booking.selectedRooms.filter(
              (r) => r.roomId !== roomId
            ),
          },
        };
      }
      return {
        booking: {
          ...state.booking,
          selectedRooms: state.booking.selectedRooms.map((r) =>
            r.roomId === roomId ? { ...r, quantity } : r
          ),
        },
      };
    }),

  setCheckIn: (date) =>
    set((state) => ({ booking: { ...state.booking, checkIn: date } })),
  setCheckOut: (date) =>
    set((state) => ({ booking: { ...state.booking, checkOut: date } })),
  setAdults: (count) =>
    set((state) => ({ booking: { ...state.booking, adults: count } })),
  setChildren: (count) =>
    set((state) => ({ booking: { ...state.booking, children: count } })),
  setGuestName: (name) =>
    set((state) => ({ booking: { ...state.booking, guestName: name } })),
  setGuestPhone: (phone) =>
    set((state) => ({ booking: { ...state.booking, guestPhone: phone } })),
  setGuestEmail: (email) =>
    set((state) => ({ booking: { ...state.booking, guestEmail: email } })),
  setSpecialRequests: (requests) =>
    set((state) => ({ booking: { ...state.booking, specialRequests: requests } })),

  resetBooking: () =>
    set({ booking: { ...defaultBooking }, currentStep: 1, isOpen: false }),
}));
