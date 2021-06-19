import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {THEME} from '../../utils/theme';
import hexToRGBA from '../../utils/helpers/HexToRGBA';
import {CarouselSlide} from '../../utils/interfaces';
import CarouselItem from './CarouselItem';

const {width} = Dimensions.get('window');
const VerticalCarousel = ({
                            initialData, leftItemIndex, rightItemIndex, itemHeight,
                            itemWidth, sliderHeight, onSnapToItemHandler, isLeftSide
                          }: {
  initialData: CarouselSlide[], leftItemIndex: number, rightItemIndex: number, itemHeight: number, itemWidth: number,
  sliderHeight: number, onSnapToItemHandler: (slideIndex: number, isLeftSide: boolean) => void, isLeftSide: boolean
}) => (
  <View style={[styles.container, isLeftSide && {alignItems: 'flex-end'}, !isLeftSide && {alignItems: 'flex-start'}]}>
    {
      leftItemIndex !== rightItemIndex &&
      <View
        style={[styles.itemInfo, {top: itemHeight * 0.75},
          isLeftSide && {left: 0}, !isLeftSide && {right: 0}]}
      >
        <Text
          style={styles.itemTitle}
          numberOfLines={2}
        >
          {isLeftSide ? initialData[leftItemIndex].name : initialData[rightItemIndex].name}
        </Text>
        <Text
          style={styles.itemSubTitle}
          numberOfLines={1}
        >
          {isLeftSide ? initialData[leftItemIndex].half_price : initialData[rightItemIndex].half_price} {'\u20BD'}
        </Text>
      </View>
    }
    <Carousel
      data={initialData}
      keyExtractor={(item: CarouselSlide) => item.id}
      renderItem={({item}: { item: CarouselSlide }) => CarouselItem(item, itemHeight, isLeftSide)}
      sliderHeight={sliderHeight}
      itemHeight={itemHeight}
      inactiveSlideScale={0.5}
      inactiveSlideOpacity={0.5}
      inactiveSlideShift={isLeftSide ? itemWidth / 2 : -itemWidth / 2}
      vertical={true}
      onSnapToItem={(slideIndex: number) => onSnapToItemHandler(slideIndex, isLeftSide)}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: (width / 2) - 16 - 2,
    position: 'relative'
  },
  itemInfo: {
    position: 'absolute',
    zIndex: 10
  },
  itemTitle: {
    color: THEME.TEXT_COLOR,
    fontWeight: 'bold'
  },
  itemSubTitle: {
    color: hexToRGBA(THEME.TEXT_COLOR, 0.5)
  }
})

export default VerticalCarousel;
