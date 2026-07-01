"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { LazyVideo } from "@/components/common/LazyVideo";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";

const reasonOptions = [
  "I want to learn more about the assessment",
  "I'm interested in a team/club package",
  "I represent a school or athletic program",
  "I'd like to become a partner/distributor",
  "I have a technical issue or account question",
  "Other",
];

const roleOptions = [
  "Athlete",
  "Parent of an Athlete",
  "Head Coach",
  "Assistant Coach",
  "Athletic Director",
  "Club/Organization Owner",
  "School Administrator",
  "Other",
];

const teamSizeOptions = [
  "Just me (individual)",
  "2-10 athletes",
  "11-25 athletes",
  "26-50 athletes",
  "51-100 athletes",
  "100+ athletes",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    reason: "",
    organization: "",
    sport: "",
    teamSize: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const showTeamFields =
    formData.reason === "I'm interested in a team/club package" ||
    formData.reason === "I represent a school or athletic program" ||
    formData.reason === "I'd like to become a partner/distributor";

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <LazyVideo
              src="/videos/coaching.mp4"
              className="w-full h-full object-cover opacity-[1.5]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/80 to-surface" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                <span className="gradient-text">Have Questions?</span>{" "}
                Let&apos;s Talk.
              </h1>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                Fill out the form below and we&apos;ll get back to you within one
                business day. Whether you&apos;re an individual athlete or running a
                program with 100+ players, we&apos;re here to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="py-8 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                {submitted ? (
                  <div className="rounded-2xl border border-border/50 bg-surface-card/50 p-10 md:p-16 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <div className="inline-flex rounded-full bg-emerald-500/10 p-5 mb-6">
                        <CheckCircle2 size={36} className="text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        We&apos;ve got your message!
                      </h3>
                      <p className="text-text-secondary mb-2">
                        Our team will review your inquiry and get back to you
                        within 1 business day.
                      </p>
                      <p className="text-sm text-text-muted">
                        Check your inbox at{" "}
                        <span className="text-text-secondary">
                          {formData.email}
                        </span>{" "}
                        for a confirmation.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-border/50 bg-surface-card/30 p-6 md:p-8 space-y-5"
                  >
                    {/* Reason — first so we can conditionally show fields */}
                    <div>
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium mb-2"
                      >
                        What can we help you with? *
                      </label>
                      <select
                        id="reason"
                        required
                        value={formData.reason}
                        onChange={(e) =>
                          setFormData({ ...formData, reason: e.target.value })
                        }
                        className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                      >
                        <option value="" disabled>
                          Select a reason
                        </option>
                        {reasonOptions.map((reason) => (
                          <option key={reason} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    {/* Contact row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Role + Sport */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium mb-2"
                        >
                          Your Role *
                        </label>
                        <select
                          id="role"
                          required
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                        >
                          <option value="" disabled>
                            Select your role
                          </option>
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="sport"
                          className="block text-sm font-medium mb-2"
                        >
                          Sport
                        </label>
                        <input
                          id="sport"
                          type="text"
                          value={formData.sport}
                          onChange={(e) =>
                            setFormData({ ...formData, sport: e.target.value })
                          }
                          className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                          placeholder="e.g. Lacrosse, Soccer, Basketball"
                        />
                      </div>
                    </div>

                    {/* Conditional team fields — only show for team/org/partner inquiries */}
                    {showTeamFields && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      >
                        <div>
                          <label
                            htmlFor="organization"
                            className="block text-sm font-medium mb-2"
                          >
                            Organization / School Name *
                          </label>
                          <input
                            id="organization"
                            type="text"
                            required={showTeamFields}
                            value={formData.organization}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                organization: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                            placeholder="e.g. Northville High School Lacrosse"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="teamSize"
                            className="block text-sm font-medium mb-2"
                          >
                            Number of Athletes
                          </label>
                          <select
                            id="teamSize"
                            value={formData.teamSize}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                teamSize: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                          >
                            <option value="" disabled>
                              Select team size
                            </option>
                            {teamSizeOptions.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full rounded-xl border border-border/50 bg-surface-light/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                        placeholder="Tell us a bit more about what you're looking for..."
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Send Message
                        <Send
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </button>
                      <p className="hidden md:block text-xs text-text-muted">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Contact details */}
                <div className="rounded-2xl border border-border/50 bg-surface-card/50 p-6">
                  <h3 className="text-sm font-semibold mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-primary-light flex-shrink-0" />
                      <a
                        href="mailto:info@myathleticmindset.com"
                        className="text-sm text-text-secondary hover:text-primary-light transition-colors"
                      >
                        info@myathleticmindset.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-primary-light flex-shrink-0" />
                      <p className="text-sm text-text-secondary">
                        Ann Arbor, MI 48106
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-primary-light flex-shrink-0" />
                      <p className="text-sm text-text-secondary">
                        Response within 1 business day
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team pricing CTA */}
                {/* <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-primary-light" />
                    <h3 className="text-sm font-semibold">
                      Team & Organization Pricing
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    We offer custom packages for clubs, high school programs,
                    college teams, and sports organizations. Includes bulk athlete
                    assessments, coach reports, team analytics, and dedicated
                    support.
                  </p>
                  <ul className="space-y-2 text-xs text-text-secondary mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-primary-light flex-shrink-0" />
                      Individual + Coach + Team reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-primary-light flex-shrink-0" />
                      Bulk athlete onboarding & CSV import
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-primary-light flex-shrink-0" />
                      Coach revenue share program available
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-primary-light flex-shrink-0" />
                      Volume discounts for 25+ athletes
                    </li>
                  </ul>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-light hover:text-primary transition-colors"
                  >
                    View pricing tiers
                    <ArrowRight size={12} />
                  </Link>
                </div> */}

                {/* Quick help */}
                <div className="rounded-2xl border border-border/50 bg-surface-card/50 p-6">
                  <h3 className="text-sm font-semibold mb-3">Common Questions</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-0.5">
                        How long does the assessment take?
                      </p>
                      <p className="text-xs text-text-muted">
                        About 15-20 minutes for a complete evaluation.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-0.5">
                        Do parents/coaches take a separate assessment?
                      </p>
                      <p className="text-xs text-text-muted">
                        No — only athletes take the assessment. Parents and coaches
                        receive their own tailored report based on the athlete&apos;s
                        results.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-0.5">
                        Can I try it before committing my team?
                      </p>
                      <p className="text-xs text-text-muted">
                        Yes — the free tier includes a basic assessment and report
                        so you can see the quality before scaling.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
