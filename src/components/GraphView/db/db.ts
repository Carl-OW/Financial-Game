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
    indicator: "Personer 16 år og over med kun grunnskolenivå (prosent) ",
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
    indicator: "Forventet gjenstående levetid (år) ved alder 0 for kvinner",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101619",
    statbankId: 7902,
  },
  {
    theme: "Økonomi",
    question: "Hvor stor er Norges økonomi, dvs. BNP?",
    indicator: "Bruttonasjonalprodukt i faste 2015-priser (mill. kr)",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101621",
    statbankId: 9189,
  },
  {
    theme: "Miljø",
    question: "Hvor mye CO₂ slipper Norge ut per år?",
    indicator: "Utslipp til luft (1 000 tonn CO₂-ekvivalenter)",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101616",
    statbankId: 13931,
  },
  {
    theme: "Priser",
    question: "Hvor stor er årlig inflasjon?",
    indicator: "KPI Total, årsendring (prosent)",
    level: 1,
    savedQuery: "https://www.ssb.no/statbank/sq/10101624",
    statbankId: 3014,
  },
  {
    theme: "Befolkning",
    question: "Hvor stor er den årlige befolkningsveksten?",
    indicator: "Folketilvekst (prosent)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101590",
    statbankId: 5803,
  },
  {
    theme: "Utdanning",
    question: "Hvor mange barnehager er det i landet?",
    indicator: "Antall barnehager",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101597",
    statbankId: 9220,
  },
  {
    theme: "Arbeid",
    question: "Hvor stor andel unge (15–24 år) er uten jobb?",
    indicator: "Arbeidsledige personer 15–24 år (prosent)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101599",
    statbankId: 5111,
  },
  {
    theme: "Inntekt",
    question:
      "Hvor mange ganger større er inntekten til de 20 prosent rikeste jamfør de 20 prosent fattigste?",
    indicator: "Inntektsfordelingen belyst ved ulikhetsmålet S80/S20",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101632",
    statbankId: 7756,
  },
  {
    theme: "Helse",
    question: "Hvor stor andel røyker daglig?",
    indicator: "Andel dagligrøykere 16–74 år (prosent)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101620",
    statbankId: 5307,
  },
  {
    theme: "Økonomi",
    question: "Hvor mye vokser Norges økonomi hvert år, dvs. årlig BNP-vekst?",
    indicator: "Bruttonasjonalprodukt, årlig volumendring (prosent)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101622",
    statbankId: 9189,
  },
  {
    theme: "Miljø",
    question: "Hvor mange km² nasjonalpark er vernet?",
    indicator: "Vernet nasjonalpark på land (km²)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101618",
    statbankId: 8936,
  },
  {
    theme: "Priser",
    question: "Hvor mye har elektrisitetsprisene endret seg siden 1970?",
    indicator: "Elektrisitet inkludert nettleie, konsumprisindeks (2015=100)",
    level: 2,
    savedQuery: "https://www.ssb.no/statbank/sq/10101627",
    statbankId: 3014,
  },
];
