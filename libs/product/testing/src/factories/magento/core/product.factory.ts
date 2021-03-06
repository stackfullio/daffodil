import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import {
  DaffModelFactory,
} from '@daffodil/core/testing';
import { MagentoProduct, MagentoProductTypeEnum } from '@daffodil/product';

export class MockMagentoCoreProduct implements MagentoProduct {
	__typename = MagentoProductTypeEnum.SimpleProduct;
  id = faker.random.number(1000);
  url_key = faker.random.alphaNumeric(16);
  name = faker.random.word();
  sku = faker.random.alphaNumeric(16);
  image = {
    __typename: 'ProductImage',
    label: faker.random.words(3),
    url: faker.image.imageUrl()
  };
  thumbnail = {
    __typename: 'ProductImage',
    label: faker.random.words(3),
    url: faker.image.imageUrl()
  };
  description = {
    __typename: 'ComplexTextValue',
		html: faker.random.words(5)
	}
  price_range = {
    __typename: 'PriceRange',
		maximum_price: {
      __typename: 'ProductPrice',
			regular_price: {
        __typename: 'Money',
				value: faker.random.number(1000),
				currency: null
			}
		}
  };
  short_description = {
    __typename: 'ComplexTextValue',
		html: faker.random.words(3)
	}
  media_gallery_entries = [];
}

@Injectable({
  providedIn: 'root'
})
export class MagentoCoreProductFactory extends DaffModelFactory<MagentoProduct> {

  constructor(){
    super(MockMagentoCoreProduct);
  }
}
