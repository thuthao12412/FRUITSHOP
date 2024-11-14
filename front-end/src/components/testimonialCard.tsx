// src/components/TestimonialCard.tsx
import React from 'react';

interface Testimonial {
    id: number;
    name: string;
    message: string;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    return (
        <div className="testimonial-card">
            <h4>{testimonial.name}</h4>
            <p>{testimonial.message}</p>
        </div>
    );
};

export default TestimonialCard;
