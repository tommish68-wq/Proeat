export type Sex = "homme" | "femme";
export type Goal = "seche" | "maintien" | "masse";

/* ------------------------------------------------------------------ */
/* Activité quotidienne HORS sport — le sport est compté séparément    */
/* via la liste MET ci-dessous, pour éviter tout double comptage.      */
/* ------------------------------------------------------------------ */

export const dailyActivities = [
  {
    id: "bureau",
    label: "Plutôt assis",
    description: "Travail de bureau, études, trajets motorisés",
    factor: 1.2,
  },
  {
    id: "actif",
    label: "Souvent debout",
    description: "Vente, enseignement, soins, beaucoup de marche",
    factor: 1.35,
  },
  {
    id: "physique",
    label: "Métier physique",
    description: "Chantier, manutention, agriculture, livraison",
    factor: 1.5,
  },
] as const;

export type DailyActivityId = (typeof dailyActivities)[number]["id"];

/* ------------------------------------------------------------------ */
/* Sports — valeurs MET issues du Compendium of Physical Activities.  */
/* kcal/séance = MET × 3,5 × poids(kg) / 200 × durée(min)             */
/* ------------------------------------------------------------------ */

export const sports = [
  { id: "aucun", label: "Aucun sport pour le moment", group: "Général", met: 0 },
  { id: "musculation", label: "Musculation", group: "Force & fitness", met: 5.0 },
  { id: "crossfit", label: "CrossFit / cross-training", group: "Force & fitness", met: 8.0 },
  { id: "hiit", label: "HIIT / circuit training", group: "Force & fitness", met: 8.0 },
  { id: "course", label: "Course à pied", group: "Endurance", met: 9.8 },
  { id: "trail", label: "Trail / course nature", group: "Endurance", met: 9.0 },
  { id: "cyclisme", label: "Cyclisme / vélo route", group: "Endurance", met: 7.5 },
  { id: "natation", label: "Natation", group: "Endurance", met: 8.0 },
  { id: "aviron", label: "Aviron / rameur", group: "Endurance", met: 7.0 },
  { id: "marche", label: "Marche rapide / randonnée", group: "Endurance", met: 4.5 },
  { id: "football", label: "Football", group: "Sports collectifs", met: 8.0 },
  { id: "basketball", label: "Basketball", group: "Sports collectifs", met: 7.5 },
  { id: "handball", label: "Handball", group: "Sports collectifs", met: 8.0 },
  { id: "rugby", label: "Rugby", group: "Sports collectifs", met: 8.5 },
  { id: "volleyball", label: "Volleyball", group: "Sports collectifs", met: 6.0 },
  { id: "tennis", label: "Tennis", group: "Raquette", met: 7.0 },
  { id: "padel", label: "Padel / badminton", group: "Raquette", met: 6.5 },
  { id: "boxe", label: "Boxe / kickboxing", group: "Sports de combat", met: 9.0 },
  { id: "mma", label: "MMA / grappling / JJB", group: "Sports de combat", met: 9.5 },
  { id: "judo", label: "Judo / lutte", group: "Sports de combat", met: 10.0 },
  { id: "escalade", label: "Escalade", group: "Autres", met: 7.5 },
  { id: "danse", label: "Danse", group: "Autres", met: 6.0 },
  { id: "equitation", label: "Équitation", group: "Autres", met: 5.5 },
  { id: "yoga", label: "Yoga / Pilates", group: "Autres", met: 3.0 },
  { id: "autre", label: "Autre sport", group: "Général", met: 6.0 },
] as const;

export type SportId = (typeof sports)[number]["id"];

export const sportGroups = [
  "Général",
  "Force & fitness",
  "Endurance",
  "Sports collectifs",
  "Raquette",
  "Sports de combat",
  "Autres",
] as const;

/** Dépense estimée d'une séance, en kcal. */
export function sessionKcal(
  sport: SportId,
  weight: number,
  minutes: number
): number {
  const met = sports.find((s) => s.id === sport)?.met ?? 0;
  return Math.round(((met * 3.5 * weight) / 200) * minutes);
}

export interface MetabolismInput {
  sex: Sex;
  age: number;
  height: number; // cm
  weight: number; // kg
  daily: DailyActivityId;
  sport: SportId;
  sessionsPerWeek: number;
  sessionMinutes: number;
}

export interface MetabolismResult {
  bmr: number;
  tdee: number;
  sportKcalPerDay: number;
  maintien: number;
  seche: number;
  masse: number;
  macros: Record<Goal, { protein: number; carbs: number; fat: number; kcal: number }>;
}

/** Équation de Mifflin-St Jeor, référence actuelle en nutrition clinique. */
export function computeMetabolism(input: MetabolismInput): MetabolismResult {
  const { sex, age, height, weight, daily, sport, sessionsPerWeek, sessionMinutes } =
    input;
  const bmr = Math.round(
    10 * weight + 6.25 * height - 5 * age + (sex === "homme" ? 5 : -161)
  );
  const factor =
    dailyActivities.find((a) => a.id === daily)?.factor ?? 1.2;
  const sportKcalPerDay = Math.round(
    (sessionKcal(sport, weight, sessionMinutes) * sessionsPerWeek) / 7
  );
  const tdee = Math.round(bmr * factor + sportKcalPerDay);

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
    sportKcalPerDay,
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
