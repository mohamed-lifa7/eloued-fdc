export const quiz = {
  topic: "JavaScript",
  level: "Beginner",
  totalQuestions: 4,
  perQuestionScore: 5,
  questions: [
    {
      question:
        "What is the function used to convert an object to a JSON string in JavaScript?",
      choices: ["stringify()", "parse()", "convert()", "None of the above"],
      type: "Multiple Choice",
      correctAnswer: "stringify()",
    },
    {
      question:
        "Which of the following keywords is used to define a variable in JavaScript?",
      choices: ["var", "let", "var and let", "None of the above"],
      type: "Multiple Choice",
      correctAnswer: "var and let",
    },
    {
      question:
        "Which of the following methods can be used to display data using JavaScript?",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "All of the above",
      ],
      type: "Multiple Choice",
      correctAnswer: "All of the above",
    },
    {
      question: "How can you define a data type to be constant?",
      choices: ["const", "var", "let", "constant"],
      type: "Multiple Choice",
      correctAnswer: "const",
    },
  ],
};
