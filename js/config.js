/* =====================================================================
   BOULDESON — FICHIER DE CONFIGURATION
   =====================================================================
   C'est le seul fichier à modifier au quotidien.
   Attention : ne supprimez pas les virgules ni les accolades { }.
   ===================================================================== */

const CONFIG = {

  /* --- 1. VOTRE ENTREPRISE ------------------------------------------ */
  marque:    "Bouldeson",
  baseline:  "Enceintes faites main à Bayonne",
  email:     "bouldeson@gmail.com",
  telephone: "",                    // ajoutez votre numéro si vous le souhaitez
  ville:     "Bayonne, Pays basque",
  instagram: "",                    // laissez vide si vous n'en avez pas

  /* --- 2. LES DEUX GAMMES ------------------------------------------- */
  gammes: {
    platre: {
      nom: "Enceintes en plâtre",
      resume: "Moulées et polies à la main, pensées pour le salon et le son de la télévision."
    },
    portative: {
      nom: "Enceintes portatives",
      resume: "Coque dessinée sur ordinateur et imprimée en 3D, batterie intégrée, recharge par USB-C."
    }
  },

  /* --- 3. VOS ENCEINTES ----------------------------------------------
     - ref      : référence, sert aussi d'adresse web
     - gamme    : "platre" ou "portative"
     - photos   : la première est la photo principale
     Les prix ne sont volontairement pas affichés : le client vous écrit.
     ------------------------------------------------------------------ */
  produits: [
    {
      ref: "BDS-01", gamme: "platre", nom: "Sphère",
      accroche: "La grande sphère, un seul haut-parleur pleine bande",
      photos: ["images/bds-01-1.jpg","images/bds-01-2.jpg","images/bds-01-3.jpg","images/bds-01-4.jpg","images/bds-01-5.jpg","images/bds-01-6.jpg","images/bds-01-7.jpg"],
      description: "Le modèle fondateur de l'atelier : une sphère de plâtre posée sur son socle, dont la masse et la forme ronde suppriment les résonances d'un caisson classique. Un seul haut-parleur, monté de face, pour un son direct et sans coloration. Le plâtre est moulé, séché puis poli à la main jusqu'à obtenir une surface parfaitement lisse. Se raccorde à un téléviseur, un ampli ou une platine."
    },
    {
      ref: "BDS-02", gamme: "platre", nom: "Sphère deux voies",
      accroche: "Une sphère surmontée de son tweeter",
      photos: ["images/bds-02-1.jpg","images/bds-02-2.jpg","images/bds-02-3.jpg","images/bds-02-4.jpg","images/bds-02-5.jpg","images/bds-02-6.jpg","images/bds-02-7.jpg","images/bds-02-8.jpg"],
      description: "Deux sphères, deux voies : le grave et le médium dans le volume principal, l'aigu dans la petite sphère posée au sommet. Chaque moulage est repris à la main, et la jonction entre les deux volumes est poncée jusqu'à disparaître. Existe en plusieurs finitions et coloris, sur demande."
    },
    {
      ref: "BDS-03", gamme: "platre", nom: "Sphère lumineuse",
      accroche: "La sphère deux voies, avec éclairage intégré",
      photos: ["images/bds-03-1.jpg","images/bds-03-2.jpg","images/bds-03-3.jpg","images/bds-03-4.jpg","images/bds-03-5.jpg"],
      description: "La même architecture deux voies, mais le plâtre est travaillé pour laisser passer la lumière. L'enceinte devient une source lumineuse à part entière, dont la couleur se règle selon la pièce et le moment. Les finitions colorées sont réalisées à la demande, aucune n'est identique à une autre."
    },
    {
      ref: "BDS-04", gamme: "portative", nom: "Haltère",
      accroche: "Portative, coque imprimée en 3D et grille ajourée",
      photos: ["images/bds-04-1.jpg","images/bds-04-2.jpg","images/bds-04-3.jpg","images/bds-04-4.jpg","images/bds-04-5.jpg"],
      description: "Une forme d'haltère qui tient dans une main et se pose n'importe où, dans le jardin comme sur une étagère. La coque est modélisée sur ordinateur puis imprimée en 3D, avec une grille ajourée devant le haut-parleur. Batterie intégrée, recharge par câble USB-C. L'extérieur est poncé et poli à la main après impression, jusqu'à effacer toute trace de couche."
    },
    {
      ref: "BDS-05", gamme: "platre", nom: "Colonne trois voies",
      accroche: "Trois sphères empilées sur pied",
      photos: ["images/bds-05-1.jpg","images/bds-05-2.jpg"],
      description: "Trois sphères de tailles décroissantes empilées sur un pied fin : le grave en bas, le médium au centre, l'aigu au sommet. Chaque volume est moulé séparément puis aligné à la main. Une pièce de salon, conçue pour être regardée autant qu'écoutée."
    },
    {
      ref: "BDS-06", gamme: "platre", nom: "Double sphère",
      accroche: "Deux volumes accolés à l'horizontale",
      photos: ["images/bds-06-1.jpg","images/bds-06-2.jpg","images/bds-06-3.jpg"],
      description: "Une composition horizontale de deux sphères accolées, qui se pose sur un meuble bas ou une console. Les haut-parleurs sont apparents et deviennent le motif de l'objet. Se décline en plusieurs teintes et en plusieurs textures de surface."
    },
    {
      ref: "BDS-07", gamme: "platre", nom: "Colonne",
      accroche: "La grande colonne de l'atelier",
      photos: ["images/bds-07-1.jpg","images/bds-07-2.jpg"],
      description: "La pièce la plus imposante de l'atelier : une colonne de sphères empilées, montée sur socle, dont la fabrication demande plusieurs jours de moulage, de séchage et de ponçage. Prévue pour équiper un salon complet ou accompagner un téléviseur dans une grande pièce."
    },
    {
      ref: "BDS-08", gamme: "portative", nom: "Ballon",
      accroche: "Portative, en forme de ballon de rugby",
      photos: ["images/bds-08-1.jpg","images/bds-08-2.jpg"],
      description: "Un ballon de rugby posé sur son tee, qui se transporte et se pose où l'on veut. La coque est imprimée en 3D puis poncée et peinte à la main ; les finitions, les écussons et les couleurs se personnalisent entièrement. Batterie intégrée, recharge par USB-C."
    },
    {
      ref: "BDS-09", gamme: "portative", nom: "Onde",
      accroche: "Portative, forme enroulée posée à plat",
      photos: ["images/bds-09-1.jpg","images/bds-09-2.jpg"],
      description: "Une forme enroulée sur elle-même, qui se pose à plat sur une table basse et diffuse par ses deux grilles rondes. La courbe est dessinée sur ordinateur, imprimée en 3D, puis reprise à la main jusqu'à obtenir une surface douce au toucher. Batterie intégrée, recharge par USB-C."
    },
    {
      ref: "BDS-10", gamme: "portative", nom: "Haltère noire",
      accroche: "Portative, finition mate et détails colorés",
      photos: ["images/bds-10-1.jpg","images/bds-10-2.jpg","images/bds-10-3.jpg"],
      description: "La version sombre de l'haltère, en finition mate, avec un logo et des détails de couleur appliqués à la main. Coque imprimée en 3D, haut-parleur derrière une grille intégrée à la forme, batterie et recharge USB-C. Chaque pièce est personnalisable en teinte comme en marquage."
    }
  ]
};
