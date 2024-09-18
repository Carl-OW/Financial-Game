import React, { useState, useEffect } from "react";
import quizData from "./Quiz.json"; // Import the quiz JSON
import "./Quiz.css"; // Ensure the CSS exists
import { QuizProps, QuestionWithTheme } from "../Game/QuizTypes"; // Import shared types

const themeBackgrounds: { [key: string]: string } = {
  Befolkning: "/Backgrounds/befolkning.png",
  Utdanning: "/Backgrounds/utdanning.png",
  Arbeid: "/Backgrounds/arbeid.png",
  Inntekt: "/Backgrounds/inntekt.png",
  Helse: "/Backgrounds/helse.png",
  Miljø: "/Backgrounds/miljo.png",
  Økonomi: "/Backgrounds/okonomi.png",
  Priser: "/Backgrounds/priser.png",
};

const themeIcons: { [key: string]: string[] } = {
  Befolkning: [
    "/QuizIcons/icon_befolkning_0.png",
    "/QuizIcons/icon_befolkning_1.png",
  ],
  Utdanning: [
    "/QuizIcons/icon_utdanning_0.png",
    "/QuizIcons/icon_utdanning_1.png",
  ],
  Arbeid: ["/QuizIcons/icon_arbeid_0.png", "/QuizIcons/icon_arbeid_1.png"],
  Inntekt: ["/QuizIcons/icon_inntekt_0.png", "/QuizIcons/icon_inntekt_1.png"],
  Helse: ["/QuizIcons/icon_helse_0.png", "/QuizIcons/icon_helse_1.png"],
  Miljø: ["/QuizIcons/icon_miljo_0.png", "/QuizIcons/icon_miljo_1.png"],
  Økonomi: ["/QuizIcons/icon_okonomi_0.png", "/QuizIcons/icon_okonomi_1.png"],
  Priser: ["/QuizIcons/icon_priser_0.png", "/QuizIcons/icon_priser_1.png"],
};

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomQuestionFromEachTheme(
  themes: { theme: string; questions: QuestionWithTheme[] }[]
): QuestionWithTheme[] {
  return themes.map((theme) => {
    if (theme.questions.length === 1) {
      return { ...theme.questions[0], theme: theme.theme };
    } else {
      const randomIndex = Math.floor(Math.random() * theme.questions.length);
      return { ...theme.questions[randomIndex], theme: theme.theme };
    }
  });
}

const Quiz: React.FC<QuizProps> = ({ onQuizEnd }) => {
  const [questions, setQuestions] = useState<QuestionWithTheme[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackClass, setFeedbackClass] = useState<string | null>(null);
  const [animationType, setAnimationType] = useState<null | "nod" | "shake">(
    null
  );
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [randomizedOptions, setRandomizedOptions] = useState<
    [string, string][]
  >([]);
  const [timer, setTimer] = useState(10);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // Track total time spent
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [individualScores, setIndividualScores] = useState<number[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [roundCount, setRoundCount] = useState(0); // Fix for roundCount and setRoundCount

  // Countdown effect
  useEffect(() => {
    if (timer > 0 && !selectedOption) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !selectedOption) {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remainingTime = 10 - elapsedTime;
      logTimeSpent(remainingTime, elapsedTime, false);
      calculateScore(0, false);
      handleNextQuestion();
    }
  }, [timer, selectedOption]);

  // Load questions and shuffle options
  useEffect(() => {
    const shuffledThemes = shuffleArray(quizData.themes);
    const selectedQuestions = getRandomQuestionFromEachTheme(shuffledThemes);
    setQuestions(selectedQuestions);
    setStartTime(Date.now());
    // Set the initial background based on the first question
    if (selectedQuestions.length > 0) {
      const initialTheme = selectedQuestions[0].theme;
      setBodyBackground(themeBackgrounds[initialTheme]);
    }
    // Reset background when component unmounts
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Randomize options and choose random icon for each question
  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const shuffledOptions = shuffleArray(Object.entries(question.options));
      setRandomizedOptions(shuffledOptions);

      // Set background for each question
      setBodyBackground(themeBackgrounds[question.theme]);

      const icons = themeIcons[question.theme] || [];
      if (icons.length > 0) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        setSelectedIcon(randomIcon);
      }
    }
  }, [currentQuestionIndex, questions]);

  const setBodyBackground = (backgroundImage: string | null) => {
    if (backgroundImage) {
      document.body.style.background = `url(${backgroundImage}) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background = "";
    }
  };

  const handleOptionClick = (key: string) => {
    if (!questions.length || selectedOption) return;

    const question = questions[currentQuestionIndex];
    setSelectedOption(key);

    const isCorrect = key === question.correct_answer;
    setFeedbackClass(isCorrect ? "correct fade-out" : "incorrect fade-out");

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1); // Increment correct answers
      setAnimationType("nod");
    } else {
      setAnimationType("shake");
    }

    const elapsedTime = (Date.now() - startTime) / 1000;
    const remainingTime = 10 - elapsedTime;
    calculateScore(remainingTime, isCorrect);
    logTimeSpent(remainingTime, elapsedTime, isCorrect);
    setTotalTimeSpent((prevTime) => prevTime + elapsedTime);

    setTimeout(
      () => {
        setAnimationType(null);
        handleNextQuestion();
      },
      isCorrect ? 600 : 200
    );
  };

  const logTimeSpent = (
    remainingTime: number,
    elapsedTime: number,
    isCorrect: boolean
  ) => {
    const questionNumber = currentQuestionIndex + 1;
    const score = isCorrect
      ? (remainingTime >= 3 ? 100 : (remainingTime / 3) * 100).toFixed(2)
      : "0";
    const color =
      questionNumber % 2 === 0 ? "color: hotpink" : "color: neonblue";

    console.log(
      `%cQuestion ${questionNumber}: Time Left(${remainingTime.toFixed(
        2
      )}s) | Time Spent(${elapsedTime.toFixed(2)}s) + Answer(${
        isCorrect ? "Correct" : "Incorrect"
      }) = Score(${score}%) | Question: ${
        questions[currentQuestionIndex].question
      }`,
      color
    );
  };

  const calculateScore = (remainingTime: number, isCorrect: boolean) => {
    let questionScore = 0;

    if (isCorrect) {
      questionScore = remainingTime >= 3 ? 100 : (remainingTime / 3) * 100;
    }

    setIndividualScores((prevScores) => [...prevScores, questionScore]);
    setScore((prevScore) => prevScore + questionScore);
  };

  const handleNextQuestion = () => {
    const nextRoundCount = roundCount + 1;
    setRoundCount(nextRoundCount);

    if (nextRoundCount < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setFeedbackClass(null);
      setTimer(10);
      setStartTime(Date.now());
    } else {
      const finalScore = calculateFinalScore();
      setQuizEnded(true);

      const scoreObject = { "Quiz Score": finalScore };
      console.log(scoreObject);

      // Print out the total time spent and correct answers in the console
      console.log(`Total Time Spent: ${totalTimeSpent.toFixed(2)} seconds`);
      console.log(`Correct Answers: ${correctAnswers}`);

      onQuizEnd(scoreObject);
    }
  };

  const calculateFinalScore = () => {
    if (individualScores.length === 0) return 0;

    const totalScore = score;
    const averageScore = totalScore / individualScores.length;

    return averageScore;
  };

  if (quizEnded) {
    return <div>Quiz Ended! Your final score is: {calculateFinalScore()}%</div>;
  }

  if (questions.length === 0 || !questions[currentQuestionIndex]) {
    return null;
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className={`quiz-container ${animationType}`}>
      <div className="timer">{timer}s</div>
      {selectedIcon && (
        <img src={selectedIcon} alt={question.theme} className="theme-icon" />
      )}
      <h2>Tema: {question.theme}</h2>
      <p className="question-text">{question.question}</p>
      <div className="options-container">
        {randomizedOptions.map(([key, value]) => (
          <div
            key={key}
            className={`option ${
              selectedOption === key ? `${feedbackClass} selected` : ""
            }`}
            onClick={() => handleOptionClick(key)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
