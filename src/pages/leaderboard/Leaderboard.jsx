
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, Medal, Search, Trophy, Crosshair, Target, Users, Swords
} from "lucide-react";

const players = [
  { name: "SHADOWX", points: 9850, kills: 2450, kd: "5.82", wins: 142, mode: "Squad" },
  { name: "DEMON_99", points: 9240, kills: 2180, kd: "5.24", wins: 128, mode: "Squad" },
  { name: "ABHISHEK", points: 8840, kills: 1842, kd: "3.74", wins: 86, mode: "Squad" },
  { name: "VENOM", points: 8210, kills: 1720, kd: "4.10", wins: 91, mode: "Solo" },
  { name: "PHANTOM", points: 7950, kills: 1600, kd: "3.92", wins: 82, mode: "Duo" },
  { name: "REAPER", points: 7680, kills: 1490, kd: "3.65", wins: 76, mode: "Solo" },
  { name: "NIGHTOWL", points: 7420, kills: 1380, kd: "3.40", wins: 69, mode: "Duo" },
  { name: "RAVEN", points: 7190, kills: 1290, kd: "3.25", wins: 64, mode: "Squad" },
  { name: "BLAZE", points: 6980, kills: 1180, kd: "3.10", wins: 59, mode: "Solo" },
  { name: "WOLF", points: 6750, kills: 1050, kd: "2.95", wins: 52, mode: "Duo" },
];

const filters = ["All", "Solo", "Duo", "Squad"];

export default function Leaderboard() {
  const [mode, setMode] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) => mode === "All" || player.mode === mode)
      .filter((player) => player.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.points - a.points);
  }, [mode, search]);

  const podium = filteredPlayers.slice(0, 3);
  const remaining = filteredPlayers.slice(3);

  return (
    <div className="min-h-screen space-y-8 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-bz-red">Competitive arena</p>
          <h1 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Global <span className="text-bz-red">Leaderboard</span>
          </h1>
          <p className="mt-2 text-sm text-bz-muted">Compete, climb the ranks and dominate the battlefield.</p>
        </div>
        <div className="rounded-lg border border-bz-border bg-bz-panel px-4 py-3 text-xs font-bold text-bz-green">
          SEASON 01 · DEMO DATA
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Ranked Players", value: "12,840", icon: Users },
          { label: "Total Eliminations", value: "2.4M", icon: Crosshair },
          { label: "Season Matches", value: "86.2K", icon: Swords },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-bz-border bg-bz-panel p-5">
              <div className="flex items-center justify-between text-bz-muted">
                <span className="text-xs font-bold uppercase">{item.label}</span>
                <Icon size={20} className="text-bz-red" />
              </div>
              <p className="mt-3 text-3xl font-black">{item.value}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-bz-border bg-bz-panel p-5 sm:p-7">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black uppercase">Top Champions</h2>
            <p className="mt-1 text-xs text-bz-muted">Current leaders in this selected category</p>
          </div>
          <Trophy className="text-yellow-400" size={25} />
        </div>

        {podium.length > 0 ? (
          <div className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-2 sm:gap-5">
            {[podium[1], podium[0], podium[2]].map((player, index) => {
              if (!player) return <div key={index} />;
              const actualRank = index === 1 ? 1 : index === 0 ? 2 : 3;
              const height = actualRank === 1 ? "h-48" : actualRank === 2 ? "h-36" : "h-28";
              return (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="text-center"
                >
                  <div className="mb-3 flex flex-col items-center">
                    {actualRank === 1
                      ? <Crown className="mb-2 text-yellow-400" size={27} />
                      : <Medal className={`mb-2 ${actualRank === 2 ? "text-gray-300" : "text-orange-400"}`} size={23} />}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-bz-dark text-lg font-black sm:h-16 sm:w-16 sm:text-2xl ${actualRank === 1 ? "border-yellow-400 text-yellow-400" : "border-bz-border text-white"}`}>
                      {player.name.slice(0, 1)}
                    </div>
                    <p className="mt-2 max-w-full truncate text-xs font-black sm:text-sm">{player.name}</p>
                    <p className="mt-1 text-[10px] text-bz-muted">{player.points.toLocaleString()} PTS</p>
                  </div>
                  <div className={`${height} flex items-center justify-center rounded-t-xl border border-bz-border ${actualRank === 1 ? "bg-yellow-500/15" : "bg-bz-dark"}`}>
                    <span className={`text-4xl font-black ${actualRank === 1 ? "text-yellow-400" : "text-bz-muted"}`}>
                      {actualRank}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-bz-muted">No players found for this search.</p>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-bz-border bg-bz-panel">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <h2 className="text-lg font-black uppercase">Player Rankings</h2>
            <p className="mt-1 text-xs text-bz-muted">Season performance table</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bz-muted" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search player..."
              className="w-full rounded-lg border border-bz-border bg-bz-dark py-3 pl-9 pr-3 text-sm outline-none focus:border-bz-red"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setMode(filter)}
              className={`rounded-lg px-4 py-2 text-xs font-black uppercase transition ${mode === filter ? "bg-bz-red text-white" : "border border-bz-border bg-bz-dark text-bz-muted hover:border-bz-red"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-bz-dark text-[10px] uppercase tracking-wider text-bz-muted">
              <tr>
                <th className="px-5 py-4">Rank / Player</th>
                <th className="px-5 py-4">Mode</th>
                <th className="px-5 py-4">Points</th>
                <th className="px-5 py-4">Kills</th>
                <th className="px-5 py-4">K/D</th>
                <th className="px-5 py-4">Wins</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={player.name} className="border-t border-bz-border transition hover:bg-white/[0.03]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 font-black ${index < 3 ? "text-yellow-400" : "text-bz-muted"}`}>#{index + 1}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bz-red/10 font-black text-bz-red">{player.name[0]}</span>
                      <span className="font-bold">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-bz-muted">{player.mode}</td>
                  <td className="px-5 py-4 font-black text-yellow-400">{player.points.toLocaleString()}</td>
                  <td className="px-5 py-4">{player.kills.toLocaleString()}</td>
                  <td className="px-5 py-4">{player.kd}</td>
                  <td className="px-5 py-4 text-bz-green">{player.wins}</td>
                </tr>
              ))}
              {filteredPlayers.length === 0 && (
                <tr><td colSpan="6" className="px-5 py-10 text-center text-bz-muted">No matching players found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
