"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const images = [
  "/events/placeholder2.jpg",
  "/events/placeholder3.jpg",
  "/events/placeholder1.jpg",
];

const AboutSection = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <section className="container space-y-6 py-16">
      <h2 className="text-center text-3xl font-bold">
        About the Future Developers Club (FDC)
      </h2>
      <div className="mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2 lg:pr-16">
            <p className="mb-6 text-lg text-foreground">
              The Future Developers Club (FDC) aims to empower university
              students with modern development skills and foster a culture of
              innovation. Our mission is to bridge the gap between academic
              learning and industry needs, preparing the next generation of
              technology leaders.
            </p>
            <blockquote className="mb-6 rounded-md border-l-4 border-primary px-4 py-2 shadow-md">
              <p className="text-lg italic text-foreground">
                &quot;FDC is not just a club; it is a launchpad for future tech
                innovators. We build a community where passion meets
                opportunity.&quot;
              </p>
              <footer className="mt-2 text-right text-primary-foreground">
                - Mohamed Islam Hala, President of FDC
              </footer>
            </blockquote>
            <Button
              as={Link}
              href="/about"
              color="primary"
              className="mb-4 lg:mb-0"
            >
              Learn More About Us
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:w-1/2">
            {images.map((src, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"
                }`}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Image
                  src={src}
                  alt={`FDC Activity ${index + 1}`}
                  width={index === 0 ? "600" : "300"}
                  height={index === 0 ? "400" : "300"}
                  className={`h-full w-full object-cover transition-transform duration-300 ${
                    hoveredImage === index
                      ? "scale-110 grayscale-0"
                      : "grayscale"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
