import { Clock8, MapPin, PhoneCall } from "lucide-react";

import ContactForm from "./contact-form";
import { Chip } from "@nextui-org/react";

const page = () => {
  return (
    <main id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <Chip>Contact</Chip>
            <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-primary-2 sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-foreground-500">
              We&apos;re here to help you. Reach out to us for any queries or
              assistance.
            </p>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mb-12 mt-3 text-lg text-foreground-500">
                We value your feedback and inquiries. Feel free to contact us,
                and we&apos;ll get back to you as soon as possible.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-2 text-gray-50">
                    <MapPin />
                  </div>
                  <div className="mb-4 ml-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-primary">
                      Our Address
                    </h3>
                    <p className="text-foreground-500">University of El Oued</p>
                    <p className="text-foreground-500">
                      N48, Eloued 39000, Algeria
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-2 text-gray-50">
                    <PhoneCall />
                  </div>
                  <div className="mb-4 ml-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-primary">
                      Contact
                    </h3>
                    <p className="text-foreground-500">
                      Mobile: +213 (0) 555-123-456
                    </p>
                    <p className="text-foreground-500">
                      Email: fdc@eloueduniversity.dz
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-2 text-gray-50">
                    <Clock8 />
                  </div>
                  <div className="mb-4 ml-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-primary">
                      Working hours
                    </h3>
                    <p className="text-foreground-500">
                      Saturday - Tuesday: 08:00 - 13:00
                    </p>
                    <p className="text-foreground-500">
                      Wednesday - Friday: Closed
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Ready to Get Started?
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
