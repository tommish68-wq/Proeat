"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Dumbbell,
  Flag,
  History,
  Minus,
  Play,
  Plus,
  SkipForward,
  Sparkles,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";
import {
  exerciseOptions,
  exerciseTrend,
  finishSeance,
  formatDuration,
  formatRest,
  useActiveSeance,
  useWorkoutHistory,
  type ActiveSeance,
} from "@/lib/workout";
import {
  buildExpressSeance,
  expressMinutes,
  focusLabels,
  planExpress,
  type ExpressFocus,
  type ExpressMinutes,
} from "@/lib/express";
import type { Equipment } from "@/lib/program";
import { Badge, Button, SectionHeading } from "@/components/ui";
import { LineChart } from "@/components/charts";
import { Reveal } from "@/components/motion";

/* ------------------------------------------------------------------ */
/* Horloge du repos — pilotée par un timestamp, survit au rechargement */
/* ------------------------------------------------------------------ */

function useCountdown(endsAt: number | null, onEnd: () => void) {
  const [remaining, setRemaining] = useState<number>(() =>
    endsAt ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)) : 0
  );
  useEffect(() => {
    if (!endsAt) return;
    const tick = () => {
      const r = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(r);
      if (r <= 0) onEnd();
    };
    tick();
    const t = setInterval(tick, 300);
    return () => clearInterval(t);
  }, [endsAt, onEnd]);
  return remaining;
}

/* ------------------------------------------------------------------ */
/* Écran repos : le chrono EST le compteur de séries                   */
/* ------------------------------------------------------------------ */

function RestScreen({
  seance,
  update,
}: {
  seance: ActiveSeance;
  update: (fn: (s: ActiveSeance) => ActiveSeance) => void;
}) {
  const ex = seance.exercises[seance.exIndex];
  const isNewExercise = seance.setIndex === 0;
  const total = ex.restSec;

  const endRest = useCallback(() => {
    try {
      navigator.vibrate?.([160, 80, 160]);
    } catch {}
    update((s) => ({ ...s, phase: "set", restEndsAt: null }));
  }, [update]);

  const remaining = useCountdown(seance.restEndsAt, endRest);
  const pct = total > 0 ? Math.min(1, remaining / total) : 0;
  const R = 88;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      key="rest"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="card p-8 text-center"
    >
      <p className="font-tech text-xs uppercase tracking-[0.18em] text-muted">
        Repos
      </p>

      <div className="relative mx-auto mt-6 h-52 w-52">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={R} fill="none" stroke="var(--viz-grid)" strokeWidth="10" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="var(--leaf)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="font-poster text-5xl tracking-tight text-ink">
              {formatRest(remaining)}
            </p>
            <p className="mt-1 text-xs text-muted">sur {formatRest(total)}</p>
          </div>
        </div>
      </div>

      {/* Le chrono annonce où on reprend : plus jamais perdu dans ses séries */}
      <p className="mt-6 text-sm text-muted">
        {isNewExercise ? "Prochain exercice" : "À la sonnerie"}
      </p>
      <p className="mt-1 font-display text-xl font-semibold text-ink">
        {isNewExercise
          ? ex.name
          : `${ex.name} — série ${seance.setIndex + 1} / ${ex.sets}`}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            update((s) => ({
              ...s,
              restEndsAt: (s.restEndsAt ?? Date.now()) + 30_000,
            }))
          }
        >
          <Plus className="h-4 w-4" />
          30 s
        </Button>
        <Button onClick={endRest}>
          <SkipForward className="h-4 w-4" />
          Passer le repos
        </Button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Écran série : cible, saisie du réalisé (plus ou moins), validation  */
/* ------------------------------------------------------------------ */

function SetScreen({
  seance,
  update,
}: {
  seance: ActiveSeance;
  update: (fn: (s: ActiveSeance) => ActiveSeance) => void;
}) {
  /* Le composant est remonté à chaque série (clé exIndex-setIndex) :
     l'état initial repart donc toujours de l'objectif courant. */
  const ex = seance.exercises[seance.exIndex];
  const [reps, setReps] = useState(ex.targetReps);
  const [weight, setWeight] = useState<number | "">(ex.weight ?? "");

  const validate = () => {
    update((s) => {
      const w = weight === "" ? null : Number(weight);
      const logs = s.logs.map((l, i) =>
        i === s.exIndex ? [...l, { target: ex.targetReps, reps, weight: w }] : l
      );
      const lastSetOfExercise = s.setIndex + 1 >= ex.sets;
      const lastExercise = s.exIndex + 1 >= s.exercises.length;

      // mémorise la charge saisie pour les séries suivantes
      const exercises = s.exercises.map((e, i) =>
        i === s.exIndex ? { ...e, weight: w } : e
      );

      if (lastSetOfExercise && lastExercise) {
        return {
          ...s,
          logs,
          exercises,
          phase: "done",
          restEndsAt: null,
          endedAt: Date.now(),
        };
      }
      if (lastSetOfExercise) {
        return {
          ...s,
          logs,
          exercises,
          exIndex: s.exIndex + 1,
          setIndex: 0,
          phase: "rest",
          restEndsAt: Date.now() + ex.restSec * 1000,
        };
      }
      return {
        ...s,
        logs,
        exercises,
        setIndex: s.setIndex + 1,
        phase: "rest",
        restEndsAt: Date.now() + ex.restSec * 1000,
      };
    });
  };

  const delta = reps - ex.targetReps;

  return (
    <motion.div
      key={`set-${seance.exIndex}-${seance.setIndex}`}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="card overflow-hidden"
    >
      <div className="border-b border-line bg-leaf-faint px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-semibold text-ink">
              {ex.name}
            </p>
            <p className="text-xs text-muted">{ex.muscle}</p>
          </div>
          <span className="shrink-0 rounded-full bg-leaf-deep px-4 py-2 font-tech text-sm font-medium text-white">
            Série {seance.setIndex + 1} / {ex.sets}
          </span>
        </div>
        {ex.hint && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-gold/10 px-3 py-2 text-xs leading-relaxed text-[#7c5a33]">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {ex.hint}
          </p>
        )}
      </div>

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-sand/60 p-4 text-center">
            <p className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
              Objectif
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {ex.targetReps}
              <span className="text-sm font-normal text-muted"> reps</span>
            </p>
            <p className="text-[11px] text-muted">
              fourchette {ex.repsMin}–{ex.repsMax}
            </p>
          </div>
          <div className="rounded-2xl bg-sand/60 p-4 text-center">
            <p className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
              Charge (kg)
            </p>
            <input
              inputMode="decimal"
              type="number"
              step={2.5}
              min={0}
              value={weight}
              placeholder="PDC"
              aria-label="Charge en kilogrammes (vide = poids du corps)"
              onChange={(e) =>
                setWeight(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="mt-1 w-full bg-transparent text-center font-display text-3xl font-bold text-ink outline-none placeholder:text-muted/50"
            />
            <p className="text-[11px] text-muted">vide = poids du corps</p>
          </div>
        </div>

        {/* Réalisé : le stepper « plus ou moins » */}
        <div>
          <p className="text-center font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
            Répétitions réalisées
          </p>
          <div className="mt-3 flex items-center justify-center gap-5">
            <button
              onClick={() => setReps((r) => Math.max(0, r - 1))}
              aria-label="Une répétition de moins"
              className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface text-ink transition-all hover:border-leaf/40 active:scale-95"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="w-28 text-center">
              <p className="font-poster text-6xl tracking-tight text-ink">{reps}</p>
              {delta !== 0 && (
                <p
                  className={`mt-1 flex items-center justify-center gap-1 text-xs font-semibold ${
                    delta > 0 ? "text-leaf" : "text-[#a05c3b]"
                  }`}
                >
                  {delta > 0 ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {delta > 0 ? `+${delta}` : delta} vs objectif
                </p>
              )}
            </div>
            <button
              onClick={() => setReps((r) => r + 1)}
              aria-label="Une répétition de plus"
              className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface text-ink transition-all hover:border-leaf/40 active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Button onClick={validate} className="w-full py-4 text-base">
          <Check className="h-5 w-5" />
          Valider la série · repos {formatRest(ex.restSec)}
        </Button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Écran résumé + enregistrement                                       */
/* ------------------------------------------------------------------ */

function SummaryScreen({
  seance,
  onSave,
  saved,
}: {
  seance: ActiveSeance;
  onSave: () => void;
  saved: boolean;
}) {
  const totalSets = seance.logs.reduce((sum, l) => sum + l.length, 0);
  const volume = seance.logs
    .flat()
    .reduce((sum, s) => sum + s.reps * (s.weight ?? 0), 0);
  const duration = Math.round(
    ((seance.endedAt ?? seance.startedAt) - seance.startedAt) / 1000
  );

  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="bg-[#2a454f] px-6 py-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10">
          <Trophy className="h-7 w-7 text-[#d9c5a5]" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-white">
          Séance terminée !
        </h2>
        <p className="mt-1 text-sm text-white/70">
          {seance.sessionTitle} · {formatDuration(duration)} · {totalSets} séries
          {volume > 0 && ` · ${Math.round(volume)} kg soulevés`}
        </p>
      </div>

      <div className="divide-y divide-line">
        {seance.exercises.map((ex, i) => {
          const sets = seance.logs[i];
          if (!sets.length) return null;
          const achieved = sets.reduce((s, x) => s + x.reps, 0);
          const target = sets.reduce((s, x) => s + x.target, 0);
          const diff = achieved - target;
          return (
            <div key={ex.name} className="flex items-center gap-4 px-6 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{ex.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {sets
                    .map((s) => `${s.reps}${s.weight ? `×${s.weight}kg` : ""}`)
                    .join(" · ")}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  diff > 0
                    ? "bg-leaf-soft text-leaf-deep"
                    : diff < 0
                      ? "bg-[#a05c3b]/10 text-[#a05c3b]"
                      : "bg-sand text-muted"
                }`}
              >
                {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : "="} reps
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 p-6">
        {saved ? (
          <>
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-leaf">
              <Check className="h-4 w-4" />
              Séance enregistrée — vos prochains objectifs sont ajustés.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="secondary" className="w-full" onClick={() => window.location.reload()}>
                <History className="h-4 w-4" />
                Voir ma progression
              </Button>
              <Link
                href="/programme"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf-deep px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-leaf"
              >
                Retour au programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <Button onClick={onSave} className="w-full py-4 text-base">
            <Flag className="h-5 w-5" />
            Enregistrer la séance
          </Button>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Séance express — « j'ai X minutes aujourd'hui »                     */
/* ------------------------------------------------------------------ */

const equipmentOptions: { id: Equipment; label: string }[] = [
  { id: "salle", label: "Salle" },
  { id: "halteres", label: "Haltères" },
  { id: "poids-du-corps", label: "Poids du corps" },
];

function ExpressStart({
  onLaunch,
}: {
  onLaunch: (s: ActiveSeance) => void;
}) {
  const [history] = useWorkoutHistory();
  const [minutes, setMinutes] = useState<ExpressMinutes>(25);
  const [equipment, setEquipment] = useState<Equipment>("salle");
  const [focus, setFocus] = useState<ExpressFocus>("complet");

  const preview = useMemo(
    () => planExpress(minutes, equipment, focus, history),
    [minutes, equipment, focus, history]
  );

  return (
    <section className="card mt-10 overflow-hidden">
      <div className="border-b border-line bg-leaf-faint px-6 py-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <Timer className="h-5 w-5 text-leaf" />
          Séance express — combien de temps avez-vous ?
        </h2>
        <p className="mt-1 text-sm text-muted">
          ProEat construit une séance qui tient vraiment dans votre créneau :
          repos, séries et exercices calibrés à la minute.
        </p>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Temps disponible</p>
          <div className="grid grid-cols-4 gap-2">
            {expressMinutes.map((m) => (
              <button
                key={m}
                data-active={minutes === m}
                onClick={() => setMinutes(m)}
                className="chip py-3 text-center"
              >
                {m} min
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Matériel</p>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map((e) => (
                <button
                  key={e.id}
                  data-active={equipment === e.id}
                  onClick={() => setEquipment(e.id)}
                  className="chip"
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Zone travaillée</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(focusLabels) as ExpressFocus[]).map((f) => (
                <button
                  key={f}
                  data-active={focus === f}
                  onClick={() => setFocus(f)}
                  className="chip"
                >
                  {focusLabels[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="rounded-xl bg-sand/60 px-4 py-3 text-center text-sm text-muted">
          <span className="font-semibold text-ink">
            {preview.exercises.length} exercices · {preview.totalSets} séries ·
            repos {preview.restSec} s
          </span>
          {" "}— durée réelle estimée ≈ {preview.estimatedMinutes} min,
          échauffement compris
        </p>

        <Button
          onClick={() =>
            onLaunch(buildExpressSeance(minutes, equipment, focus, history))
          }
          className="w-full py-4 text-base"
        >
          <Play className="h-5 w-5" />
          Lancer ma séance express
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Métriques d'évolution par exercice                                  */
/* ------------------------------------------------------------------ */

function ExerciseMetrics() {
  const [history, , ready] = useWorkoutHistory();
  const options = useMemo(() => exerciseOptions(history), [history]);
  const [selected, setSelected] = useState<string | null>(null);
  const name = selected ?? options[0];
  const trend = useMemo(
    () => (name ? exerciseTrend(history, name) : []),
    [history, name]
  );

  if (!ready || options.length === 0 || !name) return null;

  const weighted = trend.some((t) => t.bestWeight > 0);
  const first = trend[0];
  const last = trend[trend.length - 1];
  const progressWeight = last.bestWeight - first.bestWeight;
  const progressReps = last.bestReps - first.bestReps;

  return (
    <section id="progression" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-tech text-xs uppercase tracking-[0.18em] text-gold">
            Progression
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            Vos métriques par exercice
          </h2>
        </div>
        <div className="relative">
          <select
            value={name}
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Choisir un exercice"
            className="field appearance-none pr-10"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {(
          [
            [
              weighted ? "Meilleure charge" : "Meilleures répétitions",
              weighted ? `${last.bestWeight} kg` : `${last.bestReps} reps`,
            ],
            [
              "Progression",
              weighted
                ? `${progressWeight >= 0 ? "+" : ""}${Math.round(progressWeight * 10) / 10} kg`
                : `${progressReps >= 0 ? "+" : ""}${progressReps} reps`,
            ],
            ["Séances suivies", `${trend.length}`],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="card p-5 text-center">
            <p className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
              {label}
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-6">
        <p className="text-sm font-semibold text-ink">
          {weighted ? "Charge maximale par séance (kg)" : "Répétitions maximales par séance"}
        </p>
        <div className="mt-4">
          <LineChart
            data={trend.map((t) => ({
              label: t.label,
              value: weighted ? t.bestWeight : t.bestReps,
            }))}
            unit={weighted ? " kg" : ""}
            height={220}
          />
        </div>
        {weighted && (
          <p className="mt-3 text-xs text-muted">
            Volume total dernière séance : {Math.round(last.volume)} kg ({last.totalReps} répétitions).
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Historique des séances                                              */
/* ------------------------------------------------------------------ */

function SessionHistory() {
  const [history, , ready] = useWorkoutHistory();
  if (!ready || history.length === 0) return null;
  const recent = history.slice(-6).reverse();
  return (
    <section className="mt-14">
      <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
        <History className="h-5 w-5 text-leaf" />
        Dernières séances
      </h2>
      <div className="mt-5 space-y-3">
        {recent.map((h) => {
          const sets = h.exercises.reduce((s, e) => s + e.sets.length, 0);
          const volume = h.exercises
            .flatMap((e) => e.sets)
            .reduce((s, x) => s + x.reps * (x.weight ?? 0), 0);
          return (
            <div key={h.id} className="card flex items-center gap-4 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{h.sessionTitle}</p>
                <p className="text-xs text-muted">
                  {h.date.split("-").reverse().join("/")} · {sets} séries ·{" "}
                  {formatDuration(h.durationSec)}
                </p>
              </div>
              {volume > 0 && (
                <Badge tone="leaf">{Math.round(volume)} kg</Badge>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page séance                                                         */
/* ------------------------------------------------------------------ */

export function SeanceContent() {
  const [seance, setSeance, ready] = useActiveSeance();
  const [, setHistory] = useWorkoutHistory();
  const [saved, setSaved] = useState(false);

  const update = useCallback(
    (fn: (s: ActiveSeance) => ActiveSeance) =>
      setSeance((prev) => (prev ? fn(prev) : prev)),
    [setSeance]
  );

  const save = () => {
    if (!seance) return;
    setHistory((prev) => [...prev, finishSeance(seance)]);
    setSaved(true);
  };

  const abandon = () => {
    if (
      seance &&
      seance.logs.some((l) => l.length > 0) &&
      !window.confirm("Abandonner la séance en cours ? Les séries validées seront perdues.")
    )
      return;
    setSeance(null);
    setSaved(false);
  };

  const closeSaved = () => {
    setSeance(null);
    setSaved(false);
  };

  const totalSets = seance
    ? seance.exercises.reduce((s, e) => s + e.sets, 0)
    : 0;
  const doneSets = seance
    ? seance.logs.reduce((s, l) => s + l.length, 0)
    : 0;

  return (
    <div className="hero-glow min-h-[70vh]">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {!ready ? null : seance ? (
          <div>
            {/* Barre de progression de séance */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-muted">
                    {seance.sessionTitle}
                  </p>
                  <p className="truncate text-sm font-medium text-ink">
                    Exercice {Math.min(seance.exIndex + 1, seance.exercises.length)} /{" "}
                    {seance.exercises.length} — {doneSets} / {totalSets} séries
                  </p>
                </div>
                {seance.phase !== "done" && (
                  <button
                    onClick={abandon}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                    Quitter
                  </button>
                )}
              </div>
              <div
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sand"
                role="progressbar"
                aria-valuenow={doneSets}
                aria-valuemin={0}
                aria-valuemax={totalSets}
              >
                <div
                  className="h-full rounded-full bg-leaf transition-[width] duration-500"
                  style={{ width: `${totalSets ? (doneSets / totalSets) * 100 : 0}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {seance.phase === "rest" ? (
                <RestScreen seance={seance} update={update} />
              ) : seance.phase === "done" ? (
                <SummaryScreen
                  seance={seance}
                  onSave={saved ? closeSaved : save}
                  saved={saved}
                />
              ) : (
                <SetScreen
                  key={`${seance.exIndex}-${seance.setIndex}`}
                  seance={seance}
                  update={update}
                />
              )}
            </AnimatePresence>

            {/* Aperçu de la suite */}
            {seance.phase === "set" && (
              <div className="mt-6 space-y-1.5">
                {seance.exercises.map((ex, i) => (
                  <div
                    key={ex.name}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm ${
                      i === seance.exIndex
                        ? "bg-leaf-soft font-medium text-leaf-deep"
                        : i < seance.exIndex
                          ? "text-muted line-through opacity-60"
                          : "text-muted"
                    }`}
                  >
                    <span className="truncate">{ex.name}</span>
                    <span className="ml-3 shrink-0 font-tech text-xs">
                      {seance.logs[i].length} / {ex.sets}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Séance guidée"
                title="Ne perdez plus jamais le fil de vos séries"
                description="Lancez une séance depuis votre programme : ProEat compte vos séries, chronomètre vos repos et ajuste vos objectifs à chaque passage."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ExpressStart onLaunch={(s) => setSeance(s)} />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-center text-sm text-muted">
                Vous suivez un programme complet ?{" "}
                <Link
                  href="/programme"
                  className="font-semibold text-leaf underline-offset-2 hover:underline"
                >
                  Lancez la séance du jour depuis votre programme
                </Link>
                .
              </p>
            </Reveal>

            <ExerciseMetrics />
            <SessionHistory />
          </div>
        )}

        {/* Métriques visibles aussi après enregistrement */}
        {seance && seance.phase === "done" && saved && (
          <>
            <ExerciseMetrics />
            <SessionHistory />
          </>
        )}
      </div>
    </div>
  );
}
