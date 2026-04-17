"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../lib/api";
import { useUser } from "../context/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const { setUserInfo } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const data = await registerUser({ name, email, password });
      setUserInfo(data);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <section className="py-10">
      <AuthForm
        title="Inscription"
        buttonText="S'inscrire"
        footerText="Vous avez déjà un compte ?"
        footerLinkText="Connexion"
        footerLinkHref="/login"
        showNameField
        showConfirmPasswordField
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={submitHandler}
        message={message}
      />
    </section>
  );
}
