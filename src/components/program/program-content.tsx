"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Dumbbell,
  Lightbulb,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Timer,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  generateProgram,
  type Equipment,
  type Level,
  type Program,
  type ProgramGoal,
  type ProgramInput,
} from "@/lib/program";
import {
  buildSeance,
  parseReps,
  parseRest,
  planExercise,
  useActiveSeance,
  useCustomExercises,
  useWorkoutHistory,
  type CustomExercise,
} from "@/lib/workout";
import { ExerciseDemo } from "@/components/exercise-demo";
import { Badge, Button, Field, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Training } from "@/components/home/training";

/* ------------------------------------------------------------------ */
/* Formulaire « Ton exo à toi » — création et édition                  */
/* ------------------------------------------------------------------ */

function CustomExerciseForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: CustomExercise;
  onSave: (e: Omit<CustomExercise, "id">) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [sets, setSets] = useState(initial?.sets ?? 3);
  const [reps, setReps] = useState(initial?.reps ?? "8-12");
  const [rest, setRest] = useState(initial?.rest ?? "90 s");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      sets: Math.min(10, Math.max(1, sets)),
      reps: reps.trim() || "8-12",
      rest: rest.trim() || "90 s",
      notes: notes.trim() || undefined,
    });
    if (!initial) {
      setName("");
      setSets(3);
      setReps("8-12");
      setRest("90 s");
      setNotes("");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <Field label="Nom de l'exercice" htmlFor="cx-name">
        <input
          id="cx-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Curl marteau, Farmer walk, Mon combo à moi…"
          className="field"
          required
        />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Séries" htmlFor="cx-sets">
          <input
            id="cx-sets"
            type="number"
            min={1}
            max={10}
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            className="field px-2 text-center"
          />
        </Field>
        <Field label="Reps" htmlFor="cx-reps">
          <input
            id="cx-reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="8-12"
            className="field px-2 text-center"
          />
        </Field>
        <Field label="Repos" htmlFor="cx-rest">
          <input
            id="cx-rest"
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            placeholder="90 s"
            className="field px-2 text-center"
          />
        </Field>
      </div>
      <Field label="Notes (optionnel)" htmlFor="cx-notes">
        <input
          id="cx-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex : prise neutre, tempo lent, dernière série au max…"
          className="field"
        />
      </Field>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1 py-2.5">
          <Plus className="h-4 w-4" />
          {initial ? "Enregistrer" : "Ajouter à mes séances"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="py-2.5">
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
}

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
  const router = useRouter();
  const [level, setLevel] = useState<Level>("debutant");
  const [goal, setGoal] = useState<ProgramGoal>("hypertrophie");
  const [days, setDays] = useState<ProgramInput["daysPerWeek"]>(3);
  const [equipment, setEquipment] = useState<Equipment>("salle");
  const [duration, setDuration] = useState<ProgramInput["duration"]>(60);
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState(0);
  const [activeSeance, setActiveSeance, seanceReady] = useActiveSeance();
  const [history] = useWorkoutHistory();
  const [customs, setCustoms] = useCustomExercises();
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const [editingCustom, setEditingCustom] = useState<string | null>(null);

  const addCustom = (e: Omit<CustomExercise, "id">) =>
    setCustoms((prev) => [...prev, { ...e, id: `${Date.now()}` }]);

  const updateCustom = (id: string, e: Omit<CustomExercise, "id">) => {
    setCustoms((prev) => prev.map((c) => (c.id === id ? { ...c, ...e } : c)));
    setEditingCustom(null);
  };

  const removeCustom = (id: string) =>
    setCustoms((prev) => prev.filter((c) => c.id !== id));

  const launchSeance = () => {
    if (!program) return;
    if (
      activeSeance &&
      activeSeance.logs.some((l) => l.length > 0) &&
      !window.confirm(
        "Une séance est déjà en cours. La remplacer par celle-ci ?"
      )
    ) {
      router.push("/seance");
      return;
    }
    const seance = buildSeance(program, activeSession, history);
    /* Les exos custom rejoignent la séance — retirables dans l'aperçu */
    for (const c of customs) {
      const [repsMin, repsMax] = parseReps(c.reps);
      const plan = planExercise(c.name, repsMin, repsMax, history);
      seance.exercises.push({
        name: c.name,
        muscle: c.notes || "Ton exo à toi",
        sets: c.sets,
        repsMin,
        repsMax,
        restSec: parseRest(c.rest),
        targetReps: plan.targetReps,
        weight: plan.weight,
        hint: plan.hint,
      });
      seance.logs.push([]);
    }
    setActiveSeance(seance);
    router.push("/seance");
  };

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

      </div>

      {/* Section entraînement (photo + arguments), déplacée de l'accueil */}
      <Training ctaHref="#configurateur" />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* -------- Séance en cours -------- */}
        {seanceReady && activeSeance && activeSeance.phase !== "done" && (
          <Reveal>
            <Link
              href="/seance"
              className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-[#2a454f] px-6 py-4 text-white shadow-deep transition-transform hover:-translate-y-0.5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9db4ae] opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#9db4ae]" />
                </span>
                <span className="truncate text-sm font-medium">
                  Séance en cours : {activeSeance.sessionTitle}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#d9c5a5]">
                Reprendre
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        )}

        {/* -------- Configuration -------- */}
        <Reveal delay={0.1}>
          <div id="configurateur" className="card scroll-mt-24 p-7">
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
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-leaf-faint px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-ink">
                        {program.sessions[activeSession].title}
                      </h3>
                      <p className="text-sm text-muted">
                        {program.sessions[activeSession].focus}
                      </p>
                    </div>
                    <button
                      onClick={launchSeance}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-leaf-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-leaf"
                    >
                      <Play className="h-4 w-4" />
                      Lancer la séance
                    </button>
                  </div>
                  <ul className="divide-y divide-line">
                    {program.sessions[activeSession].exercises.map((ex, i) => (
                      <motion.li
                        key={ex.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-leaf-faint/60">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-soft text-sm font-bold text-leaf">
                            {i + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-ink">{ex.name}</p>
                            <p className="text-xs text-muted">{ex.muscle}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3 text-sm">
                            <span className="flex items-center gap-1.5 text-ink">
                              <Dumbbell className="h-3.5 w-3.5 text-leaf" />
                              {ex.sets} × {ex.reps}
                            </span>
                            <span className="hidden items-center gap-1.5 text-muted sm:flex">
                              <Timer className="h-3.5 w-3.5" />
                              {ex.rest}
                            </span>
                            <button
                              onClick={() =>
                                setOpenDemo(openDemo === ex.name ? null : ex.name)
                              }
                              aria-expanded={openDemo === ex.name}
                              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                                openDemo === ex.name
                                  ? "border-leaf bg-leaf-soft text-leaf-deep"
                                  : "border-line bg-surface text-muted hover:border-leaf/40 hover:text-ink"
                              }`}
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              Technique
                              <ChevronDown
                                className={`h-3 w-3 transition-transform ${
                                  openDemo === ex.name ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {openDemo === ex.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5">
                                <ExerciseDemo name={ex.name} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}

                    {/* Exos custom : même format visuel, numérotation qui continue */}
                    {customs.map((c, j) => {
                      const i = program.sessions[activeSession].exercises.length + j;
                      return (
                        <li key={c.id}>
                          {editingCustom === c.id ? (
                            <div className="bg-leaf-faint/50 px-6 py-5">
                              <CustomExerciseForm
                                initial={c}
                                onSave={(e) => updateCustom(c.id, e)}
                                onCancel={() => setEditingCustom(null)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-leaf-faint/60">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-sm font-bold text-[#7c5a33]">
                                {i + 1}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-2 truncate font-medium text-ink">
                                  {c.name}
                                  <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7c5a33]">
                                    Ton exo
                                  </span>
                                </p>
                                <p className="truncate text-xs text-muted">
                                  {c.notes || "Exercice personnalisé"}
                                </p>
                              </div>
                              <div className="flex shrink-0 items-center gap-3 text-sm">
                                <span className="flex items-center gap-1.5 text-ink">
                                  <Dumbbell className="h-3.5 w-3.5 text-gold" />
                                  {c.sets} × {c.reps}
                                </span>
                                <span className="hidden items-center gap-1.5 text-muted sm:flex">
                                  <Timer className="h-3.5 w-3.5" />
                                  {c.rest}
                                </span>
                                <button
                                  onClick={() => setEditingCustom(c.id)}
                                  aria-label={`Modifier ${c.name}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-leaf-soft hover:text-leaf-deep"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => removeCustom(c.id)}
                                  aria-label={`Supprimer ${c.name}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Ton exo à toi */}
              <div className="card mt-6 overflow-hidden">
                <div className="border-b border-line bg-gold/10 px-6 py-4">
                  <h3 className="flex items-center gap-2 font-semibold text-ink">
                    <UserRound className="h-4 w-4 text-[#7c5a33]" />
                    Ton exo à toi
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Ajoute tes propres exercices : ils apparaissent dans chaque
                    séance au même titre que les autres, et sont sauvegardés sur
                    ton appareil.
                  </p>
                </div>
                <div className="p-6">
                  <CustomExerciseForm onSave={addCustom} />
                </div>
              </div>

              {/* Conseils */}
              <div className="card mt-6 p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Lightbulb className="h-4 w-4 text-gold" />
                  Les conseils ProEat
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
