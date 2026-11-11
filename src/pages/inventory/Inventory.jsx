
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Sword,
  Shirt,
  Package,
  Sparkles,
  Lock,
  Check,
  X,
  Gift,
  Zap,
} from "lucide-react";

const initialItems = [
  { id: 1, name: "Inferno AKM", type: "Weapons", rarity: "Legendary", icon: "🔥", color: "text-orange-400", description: "A fiery legendary assault rifle skin." },
  { id: 2, name: "Phantom M416", type: "Weapons", rarity: "Epic", icon: "⚡", color: "text-purple-400", description: "A futuristic weapon skin." },
  { id: 3, name: "Shadow Sniper", type: "Weapons", rarity: "Rare", icon: "🎯", color: "text-blue-400", description: "A precision-inspired sniper skin." },
  { id: 4, name: "Royal Commander", type: "Outfits", rarity: "Legendary", icon: "👑", color: "text-orange-400", description: "A premium commander outfit." },
  { id: 5, name: "Night Assassin", type: "Outfits", rarity: "Epic", icon: "🥷", color: "text-purple-400", description: "A stealth-themed character outfit." },
  { id: 6, name: "Combat Helmet", type: "Accessories", rarity: "Rare", icon: "🪖", color: "text-blue-400", description: "A tactical helmet cosmetic." },
  { id: 7, name: "Golden Backpack", type: "Accessories", rarity: "Epic", icon: "🎒", color: "text-purple-400", description: "A golden backpack cosmetic." },
  { id: 8, name: "Victory Emote", type: "Accessories", rarity: "Common", icon: "🏆", color: "text-gray-300", description: "Celebrate your battlefield victories." },
];

const categories = ["All", "Weapons", "Outfits", "Accessories"];

const rarityStyles = {
  Legendary: "border-orange-400/40 bg-orange-400/10 text-orange-300",
  Epic: "border-purple-400/40 bg-purple-400/10 text-purple-300",
  Rare: "border-blue-400/40 bg-blue-400/10 text-blue-300",
  Common: "border-gray-400/30 bg-gray-400/10 text-gray-300",
};

export default function Inventory() {
  const [items, setItems] = useState(initialItems);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [crateOpened, setCrateOpened] = useState(false);
  const [crateReward, setCrateReward] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.type === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, category, search]);

  const equippedCount = items.filter((item) => item.equipped).length;

  function toggleEquip(id) {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        equipped: item.id === id ? !item.equipped : item.equipped,
      }))
    );
    setSelected(null);
  }

  function openCrate() {
    const rewards = [
      { name: "Crimson Rifle Skin", icon: "🔫", rarity: "Epic" },
      { name: "Golden Warrior Outfit", icon: "👑", rarity: "Legendary" },
      { name: "Shadow Helmet", icon: "🪖", rarity: "Rare" },
    ];

    const reward = rewards[items.length % rewards.length];
    setCrateReward(reward);
    setCrateOpened(true);
  }

  return (
    <div className="min-h-screen space-y-8 bg-bz-dark p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-bz-red">
            Player collection
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            My <span className="text-bz-red">Inventory</span>
          </h1>
          <p className="mt-2 text-sm text-bz-muted">
            Manage your weapons, outfits and battlefield equipment.
          </p>
        </div>
        <div className="rounded-lg border border-bz-border bg-bz-panel px-4 py-3">
          <p className="text-xs text-bz-muted">TOTAL ITEMS</p>
          <p className="mt-1 text-2xl font-black">{items.length}</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Items", value: items.length, icon: Package },
          { label: "Weapons", value: items.filter((i) => i.type === "Weapons").length, icon: Sword },
          { label: "Outfits", value: items.filter((i) => i.type === "Outfits").length, icon: Shirt },
          { label: "Equipped", value: equippedCount, icon: Shield },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-bz-border bg-bz-panel p-5">
              <div className="flex items-center justify-between text-bz-muted">
                <span className="text-xs font-bold uppercase">{stat.label}</span>
                <Icon size={20} className="text-bz-red" />
              </div>
              <p className="mt-3 text-3xl font-black">{stat.value}</p>
            </div>
          );
        })}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-bz-red/30 bg-gradient-to-r from-bz-panel to-bz-dark p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-bz-red/10 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-bz-red">
              <Gift size={22} />
              <span className="text-xs font-black uppercase tracking-widest">Special rewards</span>
            </div>
            <h2 className="mt-3 text-2xl font-black uppercase">Mystery Supply Crate</h2>
            <p className="mt-2 max-w-lg text-sm text-bz-muted">
              Discover a surprise cosmetic reward from the BATTLE X collection.
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-7xl"
          >
            📦
          </motion.div>
          <button
            onClick={openCrate}
            className="rounded-lg bg-bz-red px-6 py-3 text-xs font-black uppercase tracking-wider transition hover:bg-red-600"
          >
            Open Demo Crate
          </button>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black uppercase">Your Collection</h2>
            <p className="mt-1 text-xs text-bz-muted">Browse and manage your cosmetic items.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bz-muted" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search items..."
              className="w-full rounded-lg border border-bz-border bg-bz-panel py-3 pl-9 pr-3 text-sm outline-none focus:border-bz-red"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-lg px-4 py-2 text-xs font-black uppercase transition ${
                category === item
                  ? "bg-bz-red text-white"
                  : "border border-bz-border bg-bz-panel text-bz-muted hover:border-bz-red"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelected(item)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-bz-border bg-bz-panel transition hover:-translate-y-1 hover:border-bz-red/60"
            >
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-bz-dark to-bz-panel">
                <span className="text-7xl transition duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                {item.equipped && (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded bg-bz-green/10 px-2 py-1 text-[9px] font-black text-bz-green">
                    <Check size={12} /> EQUIPPED
                  </span>
                )}
                <span className={`absolute right-3 top-3 rounded border px-2 py-1 text-[9px] font-black uppercase ${rarityStyles[item.rarity]}`}>
                  {item.rarity}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-bz-muted">{item.type}</p>
                <h3 className="mt-2 font-black uppercase">{item.name}</h3>
                <button className="mt-4 w-full rounded-lg border border-bz-border py-2 text-[10px] font-black uppercase text-gray-300 transition group-hover:border-bz-red group-hover:text-bz-red">
                  View Item
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-xl border border-bz-border bg-bz-panel py-12 text-center text-sm text-bz-muted">
            No inventory items match your search.
          </div>
        )}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-bz-border bg-bz-panel p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-bz-red">Item details</p>
              <button onClick={() => setSelected(null)} aria-label="Close item details">
                <X size={20} className="text-bz-muted" />
              </button>
            </div>
            <div className="py-7 text-center">
              <span className="text-8xl">{selected.icon}</span>
              <h2 className="mt-5 text-2xl font-black uppercase">{selected.name}</h2>
              <span className={`mt-3 inline-block rounded border px-3 py-1 text-xs font-bold ${rarityStyles[selected.rarity]}`}>
                {selected.rarity}
              </span>
              <p className="mt-4 text-sm text-bz-muted">{selected.description}</p>
            </div>
            <button
              onClick={() => toggleEquip(selected.id)}
              className="w-full rounded-lg bg-bz-red py-3 text-xs font-black uppercase transition hover:bg-red-600"
            >
              {selected.equipped ? "Unequip Item" : "Equip Item"}
            </button>
          </motion.div>
        </div>
      )}

      {crateOpened && crateReward && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="w-full max-w-sm rounded-2xl border border-yellow-500/40 bg-bz-panel p-8 text-center"
          >
            <Sparkles className="mx-auto text-yellow-400" size={35} />
            <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-yellow-400">Reward unlocked</p>
            <div className="my-6 text-7xl">{crateReward.icon}</div>
            <h2 className="text-2xl font-black uppercase">{crateReward.name}</h2>
            <p className="mt-3 text-sm text-bz-muted">{crateReward.rarity} reward</p>
            <button
              onClick={() => setCrateOpened(false)}
              className="mt-7 w-full rounded-lg bg-bz-red py-3 text-xs font-black uppercase"
            >
              Collect Reward
            </button>
            <p className="mt-3 text-[10px] text-bz-muted">Demo reward only — not saved to your inventory.</p>
          </motion.div>
        </div>
      )}

      <p className="text-center text-[10px] uppercase tracking-widest text-bz-muted">
        BATTLE X · Inventory and crate rewards are demonstration features
      </p>
    </div>
  );
}
