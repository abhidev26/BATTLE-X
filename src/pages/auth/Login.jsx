
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Gamepad2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    // Demo-only authentication. Replace with a real API later.
    window.setTimeout(() => {
      localStorage.setItem("bz_demo_authenticated", "true");
      localStorage.setItem("bz_demo_email", email.trim().toLowerCase());

      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });
      setLoading(false);
    }, 500);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bz-dark px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-bz-red/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-red-900/10 blur-[120px]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-bz-border bg-bz-panel shadow-2xl lg:grid-cols-2"
      >
        <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-gradient-to-br from-red-950 via-bz-dark to-black p-10 lg:flex">
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
              Enter the battlefield
            </p>
            <h1 className="text-5xl font-black leading-tight">
              YOUR NEXT
              <br />
              <span className="text-bz-red">VICTORY</span>
              <br />
              STARTS HERE.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Return to your squad, track your progress, and prepare for your
              next mission.
            </p>
          </div>

          <div className="relative flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={16} className="text-bz-red" />
            Player access portal · Demo mode
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
              Player authentication
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Sign in to continue to your command center.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-gray-300">
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 transition focus-within:border-bz-red">
                  <Mail size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="login-email"
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
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-bz-border bg-bz-dark px-4 transition focus-within:border-bz-red">
                  <LockKeyhole size={18} className="shrink-0 text-gray-500" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
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

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-bz-red hover:text-red-300">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-bz-red px-5 py-4 font-bold transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Enter BATTLE X"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-400">
              New player?{" "}
              <Link to="/register" className="font-bold text-bz-red hover:text-red-300">
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-600">
              Prototype only. Do not use a real password in this demo.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
