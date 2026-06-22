"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 border-t border-border">
      <div className="container max-w-3xl">
        <h2 className="font-display text-xl text-center text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Everything you need to know about Futbol11 football trivia games.
        </p>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-body font-semibold text-sm text-foreground hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
