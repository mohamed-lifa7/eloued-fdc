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
        عن نادي مطوري المستقبل (FDC)
      </h2>
      <div className="mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2 lg:pl-16">
            <p className="mb-6 text-lg text-foreground">
              يهدف نادي مطوري المستقبل (FDC) إلى تمكين طلاب الجامعة من مهارات
              التطوير الحديثة وتعزيز ثقافة الابتكار. مهمتنا هي سد الفجوة بين
              التعلم الأكاديمي واحتياجات الصناعة، لإعداد الجيل القادم من قادة
              التكنولوجيا.
            </p>
            <blockquote className="mb-6 border-r-4 border-primary py-2 px-4 shadow-md rounded-md">
              <p className="text-lg italic text-foreground">
                &quot;نادي FDC ليس مجرد نادي؛ إنه منصة انطلاق لمبتكري
                التكنولوجيا في المستقبل. نبني مجتمعًا حيث يلتقي الشغف مع
                الفرص.&quot;
              </p>
              <footer className="mt-2 text-left text-gray-600">
                - محمد اسلام هالة، رئيس نادي FDC
              </footer>
            </blockquote>
            <Button as={Link}
              href="/about"
              color="primary"
              className="mb-4 lg:mb-0"
            >
              المزيد عنا
            </Button>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 lg:w-1/2">
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
                  alt={`نشاط FDC ${index + 1}`}
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
