"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { StepRoomSelector } from "./StepRoomSelector";
import { StepDatesGuests } from "./StepDatesGuests";
import { StepGuestDetails } from "./StepGuestDetails";
import { StepSummary } from "./StepSummary";
import { calculatePriceSummary } from "@/lib/bookingUtils";
import { formatCurrency } from "@/lib/utils";

const steps = [
  { number: 1, label: "Rooms" },
  { number: 2, label: "Dates" },
  { number: 3, label: "Details" },
  { number: 4, label: "Review" },
];

export function BookingModal() {
  const {
    isOpen,
    closeBooking,
    currentStep,
    prevStep,
    nextStep,
    booking,
  } = useBookingStore();

  const summary = calculatePriceSummary(booking);
  const hasRooms = booking.selectedRooms.length > 0;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return hasRooms;
      case 2:
        return !!(booking.checkIn && booking.checkOut && summary.nights > 0);
      case 3:
        return !!(booking.guestName.trim() && booking.guestPhone.trim());
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepLabels = ["Select Rooms", "Choose Dates", "Your Details", "Confirm Booking"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-6 md:bottom-6 md:w-full md:max-w-2xl lg:max-w-3xl z-50 bg-[#002530] shadow-hover border border-[#003D4C] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#003D4C] shrink-0 bg-[#001820]">
              <div className="flex items-center gap-4">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-[#A1A1AA] font-medium mb-1">
                    Step {currentStep} of 4
                  </p>
                  <p className="text-white text-xl font-light">
                    {stepLabels[currentStep - 1]}
                  </p>
                </div>
              </div>
              <button
                onClick={closeBooking}
                className="text-[#A1A1AA] hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Step Progress */}
            <div className="flex px-8 pt-6 pb-4 gap-3 shrink-0">
              {steps.map((step) => (
                <div key={step.number} className="flex-1">
                  <div
                    className={`h-0.5 transition-all duration-500 ${
                      step.number <= currentStep ? "bg-white" : "bg-[#003D4C]"
                    }`}
                  />
                  <p
                    className={`text-[0.65rem] uppercase tracking-wide mt-2 transition-colors duration-300 ${
                      step.number <= currentStep ? "text-white font-medium" : "text-[#A1A1AA]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-8 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  {currentStep === 1 && <StepRoomSelector />}
                  {currentStep === 2 && <StepDatesGuests />}
                  {currentStep === 3 && <StepGuestDetails />}
                  {currentStep === 4 && <StepSummary />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            {currentStep < 4 && (
              <div className="px-8 py-5 border-t border-[#003D4C] bg-[#001820] shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    {summary.grandTotal > 0 && summary.nights > 0 ? (
                      <>
                        <p className="text-[#A1A1AA] text-xs">
                          {summary.nights} night{summary.nights !== 1 ? "s" : ""} · Estimated total
                        </p>
                        <p className="text-xl text-white font-medium mt-1">
                          {formatCurrency(summary.grandTotal)}
                        </p>
                      </>
                    ) : hasRooms ? (
                      <>
                        <p className="text-[#A1A1AA] text-xs">Starting from</p>
                        <p className="text-xl text-white font-medium mt-1">
                          {formatCurrency(
                            booking.selectedRooms.reduce(
                              (s, r) => s + r.pricePerNight * r.quantity,
                              0
                            )
                          )}
                          <span className="text-[#A1A1AA] text-xs font-light ml-1">/ night</span>
                        </p>
                      </>
                    ) : (
                      <p className="text-[#A1A1AA] text-sm">
                        Select rooms to see pricing
                      </p>
                    )}
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`btn-primary px-8 py-3 text-xs ${
                      !canProceed() && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white"
                    }`}
                  >
                    <span>{currentStep === 3 ? "Review Booking" : "Continue"}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
