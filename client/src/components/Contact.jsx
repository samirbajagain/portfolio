/** Contact section rebuilt as premium details-only panel with availability windows */
import { motion } from "framer-motion";
import {
  FiMail,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import FadeIn from "./FadeIn";

const CONTACT_CHANNELS = [
  {
    icon: <FiPhone />,
    label: "Primary Phone (UK)",
    value: "+44 0000 000000",
    href: "tel:+440000000000",
    note: "Business calls and executive consultations",
  },
  {
    icon: <FiPhone />,
    label: "Primary Phone (Nepal)",
    value: "+977 0000 000000",
    href: "tel:+977000000000",
    note: "Project and site coordination",
  },
  {
    icon: <FiMessageCircle />,
    label: "WhatsApp",
    value: "+44 0000 000000",
    href: "https://wa.me/440000000000",
    note: "Fastest channel for urgent communication",
  },
  {
    icon: <FiMail />,
    label: "Email",
    value: "samirbajagain77@gmail.com",
    href: "mailto:samirbajagain77@gmail.com",
    note: "Preferred for proposals and formal briefs",
  },
];

const SOCIAL = [
  { icon: <FiLinkedin />, label: "LinkedIn", href: "https://linkedin.com/in/samirbajagain" },
  { icon: <FiInstagram />, label: "Instagram", href: "https://instagram.com/samirbajagain" },
  { icon: <FiTwitter />, label: "Twitter / X", href: "https://twitter.com/samirbajagain" },
  { icon: <FiGithub />, label: "GitHub", href: "https://github.com/samirbajagain" },
];

const AVAILABILITY_WINDOWS = [
  {
    zone: "London, UK",
    timezone: "Europe/London",
    schedule: "Monday to Saturday, 09:30 - 18:30",
    availability: "Samir is available only during this window",
  },
  {
    zone: "Kathmandu, Nepal",
    timezone: "Asia/Kathmandu",
    schedule: "Monday to Saturday, 15:15 - 00:15",
    availability: "Samir is available only during this window",
  },
];

export default function Contact() {
  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[460px] h-[420px] rounded-full opacity-20 bg-blue-700 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-semibold mb-3">
            09 / Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Private <span className="gradient-text">Contact Desk</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mb-14 leading-relaxed">
            For strategic collaborations, engineering consultancy, creative direction, or executive discussions,
            use the direct channels below. Response quality and timeliness are prioritized for serious project inquiries.
          </p>
        </FadeIn>

        <div className="grid xl:grid-cols-3 gap-8">
          <FadeIn delay={0.08} className="xl:col-span-2">
            <div className="glass rounded-3xl p-7 md:p-9">
              <div className="flex items-start justify-between gap-5 mb-6">
                <div>
                  <h3 className="font-display font-semibold text-slate-900 text-2xl mb-2">Direct Communication Channels</h3>
                  <p className="text-slate-600 text-sm">All channels route to Samir's professional communications workflow.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-blue-700 bg-blue-500/12 border border-blue-500/30 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Executive Response Priority
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {CONTACT_CHANNELS.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass-light rounded-2xl p-5 border border-blue-500/25 hover:border-blue-500/55 transition-all"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-xl bg-blue-500/18 border border-blue-500/40 text-blue-700 flex items-center justify-center text-base">
                        {item.icon}
                      </span>
                      <p className="text-xs tracking-[0.16em] uppercase text-blue-600 font-semibold">{item.label}</p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900 break-all">{item.value}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.note}</p>
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 text-sm text-slate-600 border border-blue-500/25 rounded-xl px-4 py-3 bg-blue-500/10">
                <FiMapPin className="text-blue-700 mt-0.5 flex-shrink-0" />
                <p>
                  Current operating base: London, United Kingdom. Nepal meetings and site engagements are coordinated in advance.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeIn delay={0.14}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-slate-900 text-lg mb-4">Availability Windows</h3>
                <div className="flex flex-col gap-4">
                  {AVAILABILITY_WINDOWS.map((slot) => (
                    <div key={slot.zone} className="rounded-xl border border-blue-500/25 bg-blue-500/10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className="text-blue-700" />
                        <p className="text-sm font-semibold text-slate-900">{slot.zone}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.16em] text-blue-600 mb-1">{slot.timezone}</p>
                      <p className="text-sm text-slate-700">{slot.schedule}</p>
                      <p className="text-xs text-slate-600 mt-2">{slot.availability}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                  Sunday calls are by prior arrangement only. Please send a short agenda before scheduling.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-4 tracking-[0.16em] uppercase">Professional Networks</h3>
                <div className="flex flex-col gap-2.5">
                  {SOCIAL.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-blue-500/12 border border-transparent hover:border-blue-500/30 transition-all"
                    >
                      <span className="text-blue-700 text-base">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
