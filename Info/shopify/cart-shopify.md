Create and update a cart with the Storefront API
A cart contains the merchandise that a customer intends to purchase, and the estimated cost associated with the cart. You can use the Storefront API to interact with a cart during a customer's session.

This guide shows how to create a cart and retrieve it, update cart line items and customer information, and retrieve a checkout URL.

Cart object relationships
Before you start building a cart, we recommend familiarizing yourself with the following API objects and their relationships:

Object	Description
Cart	An object that contains the merchandise that a customer intends to purchase.
CartBuyerIdentity	Identifies the customer that is interacting with the cart. It includes a customer access token that associates the customer with the cart, and a set of preferences that can be used to prefill a checkout session.
Cost	The estimated costs that the customer will pay at checkout. The costs are subject to change and changes display at checkout. Merchants can configure the prices of products on a per country basis in their Shopify admin. The prices that display on a storefront are determined in the following ways:
Checkout pricing: The final sale price. CartBuyerIdentity is used to determine international pricing and should match the customer's shipping address.
Cart pricing: The estimated final sale price. CartCost uses CartBuyerIdentity to determine international pricing.
Product queries: The price that displays on a product page. Products use the @inContext directive to determine international pricing.
Attribute	An array of custom information for a cart line. Attributes are returned as key-value pairs.
CartLine	A list of line item objects, each containing information about an item in the cart.
Merchandise	A product variant. It represents one version of a product with several options.


Cart ID
The cart ID consists of a token and a secret key parameter in the form of <token>?key=<secret>. When you work with any Cart API, you must always provide the full ID.

Example: gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890

Caution
Shopify may change the format and length of cart tokens at any time. Apps must be built to handle cart tokens of any format.

The key serves as a verification mechanism for the cart builder, ensuring the protection of the buyer's private data. If you do not include the secret key during a query, the buyer's private details (such as email or address) will be removed from the cart response. Additionally, if you attempt to modify the cart through a mutation without a key, the mutation will fail with an error message indicating the cart does not exist.

Caution
Never expose the secret part of the ID. Treat it like a password—don't include it in shareable links, public pages, or any client-side code.

Anchor to Step 1: Create a cart and add a line itemStep 1: Create a cart and add a line item
You can use the cartCreate mutation to create a new cart and add a line item to the cart. In the input, include the line item quantity (quantity) and the product variant ID (merchandiseId), and specify any attributes (attributes) associated with the cart.

If your storefront has context about the buyer that's interacting with the cart (buyerIdentity), then you can also define delivery address preferences (deliveryAddressPreferences), or preferred delivery method (deliveryMethod) in the mutation's input. Preferences are fields that Shopify can use to accelerate and personalize the checkout process, and best optimize conversions.

Note
To use pick-up points as a delivery method preference, a buyerIdentity.countryCode is required to ensure the buyer's country matches with the pick-up point country

In the response, request the added line item's ID, merchandise, attributes, address, and other preferences to verify that all information was added correctly. You can also request information about the costs associated with the cart:

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL mutation

mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "gid://shopify/ProductVariant/1"
        }
      ],
      # The information about the buyer that's interacting with the cart.
      buyerIdentity: {
        email: "example@example.com",
        countryCode: CA,
        # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
        deliveryAddressPreferences: {
          # One-time use address isn't saved to the customer account after checkout
          oneTimeUse: false,
          deliveryAddress: {
            address1: "150 Elgin Street",
            address2: "8th Floor",
            city: "Ottawa",
            province: "Ontario",
            country: "CA",
            zip: "K2P 1L4"
          },
        },
        preferences: {
          delivery: {
            deliveryMethod: PICK_UP
          }
        },
      }
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute"
      }
JSON response

{
  "data": {
    "cartCreate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "createdAt": "2021-06-11T14:46:44Z",
        "updatedAt": "2021-06-11T14:46:44Z",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/1",
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/1"
                }
              }
            }
          ]
        },
        "buyerIdentity": {
          "deliveryAddressPreferences": [
            {
              "__typename": "MailingAddress"
            }
          ],
          "preferences": {
            "delivery": {
              "deliveryMethod": [
                "PICK_UP"
              ]
            }
          }
        },
        "attributes": [
          {
            "key": "cart_attribute",
Anchor to Step 2: Retrieve a cartStep 2: Retrieve a cart
You can use the cart query to retrieve a cart stored on Shopify. In the query, supply the cart ID as your input.

The following example shows how to retrieve a cart by its ID:

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL query

query {
  cart(
    id: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
  ) {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
JSON response

{
              "attributes": [
                {
                  "key": "engraving",
                  "value": "This is an engraving"
                }
              ]
            }
          }
        ]
      },
      "attributes": [
        {
          "key": "cart_attribute",
          "value": "This is a cart attribute"
        }
      ],
      "cost": {
        "total": {
          "amount": 67.07,
          "currencyCode": "CAD"
        },
        "subtotal": {
          "amount": 59.99,
          "currencyCode": "CAD"
        },
        "totalTax": {
          "amount": 7.02,
          "currencyCode": "CAD"
        },
        "totalDuty": {
          "amount": 0.00,
          "currencyCode": "CAD"
        }
      },
      "buyerIdentity": {
        "email": "example@example.com",
        "phone": null,
        "customer": null,
        "countryCode": "CA",
        "deliveryAddressPreferences": [
          {
            "address1": "150 Elgin Street",
            "address2": "8th Floor",
            "city": "Ottawa",
            "provinceCode": "ON",
            "countryCodeV2": "CA",
            "zip": "K2P 1L4"
          }
        ],
        "preferences": {
          "delivery": {
            "deliveryMethod": [
              "PICK_UP"
            ]
          }
        }
      }
    }
  }
}
Anchor to Step 3: Increase an item's quantityStep 3: Increase an item's quantity
You can use the cartLinesUpdate mutation to add another product variant of the same type to the cart.

In the mutation's input, include the cart ID, cart line ID, and the new quantity value that you want to set. In the response, request the ID and quantity of the line items to verify that it was updated correctly.

The following example shows how to increase a line item's quantity in a cart to three:

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL mutation

mutation {
  cartLinesUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    lines: {
      id: "gid://shopify/CartLine/1"
      quantity: 3
    }
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
JSON response

{
  "data": {
    "cartLinesUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/1",
                "quantity": 3,
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/1"
                }
              }
            }
          ]
        },
        "cost": {
          "total": {
            "amount": 201.03,
            "currencyCode": "CAD"
          },
          "subtotal": {
            "amount": 179.97,
            "currencyCode": "CAD"
          },
          "totalTax": {
            "amount": 21.06,
            "currencyCode": "CAD"
          },
          "totalDuty": {
            "amount": 0.00,
            "currencyCode": "CAD"
          }
        }
Anchor to Step 4: Set metafields on a cartStep 4: Set metafields on a cart
Metafields are a flexible way for your app to add and store additional information about a cart. You can create metafields to extend the cart schema with custom values and logic at checkout. For example, you might want to attach custom structured metadata on a cart, and read it from a checkout extension to deliver a customized end-to-end buyer experience.

You can use the cartMetafieldsSet mutation to create and update metafields on a cart. In the mutation's input, supply the cart ID in the ownerId field, and define the parts of the metafield.

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL mutation
mutation {
  cartMetafieldsSet(
    metafields:[
      {
        ownerId: "gid://shopify/Cart/1",
        key: "public.materials",
        type: "multi_line_text_field",
        value: "95% Cotton\n5% Spandex"
      },
      {
        ownerId: "gid://shopify/Cart/1",
        key: "public.manufactured",
        type: "single_line_text_field",
        value: "Made in Canada"
      }
  ]) {
    metafields {
      namespace
      key
      value
      type
    }
    userErrors {
      code
      field
      message
    }
  }
}
JSON response

{
  "data": {
    "cartMetafieldsSet": {
      "metafields": [
        {
          "namespace": "public",
          "key": "materials",
          "type": "multi_line_text_field",
          "value": "95% Cotton\n5% Spandex"
        },
        {
          "namespace": "public",
          "key": "manufactured",
          "type": "single_line_text_field",
          "value": "Made in Canada"
        }
      ],
      "userErrors": []
    }
  }
}
Anchor to Step 5: Update customer information and customer preferences for guest checkout journeysStep 5: Update customer information and customer preferences for guest checkout journeys
You can use the cartBuyerIdentityUpdate mutation to associate customer information and their checkout preferences with the cart, such as a customer's email, phone number, country, preferred delivery method, and pickup location.

As of the 2025-01 release, buyerIdentity.deliveryAddressPreferences is deprecated. Cart delivery addresses can be managed with three new mutations:

cartDeliveryAddressesAdd
cartDeliveryAddressesUpdate
cartDeliveryAddressesRemove
In the mutation's input, supply the cart ID and the buyerIdentity attributes related to the customer (for example, email, phone, and countryCode), along with any preferences for prefilling checkout like preferred delivery method or pickup location. In the response, request the same information to verify it was updated correctly.

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL mutation
mutation {
  cartBuyerIdentityUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    buyerIdentity: {
      email: "example@example.com"
      phone: "800-555-0100"
      countryCode: CA,
      preferences: {
        delivery: {
          deliveryMethod: PICK_UP,
          pickupHandle: "93893525526"
        }
      }
    }
  ) {
    cart {
      id
      buyerIdentity {
        email
        phone
        countryCode
        preferences {
          delivery {
            deliveryMethod
            pickupHandle
          }
        }
      }
    }
  }
}

JSON response

{
  "data": {
    "cartBuyerIdentityUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "buyerIdentity": {
          "email": "example@example.com",
          "phone": "800-555-0100",
          "countryCode": "CA",
          "preferences": {
            "delivery": {
              "deliveryMethod": [
                "PICK_UP"
              ],
              "pickupHandle": "93893525526"
            }
          }
        }
      }
    }
  }
}
 Step 6: Authenticate customer for logged-in checkoutsStep 6: Authenticate customer for logged-in checkouts
You can authenticate the customer by setting a valid customerAccessToken in the cartBuyerIdentityUpdate mutation or during cart creation. If you append the customerAccessToken to the cart, then the buyer will be logged in when they're redirected to checkout.

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL mutation

mutation {
  cartBuyerIdentityUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    buyerIdentity: {
      customerAccessToken: "1b024bde52fcce3c363d2e67f7a13958"
    }
  ) {
    cart {
      id
      buyerIdentity {
        customerAccessToken
      }
    }
  }
}
JSON response
{
  "data": {
    "cartBuyerIdentityUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "buyerIdentity": {
          "customerAccessToken": "1b024bde52fcce3c363d2e67f7a13958"
        }
      }
    }
  }
}
 Step 7: Retrieve a checkout URLStep 7: Retrieve a checkout URL
When the buyer is ready to complete checkout, you can query the Cart object for the checkoutUrl by supplying the cart's ID as your input. The response includes a URL that redirects customers through Shopify's web checkout.

Note
When the customer access token is set on the cart, the obtained checkoutUrl allows the authenticated buyer to navigate to a logged-in checkout experience. For security reasons, the checkoutUrl should be requested when the buyer is ready to navigate to checkout and can be re-requested if it is stale.

To preserve the buyer's logged-in checkout experience, you must include the Shopify-Storefront-Buyer-IP header in your Storefront API call when making server side requests. For more information, refer to Making server-side requests.

POST https://{shop}.myshopify.com/api/{api_version}/graphql.json
GraphQL query
Copy
1
2
3
4
5
query checkoutURL {
  cart(id: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890") {
    checkoutUrl
  }
}
JSON response

{
  "data": {
    "cart": {
      "checkoutUrl": "https:\/\/exam.myshopify.com\/cart\/c\/29567c413f68cf5e8c1cb623954f3a28"
    }
  }
}


Cart warnings
Cart warnings inform clients about automatic changes that a GraphQL mutation has made to a cart. Unlike a user error, which indicates a mutation failure, a warning confirms the mutation's success and the automatic changes it has made to the cart. All successful cart mutations can generate an array of CartWarning objects. Each warning contains a discrete code, localized message and the ID of the targeted object in the cart. Clients can choose to address an automatic change, but action isn't required.

For example, if an item that was previously added to the cart becomes out of stock during the addition of another product, we'll issue a warning indicating MERCHANDISE_OUT_OF_STOCK with the ID of the cart line for that out of stock item.

An example call to cartLinesAdd is shown below.

mutation CartLinesAdd{
  cartLinesAdd(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK?key=766f90254525fd796c615126ff31ccab",
    lines: [
      {
        merchandiseId: "gid://shopify/ProductVariant/2",
        quantity: 2
      }
    ]
  ) {
    cart {
      id
      lines(first: 5) {
        edges {
          node {
            id
            merchandise {
              ...  on ProductVariant {
                id
                quantity
              }
            }
          }
        }
      }
    }
    warnings {
      code
      target
      message
    }
    userErrors {
      code
      message
      field
    }
  }
}

Response:

{
  "data": {
    "cartLinesAdd": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK?key=766f90254525fd796c615126ff31ccab",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/8ecc247c-0578-490d-b522-a12412dfc628?cart=Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK",
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/2",
                  "quantity": "2"
                }
              }
            },
            {
              "node": {
                "id": "gid://shopify/CartLine/1a44a5cb-82dc-4eae-a99e-548b6f9146c2?cart=Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK",
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/3",
                  "quantity": "0"
                }
              }
            }
          ]
        }
      },
      "warnings": [
        {
          "code": "MERCHANDISE_OUT_OF_STOCK",
          "target": "gid://shopify/CartLine/1a44a5cb-82dc-4eae-a99e-548b6f9146c2?cart=Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK",
          "message": "The product 'Merchandise Title' is already sold out."
        }
      ],
      "userErrors": []
    }
  }
}

Clients can take the target from a warning and construct a call to CartLinesRemove to remove an out of stock item.

mutation CartLinesRemove{
  cartLinesRemove(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK?key=766f90254525fd796c615126ff31ccab",
    lineIds: [
      "gid://shopify/CartLine/1a44a5cb-82dc-4eae-a99e-548b6f9146c2?cart=Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK"
    ]
  ) {
    cart {
      id
      lines(first: 5) {
        edges {
          node {
            id
            merchandise {
              ...  on ProductVariant {
                id
                quantity
              }
            }
          }
        }
      }
    }
    warnings {
      code
      target
      message
    }
    userErrors {
      code
      message
      field
    }
  }
}


Response:

{
  "data": {
    "cartLinesRemove": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK?key=766f90254525fd796c615126ff31ccab",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/8ecc247c-0578-490d-b522-a12412dfc628?cart=Z2NwLXVzLWVhc3QxOjAxSjZGSFIwMjU1WUZITVRBOUpRQTQ3VjRK",
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/2",
                  "quantity": 2
                }
              }
            }
          ]
        }
      },
      "warnings": [],
      "userErrors": []
    }
  }
}


Create a cart and a subscription line item
You can use the cartCreate mutation to create a cart that contains the purchase of a variant with a selling plan. In your input to the mutation, provide the line item quantity, variant ID, and selling plan ID.

In the following example, the response returns each cart line with the quantity, the variant (merchandise) purchased, and the selling plan that's associated with the variant. The resulting prices for the variant when it's purchased with the selling plan are also returned.



mutation cartCreateMutation($cartInput: CartInput) {
  cartCreate(input: $cartInput) {
    cart {
      id
      lines(first: 250) {
        edges {
          node {
            quantity
            merchandise {
              __typename
              ... on ProductVariant {
                id
              }
            }
            sellingPlanAllocation {
              sellingPlan {
                id
                name
              }
              priceAdjustments {
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                perDeliveryPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
}

Variables:
{
  "cartInput": {
    "lines": [
      {
        "quantity": 1,
        "merchandiseId": "gid://shopify/ProductVariant/3",
        "sellingPlanId": "gid://shopify/SellingPlan/2"
      }
    ]
  }
}

JSON Response:
{
  "data": {
    "cartCreate": {
      "cart": {
        "id": "8a9des87d7f8s76a7s6d66f7s6",
        "lines": [
          {
            "quantity": 1,
            "merchandise": {
              "__typename": "ProductVariant",
              "id": "gid://shopify/ProductVariant/3"
            },
            "sellingPlanAllocation": {
              "sellingPlan": {
                "id": "gid://shopify/SellingPlan/2",
                "name": "12 weeks of prepaid granola, delivered weekly"
              },
              "priceAdjustments": [
                {
                  "price": {
                    "amount": "79.92"
                  },
                  "compareAtPrice": {
                    "amount": "120.0"
                  },
                  "perDeliveryPrice": {
                    "amount": "6.66"
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}

