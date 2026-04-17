"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../lib/api";
import { useUser } from "../context/UserContext";
import type { SubmitEventHandler } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const { setUserInfo } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });
      setUserInfo(data);

      if (redirect) {
        router.push(`/${redirect}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <section className="py-10">
      <AuthForm
        title="Connexion"
        buttonText="Se connecter"
        footerText="Vous n'avez pas de compte ?"
        footerLinkText="Inscription"
        footerLinkHref="/register"
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={submitHandler}
        message={message}
      />
    </section>
  );
}
