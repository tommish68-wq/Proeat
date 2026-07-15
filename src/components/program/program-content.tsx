"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Dumbbell,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Timer,
} from "lucide-react";
import {
  generateProgram,
  type Equipment,
  type Level,
  type Program,
  type ProgramGoal,
  type ProgramInput,
} from "@/lib/program";
import { Badge, Button, Field, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/motion";

const levels: { id: Level; label: string }[] = [
  { id: "debutant", label: "Débutant" },
  { id: "intermediaire", label: "Intermédiaire" },
  { id: "avance", label: "Avancé" },
];

const goals: { id: ProgramGoal; label: string }[] = [
  { id: "hypertrophie", label: "Hypertrophie" },
  { id: "force", label: "Force" },
  { id: "seche", label: "Sèche" },
  { id: "remise-en-forme", label: "Remise en forme" },
];

const equipments: { id: Equipment; label: string }[] = [
  { id: "salle", label: "Salle de sport" },
  { id: "halteres", label: "Haltères" },
  { id: "poids-du-corps", label: "Poids du corps" },
];

const dayOptions: ProgramInput["daysPerWeek"][] = [2, 3, 4, 5];
const durationOptions: ProgramInput["duration"][] = [30, 45, 60, 75];

export function ProgramContent() {
  const [level, setLevel] = useState<Level>("debutant");
  const [goal, setGoal] = useState<ProgramGoal>("hypertrophie");
  const [days, setDays] = useState<ProgramInput["daysPerWeek"]>(3);
  const [equipment, setEquipment] = useState<Equipment>("salle");
  const [duration, setDuration] = useState<ProgramInput["duration"]>(60);
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState(0);

  const generate = () => {
    setLoading(true);
    setActiveSession(0);
    // petite latence simulée pour laisser vivre le skeleton loading
    setTimeout(() => {
      setProgram(generateProgram({ level, goal, daysPerWeek: days, equipment, duration }));
      setLoading(false);
    }, 700);
  };

  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Programme"
            title="Votre programme de musculation, généré en 30 secondes"
            description="Répondez à cinq questions et obtenez un plan structuré, équilibré et progressif — adapté à votre matériel et à votre emploi du temps."
          />
        </Reveal>

        {/* -------- Configuration -------- */}
        <Reveal delay={0.1}>
          <div className="card mt-14 p-7">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Field label="Niveau">
                <div className="flex flex-wrap gap-2">
                  {levels.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      data-active={level === l.id}
                      onClick={() => setLevel(l.id)}
                      className="chip"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Objectif">
                <div className="flex flex-wrap gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      data-active={goal === g.id}
                      onClick={() => setGoal(g.id)}
                      className="chip"
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Matériel disponible">
                <div className="flex flex-wrap gap-2">
                  {equipments.map((eq) => (
                    <button
                      key={eq.id}
                      type="button"
                      data-active={equipment === eq.id}
                      onClick={() => setEquipment(eq.id)}
                      className="chip"
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Séances par semaine">
                <div className="flex flex-wrap gap-2">
                  {dayOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      data-active={days === d}
                      onClick={() => setDays(d)}
                      className="chip"
                    >
                      {d} séances
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Durée par séance">
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      data-active={duration === d}
                      onClick={() => setDuration(d)}
                      className="chip"
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </Field>
              <div className="flex items-end">
                <Button onClick={generate} disabled={loading} className="w-full py-3.5">
                  {program ? (
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {program ? "Régénérer" : "Générer mon programme"}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* -------- Skeleton pendant la génération -------- */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 space-y-4"
            >
              <Skeleton className="h-10 w-72" />
              <div className="flex gap-2">
                {Array.from({ length: days }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
              </div>
              <Skeleton className="h-72 w-full rounded-2xl" />
            </motion.div>
          )}

          {/* -------- Programme généré -------- */}
          {program && !loading && (
            <motion.div
              key="program"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {program.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{program.subtitle}</p>
                </div>
                <Badge tone="leaf">
                  <Clock className="h-3 w-3" />
                  Cycle de {program.weeks} semaines
                </Badge>
              </div>

              {/* Onglets séances */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {program.sessions.map((s, i) => (
                  <button
                    key={s.title}
                    data-active={activeSession === i}
                    onClick={() => setActiveSession(i)}
                    className="chip shrink-0"
                  >
                    Jour {i + 1} · {s.title}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSession}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="card mt-4 overflow-hidden"
                >
                  <div className="border-b border-line bg-leaf-faint px-6 py-4">
                    <h3 className="font-semibold text-ink">
                      {program.sessions[activeSession].title}
                    </h3>
                    <p className="text-sm text-muted">
                      {program.sessions[activeSession].focus}
                    </p>
                  </div>
                  <ul className="divide-y divide-line">
                    {program.sessions[activeSession].exercises.map((ex, i) => (
                      <motion.li
                        key={ex.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-leaf-faint/60"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-soft text-sm font-bold text-leaf">
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-ink">{ex.name}</p>
                          <p className="text-xs text-muted">{ex.muscle}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-ink">
                            <Dumbbell className="h-3.5 w-3.5 text-leaf" />
                            {ex.sets} × {ex.reps}
                          </span>
                          <span className="hidden items-center gap-1.5 text-muted sm:flex">
                            <Timer className="h-3.5 w-3.5" />
                            {ex.rest}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Conseils */}
              <div className="card mt-6 p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Lightbulb className="h-4 w-4 text-gold" />
                  Conseils du coach
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {program.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
