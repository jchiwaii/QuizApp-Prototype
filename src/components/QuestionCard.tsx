import { View, Text, StyleSheet } from "react-native";

interface QuestionCardProps {
  question: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.questionNumber}>
        Question {currentQuestion} of {totalQuestions}
      </Text>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    width: "100%",
  },
  questionNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontWeight: "600",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 28,
  },
});
