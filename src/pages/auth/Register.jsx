
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Gamepad2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete every field.");
      return;
    }

    if (username.trim().length < 3) {
      setError("Your player name must contain at least 3 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Include at least one letter and one number in your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    // Demo-only profile. No real account is created.
    localStorage.setItem("bz_demo_authenticated", "true");
    localStorage.setItem("bz_demo_email", email.trim().toLowerCase());
    localStorage.setItem("bz_demo_username", username.trim());

    navigate("/", { replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bz-dark px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-bz-red/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-red-900/10 blur-[120px]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-bz-border bg-bz-panel shadow-2xl lg:grid-cols-2"
      >
        <div className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-red-950 via-bz-dark to-black p-10 lg:flex">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-10 top-20 h-48 w-48 rounded-full border border-red-400" />
            <div className="absolute left-20 top-32 h-64 w-64 rounded-full border border-red-400" />
            <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full border border-red-500" />
          </div>

          <Link to="/" className="relative flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-bz-red">
              <Gamepad2 size={26} />
            </span>
            <span className="text-xl font-black tracking-widest">
              BATTLE <span className="text-bz-red">X</span>
            </span>
          </Link>

          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-bz-red">
              Create your identity
            </p>
            <h1 className="text-5xl font-black leading-tight">
              JOIN THE
              <br />
              <span className="text-bz-red">BATTLE.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Build your player profile and get ready for your next mission.
            </p>
          </div>

          <div className="relative flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={16} className="text-bz-red" />
            Player registration · Demo mode
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-bz-red">
                  <Gamepad2 size={24} />
                </span>
                <span className="text-xl font-black tracking-widest">
                  BATTLE <span className="text-bz-red">X</span>
                </span>
              </Link>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-bz-red">
              New player
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Create account
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Set up your identity for the battlefield.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="register-username" className="mb-2 block text-sm font-semibold text-gray-300">
                  Player name
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 focus-within:border-bz-red">
                  <UserRound size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="register-username"
                    autoComplete="nickname"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Your gamer name"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-gray-300">
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 focus-within:border-bz-red">
                  <Mail size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="player@example.com"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 focus-within:border-bz-red">
                  <LockKeyhole size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="register-confirm" className="mb-2 block text-sm font-semibold text-gray-300">
                  Confirm password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 focus-within:border-bz-red">
                  <LockKeyhole size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="register-confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-bz-red px-5 py-4 font-bold transition hover:bg-red-600"
              >
                Create demo profile <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-bz-red hover:text-red-300">
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-gray-600">
              Prototype only. This form does not create a real account.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
