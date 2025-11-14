import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

export default function QuizHeader({
  currentQuestion,
  totalQuestions,
  timeLeft,
}: QuizHeaderProps) {
  const insets = useSafeAreaInsets();
  const formattedQuestionLabel = `${String(currentQuestion).padStart(
    2,
    "0"
  )} Question`;

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <HeaderControls />
      <QuestionMeta
        questionLabel={formattedQuestionLabel}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
      <ProgressSegments
        currentQuestion={currentQuestion - 1}
        totalQuestions={totalQuestions}
      />
      <TimerBadge timeLeft={timeLeft} />
    </View>
  );
}

function HeaderControls() {
  return (
    <View style={styles.headerControls}>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
        <Text style={styles.iconGlyph}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}> How many can you get?</Text>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
        <Text style={styles.iconGlyph}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
}

interface QuestionMetaProps {
  questionLabel: string;
  currentQuestion: number;
  totalQuestions: number;
}

function QuestionMeta({
  questionLabel,
  currentQuestion,
  totalQuestions,
}: QuestionMetaProps) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{questionLabel}</Text>
      <Text style={styles.metaCount}>
        {currentQuestion} of {totalQuestions}
      </Text>
    </View>
  );
}

interface ProgressSegmentsProps {
  currentQuestion: number;
  totalQuestions: number;
}

function ProgressSegments({
  currentQuestion,
  totalQuestions,
}: ProgressSegmentsProps) {
  return (
    <View style={styles.segmentRow}>
      {Array.from({ length: totalQuestions }).map((_, idx) => {
        const segmentState =
          idx < currentQuestion
            ? "done"
            : idx === currentQuestion
            ? "active"
            : "idle";

        return (
          <View key={`segment-${idx}`} style={styles.segmentTrack}>
            <View
              style={[
                styles.segmentFill,
                segmentState === "done" && styles.segmentFillDone,
                segmentState === "active" && styles.segmentFillActive,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

interface TimerBadgeProps {
  timeLeft: number;
}

function TimerBadge({ timeLeft }: TimerBadgeProps) {
  return (
    <View style={styles.timerBadge}>
      <Text style={styles.timerBadgeLabel}>Time left</Text>
      <Text
        style={[
          styles.timerBadgeValue,
          timeLeft <= 10 && styles.timerBadgeValueWarn,
        ]}
      >
        {timeLeft}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f9672c",
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconGlyph: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Fredoka_600SemiBold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Fredoka_700Bold",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  metaLabel: {
    color: "#ffe2d4",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Fredoka_600SemiBold",
  },
  metaCount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Fredoka_600SemiBold",
  },
  segmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 20,
  },
  segmentTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
    overflow: "hidden",
  },
  segmentFill: {
    flex: 1,
    backgroundColor: "transparent",
  },
  segmentFillDone: {
    backgroundColor: "#ffd0b8",
  },
  segmentFillActive: {
    backgroundColor: "#fff",
  },
  timerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  timerBadgeLabel: {
    color: "#ffe2d4",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontFamily: "Fredoka_500Medium",
  },
  timerBadgeValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Fredoka_700Bold",
  },
  timerBadgeValueWarn: {
    color: "#ffe175",
  },
});
