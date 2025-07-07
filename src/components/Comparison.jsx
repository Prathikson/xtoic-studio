import React, { useState } from "react";
import {
  Check,
  X,
  AlertTriangle,
  Zap,
  Brain,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Button from "./Button";

const columns = ["Fiverr", "Freelancer", "Agency", "XTOIC"];
const features = [
  "Custom Design",
  "Animation",
  "SEO Ready",
  "Code Quality",
  "AI Integration",
  "24/7 Support",
  "Fast Delivery",
  "Scalable",
  "UX Excellence",
];

const data = {
  Fiverr: ["yes", "warn", "yes", "warn", "no", "warn", "yes", "warn", "warn"],
  Freelancer: ["yes", "no", "yes", "warn", "no", "yes", "yes", "no", "warn"],
  Agency: ["yes", "yes", "yes", "yes", "warn", "yes", "warn", "yes", "yes"],
  XTOIC: [
    "premium",
    "fast",
    "yes",
    "yes",
    "ai",
    "yes",
    "fast",
    "yes",
    "premium",
  ],
};

const iconMap = {
  yes: { icon: Check, color: "text-green-600", text: "Got it!" },
  no: { icon: X, color: "text-red-500", text: "Nope" },
  warn: { icon: AlertTriangle, color: "text-amber-500", text: "Maybe" },
  fast: { icon: Zap, color: "text-blue-500", text: "Lightning fast" },
  ai: { icon: Brain, color: "text-purple-500", text: "AI powered" },
  premium: { icon: Sparkles, color: "text-pink-500", text: "Premium quality" },
};

export default function Comparison() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveAccordion((current) => (current === idx ? null : idx));
  };

  return (
    <div className="w-full bg-white p-6 md:p-12">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-3">
            Pick Your Fighter
          </h2>
          <p className="text-gray-500 text-lg">Who's gonna build your dream?</p>
        </div>

        {/* Desktop Table - hidden on mobile */}
        <div className="hidden lg:block w-full">
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 select-none">
              <div className="p-6 text-sm font-medium text-gray-600"></div>
              {columns.map((col) => (
                <div
                  key={col}
                  className={`p-6 text-center border-l border-gray-200 ${
                    col === "XTOIC" ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="font-semibold text-xl">{col}</div>
                </div>
              ))}
            </div>

            {/* Table Body */}
            {features.map((feature, idx) => (
              <div
                key={feature}
                className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-6 text-sm font-medium text-gray-700 bg-gray-50">
                  {feature}
                </div>
                {columns.map((col) => {
                  const value = data[col][idx];
                  const config = iconMap[value] || iconMap.yes;
                  const Icon = config.icon;
                  const cellKey = `${col}-${feature}`;

                  return (
                    <div
                      key={cellKey}
                      className={`p-6 flex flex-col justify-center items-center border-l border-gray-200 cursor-pointer transition-all duration-200 ${
                        col === "XTOIC" ? "bg-gray-900 text-white" : ""
                      } ${hoveredCell === cellKey ? "bg-gray-100" : ""}`}
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                      aria-label={`${col} - ${feature}: ${config.text}`}
                      role="gridcell"
                      tabIndex={0}
                      onFocus={() => setHoveredCell(cellKey)}
                      onBlur={() => setHoveredCell(null)}
                    >
                      <Icon className={`w-6 h-6 ${config.color} mb-2`} />
                      <span
                        className={`text-xs font-medium ${
                          col === "XTOIC" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {config.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion - visible only on small screens */}
        <div className="lg:hidden w-full">
          {features.map((feature, idx) => (
            <div
              key={feature}
              className="border border-gray-200 rounded-lg mb-4 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition-colors"
                aria-expanded={activeAccordion === idx}
                aria-controls={`accordion-panel-${idx}`}
                id={`accordion-header-${idx}`}
              >
                {feature}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeAccordion === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`accordion-panel-${idx}`}
                role="region"
                aria-labelledby={`accordion-header-${idx}`}
                className={`px-6 pb-4 pt-2 transition-max-height duration-500 ease-in-out overflow-hidden ${
                  activeAccordion === idx ? "max-h-screen" : "max-h-0"
                }`}
              >
                {columns.map((col) => {
                  const value = data[col][idx];
                  const config = iconMap[value] || iconMap.yes;
                  const Icon = config.icon;

                  return (
                    <div
                      key={`${col}-${feature}-mobile`}
                      className="flex items-center py-2 border-b last:border-b-0 border-gray-200"
                    >
                      <div
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${config.color}`}
                      >
                        <Icon />
                      </div>
                      <div className="font-semibold w-24">{col}</div>
                      <div className="ml-auto text-sm text-gray-600">
                        {config.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-900 text-lg font-medium mb-6">
            Ready to make some magic happen?
          </p>
          <Button
            title="Let's Build Something Amazing"
            containerClass="mt-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
