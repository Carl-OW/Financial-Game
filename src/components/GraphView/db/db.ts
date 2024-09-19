export interface GraphMetaData {
  theme: string;
  question: string;
  indicator: string;
  level: number;
  savedQuery: string;
  statbankId: number;
}

export const graphEntries: GraphMetaData[] = [
  {
    theme: "Befolkning",
    question: "Hvor mange personer bor det i Norge?",
    indicator: "Befolkning per 1. januar",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101588",
    statbankId: 5803,
  },
  {
    theme: "Utdanning",
    question: "Hvor stor andel av befolkningen har kun grunnskoleutdanning?",
    indicator: "Personer 16 år og over med kun grunnskolenivå",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101594",
    statbankId: 9429,
  },
  {
    theme: "Arbeid",
    question: "Hvor stor andel er i jobb?",
    indicator: "Sysselsatte personer 15–74 år (prosent)",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101598",
    statbankId: 5111,
  },
  {
    theme: "Inntekt",
    question: "Hvor stor årlig inntekt har norske husholdninger?",
    indicator: "Median inntekt etter skatt (kr), faste 2022-priser",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101630",
    statbankId: 4751,
  },
  {
    theme: "Helse",
    question: "Hvor lenge lever kvinner?",
    indicator: "Forventet gjenstående levetid (år) ved alder 0",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101619",
    statbankId: 7902,
  },
];
