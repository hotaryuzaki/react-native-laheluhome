/* eslint-disable @typescript-eslint/no-require-imports */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dimensions, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import axios from 'axios';
import { Image } from 'expo-image';

import { ThemedDrawer } from '@/components/ThemedDrawer';
import { Header } from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Config } from '@/constants/Config';
import { Colors } from '@/constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function HomeScreen(...rest) {
  const [tabList, setTabList] = useState(['Home', 'Fresh', 'Trending']);
  const [tabSelected, setTabSelected] = useState('Home');
  const [data, setData] = useState([]);
  const [home, setHome] = useState([]);
  const [fresh, setFresh] = useState([]);
  const [trending, setTrending] = useState([]);
  const [feed, setFeed] = useState(1); // 0 = FRESH, 1 = HOME, 2 = TRENDING
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const ref = useRef(null); // ANIMATED FLATLIST REF

  // MOUNT FUNCTIONS CALL
  useEffect(() => {
    _getPost(); // GET API
  }, []); // SET EMPTY ARRAY SO USEEFFECT JUST CALL ONCE;

  const _getPost = async () => {
    try {
      if (data?.hasMore === false) throw ('finish');

      console.log(`${Config.apiUrl}/post/get-posts?feed=${feed}&page=${page}`);


      const response = await axios.get(
        `${Config.apiUrl}/post/get-posts?feed=${feed}&page=${page}`
      );

      if (page) {
        if (tabSelected === 'Home')
          setHome((prev) => {
            return { prev, ...response.data.postInfos };
          });
        else if (tabSelected === 'Fresh')
          setFresh((prev) => {
            return { prev, ...response.data.postInfos };
          });
        else if (tabSelected === 'Trending')
          setTrending((prev) => {
            return { prev, ...response.data.postInfos };
          });
      }
      else setHome(response.data.postInfos);

      setData(response.data);
    }
    catch (e) {
      // console.log(e);
    }
  };

  // useEffect(() => {
  //   console.log('useeffect home', home);

  // }, [home])



  const keyExtractor = useCallback((item: string, index: number) => `${index}-${item}`, []);

  const renderItem = ({ item, index, target, extraData }) => {
    console.log('renderrr', item);

    return (
      <ThemedView style={styles.postContainer}>
        <ThemedText>
          hahaha
        </ThemedText>

        {
          item.mediaType === 0 && (
            <Image
              style={styles.postMedia}
              source={item.media}
              transition={500}
            />
          )
        }
      </ThemedView>
    );

  };


  return (
    <ThemedDrawer
      open={open}
      setOpen={(value) => setOpen(value)}
      search={search}
      setSearch={(value) => setSearch(value)}
    >
      <Header
        tabList={tabList}
        tabSelected={tabSelected}
        setTabSelected={(value) => setTabSelected(value)}
        onPressMenu={() => setOpen((prevOpen) => !prevOpen)}
        onPressSearch={() => setSearch((prevOpen) => !prevOpen)}
        forwardRef={ref}
      />

      {
        tabSelected === 'Home' &&
        <FlashList
          keyExtractor={keyExtractor}
          numColumns={1}
          data={home}
          renderItem={renderItem}
          estimatedItemSize={height} // 2 is margin
          // onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          initialNumToRender={21}
          maxToRenderPerBatch={12}
        // ref={ref}
        />
      }

      {
        tabSelected === 'Fresh' &&
        <FlashList
          keyExtractor={keyExtractor}
          numColumns={1}
          data={fresh}
          renderItem={renderItem}
          estimatedItemSize={height} // 2 is margin
          // onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          initialNumToRender={21}
          maxToRenderPerBatch={12}
        // ref={ref}
        />
      }

      {
        tabSelected === 'Trending' &&
        <FlashList
          keyExtractor={keyExtractor}
          numColumns={1}
          data={trending}
          renderItem={renderItem}
          estimatedItemSize={height} // 2 is margin
          // onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum = false)
          }
          drawDistance={height * 5}
          initialNumToRender={21}
          maxToRenderPerBatch={12}
        // ref={ref}
        />
      }

    </ThemedDrawer >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  postContainer: {
    width: '100%',
    aspectRatio: 1,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 2,
    borderTopColor: Colors.dark.border,
    borderTopWidth: 2,
  },
  postMedia: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'

  }
});
