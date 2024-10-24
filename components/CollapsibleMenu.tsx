import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function CollapsibleMenu({ children, title, style }: ViewProps & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'dark';

  return (
    <ThemedView style={styles.collapsibleContainer}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText type="menuDrawerActive">{title}</ThemedText>

        <MaterialCommunityIcons
          name={isOpen ? 'menu-up-outline' : 'menu-down-outline'}
          size={24}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>

      {isOpen && <ThemedView style={[{ ...styles.content }, style]}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  collapsibleContainer: {
    flex: 1,
    borderBottomColor: 'white'
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
