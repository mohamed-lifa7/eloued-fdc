export const quiz = {
  topic: "جافاسكريبت",
  level: "مبتدئ",
  totalQuestions: 4,
  perQuestionScore: 5,
  questions: [
    {
      question:
        "ما هي الدالة المستخدمة لتحويل كائن إلى سلسلة JSON في جافاسكريبت؟",
      choices: ["stringify()", "parse()", "convert()", "لا شيء مما سبق"],
      type: "اختيار من متعدد",
      correctAnswer: "stringify()",
    },
    {
      question: "أي من الكلمات التالية تُستخدم لتعريف متغير في جافاسكريبت؟",
      choices: ["var", "let", "var و let", "لا شيء مما سبق"],
      type: "اختيار من متعدد",
      correctAnswer: "var و let",
    },
    {
      question:
        "أي من الطرق التالية يمكن استخدامها لعرض البيانات باستخدام جافاسكريبت؟",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "جميع ما سبق",
      ],
      type: "اختيار من متعدد",
      correctAnswer: "جميع ما سبق",
    },
    {
      question: "كيف يمكن تعريف نوع بيانات ليكون ثابتًا؟",
      choices: ["const", "var", "let", "constant"],
      type: "اختيار من متعدد",
      correctAnswer: "const",
    },
  ],
};
