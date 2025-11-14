import { View, Text, StyleSheet } from "react-native";

interface QuestionCardProps {
  question: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e8dfcf",
    shadowColor: "#f3ede2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  question: {
    fontSize: 26,
    fontWeight: "600",
    color: "#1a1916",
    lineHeight: 32,
    fontFamily: "Fredoka_600Bold",
  },
});
