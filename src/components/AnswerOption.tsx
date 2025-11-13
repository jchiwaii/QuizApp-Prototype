import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface AnswerOptionProps {
  answer: string;
  onPress: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
}

export default function AnswerOption({
  answer,
  onPress,
  isSelected,
  isCorrect,
  disabled,
}: AnswerOptionProps) {
  const getBackgroundColor = () => {
    if (isCorrect === null) {
      return isSelected ? "#007AFF" : "#f0f0f0";
    }
    if (isCorrect) {
      return "#4CAF50";
    }
    if (isSelected && !isCorrect) {
      return "#F44336";
    }
    return "#f0f0f0";
  };

  const getTextColor = () => {
    if (isCorrect !== null && (isCorrect || isSelected)) {
      return "#fff";
    }
    return isSelected ? "#fff" : "#333";
  };

  return (
    <TouchableOpacity
      style={[styles.option, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.optionText, { color: getTextColor() }]}>
        {answer}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
