"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocalizedStrings, useLocalizedFaqs } from "@/i18n/DictionaryContext";

const FAQ = () => {
  const faqs = useLocalizedFaqs();
  const t = useLocalizedStrings("faq", {
    title: "Frequently Asked Questions",
    intro: "Everything you need to know about Futbol11 football trivia games.",
  });
  return (
    <section id="faq" className="py-16 border-t border-border">
      <div className="container max-w-3xl">
        <h2 className="font-display text-xl text-center text-foreground mb-2">{t.title}</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">{t.intro}</p>
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
