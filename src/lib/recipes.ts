export type MealCategory =
  | "petit-dejeuner"
  | "dejeuner"
  | "diner"
  | "collation";

export type RecipeTag =
  | "proteine"
  | "vegetarien"
  | "faible-calories"
  | "masse"
  | "seche";

export interface Recipe {
  id: string;
  title: string;
  category: MealCategory;
  tags: RecipeTag[];
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  time: number; // minutes
  image: string;
  ingredients: string[];
  steps: string[];
  /* Merchandising — présentation « produit » de la recette */
  badge?: "Coup de cœur" | "Nouveau" | "Sélection ProEat";
  sell?: string; // accroche commerciale affichée en fiche
  benefits?: string[]; // « pourquoi vous allez l'adorer »
}

export const categoryLabels: Record<MealCategory, string> = {
  "petit-dejeuner": "Petit-déjeuner",
  dejeuner: "Déjeuner",
  diner: "Dîner",
  collation: "Collation",
};

export const tagLabels: Record<RecipeTag, string> = {
  proteine: "Riche en protéines",
  vegetarien: "Végétarien",
  "faible-calories": "Faible en calories",
  masse: "Prise de masse",
  seche: "Sèche",
};

import { asset } from "@/lib/asset";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=75`;

/* Sélection de démonstration — la base s'enrichit à chaque mise à jour. */
export const recipes: Recipe[] = [
  {
    id: "bowl-proteine-avoine",
    badge: "Coup de cœur",
    sell: "38 g de protéines prêts avant la fin de votre café : le petit-déjeuner qui lance vraiment la journée.",
    benefits: [
      "38 g de protéines pour lancer la synthèse musculaire dès le réveil",
      "Prêt en 10 minutes avec 6 ingrédients du placard",
      "Rassasiant jusqu'au déjeuner : fini le grignotage de 11 h",
    ],
    title: "Porridge protéiné banane & beurre de cacahuète",
    category: "petit-dejeuner",
    tags: ["proteine", "vegetarien", "masse"],
    kcal: 540,
    protein: 38,
    carbs: 62,
    fat: 16,
    time: 10,
    image: img("photo-1484723091739-30a097e8f929"),
    ingredients: [
      "80 g de flocons d'avoine",
      "1 scoop (30 g) de whey vanille",
      "250 ml de lait demi-écrémé",
      "1 banane",
      "15 g de beurre de cacahuète",
      "1 pincée de cannelle",
    ],
    steps: [
      "Faites chauffer les flocons d'avoine avec le lait 3 à 4 minutes à feu doux.",
      "Hors du feu, incorporez la whey en mélangeant énergiquement.",
      "Ajoutez la banane en rondelles, le beurre de cacahuète et la cannelle.",
    ],
  },
  {
    id: "skyr-granola",
    title: "Bol de skyr, granola maison & fruits rouges",
    category: "petit-dejeuner",
    tags: ["proteine", "vegetarien", "faible-calories", "seche"],
    kcal: 320,
    protein: 28,
    carbs: 38,
    fat: 7,
    time: 5,
    image: img("photo-1488477181946-6428a0291777"),
    ingredients: [
      "250 g de skyr nature",
      "30 g de granola",
      "100 g de fruits rouges",
      "1 c. à café de miel",
    ],
    steps: [
      "Versez le skyr dans un bol.",
      "Ajoutez le granola, les fruits rouges et le filet de miel.",
    ],
  },
  {
    id: "poulet-riz-brocoli",
    badge: "Sélection ProEat",
    sell: "Le classique absolu de la prise de masse propre : 52 g de protéines dans une assiette qui cale vraiment.",
    benefits: [
      "52 g de protéines — l'assiette de référence des pratiquants",
      "Parfaite en batch cooking : préparez 4 portions d'un coup",
      "Macros idéales autour de l'entraînement",
    ],
    title: "Poulet grillé, riz basmati & brocoli vapeur",
    category: "dejeuner",
    tags: ["proteine", "masse"],
    kcal: 620,
    protein: 52,
    carbs: 68,
    fat: 12,
    time: 25,
    image: img("photo-1432139555190-58524dae6a55"),
    ingredients: [
      "180 g de filet de poulet",
      "90 g de riz basmati (cru)",
      "200 g de brocoli",
      "Paprika fumé, ail, huile d'olive",
    ],
    steps: [
      "Cuisez le riz selon les indications du paquet.",
      "Grillez le poulet mariné au paprika et à l'ail 5 à 6 minutes par face.",
      "Cuisez le brocoli 6 minutes à la vapeur et dressez avec un filet d'huile d'olive.",
    ],
  },
  {
    id: "buddha-bowl",
    title: "Buddha bowl quinoa, pois chiches & avocat",
    category: "dejeuner",
    tags: ["vegetarien", "proteine"],
    kcal: 560,
    protein: 24,
    carbs: 62,
    fat: 24,
    time: 20,
    image: img("photo-1512621776951-a57141f2eefd"),
    ingredients: [
      "80 g de quinoa (cru)",
      "120 g de pois chiches cuits",
      "1/2 avocat",
      "1 carotte râpée",
      "80 g de chou rouge émincé",
      "Sauce tahini-citron",
    ],
    steps: [
      "Cuisez le quinoa 12 minutes puis laissez-le refroidir.",
      "Rôtissez les pois chiches au paprika 10 minutes à la poêle.",
      "Assemblez le bowl et nappez de sauce tahini-citron.",
    ],
  },
  {
    id: "curry-lentilles",
    title: "Curry de lentilles corail au lait de coco",
    category: "diner",
    tags: ["vegetarien", "proteine"],
    kcal: 520,
    protein: 24,
    carbs: 66,
    fat: 18,
    time: 25,
    image: img("photo-1455619452474-d2be8b1e70cd"),
    ingredients: [
      "120 g de lentilles corail",
      "150 ml de lait de coco léger",
      "200 g de tomates concassées",
      "1 oignon, curry, curcuma",
      "Coriandre fraîche",
    ],
    steps: [
      "Faites revenir l'oignon avec les épices 2 minutes.",
      "Ajoutez lentilles, tomates et 250 ml d'eau, cuisez 15 minutes.",
      "Incorporez le lait de coco, laissez épaissir et parsemez de coriandre.",
    ],
  },
  {
    id: "brochettes-poulet",
    title: "Brochettes de poulet marinées & quinoa citronné",
    category: "diner",
    tags: ["proteine", "seche"],
    kcal: 470,
    protein: 45,
    carbs: 44,
    fat: 12,
    time: 25,
    image: img("photo-1555939594-58d7cb561ad1"),
    ingredients: [
      "160 g de filet de poulet en cubes",
      "70 g de quinoa (cru)",
      "1 poivron, 1/2 oignon rouge",
      "Yaourt, citron, paprika, origan",
    ],
    steps: [
      "Faites mariner le poulet 15 minutes dans le yaourt citronné épicé.",
      "Montez les brochettes en alternant poulet et légumes.",
      "Grillez 12 minutes en tournant et servez sur le quinoa.",
    ],
  },
  {
    id: "shake-post-training",
    sell: "La fenêtre anabolique n'attend pas : 32 g de protéines mixés en 30 secondes.",
    benefits: [
      "32 g de protéines assimilées rapidement après la séance",
      "30 secondes chrono, un seul blender à laver",
      "La banane recharge le glycogène dépensé à l'entraînement",
    ],
    title: "Shake post-training banane & flocons",
    category: "collation",
    tags: ["proteine", "vegetarien", "masse"],
    kcal: 390,
    protein: 32,
    carbs: 52,
    fat: 6,
    time: 5,
    image: img("photo-1553530666-ba11a7da3888"),
    ingredients: [
      "1 scoop de whey chocolat",
      "1 banane",
      "40 g de flocons d'avoine",
      "300 ml de lait d'amande",
      "Glaçons",
    ],
    steps: [
      "Placez tous les ingrédients dans un blender.",
      "Mixez 30 secondes et consommez dans l'heure qui suit la séance.",
    ],
  },
  {
    id: "bowl-cottage",
    title: "Bowl de cottage cheese, concombre & noix",
    category: "collation",
    tags: ["proteine", "vegetarien", "faible-calories", "seche"],
    kcal: 240,
    protein: 24,
    carbs: 10,
    fat: 12,
    time: 5,
    image: img("photo-1490645935967-10de6ba17061"),
    ingredients: [
      "200 g de cottage cheese",
      "1/4 de concombre",
      "15 g de noix",
      "Ciboulette, poivre",
    ],
    steps: [
      "Versez le cottage cheese dans un bol.",
      "Ajoutez le concombre en dés, les noix concassées et la ciboulette.",
    ],
  },
  {
    id: "acai-bowl-fraises",
    title: "Bowl glacé açaï, fraises & pollen",
    category: "petit-dejeuner",
    tags: ["vegetarien", "faible-calories", "seche"],
    kcal: 220,
    protein: 7,
    carbs: 38,
    fat: 5,
    time: 10,
    image: asset("/images/recette-bowl-acai.jpg"),
    badge: "Nouveau",
    sell: "La fraîcheur d'un sorbet, les bénéfices d'un super-aliment : le bowl qui rend la sèche photogénique.",
    benefits: [
      "Seulement 220 kcal pour un dessert-déjeuner ultra rassasiant",
      "Antioxydants de l'açaï et vitamine C des fraises fraîches",
      "Prêt en 10 minutes, aussi beau que bon",
    ],
    ingredients: [
      "100 g de purée d'açaï surgelée",
      "1 banane bien mûre congelée",
      "80 ml de lait d'amande",
      "6 fraises fraîches",
      "1 c. à café de pollen frais",
      "1 c. à café de graines de chia",
    ],
    steps: [
      "Mixez l'açaï, la banane congelée et le lait d'amande jusqu'à une texture de sorbet.",
      "Versez dans un bol bien froid.",
      "Disposez les fraises en éventail, parsemez de pollen et de graines de chia.",
    ],
  },
  {
    id: "sandwich-poulet-oeufs",
    title: "Sandwich complet poulet & œufs brouillés",
    category: "dejeuner",
    tags: ["proteine", "masse"],
    kcal: 676,
    protein: 35,
    carbs: 66,
    fat: 30,
    time: 15,
    image: img("photo-1528735602780-2552fd46c7af"),
    badge: "Coup de cœur",
    sell: "Le sandwich qui remplace un repas complet : 35 g de protéines entre deux tranches de pain de campagne.",
    benefits: [
      "35 g de protéines : poulet grillé + œufs brouillés dans le même sandwich",
      "676 kcal maîtrisées — le vrai repas de prise de masse à emporter",
      "15 minutes, zéro vaisselle au bureau",
    ],
    ingredients: [
      "2 belles tranches de pain de campagne complet",
      "100 g de filet de poulet grillé",
      "2 œufs brouillés",
      "1/4 de concombre en rubans",
      "Jeunes pousses, ciboulette",
      "1 c. à soupe de fromage frais",
    ],
    steps: [
      "Brouillez les œufs à feu doux avec la ciboulette, réservez-les crémeux.",
      "Toastez le pain et tartinez-le de fromage frais.",
      "Empilez pousses, poulet grillé, œufs et concombre, refermez et coupez en deux.",
    ],
  },
  {
    id: "patate-douce-farcie",
    title: "Patate douce farcie végé, quinoa & haricots noirs",
    category: "diner",
    tags: ["vegetarien", "proteine", "masse"],
    kcal: 560,
    protein: 16,
    carbs: 83,
    fat: 18,
    time: 40,
    image: img("photo-1596097635121-14b63b7a0c19"),
    badge: "Sélection ProEat",
    sell: "Le dîner végé qui n'a rien à envier à un cheat meal : fondant, coloré et complet.",
    benefits: [
      "Protéines végétales complètes : quinoa + haricots noirs",
      "Fibres et glucides complexes pour une satiété longue durée",
      "Une seule plaque au four, dressage spectaculaire",
    ],
    ingredients: [
      "1 grosse patate douce",
      "60 g de quinoa (cru)",
      "100 g de haricots noirs cuits",
      "50 g de maïs",
      "1/2 avocat, tomates cerises, coriandre",
      "Sauce tahini citronnée",
    ],
    steps: [
      "Rôtissez la patate douce entière 35 minutes au four à 200 °C, puis fendez-la en deux.",
      "Cuisez le quinoa et mélangez-le aux haricots noirs et au maïs assaisonnés.",
      "Garnissez la patate douce, ajoutez avocat et tomates, nappez de sauce tahini.",
    ],
  },
  {
    id: "avocado-toast-proteine",
    title: "Avocado toast protéiné",
    category: "petit-dejeuner",
    tags: ["vegetarien", "proteine"],
    kcal: 400,
    protein: 14,
    carbs: 36,
    fat: 22,
    time: 10,
    image: asset("/images/recette-avocado-toast.jpg"),
    sell: "L'iconique des brunchs, version performance : bons lipides, graines croquantes et pain complet.",
    benefits: [
      "Lipides insaturés de l'avocat pour l'équilibre hormonal",
      "Graines de courge et pignons : magnésium et croquant",
      "10 minutes pour un brunch digne d'un café de Bali",
    ],
    ingredients: [
      "2 tranches de pain complet au levain",
      "1 avocat mûr",
      "1 c. à soupe de graines de courge et pignons",
      "1 c. à soupe de ricotta",
      "Jus de citron, piment doux, fleur de sel",
    ],
    steps: [
      "Toastez le pain et frottez-le d'un filet de citron.",
      "Tartinez la ricotta puis disposez l'avocat en lamelles.",
      "Parsemez de graines torréfiées, de piment doux et de fleur de sel.",
    ],
  },
  {
    id: "milkshake-soja-banane",
    title: "Milk-shake soja, banane & cacao",
    category: "collation",
    tags: ["vegetarien", "proteine"],
    kcal: 312,
    protein: 18,
    carbs: 42,
    fat: 8,
    time: 5,
    image: img("photo-1572490122747-3968b75cc699"),
    sell: "Le goûter des athlètes végé : la gourmandise d'un milk-shake, les protéines d'une collation sérieuse.",
    benefits: [
      "18 g de protéines végétales issues du soja",
      "Cacao pur et banane : le goût dessert sans le sucre ajouté",
      "5 minutes, se glisse dans une gourde pour la salle",
    ],
    ingredients: [
      "300 ml de lait de soja",
      "1 banane congelée",
      "1 c. à soupe de cacao non sucré",
      "1 c. à café de beurre de cacahuète",
      "Glaçons",
    ],
    steps: [
      "Placez tous les ingrédients dans un blender.",
      "Mixez 40 secondes jusqu'à une mousse onctueuse et servez glacé.",
    ],
  },
  {
    id: "barres-cereales-cranberries",
    title: "Barres de céréales maison avoine & cranberries",
    category: "collation",
    tags: ["vegetarien", "masse"],
    kcal: 210,
    protein: 6,
    carbs: 28,
    fat: 8,
    time: 35,
    image: asset("/images/recette-barres-cereales.jpg"),
    badge: "Nouveau",
    sell: "La collation d'avant-séance sans la liste d'additifs : une fournée le dimanche, une semaine de barres prêtes.",
    benefits: [
      "Glucides complexes de l'avoine pour une énergie stable avant l'entraînement",
      "Zéro additif : six ingrédients que vous connaissez tous",
      "Une fournée = 8 barres, soit la semaine de collations réglée",
    ],
    ingredients: [
      "200 g de flocons d'avoine",
      "60 g de cranberries séchées",
      "40 g de graines (tournesol, sésame)",
      "80 g de miel",
      "50 g de beurre de cacahuète",
      "1 pincée de sel",
    ],
    steps: [
      "Faites fondre le miel et le beurre de cacahuète à feu doux.",
      "Mélangez avec l'avoine, les cranberries, les graines et le sel.",
      "Tassez fermement dans un moule et enfournez 20 minutes à 170 °C.",
      "Laissez refroidir complètement avant de découper en 8 barres.",
    ],
  },
  {
    id: "bowl-vert-kiwi-spiruline",
    title: "Smoothie bowl vert kiwi, spiruline & granola",
    category: "petit-dejeuner",
    tags: ["vegetarien", "faible-calories", "seche"],
    kcal: 310,
    protein: 14,
    carbs: 46,
    fat: 8,
    time: 10,
    image: asset("/images/recette-bowl-vert.jpg"),
    badge: "Nouveau",
    sell: "Le plein de micronutriments dans le bowl le plus vert de votre semaine — sans sacrifier les protéines.",
    benefits: [
      "Spiruline et kiwi : fer, vitamine C et antioxydants dès le matin",
      "Le skyr apporte 14 g de protéines sous la couleur verte",
      "Granola et graines de courge pour le croquant qui rassasie",
    ],
    ingredients: [
      "150 g de skyr nature",
      "1 banane congelée",
      "2 kiwis",
      "1 c. à café de spiruline en poudre",
      "30 g de granola",
      "1 c. à soupe de graines de courge et chia",
      "1/2 poire en morceaux",
    ],
    steps: [
      "Mixez le skyr, la banane congelée, 1 kiwi et la spiruline jusqu'à une texture épaisse.",
      "Versez dans un bol froid.",
      "Garnissez de granola, du second kiwi en rondelles, de la poire et des graines.",
    ],
  },
  {
    id: "galette-oeuf-courgette",
    title: "Galette rustique à l'œuf, courgette & parmesan",
    category: "dejeuner",
    tags: ["vegetarien", "proteine"],
    kcal: 480,
    protein: 22,
    carbs: 42,
    fat: 24,
    time: 35,
    image: asset("/images/recette-galette-oeuf.jpg"),
    badge: "Nouveau",
    sell: "Le brunch du week-end qui tient ses macros : pâte dorée, œuf coulant et parmesan — sans passer par la boulangerie.",
    benefits: [
      "22 g de protéines entre l'œuf, la ricotta et le parmesan",
      "La courgette glisse une portion de légumes dans un plat plaisir",
      "Une seule plaque au four, un dressage qui impressionne",
    ],
    ingredients: [
      "1 pâte à galette rustique (ou pâte brisée complète)",
      "100 g de ricotta",
      "1/2 courgette en fines rondelles",
      "1 œuf extra-frais",
      "20 g de parmesan en copeaux",
      "Jeunes pousses, poivre du moulin",
    ],
    steps: [
      "Étalez la ricotta sur la pâte en laissant un bord de 3 cm, disposez la courgette.",
      "Repliez les bords, dorez-les et enfournez 20 minutes à 200 °C.",
      "Cassez l'œuf au centre et poursuivez la cuisson 8 minutes, jaune encore coulant.",
      "Parsemez de parmesan et de jeunes pousses au moment de servir.",
    ],
  },
];
