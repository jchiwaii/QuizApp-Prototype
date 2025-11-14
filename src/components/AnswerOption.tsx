import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

type AnswerStatus = "idle" | "selected" | "correct" | "wrong";

interface AnswerOptionProps {
  answer: string;
  onPress: () => void;
  status: AnswerStatus;
  disabled: boolean;
}

export default function AnswerOption({
  answer,
  onPress,
  status,
  disabled,
}: AnswerOptionProps) {
  const palette = {
    baseBorder: "#ece7dc",
    baseDot: "#f1ede4",
    baseText: "#1f1c19",
    selectedBorder: "#f6b28a",
    selectedBackground: "#fef4ed",
    correctBorder: "#f0672d",
    correctBackground: "#fde4d4",
    wrongBorder: "#dc2626",
    wrongBackground: "#fde4e4",
  } as const;

  let backgroundColor: string = "#ffffff";
  let borderColor: string = palette.baseBorder;
  let textColor: string = palette.baseText;
  let dotColor: string = palette.baseDot;

  if (status === "selected") {
    backgroundColor = palette.selectedBackground;
    borderColor = palette.selectedBorder;
    dotColor = palette.selectedBorder;
  }

  if (status === "correct") {
    backgroundColor = palette.correctBackground;
    borderColor = palette.correctBorder;
    dotColor = palette.correctBorder;
    textColor = "#7a2d10";
  }

  if (status === "wrong") {
    backgroundColor = palette.wrongBackground;
    borderColor = palette.wrongBorder;
    dotColor = palette.wrongBorder;
    textColor = "#8b1c1c";
  }

  const isInteractive = status === "idle" || status === "selected";

  return (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor,
          borderColor,
          opacity: disabled && isInteractive ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[styles.optionText, { color: textColor }]}>{answer}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 28,
    marginBottom: 14,
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1f1c19",
    fontFamily: "Nunito_400Regular",
  },
});
