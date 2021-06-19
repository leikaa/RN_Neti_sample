import {ImageSourcePropType} from 'react-native';

export interface CarouselSlide {
  id: string;
  name: string;
  img_right: ImageSourcePropType;
  img_left: ImageSourcePropType;
  half_price: number;
  full_price: number;
}
