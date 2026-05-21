"use client";

import { User, Phone, Mail, MessageSquare } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

function Field({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label-luxury flex items-center gap-2">
        <Icon size={11} />
        {label}
        {required && <span className="text-oak-gold ml-0.5">*</span>}
      </label>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-oak-dark-2 border border-white/10 rounded-sm px-4 py-3 text-oak-cream text-sm font-light placeholder:text-oak-muted/50 focus:outline-none focus:border-oak-gold/50 transition-colors duration-200 w-full"
      />
    </div>
  );
}

export function StepGuestDetails() {
  const {
    booking,
    setGuestName,
    setGuestPhone,
    setGuestEmail,
    setSpecialRequests,
  } = useBookingStore();

  return (
    <div className="p-6 flex flex-col gap-5">
      <p className="text-oak-muted text-sm font-light">
        Share your contact details so we can confirm your booking.
      </p>

      <Field
        label="Full Name"
        icon={User}
        placeholder="Your full name"
        value={booking.guestName}
        onChange={setGuestName}
        required
      />

      <Field
        label="Phone Number"
        icon={Phone}
        type="tel"
        placeholder="+91 xxxxxxxxxx"
        value={booking.guestPhone}
        onChange={setGuestPhone}
        required
      />

      <Field
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="your@email.com"
        value={booking.guestEmail}
        onChange={setGuestEmail}
      />

      {/* Special Requests */}
      <div className="flex flex-col gap-2">
        <label className="label-luxury flex items-center gap-2">
          <MessageSquare size={11} />
          Special Requests
        </label>
        <textarea
          placeholder="Early check-in, room preferences, dietary requirements..."
          value={booking.specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows={4}
          className="bg-oak-dark-2 border border-white/10 rounded-sm px-4 py-3 text-oak-cream text-sm font-light placeholder:text-oak-muted/50 focus:outline-none focus:border-oak-gold/50 transition-colors duration-200 w-full resize-none"
        />
      </div>

      <div className="p-4 bg-oak-gold/5 border border-oak-gold/15 rounded-sm">
        <p className="text-oak-muted text-xs font-light leading-relaxed">
          🔒 Your information is used only to process your booking request. We'll reach out via WhatsApp to confirm availability and finalize your reservation.
        </p>
      </div>
    </div>
  );
}
