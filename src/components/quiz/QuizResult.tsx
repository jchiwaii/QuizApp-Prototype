import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResult({
  score,
  totalQuestions,
  onRestart,
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.resultWrapper}>
        <ResultCard
          percentage={percentage}
          score={score}
          totalQuestions={totalQuestions}
          onRestart={onRestart}
        />
      </View>
    </View>
  );
}

interface ResultCardProps {
  percentage: number;
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

function ResultCard({
  percentage,
  score,
  totalQuestions,
  onRestart,
}: ResultCardProps) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>Great job!</Text>
      <Text style={styles.resultSubtitle}>Here is how you did</Text>
      <ScoreBadge percentage={percentage} />
      <Text style={styles.resultBreakdown}>
        You answered {score} of {totalQuestions} questions correctly.
      </Text>
      <RestartButton onPress={onRestart} />
    </View>
  );
}

interface ScoreBadgeProps {
  percentage: number;
}

function ScoreBadge({ percentage }: ScoreBadgeProps) {
  return (
    <View style={styles.resultBadge}>
      <Text style={styles.resultPercentage}>{percentage}%</Text>
    </View>
  );
}

interface RestartButtonProps {
  onPress: () => void;
}

function RestartButton({ onPress }: RestartButtonProps) {
  return (
    <TouchableOpacity
      style={styles.restartButton}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.restartButtonText}>Restart quiz</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f4ec",
  },
  resultWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 28,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e8dfcf",
    shadowColor: "#e1d8c6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f1c19",
    textAlign: "center",
    marginBottom: 6,
    fontFamily: "Fredoka_700Bold",
  },
  resultSubtitle: {
    fontSize: 15,
    color: "#7b7267",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Fredoka_400Regular",
  },
  resultBadge: {
    alignSelf: "center",
    backgroundColor: "#fdecde",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 36,
    marginBottom: 18,
  },
  resultPercentage: {
    fontSize: 36,
    fontWeight: "700",
    color: "#f0672d",
    fontFamily: "Fredoka_700Bold",
  },
  resultBreakdown: {
    fontSize: 16,
    color: "#5b544a",
    textAlign: "center",
    marginBottom: 28,
    fontFamily: "Fredoka_400Regular",
  },
  restartButton: {
    backgroundColor: "#000",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Fredoka_600SemiBold",
  },
});
