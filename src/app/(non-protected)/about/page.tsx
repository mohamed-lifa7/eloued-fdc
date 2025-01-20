import { LeardersSection } from "@/components/ui/leaders";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about our mission, vision, and values. Explore the story behind our journey, our team, and the passion driving our efforts to make a difference in the community. Get to know us better and see how we're shaping the future together!",
};

const leaders = [
  {
    id: "a7ffsjkafusjfa98f7v323daddf98d",
    name: "MOUSSAOUI Aboubaker",
    year: "3rd Year Bachelor's Degree",
    role: "Founder of the FDC",
    bio: "A young man trying to get better everyday. Founder of the club, interested in networking and cybersecurity.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/5964a2b7-c3b4-43ea-9ec1-d21a205e982c.png",
  },
  {
    id: "a7ffs0us7f9sa98f7v323daddf98d",
    name: "HALA Mohammed Islam",
    year: "3rd Year Bachelor's Degree",
    role: "Leader",
    bio: "Specialized in backend development using Node.js and Express.js.\n now focused on integrating AI and machine learning into software solutions.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/2b7d39ce-76fb-4131-9204-c9542cd8d073.jpg",
  },
  {
    id: "a7f98vds7f9sa98f7vddddddf98d",
    name: "BEN AICHA Abderrahman",
    year: "3rd Year Bachelor's Degree",
    role: "Co-Leader",
    bio: "Web developer specializing in Next.js, always exploring new technologies and passionate about open source.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/301abe32-d3ab-48cb-b422-cf4c2898cc55.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdf",
    name: "HENKA Mohammed BASHIR",
    year: "Graduated",
    role: "IT Manager",
    bio: "Full-stack developer with a focus on AI and machine learning. Always working on building innovative and practical solutions to improve systems.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/fb897d7f-ebc9-4263-8de8-2e1a4b4ad94a.png",
  },
  {
    id: "a7ffprak7f9sa98u6ks3dadfajdc",
    name: "NID Djoumana",
    year: "3rd year Bachelor's Degree",
    role: "Manager",
    bio: "Frontend developer, intrested in application development, Shaping the future with FDC.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/fb897d7f-ebc9-4263-8de8-2e1a4b4ad94a.png",
  },
  {
    id: "a7f98vds7f9f1m8f7vddddddf98d",
    name: "DRICI Mohammed Hachem",
    year: "1st Year Bachelor's Degree",
    role: "Event Organizer",
    bio: "A C++ enthusiast who enjoys solving complex problems and organizing engaging events.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/d5d4edb0-7708-42de-a9bb-76258e6d4888.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdc",
    name: "KAHLA CHIRAZ",
    year: "1st Year Master's Degree",
    role: "AI and Data Analytics",
    bio: "Focused on using data to solve problems and improve decision-making. Constantly striving to innovate in the tech field through AI and data analytics.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/fb897d7f-ebc9-4263-8de8-2e1a4b4ad94a.png",
  },
  {
    id: "a7f98vds7f9sa98f7vdkkkkdf98d",
    name: "KHELEF Oussama",
    year: "3rd Year Bachelor's Degree",
    role: "Backend Developer",
    bio: "Backend web developer experienced with Express.js and building scalable APIs.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/e09bee36-f4ab-45bd-bd28-fe2dbcbf2817.jpg",
  },
  {
    id: "a7ffprak7f9sa98f7v323dadfajdc",
    name: "MOSTEFAOUI Malak",
    year: "3rd year Bachelor's Degree",
    role: "Manager",
    bio: "Backend developer specializing in Laravel and trying to get better, active leader of FDC.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/fb897d7f-ebc9-4263-8de8-2e1a4b4ad94a.png",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdb",
    name: "KHIR Imadeddin",
    year: "3rd Year Bachelor's Degree",
    role: "Manager",
    bio: "Web developer specialized in React and Express js, Ensures timely project completion and effective collaboration within the team.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/3d4c665d-bda2-4f50-8926-60f58d5afed9.jpg",
  },
  {
    id: "12298vds7f9sa98f7vddddddf98d",
    name: "NECIB Amara",
    year: "1st Year Master's Degree",
    role: "Backend Developer",
    bio: "Enjoys building scalable systems, passionate about DevOps, AI, and backend development.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/a906e5cd-4ca7-4506-8c27-000e4c9b1b79.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajda",
    name: "AYA MAOUCH",
    year: "3rd Year Bachelor's Degree",
    role: "Leader Logistics",
    bio: "Front-End Developer Has some experience in front-end development and enjoys working on lightweight projects.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/fb897d7f-ebc9-4263-8de8-2e1a4b4ad94a.png",
  },
  {
    id: "a7ffs0us7f9sa98f7vddddddf98d",
    name: "LIFA Mohammed Seddik",
    year: "1st Year Master's Degree",
    bio: "Just a tech.",
    src: "https://files.edgestore.dev/5iwpojmnomxbon5i/publicFiles/_public/a3c6a747-8ceb-41bc-8a11-6fb02fe9720c.jpg",
  },
];

const page = () => {
  return (
    <main className="container my-20 min-h-screen max-w-4xl space-y-8">
      <h1 className="inline-block text-4xl font-black lg:text-5xl">About Us</h1>
      <section>
        <div className="space-y-4">
          <p>
            Welcome to the Future Developers Club (FDC)! We empower students
            with modern development skills, bridging the gap between academics
            and industry.
          </p>
          <p>
            FDC advocates for free and open-source software (FOSS) and has no
            ties to proprietary platforms like Microsoft or Google, aligning
            with our principles of transparency and open collaboration.
          </p>
        </div>
      </section>
      <section>
        <h2 className="inline-block text-4xl font-black lg:text-5xl">
          Our Learders
        </h2>
        <div>
          <LeardersSection leaders={leaders} />
        </div>
      </section>
    </main>
  );
};

export default page;
