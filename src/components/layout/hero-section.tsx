"use client";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";

export default function Hero() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="relative items-center justify-center">
      <section className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-12 px-4 py-28 md:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-5 text-center"
        >
          <Chip
            className="cursor-pointer border-1 border-secondary/20 bg-primary/50 hover:bg-primary/80"
            classNames={{
              content:
                "font-semibold text-primary-500 dark:text-primary-600 text-xs space-x-2 rtl:space-x-reverse",
            }}
            variant="flat"
          >
            <span>نحن هنا</span>
            <span aria-label="emoji" role="img">
              🔥
            </span>
          </Chip>
          <h1 className="mx-auto text-pretty text-4xl font-medium tracking-tighter md:text-6xl">
            مرحبًا بكم في نادي المطورين المستقبليين!
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-balance text-lg">
            اكتشف وطور مهاراتك في البرمجة والتقنيات الحديثة مع نادي المطورين
            المستقبليين.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button onPress={onOpen} color="primary" variant="shadow">
              المزيد عن النادي
            </Button>
            <Modal
              isOpen={isOpen}
              placement="center"
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                <ModalHeader>فريق نادي مطوري المستقبل</ModalHeader>
                <ModalBody>
                  اذا كنت تقرأ هذا فيسعدنا أن تخبرنا باقتراحاتك عن الموقع أو
                  النادي عموما
                </ModalBody>
                <ModalFooter>
                  <Button
                    as={Link}
                    href="https://t.me/+e2kKkyiEqCw4ZTlk"
                    color="primary"
                    variant="solid"
                    size="sm"
                  >
                    اتصل بنا عبر التلغرام{" "}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="pointer-events-none absolute -top-32 flex h-full w-full items-center justify-end"
      >
        <div className="flex w-3/4 items-center justify-center">
          <div className="bg-light h-[600px] w-12 rounded-3xl blur-[70px] [will-change:transform] max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
        </div>
      </motion.div>
    </div>
  );
}
