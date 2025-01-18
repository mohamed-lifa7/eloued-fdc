"use client";
import DOMPurify from "dompurify";

const RenderDOMPurify = ({ content }: { content: string }) => {
  return (
    <div
      className="prose max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default RenderDOMPurify;
