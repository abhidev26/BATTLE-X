
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Crosshair,
  Crown,
  Flame,
  Gamepad2,
  Medal,
  Shield,
  Swords,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Total Matches", value: "248", icon: Gamepad2, color: "text-blue-400" },
  { label: "Total Wins", value: "86", icon: Trophy, color: "text-yellow-400" },
  { label: "Total Kills", value: "1,842", icon: Crosshair, color: "text-red-400" },
  { label: "K/D Ratio", value: "3.74", icon: Target, color: "text-green-400" },
];

const matches = [
  { map: "ERANGEL", mode: "SQUAD · CLASSIC", result: "WINNER", kills: 12, placement: "#1", xp: "+450 XP" },
  { map: "MIRAMAR", mode: "DUO · CLASSIC", result: "TOP 5", kills: 8, placement: "#4", xp: "+280 XP" },
  { map: "SANHOK", mode: "SOLO · RANKED", result: "TOP 10", kills: 6, placement: "#8", xp: "+190 XP" },
];

const achievements = [
  { title: "First Blood", description: "Get your first elimination", icon: Crosshair },
  { title: "Warrior", description: "Win 25 matches", icon: Swords },
  { title: "Survivor", description: "Reach top 10 fifty times", icon: Shield },
  { title: "Champion", description: "Reach Diamond rank", icon: Crown },
];

export default function Profile() {
  return (
    <div className="min-h-screen space-y-8 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-bz-red">
            Player identity
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            My <span className="text-bz-red">Profile</span>
          </h1>
          <p className="mt-2 text-sm text-bz-muted">
            Your battlefield record and competitive journey.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-bz-border bg-bz-panel px-4 py-3">
          <Activity size={17} className="text-bz-green" />
          <span className="text-xs font-bold text-bz-green">PLAYER ACTIVE</span>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-bz-border bg-bz-panel p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-bz-red/10 blur-3xl" />
        <div className="relative flex flex-col gap-7 md:flex-row md:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 border-bz-red bg-bz-dark shadow-[0_0_35px_rgba(239,35,60,0.2)]">
            <span className="text-4xl font-black text-bz-red">A</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-black uppercase">ABHISHEK</h2>
              <span className="rounded bg-bz-red/15 px-3 py-1 text-[10px] font-black tracking-widest text-bz-red">
                PRO PLAYER
              </span>
            </div>
            <p className="mt-2 text-sm text-bz-muted">PLAYER ID: BZX-2026-001</p>
            <div className="mt-5 flex flex-wrap gap-5 text-xs font-bold text-gray-300">
              <span className="flex items-center gap-2"><Medal size={15} className="text-yellow-400" /> DIAMOND III</span>
              <span className="flex items-center gap-2"><Flame size={15} className="text-orange-400" /> 12 DAY STREAK</span>
              <span className="flex items-center gap-2"><Zap size={15} className="text-blue-400" /> LEVEL 42</span>
            </div>
          </div>

          <div className="min-w-40 rounded-xl border border-bz-border bg-bz-dark p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-bz-muted">Current rank</p>
            <div className="mt-2 flex items-center gap-2">
              <Crown className="text-yellow-400" size={25} />
              <span className="text-2xl font-black">DIAMOND</span>
            </div>
            <p className="mt-1 text-xs text-bz-muted">2,840 Rank Points</p>
          </div>
        </div>

        <div className="relative mt-8 border-t border-bz-border pt-6">
          <div className="mb-3 flex justify-between text-xs font-bold">
            <span className="text-gray-300">LEVEL 42 PROGRESS</span>
            <span className="text-bz-red">7,250 / 10,000 XP</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-bz-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72.5%" }}
              transition={{ duration: 1.2 }}
              className="h-full rounded-full bg-bz-red shadow-[0_0_12px_rgba(239,35,60,0.6)]"
            />
          </div>
          <p className="mt-2 text-right text-[11px] text-bz-muted">2,750 XP to next level</p>
        </div>
      </motion.section>

      <section>
        <h3 className="mb-4 text-lg font-black uppercase tracking-wider">Battle Statistics</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-bz-border bg-bz-panel p-5 transition hover:-translate-y-1 hover:border-bz-red/50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-bz-muted">{stat.label}</p>
                  <Icon size={20} className={stat.color} />
                </div>
                <p className="mt-4 text-3xl font-black">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-bz-border bg-bz-panel p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase">Recent Matches</h3>
            <span className="text-xs font-bold text-bz-red">DEMO RECORDS</span>
          </div>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <motion.div
                key={match.map}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-bz-border bg-bz-dark p-4"
              >
                <div>
                  <p className="font-black tracking-wider">{match.map}</p>
                  <p className="mt-1 text-[10px] text-bz-muted">{match.mode}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-bz-green">{match.result}</p>
                  <p className="mt-1 text-[10px] text-bz-muted">{match.placement}</p>
                </div>
                <div className="text-center">
                  <p className="font-black">{match.kills} KILLS</p>
                  <p className="mt-1 text-[10px] text-bz-muted">Eliminations</p>
                </div>
                <span className="text-xs font-bold text-yellow-400">{match.xp}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-bz-border bg-bz-panel p-5">
          <h3 className="mb-5 text-lg font-black uppercase">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-yellow-500/20 bg-yellow-500/10">
                    <Icon size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-[11px] text-bz-muted">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <p className="text-center text-[10px] uppercase tracking-widest text-bz-muted">
        BATTLE X · Player statistics shown are demonstration data
      </p>
    </div>
  );
}
