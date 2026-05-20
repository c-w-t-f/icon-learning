import { site } from "./site";
import acerLogo from "../../assets/source/logos/clients/acer.png";
import dnpLogo from "../../assets/source/logos/clients/dnp.png";
import ifrcLogo from "../../assets/source/logos/clients/ifrc.png";
import peroduaLogo from "../../assets/source/logos/clients/perodua.png";
import protonLogo from "../../assets/source/logos/clients/proton.png";
import publicisLogo from "../../assets/source/logos/clients/publicis.png";
import qlLogo from "../../assets/source/logos/clients/ql.png";
import tescoLogo from "../../assets/source/logos/clients/tesco.png";

export const homeHero = {
  eyebrow: "HRD Corp claimable training provider",
  headline: "Corporate training that moves work forward",
  sub: "Icon Learning helps Malaysian teams build practical skills through HRD-claimable programs, ISO consultancy, and customized in-house training.",
  primaryCta: {
    label: "Request training",
    href: "/contact",
  },
  secondaryCta: {
    label: "View programs",
    href: "/programs",
  },
};

export const ctaCloser = {
  heading: "Ready to plan your next training?",
  sub: "Tell us what your team needs, the preferred dates, and whether you want HRD-claimable options. We will point you to the right program or outline.",
  primaryCta: {
    label: "WhatsApp us",
    href: site.whatsappHref,
  },
  secondaryCta: {
    label: "Email inquiry",
    href: site.emailHref,
  },
};

const clientLogos = [
  { name: "Acer", src: acerLogo },
  { name: "DNP", src: dnpLogo },
  { name: "IFRC", src: ifrcLogo },
  { name: "Perodua", src: peroduaLogo },
  { name: "Proton", src: protonLogo },
  { name: "Publicis", src: publicisLogo },
  { name: "QL", src: qlLogo },
  { name: "Tesco", src: tescoLogo },
];

export const proofBento = {
  eyebrow: "Proof in practice",
  heading: "Built for teams that need training to work on Monday",
  description:
    "A first look at Icon Learning's enterprise proof points, ready to expand with workshop photography and approved testimonials.",
  items: [
    {
      type: "proof",
      column: 1,
      speed: -18,
      eyebrow: "Established",
      heading: "Since 2011",
      body: "Icon Learning has supported Malaysian teams with corporate training, strategic consulting, and ISO management system consultancy.",
    },
    {
      type: "logoCloud",
      column: 1,
      speed: 12,
      eyebrow: "Clients",
      heading: "Trusted across industries",
      logos: clientLogos.slice(0, 4),
    },
    {
      type: "feature",
      column: 2,
      speed: 22,
      eyebrow: "HRD Corp",
      heading: "Claimable training, without the paperwork tone",
      body: "HRD Corp claimable programs stay visible for buyers while the experience remains practical, clear, and commercially focused.",
    },
    {
      type: "quote",
      column: 2,
      speed: -10,
      quote: "Transforming people. Powering performance. Delivering results.",
      attribution: "Icon Learning brand line",
    },
    {
      type: "logoCloud",
      column: 3,
      speed: -16,
      eyebrow: "More teams",
      heading: "Recognizable Malaysian brands",
      logos: clientLogos.slice(4),
    },
    {
      type: "feature",
      column: 3,
      speed: 18,
      eyebrow: "Consultancy",
      heading: "ISO and quality systems alongside training",
      body: "The homepage proof wall can carry both learning programs and consultancy credentials without turning into a brochure grid.",
    },
  ],
} as const;
