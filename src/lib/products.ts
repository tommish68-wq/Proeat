export type ProductCategory = "seche" | "masse" | "mealprep";

export interface GuideChapter {
  title: string;
  points: string[];
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  description: string;
  pages: number;
  bestseller?: boolean;
  /* Contenu réel du guide — affiché dans « Voir le contenu » */
  chapters: GuideChapter[];
}

export const productCategoryLabels: Record<ProductCategory, string> = {
  seche: "Sèche",
  masse: "Prise de masse",
  mealprep: "Organisation",
};

export const packPrice = 19.9;

export const products: Product[] = [
  {
    id: "guide-seche-sans-souffrir",
    title: "La sèche sans souffrir",
    subtitle: "Perdre du gras, garder le muscle",
    category: "seche",
    price: 9.99,
    bestseller: true,
    description:
      "La méthode pas à pas pour perdre du gras sans avoir faim en permanence, sans supprimer vos aliments préférés et sans sacrifier votre muscle.",
    pages: 52,
    chapters: [
      {
        title: "Comprendre ce qui fait vraiment perdre du gras",
        points: [
          "Le seul moteur de la perte de gras : le déficit calorique — manger un peu moins que ce que votre corps dépense",
          "Pourquoi les régimes drastiques échouent : plus le déficit est brutal, plus la faim, la fatigue et la fonte musculaire s'installent",
          "L'objectif d'une bonne sèche : perdre 0,5 à 1 % de votre poids par semaine, pas plus",
          "Aucun aliment ne fait grossir en soi : c'est le total de la semaine qui compte",
        ],
      },
      {
        title: "Calculer vos calories et vos macros",
        points: [
          "Estimez votre dépense totale (TDEE) avec le calculateur ProEat, puis retirez 15 à 20 % — jamais plus au début",
          "Protéines : 2 à 2,2 g par kilo de poids de corps pour protéger le muscle pendant le déficit",
          "Lipides : jamais sous 0,8 g/kg — ils régulent vos hormones",
          "Le reste en glucides : ils alimentent vos séances et votre moral",
        ],
      },
      {
        title: "Construire des repas qui calent",
        points: [
          "La règle de l'assiette : une source de protéines + des légumes à volonté + une portion de féculents + une portion de bons lipides",
          "Privilégiez les aliments à fort volume et faibles calories : légumes, fruits entiers, féculents complets, viandes maigres, œufs, skyr",
          "Buvez 30 à 40 cl d'eau avant chaque repas et mangez lentement : la satiété a besoin de 15 à 20 minutes pour arriver",
          "Gardez 10 à 15 % de vos calories pour les plaisirs : une sèche tenable est une sèche réussie",
        ],
      },
      {
        title: "Gérer la faim et les envies",
        points: [
          "Faim à heure fixe = repas mal répartis : redistribuez vos calories sur 3 repas + 1 collation protéinée",
          "Envie de sucre le soir ? Prévoyez-la : un dessert protéiné planifié vaut mieux qu'un placard dévalisé à 23 h",
          "Le café, le thé, les chewing-gums et les boissons zéro sont vos alliés des coups de mou",
          "Un écart n'annule rien : c'est la moyenne de la semaine qui décide, reprenez simplement au repas suivant",
        ],
      },
      {
        title: "S'entraîner pendant une sèche",
        points: [
          "La musculation reste prioritaire : c'est elle qui dit à votre corps de garder le muscle",
          "Conservez des charges lourdes, réduisez plutôt le volume (moins de séries) si la fatigue monte",
          "Le cardio est un outil d'appoint : 2 à 3 séances de 20 à 30 minutes suffisent, inutile d'en faire des heures",
          "Marchez : 8 000 à 10 000 pas par jour brûlent plus de calories sur la semaine qu'une séance de cardio",
        ],
      },
      {
        title: "Suivre et ajuster sans obsession",
        points: [
          "Pesez-vous 3 à 4 fois par semaine, le matin à jeun, et ne regardez que la moyenne hebdomadaire",
          "Le poids stagne 2 semaines ? Retirez 100 à 150 kcal ou ajoutez 1 500 pas quotidiens — un seul levier à la fois",
          "Prenez des photos et un tour de taille toutes les 2 semaines : le miroir progresse souvent quand la balance dort",
          "Utilisez le tracker ProEat : ce qui est mesuré s'améliore",
        ],
      },
      {
        title: "Sortir de sèche proprement",
        points: [
          "Ne fêtez pas la fin de sèche en mangeant double : remontez vos calories de 100 à 150 kcal par semaine",
          "Stabilisez-vous 4 à 6 semaines à votre nouveau maintien avant tout nouvel objectif",
          "Gardez les habitudes qui ont marché : protéines à chaque repas, légumes, pas quotidiens",
          "La sèche est finie quand le résultat tient sans effort conscient — pas avant",
        ],
      },
    ],
  },
  {
    id: "guide-masse-propre",
    title: "Prise de masse propre",
    subtitle: "Construire du muscle, pas du gras",
    category: "masse",
    price: 9.99,
    description:
      "Le plan complet pour prendre du muscle régulièrement sans vous couvrir de gras : surplus intelligent, entraînement structuré et ajustements simples.",
    pages: 56,
    chapters: [
      {
        title: "La vérité sur la prise de masse",
        points: [
          "Le muscle se construit lentement : 1 à 2 kg de muscle par trimestre pour un débutant, c'est déjà excellent",
          "Le « dirty bulk » (manger tout et n'importe quoi) fait surtout prendre du gras qu'il faudra re-perdre",
          "Un surplus modéré de 10 à 12 % au-dessus de votre maintien suffit à maximiser la construction",
          "Sans entraînement structuré, le surplus devient du stockage : l'assiette et la barre travaillent ensemble",
        ],
      },
      {
        title: "Vos calories et macros de construction",
        points: [
          "Partez de votre TDEE (calculateur ProEat) et ajoutez 10 à 12 % — soit environ 250 à 350 kcal",
          "Protéines : 1,8 à 2 g par kilo de poids de corps, réparties sur 3 à 4 prises dans la journée",
          "Glucides généreux autour de l'entraînement : c'est votre carburant de séance",
          "Visez une prise de 0,25 à 0,5 % de votre poids par semaine — au-delà, c'est du gras",
        ],
      },
      {
        title: "Les aliments qui construisent",
        points: [
          "Protéines : poulet, bœuf maigre, poisson, œufs, skyr, fromage blanc, tofu, légumineuses",
          "Glucides : riz, pâtes, pommes de terre, avoine, pain complet, fruits — variez selon vos goûts",
          "Lipides utiles : huile d'olive, avocat, oléagineux, poissons gras 2 fois par semaine",
          "Journée type 2 800 kcal : porridge protéiné le matin, poulet-riz-brocoli le midi, collation shake + banane, saumon-patates le soir",
        ],
      },
      {
        title: "L'entraînement qui force la croissance",
        points: [
          "La surcharge progressive est la règle n° 1 : ajoutez du poids ou des répétitions chaque semaine, notez tout",
          "Construisez vos séances autour des mouvements de base : squat, soulevé, développés, tractions, rowing",
          "10 à 20 séries efficaces par muscle et par semaine, à 1-3 répétitions de l'échec",
          "3 à 4 séances par semaine bien récupérées battent 6 séances à moitié dormi : le muscle pousse pendant le repos",
        ],
      },
      {
        title: "Manger assez quand on n'a pas faim",
        points: [
          "Densifiez vos plats : huile d'olive, beurre de cacahuète, oléagineux, fromage râpé ajoutent des calories sans volume",
          "Les liquides passent mieux : un shake lait-avoine-banane-beurre de cacahuète apporte 600 kcal sans effort",
          "Réduisez les crudités à volonté en période de masse : elles remplissent l'estomac pour presque rien",
          "Mangez à heures fixes : l'appétit se muscle aussi, avec la régularité",
        ],
      },
      {
        title: "Suivre, ajuster, corriger",
        points: [
          "Moyenne de poids hebdomadaire : si elle monte de moins de 0,25 %/semaine, ajoutez 150 kcal",
          "Si elle monte de plus de 0,5 %/semaine ou que le tour de taille file, retirez 150 kcal",
          "Vos charges d'entraînement doivent monter au fil des semaines : sinon, revoyez sommeil, technique ou volume",
          "Photos toutes les 3 semaines dans les mêmes conditions : le meilleur juge de la « masse propre »",
        ],
      },
      {
        title: "Quand et comment s'arrêter",
        points: [
          "Une phase de masse efficace dure 3 à 6 mois : au-delà, la sensibilité à l'insuline et la motivation s'émoussent",
          "Passez au maintien 4 à 6 semaines avant d'envisager une sèche courte si besoin",
          "Le cycle gagnant du naturel : masse propre longue → mini-sèche courte → répéter",
          "Chaque cycle bien mené vous laisse plus musclé et à peine plus gras : c'est la trajectoire qui compte",
        ],
      },
    ],
  },
  {
    id: "guide-meal-prep-facile",
    title: "Meal prep facile",
    subtitle: "Une semaine de repas en 2 h",
    category: "mealprep",
    price: 7.9,
    description:
      "La méthode d'organisation qui rend votre nutrition automatique : 2 heures le dimanche, une semaine de repas prêts, zéro décision à prendre en semaine.",
    pages: 44,
    chapters: [
      {
        title: "Pourquoi le meal prep change tout",
        points: [
          "80 % des écarts arrivent quand on a faim et rien de prêt : le meal prep supprime le problème à la racine",
          "Décider une fois le dimanche = zéro volonté nécessaire le mardi soir",
          "Vous savez exactement ce que vous mangez : calories et macros deviennent prévisibles",
          "Budget divisé : cuisiner en lot coûte 30 à 40 % moins cher que les repas improvisés",
        ],
      },
      {
        title: "La méthode 1-2-3",
        points: [
          "1 base de féculents cuite en grande quantité : riz, pâtes complètes, pommes de terre ou quinoa",
          "2 sources de protéines préparées différemment : par exemple poulet rôti + œufs durs, ou bœuf haché + poisson",
          "3 légumes déclinables : un rôti au four, un cru, un surgelé de secours",
          "En combinant, vous obtenez 6 à 9 repas différents sans cuisiner 6 fois",
        ],
      },
      {
        title: "Vos 2 heures, minute par minute",
        points: [
          "0:00 — Four à 200 °C : légumes et protéines à rôtir enfournés en premier",
          "0:10 — Féculents en cuisson pendant que le four travaille",
          "0:30 — Deuxième protéine à la poêle, œufs durs en parallèle",
          "1:00 — Refroidissement, découpe, répartition dans les contenants",
          "1:30 — Portions pesées, boîtes fermées, frigo rangé, cuisine propre : terminé",
        ],
      },
      {
        title: "Conserver sans risque",
        points: [
          "3 à 4 jours maximum au réfrigérateur dans des boîtes hermétiques — préparez jeudi ce qui se mange en fin de semaine, ou congelez",
          "Refroidissez rapidement : boîtes ouvertes 30 minutes avant fermeture, jamais de plat brûlant au frigo",
          "La congélation est votre amie : riz, viandes en sauce et soupes se congèlent très bien en portions",
          "Étiquetez avec la date : votre futur vous dira merci",
        ],
      },
      {
        title: "La liste de courses qui tient la semaine",
        points: [
          "Protéines : 1,2 à 1,5 kg de viande/poisson + 1 douzaine d'œufs + 1 kg de skyr ou fromage blanc",
          "Féculents : 1 kg de riz ou pâtes + 1,5 kg de pommes de terre + flocons d'avoine",
          "Légumes : 3 frais de saison + 2 sachets surgelés de secours",
          "Bonus satiété : fruits, oléagineux, épices et sauces légères pour ne jamais manger triste",
        ],
      },
      {
        title: "5 formules à décliner sans réfléchir",
        points: [
          "Le classique : poulet rôti + riz + brocoli + sauce yaourt-citron",
          "Le bowl : quinoa + œufs durs + crudités + avocat + graines",
          "Le tex-mex : bœuf haché 5 % + riz + maïs + poivrons + épices fajitas",
          "L'express : pâtes complètes + thon + tomates cerises + olives",
          "Le réconfort : patate douce rôtie + haricots noirs + fromage râpé + salade",
        ],
      },
      {
        title: "Réchauffer sans ruiner le repas",
        points: [
          "Micro-ondes : ajoutez une cuillère d'eau avant de réchauffer riz et poulet, couvrez, et tout reste moelleux",
          "Gardez les sauces et le croquant (graines, oléagineux) à part, à ajouter au dernier moment",
          "Certains plats sont meilleurs froids : transformez le surplus en salade composée",
          "L'erreur classique : tout assaisonner pareil — variez épices et sauces, pas les bases",
        ],
      },
    ],
  },
];
