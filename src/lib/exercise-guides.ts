/* ------------------------------------------------------------------ */
/* Fiches techniques d'exercices — le coach dans la poche.             */
/* 2-3 étapes d'exécution + 1 conseil (erreur fréquente, tempo,        */
/* respiration ou sécurité). Ton direct, encourageant, précis.         */
/* ------------------------------------------------------------------ */

export interface ExerciseGuide {
  steps: string[];
  coachTip: string;
}

export const exerciseGuides: Record<string, ExerciseGuide> = {
  /* ---------- Jambes / squat ---------- */
  "Squat barre": {
    steps: [
      "Barre posée sur les trapèzes, pieds largeur d'épaules, pointes légèrement ouvertes.",
      "Inspire, gaine, et descends contrôlé en poussant les genoux vers l'extérieur, hanches sous le niveau des genoux.",
      "Pousse le sol pour remonter, expire en haut.",
    ],
    coachTip: "Garde le dos gainé du début à la fin — et ne rebondis jamais en bas, c'est là que ça se blesse.",
  },
  "Presse à cuisses": {
    steps: [
      "Pieds à plat au milieu du plateau, largeur d'épaules.",
      "Descends lentement jusqu'à 90° sans décoller le bas du dos du dossier.",
      "Pousse sur toute la surface du pied, sans verrouiller les genoux en haut.",
    ],
    coachTip: "Le bas du dos qui s'enroule en bas = amplitude trop grande. Raccourcis la descente, protège tes lombaires.",
  },
  "Fentes marchées haltères": {
    steps: [
      "Un haltère dans chaque main, grand pas vers l'avant.",
      "Descends le genou arrière vers le sol, buste droit, tibia avant vertical.",
      "Pousse sur le talon avant pour enchaîner le pas suivant.",
    ],
    coachTip: "Regarde loin devant, pas tes pieds — l'équilibre vient de la posture, pas des yeux au sol.",
  },
  "Goblet squat": {
    steps: [
      "Haltère tenu verticalement contre la poitrine, coudes vers le bas.",
      "Descends entre tes jambes, coudes à l'intérieur des genoux, talons au sol.",
      "Remonte en poussant fort, l'haltère toujours collé au buste.",
    ],
    coachTip: "C'est LE squat pour apprendre la profondeur : descends aussi bas que tes talons le permettent, jamais plus.",
  },
  "Fentes bulgares haltères": {
    steps: [
      "Pied arrière posé sur un banc, pied avant bien à plat, un haltère dans chaque main.",
      "Descends verticalement, le genou arrière vers le sol.",
      "Remonte en poussant sur le talon avant.",
    ],
    coachTip: "90 % du poids sur la jambe avant : la jambe arrière stabilise, elle ne travaille pas.",
  },
  "Squat au poids du corps": {
    steps: [
      "Pieds largeur d'épaules, bras tendus devant pour l'équilibre.",
      "Descends contrôlé jusqu'à ce que tes hanches passent sous tes genoux.",
      "Remonte en poussant le sol, corps gainé.",
    ],
    coachTip: "Tempo 3 secondes à la descente, explosif à la montée — la lenteur en bas, c'est ton futur squat lourd.",
  },
  "Fentes sautées": {
    steps: [
      "Position de fente, les deux genoux à 90°.",
      "Saute et change de jambe en l'air.",
      "Amortis la réception genou fléchi, enchaîne immédiatement.",
    ],
    coachTip: "Atterris comme un chat, sans bruit : une réception lourde, c'est de l'énergie perdue et des genoux qui trinquent.",
  },
  "Pistol squat assisté": {
    steps: [
      "Tiens un support (porte, sangle) à une main, une jambe tendue devant toi.",
      "Descends sur une jambe aussi bas que possible, contrôlé.",
      "Remonte en t'aidant du support le moins possible.",
    ],
    coachTip: "L'aide du bras doit diminuer semaine après semaine — c'est ça, ta progression mesurable.",
  },
  "Squat sumo haltère": {
    steps: [
      "Pieds très écartés, pointes à 45°, haltère tenu à deux mains entre les jambes.",
      "Descends verticalement, genoux qui suivent la direction des pointes.",
      "Remonte en serrant les fessiers en haut.",
    ],
    coachTip: "Le buste reste fier et vertical — si tu piques du nez, écarte un peu plus les pieds.",
  },
  "Leg extension": {
    steps: [
      "Règle le siège : genoux alignés avec l'axe de la machine.",
      "Tends les jambes complètement, marque 1 seconde en haut.",
      "Redescends en 3 secondes, sans laisser tomber la charge.",
    ],
    coachTip: "Tout se joue à la descente : freine la charge, ne la subis pas.",
  },
  "Wall sit": {
    steps: [
      "Dos plaqué contre le mur, cuisses parallèles au sol, genoux à 90°.",
      "Tiens la position, bras le long du corps ou croisés.",
      "Respire calmement, sans t'affaisser.",
    ],
    coachTip: "Les mains sur les cuisses = tricherie. Bras croisés sur la poitrine, et tiens bon quand ça brûle : c'est là que ça compte.",
  },

  /* ---------- Chaîne postérieure ---------- */
  "Soulevé de terre roumain": {
    steps: [
      "Barre en mains, pieds largeur de hanches, genoux légèrement fléchis.",
      "Pousse les hanches vers l'arrière en descendant la barre le long des cuisses, dos plat.",
      "Remonte en contractant fessiers et ischios, hanches vers la barre.",
    ],
    coachTip: "La barre frôle les jambes tout du long — si elle s'éloigne, tes lombaires paient l'addition.",
  },
  "Soulevé de terre roumain haltères": {
    steps: [
      "Haltères devant les cuisses, genoux souples.",
      "Hanches vers l'arrière, haltères qui glissent le long des jambes, dos neutre.",
      "Remonte en serrant les fessiers, sans hyperextension en haut.",
    ],
    coachTip: "Tu dois sentir l'étirement derrière les cuisses à chaque descente. Rien ? Pousse les hanches plus loin en arrière.",
  },
  "Hip thrust barre": {
    steps: [
      "Haut du dos sur un banc, barre sur les hanches (coussin conseillé).",
      "Pousse les hanches vers le plafond jusqu'à l'alignement épaules-hanches-genoux.",
      "Marque 1 seconde en haut en serrant fort les fessiers, redescends contrôlé.",
    ],
    coachTip: "Menton rentré, regard vers l'avant : le cou reste neutre, ce sont les fessiers qui bossent, pas la nuque.",
  },
  "Hip thrust haltère": {
    steps: [
      "Haut du dos sur un banc ou canapé, haltère posé sur les hanches.",
      "Monte les hanches jusqu'à l'alignement complet, serre les fessiers.",
      "Redescends lentement sans poser les fesses au sol entre les reps.",
    ],
    coachTip: "L'amplitude prime sur la charge : un verrouillage complet en haut vaut mieux que 10 kg de plus à moitié montés.",
  },
  "Hip thrust au sol": {
    steps: [
      "Allongé au sol, pieds proches des fesses.",
      "Décolle les hanches jusqu'à l'alignement genoux-hanches-épaules.",
      "Serre les fessiers 2 secondes en haut, redescends sans toucher le sol.",
    ],
    coachTip: "Trop facile ? Passe sur une jambe — même mouvement, difficulté doublée, zéro matériel.",
  },
  "Leg curl allongé": {
    steps: [
      "Allongé sur la machine, rouleau juste au-dessus des talons.",
      "Ramène les talons vers les fesses, hanches collées au banc.",
      "Redescends en 3 secondes, contrôlé jusqu'au bout.",
    ],
    coachTip: "Si tes hanches décollent, la charge est trop lourde — les ischios travaillent, pas le dos.",
  },
  "Good morning au poids du corps": {
    steps: [
      "Mains derrière la tête, genoux légèrement fléchis.",
      "Penche le buste vers l'avant en poussant les hanches en arrière, dos plat.",
      "Remonte en contractant fessiers et ischios.",
    ],
    coachTip: "Imagine que tu fermes une portière de voiture avec les fesses : c'est exactement ce mouvement de hanches.",
  },
  "Superman au sol": {
    steps: [
      "Allongé sur le ventre, bras tendus devant.",
      "Décolle simultanément bras, poitrine et jambes.",
      "Tiens 2 secondes en haut, redescends contrôlé.",
    ],
    coachTip: "Regarde le sol, pas devant toi — la nuque reste dans l'axe de la colonne.",
  },

  /* ---------- Poussée horizontale ---------- */
  "Développé couché barre": {
    steps: [
      "Allongé, omoplates serrées, pieds ancrés au sol, prise un peu plus large que les épaules.",
      "Descends la barre contrôlée jusqu'au bas des pectoraux, coudes à ~45°.",
      "Pousse en expirant jusqu'à l'extension complète, sans décoller les fesses.",
    ],
    coachTip: "La barre touche la poitrine, elle n'y rebondit pas. Descente 2 secondes, poussée explosive.",
  },
  "Développé incliné haltères": {
    steps: [
      "Banc incliné à 30°, haltères au niveau du haut des pectoraux.",
      "Pousse les haltères vers le haut en les rapprochant légèrement.",
      "Redescends contrôlé jusqu'à sentir l'étirement des pectoraux.",
    ],
    coachTip: "30° d'inclinaison, pas plus : au-delà, ce sont tes épaules qui prennent le relais.",
  },
  "Développé couché haltères (au sol)": {
    steps: [
      "Allongé au sol, coudes qui peuvent toucher terre, haltères au-dessus de la poitrine.",
      "Descends contrôlé jusqu'à effleurer le sol avec les coudes.",
      "Pousse vers le plafond en expirant.",
    ],
    coachTip: "Le sol te protège : profites-en pour descendre lentement, sans jamais laisser tomber les coudes.",
  },
  "Pompes": {
    steps: [
      "Mains sous les épaules, corps gainé des talons à la tête.",
      "Descends la poitrine à 2 cm du sol, coudes à ~45° du buste.",
      "Pousse le sol en expirant, sans casser la ligne du corps.",
    ],
    coachTip: "Les hanches qui tombent ou qui pointent = gainage relâché. Serre les fesses, tout s'aligne.",
  },
  "Pompes lestées": {
    steps: [
      "Position de pompe classique, sac ou disque sur le haut du dos.",
      "Descends contrôlé, poitrine vers le sol.",
      "Pousse fort, corps rigide comme une planche.",
    ],
    coachTip: "Place la charge sur le haut du dos, jamais sur les lombaires.",
  },
  "Pompes déclinées": {
    steps: [
      "Pieds surélevés sur un banc ou une chaise, mains au sol.",
      "Descends le front vers le sol, contrôlé.",
      "Pousse en gardant le gainage complet.",
    ],
    coachTip: "Plus les pieds sont hauts, plus le haut des pectoraux et les épaules travaillent — monte progressivement.",
  },
  "Pompes prise serrée": {
    steps: [
      "Mains sous la poitrine, pouces qui se touchent presque.",
      "Descends coudes collés au corps.",
      "Pousse en verrouillant les triceps en haut.",
    ],
    coachTip: "Les coudes frôlent les côtes tout du long : s'ils s'écartent, c'est redevenu une pompe classique.",
  },
  "Dips lestés": {
    steps: [
      "Aux barres parallèles, lest accroché, buste légèrement penché.",
      "Descends jusqu'à ce que les épaules passent sous les coudes.",
      "Remonte en poussant, sans verrouiller brutalement.",
    ],
    coachTip: "Une gêne à l'épaule en bas ? Réduis l'amplitude — l'ego n'a jamais construit un pectoral.",
  },
  "Dips entre deux chaises": {
    steps: [
      "Mains sur deux supports stables, jambes tendues devant.",
      "Descends les coudes vers l'arrière jusqu'à 90°.",
      "Pousse pour remonter, épaules basses.",
    ],
    coachTip: "Épaules loin des oreilles pendant tout le mouvement — si elles remontent, arrête la série.",
  },

  /* ---------- Poussée verticale ---------- */
  "Développé militaire barre": {
    steps: [
      "Debout, barre au niveau des clavicules, prise largeur d'épaules, gainage total.",
      "Pousse la barre au-dessus de la tête en rentrant légèrement le menton.",
      "Verrouille en haut, la barre à l'aplomb de la nuque, redescends contrôlé.",
    ],
    coachTip: "Serre fessiers et abdos comme si on allait te pousser : le dos ne se cambre pas, c'est non négociable.",
  },
  "Développé haltères assis": {
    steps: [
      "Assis dossier légèrement incliné, haltères au niveau des oreilles.",
      "Pousse vers le haut jusqu'à presque tendre les bras.",
      "Redescends contrôlé jusqu'aux oreilles, pas plus bas.",
    ],
    coachTip: "Ne claque pas les haltères en haut — garde 2 cm d'écart et une tension continue sur les épaules.",
  },
  "Développé haltères debout": {
    steps: [
      "Debout, gainé, haltères au niveau des épaules.",
      "Pousse à la verticale en expirant.",
      "Redescends en 2-3 secondes.",
    ],
    coachTip: "Debout, ton gainage est ton banc : si tu te cambres, allège et regaine.",
  },
  "Développé Arnold": {
    steps: [
      "Haltères devant les épaules, paumes vers toi.",
      "Pousse en tournant les paumes vers l'avant pendant la montée.",
      "Inverse la rotation à la descente, contrôlé.",
    ],
    coachTip: "La rotation se fait pendant la poussée, pas avant — un seul mouvement fluide.",
  },
  "Pompes piquées": {
    steps: [
      "Hanches hautes en V inversé, mains au sol.",
      "Fléchis les coudes pour amener le sommet du crâne vers le sol.",
      "Pousse pour revenir, hanches toujours hautes.",
    ],
    coachTip: "C'est un développé épaules déguisé : plus tes hanches sont hautes, plus tes épaules travaillent.",
  },
  "Handstand push-up au mur (progression)": {
    steps: [
      "En appui renversé contre un mur (ou pieds surélevés pour débuter).",
      "Descends le crâne vers le sol, contrôlé.",
      "Pousse pour revenir bras tendus.",
    ],
    coachTip: "Progresse par étapes : pompes piquées → pieds surélevés → mur. Brûler les étapes ici, c'est la chute assurée.",
  },

  /* ---------- Tirage ---------- */
  "Rowing barre": {
    steps: [
      "Buste penché à ~45°, dos plat, barre bras tendus.",
      "Tire la barre vers le nombril en serrant les omoplates.",
      "Redescends contrôlé sans arrondir le dos.",
    ],
    coachTip: "Si tu te redresses pour tirer, c'est trop lourd : le buste reste figé, seuls les bras et le dos bougent.",
  },
  "Rowing haltère unilatéral": {
    steps: [
      "Un genou et une main sur le banc, dos plat, haltère bras tendu.",
      "Tire le coude vers la hanche, près du corps.",
      "Redescends en laissant l'omoplate s'étirer en bas.",
    ],
    coachTip: "Tire avec le coude, pas avec la main — imagine que ta main n'est qu'un crochet.",
  },
  "Rowing haltères buste penché": {
    steps: [
      "Buste penché, dos plat, un haltère dans chaque main.",
      "Tire les deux coudes vers les hanches simultanément.",
      "Redescends contrôlé, sans balancer.",
    ],
    coachTip: "Fixe un point au sol devant toi : la tête et le buste ne bougent plus jusqu'à la fin de la série.",
  },
  "Tirage horizontal poulie": {
    steps: [
      "Assis, buste droit, poignée saisie bras tendus.",
      "Tire vers le nombril en serrant les omoplates.",
      "Laisse revenir lentement en laissant les épaules s'étirer devant.",
    ],
    coachTip: "Le buste peut accompagner de 10°, pas plus — le rowing, c'est le dos, pas les lombaires.",
  },
  "Rowing inversé sous une table": {
    steps: [
      "Sous une table solide, prise large, corps aligné des talons à la tête.",
      "Tire la poitrine vers le rebord.",
      "Redescends bras tendus, gainage intact.",
    ],
    coachTip: "Plus tes pieds sont loin, plus c'est dur : règle la difficulté avec tes talons, pas en trichant du buste.",
  },
  "Tractions pronation": {
    steps: [
      "Suspendu, prise un peu plus large que les épaules, paumes vers l'avant.",
      "Tire ta poitrine vers la barre en pensant « coudes vers les poches ».",
      "Redescends contrôlé jusqu'aux bras presque tendus.",
    ],
    coachTip: "Ne te balance pas : chaque rep partie d'un corps immobile en vaut trois avec de l'élan.",
  },
  "Tractions (si barre)": {
    steps: [
      "Suspendu à la barre, prise confortable.",
      "Tire le menton au-dessus de la barre.",
      "Descente lente, 3 secondes.",
    ],
    coachTip: "Pas encore de traction complète ? Saute en haut et ne travaille QUE la descente lente — c'est comme ça qu'on en construit une.",
  },
  "Tractions (barre ou porte)": {
    steps: [
      "Suspendu, épaules engagées (loin des oreilles).",
      "Tire le menton au-dessus du support.",
      "Redescends en freinant 3 secondes.",
    ],
    coachTip: "La descente lente est ton meilleur professeur : si tu n'as pas encore la montée, travaille la descente.",
  },
  "Tractions australiennes": {
    steps: [
      "Barre basse, corps incliné dessous, talons au sol.",
      "Tire la poitrine à la barre, corps rigide.",
      "Redescends contrôlé.",
    ],
    coachTip: "C'est l'antichambre de la traction : quand tu en fais 12 propres, la vraie barre t'attend.",
  },
  "Tirage vertical poulie": {
    steps: [
      "Assis, cuisses calées, barre saisie large.",
      "Tire vers le haut de la poitrine en sortant la poitrine.",
      "Remonte contrôlé en laissant le dos s'étirer.",
    ],
    coachTip: "Jamais derrière la nuque — devant, vers les clavicules, les épaules te remercieront.",
  },
  "Pull-over haltère": {
    steps: [
      "Allongé perpendiculaire au banc, haltère tenu à deux mains au-dessus de la poitrine.",
      "Descends l'haltère derrière la tête, bras presque tendus.",
      "Ramène au-dessus de la poitrine en contractant le grand dorsal.",
    ],
    coachTip: "Inspire profondément à la descente : ce mouvement travaille aussi ta cage thoracique.",
  },

  /* ---------- Bras ---------- */
  "Curl biceps barre EZ": {
    steps: [
      "Debout, coudes collés au corps, prise sur les parties inclinées de la barre.",
      "Monte la barre en contractant les biceps, sans élan.",
      "Redescends en 3 secondes, jusqu'aux bras tendus.",
    ],
    coachTip: "Les coudes sont soudés aux côtes : s'ils avancent, ce sont tes épaules qui volent le travail.",
  },
  "Curl biceps haltères": {
    steps: [
      "Debout, haltères le long du corps, paumes vers l'avant.",
      "Monte en contractant, coude immobile.",
      "Descente lente et complète.",
    ],
    coachTip: "L'extension complète en bas fait mal ? C'est normal, c'est là que le biceps grandit.",
  },
  "Curl isométrique serviette": {
    steps: [
      "Serviette sous un pied, tenue à deux mains, coude à 90°.",
      "Tire vers le haut pendant que ta jambe résiste.",
      "Tiens 20 à 30 secondes en tension maximale.",
    ],
    coachTip: "L'intensité vient de TOI : tire comme si ta vie en dépendait, sinon il ne se passe rien.",
  },
  "Extension triceps poulie": {
    steps: [
      "Face à la poulie haute, coudes collés au corps.",
      "Pousse la corde ou barre vers le bas jusqu'à l'extension complète.",
      "Remonte contrôlé jusqu'aux avant-bras à l'horizontale.",
    ],
    coachTip: "Seuls les avant-bras bougent — le reste du corps est une statue.",
  },
  "Extension triceps nuque haltère": {
    steps: [
      "Haltère tenu à deux mains au-dessus de la tête.",
      "Descends derrière la nuque en pliant les coudes.",
      "Tends les bras en contractant les triceps.",
    ],
    coachTip: "Coudes serrés qui pointent vers le plafond — s'ils s'écartent, la tension quitte les triceps.",
  },

  /* ---------- Épaules (isolation) ---------- */
  "Élévations latérales haltères": {
    steps: [
      "Debout, haltères le long du corps, coudes très légèrement fléchis.",
      "Monte les bras sur les côtés jusqu'à l'horizontale.",
      "Redescends en 3 secondes, contrôlé.",
    ],
    coachTip: "Léger et propre : au-delà de l'horizontale et avec de l'élan, ce sont tes trapèzes qui bossent, pas tes épaules.",
  },
  "Élévations latérales élastique / bouteilles": {
    steps: [
      "Élastique sous les pieds ou bouteilles en mains.",
      "Monte les bras à l'horizontale, petit doigt légèrement plus haut.",
      "Descente lente et contrôlée.",
    ],
    coachTip: "Pas de charge lourde ? Ralentis : 4 secondes de descente et tes épaules ne verront pas la différence.",
  },
  "Oiseau haltères": {
    steps: [
      "Buste penché à 45°, dos plat, haltères sous la poitrine.",
      "Écarte les bras sur les côtés, omoplates serrées en haut.",
      "Redescends sans balancier.",
    ],
    coachTip: "Pense à écarter les mains le plus loin possible, pas à les monter haut — c'est un mouvement d'ouverture.",
  },
  "Face pull élastique": {
    steps: [
      "Élastique fixé à hauteur de visage, prise à deux mains.",
      "Tire vers le visage en écartant les mains, coudes hauts.",
      "Finis avec les mains de chaque côté de la tête, omoplates serrées.",
    ],
    coachTip: "Le meilleur exercice santé d'épaules du catalogue : fais-le proprement, tes futures épaules te diront merci.",
  },

  /* ---------- Mollets ---------- */
  "Mollets debout à la machine": {
    steps: [
      "Épaules sous les boudins, avant-pieds sur la marche.",
      "Monte le plus haut possible sur les pointes, marque 1 seconde.",
      "Descends les talons sous le niveau de la marche, étirement complet.",
    ],
    coachTip: "L'amplitude fait tout : étirement complet en bas, contraction maximale en haut, zéro rebond.",
  },
  "Mollets debout haltères": {
    steps: [
      "Haltères en mains, avant-pieds sur une marche.",
      "Monte sur les pointes, pause en haut.",
      "Descends lentement sous le niveau de la marche.",
    ],
    coachTip: "Tempo 2-1-3 : 2 s pour monter, 1 s de pause, 3 s pour descendre. Les mollets détestent la vitesse.",
  },
  "Mollets debout unilatéral": {
    steps: [
      "Sur un pied, avant-pied sur une marche, main sur un appui.",
      "Monte sur la pointe, pause en haut.",
      "Descends en étirement complet.",
    ],
    coachTip: "Une jambe = double intensité sans matériel. Compte les reps : la deuxième jambe fait pareil, pas une de moins.",
  },

  /* ---------- Gainage / core ---------- */
  "Crunch à la poulie": {
    steps: [
      "À genoux face à la poulie haute, corde derrière la tête.",
      "Enroule le buste vers le bas en contractant les abdos.",
      "Remonte contrôlé sans tirer avec les bras.",
    ],
    coachTip: "Les mains ne tirent pas — elles tiennent. C'est le ventre qui s'enroule, coude vers les genoux.",
  },
  "Planche lestée": {
    steps: [
      "Position de planche sur les avant-bras, disque sur le haut du dos.",
      "Corps aligné des talons à la tête, fessiers serrés.",
      "Respire calmement en tenant la position.",
    ],
    coachTip: "Une planche parfaite de 30 s bat une planche affaissée de 2 min. La qualité, toujours.",
  },
  "Planche": {
    steps: [
      "Avant-bras au sol, coudes sous les épaules.",
      "Corps aligné, fessiers et abdos serrés.",
      "Tiens en respirant calmement.",
    ],
    coachTip: "Serre les fesses comme pour casser une noix : le dos s'aplatit instantanément et le gainage devient réel.",
  },
  "Russian twist haltère": {
    steps: [
      "Assis, buste incliné en arrière, pieds décollés (ou posés pour débuter).",
      "Tourne le buste d'un côté à l'autre avec l'haltère.",
      "Le mouvement part du ventre, pas des bras.",
    ],
    coachTip: "Tourne les épaules, pas juste les mains — si l'haltère seul voyage, tes abdos regardent le spectacle.",
  },
  "Mountain climbers": {
    steps: [
      "Position de pompe, corps gainé.",
      "Ramène un genou vers la poitrine, puis l'autre, en alternance rapide.",
      "Les hanches restent basses et stables.",
    ],
    coachTip: "La vitesse ne doit jamais casser la position : si tes fesses montent, ralentis.",
  },
  "Relevés de jambes allongé": {
    steps: [
      "Allongé, mains sous les fesses, jambes tendues.",
      "Monte les jambes à la verticale.",
      "Redescends lentement sans toucher le sol.",
    ],
    coachTip: "Le bas du dos reste plaqué au sol — s'il se cambre, remonte les jambes plus tôt.",
  },
};

/* Guide générique pour les exercices sans fiche (dont les exos custom) */
export const genericGuide: ExerciseGuide = {
  steps: [
    "Échauffe-toi avec 1 à 2 séries légères avant tes séries de travail.",
    "Exécution contrôlée : 2 à 3 secondes sur la phase de descente, expire pendant l'effort.",
    "Arrête la série quand la technique se dégrade, pas quand l'ego le décide.",
  ],
  coachTip: "Filme-toi de profil une série sur deux : la caméra est le coach le plus honnête qui existe.",
};

export function getGuide(name: string): ExerciseGuide {
  return exerciseGuides[name] ?? genericGuide;
}

export function hasGuide(name: string): boolean {
  return Boolean(exerciseGuides[name]);
}
