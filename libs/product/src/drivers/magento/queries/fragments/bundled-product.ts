import gql from 'graphql-tag';

export const magentoBundledProductFragment = gql`
  fragment magentoBundledProduct on BundleProduct {
		items {
			option_id
			position
			required
			sku
			title
			type
			options {
				can_change_quantity
				id
				is_default
				label
				position
				price_type
				price
				quantity
				product {
					id
					name
					sku
				}
			}
		}
  }
`;
