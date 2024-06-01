import { Question } from "@prisma/client";
import { db } from ".";

const questions = [
  {
    questionText: "Solve for x in the equation 2x^2 - 4x - 6 = 0.",
    options: [
      "x = 3 or x = -1",
      "x = -3 or x = 1",
      "x = 2 or x = -3",
      "x = -2 or x = 3",
    ],
    correctOptionIndex: 1,
    tags: ["Algebra", "Quadratic Equations"],
  },
  {
    questionText: "If f(x) = 3x^2 - 5x + 2, find f(2).",
    options: ["6", "4", "8", "10"],
    correctOptionIndex: 3,
    tags: ["Algebra", "Functions"],
  },
  {
    questionText:
      "The sum of the roots of the quadratic equation x^2 - 7x + 10 = 0 is:",
    options: ["10", "7", "5", "3"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Quadratic Equations"],
  },
  {
    questionText: "What is the value of log2 32?",
    options: ["4", "5", "6", "7"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Logarithms"],
  },
  {
    questionText:
      "In a right triangle, if one angle is 30 degrees, what is the ratio of the length of the hypotenuse to the length of the side opposite the 30 degrees angle?",
    options: ["1:2", "2:1", "sqrt(3):1", "1:sqrt(3)"],
    correctOptionIndex: 1,
    tags: ["Geometry", "Triangles"],
  },
  {
    questionText: "The area of a circle with radius r is:",
    options: ["2πr", "πr^2", "πr", "2πr^2"],
    correctOptionIndex: 1,
    tags: ["Geometry", "Circles"],
  },
  {
    questionText: "The sum of the interior angles of a pentagon is:",
    options: ["360 degrees", "540 degrees", "720 degrees", "900 degrees"],
    correctOptionIndex: 1,
    tags: ["Geometry", "Polygons"],
  },
  {
    questionText: "The volume of a cylinder with radius r and height h is:",
    options: ["πr^2h", "2πr^2h", "πrh", "2πrh"],
    correctOptionIndex: 1,
    tags: ["Geometry", "Solids"],
  },

  {
    questionText: "Solve for x: 3x - 5 = 16.",
    options: ["7", "6", "5", "4"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Linear Equations"],
  },
  {
    questionText: "If y = 3x + 2, what is the value of y when x = 4?",
    options: ["10", "11", "12", "14"],
    correctOptionIndex: 2,
    tags: ["Algebra", "Functions"],
  },
  {
    questionText:
      "Which of the following is a solution to the equation x^2 - 4x + 4 = 0?",
    options: ["0", "2", "4", "-2"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Quadratic Equations"],
  },
  {
    questionText: "What is the value of the expression 2^3 + 2^2?",
    options: ["12", "10", "8", "14"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Exponents"],
  },
  {
    questionText: "If f(x) = x^2 - 3x + 2, find f(3).",
    options: ["2", "0", "1", "3"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Functions"],
  },
  {
    questionText:
      "What is the slope of the line passing through the points (2, 3) and (4, 7)?",
    options: ["2", "1", "3", "4"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Linear Equations"],
  },
  {
    questionText: "Simplify the expression: 4x - 2(x - 3).",
    options: ["2x + 6", "2x - 6", "6x + 6", "2x + 3"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Simplification"],
  },
  {
    questionText:
      "What is the value of the discriminant of the quadratic equation x^2 - 4x + 4 = 0?",
    options: ["0", "4", "-4", "8"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Quadratic Equations"],
  },
  {
    questionText:
      "If a and b are solutions of the equation x^2 - 5x + 6 = 0, what is a + b?",
    options: ["6", "5", "2", "3"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Quadratic Equations"],
  },
  {
    questionText:
      "Which of the following represents the equation of a line with a slope of 2 and a y-intercept of -3?",
    options: ["y = 2x - 3", "y = -2x + 3", "y = 3x - 2", "y = -3x + 2"],
    correctOptionIndex: 0,
    tags: ["Algebra", "Linear Equations"],
  },
  {
    questionText: "Solve for x: 2(x - 3) = 4.",
    options: ["5", "2", "3", "4"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Linear Equations"],
  },
  {
    questionText: "If x + 1/x = 2, what is the value of x^2 + 1/x^2?",
    options: ["2", "0", "4", "1"],
    correctOptionIndex: 1,
    tags: ["Algebra", "Algebraic Identities"],
  },
];

const seed = async () => {
  console.log("........Running the seed script.......");

  await db.$transaction(
    questions.map((question) => db.question.create({ data: question }))
  );

  console.log("........Seeding finished.......");
};

seed();
