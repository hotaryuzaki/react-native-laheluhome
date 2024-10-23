import { Button, StyleSheet, TextInput, TouchableOpacity, type ViewProps } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ListView } from '@/components/ListView';
import { Collapsible } from '@/components/Collapsible';
import { InlineIcon } from '@/components/InlineIcon';

export type ThemedDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  search: boolean;
  setSearch: (search: boolean) => void
};


export function ThemedDrawer({
  children,
  open,
  search,
  lightColor,
  darkColor,
  setOpen = () => { },
  setSearch = () => { }
}: ViewProps & ThemedDrawerProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const colorPlaceholder = useThemeColor({ light: lightColor, dark: darkColor }, 'inputPlaceholder');

  const renderDrawerMenu = () => {
    return (
      <ThemedScrollView showsVerticalScrollIndicator={false} style={styles.content}>
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
      </ThemedScrollView >
    );
  }

  const renderDrawerSearch = () => {
    return (
      <ThemedScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <ThemedView style={styles.drawerHeaderContainer}>
          <ThemedText type='title'>
            Cari meme
          </ThemedText>

          <TouchableOpacity onPress={() => setSearch(false)}>
            <MaterialCommunityIcons name="close" size={24} color={color} />
          </TouchableOpacity>
        </ThemedView>

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          inputMode="text"
          placeholder="Tulis judul, username, atau tag..."
          placeholderTextColor={colorPlaceholder}
        />

        <ThemedText style={{ color: Colors.dark.textSecondary, textAlign: 'center', fontStyle: 'italic' }}>
          riwayat kosong
        </ThemedText>
      </ThemedScrollView >
    );
  }


  return (
    <Drawer
      key='menu'
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={renderDrawerMenu}
      drawerStyle={{
        ...styles.container,
        paddingTop: insets.top,
        backgroundColor
      }}
    >
      <Drawer
        key='search'
        open={search}
        onOpen={() => setSearch(true)}
        onClose={() => setSearch(false)}
        renderDrawerContent={renderDrawerSearch}
        drawerStyle={{
          ...styles.container,
          width: '100%',
          paddingTop: insets.top,
          backgroundColor
        }}
        drawerPosition='right'
      >
        {children}
      </Drawer>
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
    paddingVertical: 10,
  },
  menu: {
    paddingHorizontal: 20,
  },

  drawerHeaderContainer: {
    height: 57,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.dark.text,
  },
  input: {
    height: 40,
    color: Colors.dark.text,
    fontSize: 17,
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderColor: Colors.dark.inputBorder,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.dark.inputBackground
  },
});
