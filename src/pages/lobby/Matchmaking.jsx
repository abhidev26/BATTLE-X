
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Crosshair, LoaderCircle, MapPin, Shield, Swords, Users, XCircle } from "lucide-react";

export default function Matchmaking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "squad";
  const map = params.get("map") || "erangel";
  const region = params.get("region") || "Asia";
  const [seconds, setSeconds] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [cancelled]);

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-bz-dark p-4 text-white">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-bz-border bg-bz-panel"
      >
        <div className="relative overflow-hidden border-b border-bz-border p-7 text-center sm:p-10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-bz-red/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-bz-red/40 bg-bz-red/10 text-bz-red">
              {cancelled ? <XCircle size={30} /> : <LoaderCircle size={30} className="animate-spin" />}
            </div>
            <p className="mt-6 text-xs font-black tracking-[0.3em] text-bz-red">BATTLE X / MATCH SERVICES</p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              {cancelled ? "QUEUE CANCELLED" : "SEARCHING FOR PLAYERS"}
            </h1>
            <p className="mt-3 text-sm text-bz-muted">
              {cancelled ? "Your demo queue has stopped." : "Scanning the selected region for a suitable match..."}
            </p>
            {!cancelled && (
              <div className="mt-6 font-mono text-4xl font-black tracking-widest">{time}</div>
            )}
          </div>
        </div>

        <div className="space-y-4 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-bz-border bg-bz-dark p-4">
              <MapPin size={18} className="mb-3 text-bz-red" />
              <div className="text-[10px] font-bold tracking-widest text-bz-muted">BATTLEFIELD</div>
              <div className="mt-1 font-black uppercase">{map}</div>
            </div>
            <div className="rounded-xl border border-bz-border bg-bz-dark p-4">
              <Users size={18} className="mb-3 text-bz-red" />
              <div className="text-[10px] font-bold tracking-widest text-bz-muted">GAME MODE</div>
              <div className="mt-1 font-black uppercase">{mode}</div>
            </div>
            <div className="rounded-xl border border-bz-border bg-bz-dark p-4">
              <Shield size={18} className="mb-3 text-bz-red" />
              <div className="text-[10px] font-bold tracking-widest text-bz-muted">REGION</div>
              <div className="mt-1 font-black">{region}</div>
            </div>
          </div>

          {!cancelled && (
            <div className="rounded-xl border border-bz-border bg-bz-dark p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-bold text-bz-muted">Searching status</span>
                <span className="animate-pulse font-black text-bz-red">IN PROGRESS</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bz-border">
                <motion.div
                  className="h-full rounded-full bg-bz-red"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{ width: "45%" }}
                />
              </div>
              <p className="mt-3 text-xs text-bz-muted">
                This is a simulated queue. No real players are being matched yet.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/lobby")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-bz-border px-4 py-3 text-sm font-bold transition hover:border-bz-red"
            >
              <ArrowLeft size={16} /> Back to lobby
            </button>
            {!cancelled && (
              <button
                type="button"
                onClick={() => setCancelled(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-bz-red px-4 py-3 text-sm font-black transition hover:bg-red-600"
              >
                <XCircle size={16} /> Cancel search
              </button>
            )}
            {cancelled && (
              <button
                type="button"
                onClick={() => navigate("/lobby")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-bz-red px-4 py-3 text-sm font-black transition hover:bg-red-600"
              >
                <Swords size={16} /> Choose another match
              </button>
            )}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
