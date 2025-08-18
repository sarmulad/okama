"use client";

import ContactForm from "@/components/contact-form";
import Newsletter from "@/components/newsletter";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Native Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139, 69, 19, 0.1) 40px, rgba(139, 69, 19, 0.1) 80px),
              repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(210, 105, 30, 0.1) 40px, rgba(210, 105, 30, 0.1) 80px)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <Newsletter />
          <ContactForm />
        </div>
      </div>

      {/* Native Pattern Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
    </section>
  );
}
