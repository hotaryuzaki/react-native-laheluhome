import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title, style }: ViewProps & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'dark';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText type="defaultSemiBold">{title}</ThemedText>

        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={24}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>

      {isOpen && <ThemedView style={[{ ...styles.content }, style]}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
