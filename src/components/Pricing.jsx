import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { BadgeCheck, Flame, Rocket, Sparkles, Zap } from "lucide-react";

const pricingTiers = [
  {
    title: "Starter",
    price: "$499 + tax",
    description: "Perfect for portfolio sites & basic brands",
    features: [
      "1 Landing Page",
      "Responsive Design",
      "Basic SEO Setup",
      "Delivery in 7 Days",
    ],
    icon: <Zap className="text-lightGray" size={20} />,
    hoverBg: "hover:bg-red-400",
    textColor: "group-hover:text-white",
    button: "bg-white text-black-100 group-hover:bg-white group-hover:text-black",
  },
  {
    title: "Pro (Best Value)",
    price: "$999 + tax",
    description: "Ideal for creative teams & product launches",
    features: [
      "Up to 5 Pages",
      "Custom Animations",
      "Advanced SEO",
      "Delivery in 10 Days",
    ],
    icon: <Rocket className="text-beige" size={20} />,
    hoverBg: "hover:bg-red-500",
    textColor: "group-hover:text-lightGray",
    button: "bg-white text-black group-hover:bg-black-100 group-hover:text-zoroRed",
  },
  {
    title: "Elite",
    price: "$1599 + tax",
    description: "Full scale studio-level creative execution",
    features: [
      "Unlimited Pages",
      "Motion Design + GSAP",
      "Custom CMS or Headless Setup",
      "Priority Delivery & Support",
    ],
    icon: <Flame className="text-lightGray" size={20} />,
    hoverBg: "hover:bg-zoroRed",
    textColor: "group-hover:text-white",
    button: "bg-white text-black group-hover:bg-white group-hover:text-zoroRed",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="w-full min-h-screen py-32 px-6 md:px-12 bg-lightGray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <p className="mb-4 font-general text-xs uppercase tracking-widest text-mattBlack">
            Choose Your Package
          </p>
          <AnimatedTitle
            title="our <b>p</b>ricing <b>p</b>lans"
            className="special-font !text-4xl md:!text-6xl font-zentry font-black leading-[1]"
            textColor="text-mattBlack"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`group relative flex flex-col justify-between rounded-2xl bg-carbonBlack text-white border border-white/10 p-10 min-h-[28rem] transition duration-500 ease-out ${tier.hoverBg}`}
            >
              <div className={`flex items-center gap-3 mb-4 ${tier.textColor}`}>
                {tier.icon}
                <h3 className="text-lg md:text-xl font-bold font-zentry uppercase">
                  {tier.title}
                </h3>
              </div>
              <p className={`text-sm mb-6 font-general transition-colors duration-300 ${tier.textColor}`}>
                {tier.description}
              </p>
              <ul className="mb-8 space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 font-general transition-colors duration-300 ${tier.textColor}`}>
                    <BadgeCheck size={16} className="text-white" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div>
                <h4 className={`text-2xl md:text-3xl font-special mb-3 ${tier.textColor}`}>{tier.price}</h4>
                <Button
                  title="Get Started"
                  containerClass={`font-semibold w-full group-hover:scale-105 transition-transform ${tier.button}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;