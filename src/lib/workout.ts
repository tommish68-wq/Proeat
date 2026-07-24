"use client";

import { toKey, useLocalState } from "@/lib/store";
import type { Program } from "@/lib/program";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SetLog {
  target: number;
  reps: number;
  weight: number | null; // null = poids du corps
}

export interface PlannedExercise {
  name: string;
  muscle: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  restSec: number;
  targetReps: number;
  weight: number | null;
  hint?: string;
}

export interface ActiveSeance {
  id: string;
  startedAt: number;
  programTitle: string;
  sessionTitle: string;
  focus: string;
  exercises: PlannedExercise[];
  exIndex: number;
  setIndex: number;
  logs: SetLog[][]; // logs[exercice] = séries validées
  /* review = aperçu modifiable avant de commencer (séries, exercices) */
  phase: "review" | "set" | "rest" | "done";
  restEndsAt: number | null;
  endedAt?: number;
}

export interface HistoryExercise {
  name: string;
  muscle: string;
  repsMin: number;
  repsMax: number;
  sets: SetLog[];
}

export interface HistorySeance {
  id: string;
  date: string; // YYYY-MM-DD
  programTitle: string;
  sessionTitle: string;
  durationSec: number;
  exercises: HistoryExercise[];
}

/* ------------------------------------------------------------------ */
/* Parsing des formats du générateur ("8 à 12", "90 s", "3 min")       */
/* ------------------------------------------------------------------ */

export function parseReps(reps: string): [number, number] {
  const m = reps.match(/(\d+)\D+(\d+)/);
  if (m) return [Number(m[1]), Number(m[2])];
  const single = Number(reps.match(/\d+/)?.[0] ?? 10);
  return [single, single];
}

export function parseRest(rest: string): number {
  const min = rest.match(/(\d+)\s*min/);
  if (min) return Number(min[1]) * 60;
  return Number(rest.match(/\d+/)?.[0] ?? 90);
}

/* ------------------------------------------------------------------ */
/* Algorithme de progression (double progression, sans IA)             */
/*                                                                     */
/* 1. Toutes les séries au sommet de la fourchette → +2,5 kg et on     */
/*    repart au bas de la fourchette (ou +1 rép au poids du corps).    */
/* 2. Tous les objectifs atteints → +1 répétition par série.           */
/* 3. Déficit total ≥ 4 répétitions → -2,5 kg pour consolider.         */
/* 4. Sinon → mêmes objectifs, on consolide.                           */
/* ------------------------------------------------------------------ */

export function planExercise(
  name: string,
  repsMin: number,
  repsMax: number,
  history: HistorySeance[]
): { targetReps: number; weight: number | null; hint?: string } {
  const past = history
    .flatMap((h) => h.exercises)
    .filter((e) => e.name === name && e.sets.length > 0);
  const last = past[past.length - 1];
  if (!last) return { targetReps: repsMin, weight: null };

  const lastWeight = last.sets[last.sets.length - 1].weight;
  const lastTarget = Math.max(...last.sets.map((s) => s.target));
  const allTop = last.sets.every((s) => s.reps >= repsMax);
  const allTarget = last.sets.every((s) => s.reps >= s.target);
  const shortfall = last.sets.reduce(
    (sum, s) => sum + Math.max(0, s.target - s.reps),
    0
  );

  if (allTop) {
    if (lastWeight && lastWeight > 0) {
      return {
        targetReps: repsMin,
        weight: lastWeight + 2.5,
        hint: `Toutes les séries au sommet la dernière fois : on charge +2,5 kg et on repart à ${repsMin} répétitions.`,
      };
    }
    return {
      targetReps: lastTarget + 1,
      weight: lastWeight,
      hint: `Fourchette dépassée au poids du corps : objectif ${lastTarget + 1} répétitions (ou ajoutez du lest).`,
    };
  }
  if (allTarget) {
    return {
      targetReps: Math.min(repsMax, lastTarget + 1),
      weight: lastWeight,
      hint: "Objectifs atteints : +1 répétition par série cette fois.",
    };
  }
  if (shortfall >= 4) {
    return {
      targetReps: lastTarget,
      weight: lastWeight && lastWeight > 0 ? Math.max(0, lastWeight - 2.5) : lastWeight,
      hint:
        lastWeight && lastWeight > 0
          ? "Séance difficile la dernière fois : -2,5 kg pour consolider la technique."
          : "Séance difficile la dernière fois : on consolide au même objectif.",
    };
  }
  return {
    targetReps: lastTarget,
    weight: lastWeight,
    hint: "Presque ! Mêmes objectifs : on consolide avant de progresser.",
  };
}

/* Construit une séance prête à lancer depuis un programme généré */
export function buildSeance(
  program: Program,
  sessionIndex: number,
  history: HistorySeance[]
): ActiveSeance {
  const session = program.sessions[sessionIndex];
  const exercises: PlannedExercise[] = session.exercises.map((ex) => {
    const [repsMin, repsMax] = parseReps(ex.reps);
    const plan = planExercise(ex.name, repsMin, repsMax, history);
    return {
      name: ex.name,
      muscle: ex.muscle,
      sets: ex.sets,
      repsMin,
      repsMax,
      restSec: parseRest(ex.rest),
      targetReps: plan.targetReps,
      weight: plan.weight,
      hint: plan.hint,
    };
  });
  return {
    id: `${Date.now()}`,
    startedAt: Date.now(),
    programTitle: program.title,
    sessionTitle: session.title,
    focus: session.focus,
    exercises,
    exIndex: 0,
    setIndex: 0,
    logs: exercises.map(() => []),
    phase: "review",
    restEndsAt: null,
  };
}

/* Catalogue plat de tous les exercices (tous équipements confondus),
   pour le remplacement et l'ajout libre dans l'aperçu de séance. */
export interface CatalogExercise {
  name: string;
  muscle: string;
  equipment: string;
}

/* ------------------------------------------------------------------ */
/* Persistance                                                         */
/* ------------------------------------------------------------------ */

export function useActiveSeance() {
  return useLocalState<ActiveSeance | null>("proeat-active-seance", null);
}

export function useWorkoutHistory() {
  return useLocalState<HistorySeance[]>("proeat-workout-history", []);
}

export function finishSeance(seance: ActiveSeance): HistorySeance {
  return {
    id: seance.id,
    date: toKey(new Date()),
    programTitle: seance.programTitle,
    sessionTitle: seance.sessionTitle,
    durationSec: Math.round(
      ((seance.endedAt ?? Date.now()) - seance.startedAt) / 1000
    ),
    exercises: seance.exercises
      .map((ex, i) => ({
        name: ex.name,
        muscle: ex.muscle,
        repsMin: ex.repsMin,
        repsMax: ex.repsMax,
        sets: seance.logs[i],
      }))
      .filter((ex) => ex.sets.length > 0),
  };
}

/* ------------------------------------------------------------------ */
/* Métriques d'évolution par exercice                                  */
/* ------------------------------------------------------------------ */

export function exerciseOptions(history: HistorySeance[]): string[] {
  const seen = new Map<string, number>();
  history.forEach((h, hi) =>
    h.exercises.forEach((e) => seen.set(e.name, hi))
  );
  return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
}

export interface TrendPoint {
  date: string;
  label: string;
  bestWeight: number; // 0 si poids du corps
  bestReps: number;
  volume: number; // Σ reps × charge
  totalReps: number;
}

export function exerciseTrend(
  history: HistorySeance[],
  name: string
): TrendPoint[] {
  const out: TrendPoint[] = [];
  for (const h of history) {
    const ex = h.exercises.find((e) => e.name === name);
    if (!ex || ex.sets.length === 0) continue;
    const [, m, d] = h.date.split("-");
    out.push({
      date: h.date,
      label: `${d}/${m}`,
      bestWeight: Math.max(...ex.sets.map((s) => s.weight ?? 0)),
      bestReps: Math.max(...ex.sets.map((s) => s.reps)),
      volume: ex.sets.reduce((sum, s) => sum + s.reps * (s.weight ?? 0), 0),
      totalReps: ex.sets.reduce((sum, s) => sum + s.reps, 0),
    });
  }
  return out;
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
}

export function formatRest(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
