import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { TouchableOpacity, useColorScheme, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

import styles from './style';

export function CollapsibleMenu({ children, title, style }: ViewProps & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'dark';

  return (
    <ThemedView style={styles.containerCollapsibleMenu}>
      <TouchableOpacity
        style={styles.headingCollapsibleMenu}
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

      {isOpen && <ThemedView style={[{ ...styles.contentCollapsibleMenu }, style]}>{children}</ThemedView>}
    </ThemedView>
  );
}
