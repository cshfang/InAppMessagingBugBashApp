import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  children: ReactNode;
  header: string;
}

const Section = ({ children, header }: Props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.header}>{header}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#363636',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view: {
    paddingTop: 8,
  },
});

export default Section;
