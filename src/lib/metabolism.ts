export type Sex = "homme" | "femme";
export type Goal = "seche" | "maintien" | "masse";

export const activityLevels = [
  {
    id: "sedentaire",
    label: "Sédentaire",
    description: "Travail de bureau, peu ou pas d'exercice",
    factor: 1.2,
  },
  {
    id: "leger",
    label: "Légèrement actif",
    description: "1 à 3 séances de sport par semaine",
    factor: 1.375,
  },
  {
    id: "modere",
    label: "Modérément actif",
    description: "3 à 5 séances de sport par semaine",
    factor: 1.55,
  },
  {
    id: "actif",
    label: "Très actif",
    description: "6 à 7 séances de sport par semaine",
    factor: 1.725,
  },
  {
    id: "athlete",
    label: "Athlète",
    description: "Entraînement biquotidien ou métier physique",
    factor: 1.9,
  },
] as const;

export type ActivityId = (typeof activityLevels)[number]["id"];

export interface MetabolismInput {
  sex: Sex;
  age: number;
  height: number; // cm
  weight: number; // kg
  activity: ActivityId;
}

export interface MetabolismResult {
  bmr: number;
  tdee: number;
  maintien: number;
  seche: number;
  masse: number;
  macros: Record<Goal, { protein: number; carbs: number; fat: number; kcal: number }>;
}

/** Équation de Mifflin-St Jeor, référence actuelle en nutrition clinique. */
export function computeMetabolism(input: MetabolismInput): MetabolismResult {
  const { sex, age, height, weight, activity } = input;
  const bmr = Math.round(
    10 * weight + 6.25 * height - 5 * age + (sex === "homme" ? 5 : -161)
  );
  const factor =
    activityLevels.find((a) => a.id === activity)?.factor ?? 1.55;
  const tdee = Math.round(bmr * factor);

  const maintien = tdee;
  const seche = Math.round(tdee * 0.82); // déficit ~18 %
  const masse = Math.round(tdee * 1.12); // surplus ~12 %

  const macrosFor = (kcal: number, proteinPerKg: number) => {
    const protein = Math.round(weight * proteinPerKg);
    const fat = Math.round((kcal * 0.27) / 9);
    const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));
    return { protein, carbs, fat, kcal };
  };

  return {
    bmr,
    tdee,
    maintien,
    seche,
    masse,
    macros: {
      seche: macrosFor(seche, 2.2),
      maintien: macrosFor(maintien, 1.8),
      masse: macrosFor(masse, 2.0),
    },
  };
}
