export type Level = "debutant" | "intermediaire" | "avance";
export type ProgramGoal = "force" | "hypertrophie" | "seche" | "remise-en-forme";
export type Equipment = "salle" | "halteres" | "poids-du-corps";

export interface ProgramInput {
  level: Level;
  goal: ProgramGoal;
  daysPerWeek: 2 | 3 | 4 | 5;
  equipment: Equipment;
  duration: 30 | 45 | 60 | 75;
}

export interface Exercise {
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface Session {
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface Program {
  title: string;
  subtitle: string;
  weeks: number;
  sessions: Session[];
  tips: string[];
}

type MovementPattern =
  | "squat"
  | "hinge"
  | "pousse-h"
  | "pousse-v"
  | "tirage-h"
  | "tirage-v"
  | "isolation-bras"
  | "isolation-epaules"
  | "isolation-jambes"
  | "core";

const catalogue: Record<Equipment, Record<MovementPattern, { name: string; muscle: string }[]>> = {
  salle: {
    squat: [
      { name: "Squat barre", muscle: "Quadriceps, fessiers" },
      { name: "Presse à cuisses", muscle: "Quadriceps" },
      { name: "Fentes marchées haltères", muscle: "Quadriceps, fessiers" },
    ],
    hinge: [
      { name: "Soulevé de terre roumain", muscle: "Ischios, fessiers" },
      { name: "Hip thrust barre", muscle: "Fessiers" },
      { name: "Leg curl allongé", muscle: "Ischios" },
    ],
    "pousse-h": [
      { name: "Développé couché barre", muscle: "Pectoraux, triceps" },
      { name: "Développé incliné haltères", muscle: "Haut des pectoraux" },
      { name: "Dips lestés", muscle: "Pectoraux, triceps" },
    ],
    "pousse-v": [
      { name: "Développé militaire barre", muscle: "Épaules" },
      { name: "Développé haltères assis", muscle: "Épaules" },
    ],
    "tirage-h": [
      { name: "Rowing barre", muscle: "Dos, biceps" },
      { name: "Rowing haltère unilatéral", muscle: "Grand dorsal" },
      { name: "Tirage horizontal poulie", muscle: "Milieu du dos" },
    ],
    "tirage-v": [
      { name: "Tractions pronation", muscle: "Grand dorsal, biceps" },
      { name: "Tirage vertical poulie", muscle: "Grand dorsal" },
    ],
    "isolation-bras": [
      { name: "Curl biceps barre EZ", muscle: "Biceps" },
      { name: "Extension triceps poulie", muscle: "Triceps" },
    ],
    "isolation-epaules": [
      { name: "Élévations latérales haltères", muscle: "Deltoïdes latéraux" },
      { name: "Oiseau haltères", muscle: "Deltoïdes postérieurs" },
    ],
    "isolation-jambes": [
      { name: "Leg extension", muscle: "Quadriceps" },
      { name: "Mollets debout à la machine", muscle: "Mollets" },
    ],
    core: [
      { name: "Crunch à la poulie", muscle: "Abdominaux" },
      { name: "Planche lestée", muscle: "Gainage profond" },
    ],
  },
  halteres: {
    squat: [
      { name: "Goblet squat", muscle: "Quadriceps, fessiers" },
      { name: "Fentes bulgares haltères", muscle: "Quadriceps, fessiers" },
    ],
    hinge: [
      { name: "Soulevé de terre roumain haltères", muscle: "Ischios, fessiers" },
      { name: "Hip thrust haltère", muscle: "Fessiers" },
    ],
    "pousse-h": [
      { name: "Développé couché haltères (au sol)", muscle: "Pectoraux, triceps" },
      { name: "Pompes lestées", muscle: "Pectoraux" },
    ],
    "pousse-v": [
      { name: "Développé haltères debout", muscle: "Épaules" },
      { name: "Développé Arnold", muscle: "Épaules" },
    ],
    "tirage-h": [
      { name: "Rowing haltères buste penché", muscle: "Dos, biceps" },
      { name: "Rowing haltère unilatéral", muscle: "Grand dorsal" },
    ],
    "tirage-v": [
      { name: "Pull-over haltère", muscle: "Grand dorsal" },
      { name: "Tractions (si barre)", muscle: "Grand dorsal, biceps" },
    ],
    "isolation-bras": [
      { name: "Curl biceps haltères", muscle: "Biceps" },
      { name: "Extension triceps nuque haltère", muscle: "Triceps" },
    ],
    "isolation-epaules": [
      { name: "Élévations latérales haltères", muscle: "Deltoïdes latéraux" },
      { name: "Oiseau haltères", muscle: "Deltoïdes postérieurs" },
    ],
    "isolation-jambes": [
      { name: "Mollets debout haltères", muscle: "Mollets" },
      { name: "Squat sumo haltère", muscle: "Adducteurs, fessiers" },
    ],
    core: [
      { name: "Russian twist haltère", muscle: "Obliques" },
      { name: "Planche", muscle: "Gainage profond" },
    ],
  },
  "poids-du-corps": {
    squat: [
      { name: "Squat au poids du corps", muscle: "Quadriceps, fessiers" },
      { name: "Fentes sautées", muscle: "Quadriceps, fessiers" },
      { name: "Pistol squat assisté", muscle: "Quadriceps" },
    ],
    hinge: [
      { name: "Hip thrust au sol", muscle: "Fessiers" },
      { name: "Good morning au poids du corps", muscle: "Ischios" },
    ],
    "pousse-h": [
      { name: "Pompes", muscle: "Pectoraux, triceps" },
      { name: "Pompes déclinées", muscle: "Haut des pectoraux" },
      { name: "Dips entre deux chaises", muscle: "Pectoraux, triceps" },
    ],
    "pousse-v": [
      { name: "Pompes piquées", muscle: "Épaules" },
      { name: "Handstand push-up au mur (progression)", muscle: "Épaules" },
    ],
    "tirage-h": [
      { name: "Rowing inversé sous une table", muscle: "Dos, biceps" },
      { name: "Superman au sol", muscle: "Lombaires, dos" },
    ],
    "tirage-v": [
      { name: "Tractions (barre ou porte)", muscle: "Grand dorsal, biceps" },
      { name: "Tractions australiennes", muscle: "Dos" },
    ],
    "isolation-bras": [
      { name: "Pompes prise serrée", muscle: "Triceps" },
      { name: "Curl isométrique serviette", muscle: "Biceps" },
    ],
    "isolation-epaules": [
      { name: "Élévations latérales élastique / bouteilles", muscle: "Deltoïdes" },
      { name: "Face pull élastique", muscle: "Deltoïdes postérieurs" },
    ],
    "isolation-jambes": [
      { name: "Mollets debout unilatéral", muscle: "Mollets" },
      { name: "Wall sit", muscle: "Quadriceps" },
    ],
    core: [
      { name: "Planche", muscle: "Gainage profond" },
      { name: "Mountain climbers", muscle: "Abdominaux, cardio" },
      { name: "Relevés de jambes allongé", muscle: "Bas des abdominaux" },
    ],
  },
};

const goalParams: Record<
  ProgramGoal,
  { sets: [number, number]; reps: string; repsIso: string; rest: string; restIso: string; label: string }
> = {
  force: {
    sets: [4, 5],
    reps: "3 à 5",
    repsIso: "8 à 10",
    rest: "3 min",
    restIso: "90 s",
    label: "Force",
  },
  hypertrophie: {
    sets: [3, 4],
    reps: "8 à 12",
    repsIso: "12 à 15",
    rest: "90 s",
    restIso: "60 s",
    label: "Hypertrophie",
  },
  seche: {
    sets: [3, 3],
    reps: "10 à 15",
    repsIso: "15 à 20",
    rest: "60 s",
    restIso: "45 s",
    label: "Sèche & définition",
  },
  "remise-en-forme": {
    sets: [2, 3],
    reps: "10 à 12",
    repsIso: "12 à 15",
    rest: "75 s",
    restIso: "60 s",
    label: "Remise en forme",
  },
};

/* Nombre d'exercices selon la durée de séance */
function exerciseCount(duration: ProgramInput["duration"]): number {
  return { 30: 4, 45: 5, 60: 6, 75: 7 }[duration];
}

const levelLabels: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const equipmentLabels: Record<Equipment, string> = {
  salle: "Salle de sport",
  halteres: "Haltères à la maison",
  "poids-du-corps": "Poids du corps",
};

/* Répartition des séances : full body, half body ou PPL selon la fréquence */
const splits: Record<number, { title: string; focus: string; patterns: MovementPattern[] }[]> = {
  2: [
    {
      title: "Full body A",
      focus: "Corps entier — dominante jambes & poussée",
      patterns: ["squat", "pousse-h", "tirage-h", "pousse-v", "isolation-jambes", "core", "isolation-bras"],
    },
    {
      title: "Full body B",
      focus: "Corps entier — dominante chaîne postérieure & tirage",
      patterns: ["hinge", "tirage-v", "pousse-h", "tirage-h", "isolation-epaules", "core", "isolation-bras"],
    },
  ],
  3: [
    {
      title: "Full body A",
      focus: "Corps entier — dominante quadriceps",
      patterns: ["squat", "pousse-h", "tirage-h", "isolation-epaules", "core", "isolation-bras", "isolation-jambes"],
    },
    {
      title: "Full body B",
      focus: "Corps entier — dominante dos & épaules",
      patterns: ["hinge", "tirage-v", "pousse-v", "tirage-h", "core", "isolation-bras", "isolation-epaules"],
    },
    {
      title: "Full body C",
      focus: "Corps entier — dominante chaîne postérieure",
      patterns: ["squat", "hinge", "pousse-h", "tirage-v", "isolation-jambes", "core", "isolation-epaules"],
    },
  ],
  4: [
    {
      title: "Haut du corps A",
      focus: "Poussée & tirage lourds",
      patterns: ["pousse-h", "tirage-h", "pousse-v", "tirage-v", "isolation-bras", "isolation-epaules", "core"],
    },
    {
      title: "Bas du corps A",
      focus: "Dominante quadriceps",
      patterns: ["squat", "hinge", "isolation-jambes", "core", "isolation-jambes", "hinge", "core"],
    },
    {
      title: "Haut du corps B",
      focus: "Volume épaules & bras",
      patterns: ["pousse-v", "tirage-v", "pousse-h", "tirage-h", "isolation-epaules", "isolation-bras", "core"],
    },
    {
      title: "Bas du corps B",
      focus: "Dominante chaîne postérieure",
      patterns: ["hinge", "squat", "isolation-jambes", "core", "hinge", "isolation-jambes", "core"],
    },
  ],
  5: [
    {
      title: "Push — Poussée",
      focus: "Pectoraux, épaules, triceps",
      patterns: ["pousse-h", "pousse-v", "pousse-h", "isolation-epaules", "isolation-bras", "core", "isolation-epaules"],
    },
    {
      title: "Pull — Tirage",
      focus: "Dos, biceps, arrière d'épaules",
      patterns: ["tirage-v", "tirage-h", "tirage-h", "isolation-epaules", "isolation-bras", "core", "tirage-v"],
    },
    {
      title: "Legs — Jambes",
      focus: "Quadriceps, ischios, mollets",
      patterns: ["squat", "hinge", "isolation-jambes", "isolation-jambes", "core", "squat", "hinge"],
    },
    {
      title: "Haut du corps",
      focus: "Rappel poussée & tirage",
      patterns: ["pousse-h", "tirage-h", "pousse-v", "tirage-v", "isolation-bras", "core", "isolation-epaules"],
    },
    {
      title: "Full body pump",
      focus: "Volume léger & points faibles",
      patterns: ["squat", "pousse-h", "tirage-h", "isolation-epaules", "isolation-bras", "isolation-jambes", "core"],
    },
  ],
};

export function generateProgram(input: ProgramInput): Program {
  const { level, goal, daysPerWeek, equipment, duration } = input;
  const params = goalParams[goal];
  const count = exerciseCount(duration);
  const catalog = catalogue[equipment];
  const baseSets = level === "debutant" ? params.sets[0] : params.sets[1];

  const sessions: Session[] = splits[daysPerWeek].map((split, si) => {
    const used = new Set<string>();
    const exercises: Exercise[] = [];
    for (const pattern of split.patterns) {
      if (exercises.length >= count) break;
      const options = catalog[pattern];
      // varie la sélection d'une séance à l'autre pour éviter la répétition
      const pick =
        options.find((o) => !used.has(o.name)) ?? options[si % options.length];
      if (used.has(pick.name)) continue;
      used.add(pick.name);
      const isIsolation = pattern.startsWith("isolation") || pattern === "core";
      exercises.push({
        name: pick.name,
        muscle: pick.muscle,
        sets: isIsolation ? Math.max(2, baseSets - 1) : baseSets,
        reps: isIsolation ? params.repsIso : params.reps,
        rest: isIsolation ? params.restIso : params.rest,
      });
    }
    return { title: split.title, focus: split.focus, exercises };
  });

  const tips: string[] = [
    "Échauffez-vous 8 à 10 minutes avant chaque séance (cardio léger + séries d'approche).",
    level === "debutant"
      ? "Priorité à la technique : gardez 2 à 3 répétitions en réserve sur chaque série."
      : "Appliquez la surcharge progressive : ajoutez du poids ou des répétitions chaque semaine.",
    goal === "seche"
      ? "Associez ce programme à un déficit calorique modéré et 8 à 10k pas par jour."
      : goal === "hypertrophie" || goal === "force"
        ? "Visez un léger surplus calorique et 1,8 à 2,2 g de protéines par kilo de poids de corps."
        : "Dormez 7 à 9 h par nuit : la récupération fait partie de l'entraînement.",
    "Déchargez (volume réduit de moitié) toutes les 5 à 6 semaines.",
  ];

  return {
    title: `${params.label} · ${daysPerWeek} séances / semaine`,
    subtitle: `${levelLabels[level]} · ${equipmentLabels[equipment]} · ${duration} min par séance`,
    weeks: 6,
    sessions,
    tips,
  };
}
