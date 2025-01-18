import { Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CodingTips = () => {
  return (
    <Card className="mx-auto mt-8 w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code2 className="mr-2" />
          Coding Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Read the problem statement carefully and understand all
            requirements.
          </li>
          <li>Consider edge cases and handle them in your solution.</li>
          <li>Optimize your code for better performance when possible.</li>
          <li>Use meaningful variable names and add comments for clarity.</li>
          <li>
            Test your code with various inputs, including the provided example.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CodingTips;
