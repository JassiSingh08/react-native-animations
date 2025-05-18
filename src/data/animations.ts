import { AnimationComponent } from "../types";

export const animations: AnimationComponent[] = [
  {
    id: "progress-bar",
    name: "Progress Bar",
    description:
      "A customizable progress bar component that visualizes completion status with smooth animations.",
    useCases: [
      "Displaying download or upload progress",
      "Form completion status",
      "Step-by-step wizards",
      "Loading indicators with determinate progress",
    ],
    performanceTips: [
      "Use useNativeDriver: true for better performance",
      "Avoid re-rendering the component unnecessarily",
      "Use interpolation for smooth transitions",
    ],
    tags: ["progress", "loading", "ui", "feedback"],
    jsCode: `import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar = () => {
  const progress = useSharedValue(0);
  const [tooltipText, setTooltipText] = useState('0%');

  const animatedStyle = useAnimatedStyle(() => ({
    width: \`\${progress.value * 100}%\`,
  }));

  const tooltipStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 300 - 25 }],
  }));

  useAnimatedReaction(
    () => Math.round(progress.value * 100),
    (val) => {
      runOnJS(setTooltipText)(\`\${val}%\`);
    },
    []
  );

  const startProgress = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 3000 });
  };

  useEffect(() => {
    progress.value = 0;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, animatedStyle]} />
          <Animated.View style={[styles.tooltip, tooltipStyle]}>
            <Text style={styles.tooltipText}>{tooltipText}</Text>
          </Animated.View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Start Progress" onPress={startProgress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressContainer: {
    width: 300,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'visible',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 10,
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    width: 50,
    height: 25,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProgressBar;`,
    tsCode: `import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar: React.FC = () => {
  const progress = useSharedValue<number>(0);
  const [tooltipText, setTooltipText] = useState<string>('0%');

  const animatedStyle = useAnimatedStyle(() => ({
    width: \`\${progress.value * 100}%\`,
  }));

  const tooltipStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 300 - 25 }],
  }));

  useAnimatedReaction(
    () => Math.round(progress.value * 100),
    (val) => {
      runOnJS(setTooltipText)(\`\${val}%\`);
    },
    []
  );

  const startProgress = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 3000 });
  };

  useEffect(() => {
    progress.value = 0;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, animatedStyle]} />
          <Animated.View style={[styles.tooltip, tooltipStyle]}>
            <Text style={styles.tooltipText}>{tooltipText}</Text>
          </Animated.View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Start Progress" onPress={startProgress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressContainer: {
    width: 300,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'visible',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 10,
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    width: 50,
    height: 25,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProgressBar;
`,

    previewUrl: "",
  },
  {
    id: "flip-card",
    name: "Flip Card",
    description:
      "An interactive card component with a smooth 3D flip animation, revealing content on both sides.",
    useCases: [
      "Interactive flashcards for education apps",
      "Revealing additional information on tap",
      "Game cards (matching games, memory games)",
      "Product showcases with front/back views",
    ],
    performanceTips: [
      "Use useNativeDriver: true for hardware acceleration",
      "Avoid complex layouts inside the card to maintain smooth animations",
      "Pre-render both sides of the card to prevent flickering",
    ],
    tags: ["card", "flip", "interaction", "3d", "transition"],
    jsCode: `import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FlipCard = () => {
  const router = useRouter();
  const rotation = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const start = () => {
    isFlipped.value = !isFlipped.value;
    rotation.value = withTiming(isFlipped.value ? 1 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = \`\${interpolate(rotation.value, [0, 1], [0, 180])}deg\`;

    return {
      transform: [{ rotateY }, { perspective: 1000 }],
      backgroundColor: interpolateColor(rotation.value, [0, 1], ["#b58df1", "#3b82f6"]),
      opacity: rotation.value <= 0.5 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = \`\${interpolate(rotation.value, [0, 1], [180, 360])}deg\`;

    return {
      transform: [{ rotateY }, { perspective: 1000 }],
      backgroundColor: interpolateColor(rotation.value, [1, 0], ["#3b82f6", "#b58df1"]),
      opacity: rotation.value > 0.5 ? 1 : 0,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View style={[styles.flipCard, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.cardText}>Back Side</Text>
        </Animated.View>
        <Animated.View style={[styles.flipCard, styles.frontCard, frontAnimatedStyle]}>
          <Text style={styles.cardText}>Front Side</Text>
        </Animated.View>
      </View>
      <Button title="Flip" onPress={start} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  flipCard: {
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  frontCard: {
    backgroundColor: "#b58df1",
  },
  backCard: {
    backgroundColor: "#3b82f6",
  },
  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FlipCard;`,
    tsCode: `import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FlipCard: React.FC = () => {
  const router = useRouter();
  const rotation = useSharedValue<number>(0);
  const isFlipped = useSharedValue<boolean>(false);

  const start = () => {
    isFlipped.value = !isFlipped.value;
    rotation.value = withTiming(isFlipped.value ? 1 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = \`\${interpolate(rotation.value, [0, 1], [0, 180])}deg\`;

    return {
      transform: [{ rotateY }, { perspective: 1000 }],
      backgroundColor: interpolateColor(rotation.value, [0, 1], ["#b58df1", "#3b82f6"]),
      opacity: rotation.value <= 0.5 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = \`\${interpolate(rotation.value, [0, 1], [180, 360])}deg\`;

    return {
      transform: [{ rotateY }, { perspective: 1000 }],
      backgroundColor: interpolateColor(rotation.value, [1, 0], ["#3b82f6", "#b58df1"]),
      opacity: rotation.value > 0.5 ? 1 : 0,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View style={[styles.flipCard, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.cardText}>Back Side</Text>
        </Animated.View>
        <Animated.View style={[styles.flipCard, styles.frontCard, frontAnimatedStyle]}>
          <Text style={styles.cardText}>Front Side</Text>
        </Animated.View>
      </View>
      <Button title="Flip" onPress={start} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  flipCard: {
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  frontCard: {
    backgroundColor: "#b58df1",
  },
  backCard: {
    backgroundColor: "#3b82f6",
  },
  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FlipCard;
`,
    previewUrl: "",
  },
  {
    id: "rotating-wheel",
    name: "Rotating Wheel",
    description:
      "An endlessly spinning wheel useful for loading indicators, game UIs, or visual decorations.",
    useCases: [
      "Game loading or spinning elements",
      "Visual attention grabbers",
      "Progress indicators",
    ],
    performanceTips: [
      "Use `useNativeDriver: true` for seamless rotation",
      "Keep the number of simultaneous animations low to prevent lag",
    ],
    tags: ["animation", "loading", "rotation", "ui"],
    jsCode: `import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SEGMENTS = 8;
const ROTATION_PER_SEGMENT = 360 / SEGMENTS;

const RotatingWheel = () => {
  const router = useRouter();

  const rotate = useSharedValue(0);

  const startRandom = () => {
    const randomSegment = Math.floor(Math.random() * SEGMENTS);
    const extraSpins = 5;
    const finalRotation =
      extraSpins * 360 + randomSegment * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(finalRotation / 360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  };

  const stopAtSegment = (segmentIndex) => {
    const extraSpins = 5;
    const finalRotation =
      extraSpins * 360 + segmentIndex * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(finalRotation / 360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: \`\${rotate.value * 360}deg\`,
      },
    ],
  }));

  const renderSegments = () => {
    const items = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = (360 / SEGMENTS) * i;
      items.push(
        <View
          key={i}
          style={[
            styles.segment,
            {
              transform: [{ rotate: \`\${angle}deg\` }, { translateY: -135 }],
            },
          ]}
        >
          <Text style={styles.segmentText}>{i + 1}</Text>
        </View>
      );
    }
    return items;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.wheel, animatedStyle]}>
          {renderSegments()}
        </Animated.View>
      </View>
      <Button title="Random Spin" onPress={startRandom} />
      <Button title="Stop at Segment 5" onPress={() => stopAtSegment(4)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  wheel: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    borderRadius: 999,
    position: "relative",
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#b58df1",
    transform: [{ rotate: "180deg" }],
    marginBottom: 20,
  },
  segment: {
    position: "absolute",
    top: "45%",
    left: "50%",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -30,
  },
  segmentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RotatingWheel;
`,
    tsCode: `import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SEGMENTS = 8;
const ROTATION_PER_SEGMENT = 360 / SEGMENTS;

const RotatingWheel: React.FC = () => {
  const router = useRouter();

  const rotate = useSharedValue<number>(0);

  const startRandom = () => {
    const randomSegment = Math.floor(Math.random() * SEGMENTS);
    const extraSpins = 5;
    const finalRotation =
      extraSpins * 360 + randomSegment * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(finalRotation / 360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  };

  const stopAtSegment = (segmentIndex: number) => {
    const extraSpins = 5;
    const finalRotation =
      extraSpins * 360 + segmentIndex * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(finalRotation / 360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: \`\${rotate.value * 360}deg\`,
      },
    ],
  }));

  const renderSegments = () => {
    const items = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = (360 / SEGMENTS) * i;
      items.push(
        <View
          key={i}
          style={[
            styles.segment,
            {
              transform: [{ rotate: \`\${angle}deg\` }, { translateY: -135 }],
            },
          ]}
        >
          <Text style={styles.segmentText}>{i + 1}</Text>
        </View>
      );
    }
    return items;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.wheel, animatedStyle]}>
          {renderSegments()}
        </Animated.View>
      </View>
      <Button title="Random Spin" onPress={startRandom} />
      <Button title="Stop at Segment 5" onPress={() => stopAtSegment(4)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  wheel: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    borderRadius: 999,
    position: "relative",
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#b58df1",
    transform: [{ rotate: "180deg" }],
    marginBottom: 20,
  },
  segment: {
    position: "absolute",
    top: "45%",
    left: "50%",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -30,
  },
  segmentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RotatingWheel;
`,
    previewUrl: "",
  },
  {
    id: "eyes-following-text",
    name: "Eyes Following Text Input",
    description:
      "A fun and interactive UI where cartoon eyes follow the user's text input cursor.",
    useCases: [
      "Login or onboarding screens",
      "Educational apps for children",
      "Engaging contact forms",
    ],
    performanceTips: [
      "Throttle input change listeners to avoid excessive re-renders",
      "Optimize calculations for cursor tracking on low-power devices",
    ],
    tags: ["fun", "interactive", "animation", "input"],
    jsCode: `import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TextInputWithEyes() {
  const router = useRouter();
  const [text, setText] = useState("");

  const rawOffset = 80;
  const maxOffset = 15;
  const pupilOffsetX = useSharedValue(0);
  const pupilOffsetY = useSharedValue(0);

  const leftEyebrowRotate = useSharedValue(0);
  const rightEyebrowRotate = useSharedValue(0);
  const eyebrowOffsetY = useSharedValue(0);

  const triggerErrorShake = () => {
    pupilOffsetX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(10, { duration: 100 }),
          withTiming(-10, { duration: 100 })
        ),
        2,
        true
      ),
      withTiming(0, { duration: 50 })
    );
  };

  const triggerEyebrowAnger = () => {
    leftEyebrowRotate.value = withTiming(15, { duration: 150 });
    rightEyebrowRotate.value = withTiming(-15, { duration: 150 });
    eyebrowOffsetY.value = withTiming(5, { duration: 150 });
  };

  const handleTextChange = (input) => {
    setText(input);
    const isValid = /^[a-zA-Z\s]*$/.test(input);

    if (!isValid) {
      triggerErrorShake();
      triggerEyebrowAnger();
      return;
    }

    leftEyebrowRotate.value = withTiming(0);
    rightEyebrowRotate.value = withTiming(0);
    eyebrowOffsetY.value = withTiming(0);
    pupilOffsetX.value = withSpring(Math.min(input.length * 2, maxOffset));
    pupilOffsetY.value = withSpring(Math.min(rawOffset, maxOffset));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: pupilOffsetX.value },
      { translateY: pupilOffsetY.value },
    ],
  }));

  const leftEyebrowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: eyebrowOffsetY.value },
      { rotateZ: \`\${leftEyebrowRotate.value}deg\` },
    ],
  }));

  const rightEyebrowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: eyebrowOffsetY.value },
      { rotateZ: \`\${rightEyebrowRotate.value}deg\` },
    ],
  }));

  const onFocus = () => {
    pupilOffsetY.value = withSpring(Math.min(rawOffset, maxOffset));
  };

  const onblur = () => {
    leftEyebrowRotate.value = withTiming(0);
    rightEyebrowRotate.value = withTiming(0);
    eyebrowOffsetY.value = withTiming(0);
    pupilOffsetY.value = withSpring(0);
    pupilOffsetX.value = withSpring(0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          {[0, 1].map((i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <Animated.View
                style={[
                  styles.eyebrow,
                  i === 0 ? leftEyebrowStyle : rightEyebrowStyle,
                ]}
              />
              <View style={styles.eye}>
                <Animated.View style={[styles.pupil, animatedStyle]} />
              </View>
            </View>
          ))}
        </View>

        <TextInput
          onFocus={onFocus}
          onBlur={onblur}
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Type here"
          placeholderTextColor="#888"
        />
        <Button title="Done" onPress={onblur} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  eye: {
    backgroundColor: "#e0e0e0",
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pupil: {
    backgroundColor: "#000",
    height: 35,
    width: 35,
    borderRadius: 99,
  },
  input: {
    height: 40,
    width: 200,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    textAlign: "center",
  },
  eyebrow: {
    width: 50,
    height: 6,
    backgroundColor: "#000",
    borderRadius: 3,
    marginBottom: 4,
  },
});
`,
    tsCode: `import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TextInputWithEyes() {
  const router = useRouter();
  const [text, setText] = useState<string>("");

  const rawOffset: number = 80;
  const maxOffset: number = 15;
  const pupilOffsetX = useSharedValue<number>(0);
  const pupilOffsetY = useSharedValue<number>(0);

  const leftEyebrowRotate = useSharedValue<number>(0);
  const rightEyebrowRotate = useSharedValue<number>(0);
  const eyebrowOffsetY = useSharedValue<number>(0);

  const triggerErrorShake = () => {
    pupilOffsetX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(10, { duration: 100 }),
          withTiming(-10, { duration: 100 })
        ),
        2,
        true
      ),
      withTiming(0, { duration: 50 })
    );
  };

  const triggerEyebrowAnger = () => {
    leftEyebrowRotate.value = withTiming(15, { duration: 150 });
    rightEyebrowRotate.value = withTiming(-15, { duration: 150 });
    eyebrowOffsetY.value = withTiming(5, { duration: 150 });
  };

  const handleTextChange = (input: string) => {
    setText(input);
    const isValid = /^[a-zA-Z\s]*$/.test(input);

    if (!isValid) {
      triggerErrorShake();
      triggerEyebrowAnger();
      return;
    }

    leftEyebrowRotate.value = withTiming(0);
    rightEyebrowRotate.value = withTiming(0);
    eyebrowOffsetY.value = withTiming(0);
    pupilOffsetX.value = withSpring(Math.min(input.length * 2, maxOffset));
    pupilOffsetY.value = withSpring(Math.min(rawOffset, maxOffset));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: pupilOffsetX.value },
      { translateY: pupilOffsetY.value },
    ],
  }));

  const leftEyebrowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: eyebrowOffsetY.value },
      { rotateZ: \`\${leftEyebrowRotate.value}deg\` },
    ],
  }));

  const rightEyebrowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: eyebrowOffsetY.value },
      { rotateZ: \`\${rightEyebrowRotate.value}deg\` },
    ],
  }));

  const onFocus = () => {
    pupilOffsetY.value = withSpring(Math.min(rawOffset, maxOffset));
  };

  const onblur = () => {
    leftEyebrowRotate.value = withTiming(0);
    rightEyebrowRotate.value = withTiming(0);
    eyebrowOffsetY.value = withTiming(0);
    pupilOffsetY.value = withSpring(0);
    pupilOffsetX.value = withSpring(0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          {[0, 1].map((i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <Animated.View
                style={[
                  styles.eyebrow,
                  i === 0 ? leftEyebrowStyle : rightEyebrowStyle,
                ]}
              />
              <View style={styles.eye}>
                <Animated.View style={[styles.pupil, animatedStyle]} />
              </View>
            </View>
          ))}
        </View>

        <TextInput
          onFocus={onFocus}
          onBlur={onblur}
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Type here"
          placeholderTextColor="#888"
        />
        <Button title="Done" onPress={onblur} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  eye: {
    backgroundColor: "#e0e0e0",
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pupil: {
    backgroundColor: "#000",
    height: 35,
    width: 35,
    borderRadius: 99,
  },
  input: {
    height: 40,
    width: 200,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    textAlign: "center",
  },
  eyebrow: {
    width: 50,
    height: 6,
    backgroundColor: "#000",
    borderRadius: 3,
    marginBottom: 4,
  },
});
`,
    previewUrl: "",
  },
  {
    id: "expanding-search-bar",
    name: "Expanding Search Bar",
    description:
      "A minimal search icon that expands into a full input field when tapped.",
    useCases: [
      "Navigation bars",
      "Minimalist app headers",
      "Search-centric interfaces",
    ],
    performanceTips: [
      "Use `Animated` or `Reanimated` for fluid width transitions",
      "Delay autofocus slightly to improve perceived responsiveness",
    ],
    tags: ["search", "input", "ui", "expansion"],
    jsCode: `import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpandingSearchbar = () => {
  const router = useRouter();
  const expandedWidth = 300;
  const collapsedWidth = 50;
  const width = useSharedValue(collapsedWidth);
  const opacity = useSharedValue(0);

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const toggleExpand = () => {
    if (isExpanded) {
      width.value = withTiming(collapsedWidth, { duration: 300 });
      opacity.value = withTiming(0, { duration: 200 });
    } else {
      width.value = withTiming(expandedWidth, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchBar, animatedStyle]}>
          <Pressable onPress={toggleExpand}>
            <AntDesign name="search1" size={22} color="#333" />
          </Pressable>
          <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
            <TextInput
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              style={styles.input}
              autoFocus={isExpanded}
              editable={isExpanded}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ExpandingSearchbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    elevation: 3,
    overflow: "hidden",
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
    color: "#333",
  },
});
`,
    tsCode: `import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpandingSearchbar: React.FC = () => {
  const router = useRouter();
  const expandedWidth = 300;
  const collapsedWidth = 50;
  const width = useSharedValue<number>(collapsedWidth);
  const opacity = useSharedValue<number>(0);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const toggleExpand = () => {
    if (isExpanded) {
      width.value = withTiming(collapsedWidth, { duration: 300 });
      opacity.value = withTiming(0, { duration: 200 });
    } else {
      width.value = withTiming(expandedWidth, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchBar, animatedStyle]}>
          <Pressable onPress={toggleExpand}>
            <AntDesign name="search1" size={22} color="#333" />
          </Pressable>
          <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
            <TextInput
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              style={styles.input}
              autoFocus={isExpanded}
              editable={isExpanded}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ExpandingSearchbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    elevation: 3,
    overflow: "hidden",
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
    color: "#333",
  },
});
`,
    previewUrl: "",
  },
];
