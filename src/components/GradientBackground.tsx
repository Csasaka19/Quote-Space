import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT_PRESETS} from '../utils/constants';

/**
 * Animated gradient background that cross-fades between color presets.
 * Two LinearGradient layers are stacked and opacity-animated because
 * gradient colors cannot be directly animated.
 */

interface GradientBackgroundProps {
  children: React.ReactNode;
  colorIndex?: number;
}

const GradientBackground = ({children, colorIndex}: GradientBackgroundProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [currentIndex, setCurrentIndex] = useState(colorIndex ?? 0);
  const [nextIndex, setNextIndex] = useState(colorIndex ?? 0);

  useEffect(() => {
    if (colorIndex === undefined) {
      return;
    }

    // Set the next gradient and start fading to it
    setNextIndex(colorIndex % GRADIENT_PRESETS.length);

    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Once fade completes, swap current to next and reset
      setCurrentIndex(colorIndex % GRADIENT_PRESETS.length);
      fadeAnim.setValue(1);
    });
  }, [colorIndex, fadeAnim]);

  const currentColors = [...GRADIENT_PRESETS[currentIndex]];
  const nextColors = [...GRADIENT_PRESETS[nextIndex]];

  return (
    <LinearGradient
      colors={nextColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
        <LinearGradient
          colors={currentColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          {children}
        </LinearGradient>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GradientBackground;
