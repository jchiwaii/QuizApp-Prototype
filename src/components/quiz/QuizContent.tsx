import { View, StyleSheet } from "react-native";
import QuestionCard from "../QuestionCard";
import AnswerOption from "../AnswerOption";

type AnswerStatus = "idle" | "selected" | "correct" | "wrong";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizContentProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerPress: (index: number) => void;
  getAnswerStatus: (index: number) => AnswerStatus;
}

export default function QuizContent({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  onAnswerPress,
  getAnswerStatus,
}: QuizContentProps) {
  return (
    <View style={styles.content}>
      <QuestionCard
        question={currentQuestion.question}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <AnswersList
        answers={currentQuestion.answers}
        onAnswerPress={onAnswerPress}
        getAnswerStatus={getAnswerStatus}
        isAnswered={isAnswered}
      />
    </View>
  );
}

interface AnswersListProps {
  answers: string[];
  onAnswerPress: (index: number) => void;
  getAnswerStatus: (index: number) => AnswerStatus;
  isAnswered: boolean;
}

function AnswersList({
  answers,
  onAnswerPress,
  getAnswerStatus,
  isAnswered,
}: AnswersListProps) {
  return (
    <View style={styles.answersContainer}>
      {answers.map((answer, index) => (
        <AnswerOption
          key={index}
          answer={answer}
          onPress={() => onAnswerPress(index)}
          status={getAnswerStatus(index)}
          disabled={isAnswered}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  answersContainer: {
    flex: 1,
    marginTop: 8,
  },
});
