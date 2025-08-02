"use client";
import DarkVeil from "@/reactbits/Backgrounds/DarkVeil/DarkVeil";
import SplitText from "@/reactbits/TextAnimations/SplitText/SplitText";
import Input from "@/components/Input";
import { useState } from "react";
import { AURA } from "../../Aura/main";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Login = async () => {
    const Result = await AURA.Functions.AdminLogin({ email, password });
    if (Result) {
      localStorage.setItem("auth-aura", "Authed");
      router.push("/platform");
    } else {
      setError("Login Failed, Please check your Email and Password");
    }
  };
  return (
    <div className="w-full relative h-screen">
      <div className="absolute w-full h-full">
        <DarkVeil
          speed={2}
          hueShift={304}
          noiseIntensity={0.01}
          scanlineIntensity={0}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <div className="relative flex items-center flex-col justify-start h-screen">
        <SplitText
          text="Welcome to Fixed Assets over capacity platform"
          className="text-6xl font-semibold text-center py-44"
          delay={30}
          duration={0.1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <div className="w-xl flex p-16 gap-4 flex-col border bg-neutral-900 backdrop-blur-md rounded-2xl border-neutral-700">
          <div className="mb-4">
            <h1>SEBN TN - Controlling department</h1>
            <p className="text-sm">Sign in to your account</p>
          </div>
          {error.length != 0 && <p className="text-red-500">{error}</p>}
          <Input type="email" placeholder="Your Email" onChange={setEmail} />
          <Input
            type="password"
            placeholder="Your Password"
            onChange={setPassword}
            passwordStrength={false}
          />
          <p className="text-xs text-white/40">Having trouble logging in?</p>
          <button
            onClick={Login}
            className="cursor-pointer bg-white text-black py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
