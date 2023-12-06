export const FETCH_ALL_COLLECTIONS = `query {
  collections(first: 100) {
    edges {
      node {
        title
        handle
      }
    }
  }
}`;

export const FETCH_PRODUCT = `query getProductByHandle($handle: String, $imgCount: Int) {
  product(handle: $handle) {
    options(first: 10) {
      id
      name
      values
    }
    variants(first: 10) {
      edges {
        node {
          id
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    images(first: $imgCount) {
      edges {
        node {
          originalSrc
          altText
        }
      }
    }
    title
    description
    handle
  }
}
`;

export const FETCH_ALL_PRODUCTS = `query getProducts(
    $imgCount: Int,
    $first: Int,
    $last: Int,
    $query: String,
    $after: String,
    $before: String
  ) {
    products(
      first: $first
      last: $last
      query: $query
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          options(first: 10) {
            id
            name
            values
          }
          variants(first: 10) {
            edges {
              node {
                id
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: $imgCount) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          title
          handle
        }
      }
    }
  }
  `;

export const GET_CART = `query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
  `;

export const CREATE_CART = `mutation cartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
  `;

export const CREATE_CHECKOUT = `mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      webUrl
    }
  }
}
`;

const CART_DATA = `cart {
  id
  lines(first: 10) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
                title
              }
            }
          }
        }}
  }
}`;

export const ADD_LINE_ITEM = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
   ${CART_DATA}
  }
}
`;

export const REMOVE_LINE_ITEM = `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
   ${CART_DATA}
  }
}
`;

export const UPDATE_LINE_ITEM = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
   ${CART_DATA}
  }
}
`;
