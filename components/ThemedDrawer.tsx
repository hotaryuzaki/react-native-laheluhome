import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { Button, Image, StyleSheet, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ListView } from '@/components/ListView';
import { Collapsible } from '@/components/Collapsible';
import { InlineIcon } from '@/components/InlineIcon';

export type ThemedDrawerProps = {
  lightColor?: string;
  darkColor?: string;
};


export function ThemedDrawer({
  children,
  open,
  lightColor,
  darkColor,
  setOpen = () => { }
}: PropsWithChildren & { open: boolean; setOpen: (open: boolean) => void }) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const renderDrawerContent = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={{ paddingVertical: 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: color }}>
          <ListView name='/'>
            <InlineIcon name='home-outline' color={color} size={24} style={{ width: 26 }} />
            <ThemedText type="menuDrawer">Home</ThemedText>
          </ListView>

          <ListView name='/topik'>
            <InlineIcon name='clock-outline' color={color} size={20} style={{ width: 26 }} />
            <ThemedText type="menuDrawer">Fresh</ThemedText>
          </ListView>

          <ListView name='/post'>
            <InlineIcon name='trending-up' color={color} size={24} style={{ width: 26 }} />
            <ThemedText type="menuDrawer">Trending</ThemedText>
          </ListView>

          <ListView name='/profil'>
            <InlineIcon name='account-multiple-outline' color={color} size={24} style={{ width: 26 }} />
            <ThemedText type="menuDrawer">Topik</ThemedText>
          </ListView>
        </ThemedView>

        <ThemedView style={{ paddingVertical: 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: color }}>
          <ListView>
            <Collapsible title="Meme Lain" style={{ marginLeft: 0 }}>
              <ListView name='/peringkat' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='clock-outline' color={color} size={20} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Peringkat</ThemedText>
              </ListView>

              <ListView name='/tersimpan' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='trending-up' color={color} size={24} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Tersimpan</ThemedText>
              </ListView>

              <ListView name='/acak' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='account-multiple-outline' color={color} size={24} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Acak</ThemedText>
              </ListView>
            </Collapsible>
          </ListView>
        </ThemedView>

        <ThemedView style={{ paddingVertical: 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: color }}>
          <ListView>
            <Collapsible title="Jelajah" style={{ marginLeft: 0 }}>
              <ListView name='/donatur' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='clock-outline' color={color} size={20} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Donatur</ThemedText>
              </ListView>

              <ListView name='/medali' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='trending-up' color={color} size={24} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Medali</ThemedText>
              </ListView>

              <ListView name='/tokokoin' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='account-multiple-outline' color={color} size={24} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Toko Koin</ThemedText>
              </ListView>

              <ListView name='/discord' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name='account-multiple-outline' color={color} size={24} style={{ width: 26 }} />
                <ThemedText type="menuDrawer">Discord</ThemedText>
              </ListView>
            </Collapsible>
          </ListView>
        </ThemedView>
      </ScrollView >
    );
  }


  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={renderDrawerContent}
      drawerStyle={{
        ...styles.container,
        paddingTop: insets.top,
        backgroundColor
      }}
    >
      {children}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    paddingVertical: 20,
  },
  menu: {
    paddingHorizontal: 20,
  },
});
