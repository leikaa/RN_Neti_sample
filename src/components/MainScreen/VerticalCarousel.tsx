import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

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
          numberOfLines={1}
        >
          {isLeftSide ? initialData[leftItemIndex].name : initialData[rightItemIndex].name}
        </Text>
        <Text
          style={[styles.itemSubTitle, isLeftSide && {alignSelf: 'flex-start'}, !isLeftSide && {alignSelf: 'flex-end'}]}
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
    <Pagination
      dotsLength={initialData.length}
      activeDotIndex={isLeftSide ? leftItemIndex : rightItemIndex}
      containerStyle={[styles.dotContainer, {top: itemHeight},
        isLeftSide && {left: -10}, !isLeftSide && {right: -10}]}
      dotStyle={styles.dotStyle}
      inactiveDotStyle={styles.dotInactive}
      inactiveDotOpacity={0.3}
      inactiveDotScale={1}
      vertical={true}
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
  },
  dotContainer: {
    marginBottom: 20,
    paddingTop: 15,
    position: 'absolute'
  },
  dotStyle: {
    width: 6,
    height: 12,
    marginTop: 5,
    borderRadius: 3,
    backgroundColor: THEME.MAIN_COLOR
  },
  dotInactive: {
    backgroundColor: THEME.MAIN_COLOR
  }
})

export default VerticalCarousel;
