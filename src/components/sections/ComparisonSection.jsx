import React from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "../ui/AnimatedTitle";
import ScrambleHeader from "../ui/ScrambleHeader";

const ComparisonTable = () => {
  const data = [
    {
      category: "Tech Arsenal ⚔️",
      xtoic: "Cutting-edge React & Tailwind wizardry",
      bigAgency: "Legacy PHP relics with jQuery dust",
      fiverr: "Template mashups & copy-paste magic",
      other: "Stuck in the 2010s with outdated tools",
    },
    {
      category: "Speed Demon ⚡",
      xtoic: "Lightning-fast 2-3 week sprints",
      bigAgency: "Slow-cooked 1-3 month marathons",
      fiverr: "Freelancer mood swings dictate pace",
      other: "You might get it... someday",
    },
    {
      category: "Design Swagger 🎨",
      xtoic: "Custom sleek vibes that wow users",
      bigAgency: "Corporate cookie-cutter yawnfest",
      fiverr: "Mixed bag – hit or miss",
      other: "Last decade’s leftovers",
    },
    {
      category: "Price Tag 💰",
      xtoic: "Fair, clear, and wallet-friendly",
      bigAgency: "Sky-high with surprise fees",
      fiverr: "Cheap, but quality varies",
      other: "Mystery charges lurking",
    },
    {
      category: "Support Squad 🤝",
      xtoic: "Always-on, superhero-level support",
      bigAgency: "Contract locked, good luck",
      fiverr: "If you can find them...",
      other: "Crickets chirping",
    },
    {
      category: "Innovation Juice 🚀",
      xtoic: "Ahead of the curve, always experimenting",
      bigAgency: "Slow adopters stuck in the past",
      fiverr: "Limited toolbox, limited tricks",
      other: "Dusty and forgotten",
    },
  ];

  const columns = [
    { key: "xtoic", label: "XTOIC STUDIO" },
    { key: "bigAgency", label: "Big Web Agency" },
    { key: "fiverr", label: "Fiver Freelancers" },
    { key: "other", label: "Other Web Dev Companies" },
  ];

  return (
    <div className="min-h-screen w-full bg-lightGray p-6 md:p-12">
      <div className="relative mb-16 flex flex-col items-center gap-6 max-w-full mx-auto text-center">
        <ScrambleHeader tagline="Why Choose XTOIC Studio?" />
        <AnimatedTitle
          title="See <b>For</b> Yourself"
          className="special-font !text-3xl md:!text-6xl font-zentry font-black leading-[1]"
          textColor="text-mattBlack"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:grid md:grid-cols-5 max-w-7xl mx-auto  overflow-hidden">
        {/* Header Row */}
        <div className="p-6 bg-lightGray"></div>
        {columns.map((col) => (
          <div
            key={col.key}
            className={`p-6 text-center font-semibold text-lg  ${
              col.key === "xtoic"
                ? "bg-carbonBlack/60 text-lightGray rounded-t-2xl"
                : "bg-lightGray text-mattBlack"
            }`}
          >
            {col.label}
          </div>
        ))}

        {/* Data Rows */}
        {data.map((row, idx) => (
          <React.Fragment key={idx}>
            <div className="p-6 border-t border-mattBlack/50 font-medium text-mattBlack bg-lightGray">
              {row.category}
            </div>

            {columns.map((col) => (
              <div
                key={col.key}
                className={`p-6 border-t border-mattBlack/50 ${
                  col.key === "xtoic"
                    ? `bg-carbonBlack/60 text-lightGray ${
                        idx === 0 ? "" : ""
                      } ${idx === data.length - 1 ? "rounded-b-2xl" : ""}`
                    : "text-mattBlack bg-lightGray"
                }`}
              >
                {row[col.key]}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden max-w-xl mx-auto space-y-8">
        {data.map((row, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h4 className="text-mattBlack font-semibold mb-4">{row.category}</h4>
            <div className="space-y-3">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                    col.key === "xtoic"
                      ? "bg-carbonBlack/60 text-lightGray"
                      : "bg-lightGray text-mattBlack"
                  }`}
                >
                  <span className="font-medium">{col.label}</span>
                  <span className="max-w-[60%] text-right text-sm">{row[col.key]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
