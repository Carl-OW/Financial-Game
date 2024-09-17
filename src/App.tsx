import "./App.css";
import DrawingCanvas from "./components/DrawingCanvas";
import PopulationGrowthGraph from "./components/GraphCanvas/PopulationGrowthGraph";
import styles from "./app.module.scss";
const data = [
  { year: 1950, populationGrowth: 0.93 },
  { year: 1951, populationGrowth: 0.95 },
  { year: 1952, populationGrowth: 0.98 },
  { year: 1953, populationGrowth: 1.01 },
  { year: 1954, populationGrowth: 0.98 },
  { year: 1955, populationGrowth: 1.02 },
  { year: 1956, populationGrowth: 0.88 },
  { year: 1957, populationGrowth: 0.92 },
  { year: 1958, populationGrowth: 0.86 },
  { year: 1959, populationGrowth: 0.84 },
  { year: 1960, populationGrowth: 0.76 },
  { year: 1961, populationGrowth: 0.84 },
  { year: 1962, populationGrowth: 0.78 },
  { year: 1963, populationGrowth: 0.74 },
  { year: 1964, populationGrowth: 0.78 },
  { year: 1965, populationGrowth: 0.79 },
  { year: 1966, populationGrowth: 0.82 },
  { year: 1967, populationGrowth: 0.86 },
  { year: 1968, populationGrowth: 0.83 },
  { year: 1969, populationGrowth: 0.81 },
  { year: 1970, populationGrowth: 0.65 },
  { year: 1971, populationGrowth: 0.76 },
  { year: 1972, populationGrowth: 0.78 },
  { year: 1973, populationGrowth: 0.63 },
  { year: 1974, populationGrowth: 0.62 },
  { year: 1975, populationGrowth: 0.49 },
  { year: 1976, populationGrowth: 0.45 },
  { year: 1977, populationGrowth: 0.4 },
  { year: 1978, populationGrowth: 0.37 },
  { year: 1979, populationGrowth: 0.31 },
  { year: 1980, populationGrowth: 0.33 },
  { year: 1981, populationGrowth: 0.36 },
  { year: 1982, populationGrowth: 0.38 },
  { year: 1983, populationGrowth: 0.29 },
  { year: 1984, populationGrowth: 0.28 },
  { year: 1985, populationGrowth: 0.32 },
  { year: 1986, populationGrowth: 0.39 },
  { year: 1987, populationGrowth: 0.55 },
  { year: 1988, populationGrowth: 0.53 },
  { year: 1989, populationGrowth: 0.29 },
  { year: 1990, populationGrowth: 0.39 },
  { year: 1991, populationGrowth: 0.56 },
  { year: 1992, populationGrowth: 0.6 },
  { year: 1993, populationGrowth: 0.6 },
  { year: 1994, populationGrowth: 0.55 },
  { year: 1995, populationGrowth: 0.5 },
  { year: 1996, populationGrowth: 0.52 },
  { year: 1997, populationGrowth: 0.57 },
  { year: 1998, populationGrowth: 0.63 },
  { year: 1999, populationGrowth: 0.75 },
  { year: 2000, populationGrowth: 0.56 },
  { year: 2001, populationGrowth: 0.46 },
  { year: 2002, populationGrowth: 0.62 },
  { year: 2003, populationGrowth: 0.55 },
  { year: 2004, populationGrowth: 0.63 },
  { year: 2005, populationGrowth: 0.73 },
  { year: 2006, populationGrowth: 0.88 },
  { year: 2007, populationGrowth: 1.19 },
  { year: 2008, populationGrowth: 1.3 },
  { year: 2009, populationGrowth: 1.22 },
  { year: 2010, populationGrowth: 1.28 },
  { year: 2011, populationGrowth: 1.33 },
  { year: 2012, populationGrowth: 1.31 },
  { year: 2013, populationGrowth: 1.14 },
  { year: 2014, populationGrowth: 1.11 },
  { year: 2015, populationGrowth: 0.93 },
  { year: 2016, populationGrowth: 0.85 },
  { year: 2017, populationGrowth: 0.71 },
  { year: 2018, populationGrowth: 0.62 },
  { year: 2019, populationGrowth: 0.74 },
  { year: 2020, populationGrowth: 0.44 },
  { year: 2021, populationGrowth: 0.63 },
  { year: 2022, populationGrowth: 1.17 },
  { year: 2023, populationGrowth: 1.12 },
];

function App() {
  return (
    <>
      <div className={styles.graphArea}>
        <div className={styles.graph}>
          <PopulationGrowthGraph data={data} />
        </div>
        <div className={styles.drawArea}>
          <DrawingCanvas />
        </div>
      </div>
    </>
  );
}

export default App;
