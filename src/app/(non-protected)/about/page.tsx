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
    bio: "Passionate about computer science and technology, dedicated to fostering innovation and collaboration in the club.",
    src: "/leaders/boubakr.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323daddf98d",
    name: "HALA Mohammed Islam",
    year: "3rd Year Bachelor's Degree",
    role: "Leader",
    bio: "Backend developer specializing in Node.js and Express.js. Passionate about problem-solving and continuously exploring new technologies. Some experience in electricity.",
    src: "/leaders/leader.png",
  },
  {
    id: "a7f98vds7f9sa98f7vddddddf98d",
    name: "BEN AICHA Abderrahman",
    year: "3rd Year Bachelor's Degree",
    role: "Co-Leader",
    bio: "Web developer specializing in Next.js, always exploring new technologies and passionate about open source.",
    src: "/leaders/ben_aicha.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdf",
    name: "HENKA Mohammed BASHIR",
    year: "Graduated",
    role: "IT Manager",
    bio: "Full-stack developer with a focus on AI and machine learning. Always working on building innovative and practical solutions to improve systems.",
    src: "/leaders/leader.png",
  },
  {
    id: "a7f98vds7f9f1m8f7vddddddf98d",
    name: "DRICI Mohammed Hachem",
    year: "1st Year Bachelor's Degree",
    role: "Event Organizer",
    bio: "A C++ enthusiast who enjoys solving complex problems and organizing engaging events.",
    src: "/leaders/drici.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdc",
    name: "KAHLA CHIRAZ",
    year: "1st Year Master's Degree",
    role: "AI and Data Analytics",
    bio: "Focused on using data to solve problems and improve decision-making. Constantly striving to innovate in the tech field through AI and data analytics.",
    src: "/leaders/leader.png",
  },
  {
    id: "a7f98vds7f9sa98f7vdkkkkdf98d",
    name: "KHALEF Oussama",
    year: "3rd Year Bachelor's Degree",
    role: "Backend Developer",
    bio: "Backend web developer experienced with Express.js and building scalable APIs.",
    src: "/leaders/khalef.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajdb",
    name: "KHIR Imadeddin",
    year: "3rd Year Bachelor's Degree",
    role: "Manager",
    bio: "Project manager with a focus on team coordination and process optimization. Ensures timely project completion and effective collaboration within the team.",
    src: "/leaders/leader.png",
  },
  {
    id: "12298vds7f9sa98f7vddddddf98d",
    name: "NECIB Amara",
    year: "1st Year Master's Degree",
    role: "Backend Developer",
    bio: "Proficient in Go, React, and their ecosystems, with a passion for efficient and clean coding practices.",
    src: "/leaders/necib.jpg",
  },
  {
    id: "a7ffs0us7f9sa98f7v323dadfajda",
    name: "AYA MAOUCH",
    year: "1st Year Bachelor's Degree",
    role: "Leader Logistics",
    bio: "Managing logistics and coordination for FDC. Focused on streamlining operations, ensuring clear communication, and helping the club achieve its goals.",
    src: "/leaders/leader.png",
  },
  {
    id: "a7ffs0us7f9sa98f7vddddddf98d",
    name: "LIFA Mohammed Seddik",
    year: "1st Year Master's Degree",
    bio: "Just a tech.",
    src: "/leaders/lifa.jpg",
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
          Our learders
        </h2>
        <div>
          <LeardersSection leaders={leaders} />
        </div>
      </section>
    </main>
  );
};

export default page;
