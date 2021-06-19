import React, {useState, useRef} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';

import {THEME} from '../utils/theme';
import hexToRGBA from '../utils/helpers/HexToRGBA';
import getRandomNumber from '../utils/helpers/GetRandomNumber';
import VerticalCarousel from '../components/MainScreen/VerticalCarousel';
import DiceIcon from '../components/Common/DiceIcon';

import {MainStore} from '../store/mainStore';

const {width, height} = Dimensions.get('window');
const sliderHeight = height - 80;
const itemHeight = sliderHeight / 3;
const itemWidth = itemHeight / 2;

const MainScreen = ({mainStore}: { mainStore: MainStore }) => {
  const [leftItemIndex, setLeftItemIndex] = useState(0);
  const [rightItemIndex, setRightItemIndex] = useState(0);
  const leftCarouselItem = useRef(null);
  const rightCarouselItem = useRef(null);

  const onSnapToItemHandler = (slideIndex: number, isLeftSide: boolean) => {
    isLeftSide ? setLeftItemIndex(slideIndex) : setRightItemIndex(slideIndex);
  }

  const randomPressHandler = () => {
    const leftItemIndex = getRandomNumber(0, mainStore.pizzas.length - 1);
    const rightItemIndex = getRandomNumber(0, mainStore.pizzas.length - 1);
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
      <View style={styles.contentWrapper}>
        <VerticalCarousel
          initialData={mainStore.pizzas}
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
          initialData={mainStore.pizzas}
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
            mainStore.pizzas[leftItemIndex].half_price + mainStore.pizzas[rightItemIndex].half_price :
            mainStore.pizzas[leftItemIndex].full_price} {'\u20BD'}
          </Text>
        </View>
        {
          leftItemIndex === rightItemIndex &&
          <View style={styles.originalItem}>
            <Text style={styles.itemTitle} numberOfLines={1}>{mainStore.pizzas[leftItemIndex].name}</Text>
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
      </View>
    </SafeAreaView>
  )
}

MainScreen.navigationOptions = () => ({
  title: 'Меню'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 16
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
      height: 2
    },
    shadowColor: hexToRGBA(THEME.TEXT_COLOR, 0.4),
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 12,
    zIndex: 100
  }
});

export default inject('mainStore')(observer(MainScreen));
