"use client";

import { useCallback, useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types du store local (persistance navigateur)                       */
/* ------------------------------------------------------------------ */

export type MealSlot = "petit-dejeuner" | "dejeuner" | "diner" | "collation";

export interface FoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  meal: MealSlot;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number;
}

export interface Profile {
  name: string;
  goal: "seche" | "maintien" | "masse";
  targetKcal: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  targetWeight: number;
  height: number;
  memberSince: string;
}

/* ------------------------------------------------------------------ */
/* Helpers date                                                        */
/* ------------------------------------------------------------------ */

export function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function todayKey(): string {
  return toKey(new Date());
}

export function shortLabel(key: string): string {
  const [, m, d] = key.split("-");
  return `${d}/${m}`;
}

/* ------------------------------------------------------------------ */
/* Hook générique localStorage                                         */
/* ------------------------------------------------------------------ */

export function useLocalState<T>(
  key: string,
  initial: T | (() => T)
): [T, (v: T | ((prev: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      // Hydratation depuis localStorage : nécessairement après le premier
      // rendu (SSR sans accès au navigateur), d'où le setState dans l'effet.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw !== null) setState(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );

  return [state, set, hydrated];
}

/* ------------------------------------------------------------------ */
/* Données de démonstration (premier chargement uniquement)            */
/* ------------------------------------------------------------------ */

export function seedWeights(): WeightEntry[] {
  const out: WeightEntry[] = [];
  const start = 82.4;
  for (let i = 8; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    // légère tendance descendante avec un peu de bruit déterministe
    const w = start - (8 - i) * 0.45 + ((i * 7) % 3) * 0.1;
    out.push({ date: toKey(d), weight: Math.round(w * 10) / 10 });
  }
  return out;
}

export const defaultProfile: Profile = {
  name: "Athlète ProEat",
  goal: "seche",
  targetKcal: 2300,
  targetProtein: 170,
  targetCarbs: 240,
  targetFat: 70,
  targetWeight: 76,
  height: 178,
  memberSince: "2026-01-12",
};

export function useProfile() {
  return useLocalState<Profile>("proeat-profile", defaultProfile);
}

export function useWeights() {
  return useLocalState<WeightEntry[]>("proeat-weights", seedWeights);
}

export function useFoodLog() {
  return useLocalState<FoodEntry[]>("proeat-food-log", []);
}

export function dayTotals(entries: FoodEntry[], date: string) {
  const day = entries.filter((e) => e.date === date);
  return day.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
