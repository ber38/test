
import { Question, QuestionType } from './types';

export const PODCAST_TITLE = "Le monde fascinant des dinosaures";

export const PODCAST_TEXT = `Bonjour à tous, petits curieux et grands explorateurs ! Aujourd'hui, nous partons pour un voyage dans le temps, il y a des millions d'années, à la rencontre de créatures extraordinaires qui ont régné sur la Terre : **les dinosaures**.

Imaginez un monde sans humains, où des reptiles géants parcouraient des forêts luxuriantes. Les dinosaures sont apparus il y a environ **230 millions d'années**, pendant une période qu'on appelle le **Trias**. Ils ont ensuite dominé notre planète pendant le **Jurassique** et le **Crétacé**, avant de disparaître il y a 66 millions d'années. Cette ère s'appelle le **Mésozoïque**, souvent surnommée "**l'âge des reptiles**".

Il existait une incroyable diversité de dinosaures. Certains étaient d'énormes **herbivores**, comme le majestueux **Brontosaure**, avec son long cou pour atteindre les feuilles des arbres, ou le **Tricératops**, reconnaissable à ses trois cornes et sa collerette osseuse. Ces géants paisibles passaient leurs journées à brouter.

Mais d'autres dinosaures étaient de redoutables **carnivores**, chassant pour se nourrir. Le plus célèbre d'entre eux est sans doute le terrible **Tyrannosaure Rex**, avec ses dents acérées et sa mâchoire puissante. Il y avait aussi les agiles **Vélociraptors**, connus pour leur vitesse et leurs griffes redoutables.

Comment savons-nous tout cela ? Grâce aux **fossiles** ! Ce sont des restes d'animaux ou de plantes qui se sont transformés en pierre au fil des millions d'années. Les **paléontologues** sont les scientifiques qui étudient ces fossiles pour comprendre la vie ancienne sur Terre. C'est grâce à eux que nous pouvons imaginer ces créatures.

La disparition des dinosaures est l'un des plus grands mystères de la science. La théorie la plus acceptée est qu'un **gigantesque astéroïde** a frappé la Terre, provoquant des changements climatiques drastiques auxquels les dinosaures n'ont pas pu survivre.

Même s'ils ont disparu, les dinosaures continuent de nous fasciner et de peupler notre imaginaire. Qui sait quelles autres découvertes nous attendent encore sur ces géants du passé ?`;

export const INSTRUCTIONS = [
    "Votre questionnaire est fermé.",
    "Vous allez entendre le podcast une première fois.",
    "Après cette première écoute, vous prendrez connaissance du questionnaire pendant 5 minutes sans prendre de notes.",
    "Vous allez entendre le podcast une seconde fois.",
    "Vous répondrez aux questions par écrit."
];

export const QUIZ_DATA: Question[] = [
  {
    id: 'q1',
    type: QuestionType.SINGLE_CHOICE,
    questionText: "Le document que tu viens d’entendre est…",
    options: [
      "un débat sur les dinosaures.",
      "une interview de paléontologue.",
      "un exposé sur les différentes ères géologiques.",
      "un podcast informatif sur les dinosaures.",
    ],
    correctAnswer: "un podcast informatif sur les dinosaures.",
    points: 1,
  },
  {
    id: 'q2',
    type: QuestionType.TABLE_CHOICE,
    questionText: "TRACE une croix dans la case qui convient.",
    table: {
      headers: ["L’information est donnée", "L’information n’est pas donnée"],
      rows: [
        { label: "Le nom du scientifique qui a découvert le premier Tyrannosaure Rex" },
        { label: "Le nom d’une période pendant laquelle les dinosaures ont dominé la Terre" },
        { label: "Le lieu exact où l’astéroïde aurait frappé la Terre" },
      ],
    },
    correctAnswer: ["L’information n’est pas donnée", "L’information est donnée", "L’information n’est pas donnée"],
    points: 3,
  },
  {
    id: 'q3',
    type: QuestionType.TEXT_INPUT,
    questionText: "Quelles étaient les deux catégories principales de dinosaures mentionnées dans le podcast, selon leur régime alimentaire ?",
    numInputs: 2,
    correctAnswer: ["herbivores", "carnivores"],
    points: 2,
  },
  {
    id: 'q4',
    type: QuestionType.SINGLE_CHOICE,
    questionText: "L'ère durant laquelle les dinosaures ont dominé la planète s'appelle…",
    options: [
      "le Trias.",
      "le Jurassique.",
      "le Mésozoïque.",
      "le Crétacé.",
    ],
    correctAnswer: "le Mésozoïque.",
    points: 1,
  },
  {
    id: 'q5',
    type: QuestionType.TEXT_INPUT_PAIRS,
    questionText: "Cite deux dinosaures mentionnés dans le podcast et indique pour chacun s’il était herbivore ou carnivore.",
    numInputs: 2,
    correctAnswer: {
        "brontosaure": "herbivore",
        "tricératops": "herbivore",
        "tyrannosaure rex": "carnivore",
        "vélociraptors": "carnivore"
    },
    points: 2,
  },
  {
    id: 'q6',
    type: QuestionType.TEXT_AREA,
    questionText: "Qu’est-ce qu’un fossile, d’après le podcast ?",
    correctAnswer: "restes d'animaux ou de plantes qui se sont transformés en pierre",
    points: 1,
  },
  {
    id: 'q7',
    type: QuestionType.SINGLE_CHOICE,
    questionText: "Selon la théorie la plus acceptée, quelle est la cause principale de la disparition des dinosaures ?",
    options: [
        "Une série d'éruptions volcaniques massives.",
        "L'apparition d'une nouvelle maladie.",
        "L'impact d'un gigantesque astéroïde.",
        "Des changements progressifs de leur habitat."
    ],
    correctAnswer: "L'impact d'un gigantesque astéroïde.",
    points: 1,
  },
  {
    id: 'q8',
    type: QuestionType.TABLE_CHOICE,
    questionText: "VRAI ou FAUX? TRACE une croix dans la case qui convient.",
    table: {
      headers: ["VRAI", "FAUX", "Le texte ne permet pas de dire que c’est VRAI ou FAUX"],
      rows: [
        { label: "Les dinosaures sont apparus sur Terre avant l’arrivée des humains." },
        { label: "Les Vélociraptors étaient des dinosaures lents et lourds." },
        { label: "Les paléontologues sont les personnes qui fabriquent des fossiles." },
      ],
    },
    correctAnswer: ["VRAI", "FAUX", "FAUX"],
    points: 3,
  },
  {
    id: 'q9',
    type: QuestionType.SINGLE_CHOICE,
    questionText: "Selon le podcast, quelle est l'intention principale de l'orateur ?",
    options: [
        "Expliquer la vie quotidienne des dinosaures.",
        "Renseigner le public sur les dinosaures et leur histoire.",
        "Convaincre le public de l'importance des paléontologues.",
        "Donner du plaisir en racontant une histoire sur la découverte des dinosaures.",
    ],
    correctAnswer: "Renseigner le public sur les dinosaures et leur histoire.",
    points: 1
  }
];
