"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

const reviews = [
  { name: "Arjun Sharma",  from: "Mumbai, India",     rating: 5, room: "Deluxe Room",   date: "April 2025",    init: "AS",
    text: "An exceptional airport hotel experience. The rooms are impeccably designed, the service is warm yet professional, and the location couldn't be more convenient. Hotel Sky Palace has redefined what airport hotels can be." },
  { name: "Priya Reddy",   from: "Bangalore, India",  rating: 5, room: "Queen Room",    date: "March 2025",    init: "PR",
    text: "I was blown away. For a hotel so close to the airport, the level of luxury is remarkable. The bed was the most comfortable I've slept in, and the breakfast spread was truly impressive. Will return without hesitation." },
  { name: "Michael Chen",  from: "Singapore",         rating: 5, room: "Superior Suite", date: "February 2025", init: "MC",
    text: "As a frequent business traveller, I demand quality and consistency. Hotel Sky Palace delivered on both fronts flawlessly. The staff anticipated every need, the WiFi was excellent, and the dining was a pleasant surprise." },
  { name: "Sunita Patel",  from: "Hyderabad, India",  rating: 5, room: "Family Room",   date: "January 2025",  init: "SP",
    text: "We had a family gathering here before an early morning flight. The rooms were spacious and beautiful. Kids loved it and so did we. The airport shuttle made everything stress-free. Highly recommend!" },
];

function ReviewCard({ r, delay }: { r: typeof reviews[0]; delay: number }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delay, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card group relative p-7 flex flex-col gap-4 transition-all duration-400"
    >
      <div className="absolute top-5 right-5 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-400">
        <Quote size={40} className="text-oak-gold" />
      </div>
      <div className="flex gap-1">
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} size={12} className="text-oak-gold fill-oak-gold" />
        ))}
      </div>
      <p className="text-oak-muted-light text-sm font-light leading-[1.85] italic flex-grow">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="w-7 h-px bg-oak-gold/40 group-hover:w-12 transition-all duration-500" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-oak-gold/10 border border-oak-gold/20 flex items-center justify-center shrink-0">
            <span className="font-playfair text-oak-gold text-xs">{r.init}</span>
          </div>
          <div>
            <p className="text-oak-cream text-sm font-medium">{r.name}</p>
            <p className="text-oak-muted text-[0.62rem] font-light mt-0.5">{r.from}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="eyebrow text-[0.5rem]">{r.room}</p>
          <p className="text-oak-muted text-[0.6rem] font-light mt-0.5">{r.date}</p>
        </div>
      </div>
    </motion.blockquote>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="sec bg-oak-dark/30 overflow-hidden">
      <div className="wrap">
        <div className="w-full flex justify-center mb-12 md:mb-16">
          <div className="flex flex-col items-center text-center max-w-xl">
            <AnimatedText className="flex flex-col items-center w-full">
              <span className="eyebrow">Guest Stories</span>
              <div className="w-10 h-px bg-oak-gold mt-3" />
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <h2 className="font-playfair text-3xl md:text-4xl xl:text-5xl text-oak-cream mt-6 mb-4 leading-[1.15]">
                Memories <span className="italic text-oak-gold">Made</span>
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.25}>
              <p className="text-oak-muted text-sm md:text-base font-light leading-relaxed">
                Read what our guests have to say about their stay at Hotel Sky Palace. From seamless airport transits to luxurious relaxation.
              </p>
            </AnimatedText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {reviews.map((r, i) => <ReviewCard key={r.name} r={r} delay={i * 0.08} />)}
        </div>

        <AnimatedText delay={0.3}>
          <div className="flex items-center justify-center gap-3 mt-10 md:mt-14">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-oak-gold fill-oak-gold" />)}
            </div>
            <p className="text-oak-muted text-sm font-light">
              <span className="text-oak-cream font-medium">4.9 / 5.0</span> · Based on 110+ guest reviews
            </p>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
