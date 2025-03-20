"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import { useGoogleLogin } from "@react-oauth/google";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";

function SignIn() {
  const createUser = useMutation(api.users.createUser);
  const { user, setUser } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    flow: "implicit", // Ensures popup-based login
    onSuccess: async (tokenResponse) => {
      console.log("Google OAuth Token:", tokenResponse);

      if (typeof window !== "undefined") {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }

      let fetchedUser: any = null; // ✅ Correctly declare user

      try {
        fetchedUser = await GetAuthUserData(tokenResponse.access_token); // ✅ Assign value correctly
      } catch (error) {
        console.error("Error fetching user info:", error as Error);
      }

      if (fetchedUser) { // ✅ Check `fetchedUser`, not `user`
        const result = await createUser({
          name: fetchedUser.name,
          email: fetchedUser.email,
          picture: fetchedUser.picture,
        });

        setUser(result);
      } else {
        console.error("User data is undefined or null.");
      }
    },
    onError: (errorResponse) => console.error("Login Error:", errorResponse),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="flex flex-col items-center gap-[20px] border-[4px] rounded-[28px] p-[30px] bg-white w-[450px] 
        shadow-[0px_10px_25px_rgba(0,0,0,0.2)]"
        style={{ borderColor: "#d6d6d6" }}
      >
        <Image src="/logo.svg" alt="logo" width={80} height={80} />
        <h2 className="text-[1rem] font-medium text-center mt-[8px] mb-[12px] text-gray-700">
          Sign In To AI Personal Assistant & Agent
        </h2>
        <Button
          className="h-[45px] px-[12px] py-[20px] text-[1rem]"
          onClick={() => googleLogin()}
        >
          Sign in With Gmail
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
