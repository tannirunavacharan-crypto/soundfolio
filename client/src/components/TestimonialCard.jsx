import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="glassmorphism rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-amber-500/10 hover:shadow-[0_0_25px_rgba(251,191,36,0.04)] transition-all duration-300 relative group h-full">
      {/* Decorative large backdrop quotation mark */}
      <Quote className="absolute top-6 right-6 text-zinc-800/20 w-16 h-16 pointer-events-none group-hover:text-purple-500/5 transition-colors duration-300" />

      <div>
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {stars.map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star < testimonial.rating
                  ? 'text-amber-400 fill-amber-400 shadow-sm'
                  : 'text-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Feedback body */}
        <blockquote className="text-zinc-300 italic text-sm leading-relaxed mb-6 font-sans relative z-10">
          "{testimonial.feedback}"
        </blockquote>
      </div>

      {/* Client Name */}
      <div className="pt-4 border-t border-zinc-900 z-10">
        <cite className="not-italic block font-semibold text-white group-hover:text-amber-400 transition-colors">
          {testimonial.clientName}
        </cite>
        <span className="text-xs text-zinc-500 font-mono tracking-wider block mt-0.5">
          Verified Client Review
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
