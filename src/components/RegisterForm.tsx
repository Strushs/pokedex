"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (form.username.length < 3) {
      newErrors.username = "Nazwa użytkownika musi mieć co najmniej 3 znaki.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Podaj poprawny adres e-mail.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Hasło musi mieć co najmniej 8 znaków.";
    } else if (!/[A-Za-z]/.test(form.password)) {
      newErrors.password = "Hasło musi zawierać przynajmniej jedną literę.";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Hasło musi zawierać przynajmniej jedną cyfrę.";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) {
      newErrors.password =
        "Hasło musi zawierać przynajmniej jeden znak specjalny.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie pasują do siebie.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentErrors = validate();
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});

    // Wymóg na 5.0 - wysyłanie danych do własnego API w Node.js (Route Handler w Next)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setServerMessage("Zarejestrowano poprawnie! " + data.message);
        router.push("/pokedex");
      } else {
        setServerMessage("Błąd: " + data.error);
      }
    } catch {
      setServerMessage("Wystąpił błąd podczas wysyłania do serwera.");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800 uppercase tracking-wider">
        Uzyskaj Dostęp
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
            Nazwa użytkownika
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
          />
          {errors.username && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.username}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
            Adres e-mail
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
            Hasło
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
          />
          {errors.password && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
            Potwierdź hasło
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {serverMessage && (
          <div
            className={`text-sm mt-4 p-3 rounded-lg text-center font-semibold ${serverMessage.startsWith("Błąd") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {serverMessage}
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-1"
          >
            Dołącz i otwórz Pokedex
          </button>
        </div>
      </form>
    </div>
  );
}
