import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface Props {
  onPress: PressableProps['onPress'];
  title: string;
  variant?: 'negative' | 'primary' | 'secondary';
}

const getVariantStyles = (variant: Props['variant']) => {
  switch (variant) {
    case 'negative': {
      return {
        pressable: styles.pressableNegative,
        pressed: styles.pressedNegative,
      };
    }
    case 'secondary': {
      return {
        pressable: styles.pressableSecondary,
        pressed: styles.pressedSecondary,
      };
    }
    default: {
      return {
        pressable: styles.pressablePrimary,
        pressed: styles.pressedPrimary,
      };
    }
  }
};

const Button = ({ onPress, title, variant = 'primary' }: Props) => {
  const variationStyles = getVariantStyles(variant);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [
          styles.pressable,
          pressed ? variationStyles.pressed : variationStyles.pressable,
        ];
      }}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    margin: 4,
    padding: 8,
  },
  pressableNegative: {
    backgroundColor: '#FF3860',
  },
  pressablePrimary: {
    backgroundColor: '#3273DC',
  },
  pressableSecondary: {
    backgroundColor: '#209CEE',
  },
  pressedNegative: {
    backgroundColor: '#EF2850',
  },
  pressedPrimary: {
    backgroundColor: '#2263CC',
  },
  pressedSecondary: {
    backgroundColor: '#108CDE',
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default Button;
