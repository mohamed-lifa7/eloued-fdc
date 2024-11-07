import { Check, MoveRight, PhoneCall } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Pricing = () => {
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Prices that make sense!
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Managing a small business today is already tough.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 pt-20 text-left lg:grid-cols-3">
            <Card className="w-full rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row items-center gap-4 font-normal">
                    Startup
                  </span>
                </CardTitle>
                <CardDescription>
                  Our goal is to streamline SMB trade, making it easier and
                  faster than ever for everyone and everywhere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-start gap-8">
                  <p className="flex flex-row  items-center gap-2 text-xl">
                    <span className="text-4xl">$40</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </p>
                  <div className="flex flex-col justify-start gap-4">
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-4">
                    Sign up today <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full rounded-md shadow-2xl">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row items-center gap-4 font-normal">
                    Growth
                  </span>
                </CardTitle>
                <CardDescription>
                  Our goal is to streamline SMB trade, making it easier and
                  faster than ever for everyone and everywhere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-start gap-8">
                  <p className="flex flex-row  items-center gap-2 text-xl">
                    <span className="text-4xl">$40</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </p>
                  <div className="flex flex-col justify-start gap-4">
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="gap-4">
                    Sign up today <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row items-center gap-4 font-normal">
                    Enterprise
                  </span>
                </CardTitle>
                <CardDescription>
                  Our goal is to streamline SMB trade, making it easier and
                  faster than ever for everyone and everywhere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-start gap-8">
                  <p className="flex flex-row  items-center gap-2 text-xl">
                    <span className="text-4xl">$40</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </p>
                  <div className="flex flex-col justify-start gap-4">
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="mt-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <p>Fast and reliable</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ve made it fast and reliable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-4">
                    Book a meeting <PhoneCall className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
