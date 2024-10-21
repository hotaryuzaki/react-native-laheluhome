import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'dark'].background,
          borderTopColor: Colors[colorScheme ?? 'dark'].border,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-outline' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topik"
        options={{
          title: 'Topik',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'account-multiple-outline' : 'account-multiple-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'plus-circle-outline' : 'plus-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'account-circle-outline' : 'account-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
