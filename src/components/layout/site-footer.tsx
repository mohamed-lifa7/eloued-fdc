import { siteConfig } from "@/config/site-config";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export function SiteFooter() {
  const date = new Date();
  return (
    <footer className="flex min-h-screen w-full items-center justify-center border-t">
      <div className="flex w-full flex-col px-4 md:w-2/3">
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">How can we help you. get in touch</h1>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:justify-between">
          <p className="w-full text-muted-foreground md:w-2/3">
            We are here to assist you in launching and scaling your SaaS
            products. Feel free to reach out for any support or inquiries.
          </p>
          <Button>Contact Us</Button>
        </div>
        <div className="flex flex-col">
          <div className="mb-12 mt-24 flex flex-row justify-between">
            <Link
              className="hidden cursor-pointer text-muted-foreground hover:text-primary md:block"
              href="#"
            >
              About
            </Link>
            <Link
              className="hidden cursor-pointer text-muted-foreground hover:text-primary md:block"
              href="#"
            >
              Services
            </Link>
            <Link
              className="hidden cursor-pointer text-muted-foreground hover:text-primary md:block"
              href="#"
            >
              Why Us
            </Link>
            <Link
              className="hidden cursor-pointer text-muted-foreground hover:text-primary md:block"
              href="#"
            >
              Contact
            </Link>
            <div className="flex flex-row items-center justify-between space-x-8">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
          <Separator />
          <p className="my-12 w-full text-center text-muted-foreground">
            {date.getFullYear()} {siteConfig.applicationName}
          </p>
        </div>
      </div>
    </footer>
  );
}
