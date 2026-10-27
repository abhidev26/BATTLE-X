
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Crosshair,
  Gamepad2,
  Medal,
  Shield,
  Swords,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  { label: "TOTAL MATCHES", value: "128", change: "+12 this week", icon: Gamepad2 },
  { label: "WIN RATE", value: "24.8%", change: "+3.2% this month", icon: Trophy },
  { label: "TOTAL KILLS", value: "846", change: "+86 this week", icon: Crosshair },
  { label: "K/D RATIO", value: "2.64", change: "Top performance", icon: Target },
];

const matches = [
  { map: "Erangel", mode: "Ranked • Squad", result: "VICTORY", kills: 12, xp: "+840 XP", color: "#ef233c" },
  { map: "Miramar", mode: "Classic • Duo", result: "TOP 10", kills: 7, xp: "+420 XP", color: "#ffc857" },
  { map: "Sanhok", mode: "Ranked • Squad", result: "ELIMINATED", kills: 5, xp: "+260 XP", color: "#8b95a7" },
];

const activities = [
  { title: "Match completed", detail: "Erangel • 12 eliminations", time: "8 min ago" },
  { title: "Rank points earned", detail: "+48 competitive points", time: "32 min ago" },
  { title: "Daily mission progress", detail: "Play 3 matches • 2/3", time: "1 hour ago" },
];

function SectionTitle({ children, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-lg font-black uppercase tracking-wider text-white">{children}</h2>
      {action && <span className="text-xs font-bold uppercase tracking-wider text-bz-muted">{action}</span>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen space-y-7 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-bz-border bg-bz-panel p-6 sm:p-9"
      >
        <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-bz-red opacity-10 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-bz-red/30 bg-bz-red/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-bz-red">
              <span className="h-2 w-2 animate-pulse rounded-full bg-bz-red" />
              Combat operations online
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              WELCOME BACK, <span className="text-bz-red">SOLDIER.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-bz-muted sm:text-base">
              Your battlefield overview is ready. Review your performance, track your progress, and prepare for the next drop.
            </p>
          </div>
          <a
            href="/lobby"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-bz-red px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:scale-[1.03] hover:bg-red-600"
          >
            <Swords size={18} /> Enter Battlefield <ArrowUpRight size={17} />
          </a>
        </div>
      </motion.header>

      <section>
        <SectionTitle action="Performance overview">Combat statistics</SectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-bz-border bg-bz-panel p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-bz-muted">{stat.label}</span>
                  <div className="rounded-xl bg-bz-red/10 p-2.5 text-bz-red"><Icon size={20} /></div>
                </div>
                <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-bz-green">
                  <ArrowUpRight size={14} /> {stat.change}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-bz-border bg-bz-panel p-5 sm:p-6 xl:col-span-2">
          <SectionTitle action="Latest activity">Recent matches</SectionTitle>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <motion.div
                key={match.map}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col gap-4 rounded-xl border border-bz-border bg-bz-dark/70 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-bz-border p-3" style={{ color: match.color }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <div className="font-extrabold">{match.map}</div>
                    <div className="mt-1 text-xs text-bz-muted">{match.mode}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div>
                    <div className="text-xs font-black" style={{ color: match.color }}>{match.result}</div>
                    <div className="mt-1 text-xs text-bz-muted">{match.kills} eliminations</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{match.xp}</div>
                    <div className="mt-1 text-xs text-bz-muted">Experience</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <a href="/matches" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-bz-red hover:text-white">
            View all matches <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="rounded-2xl border border-bz-border bg-bz-panel p-5 sm:p-6">
          <SectionTitle>Live activity</SectionTitle>
          <div className="mb-5 flex items-center gap-2 text-xs font-bold text-bz-green">
            <Activity size={15} /> SYSTEM OPERATIONAL
          </div>
          <div className="space-y-5">
            {activities.map((activity, index) => (
              <div key={activity.title} className="flex gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bz-red/10 text-bz-red">
                  {index === 0 ? <Swords size={17} /> : index === 1 ? <Zap size={17} /> : <Medal size={17} />}
                </div>
                <div>
                  <div className="text-sm font-bold">{activity.title}</div>
                  <div className="mt-1 text-xs text-bz-muted">{activity.detail}</div>
                  <div className="mt-2 text-[11px] text-bz-muted">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl border border-bz-border bg-bz-panel p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold tracking-widest text-bz-muted">COMPETITIVE RANK</div>
              <div className="mt-3 text-2xl font-black">Platinum III</div>
              <div className="mt-2 text-sm text-bz-muted">640 / 800 rank points</div>
            </div>
            <div className="rounded-2xl bg-bz-red/10 p-3 text-bz-red"><Trophy size={26} /></div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-bz-border">
            <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-bz-red" />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl border border-bz-border bg-bz-panel p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold tracking-widest text-bz-muted">SQUAD STATUS</div>
              <div className="mt-3 text-2xl font-black">Ready to deploy</div>
              <div className="mt-2 text-sm text-bz-muted">Find teammates and join your next match.</div>
            </div>
            <div className="rounded-2xl bg-bz-red/10 p-3 text-bz-red"><Users size={26} /></div>
          </div>
          <a href="/lobby" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-bz-border px-4 py-2.5 text-xs font-black uppercase tracking-wider transition hover:border-bz-red hover:text-bz-red">
            Find a squad <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </section>

      <p className="pb-3 text-center text-xs text-bz-muted">
        BATTLE X COMMAND CENTER · Demo statistics only · Backend integration planned
      </p>
    </div>
  );
}
