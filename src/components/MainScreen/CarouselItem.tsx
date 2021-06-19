import React from 'react';
import {Image, View} from 'react-native';

import {CarouselSlide} from '../../utils/interfaces';

const CarouselItem = (item: CarouselSlide, slideHeight: number, isLeftSide: boolean = false) => (
  <View style={{height: slideHeight, width: slideHeight / 2}}>
    <Image
      source={isLeftSide ? item.img_left : item.img_right}
      style={{height: slideHeight, width: slideHeight / 2}}
      resizeMode={'contain'}
    />
  </View>
)

export default CarouselItem;
