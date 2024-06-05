# QuizMaster

QuizMaster is a simple and intuitive quiz-taking application designed to make learning fun and engaging. Built with the latest web technologies, QuizMaster offers a seamless experience for both quiz creators and participants.

## Features

- **User Authentication**: Secure login and registration using OAuth.
- **Responsive Design**: Mobile-friendly interface to take quizzes on any device.
- **Analytics Dashboard**: Track quiz performance with detailed analytics.
- **Score Management**: Quizzes with automated scoring.
- ... and many more

## Tech Stack

QuizMaster leverages a robust stack of modern technologies to ensure high performance and scalability.

- **[Next.js](https://nextjs.org/)**: A React framework for building fast and user-friendly web applications.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Node.js](https://nodejs.org/)**: A JavaScript runtime for server-side programming.
- **[Express.js](https://expressjs.com/)**: A fast, unopinionated, minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database for storing quiz data.
- **[Prisma ORM](https://www.prisma.io/)**: A type-safe ORM used as an interface to write MongoDB queries.

## Getting Started

Follow these steps to get QuizMaster up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/HARITJOSHI1/quizzer.git
    cd quizzer
    ```

2. **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    #or
    bun install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your MongoDB connection string and Firebase configuration:

    ```js

    // since project is for public purposes use it, soon I will delete these particular instances 

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1lcmdpbmctZm93bC0yMC5jbGVyay5hY2NvdW50cy5kZXYk
    CLERK_SECRET_KEY=sk_test_zxpyOnUIPXj6XzkzDcbPmjYcQptg79xODDhKFhNWmt
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    MONGODB_URI="mongodb+srv://harit:demolution@cluster0.eqsj0w2.mongodb.net/quizzer"
    ```

4. **Run the development server:**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

## Contributing

We welcome contributions from the community! To contribute to QuizMaster, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out at [joshiharit3@gmail.com](mailto:joshiharit3@gmail.com).

---

**Happy Quizzing!**
