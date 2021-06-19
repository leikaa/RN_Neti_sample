import React, {useState} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet} from 'react-native';

import {THEME} from '../utils/theme';
import hexToRGBA from '../utils/helpers/HexToRGBA';
import {initialData} from '../entity/initialData';
import VerticalCarousel from '../components/MainScreen/VerticalCarousel';

const {width, height} = Dimensions.get('window');
const sliderHeight = height - 80;
const itemHeight = sliderHeight / 3;
const itemWidth = itemHeight / 2;

const MainScreen = () => {
  const [leftItemIndex, setLeftItemIndex] = useState(0);
  const [rightItemIndex, setRightItemIndex] = useState(0);

  const onSnapToItemHandler = (slideIndex: number, isLeftSide: boolean) => {
    isLeftSide ? setLeftItemIndex(slideIndex) : setRightItemIndex(slideIndex);
  }

  return (
    <SafeAreaView style={styles.container}>
      <VerticalCarousel
        initialData={initialData}
        leftItemIndex={leftItemIndex}
        rightItemIndex={rightItemIndex}
        itemHeight={itemHeight}
        itemWidth={itemWidth}
        sliderHeight={sliderHeight}
        onSnapToItemHandler={onSnapToItemHandler}
        isLeftSide={true}
      />
      <VerticalCarousel
        initialData={initialData}
        leftItemIndex={leftItemIndex}
        rightItemIndex={rightItemIndex}
        itemHeight={itemHeight}
        itemWidth={itemWidth}
        sliderHeight={sliderHeight}
        onSnapToItemHandler={onSnapToItemHandler}
        isLeftSide={false}
      />
      <View style={styles.priceSection}>
        <Text
          style={styles.itemTitle}
          numberOfLines={1}
        >
          Цена {leftItemIndex !== rightItemIndex ?
          initialData[leftItemIndex].half_price + initialData[rightItemIndex].half_price :
          initialData[leftItemIndex].full_price} {'\u20BD'}
        </Text>
      </View>
      {
        leftItemIndex === rightItemIndex &&
        <View style={styles.originalItem}>
          <Text style={styles.itemTitle} numberOfLines={1}>{initialData[leftItemIndex].name}</Text>
          <Text style={styles.itemSubTitle} numberOfLines={1}>Оригинальный рецепт</Text>
        </View>
      }
    </SafeAreaView>
  )
}

MainScreen.navigationOptions = () => ({
  title: 'Меню'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    paddingHorizontal: 16,
    position: 'relative',
    backgroundColor: THEME.BACKGROUND_COLOR
  },
  priceSection: {
    position: 'absolute',
    top: itemHeight * 2 + 6,
    width: width,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  originalItem: {
    position: 'absolute',
    top: itemHeight - 40,
    width: width,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTitle: {
    color: THEME.TEXT_COLOR,
    fontWeight: 'bold'
  },
  itemSubTitle: {
    color: hexToRGBA(THEME.TEXT_COLOR, 0.5)
  }
})

export default MainScreen;
