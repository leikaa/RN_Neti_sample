import React, {useState, useRef} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {THEME} from '../utils/theme';
import hexToRGBA from '../utils/helpers/HexToRGBA';
import getRandomNumber from '../utils/helpers/GetRandomNumber';
import {initialData} from '../entity/initialData';
import VerticalCarousel from '../components/MainScreen/VerticalCarousel';
import DiceIcon from '../components/Common/DiceIcon';

const {width, height} = Dimensions.get('window');
const sliderHeight = height - 80;
const itemHeight = sliderHeight / 3;
const itemWidth = itemHeight / 2;

const MainScreen = () => {
  const [leftItemIndex, setLeftItemIndex] = useState(0);
  const [rightItemIndex, setRightItemIndex] = useState(0);
  const leftCarouselItem = useRef(null);
  const rightCarouselItem = useRef(null);

  const onSnapToItemHandler = (slideIndex: number, isLeftSide: boolean) => {
    isLeftSide ? setLeftItemIndex(slideIndex) : setRightItemIndex(slideIndex);
  }

  const randomPressHandler = () => {
    const leftItemIndex = getRandomNumber(0, initialData.length - 1);
    const rightItemIndex = getRandomNumber(0, initialData.length - 1);
    if (leftItemIndex && leftCarouselItem && leftCarouselItem.current) {
      setLeftItemIndex(leftItemIndex);
      leftCarouselItem.current.snapToItem(leftItemIndex);
    }
    if (rightItemIndex && rightCarouselItem && rightCarouselItem.current) {
      setRightItemIndex(rightItemIndex);
      rightCarouselItem.current.snapToItem(rightItemIndex);
    }
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
        carouselRef={leftCarouselItem}
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
        carouselRef={rightCarouselItem}
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
      <TouchableOpacity
        style={styles.randomButtonWrapper}
        activeOpacity={0.7}
        onPress={randomPressHandler}
      >
        <DiceIcon color={THEME.MENU_COLOR}/>
      </TouchableOpacity>
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
    alignItems: 'center',
    zIndex: 10
  },
  originalItem: {
    position: 'absolute',
    top: itemHeight - 40,
    width: width,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  itemTitle: {
    color: THEME.TEXT_COLOR,
    fontWeight: 'bold'
  },
  itemSubTitle: {
    color: hexToRGBA(THEME.TEXT_COLOR, 0.5)
  },
  randomButtonWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: hexToRGBA(THEME.MAIN_COLOR, 0.8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    bottom: 30,
    right: 30,
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowColor: THEME.TEXT_COLOR,
    shadowRadius: 6,
    elevation: 12,
    zIndex: 100
  }
})

export default MainScreen;
