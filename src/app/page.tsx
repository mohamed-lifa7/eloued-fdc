import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          نادي المطورين المستقبليين
        </h1>
        <p className="mb-8 text-lg md:text-2xl">
          تمكين الطلاب من البناء والابتكار والتعاون.
        </p>
        <Button color="primary" size="lg">
          انضم إلينا الآن
        </Button>
      </section>
    </div>
  );
}