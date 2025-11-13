import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import AnswerOption from "../components/AnswerOption";

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

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

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
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const handleAnswerPress = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
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

  const getAnswerState = (answerIndex: number) => {
    if (!isAnswered) {
      return null;
    }
    return answerIndex === currentQuestion.correctAnswer;
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Completed! 🎉</Text>
          <Text style={styles.resultScore}>
            Your Score: {score} / {quizData.length}
          </Text>
          <Text style={styles.resultPercentage}>
            {Math.round((score / quizData.length) * 100)}%
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Time Left</Text>
        <View
          style={[
            styles.timerCircle,
            timeLeft <= 10 && styles.timerCircleWarning,
          ]}
        >
          <Text
            style={[
              styles.timerText,
              timeLeft <= 10 && styles.timerTextWarning,
            ]}
          >
            {timeLeft}s
          </Text>
        </View>
      </View>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          Score: {score} / {quizData.length}
        </Text>
      </View>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion.question}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData.length}
      />

      {/* Answer Options */}
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerOption
            key={index}
            answer={answer}
            onPress={() => handleAnswerPress(index)}
            isSelected={selectedAnswer === index}
            isCorrect={getAnswerState(index)}
            disabled={isAnswered}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timerCircleWarning: {
    backgroundColor: "#F44336",
  },
  timerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  timerTextWarning: {
    color: "#fff",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  answersContainer: {
    flex: 1,
    width: "100%",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  resultScore: {
    fontSize: 24,
    color: "#666",
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 40,
  },
  restartButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
