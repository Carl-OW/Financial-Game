import { useState, useEffect } from "react";
import quizData from "./Quiz.json"; // Import the quiz JSON
import "./Quiz.css"; // Import the CSS for styling

interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_answer: string;
}

interface Theme {
  theme: string;
  questions: Question[];
}

interface QuestionWithTheme extends Question {
  theme: string; // To store the theme along with the question
}

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomQuestionFromEachTheme(themes: Theme[]): QuestionWithTheme[] {
  return themes.map((theme) => {
    if (theme.questions.length === 1) {
      return { ...theme.questions[0], theme: theme.theme };
    } else {
      const randomIndex = Math.floor(Math.random() * theme.questions.length);
      return { ...theme.questions[randomIndex], theme: theme.theme };
    }
  });
}

// Icon mapping for each theme using root absolute paths
const themeIcons: { [key: string]: string[] } = {
  Befolkning: ["/QuizIcons/icon_befolkning_0.png", "/QuizIcons/icon_befolkning_1.png"],
  Utdanning: ["/QuizIcons/icon_utdanning_0.png", "/QuizIcons/icon_utdanning_1.png"],
  Arbeid: ["/QuizIcons/icon_arbeid_0.png", "/QuizIcons/icon_arbeid_1.png"],
  Inntekt: ["/QuizIcons/icon_inntekt_0.png", "/QuizIcons/icon_inntekt_1.png"],
  Helse: ["/QuizIcons/icon_helse_0.png", "/QuizIcons/icon_helse_1.png"],
  Miljø: ["/QuizIcons/icon_miljo_0.png", "/QuizIcons/icon_miljo_1.png"],
  Økonomi: ["/QuizIcons/icon_okonomi_0.png", "/QuizIcons/icon_okonomi_1.png"],
  Priser: ["/QuizIcons/icon_priser_0.png", "/QuizIcons/icon_priser_1.png"],
};




function Quiz() {
  const [questions, setQuestions] = useState<QuestionWithTheme[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackClass, setFeedbackClass] = useState<string | null>(null);
  const [animationType, setAnimationType] = useState<null | "nod" | "shake">(
    null
  ); // Differentiate animations
  const [score, setScore] = useState(0); // Overall score to keep track of total points
  const [quizEnded, setQuizEnded] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [randomizedOptions, setRandomizedOptions] = useState<
    [string, string][]
  >([]);
  const [timer, setTimer] = useState(10); // Countdown timer starts at 10 seconds
  const [startTime, setStartTime] = useState<number>(Date.now()); // Time when question starts
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // Track total time spent
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [individualScores, setIndividualScores] = useState<number[]>([]); // Store individual question scores
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null); // Store selected icon for the current question

  // Countdown effect
  useEffect(() => {
    if (timer > 0 && !selectedOption) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000); // Update the timer every second
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !selectedOption) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
      const remainingTime = 10 - elapsedTime;
      logTimeSpent(remainingTime, elapsedTime, false); // Log the time spent when time runs out
      calculateScore(0, false); // User ran out of time, score is 0
      handleNextQuestion();
    }
  }, [timer, selectedOption]);

  // Load questions and shuffle options
  useEffect(() => {
    const shuffledThemes = shuffleArray(quizData.themes);
    const selectedQuestions = getRandomQuestionFromEachTheme(shuffledThemes);
    setQuestions(selectedQuestions);
    setStartTime(Date.now()); // Start the time for the first question
  }, []);

  // Randomize options when the question changes and choose random icon for the question
  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const shuffledOptions = shuffleArray(Object.entries(question.options));
      setRandomizedOptions(shuffledOptions);

      // Choose a random icon for the current theme
      const icons = themeIcons[question.theme] || [];
      if (icons.length > 0) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        setSelectedIcon(randomIcon);
      }
    }
  }, [currentQuestionIndex, questions]);

  const handleOptionClick = (key: string) => {
    if (!questions.length || selectedOption) return;

    const question = questions[currentQuestionIndex];
    setSelectedOption(key);

    const isCorrect = key === question.correct_answer;
    setFeedbackClass(isCorrect ? "correct fade-out" : "incorrect fade-out"); // Add fade-out effect

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1); // Increment correct answers count
      setAnimationType("nod"); // Set nod for correct answer
    } else {
      setAnimationType("shake"); // Set shake for incorrect answer
    }

    // Calculate score based on time and correctness
    const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
    const remainingTime = 10 - elapsedTime;
    calculateScore(remainingTime, isCorrect);

    // Log remaining time and time spent
    logTimeSpent(remainingTime, elapsedTime, isCorrect);

    // Accumulate total time spent
    setTotalTimeSpent((prevTime) => prevTime + elapsedTime);

    // Trigger the shake or nod effect before moving to the next question
    setTimeout(
      () => {
        setAnimationType(null); // Stop animation after 0.5s
        handleNextQuestion();
      },
      isCorrect ? 600 : 200
    ); // Different durations for nod and shake
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
      // Full score if 3 or more seconds left, or scaled score for less than 3 seconds remaining
      questionScore = remainingTime >= 3 ? 100 : (remainingTime / 3) * 100;
    }

    // Update individual scores
    setIndividualScores((prevScores) => [...prevScores, questionScore]);

    // Update overall score
    setScore((prevScore) => prevScore + questionScore);
  };

  const handleNextQuestion = () => {
    const nextRoundCount = roundCount + 1;
    setRoundCount(nextRoundCount);

    if (nextRoundCount < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setFeedbackClass(null); // Remove fade-out effect before loading new question
      setTimer(10); // Reset the timer for the next question
      setStartTime(Date.now()); // Reset the start time for the next question
    } else {
      // End the quiz and calculate final score
      setQuizEnded(true);
      const finalScore = calculateFinalScore();

      // Convert total time spent to minutes and seconds
      const minutes = Math.floor(totalTimeSpent / 60);
      const seconds = (totalTimeSpent % 60).toFixed(2);

      const timeSpentFormatted =
        minutes > 0
          ? `${minutes} minute${minutes > 1 ? "s" : ""} and ${seconds} seconds`
          : `${seconds} seconds`;

      console.log(
        `Final Score: ${finalScore}%. Correct Answers: ${correctAnswers} out of 8. Total Time Spent: ${timeSpentFormatted}`
      );
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
    return null; // Return null until questions are loaded
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className={`quiz-container ${animationType}`}>
      {" "}
      {/* Apply shake or nod class */}
      <div className="timer">{timer}s</div> {/* Display the timer */}
      {selectedIcon && (
        <img src={selectedIcon} alt={question.theme} className="theme-icon" />
      )}{" "}
      {/* Display the icon */}
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
}

export default Quiz;
