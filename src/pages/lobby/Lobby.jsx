
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Crosshair, Shield, Swords, Map, Zap,
  ChevronRight, Clock3, Target, Trophy
} from "lucide-react";

const modes = [
  { id: "solo", name: "SOLO", players: "1 PLAYER", description: "Trust your instincts. Survive alone.", icon: Crosshair },
  { id: "duo", name: "DUO", players: "2 PLAYERS", description: "Two soldiers. One mission.", icon: Shield },
  { id: "squad", name: "SQUAD", players: "4 PLAYERS", description: "Build your squad and dominate.", icon: Users },
];

const maps = [
  { id: "erangel", name: "ERANGEL", subtitle: "CLASSIC BATTLEFIELD", terrain: "Forest • Fields • Military base" },
  { id: "miramar", name: "MIRAMAR", subtitle: "DESERT WARZONE", terrain: "Desert • Mountains • Cities" },
  { id: "sanhok", name: "SANHOK", subtitle: "JUNGLE COMBAT", terrain: "Jungle • Ruins • River" },
];

export default function Lobby() {
  const [mode, setMode] = useState("squad");
  const [selectedMap, setSelectedMap] = useState("erangel");
  const [region, setRegion] = useState("Asia");
  const [started, setStarted] = useState(false);

  const selectedMode = modes.find((item) => item.id === mode);
  const map = maps.find((item) => item.id === selectedMap);

  function deploy() {
    setStarted(true);
    window.location.href = `/matchmaking?mode=${mode}&map=${selectedMap}&region=${encodeURIComponent(region)}`;
  }

  return (
    <div className="min-h-screen space-y-7 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-bz-border bg-bz-panel p-6 sm:p-9"
      >
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-bz-red/20 blur-3xl" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-bz-red">
            <span className="h-2 w-2 animate-pulse rounded-full bg-bz-red" />
            BATTLE OPERATIONS
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            CHOOSE YOUR <span className="text-bz-red">BATTLE.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-bz-muted sm:text-base">
            Select your combat mode, choose your battlefield, and prepare for deployment.
          </p>
        </div>
      </motion.header>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black uppercase tracking-wider">01 / Combat mode</h2>
          <span className="text-xs text-bz-muted">SELECT ONE</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {modes.map((item, index) => {
            const Icon = item.icon;
            const active = mode === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-2xl border p-5 text-left transition ${
                  active ? "border-bz-red bg-bz-red/10 ring-1 ring-bz-red/30" : "border-bz-border bg-bz-panel hover:border-bz-muted"
                }`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${active ? "bg-bz-red text-white" : "bg-bz-dark text-bz-muted"}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider ${active ? "bg-bz-red text-white" : "bg-bz-dark text-bz-muted"}`}>
                    {active ? "SELECTED" : item.players}
                  </span>
                </div>
                <h3 className="text-2xl font-black">{item.name}</h3>
                <p className="mt-2 text-sm text-bz-muted">{item.description}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black uppercase tracking-wider">02 / Battlefield</h2>
          <Map size={18} className="text-bz-red" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {maps.map((item, index) => {
            const active = selectedMap === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedMap(item.id)}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                  active ? "border-bz-red bg-bz-red/10" : "border-bz-border bg-bz-panel hover:border-bz-muted"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.2em] text-bz-muted">{item.subtitle}</span>
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-bz-red" />}
                </div>
                <h3 className="text-2xl font-black tracking-wider">{item.name}</h3>
                <p className="mt-2 text-xs text-bz-muted">{item.terrain}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-bz-red">
                  <Target size={14} /> {active ? "BATTLEFIELD SELECTED" : "SELECT BATTLEFIELD"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-bz-border bg-bz-panel p-5 sm:p-6 xl:col-span-2">
          <h2 className="mb-5 text-lg font-black uppercase tracking-wider">03 / Deployment settings</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-bz-muted">Server region</span>
              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                className="w-full rounded-xl border border-bz-border bg-bz-dark px-4 py-3 text-sm outline-none focus:border-bz-red"
              >
                <option>Asia</option>
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
              </select>
            </label>
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-bz-muted">Selected operation</span>
              <div className="rounded-xl border border-bz-border bg-bz-dark px-4 py-3 text-sm font-bold">
                {selectedMode.name} <span className="mx-2 text-bz-muted">/</span> {map.name}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-bz-muted">
            <span className="inline-flex items-center gap-2 rounded-lg bg-bz-dark px-3 py-2"><Clock3 size={14} /> Matchmaking estimate varies</span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-bz-dark px-3 py-2"><Zap size={14} /> Region: {region}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-bz-red/40 bg-bz-panel p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-xs font-black tracking-[0.2em] text-bz-red">
            <Swords size={17} /> MISSION BRIEFING
          </div>
          <h3 className="text-2xl font-black">{selectedMode.name} DEPLOYMENT</h3>
          <p className="mt-2 text-sm leading-6 text-bz-muted">{selectedMode.description}</p>
          <div className="my-5 h-px bg-bz-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-bz-muted">Battlefield</span>
            <span className="font-bold">{map.name}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-bz-muted">Region</span>
            <span className="font-bold">{region}</span>
          </div>
          <button
            type="button"
            disabled={started}
            onClick={deploy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-bz-red px-4 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-red-600 disabled:cursor-wait disabled:opacity-70"
          >
            {started ? "Preparing deployment..." : "Find a match"} <ChevronRight size={18} />
          </button>
          <p className="mt-3 text-center text-[11px] text-bz-muted">
            Demo matchmaking interface — no live game server connected.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-bz-muted">
            <Trophy size={14} /> Play fair. Fight smart.
          </div>
        </div>
      </section>
    </div>
  );
}
