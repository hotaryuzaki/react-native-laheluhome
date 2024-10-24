/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * NOTE:
 * INVIEWPORT LISTENER IN EACH TAB & EACH VIDEO, AND NOT HANDLING THE PLAYING VIDEO, WILL MAKE AN PERFORMANCE ISSUE
 */

import { ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PagerView from 'react-native-pager-view';
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import Modal from "react-native-modal";
import { Image } from 'expo-image';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Constants } from '@/constants/Constants';
import { Colors } from '@/constants/Colors';
import { Functions } from '@/constants/Functions';
import { ThemedDrawer } from '@/components/ThemedDrawer';
import { Header } from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedButton } from '@/components/ThemedButton';
import { ImageAvatar } from '@/components/ImageAvatar';
import { ImagePost } from '@/components/ImagePost';
import { ImageLaheluIcon } from '@/components/ImageLaheluIcon';
import { VideoPlayer } from '@/components/VideoPlayer';

const IconLaheluOnly = require('@/assets/images/lahelu-icon-only.png');
const GoogleLogo = require('@/assets/images/google-logo.png');

const width = Dimensions.get('window').width; // SCREEN WIDTH SIZE
const height = Dimensions.get('window').height; // SCREEN HEIGHT SIZE

const today = new Date();

// FIXING FLATLIST BUG: onEndReached CALLED MULTIPLE TIMES
let onEndReachedCalledDuringMomentum: boolean = true;

interface PostData {
  ageTime: number;
  createTime: number;
  feed: number;
  hashtags: string[];
  media: string;
  mediaHeight: number;
  mediaType: number;
  mediaWidth: number;
  postID: string;
  searchVector: string;
  sensitive: boolean;
  title: string;
  totalCoins: number;
  totalComments: number;
  totalDownvotes: number;
  totalUpvotes: number;
  userAvatar: string;
  userID: string;
  userPlusTime: number;
  userPrivilege: number;
  userUsername: string;
}

interface Post {
  hasMore?: boolean,
  nextPage?: number,
  postInfos?: PostData
}


export default function Home() {
  const [open, setOpen] = useState<boolean>(false); // DRAWER MENU
  const [search, setSearch] = useState<boolean>(false);  // DRAWER SEARCH
  const [tabList, setTabList] = useState<string[]>(['Home', 'Fresh', 'Trending']);
  const [tabSelected, setTabSelected] = useState<string>('Home');
  const [home, setHome] = useState<PostData[]>([]);
  const [homePagination, setHomePagination] = useState<Post>({});
  const [homePage, setHomePage] = useState<number>(0);
  const [fresh, setFresh] = useState<PostData[]>([]);
  const [freshPagination, setFreshPagination] = useState<Post>({});
  const [freshPage, setFreshPage] = useState<number>(0);
  const [trending, setTrending] = useState<PostData[]>([]);
  const [trendingPagination, setTrendingPagination] = useState<Post>({});
  const [trendingPage, setTrendingPage] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadingMoreIndicator, setLoadingMoreIndicator] = useState<boolean>(false);
  const [modalNotLogin, setModalNotLogin] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isMounted = useRef<boolean>(true); // REF TO TRACK MOUNTED STATUS
  const refPagerView = useRef<PagerView | null>(null); // PAGERVIEW REF
  const refFlashList = useRef<FlashList<unknown> | null>(null); // FLASHLIST REF

  const iconColor = useThemeColor({}, 'icon');
  const loadingIndicatorColor = useThemeColor({}, 'loadingIndicator');


  const _getPost = async (): Promise<Post | null> => {
    try {
      switch (tabSelected) {
        case 'Home': {
          // CHECK & SAVE TO EACH TAB STATE
          if (homePagination?.hasMore === false) { throw ('end of page'); }

          console.log(`${Constants.apiUrl}/post/get-posts?feed=1&page=${homePage}`);
          const response = await axios.get(
            `${Constants.apiUrl}/post/get-posts?feed=1&page=${homePage}`
          );

          // UPDATE STATE ONLY IF THE COMPONENT IS STILL MOUNTED
          if (isMounted.current) {
            setHomePagination(response.data); // FOR PAGINATION TAB INFO

            // SAVE DATA STATE (PAGE >1)
            if (homePage) {
              setHome((prev) => {
                return [...prev, ...response.data.postInfos];
              });
            }
            else setHome(response.data.postInfos); // SAVE DATA STATE (PAGE 1)
            setLoadingMoreIndicator(false);
            setRefreshing(false);
          }

          return response.data;
        }

        case 'Fresh': {
          // CHECK & SAVE TO EACH TAB STATE
          if (freshPagination?.hasMore === false) { throw ('end of page'); }

          console.log(`${Constants.apiUrl}/post/get-posts?feed=0&page=${freshPage}`);
          const response = await axios.get(
            `${Constants.apiUrl}/post/get-posts?feed=0&page=${freshPage}`
          );

          // UPDATE STATE ONLY IF THE COMPONENT IS STILL MOUNTED
          if (isMounted.current) {
            setFreshPagination(response.data); // FOR PAGINATION TAB INFO

            // SAVE DATA STATE (PAGE >1)
            if (freshPage) {
              setFresh((prev) => {
                return [...prev, ...response.data.postInfos];
              });
            }
            else setFresh(response.data.postInfos); // SAVE DATA STATE (PAGE 1)
            setLoadingMoreIndicator(false);
            setRefreshing(false);
          }

          return response.data;
        }

        case 'Trending': {
          // CHECK & SAVE TO EACH TAB STATE
          if (trendingPagination?.hasMore === false) { throw ('end of page'); }

          console.log(`${Constants.apiUrl}/post/get-posts?feed=2&page=${trendingPage}`);
          const response = await axios.get(
            `${Constants.apiUrl}/post/get-posts?feed=2&page=${trendingPage}`
          );

          // UPDATE STATE ONLY IF THE COMPONENT IS STILL MOUNTED
          if (isMounted.current) {
            setTrendingPagination(response.data); // FOR PAGINATION TAB INFO

            // SAVE DATA STATE (PAGE >1)
            if (trendingPage) {
              setTrending((prev) => {
                return [...prev, ...response.data.postInfos];
              });
            }
            else setTrending(response.data.postInfos); // SAVE DATA STATE (PAGE 1)
            setLoadingMoreIndicator(false);
            setRefreshing(false);
          }

          return response.data;
        }

        default:
          throw ('no tab selected');
      }
    }
    catch (e) {
      console.log('ERROR _getPost', e);
      return null; // RETURN NULL IN CASE OF AN ERROR
    }
  };

  // INIT PAGE & CHANGE TAB HANDLER
  useEffect(() => {
    isMounted.current = true; // SET MOUNTED STATUS TO TRUE ON MOUNT

    const tabPage = tabSelected === 'Home' ? 0 : tabSelected === 'Fresh' ? 1 : 2;
    refPagerView.current?.setPage(tabPage);

    if (
      tabSelected === 'Home' && home.length === 0 ||
      tabSelected === 'Fresh' && fresh.length === 0 ||
      tabSelected === 'Trending' && trending.length === 0
    ) {
      _getPost();
    }

    // CLEANUP FUNCTION TO SET THE MOUNTED STATUS TO FALSE ON UNMOUNT
    return () => {
      isMounted.current = false;
    };
  }, [tabSelected]);

  // USEEFFECT FOR LOADING MORE PAGINATION WHEN ONENDREACHED & REFRESH PAGE
  useEffect(() => {
    isMounted.current = true; // SET MOUNTED STATUS TO TRUE ON MOUNT

    switch (tabSelected) {
      case 'Home': {
        if (loadingMore && homePagination?.hasMore) {
          setLoadingMore(false); // SET FLAG FIRST, IS IMPORTANT TO HANDLE _handleLoadMore CALLED MULTIPLE TIMES (THIS IS RN BUG)
          _getPost();
        }
        break;
      }

      case 'Fresh': {
        if (loadingMore && freshPagination?.hasMore) {
          setLoadingMore(false); // SET FLAG FIRST, IS IMPORTANT TO HANDLE _handleLoadMore CALLED MULTIPLE TIMES (THIS IS RN BUG)
          _getPost();
        }
        break;
      }

      case 'Trending': {
        if (loadingMore && trendingPagination?.hasMore) {
          setLoadingMore(false); // SET FLAG FIRST, IS IMPORTANT TO HANDLE _handleLoadMore CALLED MULTIPLE TIMES (THIS IS RN BUG)
          _getPost();
        }
        break;
      }

      default:
        break;
    };

    // CLEANUP FUNCTION TO SET THE MOUNTED STATUS TO FALSE ON UNMOUNT
    return () => {
      isMounted.current = false;
    };
  }, [loadingMore, tabSelected]);

  const keyExtractor = useCallback((item: { feed: number, postID: string }, index: number) => `${index}-${item.feed}-${item.postID}`, []);

  const renderItem: ListRenderItem<PostData> = ({ item, index }) => {
    return (
      <ThemedView key={index} style={styles.postContainer}>
        <ThemedView style={styles.postHeaderContainer}>
          <ImageAvatar source={item.userAvatar} />

          <ThemedView style={styles.postUsernameContainer}>
            <ThemedText type='postUsername'>
              {item.userUsername}
            </ThemedText>

            <ThemedText type='postTime'>
              · {Functions.msToDayTime(today.getTime() - item.createTime)}
            </ThemedText>
          </ThemedView>

          <MaterialCommunityIcons name="dots-horizontal" size={20} color={iconColor} />
        </ThemedView>

        <ThemedView style={styles.postTitleContainer}>
          <ThemedText type='postTitle'>
            {item.title}
          </ThemedText>
        </ThemedView>

        {
          item.mediaType === 0
            ? <ImagePost source={item.media} />
            : <VideoPlayer source={item.media} id={`${item.feed}-${item.postID}`} />
        }

        <ThemedScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.postTagContainer}
        >
          <ThemedView style={[styles.postPillContainer, styles.postPillSawer]}>
            <MaterialIcons name="monetization-on" size={16} color={iconColor} />
            <ThemedText type='postTag'>
              {item.totalCoins ? item.totalCoins : 'Sawer'}
            </ThemedText>
          </ThemedView>

          {renderTags(item.hashtags)}

          <ThemedView style={styles.postTagSpace} />
        </ThemedScrollView>

        <ThemedView style={styles.postSocialContainer}>
          <ThemedView style={styles.postBoxContainer}>
            <TouchableOpacity onPress={() => setModalNotLogin(true)}>
              <ThemedView style={styles.postBoxContent}>
                <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color={iconColor} />
                <ThemedText type='postCounter'>
                  {item.totalUpvotes ? item.totalUpvotes : 'vote'}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>

            <ThemedView style={styles.postBoxSeparator} />

            <TouchableOpacity onPress={() => setModalNotLogin(true)}>
              <ThemedView>
                <MaterialCommunityIcons name="arrow-down-bold-outline" size={24} color={iconColor} />
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={[styles.postBoxContainer, { marginLeft: 8 }]}>
            <MaterialCommunityIcons name="message-text-outline" size={24} color={iconColor} />
            <ThemedText type='postCounter'>
              {item.totalComments}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.postBoxSpace} />

          <ThemedView style={[styles.postBoxContainer, { paddingHorizontal: 6 }]}>
            <MaterialCommunityIcons name="share-outline" size={32} color={iconColor} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  };

  const renderTags = (tags: string[]): ReactNode => {
    const retTags: ReactElement[] = [];

    tags.map((tag) => {
      retTags.push(
        <ThemedView key={tag} style={styles.postPillContainer}>
          <FontAwesome6 name="hashtag" size={12} color={iconColor} />
          <ThemedText type='postTag'>
            {tag}
          </ThemedText>
        </ThemedView>
      );
    })

    return retTags;
  }

  const renderFlatListFooter = (): ReactNode => useMemo(() => {
    if (!loadingMoreIndicator) return undefined;

    return (
      <ThemedView
        style={{
          position: 'relative',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size='large'
          color={loadingIndicatorColor}
          animating={loadingMoreIndicator}
        />
      </ThemedView>
    );

  }, [loadingMoreIndicator]);

  const _handleLoadMore = useCallback(() => {
    switch (tabSelected) {
      case 'Home': {
        if (homePagination?.hasMore) { // CHECK FOR PAGINATION STATUS
          if (!onEndReachedCalledDuringMomentum) { // HANDLER AGAR TIDAK MULTIPLE TRIGGERED
            onEndReachedCalledDuringMomentum = true;
            setHomePage((prev) => prev + 1);
            setLoadingMoreIndicator(true); // LOADING MORE UI
            setLoadingMore(true); // LOADING MORE FLAG
          }
        }
        break;
      }

      case 'Fresh': {
        if (freshPagination?.hasMore) { // CHECK FOR PAGINATION STATUS
          if (!onEndReachedCalledDuringMomentum) { // HANDLER AGAR TIDAK MULTIPLE TRIGGERED
            onEndReachedCalledDuringMomentum = true;
            setFreshPage((prev) => prev + 1);
            setLoadingMoreIndicator(true); // LOADING MORE UI
            setLoadingMore(true); // LOADING MORE FLAG
          }
        }
        break;
      }

      case 'Trending': {
        if (trendingPagination?.hasMore) { // CHECK FOR PAGINATION STATUS
          if (!onEndReachedCalledDuringMomentum) { // HANDLER AGAR TIDAK MULTIPLE TRIGGERED
            onEndReachedCalledDuringMomentum = true;
            setTrendingPage((prev) => prev + 1);
            setLoadingMoreIndicator(true); // LOADING MORE UI
            setLoadingMore(true); // LOADING MORE FLAG
          }
        }
        break;
      }

      default:
        break;
    }

  }, [tabSelected, onEndReachedCalledDuringMomentum, homePagination, freshPagination, trendingPagination]);

  const _handleRefresh = async () => {
    // RESET DATA
    onEndReachedCalledDuringMomentum = false;
    setRefreshing(true);

    if (tabSelected == 'Home') {
      setHome([]);
      setHomePagination({});
      setHomePage(0);
    }
    else if (tabSelected == 'Fresh') {
      setFresh([]);
      setFreshPagination({});
      setFreshPage(0);
    }
    else {
      setTrending([]);
      setTrendingPagination({});
      setTrendingPage(0);
    }
    // setLoadingMoreIndicator(true);
    // setLoadingMore(true);

    setTimeout(() => {
      _getPost();
    }, 200);

  };

  return (
    <ThemedDrawer
      tabSelected={tabSelected}
      open={open}
      setOpen={(value) => setOpen(value)}
      search={search}
      setSearch={(value) => setSearch(value)}
      onPressLogin={(value) => setModalNotLogin(value)}
      onPressTab={(value) => {
        setOpen(false);
        setTabSelected(value);
      }}
    >
      <Header
        tabList={tabList}
        tabSelected={tabSelected}
        setTabSelected={(value) => setTabSelected(value)}
        onPressMenu={() => setOpen((prevOpen) => !prevOpen)}
        onPressSearch={() => setSearch((prevOpen) => !prevOpen)}
        forwardRef={refPagerView}
      />

      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        scrollEnabled={false}
        ref={refPagerView}
      >
        <FlashList
          key="home"
          keyExtractor={keyExtractor}
          numColumns={1}
          data={home}
          renderItem={renderItem}
          ListFooterComponent={renderFlatListFooter}
          estimatedItemSize={width} // SINGLE ITEM POST HEIGHT
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          // ref={refFlashList}
          // onScroll={_handleScroll}
          // onMomentumScrollEnd={_handleSnap}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />

        <FlashList
          key="fresh"
          keyExtractor={keyExtractor}
          numColumns={1}
          data={fresh}
          renderItem={renderItem}
          ListFooterComponent={renderFlatListFooter}
          estimatedItemSize={width} // SINGLE ITEM POST HEIGHT
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          // ref={refFlashList}
          // onScroll={_handleScroll}
          // onMomentumScrollEnd={_handleSnap}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />

        <FlashList
          key="trending"
          keyExtractor={keyExtractor}
          numColumns={1}
          data={trending}
          renderItem={renderItem}
          ListFooterComponent={renderFlatListFooter}
          estimatedItemSize={width} // SINGLE ITEM POST HEIGHT
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          // ref={refFlashList}
          // onScroll={_handleScroll}
          // onMomentumScrollEnd={_handleSnap}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />
      </PagerView>

      <Modal
        isVisible={modalNotLogin}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalNotLogin(false)}
        onBackButtonPress={() => setModalNotLogin(false)}
        backdropOpacity={0.4}
        // BELOW ARE FOR ENHANCES PERFORMANCE
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalView}>
            <ImageLaheluIcon source={IconLaheluOnly} />

            <ThemedText type='modalTitle' style={styles.modalTitle}>
              Selamat datang!
            </ThemedText>
            <ThemedText type='modalText'>
              Buat meme, beri vote, dan berkomentar setelah login!
            </ThemedText>

            <ThemedButton
              name='signInGoogle'
              style={{ marginTop: 20 }}
              onPress={() => setModalNotLogin(!modalNotLogin)}
            >
              <Image
                style={styles.imageGoogle}
                source={GoogleLogo}
                contentFit='contain'
              />
              <ThemedText type='signInGoogle'>
                Sign in dengan Google
              </ThemedText>
            </ThemedButton>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedDrawer >
  );
}

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    paddingVertical: 16,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 4,
  },
  postHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  postHeaderAvatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 50,
  },
  postUsernameContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 7,
    overflow: 'hidden',
  },
  postTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  postTagContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  postTagSpace: {
    width: 16 * 2 // the value based on padding left & right in postTagContainer
  },
  postPillContainer: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: Colors.dark.borderGrey,
  },
  postPillSawer: {
    backgroundColor: Colors.dark.sawerBackground,
  },
  postSocialContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  postBoxContainer: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.dark.borderGrey,
  },
  postBoxContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postBoxSeparator: {
    width: 1,
    height: '100%',
    marginHorizontal: 12,
    backgroundColor: Colors.dark.borderGrey,
  },
  postBoxSpace: {
    flex: 1,
  },

  modalContainer: {
    margin: 0,
    backgroundColor: 'transparent',
  },
  modalView: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    elevation: 10,
    backgroundColor: Colors.dark.background,
  },
  modalTitle: {
    lineHeight: 50
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  imageGoogle: {
    width: 24,
    aspectRatio: 1,
    marginRight: 10
  }
});
