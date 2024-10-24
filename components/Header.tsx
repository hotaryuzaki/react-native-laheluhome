/* eslint-disable @typescript-eslint/no-require-imports */
import { ReactElement, ReactNode, useCallback } from "react";
import { Animated, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';

import { Constants } from '@/constants/Constants';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const IconLahelu = require('@/assets/images/lahelu-icon.png');

export type HeaderProps = {
  tabList: string[],
  tabSelected: string,
  setTabSelected: (tab: string) => void,
  onPressMenu?: (open: boolean) => void,
  onPressSearch?: (open: boolean) => void
};


export function Header({
  tabList,
  tabSelected,
  setTabSelected,
  onPressMenu = () => { },
  onPressSearch = () => { }
}: HeaderProps) {
  // const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'dark';

  const renderTab = useCallback((): ReactNode => {
    const returnView: ReactElement[] = [];

    tabList.map((tab) => {
      returnView.push(
        <TouchableOpacity
          key={tab}
          style={tabSelected === tab ? styles.tabContainerActive : styles.tabContainer}
          onPress={() => setTabSelected(tab)}
        >
          <ThemedText type='tab' style={tabSelected === tab ? styles.tabTextActive : styles.tabText}>
            {tab}
          </ThemedText>
        </TouchableOpacity>
      )
    })

    return returnView;
  }, [tabSelected]);


  return (
    <Animated.View
      style={{
        height: insets.top + (49 + 39),
        paddingTop: insets.top,
        // transform: [{ translateY }],
        backgroundColor: Colors.dark.background
      }}
    >
      <ThemedView
        style={{
          height: Constants.headerHeight,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.touch}
          onPress={() => onPressMenu(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name='menu'
            size={24}
            color={colorScheme === 'light' ? Colors.light.icon : Colors.dark.icon}
            style={{ padding: 8 }}
          />
        </TouchableOpacity>

        <ThemedView style={{ flex: 1 }}>
          <Image
            style={styles.icon}
            source={IconLahelu}
          />
        </ThemedView>

        <TouchableOpacity
          style={styles.touch}
          onPress={() => onPressSearch(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name='search'
            size={24}
            color={colorScheme === 'light' ? Colors.light.icon : Colors.dark.icon}
            style={{ padding: 8 }}
          />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={{
        height: Constants.tabHeight,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors[colorScheme].border
      }}>
        {renderTab()}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    height: 49,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  icon: {
    height: 25,
    width: 94
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border
  },
  tabContainerActive: {
    flex: 1,
    justifyContent: 'space-evenly',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.tabIconSelected,
  },
  tabText: {
    color: Colors.dark.text,
    fontWeight: 'bold'
  },
  tabTextActive: {
    color: Colors.dark.tabIconSelected,
    fontWeight: 'bold'
  }
});
