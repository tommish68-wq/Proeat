"use client";

import { catalogue, type Equipment, type MovementPattern } from "@/lib/program";
import {
  planExercise,
  type ActiveSeance,
  type HistorySeance,
  type PlannedExercise,
} from "@/lib/workout";

/* ------------------------------------------------------------------ */
/* Séance express — « j'ai X minutes aujourd'hui »                     */
/*                                                                     */
/* L'algorithme part du temps réel disponible et remonte :             */
/*   budget = minutes − échauffement                                   */
/*   coût d'une série = exécution (~45 s) + repos (adapté au temps)    */
/*   → nombre de séries possibles → réparties sur 3 à 6 exercices      */
/* Moins de temps = repos plus courts et moins d'exercices, jamais     */
/* une séance bâclée : chaque minute est budgétée.                     */
/* ------------------------------------------------------------------ */

export type ExpressFocus = "complet" | "haut" | "bas";

export const expressMinutes = [15, 25, 40, 60] as const;
export type ExpressMinutes = (typeof expressMinutes)[number];

export const focusLabels: Record<ExpressFocus, string> = {
  complet: "Full body",
  haut: "Haut du corps",
  bas: "Bas du corps",
};

/* Ordre de priorité : les polyarticulaires d'abord — si le temps est
   court, on garde ce qui rapporte le plus. */
const FOCUS_PATTERNS: Record<ExpressFocus, MovementPattern[]> = {
  complet: ["squat", "pousse-h", "tirage-h", "hinge", "pousse-v", "core"],
  haut: ["pousse-h", "tirage-h", "pousse-v", "tirage-v", "isolation-epaules", "isolation-bras"],
  bas: ["squat", "hinge", "isolation-jambes", "core", "squat", "hinge"],
};

const SET_SECONDS = 45; // exécution moyenne d'une série
const WARMUP_SECONDS = 180; // échauffement court intégré au budget

export interface ExpressPlan {
  exercises: PlannedExercise[];
  restSec: number;
  totalSets: number;
  estimatedMinutes: number;
}

export function planExpress(
  minutes: ExpressMinutes,
  equipment: Equipment,
  focus: ExpressFocus,
  history: HistorySeance[]
): ExpressPlan {
  /* Repos adapté à la pression du chrono */
  const restSec = minutes <= 15 ? 45 : minutes <= 25 ? 60 : minutes <= 40 ? 75 : 90;
  const budget = minutes * 60 - WARMUP_SECONDS;
  const costPerSet = SET_SECONDS + restSec;
  const totalSetsAvailable = Math.max(4, Math.floor(budget / costPerSet));

  /* 3 à 6 exercices selon le volume disponible */
  const exerciseCount = Math.min(
    6,
    Math.max(3, Math.round(totalSetsAvailable / 3))
  );

  /* Répartition des séries : 2 à 4 par exercice, priorité aux premiers */
  const base = Math.min(4, Math.floor(totalSetsAvailable / exerciseCount));
  const setsPlan = Array.from({ length: exerciseCount }, () => Math.max(2, base));
  let remaining = totalSetsAvailable - setsPlan.reduce((a, b) => a + b, 0);
  for (let i = 0; i < exerciseCount && remaining > 0; i++) {
    if (setsPlan[i] < 4) {
      setsPlan[i]++;
      remaining--;
    }
  }

  /* Sélection des exercices, sans doublon */
  const catalog = catalogue[equipment];
  const used = new Set<string>();
  const exercises: PlannedExercise[] = [];
  const patterns = FOCUS_PATTERNS[focus];
  for (let i = 0; i < exerciseCount; i++) {
    const options = catalog[patterns[i % patterns.length]];
    const pick = options.find((o) => !used.has(o.name)) ?? options[i % options.length];
    if (used.has(pick.name)) continue;
    used.add(pick.name);
    const plan = planExercise(pick.name, 8, 12, history);
    exercises.push({
      name: pick.name,
      muscle: pick.muscle,
      sets: setsPlan[exercises.length] ?? 2,
      repsMin: 8,
      repsMax: 12,
      restSec,
      targetReps: plan.targetReps,
      weight: plan.weight,
      hint: plan.hint,
    });
  }

  const totalSets = exercises.reduce((s, e) => s + e.sets, 0);
  const estimatedMinutes = Math.round(
    (totalSets * costPerSet + WARMUP_SECONDS) / 60
  );

  return { exercises, restSec, totalSets, estimatedMinutes };
}

export function buildExpressSeance(
  minutes: ExpressMinutes,
  equipment: Equipment,
  focus: ExpressFocus,
  history: HistorySeance[]
): ActiveSeance {
  const plan = planExpress(minutes, equipment, focus, history);
  return {
    id: `${Date.now()}`,
    startedAt: Date.now(),
    programTitle: "Séance express",
    sessionTitle: `Express ${minutes} min · ${focusLabels[focus]}`,
    focus: `${plan.exercises.length} exercices · ${plan.totalSets} séries · repos ${plan.restSec} s`,
    exercises: plan.exercises,
    exIndex: 0,
    setIndex: 0,
    logs: plan.exercises.map(() => []),
    phase: "review",
    restEndsAt: null,
  };
}
