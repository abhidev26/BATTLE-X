
import { motion } from "framer-motion";
import {
  Award, Crosshair, Crown, Flame, Medal, Shield, Skull, Star,
  Target, Trophy, Zap, Lock
} from "lucide-react";

const achievements = [
  { title: "First Blood", description: "Get your first elimination.", category: "Combat", icon: Crosshair, progress: 100, reward: "100 XP", unlocked: true },
  { title: "Elimination Expert", description: "Reach 100 total eliminations.", category: "Combat", icon: Skull, progress: 100, reward: "250 XP", unlocked: true },
  { title: "Battle Legend", description: "Win 100 matches.", category: "Wins", icon: Trophy, progress: 86, reward: "500 XP", unlocked: false },
  { title: "Unstoppable", description: "Win 10 matches in a row.", category: "Wins", icon: Flame, progress: 40, reward: "350 XP", unlocked: false },
  { title: "Sharp Shooter", description: "Get 500 headshot eliminations.", category: "Combat", icon: Target, progress: 68, reward: "300 XP", unlocked: false },
  { title: "Elite Warrior", description: "Reach Diamond rank.", category: "Rank", icon: Crown, progress: 100, reward: "600 XP", unlocked: true },
  { title: "Survivor", description: "Reach top 10 in 50 matches.", category: "Survival", icon: Shield, progress: 72, reward: "400 XP", unlocked: false },
  { title: "Speed Demon", description: "Complete 20 matches.", category: "Special", icon: Zap, progress: 100, reward: "200 XP", unlocked: true },
  { title: "Star Player", description: "Earn 10,000 season points.", category: "Special", icon: Star, progress: 88, reward: "450 XP", unlocked: false },
  { title: "Collector", description: "Unlock 25 achievements.", category: "Special", icon: Medal, progress: 32, reward: "700 XP", unlocked: false },
];

export default function Achievements() {
  const unlocked = achievements.filter((item) => item.unlocked).length;
  const progress = Math.round((unlocked / achievements.length) * 100);

  return (
    <div className="min-h-screen space-y-8 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-bz-red">Player rewards</p>
        <h1 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
          Achieve <span className="text-bz-red">Greatness</span>
        </h1>
        <p className="mt-2 text-sm text-bz-muted">Complete missions, unlock rewards and prove your skill.</p>
      </header>

      <section className="relative overflow-hidden rounded-2xl border border-bz-border bg-bz-panel p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-400" size={30} />
              <h2 className="text-xl font-black uppercase">Achievement Collection</h2>
            </div>
            <p className="mt-3 text-sm text-bz-muted">Your journey to becoming a battlefield legend.</p>
            <div className="mt-6 max-w-xl">
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span>OVERALL PROGRESS</span>
                <span className="text-yellow-400">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bz-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-yellow-400"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-center">
            <p className="text-4xl font-black text-yellow-400">{unlocked}/{achievements.length}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-bz-muted">Unlocked</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Unlocked", value: unlocked, icon: Award },
          { label: "Locked", value: achievements.length - unlocked, icon: Lock },
          { label: "Categories", value: "5", icon: Medal },
          { label: "Bonus XP", value: "1,150", icon: Zap },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-bz-border bg-bz-panel p-4">
              <Icon size={20} className="text-bz-red" />
              <p className="mt-3 text-2xl font-black">{item.value}</p>
              <p className="mt-1 text-xs text-bz-muted">{item.label}</p>
            </div>
          );
        })}
      </div>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">All Achievements</h2>
          <span className="text-xs font-bold text-bz-muted">SEASON 01 · DEMO</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border bg-bz-panel p-5 transition hover:-translate-y-1 ${item.unlocked ? "border-yellow-500/30" : "border-bz-border"}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.unlocked ? "bg-yellow-500/10 text-yellow-400" : "bg-bz-dark text-bz-muted"}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`rounded px-2 py-1 text-[9px] font-black uppercase tracking-wider ${item.unlocked ? "bg-yellow-500/10 text-yellow-400" : "bg-bz-dark text-bz-muted"}`}>
                    {item.unlocked ? "Unlocked" : "In Progress"}
                  </span>
                </div>
                <h3 className="mt-5 font-black uppercase">{item.title}</h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-bz-muted">{item.description}</p>
                <div className="mt-5 flex justify-between text-[10px] font-bold">
                  <span className="text-bz-muted">{item.category}</span>
                  <span className="text-yellow-400">{item.reward}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bz-border">
                  <div
                    className={`h-full rounded-full ${item.unlocked ? "bg-yellow-400" : "bg-bz-red"}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-[10px] text-bz-muted">{item.progress}% complete</p>
              </motion.article>
            );
          })}
        </div>
      </section>
      <p className="text-center text-[10px] uppercase tracking-widest text-bz-muted">
        BATTLE X · Achievement records are demonstration data
      </p>
    </div>
  );
}
