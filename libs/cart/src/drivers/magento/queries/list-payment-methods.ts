import gql from 'graphql-tag';

import { availablePaymentMethodFragment } from './fragments/public_api';

export const listPaymentMethods = gql`
  query ListPaymentMethods($cartId: String!) {
    cart(cart_id: $cartId) {
      available_payment_methods {
        ...availablePaymentMethod
      }
    }
  }
  ${availablePaymentMethodFragment}
`;
