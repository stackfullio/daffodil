import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { CartTestingModule } from '../testing/cart-testing.module';
import { DaffodilConfigService } from '../../config/daffodil-config.service';
import { DaffodilConfigFactory } from '../../config/testing/daffodil-config.factory';
import { ProductFactory } from '../../product/testing/factories/product.factory';

describe('Core | Cart | CartService', () => {
  let cartService;

  let http: HttpClient;
  let daffodilConfigService: DaffodilConfigService;
  let daffodilConfigFactory: DaffodilConfigFactory;
  let productFactory: ProductFactory;

  beforeEach(() => {
    daffodilConfigFactory = new DaffodilConfigFactory();
    daffodilConfigService = new DaffodilConfigService(daffodilConfigFactory.create());
    productFactory = new ProductFactory();

    TestBed.configureTestingModule({
      imports: [
        CartTestingModule
      ],
      providers: [
        CartService,
        {provide: DaffodilConfigService, useValue: daffodilConfigService}
      ]
    });
    http = TestBed.get(HttpClient);
    cartService = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  describe('get', () => {
      
    it('should send a get request', () => {
      spyOn(http, 'get');
      cartService.get();
      
      expect(http.get).toHaveBeenCalled();
    });
  });

  describe('addToCart', () => {

    let product;
    let returnedValue;
    
    beforeEach(() => {
      product = productFactory.create();
      returnedValue = 'returnedValue';

      spyOn(http, 'post').and.returnValue(returnedValue);;
    });

    it('should send a post request', () => {
      cartService.addToCart(product);
      expect(http.post).toHaveBeenCalledWith(cartService.url, product);
    });

    it('returns the value from post request', () => {
      expect(cartService.addToCart(product)).toEqual(returnedValue);
    });
  });
});