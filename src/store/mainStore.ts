import {makeObservable, observable} from 'mobx';

import {initialData} from '../entity/initialData';
import {CarouselSlide} from '../utils/interfaces';

export class MainStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  pizzas: CarouselSlide[] = initialData;
}

export default new MainStore();
