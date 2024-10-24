import { ReactElement } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, type ViewProps } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Constants } from '@/constants/Constants';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { ListView } from '@/components/ListView';
import { CollapsibleMenu } from '@/components/CollapsibleMenu';
import { InlineIcon } from '@/components/InlineIcon';
import { ImageTagSmall } from '@/components/ImageTagSmall';

export type ThemedDrawerProps = {
  tab?: string;
  tabSelected?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  search: boolean;
  setSearch: (search: boolean) => void,
  onPressLogin: (show: boolean) => void,
  onPressTab: (tab: string) => void,
};


export function ThemedDrawer({
  children,
  tab,
  tabSelected,
  open,
  search,
  lightColor,
  darkColor,
  setOpen = () => { },
  setSearch = () => { },
  onPressLogin = () => { },
  onPressTab = () => { }
}: ViewProps & ThemedDrawerProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const colorPlaceholder = useThemeColor({ light: lightColor, dark: darkColor }, 'inputPlaceholder');


  const renderMenuTag = () => {
    const retTags: ReactElement[] = [];

    Constants.tags.map((tag: string[]) => {
      retTags.push(
        <ListView key={tag[0]} name={`/${tag[0]}`} type='single'>
          <ImageTagSmall source={tag[1]} />
          <ThemedText type="menuDrawer" style={styles.tagMenu}>
            {tag[0]}
          </ThemedText>
          <ThemedView style={styles.starContainer}>
            <MaterialCommunityIcons name="star-outline" size={22} color={color} />
          </ThemedView>
        </ListView>
      );
    })

    return retTags;
  }

  const renderDrawerMenu = () => {
    return (
      <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedView>
          <ThemedView style={styles.notLoginContainer}>
            <ThemedText type='subtitle' style={styles.notLoginTitle}>
              Mau ngepost meme kamu sendiri?
            </ThemedText>

            <ThemedText style={styles.notLoginText}>
              Login dengan Google sekarang! Google sekarang!
            </ThemedText>

            <ThemedButton name='logIn' style={styles.notLoginButton} onPress={() => onPressLogin(true)}>
              <ThemedText type='logIn'>
                Login
              </ThemedText>
            </ThemedButton>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.menuContainer}>
          <TouchableOpacity onPress={() => onPressTab('Home')}>
            <ListView name='/' tab='Home' tabSelected={tabSelected} type='single'>
              <InlineIcon name='home-outline' color={color} size={24} style={{ width: 26 }} />
              <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                Home
              </ThemedText>
            </ListView>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onPressTab('Fresh')}>
            <ListView name='/' tab='Fresh' tabSelected={tabSelected} type='single'>
              <InlineIcon name='clock-outline' color={color} size={20} style={{ width: 26 }} />
              <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                Fresh
              </ThemedText>
            </ListView>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onPressTab('Trending')}>
            <ListView name='/' tab='Trending' tabSelected={tabSelected} type='single'>
              <InlineIcon name='trending-up' color={color} size={24} style={{ width: 26 }} />
              <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                Trending
              </ThemedText>
            </ListView>
          </TouchableOpacity>

          <ListView name='/topik' type='single'>
            <InlineIcon name='account-multiple-outline' color={color} size={24} style={{ width: 26 }} />
            <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
              Topik
            </ThemedText>
          </ListView>
        </ThemedView>

        <ThemedView style={styles.menuContainerWithBorder}>
          <ListView>
            <CollapsibleMenu title="Meme Lain" style={{ marginLeft: 0 }}>
              <ListView name='/peringkat' style={{ paddingHorizontal: 0 }}>
                <Ionicons name="trophy-outline" size={18} color={color} style={{ width: 26 }} />
                <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                  Peringkat
                </ThemedText>
              </ListView>

              <ListView name='/tersimpan' style={{ paddingHorizontal: 0 }}>
                <InlineIcon name="image-multiple-outline" size={18} color={color} style={{ width: 26 }} />
                <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                  Tersimpan
                </ThemedText>
              </ListView>

              <ListView name='/acak' style={{ paddingHorizontal: 0 }}>
                <Ionicons name="shuffle-outline" size={24} color={color} style={{ width: 26 }} />
                <ThemedText type="menuDrawer" style={{ paddingHorizontal: 5 }}>
                  Acak
                </ThemedText>
              </ListView>
            </CollapsibleMenu>
          </ListView>
        </ThemedView>

        <ThemedView style={styles.menuContainerWithBorder}>
          <ListView>
            <CollapsibleMenu title="Jelajah" style={{ marginLeft: 0 }}>
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
            </CollapsibleMenu>
          </ListView>
        </ThemedView>

        <ThemedView style={styles.menuContainer}>
          <ListView>
            <ThemedText type="menuDrawerActive" style={{ color: Colors.dark.tint }}>
              Telusuri
            </ThemedText>
          </ListView>
        </ThemedView>

        {renderMenuTag()}

        <ThemedView style={styles.footerContainer}>
          <ListView>
            <ThemedText type="menuDrawerActive" style={{ color: Colors.dark.tint }}>
              Informasi
            </ThemedText>
          </ListView>

          <ThemedView style={styles.footerLinks}>
            <TouchableOpacity>
              <ThemedText>Kontak</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText>Aturan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText>Ketentuan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText>Kebijakan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText>Lahelu+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText>Koin</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>


      </ThemedScrollView >
    );
  }

  const renderDrawerSearch = () => {
    return (
      <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
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

  notLoginContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.borderGrey
  },
  notLoginTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  notLoginText: {
    textAlign: 'center',
    marginBottom: 10
  },
  notLoginButton: {
    alignSelf: 'center'
  },

  menuContainer: {
    paddingVertical: 4
  },
  menuContainerWithBorder: {
    paddingVertical: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.dark.text,
    marginTop: 0.5
  },
  footerContainer: {
    paddingVertical: 4,
    marginVertical: 10
  },
  footerLinks: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 25,
    gap: 15
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

  tagMenu: {
    flex: 1,
    marginLeft: 7,
    paddingHorizontal: 5
  },
  starContainer: {
    width: 30,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 4,
    backgroundColor: Colors.dark.background
  }
});
