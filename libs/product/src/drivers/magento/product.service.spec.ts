import { TestBed } from '@angular/core/testing';
import {
	ApolloTestingModule,
	ApolloTestingController,
	APOLLO_TESTING_CACHE,
} from 'apollo-angular/testing';
import {
	InMemoryCache,
	IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { addTypenameToDocument } from 'apollo-utilities';

import { GetProductQuery, MagentoSimpleProduct, MagentoBundledProduct, DaffProductTypeEnum } from '@daffodil/product';
import {
	MagentoSimpleProductFactory,
	MagentoBundledProductFactory
} from '@daffodil/product/testing';

import { DaffMagentoProductService } from './product.service';
import { schema } from '@daffodil/driver/magento';

describe('Product | Magento | ProductService', () => {
	let service: DaffMagentoProductService;
	let controller: ApolloTestingController;
  let magentoSimpleProductFactory: MagentoSimpleProductFactory;
  let magentoBundledProductFactory: MagentoBundledProductFactory;
  let stubSimpleProduct: MagentoSimpleProduct;
  let stubBundledProduct: MagentoBundledProduct;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApolloTestingModule],
			providers: [
				DaffMagentoProductService,
				{
					provide: APOLLO_TESTING_CACHE,
					useValue: new InMemoryCache({
						addTypename: true,
						fragmentMatcher: new IntrospectionFragmentMatcher({
							introspectionQueryResultData: schema,
						}),
					}),
				},
			],
		});

		service = TestBed.get(DaffMagentoProductService);
		controller = TestBed.get(ApolloTestingController);
    magentoSimpleProductFactory = TestBed.get(MagentoSimpleProductFactory);
    magentoBundledProductFactory = TestBed.get(MagentoBundledProductFactory);
    
    stubSimpleProduct = magentoSimpleProductFactory.create();
    stubBundledProduct = magentoBundledProductFactory.create();
	});

	afterEach(() => {
		controller.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('get | getting a single product', () => {
		it('should return a DaffProduct', done => {
			service.get('TESTING_SKU').subscribe(r => {
				expect(r.id).toEqual(stubSimpleProduct.sku);
				expect(r.name).toBeDefined();
				done();
			});

			const op = controller.expectOne(addTypenameToDocument(GetProductQuery));

			op.flush({
				data: {
					storeConfig: {
						__typename: 'StoreConfig',
						secure_base_media_url: 'http://testwebsite.com',
					},
					products: {
						__typename: 'Products',
						items: [stubSimpleProduct],
					},
				},
			});
		});

		describe('handling different product types', () => {
			it('should be able to retrieve a DaffProduct for a simple', done => {
				service.get('TESTING_SKU').subscribe(r => {
					expect(r.id).toEqual(stubSimpleProduct.sku);
          expect(r.name).toBeDefined();
          done();
				});

				const op = controller.expectOne(addTypenameToDocument(GetProductQuery));

				op.flush({
					data: {
						storeConfig: {
							__typename: 'StoreConfig',
							secure_base_media_url: 'http://testwebsite.com',
						},
						products: {
							__typename: 'Products',
							items: [stubSimpleProduct],
						},
					},
				});
			});
      
      it('should be able to retrieve a DaffCompositeProduct', done => {
        service.get('TESTING_SKU').subscribe(r => {
					expect(r.id).toEqual(stubBundledProduct.sku);
					expect(r.type).toEqual(DaffProductTypeEnum.Composite);
          expect(r.name).toBeDefined();
          console.log(r);
          done();
        });

        const op = controller.expectOne(addTypenameToDocument(GetProductQuery));

        op.flush({
          data: {
            storeConfig: {
              __typename: 'StoreConfig',
              secure_base_media_url: 'http://testwebsite.com',
            },
            products: {
              __typename: 'Products',
              items: [stubBundledProduct],
            },
          },
        });
      });
		});

	});
});
