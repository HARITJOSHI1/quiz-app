import AuthStyles from "@/components/authStyles";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <AuthStyles>
      <SignUp
        appearance={{
          elements: {
            card: "p-8 border-0 rounded-none",
            cardBox: "shadow-none drop-shadow-none border-0",
            footer: "bg-none border-0",
            formButtonPrimary:
              "bg-teal-500 !outline-0 !border-0 hover:bg-teal-700 p-3 text-md",
            headerTitle: "text-4xl mb-2",
            formFieldInput: "p-2 text-md",
            socialButtonsBlockButton:
              "p-3 border-solid border-teal-300 bg-teal-200 hover:bg-teal-400",
          },

          variables: {
            fontFamily: "Inter",
          },
        }}
      />
    </AuthStyles>
  );
};

export default page;
