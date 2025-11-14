import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizContent from "../components/quiz/QuizContent";
import QuizFooter from "../components/quiz/QuizFooter";
import QuizResult from "../components/quiz/QuizResult";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const quizData: Question[] = [
  {
    question: "What is React Native?",
    answers: [
      "A web framework",
      "A mobile app development framework",
      "A database",
      "A programming language",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which company developed React Native?",
    answers: ["Google", "Microsoft", "Facebook", "Apple"],
    correctAnswer: 2,
  },
  {
    question: "What language is React Native based on?",
    answers: ["Python", "Java", "JavaScript", "Swift"],
    correctAnswer: 2,
  },
  {
    question: "Which hook is used for side effects in React?",
    answers: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
  },
  {
    question: "What does JSX stand for?",
    answers: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension",
    ],
    correctAnswer: 0,
  },
];

const TIME_PER_QUESTION = 30; // seconds

type AnswerStatus = "idle" | "selected" | "correct" | "wrong";

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  // Timer effect
  useEffect(() => {
    if (isAnswered || quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswered, quizFinished]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setSelectedAnswer(null);
    setTimeLeft(0);
  };

  const handleAnswerPress = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(TIME_PER_QUESTION);
    setQuizFinished(false);
  };

  const skipQuestion = () => {
    moveToNextQuestion();
  };

  const getAnswerStatus = (answerIndex: number): AnswerStatus => {
    if (isAnswered) {
      if (answerIndex === currentQuestion.correctAnswer) {
        return "correct";
      }
      if (selectedAnswer === answerIndex) {
        return "wrong";
      }
      return "idle";
    }

    if (selectedAnswer === answerIndex) {
      return "selected";
    }

    return "idle";
  };

  if (quizFinished) {
    return (
      <QuizResult
        score={score}
        totalQuestions={quizData.length}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <View style={styles.container}>
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData.length}
        timeLeft={timeLeft}
      />
      <QuizContent
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizData.length}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        onAnswerPress={handleAnswerPress}
        getAnswerStatus={getAnswerStatus}
      />
      <QuizFooter
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
        onSkip={skipQuestion}
        onContinue={moveToNextQuestion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f4ec",
  },
});
