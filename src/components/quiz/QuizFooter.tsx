import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface QuizFooterProps {
  isAnswered: boolean;
  isLastQuestion: boolean;
  onSkip: () => void;
  onContinue: () => void;
}

export default function QuizFooter({
  isAnswered,
  isLastQuestion,
  onSkip,
  onContinue,
}: QuizFooterProps) {
  const primaryCtaLabel = isLastQuestion ? "See results" : "Continue";

  return (
    <View style={styles.bottomBar}>
      <SkipButton onPress={onSkip} />
      <ContinueButton
        label={primaryCtaLabel}
        isEnabled={isAnswered}
        onPress={onContinue}
      />
    </View>
  );
}

interface SkipButtonProps {
  onPress: () => void;
}

function SkipButton({ onPress }: SkipButtonProps) {
  return (
    <TouchableOpacity
      style={styles.skipButton}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.skipIcon}>↻</Text>
    </TouchableOpacity>
  );
}

interface ContinueButtonProps {
  label: string;
  isEnabled: boolean;
  onPress: () => void;
}

function ContinueButton({ label, isEnabled, onPress }: ContinueButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, !isEnabled && styles.primaryButtonDisabled]}
      onPress={onPress}
      disabled={!isEnabled}
      activeOpacity={0.9}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 16,
  },
  skipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#e0d8c7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  skipIcon: {
    fontSize: 24,
    fontWeight: "600",
    color: "#f9672c",
    fontFamily: "Fredoka_600SemiBold",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 18,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1f1f1f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  primaryButtonDisabled: {
    backgroundColor: "rgba(0,0,0,0.25)",
    shadowOpacity: 0,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "Fredoka_700Bold",
  },
});
