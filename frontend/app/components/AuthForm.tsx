import Link from "next/link";
import type { SubmitEventHandler } from "react";

type AuthFormProps = {
  title: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showNameField?: boolean;
  showConfirmPasswordField?: boolean;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  onNameChange?: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  message?: string;
};

export default function AuthForm({
  title,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  showNameField = false,
  showConfirmPasswordField = false,
  name = "",
  email,
  password,
  confirmPassword = "",
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  message,
}: AuthFormProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">{title}</h1>

      {message && (
        <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
          {message}
        </p>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        {showNameField && (
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onNameChange?.(e.target.value)}
              placeholder="Entrez votre nom"
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Entrez votre email"
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
          />
        </div>

        {showConfirmPasswordField && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange?.(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black"
        >
          {buttonText}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        {footerText}{" "}
        <Link
          href={footerLinkHref}
          className="font-medium text-gray-900 hover:underline"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
