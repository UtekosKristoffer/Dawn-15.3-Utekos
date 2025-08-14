import * as Types from "@/Lib/Schemas/schema";

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type CompleteCartFragment = {
  __typename: "Cart";
  id: string;
  createdAt: any;
  updatedAt: any;
  checkoutUrl: any;
  totalQuantity: number;
  discountCodes: Array<{
    __typename: "CartDiscountCode";
    applicable: boolean;
    code: string;
  }>;
  cost: {
    __typename: "CartCost";
    totalAmount: {
      __typename: "MoneyV2";
      amount: any;
      currencyCode: Types.CurrencyCode;
    };
    subtotalAmount: {
      __typename: "MoneyV2";
      amount: any;
      currencyCode: Types.CurrencyCode;
    };
    totalTaxAmount: {
      __typename: "MoneyV2";
      amount: any;
      currencyCode: Types.CurrencyCode;
    } | null;
    totalDutyAmount: {
      __typename: "MoneyV2";
      amount: any;
      currencyCode: Types.CurrencyCode;
    } | null;
  };
  buyerIdentity: {
    __typename: "CartBuyerIdentity";
    customer: {
      __typename: "Customer";
      displayName: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phone: string | null;
      defaultAddress: {
        __typename: "MailingAddress";
        address1: string | null;
        address2: string | null;
        city: string | null;
      } | null;
    } | null;
  };
  attributes: Array<{
    __typename: "Attribute";
    key: string;
    value: string | null;
  }>;
  lines: {
    __typename: "BaseCartLineConnection";
    edges: Array<{
      __typename: "BaseCartLineEdge";
      node:
        | {
            __typename: "CartLine";
            id: string;
            quantity: number;
            merchandise: {
              __typename: "ProductVariant";
              id: string;
              title: string;
              price: {
                __typename: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              };
              compareAtPrice: {
                __typename: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              } | null;
              selectedOptions: Array<{
                __typename: "SelectedOption";
                name: string;
                value: string;
              }>;
              product: {
                __typename: "Product";
                title: string;
                handle: string;
                featuredImage: {
                  __typename: "Image";
                  url: any;
                  altText: string | null;
                } | null;
              };
            };
          }
        | {
            __typename: "ComponentizableCartLine";
            id: string;
            quantity: number;
            merchandise: {
              __typename: "ProductVariant";
              id: string;
              title: string;
              price: {
                __typename: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              };
              compareAtPrice: {
                __typename: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              } | null;
              selectedOptions: Array<{
                __typename: "SelectedOption";
                name: string;
                value: string;
              }>;
              product: {
                __typename: "Product";
                title: string;
                handle: string;
                featuredImage: {
                  __typename: "Image";
                  url: any;
                  altText: string | null;
                } | null;
              };
            };
          };
    }>;
  };
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * A string containing a hexadecimal representation of a color.
   *
   * For example, "#6A8D48".
   *
   */
  Color: { input: any; output: any };
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   *
   */
  DateTime: { input: any; output: any };
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   *
   */
  Decimal: { input: any; output: any };
  /**
   * A string containing HTML code. Refer to the [HTML spec](https://html.spec.whatwg.org/#elements-3) for a
   * complete list of HTML elements.
   *
   * Example value: `"<p>Grey cotton knit sweater.</p>"`
   *
   */
  HTML: { input: any; output: any };
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any };
  /**
   * A [JSON](https://www.json.org/json-en.html) object.
   *
   * Example value:
   * `{
   *   "product": {
   *     "id": "gid://shopify/Product/1346443542550",
   *     "title": "White T-shirt",
   *     "options": [{
   *       "name": "Size",
   *       "values": ["M", "L"]
   *     }]
   *   }
   * }`
   *
   */
  JSON: { input: any; output: any };
  /**
   * Represents an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   *
   * For example, `"https://example.myshopify.com"` is a valid URL. It includes a scheme (`https`) and a host
   * (`example.myshopify.com`).
   *
   */
  URL: { input: any; output: any };
  /**
   * An unsigned 64-bit integer. Represents whole numeric values between 0 and 2^64 - 1 encoded as a string of base-10 digits.
   *
   * Example value: `"50"`.
   *
   */
  UnsignedInt64: { input: any; output: any };
};

/**
 * A version of the API, as defined by [Shopify API versioning](https://shopify.dev/api/usage/versioning).
 * Versions are commonly referred to by their handle (for example, `2021-10`).
 *
 */
export type ApiVersion = {
  /** The human-readable name of the version. */
  displayName: Scalars["String"]["output"];
  /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
  handle: Scalars["String"]["output"];
  /** Whether the version is actively supported by Shopify. Supported API versions are guaranteed to be stable. Unsupported API versions include unstable, release candidate, and end-of-life versions that are marked as unsupported. For more information, refer to [Versioning](https://shopify.dev/api/usage/versioning). */
  supported: Scalars["Boolean"]["output"];
};

/**
 * The input fields for submitting Apple Pay payment method information for checkout.
 *
 */
export type ApplePayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The data for the Apple Pay wallet. */
  data: Scalars["String"]["input"];
  /** The header data for the Apple Pay wallet. */
  header: ApplePayWalletHeaderInput;
  /** The last digits of the card used to create the payment. */
  lastDigits: InputMaybe<Scalars["String"]["input"]>;
  /** The signature for the Apple Pay wallet. */
  signature: Scalars["String"]["input"];
  /** The version for the Apple Pay wallet. */
  version: Scalars["String"]["input"];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type ApplePayWalletHeaderInput = {
  /** The application data for the Apple Pay wallet. */
  applicationData: InputMaybe<Scalars["String"]["input"]>;
  /** The ephemeral public key for the Apple Pay wallet. */
  ephemeralPublicKey: Scalars["String"]["input"];
  /** The public key hash for the Apple Pay wallet. */
  publicKeyHash: Scalars["String"]["input"];
  /** The transaction ID for the Apple Pay wallet. */
  transactionId: Scalars["String"]["input"];
};

/** Details about the gift card used on the checkout. */
export type AppliedGiftCard = Node & {
  /** The amount that was taken from the gift card by applying it. */
  amountUsed: MoneyV2;
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsed` instead.
   */
  amountUsedV2: MoneyV2;
  /** The amount left on the gift card. */
  balance: MoneyV2;
  /**
   * The amount left on the gift card.
   * @deprecated Use `balance` instead.
   */
  balanceV2: MoneyV2;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The last characters of the gift card. */
  lastCharacters: Scalars["String"]["output"];
  /** The amount that was applied to the checkout in its currency. */
  presentmentAmountUsed: MoneyV2;
};

/** An article in an online store blog. */
export type Article = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    /**
     * The article's author.
     * @deprecated Use `authorV2` instead.
     */
    author: ArticleAuthor;
    /** The article's author. */
    authorV2: Maybe<ArticleAuthor>;
    /** The blog that the article belongs to. */
    blog: Blog;
    /** List of comments posted on the article. */
    comments: CommentConnection;
    /** Stripped content of the article, single line with HTML tags removed. */
    content: Scalars["String"]["output"];
    /** The content of the article, complete with HTML formatting. */
    contentHtml: Scalars["HTML"]["output"];
    /** Stripped excerpt of the article, single line with HTML tags removed. */
    excerpt: Maybe<Scalars["String"]["output"]>;
    /** The excerpt of the article, complete with HTML formatting. */
    excerptHtml: Maybe<Scalars["HTML"]["output"]>;
    /** A human-friendly unique string for the Article automatically generated from its title. */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The image associated with the article. */
    image: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /** The date and time when the article was published. */
    publishedAt: Scalars["DateTime"]["output"];
    /** The article’s SEO information. */
    seo: Maybe<Seo>;
    /**
     * A categorization that a article can be tagged with.
     *
     */
    tags: Array<Scalars["String"]["output"]>;
    /** The article’s name. */
    title: Scalars["String"]["output"];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters: Maybe<Scalars["String"]["output"]>;
  };

/** An article in an online store blog. */
export type ArticleCommentsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** An article in an online store blog. */
export type ArticleContentArgs = {
  truncateAt: InputMaybe<Scalars["Int"]["input"]>;
};

/** An article in an online store blog. */
export type ArticleExcerptArgs = {
  truncateAt: InputMaybe<Scalars["Int"]["input"]>;
};

/** An article in an online store blog. */
export type ArticleMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** An article in an online store blog. */
export type ArticleMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The author of an article. */
export type ArticleAuthor = {
  /** The author's bio. */
  bio: Maybe<Scalars["String"]["output"]>;
  /** The author’s email. */
  email: Scalars["String"]["output"];
  /** The author's first name. */
  firstName: Scalars["String"]["output"];
  /** The author's last name. */
  lastName: Scalars["String"]["output"];
  /** The author's full name. */
  name: Scalars["String"]["output"];
};

/**
 * An auto-generated type for paginating through multiple Articles.
 *
 */
export type ArticleConnection = {
  /** A list of edges. */
  edges: Array<ArticleEdge>;
  /** A list of the nodes contained in ArticleEdge. */
  nodes: Array<Article>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Article and a cursor during pagination.
 *
 */
export type ArticleEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of ArticleEdge. */
  node: Article;
};

/** The set of valid sort keys for the Article query. */
export enum ArticleSortKeys {
  /** Sort by the `author` value. */
  Author = "AUTHOR",
  /** Sort by the `blog_title` value. */
  BlogTitle = "BLOG_TITLE",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `published_at` value. */
  PublishedAt = "PUBLISHED_AT",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
  /** Sort by the `updated_at` value. */
  UpdatedAt = "UPDATED_AT",
}

/** Represents a generic custom attribute, such as whether an order is a customer's first. */
export type Attribute = {
  /**
   * The key or name of the attribute. For example, `"customersFirstOrder"`.
   *
   */
  key: Scalars["String"]["output"];
  /**
   * The value of the attribute. For example, `"true"`.
   *
   */
  value: Maybe<Scalars["String"]["output"]>;
};

/** The input fields for an attribute. */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars["String"]["input"];
  /** Value of the attribute. */
  value: Scalars["String"]["input"];
};

/**
 * Automatic discount applications capture the intentions of a discount that was automatically applied.
 *
 */
export type AutomaticDiscountApplication = DiscountApplication & {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars["String"]["output"];
  /** The value of the discount application. */
  value: PricingValue;
};

/** Represents a cart line common fields. */
export type BaseCartLine = {
  /** An attribute associated with the cart line. */
  attribute: Maybe<Attribute>;
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<Attribute>;
  /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
  cost: CartLineCost;
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<CartDiscountAllocation>;
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: CartLineEstimatedCost;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The merchandise that the buyer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars["Int"]["output"];
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation: Maybe<SellingPlanAllocation>;
};

/** Represents a cart line common fields. */
export type BaseCartLineAttributeArgs = {
  key: Scalars["String"]["input"];
};

/**
 * An auto-generated type for paginating through multiple BaseCartLines.
 *
 */
export type BaseCartLineConnection = {
  /** A list of edges. */
  edges: Array<BaseCartLineEdge>;
  /** A list of the nodes contained in BaseCartLineEdge. */
  nodes: Array<BaseCartLine>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one BaseCartLine and a cursor during pagination.
 *
 */
export type BaseCartLineEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of BaseCartLineEdge. */
  node: BaseCartLine;
};

/** An online store blog. */
export type Blog = HasMetafields &
  Node &
  OnlineStorePublishable & {
    /** Find an article by its handle. */
    articleByHandle: Maybe<Article>;
    /** List of the blog's articles. */
    articles: ArticleConnection;
    /** The authors who have contributed to the blog. */
    authors: Array<ArticleAuthor>;
    /**
     * A human-friendly unique string for the Blog automatically generated from its title.
     *
     */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /** The blog's SEO information. */
    seo: Maybe<Seo>;
    /** The blogs’s title. */
    title: Scalars["String"]["output"];
  };

/** An online store blog. */
export type BlogArticleByHandleArgs = {
  handle: Scalars["String"]["input"];
};

/** An online store blog. */
export type BlogArticlesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ArticleSortKeys>;
};

/** An online store blog. */
export type BlogMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** An online store blog. */
export type BlogMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * An auto-generated type for paginating through multiple Blogs.
 *
 */
export type BlogConnection = {
  /** A list of edges. */
  edges: Array<BlogEdge>;
  /** A list of the nodes contained in BlogEdge. */
  nodes: Array<Blog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Blog and a cursor during pagination.
 *
 */
export type BlogEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of BlogEdge. */
  node: Blog;
};

/** The set of valid sort keys for the Blog query. */
export enum BlogSortKeys {
  /** Sort by the `handle` value. */
  Handle = "HANDLE",
  /** Sort by the `id` value. */
  Id = "ID",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
}

/**
 * The store's [branding configuration](https://help.shopify.com/en/manual/promoting-marketing/managing-brand-assets).
 *
 */
export type Brand = {
  /** The colors of the store's brand. */
  colors: BrandColors;
  /** The store's cover image. */
  coverImage: Maybe<MediaImage>;
  /** The store's default logo. */
  logo: Maybe<MediaImage>;
  /** The store's short description. */
  shortDescription: Maybe<Scalars["String"]["output"]>;
  /** The store's slogan. */
  slogan: Maybe<Scalars["String"]["output"]>;
  /** The store's preferred logo for square UI elements. */
  squareLogo: Maybe<MediaImage>;
};

/**
 * A group of related colors for the shop's brand.
 *
 */
export type BrandColorGroup = {
  /** The background color. */
  background: Maybe<Scalars["Color"]["output"]>;
  /** The foreground color. */
  foreground: Maybe<Scalars["Color"]["output"]>;
};

/**
 * The colors of the shop's brand.
 *
 */
export type BrandColors = {
  /** The shop's primary brand colors. */
  primary: Array<BrandColorGroup>;
  /** The shop's secondary brand colors. */
  secondary: Array<BrandColorGroup>;
};

/**
 * The input fields for obtaining the buyer's identity.
 *
 */
export type BuyerInput = {
  /** The identifier of the company location. */
  companyLocationId: InputMaybe<Scalars["ID"]["input"]>;
  /** The customer access token retrieved from the [Customer Accounts API](https://shopify.dev/docs/api/customer#step-obtain-access-token). */
  customerAccessToken: Scalars["String"]["input"];
};

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum CardBrand {
  /** American Express. */
  AmericanExpress = "AMERICAN_EXPRESS",
  /** Diners Club. */
  DinersClub = "DINERS_CLUB",
  /** Discover. */
  Discover = "DISCOVER",
  /** JCB. */
  Jcb = "JCB",
  /** Mastercard. */
  Mastercard = "MASTERCARD",
  /** Visa. */
  Visa = "VISA",
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type Cart = HasMetafields &
  Node & {
    /** The gift cards that have been applied to the cart. */
    appliedGiftCards: Array<AppliedGiftCard>;
    /** An attribute associated with the cart. */
    attribute: Maybe<Attribute>;
    /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** Information about the buyer that's interacting with the cart. */
    buyerIdentity: CartBuyerIdentity;
    /** The URL of the checkout for the cart. */
    checkoutUrl: Scalars["URL"]["output"];
    /** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
    cost: CartCost;
    /** The date and time when the cart was created. */
    createdAt: Scalars["DateTime"]["output"];
    /** The delivery properties of the cart. */
    delivery: CartDelivery;
    /**
     * The delivery groups available for the cart, based on the buyer identity default
     * delivery address preference or the default address of the logged-in customer.
     *
     */
    deliveryGroups: CartDeliveryGroupConnection;
    /** The discounts that have been applied to the entire cart. */
    discountAllocations: Array<CartDiscountAllocation>;
    /** The case-insensitive discount codes that the customer added at checkout. */
    discountCodes: Array<CartDiscountCode>;
    /**
     * The estimated costs that the buyer will pay at checkout. The estimated costs are subject to change and changes will be reflected at checkout. The `estimatedCost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A list of lines containing information about the items the customer intends to purchase. */
    lines: BaseCartLineConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** A note that's associated with the cart. For example, the note can be a personalized message to the buyer. */
    note: Maybe<Scalars["String"]["output"]>;
    /** The total number of items in the cart. */
    totalQuantity: Scalars["Int"]["output"];
    /** The date and time when the cart was updated. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartAttributeArgs = {
  key: Scalars["String"]["input"];
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartDeliveryGroupsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  withCarrierRates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartLinesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A delivery address of the buyer that is interacting with the cart. */
export type CartAddress = CartDeliveryAddress;

/** The input fields to provide exactly one of a variety of delivery address types. */
export type CartAddressInput = {
  /** Copies details from the customer address to an address on this cart. */
  copyFromCustomerAddressId: InputMaybe<Scalars["ID"]["input"]>;
  /** A delivery address stored on this cart. */
  deliveryAddress: InputMaybe<CartDeliveryAddressInput>;
};

/** Return type for `cartAttributesUpdate` mutation. */
export type CartAttributesUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export type CartAutomaticDiscountAllocation = CartDiscountAllocation & {
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the allocated discount. */
  title: Scalars["String"]["output"];
};

/** Return type for `cartBillingAddressUpdate` mutation. */
export type CartBillingAddressUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type CartBuyerIdentity = {
  /** The country where the buyer is located. */
  countryCode: Maybe<CountryCode>;
  /** The customer account associated with the cart. */
  customer: Maybe<Customer>;
  /**
   * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
   * The rank of the preferences is determined by the order of the addresses in the array. Preferences
   * can be used to populate relevant fields in the checkout flow.
   *
   * As of the `2025-01` release, `buyerIdentity.deliveryAddressPreferences` is deprecated.
   * Delivery addresses are now part of the `CartDelivery` object and managed with three new mutations:
   * - `cartDeliveryAddressAdd`
   * - `cartDeliveryAddressUpdate`
   * - `cartDeliveryAddressDelete`
   *
   * @deprecated Use `cart.delivery` instead.
   */
  deliveryAddressPreferences: Array<DeliveryAddress>;
  /** The email address of the buyer that's interacting with the cart. */
  email: Maybe<Scalars["String"]["output"]>;
  /** The phone number of the buyer that's interacting with the cart. */
  phone: Maybe<Scalars["String"]["output"]>;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   *
   */
  preferences: Maybe<CartPreferences>;
  /** The purchasing company associated with the cart. */
  purchasingCompany: Maybe<PurchasingCompany>;
};

/**
 * Specifies the input fields to update the buyer information associated with a cart.
 * Buyer identity is used to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * and should match the customer's shipping address.
 *
 */
export type CartBuyerIdentityInput = {
  /** The company location of the buyer that is interacting with the cart. */
  companyLocationId: InputMaybe<Scalars["ID"]["input"]>;
  /** The country where the buyer is located. */
  countryCode: InputMaybe<CountryCode>;
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken: InputMaybe<Scalars["String"]["input"]>;
  /** The email address of the buyer that is interacting with the cart. */
  email: InputMaybe<Scalars["String"]["input"]>;
  /** The phone number of the buyer that is interacting with the cart. */
  phone: InputMaybe<Scalars["String"]["input"]>;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   *
   */
  preferences: InputMaybe<CartPreferencesInput>;
};

/** Return type for `cartBuyerIdentityUpdate` mutation. */
export type CartBuyerIdentityUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/**
 * Represents how credit card details are provided for a direct payment.
 *
 */
export enum CartCardSource {
  /**
   * The credit card was provided by a third party and vaulted on their system.
   * Using this value requires a separate permission from Shopify.
   *
   */
  SavedCreditCard = "SAVED_CREDIT_CARD",
}

/** The discount that has been applied to the cart line using a discount code. */
export type CartCodeDiscountAllocation = CartDiscountAllocation & {
  /** The code used to apply the discount. */
  code: Scalars["String"]["output"];
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
};

/** The completion action to checkout a cart. */
export type CartCompletionAction = CompletePaymentChallenge;

/** The required completion action to checkout a cart. */
export type CartCompletionActionRequired = {
  /** The action required to complete the cart completion attempt. */
  action: Maybe<CartCompletionAction>;
  /** The ID of the cart completion attempt. */
  id: Scalars["String"]["output"];
};

/** The result of a cart completion attempt. */
export type CartCompletionAttemptResult =
  | CartCompletionActionRequired
  | CartCompletionFailed
  | CartCompletionProcessing
  | CartCompletionSuccess;

/** A failed completion to checkout a cart. */
export type CartCompletionFailed = {
  /** The errors that caused the checkout to fail. */
  errors: Array<CompletionError>;
  /** The ID of the cart completion attempt. */
  id: Scalars["String"]["output"];
};

/** A cart checkout completion that's still processing. */
export type CartCompletionProcessing = {
  /** The ID of the cart completion attempt. */
  id: Scalars["String"]["output"];
  /** The number of milliseconds to wait before polling again. */
  pollDelay: Scalars["Int"]["output"];
};

/** A successful completion to checkout a cart and a created order. */
export type CartCompletionSuccess = {
  /** The date and time when the job completed. */
  completedAt: Maybe<Scalars["DateTime"]["output"]>;
  /** The ID of the cart completion attempt. */
  id: Scalars["String"]["output"];
  /** The ID of the order that's created in Shopify. */
  orderId: Scalars["ID"]["output"];
  /** The URL of the order confirmation in Shopify. */
  orderUrl: Scalars["URL"]["output"];
};

/**
 * The costs that the buyer will pay at checkout.
 * The cart cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
 *
 */
export type CartCost = {
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to `subtotalAmount`. */
  checkoutChargeAmount: MoneyV2;
  /** The amount, before taxes and cart-level discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** Whether the subtotal amount is estimated. */
  subtotalAmountEstimated: Scalars["Boolean"]["output"];
  /** The total amount for the customer to pay. */
  totalAmount: MoneyV2;
  /** Whether the total amount is estimated. */
  totalAmountEstimated: Scalars["Boolean"]["output"];
  /**
   * The duty amount for the customer to pay at checkout.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalDutyAmount: Maybe<MoneyV2>;
  /**
   * Whether the total duty amount is estimated.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalDutyAmountEstimated: Scalars["Boolean"]["output"];
  /**
   * The tax amount for the customer to pay at checkout.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalTaxAmount: Maybe<MoneyV2>;
  /**
   * Whether the total tax amount is estimated.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalTaxAmountEstimated: Scalars["Boolean"]["output"];
};

/** Return type for `cartCreate` mutation. */
export type CartCreatePayload = {
  /** The new cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export type CartCustomDiscountAllocation = CartDiscountAllocation & {
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the allocated discount. */
  title: Scalars["String"]["output"];
};

/**
 * The delivery properties of the cart.
 *
 */
export type CartDelivery = {
  /** Selectable addresses to present to the buyer on the cart. */
  addresses: Array<CartSelectableAddress>;
};

/**
 * The delivery properties of the cart.
 *
 */
export type CartDeliveryAddressesArgs = {
  selected?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a mailing address for customers and shipping. */
export type CartDeliveryAddress = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Maybe<Scalars["String"]["output"]>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2: Maybe<Scalars["String"]["output"]>;
  /** The name of the city, district, village, or town. */
  city: Maybe<Scalars["String"]["output"]>;
  /** The name of the customer's company or organization. */
  company: Maybe<Scalars["String"]["output"]>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   */
  countryCode: Maybe<Scalars["String"]["output"]>;
  /** The first name of the customer. */
  firstName: Maybe<Scalars["String"]["output"]>;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars["String"]["output"]>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea: Maybe<Scalars["String"]["output"]>;
  /** The last name of the customer. */
  lastName: Maybe<Scalars["String"]["output"]>;
  /** The latitude coordinate of the customer address. */
  latitude: Maybe<Scalars["Float"]["output"]>;
  /** The longitude coordinate of the customer address. */
  longitude: Maybe<Scalars["Float"]["output"]>;
  /** The full name of the customer, based on firstName and lastName. */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone: Maybe<Scalars["String"]["output"]>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   *
   */
  provinceCode: Maybe<Scalars["String"]["output"]>;
  /** The zip or postal code of the address. */
  zip: Maybe<Scalars["String"]["output"]>;
};

/** Represents a mailing address for customers and shipping. */
export type CartDeliveryAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars["Boolean"]["input"]>;
  withName?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** The input fields to create or update a cart address. */
export type CartDeliveryAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company: InputMaybe<Scalars["String"]["input"]>;
  /** The name of the country. */
  countryCode: InputMaybe<CountryCode>;
  /** The first name of the customer. */
  firstName: InputMaybe<Scalars["String"]["input"]>;
  /** The last name of the customer. */
  lastName: InputMaybe<Scalars["String"]["input"]>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone: InputMaybe<Scalars["String"]["input"]>;
  /** The region of the address, such as the province, state, or district. */
  provinceCode: InputMaybe<Scalars["String"]["input"]>;
  /** The zip or postal code of the address. */
  zip: InputMaybe<Scalars["String"]["input"]>;
};

/** Return type for `cartDeliveryAddressesAdd` mutation. */
export type CartDeliveryAddressesAddPayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartDeliveryAddressesRemove` mutation. */
export type CartDeliveryAddressesRemovePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartDeliveryAddressesUpdate` mutation. */
export type CartDeliveryAddressesUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreference = {
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   *
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: Scalars["Float"]["output"];
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: Scalars["Float"]["output"];
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreferenceInput = {
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   *
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: Scalars["Float"]["input"];
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: Scalars["Float"]["input"];
};

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type CartDeliveryGroup = {
  /** A list of cart lines for the delivery group. */
  cartLines: BaseCartLineConnection;
  /** The destination address for the delivery group. */
  deliveryAddress: MailingAddress;
  /** The delivery options available for the delivery group. */
  deliveryOptions: Array<CartDeliveryOption>;
  /** The type of merchandise in the delivery group. */
  groupType: CartDeliveryGroupType;
  /** The ID for the delivery group. */
  id: Scalars["ID"]["output"];
  /** The selected delivery option for the delivery group. */
  selectedDeliveryOption: Maybe<CartDeliveryOption>;
};

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type CartDeliveryGroupCartLinesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * An auto-generated type for paginating through multiple CartDeliveryGroups.
 *
 */
export type CartDeliveryGroupConnection = {
  /** A list of edges. */
  edges: Array<CartDeliveryGroupEdge>;
  /** A list of the nodes contained in CartDeliveryGroupEdge. */
  nodes: Array<CartDeliveryGroup>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one CartDeliveryGroup and a cursor during pagination.
 *
 */
export type CartDeliveryGroupEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of CartDeliveryGroupEdge. */
  node: CartDeliveryGroup;
};

/**
 * Defines what type of merchandise is in the delivery group.
 *
 */
export enum CartDeliveryGroupType {
  /**
   * The delivery group only contains merchandise that is either a one time purchase or a first delivery of
   * subscription merchandise.
   *
   */
  OneTimePurchase = "ONE_TIME_PURCHASE",
  /** The delivery group only contains subscription merchandise. */
  Subscription = "SUBSCRIPTION",
}

/** The input fields for the cart's delivery properties. */
export type CartDeliveryInput = {
  /**
   * Selectable addresses to present to the buyer on the cart.
   *
   * The input must not contain more than `250` values.
   */
  addresses: InputMaybe<Array<CartSelectableAddressInput>>;
};

/** Information about a delivery option. */
export type CartDeliveryOption = {
  /** The code of the delivery option. */
  code: Maybe<Scalars["String"]["output"]>;
  /** The method for the delivery option. */
  deliveryMethodType: DeliveryMethodType;
  /** The description of the delivery option. */
  description: Maybe<Scalars["String"]["output"]>;
  /** The estimated cost for the delivery option. */
  estimatedCost: MoneyV2;
  /** The unique identifier of the delivery option. */
  handle: Scalars["String"]["output"];
  /** The title of the delivery option. */
  title: Maybe<Scalars["String"]["output"]>;
};

/**
 * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
 * Preferences are not synced back to the cart if they are overwritten.
 *
 */
export type CartDeliveryPreference = {
  /** Preferred location used to find the closest pick up point based on coordinates. */
  coordinates: Maybe<CartDeliveryCoordinatesPreference>;
  /** The preferred delivery methods such as shipping, local pickup or through pickup points. */
  deliveryMethod: Array<PreferenceDeliveryMethodType>;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   */
  pickupHandle: Array<Scalars["String"]["output"]>;
};

/** Delivery preferences can be used to prefill the delivery section at checkout. */
export type CartDeliveryPreferenceInput = {
  /** The coordinates of a delivery location in order of preference. */
  coordinates: InputMaybe<CartDeliveryCoordinatesPreferenceInput>;
  /**
   * The preferred delivery methods such as shipping, local pickup or through pickup points.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethod: InputMaybe<Array<PreferenceDeliveryMethodType>>;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   * The input must not contain more than `250` values.
   */
  pickupHandle: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * The input fields for submitting direct payment method information for checkout.
 *
 */
export type CartDirectPaymentMethodInput = {
  /** Indicates if the customer has accepted the subscription terms. Defaults to false. */
  acceptedSubscriptionTerms: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The source of the credit card payment. */
  cardSource: InputMaybe<CartCardSource>;
  /** The session ID for the direct payment method used to create the payment. */
  sessionId: Scalars["String"]["input"];
};

/** The discounts that have been applied to the cart line. */
export type CartDiscountAllocation = {
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
};

/**
 * The discount application capture the intentions of a discount source at
 *         the time of application.
 */
export type CartDiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** The discount codes applied to the cart. */
export type CartDiscountCode = {
  /** Whether the discount code is applicable to the cart's current contents. */
  applicable: Scalars["Boolean"]["output"];
  /** The code for the discount. */
  code: Scalars["String"]["output"];
};

/** Return type for `cartDiscountCodesUpdate` mutation. */
export type CartDiscountCodesUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Possible error codes that can be returned by `CartUserError`. */
export enum CartErrorCode {
  /** The specified address field contains emojis. */
  AddressFieldContainsEmojis = "ADDRESS_FIELD_CONTAINS_EMOJIS",
  /** The specified address field contains HTML tags. */
  AddressFieldContainsHtmlTags = "ADDRESS_FIELD_CONTAINS_HTML_TAGS",
  /** The specified address field contains a URL. */
  AddressFieldContainsUrl = "ADDRESS_FIELD_CONTAINS_URL",
  /** The specified address field does not match the expected pattern. */
  AddressFieldDoesNotMatchExpectedPattern = "ADDRESS_FIELD_DOES_NOT_MATCH_EXPECTED_PATTERN",
  /** The specified address field is required. */
  AddressFieldIsRequired = "ADDRESS_FIELD_IS_REQUIRED",
  /** The specified address field is too long. */
  AddressFieldIsTooLong = "ADDRESS_FIELD_IS_TOO_LONG",
  /** The cart is too large to save. */
  CartTooLarge = "CART_TOO_LARGE",
  /** The input value is invalid. */
  Invalid = "INVALID",
  /** Company location not found or not allowed. */
  InvalidCompanyLocation = "INVALID_COMPANY_LOCATION",
  /** The delivery address was not found. */
  InvalidDeliveryAddressId = "INVALID_DELIVERY_ADDRESS_ID",
  /** Delivery group was not found in cart. */
  InvalidDeliveryGroup = "INVALID_DELIVERY_GROUP",
  /** Delivery option was not valid. */
  InvalidDeliveryOption = "INVALID_DELIVERY_OPTION",
  /** The quantity must be a multiple of the specified increment. */
  InvalidIncrement = "INVALID_INCREMENT",
  /** Merchandise line was not found in cart. */
  InvalidMerchandiseLine = "INVALID_MERCHANDISE_LINE",
  /** The metafields were not valid. */
  InvalidMetafields = "INVALID_METAFIELDS",
  /** The payment wasn't valid. */
  InvalidPayment = "INVALID_PAYMENT",
  /** The payment is invalid. Deferred payment is required. */
  InvalidPaymentDeferredPaymentRequired = "INVALID_PAYMENT_DEFERRED_PAYMENT_REQUIRED",
  /** Cannot update payment on an empty cart */
  InvalidPaymentEmptyCart = "INVALID_PAYMENT_EMPTY_CART",
  /** The given zip code is invalid for the provided country. */
  InvalidZipCodeForCountry = "INVALID_ZIP_CODE_FOR_COUNTRY",
  /** The given zip code is invalid for the provided province. */
  InvalidZipCodeForProvince = "INVALID_ZIP_CODE_FOR_PROVINCE",
  /** The input value should be less than the maximum value allowed. */
  LessThan = "LESS_THAN",
  /** The quantity must be below the specified maximum for the item. */
  MaximumExceeded = "MAXIMUM_EXCEEDED",
  /** The quantity must be above the specified minimum for the item. */
  MinimumNotMet = "MINIMUM_NOT_MET",
  /** The customer access token is required when setting a company location. */
  MissingCustomerAccessToken = "MISSING_CUSTOMER_ACCESS_TOKEN",
  /** Missing discount code. */
  MissingDiscountCode = "MISSING_DISCOUNT_CODE",
  /** Missing note. */
  MissingNote = "MISSING_NOTE",
  /** The note length must be below the specified maximum. */
  NoteTooLong = "NOTE_TOO_LONG",
  /** Only one delivery address can be selected. */
  OnlyOneDeliveryAddressCanBeSelected = "ONLY_ONE_DELIVERY_ADDRESS_CAN_BE_SELECTED",
  /** Credit card has expired. */
  PaymentsCreditCardBaseExpired = "PAYMENTS_CREDIT_CARD_BASE_EXPIRED",
  /** Credit card gateway is not supported. */
  PaymentsCreditCardBaseGatewayNotSupported = "PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED",
  /** Credit card error. */
  PaymentsCreditCardGeneric = "PAYMENTS_CREDIT_CARD_GENERIC",
  /** Credit card month is invalid. */
  PaymentsCreditCardMonthInclusion = "PAYMENTS_CREDIT_CARD_MONTH_INCLUSION",
  /** Credit card number is invalid. */
  PaymentsCreditCardNumberInvalid = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID",
  /** Credit card number format is invalid. */
  PaymentsCreditCardNumberInvalidFormat = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT",
  /** Credit card verification value is blank. */
  PaymentsCreditCardVerificationValueBlank = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK",
  /** Credit card verification value is invalid for card type. */
  PaymentsCreditCardVerificationValueInvalidForCardType = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE",
  /** Credit card has expired. */
  PaymentsCreditCardYearExpired = "PAYMENTS_CREDIT_CARD_YEAR_EXPIRED",
  /** Credit card expiry year is invalid. */
  PaymentsCreditCardYearInvalidExpiryYear = "PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR",
  /** The payment method is not applicable. */
  PaymentMethodNotApplicable = "PAYMENT_METHOD_NOT_APPLICABLE",
  /** The payment method is not supported. */
  PaymentMethodNotSupported = "PAYMENT_METHOD_NOT_SUPPORTED",
  /** The delivery group is in a pending state. */
  PendingDeliveryGroups = "PENDING_DELIVERY_GROUPS",
  /** The given province cannot be found. */
  ProvinceNotFound = "PROVINCE_NOT_FOUND",
  /** Selling plan is not applicable. */
  SellingPlanNotApplicable = "SELLING_PLAN_NOT_APPLICABLE",
  /** An error occurred while saving the cart. */
  ServiceUnavailable = "SERVICE_UNAVAILABLE",
  /** Too many delivery addresses on Cart. */
  TooManyDeliveryAddresses = "TOO_MANY_DELIVERY_ADDRESSES",
  /** A general error occurred during address validation. */
  UnspecifiedAddressError = "UNSPECIFIED_ADDRESS_ERROR",
  /** Validation failed. */
  ValidationCustom = "VALIDATION_CUSTOM",
  /** Variant can only be purchased with a selling plan. */
  VariantRequiresSellingPlan = "VARIANT_REQUIRES_SELLING_PLAN",
  /** The given zip code is unsupported. */
  ZipCodeNotSupported = "ZIP_CODE_NOT_SUPPORTED",
}

/** The estimated costs that the buyer will pay at checkout. The estimated cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
export type CartEstimatedCost = {
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to`subtotal_amount`. */
  checkoutChargeAmount: MoneyV2;
  /** The estimated amount, before taxes and discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** The estimated total amount for the customer to pay. */
  totalAmount: MoneyV2;
  /** The estimated duty amount for the customer to pay at checkout. */
  totalDutyAmount: Maybe<MoneyV2>;
  /** The estimated tax amount for the customer to pay at checkout. */
  totalTaxAmount: Maybe<MoneyV2>;
};

/**
 * The input fields for submitting a billing address without a selected payment method.
 *
 */
export type CartFreePaymentMethodInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
};

/** Return type for `cartGiftCardCodesRemove` mutation. */
export type CartGiftCardCodesRemovePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartGiftCardCodesUpdate` mutation. */
export type CartGiftCardCodesUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The input fields to create a cart. */
export type CartInput = {
  /**
   * An array of key-value pairs that contains additional information about the cart.
   *
   * The input must not contain more than `250` values.
   */
  attributes: InputMaybe<Array<AttributeInput>>;
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   *
   */
  buyerIdentity: InputMaybe<CartBuyerIdentityInput>;
  /** The delivery-related fields for the cart. */
  delivery: InputMaybe<CartDeliveryInput>;
  /**
   * The case-insensitive discount codes that the customer added at checkout.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes: InputMaybe<Array<Scalars["String"]["input"]>>;
  /**
   * The case-insensitive gift card codes.
   *
   * The input must not contain more than `250` values.
   */
  giftCardCodes: InputMaybe<Array<Scalars["String"]["input"]>>;
  /**
   * A list of merchandise lines to add to the cart.
   *
   * The input must not contain more than `250` values.
   */
  lines: InputMaybe<Array<CartLineInput>>;
  /**
   * The metafields to associate with this cart.
   *
   * The input must not contain more than `250` values.
   */
  metafields: InputMaybe<Array<CartInputMetafieldInput>>;
  /**
   * A note that's associated with the cart. For example, the note can be a personalized message to the buyer.
   *
   */
  note: InputMaybe<Scalars["String"]["input"]>;
};

/** The input fields for a cart metafield value to set. */
export type CartInputMetafieldInput = {
  /** The key name of the metafield. */
  key: Scalars["String"]["input"];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars["String"]["input"];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars["String"]["input"];
};

/** Represents information about the merchandise in the cart. */
export type CartLine = BaseCartLine &
  Node & {
    /** An attribute associated with the cart line. */
    attribute: Maybe<Attribute>;
    /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
    cost: CartLineCost;
    /** The discounts that have been applied to the cart line. */
    discountAllocations: Array<CartDiscountAllocation>;
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The merchandise that the buyer intends to purchase. */
    merchandise: Merchandise;
    /** The quantity of the merchandise that the customer intends to purchase. */
    quantity: Scalars["Int"]["output"];
    /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
    sellingPlanAllocation: Maybe<SellingPlanAllocation>;
  };

/** Represents information about the merchandise in the cart. */
export type CartLineAttributeArgs = {
  key: Scalars["String"]["input"];
};

/** The cost of the merchandise line that the buyer will pay at checkout. */
export type CartLineCost = {
  /** The amount of the merchandise line. */
  amountPerQuantity: MoneyV2;
  /** The compare at amount of the merchandise line. */
  compareAtAmountPerQuantity: Maybe<MoneyV2>;
  /** The cost of the merchandise line before line-level discounts. */
  subtotalAmount: MoneyV2;
  /** The total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

/**
 * The estimated cost of the merchandise line that the buyer will pay at checkout.
 *
 */
export type CartLineEstimatedCost = {
  /** The amount of the merchandise line. */
  amount: MoneyV2;
  /** The compare at amount of the merchandise line. */
  compareAtAmount: Maybe<MoneyV2>;
  /** The estimated cost of the merchandise line before discounts. */
  subtotalAmount: MoneyV2;
  /** The estimated total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

/** The input fields to create a merchandise line on a cart. */
export type CartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: Scalars["ID"]["input"];
  /** The quantity of the merchandise. */
  quantity: InputMaybe<Scalars["Int"]["input"]>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId: InputMaybe<Scalars["ID"]["input"]>;
};

/** The input fields to update a line item on a cart. */
export type CartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise line. */
  id: Scalars["ID"]["input"];
  /** The ID of the merchandise for the line item. */
  merchandiseId: InputMaybe<Scalars["ID"]["input"]>;
  /** The quantity of the line item. */
  quantity: InputMaybe<Scalars["Int"]["input"]>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId: InputMaybe<Scalars["ID"]["input"]>;
};

/** Return type for `cartLinesAdd` mutation. */
export type CartLinesAddPayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartLinesRemove` mutation. */
export type CartLinesRemovePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartLinesUpdate` mutation. */
export type CartLinesUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The input fields to delete a cart metafield. */
export type CartMetafieldDeleteInput = {
  /**
   * The key name of the cart metafield. Can either be a composite key (`namespace.key`) or a simple key
   *  that relies on the default app-reserved namespace.
   *
   */
  key: Scalars["String"]["input"];
  /** The ID of the cart resource. */
  ownerId: Scalars["ID"]["input"];
};

/** Return type for `cartMetafieldDelete` mutation. */
export type CartMetafieldDeletePayload = {
  /** The ID of the deleted cart metafield. */
  deletedId: Maybe<Scalars["ID"]["output"]>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldDeleteUserError>;
};

/** The input fields for a cart metafield value to set. */
export type CartMetafieldsSetInput = {
  /** The key name of the cart metafield. */
  key: Scalars["String"]["input"];
  /** The ID of the cart resource. */
  ownerId: Scalars["ID"]["input"];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars["String"]["input"];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars["String"]["input"];
};

/** Return type for `cartMetafieldsSet` mutation. */
export type CartMetafieldsSetPayload = {
  /** The list of cart metafields that were set. */
  metafields: Maybe<Array<Metafield>>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldsSetUserError>;
};

/** Return type for `cartNoteUpdate` mutation. */
export type CartNoteUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** An error occurred during the cart operation. */
export type CartOperationError = {
  /** The error code. */
  code: Scalars["String"]["output"];
  /** The error message. */
  message: Maybe<Scalars["String"]["output"]>;
};

/**
 * The input fields for updating the payment method that will be used to checkout.
 *
 */
export type CartPaymentInput = {
  /** The amount that the customer will be charged at checkout. */
  amount: MoneyInput;
  /**
   * The input fields to use when checking out a cart with a direct payment method (like a credit card).
   *
   */
  directPaymentMethod: InputMaybe<CartDirectPaymentMethodInput>;
  /**
   * The input fields to use to checkout a cart without providing a payment method.
   * Use this payment method input if the total cost of the cart is 0.
   *
   */
  freePaymentMethod: InputMaybe<CartFreePaymentMethodInput>;
  /**
   * An ID of the order placed on the originating platform.
   * Note that this value doesn't correspond to the Shopify Order ID.
   *
   */
  sourceIdentifier: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The input fields to use when checking out a cart with a wallet payment method (like Shop Pay or Apple Pay).
   *
   */
  walletPaymentMethod: InputMaybe<CartWalletPaymentMethodInput>;
};

/** Return type for `cartPaymentUpdate` mutation. */
export type CartPaymentUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/**
 * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
 * Preferences are not synced back to the cart if they are overwritten.
 *
 */
export type CartPreferences = {
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery: Maybe<CartDeliveryPreference>;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   */
  wallet: Maybe<Array<Scalars["String"]["output"]>>;
};

/** The input fields represent preferences for the buyer that is interacting with the cart. */
export type CartPreferencesInput = {
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery: InputMaybe<CartDeliveryPreferenceInput>;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   * The input must not contain more than `250` values.
   */
  wallet: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** Return type for `cartPrepareForCompletion` mutation. */
export type CartPrepareForCompletionPayload = {
  /** The result of cart preparation for completion. */
  result: Maybe<CartPrepareForCompletionResult>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
};

/** The result of cart preparation. */
export type CartPrepareForCompletionResult =
  | CartStatusNotReady
  | CartStatusReady
  | CartThrottled;

/** Return type for `cartRemovePersonalData` mutation. */
export type CartRemovePersonalDataPayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/**
 * A selectable delivery address for a cart.
 *
 */
export type CartSelectableAddress = {
  /** The delivery address. */
  address: CartAddress;
  /** A unique identifier for the address, specific to this cart. */
  id: Scalars["ID"]["output"];
  /** This delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse: Scalars["Boolean"]["output"];
  /** Sets exactly one address as pre-selected for the buyer. */
  selected: Scalars["Boolean"]["output"];
};

/** The input fields for a selectable delivery address in a cart. */
export type CartSelectableAddressInput = {
  /** Exactly one kind of delivery address. */
  address: CartAddressInput;
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Defines what kind of address validation is requested. */
  validationStrategy: InputMaybe<DeliveryAddressValidationStrategy>;
};

/** The input fields to update a line item on a cart. */
export type CartSelectableAddressUpdateInput = {
  /** Exactly one kind of delivery address. */
  address: InputMaybe<CartAddressInput>;
  /** The id of the selectable address. */
  id: Scalars["ID"]["input"];
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Defines what kind of address validation is requested. */
  validationStrategy: InputMaybe<DeliveryAddressValidationStrategy>;
};

/**
 * The input fields for updating the selected delivery options for a delivery group.
 *
 */
export type CartSelectedDeliveryOptionInput = {
  /** The ID of the cart delivery group. */
  deliveryGroupId: Scalars["ID"]["input"];
  /** The handle of the selected delivery option. */
  deliveryOptionHandle: Scalars["String"]["input"];
};

/** Return type for `cartSelectedDeliveryOptionsUpdate` mutation. */
export type CartSelectedDeliveryOptionsUpdatePayload = {
  /** The updated cart. */
  cart: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Cart is not ready for payment update and completion. */
export type CartStatusNotReady = {
  /** The result of cart preparation for completion. */
  cart: Maybe<Cart>;
  /** The list of errors that caused the cart to not be ready for payment update and completion. */
  errors: Array<CartOperationError>;
};

/** Cart is ready for payment update and completion. */
export type CartStatusReady = {
  /** The result of cart preparation for completion. */
  cart: Maybe<Cart>;
};

/** Return type for `cartSubmitForCompletion` mutation. */
export type CartSubmitForCompletionPayload = {
  /** The result of cart submission for completion. */
  result: Maybe<CartSubmitForCompletionResult>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
};

/** The result of cart submit completion. */
export type CartSubmitForCompletionResult =
  | SubmitAlreadyAccepted
  | SubmitFailed
  | SubmitSuccess
  | SubmitThrottled;

/**
 * Response signifying that the access to cart request is currently being throttled.
 * The client can retry after `poll_after`.
 *
 */
export type CartThrottled = {
  /** The result of cart preparation for completion. */
  cart: Maybe<Cart>;
  /** The polling delay. */
  pollAfter: Scalars["DateTime"]["output"];
};

/** Represents an error that happens during execution of a cart mutation. */
export type CartUserError = DisplayableError & {
  /** The error code. */
  code: Maybe<CartErrorCode>;
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type CartWalletPaymentMethodInput = {
  /** The payment method information for the Apple Pay wallet. */
  applePayWalletContent: InputMaybe<ApplePayWalletContentInput>;
  /** The payment method information for the Shop Pay wallet. */
  shopPayWalletContent: InputMaybe<ShopPayWalletContentInput>;
};

/** A warning that occurred during a cart mutation. */
export type CartWarning = {
  /** The code of the warning. */
  code: CartWarningCode;
  /** The message text of the warning. */
  message: Scalars["String"]["output"];
  /** The target of the warning. */
  target: Scalars["ID"]["output"];
};

/** The code for the cart warning. */
export enum CartWarningCode {
  /** The discount code cannot be honored. */
  DiscountCodeNotHonoured = "DISCOUNT_CODE_NOT_HONOURED",
  /** The discount is currently inactive. */
  DiscountCurrentlyInactive = "DISCOUNT_CURRENTLY_INACTIVE",
  /** The customer is not eligible for this discount. */
  DiscountCustomerNotEligible = "DISCOUNT_CUSTOMER_NOT_ELIGIBLE",
  /** The customer's discount usage limit has been reached. */
  DiscountCustomerUsageLimitReached = "DISCOUNT_CUSTOMER_USAGE_LIMIT_REACHED",
  /** An eligible customer is missing for this discount. */
  DiscountEligibleCustomerMissing = "DISCOUNT_ELIGIBLE_CUSTOMER_MISSING",
  /** The purchase type is incompatible with this discount. */
  DiscountIncompatiblePurchaseType = "DISCOUNT_INCOMPATIBLE_PURCHASE_TYPE",
  /** The discount was not found. */
  DiscountNotFound = "DISCOUNT_NOT_FOUND",
  /** There are no entitled line items for this discount. */
  DiscountNoEntitledLineItems = "DISCOUNT_NO_ENTITLED_LINE_ITEMS",
  /** There are no entitled shipping lines for this discount. */
  DiscountNoEntitledShippingLines = "DISCOUNT_NO_ENTITLED_SHIPPING_LINES",
  /** The purchase is not in range for this discount. */
  DiscountPurchaseNotInRange = "DISCOUNT_PURCHASE_NOT_IN_RANGE",
  /** The quantity is not in range for this discount. */
  DiscountQuantityNotInRange = "DISCOUNT_QUANTITY_NOT_IN_RANGE",
  /** The discount usage limit has been reached. */
  DiscountUsageLimitReached = "DISCOUNT_USAGE_LIMIT_REACHED",
  /** A delivery address with the same details already exists on this cart. */
  DuplicateDeliveryAddress = "DUPLICATE_DELIVERY_ADDRESS",
  /** The merchandise does not have enough stock. */
  MerchandiseNotEnoughStock = "MERCHANDISE_NOT_ENOUGH_STOCK",
  /** The merchandise is out of stock. */
  MerchandiseOutOfStock = "MERCHANDISE_OUT_OF_STOCK",
  /** Gift cards are not available as a payment method. */
  PaymentsGiftCardsUnavailable = "PAYMENTS_GIFT_CARDS_UNAVAILABLE",
}

/**
 * A filter used to view a subset of products in a collection matching a specific category value.
 *
 */
export type CategoryFilter = {
  /** The id of the category to filter on. */
  id: Scalars["String"]["input"];
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type Collection = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    /** Stripped description of the collection, single line with HTML tags removed. */
    description: Scalars["String"]["output"];
    /** The description of the collection, complete with HTML formatting. */
    descriptionHtml: Scalars["HTML"]["output"];
    /**
     * A human-friendly unique string for the collection automatically generated from its title.
     * Limit of 255 characters.
     *
     */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** Image associated with the collection. */
    image: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /** List of products in the collection. */
    products: ProductConnection;
    /** The collection's SEO information. */
    seo: Seo;
    /** The collection’s name. Limit of 255 characters. */
    title: Scalars["String"]["output"];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters: Maybe<Scalars["String"]["output"]>;
    /** The date and time when the collection was last modified. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionDescriptionArgs = {
  truncateAt: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionProductsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  filters: InputMaybe<Array<ProductFilter>>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ProductCollectionSortKeys>;
};

/**
 * An auto-generated type for paginating through multiple Collections.
 *
 */
export type CollectionConnection = {
  /** A list of edges. */
  edges: Array<CollectionEdge>;
  /** A list of the nodes contained in CollectionEdge. */
  nodes: Array<Collection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Collections. */
  totalCount: Scalars["UnsignedInt64"]["output"];
};

/**
 * An auto-generated type which holds one Collection and a cursor during pagination.
 *
 */
export type CollectionEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of CollectionEdge. */
  node: Collection;
};

/** The set of valid sort keys for the Collection query. */
export enum CollectionSortKeys {
  /** Sort by the `id` value. */
  Id = "ID",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
  /** Sort by the `updated_at` value. */
  UpdatedAt = "UPDATED_AT",
}

/** A comment on an article. */
export type Comment = Node & {
  /** The comment’s author. */
  author: CommentAuthor;
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: Scalars["String"]["output"];
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Scalars["HTML"]["output"];
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
};

/** A comment on an article. */
export type CommentContentArgs = {
  truncateAt: InputMaybe<Scalars["Int"]["input"]>;
};

/** The author of a comment. */
export type CommentAuthor = {
  /** The author's email. */
  email: Scalars["String"]["output"];
  /** The author’s name. */
  name: Scalars["String"]["output"];
};

/**
 * An auto-generated type for paginating through multiple Comments.
 *
 */
export type CommentConnection = {
  /** A list of edges. */
  edges: Array<CommentEdge>;
  /** A list of the nodes contained in CommentEdge. */
  nodes: Array<Comment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Comment and a cursor during pagination.
 *
 */
export type CommentEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of CommentEdge. */
  node: Comment;
};

/** Represents information about a company which is also a customer of the shop. */
export type Company = HasMetafields &
  Node & {
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
    createdAt: Scalars["DateTime"]["output"];
    /** A unique externally-supplied ID for the company. */
    externalId: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company. */
    name: Scalars["String"]["output"];
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A company's main point of contact. */
export type CompanyContact = Node & {
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company contact was created in Shopify. */
  createdAt: Scalars["DateTime"]["output"];
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The company contact's locale (language). */
  locale: Maybe<Scalars["String"]["output"]>;
  /** The company contact's job title. */
  title: Maybe<Scalars["String"]["output"]>;
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company contact was last modified. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** A company's location. */
export type CompanyLocation = HasMetafields &
  Node & {
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company location was created in Shopify. */
    createdAt: Scalars["DateTime"]["output"];
    /** A unique externally-supplied ID for the company. */
    externalId: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The preferred locale of the company location. */
    locale: Maybe<Scalars["String"]["output"]>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company location. */
    name: Scalars["String"]["output"];
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company location was last modified. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/** A company's location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** A company's location. */
export type CompanyLocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The action for the 3DS payment redirect. */
export type CompletePaymentChallenge = {
  /** The URL for the 3DS payment redirect. */
  redirectUrl: Maybe<Scalars["URL"]["output"]>;
};

/** An error that occurred during a cart completion attempt. */
export type CompletionError = {
  /** The error code. */
  code: CompletionErrorCode;
  /** The error message. */
  message: Maybe<Scalars["String"]["output"]>;
};

/** The code of the error that occurred during a cart completion attempt. */
export enum CompletionErrorCode {
  Error = "ERROR",
  InventoryReservationError = "INVENTORY_RESERVATION_ERROR",
  PaymentAmountTooSmall = "PAYMENT_AMOUNT_TOO_SMALL",
  PaymentCallIssuer = "PAYMENT_CALL_ISSUER",
  PaymentCardDeclined = "PAYMENT_CARD_DECLINED",
  PaymentError = "PAYMENT_ERROR",
  PaymentGatewayNotEnabledError = "PAYMENT_GATEWAY_NOT_ENABLED_ERROR",
  PaymentInsufficientFunds = "PAYMENT_INSUFFICIENT_FUNDS",
  PaymentInvalidBillingAddress = "PAYMENT_INVALID_BILLING_ADDRESS",
  PaymentInvalidCreditCard = "PAYMENT_INVALID_CREDIT_CARD",
  PaymentInvalidCurrency = "PAYMENT_INVALID_CURRENCY",
  PaymentInvalidPaymentMethod = "PAYMENT_INVALID_PAYMENT_METHOD",
  PaymentTransientError = "PAYMENT_TRANSIENT_ERROR",
}

/** Represents information about the grouped merchandise in the cart. */
export type ComponentizableCartLine = BaseCartLine &
  Node & {
    /** An attribute associated with the cart line. */
    attribute: Maybe<Attribute>;
    /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
    cost: CartLineCost;
    /** The discounts that have been applied to the cart line. */
    discountAllocations: Array<CartDiscountAllocation>;
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The components of the line item. */
    lineComponents: Array<CartLine>;
    /** The merchandise that the buyer intends to purchase. */
    merchandise: Merchandise;
    /** The quantity of the merchandise that the customer intends to purchase. */
    quantity: Scalars["Int"]["output"];
    /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
    sellingPlanAllocation: Maybe<SellingPlanAllocation>;
  };

/** Represents information about the grouped merchandise in the cart. */
export type ComponentizableCartLineAttributeArgs = {
  key: Scalars["String"]["input"];
};

/** Details for count of elements. */
export type Count = {
  /** Count of elements. */
  count: Scalars["Int"]["output"];
  /** Precision of count, how exact is the value. */
  precision: CountPrecision;
};

/** The precision of the value returned by a count field. */
export enum CountPrecision {
  /** The count is at least the value. A limit was reached. */
  AtLeast = "AT_LEAST",
  /** The count is exactly the value. */
  Exact = "EXACT",
}

/** A country. */
export type Country = {
  /** The languages available for the country. */
  availableLanguages: Array<Language>;
  /** The currency of the country. */
  currency: Currency;
  /** The default language for the country. */
  defaultLanguage: Language;
  /** The ISO code of the country. */
  isoCode: CountryCode;
  /**
   * The market that includes this country.
   * @deprecated This `market` field will be removed in a future version of the API.
   */
  market: Maybe<Market>;
  /** The name of the country. */
  name: Scalars["String"]["output"];
  /** The unit system used in the country. */
  unitSystem: UnitSystem;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export enum CountryCode {
  /** Ascension Island. */
  Ac = "AC",
  /** Andorra. */
  Ad = "AD",
  /** United Arab Emirates. */
  Ae = "AE",
  /** Afghanistan. */
  Af = "AF",
  /** Antigua & Barbuda. */
  Ag = "AG",
  /** Anguilla. */
  Ai = "AI",
  /** Albania. */
  Al = "AL",
  /** Armenia. */
  Am = "AM",
  /** Netherlands Antilles. */
  An = "AN",
  /** Angola. */
  Ao = "AO",
  /** Argentina. */
  Ar = "AR",
  /** Austria. */
  At = "AT",
  /** Australia. */
  Au = "AU",
  /** Aruba. */
  Aw = "AW",
  /** Åland Islands. */
  Ax = "AX",
  /** Azerbaijan. */
  Az = "AZ",
  /** Bosnia & Herzegovina. */
  Ba = "BA",
  /** Barbados. */
  Bb = "BB",
  /** Bangladesh. */
  Bd = "BD",
  /** Belgium. */
  Be = "BE",
  /** Burkina Faso. */
  Bf = "BF",
  /** Bulgaria. */
  Bg = "BG",
  /** Bahrain. */
  Bh = "BH",
  /** Burundi. */
  Bi = "BI",
  /** Benin. */
  Bj = "BJ",
  /** St. Barthélemy. */
  Bl = "BL",
  /** Bermuda. */
  Bm = "BM",
  /** Brunei. */
  Bn = "BN",
  /** Bolivia. */
  Bo = "BO",
  /** Caribbean Netherlands. */
  Bq = "BQ",
  /** Brazil. */
  Br = "BR",
  /** Bahamas. */
  Bs = "BS",
  /** Bhutan. */
  Bt = "BT",
  /** Bouvet Island. */
  Bv = "BV",
  /** Botswana. */
  Bw = "BW",
  /** Belarus. */
  By = "BY",
  /** Belize. */
  Bz = "BZ",
  /** Canada. */
  Ca = "CA",
  /** Cocos (Keeling) Islands. */
  Cc = "CC",
  /** Congo - Kinshasa. */
  Cd = "CD",
  /** Central African Republic. */
  Cf = "CF",
  /** Congo - Brazzaville. */
  Cg = "CG",
  /** Switzerland. */
  Ch = "CH",
  /** Côte d’Ivoire. */
  Ci = "CI",
  /** Cook Islands. */
  Ck = "CK",
  /** Chile. */
  Cl = "CL",
  /** Cameroon. */
  Cm = "CM",
  /** China. */
  Cn = "CN",
  /** Colombia. */
  Co = "CO",
  /** Costa Rica. */
  Cr = "CR",
  /** Cuba. */
  Cu = "CU",
  /** Cape Verde. */
  Cv = "CV",
  /** Curaçao. */
  Cw = "CW",
  /** Christmas Island. */
  Cx = "CX",
  /** Cyprus. */
  Cy = "CY",
  /** Czechia. */
  Cz = "CZ",
  /** Germany. */
  De = "DE",
  /** Djibouti. */
  Dj = "DJ",
  /** Denmark. */
  Dk = "DK",
  /** Dominica. */
  Dm = "DM",
  /** Dominican Republic. */
  Do = "DO",
  /** Algeria. */
  Dz = "DZ",
  /** Ecuador. */
  Ec = "EC",
  /** Estonia. */
  Ee = "EE",
  /** Egypt. */
  Eg = "EG",
  /** Western Sahara. */
  Eh = "EH",
  /** Eritrea. */
  Er = "ER",
  /** Spain. */
  Es = "ES",
  /** Ethiopia. */
  Et = "ET",
  /** Finland. */
  Fi = "FI",
  /** Fiji. */
  Fj = "FJ",
  /** Falkland Islands. */
  Fk = "FK",
  /** Faroe Islands. */
  Fo = "FO",
  /** France. */
  Fr = "FR",
  /** Gabon. */
  Ga = "GA",
  /** United Kingdom. */
  Gb = "GB",
  /** Grenada. */
  Gd = "GD",
  /** Georgia. */
  Ge = "GE",
  /** French Guiana. */
  Gf = "GF",
  /** Guernsey. */
  Gg = "GG",
  /** Ghana. */
  Gh = "GH",
  /** Gibraltar. */
  Gi = "GI",
  /** Greenland. */
  Gl = "GL",
  /** Gambia. */
  Gm = "GM",
  /** Guinea. */
  Gn = "GN",
  /** Guadeloupe. */
  Gp = "GP",
  /** Equatorial Guinea. */
  Gq = "GQ",
  /** Greece. */
  Gr = "GR",
  /** South Georgia & South Sandwich Islands. */
  Gs = "GS",
  /** Guatemala. */
  Gt = "GT",
  /** Guinea-Bissau. */
  Gw = "GW",
  /** Guyana. */
  Gy = "GY",
  /** Hong Kong SAR. */
  Hk = "HK",
  /** Heard & McDonald Islands. */
  Hm = "HM",
  /** Honduras. */
  Hn = "HN",
  /** Croatia. */
  Hr = "HR",
  /** Haiti. */
  Ht = "HT",
  /** Hungary. */
  Hu = "HU",
  /** Indonesia. */
  Id = "ID",
  /** Ireland. */
  Ie = "IE",
  /** Israel. */
  Il = "IL",
  /** Isle of Man. */
  Im = "IM",
  /** India. */
  In = "IN",
  /** British Indian Ocean Territory. */
  Io = "IO",
  /** Iraq. */
  Iq = "IQ",
  /** Iran. */
  Ir = "IR",
  /** Iceland. */
  Is = "IS",
  /** Italy. */
  It = "IT",
  /** Jersey. */
  Je = "JE",
  /** Jamaica. */
  Jm = "JM",
  /** Jordan. */
  Jo = "JO",
  /** Japan. */
  Jp = "JP",
  /** Kenya. */
  Ke = "KE",
  /** Kyrgyzstan. */
  Kg = "KG",
  /** Cambodia. */
  Kh = "KH",
  /** Kiribati. */
  Ki = "KI",
  /** Comoros. */
  Km = "KM",
  /** St. Kitts & Nevis. */
  Kn = "KN",
  /** North Korea. */
  Kp = "KP",
  /** South Korea. */
  Kr = "KR",
  /** Kuwait. */
  Kw = "KW",
  /** Cayman Islands. */
  Ky = "KY",
  /** Kazakhstan. */
  Kz = "KZ",
  /** Laos. */
  La = "LA",
  /** Lebanon. */
  Lb = "LB",
  /** St. Lucia. */
  Lc = "LC",
  /** Liechtenstein. */
  Li = "LI",
  /** Sri Lanka. */
  Lk = "LK",
  /** Liberia. */
  Lr = "LR",
  /** Lesotho. */
  Ls = "LS",
  /** Lithuania. */
  Lt = "LT",
  /** Luxembourg. */
  Lu = "LU",
  /** Latvia. */
  Lv = "LV",
  /** Libya. */
  Ly = "LY",
  /** Morocco. */
  Ma = "MA",
  /** Monaco. */
  Mc = "MC",
  /** Moldova. */
  Md = "MD",
  /** Montenegro. */
  Me = "ME",
  /** St. Martin. */
  Mf = "MF",
  /** Madagascar. */
  Mg = "MG",
  /** North Macedonia. */
  Mk = "MK",
  /** Mali. */
  Ml = "ML",
  /** Myanmar (Burma). */
  Mm = "MM",
  /** Mongolia. */
  Mn = "MN",
  /** Macao SAR. */
  Mo = "MO",
  /** Martinique. */
  Mq = "MQ",
  /** Mauritania. */
  Mr = "MR",
  /** Montserrat. */
  Ms = "MS",
  /** Malta. */
  Mt = "MT",
  /** Mauritius. */
  Mu = "MU",
  /** Maldives. */
  Mv = "MV",
  /** Malawi. */
  Mw = "MW",
  /** Mexico. */
  Mx = "MX",
  /** Malaysia. */
  My = "MY",
  /** Mozambique. */
  Mz = "MZ",
  /** Namibia. */
  Na = "NA",
  /** New Caledonia. */
  Nc = "NC",
  /** Niger. */
  Ne = "NE",
  /** Norfolk Island. */
  Nf = "NF",
  /** Nigeria. */
  Ng = "NG",
  /** Nicaragua. */
  Ni = "NI",
  /** Netherlands. */
  Nl = "NL",
  /** Norway. */
  No = "NO",
  /** Nepal. */
  Np = "NP",
  /** Nauru. */
  Nr = "NR",
  /** Niue. */
  Nu = "NU",
  /** New Zealand. */
  Nz = "NZ",
  /** Oman. */
  Om = "OM",
  /** Panama. */
  Pa = "PA",
  /** Peru. */
  Pe = "PE",
  /** French Polynesia. */
  Pf = "PF",
  /** Papua New Guinea. */
  Pg = "PG",
  /** Philippines. */
  Ph = "PH",
  /** Pakistan. */
  Pk = "PK",
  /** Poland. */
  Pl = "PL",
  /** St. Pierre & Miquelon. */
  Pm = "PM",
  /** Pitcairn Islands. */
  Pn = "PN",
  /** Palestinian Territories. */
  Ps = "PS",
  /** Portugal. */
  Pt = "PT",
  /** Paraguay. */
  Py = "PY",
  /** Qatar. */
  Qa = "QA",
  /** Réunion. */
  Re = "RE",
  /** Romania. */
  Ro = "RO",
  /** Serbia. */
  Rs = "RS",
  /** Russia. */
  Ru = "RU",
  /** Rwanda. */
  Rw = "RW",
  /** Saudi Arabia. */
  Sa = "SA",
  /** Solomon Islands. */
  Sb = "SB",
  /** Seychelles. */
  Sc = "SC",
  /** Sudan. */
  Sd = "SD",
  /** Sweden. */
  Se = "SE",
  /** Singapore. */
  Sg = "SG",
  /** St. Helena. */
  Sh = "SH",
  /** Slovenia. */
  Si = "SI",
  /** Svalbard & Jan Mayen. */
  Sj = "SJ",
  /** Slovakia. */
  Sk = "SK",
  /** Sierra Leone. */
  Sl = "SL",
  /** San Marino. */
  Sm = "SM",
  /** Senegal. */
  Sn = "SN",
  /** Somalia. */
  So = "SO",
  /** Suriname. */
  Sr = "SR",
  /** South Sudan. */
  Ss = "SS",
  /** São Tomé & Príncipe. */
  St = "ST",
  /** El Salvador. */
  Sv = "SV",
  /** Sint Maarten. */
  Sx = "SX",
  /** Syria. */
  Sy = "SY",
  /** Eswatini. */
  Sz = "SZ",
  /** Tristan da Cunha. */
  Ta = "TA",
  /** Turks & Caicos Islands. */
  Tc = "TC",
  /** Chad. */
  Td = "TD",
  /** French Southern Territories. */
  Tf = "TF",
  /** Togo. */
  Tg = "TG",
  /** Thailand. */
  Th = "TH",
  /** Tajikistan. */
  Tj = "TJ",
  /** Tokelau. */
  Tk = "TK",
  /** Timor-Leste. */
  Tl = "TL",
  /** Turkmenistan. */
  Tm = "TM",
  /** Tunisia. */
  Tn = "TN",
  /** Tonga. */
  To = "TO",
  /** Türkiye. */
  Tr = "TR",
  /** Trinidad & Tobago. */
  Tt = "TT",
  /** Tuvalu. */
  Tv = "TV",
  /** Taiwan. */
  Tw = "TW",
  /** Tanzania. */
  Tz = "TZ",
  /** Ukraine. */
  Ua = "UA",
  /** Uganda. */
  Ug = "UG",
  /** U.S. Outlying Islands. */
  Um = "UM",
  /** United States. */
  Us = "US",
  /** Uruguay. */
  Uy = "UY",
  /** Uzbekistan. */
  Uz = "UZ",
  /** Vatican City. */
  Va = "VA",
  /** St. Vincent & Grenadines. */
  Vc = "VC",
  /** Venezuela. */
  Ve = "VE",
  /** British Virgin Islands. */
  Vg = "VG",
  /** Vietnam. */
  Vn = "VN",
  /** Vanuatu. */
  Vu = "VU",
  /** Wallis & Futuna. */
  Wf = "WF",
  /** Samoa. */
  Ws = "WS",
  /** Kosovo. */
  Xk = "XK",
  /** Yemen. */
  Ye = "YE",
  /** Mayotte. */
  Yt = "YT",
  /** South Africa. */
  Za = "ZA",
  /** Zambia. */
  Zm = "ZM",
  /** Zimbabwe. */
  Zw = "ZW",
  /** Unknown Region. */
  Zz = "ZZ",
}

/** The part of the image that should remain after cropping. */
export enum CropRegion {
  /** Keep the bottom of the image. */
  Bottom = "BOTTOM",
  /** Keep the center of the image. */
  Center = "CENTER",
  /** Keep the left of the image. */
  Left = "LEFT",
  /** Keep the right of the image. */
  Right = "RIGHT",
  /** Keep the top of the image. */
  Top = "TOP",
}

/** A currency. */
export type Currency = {
  /** The ISO code of the currency. */
  isoCode: CurrencyCode;
  /** The name of the currency. */
  name: Scalars["String"]["output"];
  /** The symbol of the currency. */
  symbol: Scalars["String"]["output"];
};

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export enum CurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = "AED",
  /** Afghan Afghani (AFN). */
  Afn = "AFN",
  /** Albanian Lek (ALL). */
  All = "ALL",
  /** Armenian Dram (AMD). */
  Amd = "AMD",
  /** Netherlands Antillean Guilder. */
  Ang = "ANG",
  /** Angolan Kwanza (AOA). */
  Aoa = "AOA",
  /** Argentine Pesos (ARS). */
  Ars = "ARS",
  /** Australian Dollars (AUD). */
  Aud = "AUD",
  /** Aruban Florin (AWG). */
  Awg = "AWG",
  /** Azerbaijani Manat (AZN). */
  Azn = "AZN",
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = "BAM",
  /** Barbadian Dollar (BBD). */
  Bbd = "BBD",
  /** Bangladesh Taka (BDT). */
  Bdt = "BDT",
  /** Bulgarian Lev (BGN). */
  Bgn = "BGN",
  /** Bahraini Dinar (BHD). */
  Bhd = "BHD",
  /** Burundian Franc (BIF). */
  Bif = "BIF",
  /** Bermudian Dollar (BMD). */
  Bmd = "BMD",
  /** Brunei Dollar (BND). */
  Bnd = "BND",
  /** Bolivian Boliviano (BOB). */
  Bob = "BOB",
  /** Brazilian Real (BRL). */
  Brl = "BRL",
  /** Bahamian Dollar (BSD). */
  Bsd = "BSD",
  /** Bhutanese Ngultrum (BTN). */
  Btn = "BTN",
  /** Botswana Pula (BWP). */
  Bwp = "BWP",
  /** Belarusian Ruble (BYN). */
  Byn = "BYN",
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = "BYR",
  /** Belize Dollar (BZD). */
  Bzd = "BZD",
  /** Canadian Dollars (CAD). */
  Cad = "CAD",
  /** Congolese franc (CDF). */
  Cdf = "CDF",
  /** Swiss Francs (CHF). */
  Chf = "CHF",
  /** Chilean Peso (CLP). */
  Clp = "CLP",
  /** Chinese Yuan Renminbi (CNY). */
  Cny = "CNY",
  /** Colombian Peso (COP). */
  Cop = "COP",
  /** Costa Rican Colones (CRC). */
  Crc = "CRC",
  /** Cape Verdean escudo (CVE). */
  Cve = "CVE",
  /** Czech Koruny (CZK). */
  Czk = "CZK",
  /** Djiboutian Franc (DJF). */
  Djf = "DJF",
  /** Danish Kroner (DKK). */
  Dkk = "DKK",
  /** Dominican Peso (DOP). */
  Dop = "DOP",
  /** Algerian Dinar (DZD). */
  Dzd = "DZD",
  /** Egyptian Pound (EGP). */
  Egp = "EGP",
  /** Eritrean Nakfa (ERN). */
  Ern = "ERN",
  /** Ethiopian Birr (ETB). */
  Etb = "ETB",
  /** Euro (EUR). */
  Eur = "EUR",
  /** Fijian Dollars (FJD). */
  Fjd = "FJD",
  /** Falkland Islands Pounds (FKP). */
  Fkp = "FKP",
  /** United Kingdom Pounds (GBP). */
  Gbp = "GBP",
  /** Georgian Lari (GEL). */
  Gel = "GEL",
  /** Ghanaian Cedi (GHS). */
  Ghs = "GHS",
  /** Gibraltar Pounds (GIP). */
  Gip = "GIP",
  /** Gambian Dalasi (GMD). */
  Gmd = "GMD",
  /** Guinean Franc (GNF). */
  Gnf = "GNF",
  /** Guatemalan Quetzal (GTQ). */
  Gtq = "GTQ",
  /** Guyanese Dollar (GYD). */
  Gyd = "GYD",
  /** Hong Kong Dollars (HKD). */
  Hkd = "HKD",
  /** Honduran Lempira (HNL). */
  Hnl = "HNL",
  /** Croatian Kuna (HRK). */
  Hrk = "HRK",
  /** Haitian Gourde (HTG). */
  Htg = "HTG",
  /** Hungarian Forint (HUF). */
  Huf = "HUF",
  /** Indonesian Rupiah (IDR). */
  Idr = "IDR",
  /** Israeli New Shekel (NIS). */
  Ils = "ILS",
  /** Indian Rupees (INR). */
  Inr = "INR",
  /** Iraqi Dinar (IQD). */
  Iqd = "IQD",
  /** Iranian Rial (IRR). */
  Irr = "IRR",
  /** Icelandic Kronur (ISK). */
  Isk = "ISK",
  /** Jersey Pound. */
  Jep = "JEP",
  /** Jamaican Dollars (JMD). */
  Jmd = "JMD",
  /** Jordanian Dinar (JOD). */
  Jod = "JOD",
  /** Japanese Yen (JPY). */
  Jpy = "JPY",
  /** Kenyan Shilling (KES). */
  Kes = "KES",
  /** Kyrgyzstani Som (KGS). */
  Kgs = "KGS",
  /** Cambodian Riel. */
  Khr = "KHR",
  /** Kiribati Dollar (KID). */
  Kid = "KID",
  /** Comorian Franc (KMF). */
  Kmf = "KMF",
  /** South Korean Won (KRW). */
  Krw = "KRW",
  /** Kuwaiti Dinar (KWD). */
  Kwd = "KWD",
  /** Cayman Dollars (KYD). */
  Kyd = "KYD",
  /** Kazakhstani Tenge (KZT). */
  Kzt = "KZT",
  /** Laotian Kip (LAK). */
  Lak = "LAK",
  /** Lebanese Pounds (LBP). */
  Lbp = "LBP",
  /** Sri Lankan Rupees (LKR). */
  Lkr = "LKR",
  /** Liberian Dollar (LRD). */
  Lrd = "LRD",
  /** Lesotho Loti (LSL). */
  Lsl = "LSL",
  /** Lithuanian Litai (LTL). */
  Ltl = "LTL",
  /** Latvian Lati (LVL). */
  Lvl = "LVL",
  /** Libyan Dinar (LYD). */
  Lyd = "LYD",
  /** Moroccan Dirham. */
  Mad = "MAD",
  /** Moldovan Leu (MDL). */
  Mdl = "MDL",
  /** Malagasy Ariary (MGA). */
  Mga = "MGA",
  /** Macedonia Denar (MKD). */
  Mkd = "MKD",
  /** Burmese Kyat (MMK). */
  Mmk = "MMK",
  /** Mongolian Tugrik. */
  Mnt = "MNT",
  /** Macanese Pataca (MOP). */
  Mop = "MOP",
  /** Mauritanian Ouguiya (MRU). */
  Mru = "MRU",
  /** Mauritian Rupee (MUR). */
  Mur = "MUR",
  /** Maldivian Rufiyaa (MVR). */
  Mvr = "MVR",
  /** Malawian Kwacha (MWK). */
  Mwk = "MWK",
  /** Mexican Pesos (MXN). */
  Mxn = "MXN",
  /** Malaysian Ringgits (MYR). */
  Myr = "MYR",
  /** Mozambican Metical. */
  Mzn = "MZN",
  /** Namibian Dollar. */
  Nad = "NAD",
  /** Nigerian Naira (NGN). */
  Ngn = "NGN",
  /** Nicaraguan Córdoba (NIO). */
  Nio = "NIO",
  /** Norwegian Kroner (NOK). */
  Nok = "NOK",
  /** Nepalese Rupee (NPR). */
  Npr = "NPR",
  /** New Zealand Dollars (NZD). */
  Nzd = "NZD",
  /** Omani Rial (OMR). */
  Omr = "OMR",
  /** Panamian Balboa (PAB). */
  Pab = "PAB",
  /** Peruvian Nuevo Sol (PEN). */
  Pen = "PEN",
  /** Papua New Guinean Kina (PGK). */
  Pgk = "PGK",
  /** Philippine Peso (PHP). */
  Php = "PHP",
  /** Pakistani Rupee (PKR). */
  Pkr = "PKR",
  /** Polish Zlotych (PLN). */
  Pln = "PLN",
  /** Paraguayan Guarani (PYG). */
  Pyg = "PYG",
  /** Qatari Rial (QAR). */
  Qar = "QAR",
  /** Romanian Lei (RON). */
  Ron = "RON",
  /** Serbian dinar (RSD). */
  Rsd = "RSD",
  /** Russian Rubles (RUB). */
  Rub = "RUB",
  /** Rwandan Franc (RWF). */
  Rwf = "RWF",
  /** Saudi Riyal (SAR). */
  Sar = "SAR",
  /** Solomon Islands Dollar (SBD). */
  Sbd = "SBD",
  /** Seychellois Rupee (SCR). */
  Scr = "SCR",
  /** Sudanese Pound (SDG). */
  Sdg = "SDG",
  /** Swedish Kronor (SEK). */
  Sek = "SEK",
  /** Singapore Dollars (SGD). */
  Sgd = "SGD",
  /** Saint Helena Pounds (SHP). */
  Shp = "SHP",
  /** Sierra Leonean Leone (SLL). */
  Sll = "SLL",
  /** Somali Shilling (SOS). */
  Sos = "SOS",
  /** Surinamese Dollar (SRD). */
  Srd = "SRD",
  /** South Sudanese Pound (SSP). */
  Ssp = "SSP",
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = "STD",
  /** Sao Tome And Principe Dobra (STN). */
  Stn = "STN",
  /** Syrian Pound (SYP). */
  Syp = "SYP",
  /** Swazi Lilangeni (SZL). */
  Szl = "SZL",
  /** Thai baht (THB). */
  Thb = "THB",
  /** Tajikistani Somoni (TJS). */
  Tjs = "TJS",
  /** Turkmenistani Manat (TMT). */
  Tmt = "TMT",
  /** Tunisian Dinar (TND). */
  Tnd = "TND",
  /** Tongan Pa'anga (TOP). */
  Top = "TOP",
  /** Turkish Lira (TRY). */
  Try = "TRY",
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = "TTD",
  /** Taiwan Dollars (TWD). */
  Twd = "TWD",
  /** Tanzanian Shilling (TZS). */
  Tzs = "TZS",
  /** Ukrainian Hryvnia (UAH). */
  Uah = "UAH",
  /** Ugandan Shilling (UGX). */
  Ugx = "UGX",
  /** United States Dollars (USD). */
  Usd = "USD",
  /** Uruguayan Pesos (UYU). */
  Uyu = "UYU",
  /** Uzbekistan som (UZS). */
  Uzs = "UZS",
  /** Venezuelan Bolivares (VED). */
  Ved = "VED",
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = "VEF",
  /** Venezuelan Bolivares Soberanos (VES). */
  Ves = "VES",
  /** Vietnamese đồng (VND). */
  Vnd = "VND",
  /** Vanuatu Vatu (VUV). */
  Vuv = "VUV",
  /** Samoan Tala (WST). */
  Wst = "WST",
  /** Central African CFA Franc (XAF). */
  Xaf = "XAF",
  /** East Caribbean Dollar (XCD). */
  Xcd = "XCD",
  /** West African CFA franc (XOF). */
  Xof = "XOF",
  /** CFP Franc (XPF). */
  Xpf = "XPF",
  /** Unrecognized currency. */
  Xxx = "XXX",
  /** Yemeni Rial (YER). */
  Yer = "YER",
  /** South African Rand (ZAR). */
  Zar = "ZAR",
  /** Zambian Kwacha (ZMW). */
  Zmw = "ZMW",
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type Customer = HasMetafields & {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: Scalars["Boolean"]["output"];
  /** A list of addresses for the customer. */
  addresses: MailingAddressConnection;
  /** The date and time when the customer was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The customer’s default address. */
  defaultAddress: Maybe<MailingAddress>;
  /** The customer’s name, email or phone number. */
  displayName: Scalars["String"]["output"];
  /** The customer’s email address. */
  email: Maybe<Scalars["String"]["output"]>;
  /** The customer’s first name. */
  firstName: Maybe<Scalars["String"]["output"]>;
  /** A unique ID for the customer. */
  id: Scalars["ID"]["output"];
  /** The customer’s last name. */
  lastName: Maybe<Scalars["String"]["output"]>;
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
  /** The number of orders that the customer has made at the store in their lifetime. */
  numberOfOrders: Scalars["UnsignedInt64"]["output"];
  /** The orders associated with the customer. */
  orders: OrderConnection;
  /** The customer’s phone number. */
  phone: Maybe<Scalars["String"]["output"]>;
  /**
   * A comma separated list of tags that have been added to the customer.
   * Additional access scope required: unauthenticated_read_customer_tags.
   *
   */
  tags: Array<Scalars["String"]["output"]>;
  /** The date and time when the customer information was updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerAddressesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerOrdersArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<OrderSortKeys>;
};

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export type CustomerAccessToken = {
  /** The customer’s access token. */
  accessToken: Scalars["String"]["output"];
  /** The date and time when the customer access token expires. */
  expiresAt: Scalars["DateTime"]["output"];
};

/** The input fields required to create a customer access token. */
export type CustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars["String"]["input"];
  /** The login password to be used by the customer. */
  password: Scalars["String"]["input"];
};

/** Return type for `customerAccessTokenCreate` mutation. */
export type CustomerAccessTokenCreatePayload = {
  /** The newly created customer access token object. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAccessTokenCreateWithMultipass` mutation. */
export type CustomerAccessTokenCreateWithMultipassPayload = {
  /** An access token object associated with the customer. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
};

/** Return type for `customerAccessTokenDelete` mutation. */
export type CustomerAccessTokenDeletePayload = {
  /** The destroyed access token. */
  deletedAccessToken: Maybe<Scalars["String"]["output"]>;
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId: Maybe<Scalars["String"]["output"]>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserError>;
};

/** Return type for `customerAccessTokenRenew` mutation. */
export type CustomerAccessTokenRenewPayload = {
  /** The renewed customer access token object. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserError>;
};

/** Return type for `customerActivateByUrl` mutation. */
export type CustomerActivateByUrlPayload = {
  /** The customer that was activated. */
  customer: Maybe<Customer>;
  /** A new customer access token for the customer. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
};

/** The input fields to activate a customer. */
export type CustomerActivateInput = {
  /** The activation token required to activate the customer. */
  activationToken: Scalars["String"]["input"];
  /** New password that will be set during activation. */
  password: Scalars["String"]["input"];
};

/** Return type for `customerActivate` mutation. */
export type CustomerActivatePayload = {
  /** The customer object. */
  customer: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressCreate` mutation. */
export type CustomerAddressCreatePayload = {
  /** The new customer address object. */
  customerAddress: Maybe<MailingAddress>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressDelete` mutation. */
export type CustomerAddressDeletePayload = {
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /** ID of the deleted customer address. */
  deletedCustomerAddressId: Maybe<Scalars["String"]["output"]>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressUpdate` mutation. */
export type CustomerAddressUpdatePayload = {
  /** The customer’s updated mailing address. */
  customerAddress: Maybe<MailingAddress>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to create a new customer. */
export type CustomerCreateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The customer’s email. */
  email: Scalars["String"]["input"];
  /** The customer’s first name. */
  firstName: InputMaybe<Scalars["String"]["input"]>;
  /** The customer’s last name. */
  lastName: InputMaybe<Scalars["String"]["input"]>;
  /** The login password used by the customer. */
  password: Scalars["String"]["input"];
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone: InputMaybe<Scalars["String"]["input"]>;
};

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = {
  /** The created customer object. */
  customer: Maybe<Customer>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerDefaultAddressUpdate` mutation. */
export type CustomerDefaultAddressUpdatePayload = {
  /** The updated customer object. */
  customer: Maybe<Customer>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Possible error codes that can be returned by `CustomerUserError`. */
export enum CustomerErrorCode {
  /** Customer already enabled. */
  AlreadyEnabled = "ALREADY_ENABLED",
  /** Input email contains an invalid domain name. */
  BadDomain = "BAD_DOMAIN",
  /** The input value is blank. */
  Blank = "BLANK",
  /** Input contains HTML tags. */
  ContainsHtmlTags = "CONTAINS_HTML_TAGS",
  /** Input contains URL. */
  ContainsUrl = "CONTAINS_URL",
  /** Customer is disabled. */
  CustomerDisabled = "CUSTOMER_DISABLED",
  /** The input value is invalid. */
  Invalid = "INVALID",
  /** Multipass token is not valid. */
  InvalidMultipassRequest = "INVALID_MULTIPASS_REQUEST",
  /** Address does not exist. */
  NotFound = "NOT_FOUND",
  /** Input password starts or ends with whitespace. */
  PasswordStartsOrEndsWithWhitespace = "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE",
  /** The input value is already taken. */
  Taken = "TAKEN",
  /** Invalid activation token. */
  TokenInvalid = "TOKEN_INVALID",
  /** The input value is too long. */
  TooLong = "TOO_LONG",
  /** The input value is too short. */
  TooShort = "TOO_SHORT",
  /** Unidentified customer. */
  UnidentifiedCustomer = "UNIDENTIFIED_CUSTOMER",
}

/** Return type for `customerRecover` mutation. */
export type CustomerRecoverPayload = {
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerResetByUrl` mutation. */
export type CustomerResetByUrlPayload = {
  /** The customer object which was reset. */
  customer: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to reset a customer's password. */
export type CustomerResetInput = {
  /** New password that will be set as part of the reset password process. */
  password: Scalars["String"]["input"];
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars["String"]["input"];
};

/** Return type for `customerReset` mutation. */
export type CustomerResetPayload = {
  /** The customer object which was reset. */
  customer: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to update the Customer information. */
export type CustomerUpdateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The customer’s email. */
  email: InputMaybe<Scalars["String"]["input"]>;
  /** The customer’s first name. */
  firstName: InputMaybe<Scalars["String"]["input"]>;
  /** The customer’s last name. */
  lastName: InputMaybe<Scalars["String"]["input"]>;
  /** The login password used by the customer. */
  password: InputMaybe<Scalars["String"]["input"]>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   *
   */
  phone: InputMaybe<Scalars["String"]["input"]>;
};

/** Return type for `customerUpdate` mutation. */
export type CustomerUpdatePayload = {
  /** The updated customer object. */
  customer: Maybe<Customer>;
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   *
   */
  customerAccessToken: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Represents an error that happens during execution of a customer mutation. */
export type CustomerUserError = DisplayableError & {
  /** The error code. */
  code: Maybe<CustomerErrorCode>;
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/** A delivery address of the buyer that is interacting with the cart. */
export type DeliveryAddress = MailingAddress;

/**
 * The input fields for delivery address preferences.
 *
 */
export type DeliveryAddressInput = {
  /**
   * The ID of a customer address that is associated with the buyer that is interacting with the cart.
   *
   */
  customerAddressId: InputMaybe<Scalars["ID"]["input"]>;
  /** A delivery address preference of a buyer that is interacting with the cart. */
  deliveryAddress: InputMaybe<MailingAddressInput>;
  /** Defines what kind of address validation is requested. */
  deliveryAddressValidationStrategy: InputMaybe<DeliveryAddressValidationStrategy>;
  /**
   * Whether the given delivery address is considered to be a one-time use address. One-time use addresses do not
   * get persisted to the buyer's personal addresses when checking out.
   *
   */
  oneTimeUse: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * Defines the types of available validation strategies for delivery addresses.
 *
 */
export enum DeliveryAddressValidationStrategy {
  /** Only the country code is validated. */
  CountryCodeOnly = "COUNTRY_CODE_ONLY",
  /**
   * Strict validation is performed, i.e. all fields in the address are validated
   * according to Shopify's checkout rules. If the address fails validation, the cart will not be updated.
   *
   */
  Strict = "STRICT",
}

/** List of different delivery method types. */
export enum DeliveryMethodType {
  /** Local Delivery. */
  Local = "LOCAL",
  /** None. */
  None = "NONE",
  /** Shipping to a Pickup Point. */
  PickupPoint = "PICKUP_POINT",
  /** Local Pickup. */
  PickUp = "PICK_UP",
  /** Retail. */
  Retail = "RETAIL",
  /** Shipping. */
  Shipping = "SHIPPING",
}

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum DigitalWallet {
  /** Android Pay. */
  AndroidPay = "ANDROID_PAY",
  /** Apple Pay. */
  ApplePay = "APPLE_PAY",
  /** Google Pay. */
  GooglePay = "GOOGLE_PAY",
  /** Shopify Pay. */
  ShopifyPay = "SHOPIFY_PAY",
}

/**
 * An amount discounting the line that has been allocated by a discount.
 *
 */
export type DiscountAllocation = {
  /** Amount of discount allocated. */
  allocatedAmount: MoneyV2;
  /** The discount this allocated amount originated from. */
  discountApplication: DiscountApplication;
};

/**
 * Discount applications capture the intentions of a discount source at
 * the time of application.
 *
 */
export type DiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** The method by which the discount's value is allocated onto its entitled lines. */
export enum DiscountApplicationAllocationMethod {
  /** The value is spread across all entitled lines. */
  Across = "ACROSS",
  /** The value is applied onto every entitled line. */
  Each = "EACH",
  /**
   * The value is specifically applied onto a particular line.
   * @deprecated Use ACROSS instead.
   */
  One = "ONE",
}

/**
 * An auto-generated type for paginating through multiple DiscountApplications.
 *
 */
export type DiscountApplicationConnection = {
  /** A list of edges. */
  edges: Array<DiscountApplicationEdge>;
  /** A list of the nodes contained in DiscountApplicationEdge. */
  nodes: Array<DiscountApplication>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one DiscountApplication and a cursor during pagination.
 *
 */
export type DiscountApplicationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of DiscountApplicationEdge. */
  node: DiscountApplication;
};

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export enum DiscountApplicationTargetSelection {
  /** The discount is allocated onto all the lines. */
  All = "ALL",
  /** The discount is allocated onto only the lines that it's entitled for. */
  Entitled = "ENTITLED",
  /** The discount is allocated onto explicitly chosen lines. */
  Explicit = "EXPLICIT",
}

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export enum DiscountApplicationTargetType {
  /** The discount applies onto line items. */
  LineItem = "LINE_ITEM",
  /** The discount applies onto shipping lines. */
  ShippingLine = "SHIPPING_LINE",
}

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 *
 */
export type DiscountCodeApplication = DiscountApplication & {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Specifies whether the discount code was applied successfully. */
  applicable: Scalars["Boolean"]["output"];
  /** The string identifying the discount code that was used at the time of application. */
  code: Scalars["String"]["output"];
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** Represents an error in the input of a mutation. */
export type DisplayableError = {
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/** Represents a web address. */
export type Domain = {
  /** The host name of the domain (eg: `example.com`). */
  host: Scalars["String"]["output"];
  /** Whether SSL is enabled or not. */
  sslEnabled: Scalars["Boolean"]["output"];
  /** The URL of the domain (eg: `https://example.com`). */
  url: Scalars["URL"]["output"];
};

/** Represents a video hosted outside of Shopify. */
export type ExternalVideo = Media &
  Node & {
    /** A word or phrase to share the nature or contents of a media. */
    alt: Maybe<Scalars["String"]["output"]>;
    /** The embed URL of the video for the respective host. */
    embedUrl: Scalars["URL"]["output"];
    /**
     * The URL.
     * @deprecated Use `originUrl` instead.
     */
    embeddedUrl: Scalars["URL"]["output"];
    /** The host of the external video. */
    host: MediaHost;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The origin URL of the video on the respective host. */
    originUrl: Scalars["URL"]["output"];
    /** The presentation for a media. */
    presentation: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage: Maybe<Image>;
  };

/** A filter that is supported on the parent field. */
export type Filter = {
  /** A unique identifier. */
  id: Scalars["String"]["output"];
  /** A human-friendly string for this filter. */
  label: Scalars["String"]["output"];
  /**
   * Describes how to present the filter values.
   * Returns a value only for filters of type `LIST`. Returns null for other types.
   *
   */
  presentation: Maybe<FilterPresentation>;
  /** An enumeration that denotes the type of data this filter represents. */
  type: FilterType;
  /** The list of values for this filter. */
  values: Array<FilterValue>;
};

/**
 * Defines how to present the filter values, specifies the presentation of the filter.
 *
 */
export enum FilterPresentation {
  /** Image presentation, filter values display an image. */
  Image = "IMAGE",
  /** Swatch presentation, filter values display color or image patterns. */
  Swatch = "SWATCH",
  /** Text presentation, no additional visual display for filter values. */
  Text = "TEXT",
}

/**
 * The type of data that the filter group represents.
 *
 * For more information, refer to [Filter products in a collection with the Storefront API]
 * (https://shopify.dev/custom-storefronts/products-collections/filter-products).
 *
 */
export enum FilterType {
  /** A boolean value. */
  Boolean = "BOOLEAN",
  /** A list of selectable values. */
  List = "LIST",
  /** A range of prices. */
  PriceRange = "PRICE_RANGE",
}

/** A selectable value within a filter. */
export type FilterValue = {
  /** The number of results that match this filter value. */
  count: Scalars["Int"]["output"];
  /** A unique identifier. */
  id: Scalars["String"]["output"];
  /** The visual representation when the filter's presentation is `IMAGE`. */
  image: Maybe<MediaImage>;
  /**
   * An input object that can be used to filter by this value on the parent field.
   *
   * The value is provided as a helper for building dynamic filtering UI. For
   * example, if you have a list of selected `FilterValue` objects, you can combine
   * their respective `input` values to use in a subsequent query.
   *
   */
  input: Scalars["JSON"]["output"];
  /** A human-friendly string for this filter value. */
  label: Scalars["String"]["output"];
  /** The visual representation when the filter's presentation is `SWATCH`. */
  swatch: Maybe<Swatch>;
};

/** Represents a single fulfillment in an order. */
export type Fulfillment = {
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: FulfillmentLineItemConnection;
  /** The name of the tracking company. */
  trackingCompany: Maybe<Scalars["String"]["output"]>;
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   *
   */
  trackingInfo: Array<FulfillmentTrackingInfo>;
};

/** Represents a single fulfillment in an order. */
export type FulfillmentFulfillmentLineItemsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a single fulfillment in an order. */
export type FulfillmentTrackingInfoArgs = {
  first: InputMaybe<Scalars["Int"]["input"]>;
};

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export type FulfillmentLineItem = {
  /** The associated order's line item. */
  lineItem: OrderLineItem;
  /** The amount fulfilled in this fulfillment. */
  quantity: Scalars["Int"]["output"];
};

/**
 * An auto-generated type for paginating through multiple FulfillmentLineItems.
 *
 */
export type FulfillmentLineItemConnection = {
  /** A list of edges. */
  edges: Array<FulfillmentLineItemEdge>;
  /** A list of the nodes contained in FulfillmentLineItemEdge. */
  nodes: Array<FulfillmentLineItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination.
 *
 */
export type FulfillmentLineItemEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of FulfillmentLineItemEdge. */
  node: FulfillmentLineItem;
};

/** Tracking information associated with the fulfillment. */
export type FulfillmentTrackingInfo = {
  /** The tracking number of the fulfillment. */
  number: Maybe<Scalars["String"]["output"]>;
  /** The URL to track the fulfillment. */
  url: Maybe<Scalars["URL"]["output"]>;
};

/** The generic file resource lets you manage files in a merchant’s store. Generic files include any file that doesn’t fit into a designated type such as image or video. Example: PDF, JSON. */
export type GenericFile = Node & {
  /** A word or phrase to indicate the contents of a file. */
  alt: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The MIME type of the file. */
  mimeType: Maybe<Scalars["String"]["output"]>;
  /** The size of the original file in bytes. */
  originalFileSize: Maybe<Scalars["Int"]["output"]>;
  /** The preview image for the file. */
  previewImage: Maybe<Image>;
  /** The URL of the file. */
  url: Maybe<Scalars["URL"]["output"]>;
};

/** The input fields used to specify a geographical location. */
export type GeoCoordinateInput = {
  /** The coordinate's latitude value. */
  latitude: Scalars["Float"]["input"];
  /** The coordinate's longitude value. */
  longitude: Scalars["Float"]["input"];
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafields = {
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The input fields to identify a metafield on an owner resource by namespace and key. */
export type HasMetafieldsIdentifier = {
  /** The identifier for the metafield. */
  key: Scalars["String"]["input"];
  /** The container the metafield belongs to. If omitted, the app-reserved namespace will be used. */
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents an image resource. */
export type Image = {
  /** A word or phrase to share the nature or contents of an image. */
  altText: Maybe<Scalars["String"]["output"]>;
  /** The original height of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  height: Maybe<Scalars["Int"]["output"]>;
  /** A unique ID for the image. */
  id: Maybe<Scalars["ID"]["output"]>;
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   *
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars["URL"]["output"];
  /**
   * The location of the image as a URL.
   * @deprecated Use `url` instead.
   */
  src: Scalars["URL"]["output"];
  /**
   * The ThumbHash of the image.
   *
   * Useful to display placeholder images while the original image is loading.
   *
   * See https://evanw.github.io/thumbhash/ for details on how to use it.
   *
   */
  thumbhash: Maybe<Scalars["String"]["output"]>;
  /**
   * The location of the transformed image as a URL.
   *
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type doesn't support will be ignored.
   *
   * @deprecated Use `url(transform:)` instead
   */
  transformedSrc: Scalars["URL"]["output"];
  /**
   * The location of the image as a URL.
   *
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   *
   * All transformation options are considered "best-effort". Any transformation that the original image type doesn't support will be ignored.
   *
   * If you need multiple variations of the same image, then you can use [GraphQL aliases](https://graphql.org/learn/queries/#aliases).
   *
   */
  url: Scalars["URL"]["output"];
  /** The original width of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  width: Maybe<Scalars["Int"]["output"]>;
};

/** Represents an image resource. */
export type ImageTransformedSrcArgs = {
  crop: InputMaybe<CropRegion>;
  maxHeight: InputMaybe<Scalars["Int"]["input"]>;
  maxWidth: InputMaybe<Scalars["Int"]["input"]>;
  preferredContentType: InputMaybe<ImageContentType>;
  scale?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Represents an image resource. */
export type ImageUrlArgs = {
  transform: InputMaybe<ImageTransformInput>;
};

/**
 * An auto-generated type for paginating through multiple Images.
 *
 */
export type ImageConnection = {
  /** A list of edges. */
  edges: Array<ImageEdge>;
  /** A list of the nodes contained in ImageEdge. */
  nodes: Array<Image>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** List of supported image content types. */
export enum ImageContentType {
  /** A JPG image. */
  Jpg = "JPG",
  /** A PNG image. */
  Png = "PNG",
  /** A WEBP image. */
  Webp = "WEBP",
}

/**
 * An auto-generated type which holds one Image and a cursor during pagination.
 *
 */
export type ImageEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of ImageEdge. */
  node: Image;
};

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that
 * the original image type doesn't support will be ignored.
 *
 */
export type ImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields,
   * where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{
   * maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   *
   */
  crop: InputMaybe<CropRegion>;
  /**
   * Image height in pixels between 1 and 5760.
   *
   */
  maxHeight: InputMaybe<Scalars["Int"]["input"]>;
  /**
   * Image width in pixels between 1 and 5760.
   *
   */
  maxWidth: InputMaybe<Scalars["Int"]["input"]>;
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   *
   */
  preferredContentType: InputMaybe<ImageContentType>;
  /**
   * Image size multiplier for high-resolution retina displays. Must be within 1..3.
   *
   */
  scale: InputMaybe<Scalars["Int"]["input"]>;
};

/** Provide details about the contexts influenced by the @inContext directive on a field. */
export type InContextAnnotation = {
  description: Scalars["String"]["output"];
  type: InContextAnnotationType;
};

/** This gives information about the type of context that impacts a field. For example, for a query with @inContext(language: "EN"), the type would point to the name: LanguageCode and kind: ENUM. */
export type InContextAnnotationType = {
  kind: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

/** A language. */
export type Language = {
  /** The name of the language in the language itself. If the language uses capitalization, it is capitalized for a mid-sentence position. */
  endonymName: Scalars["String"]["output"];
  /** The ISO code. */
  isoCode: LanguageCode;
  /** The name of the language in the current language. */
  name: Scalars["String"]["output"];
};

/** Language codes supported by Shopify. */
export enum LanguageCode {
  /** Afrikaans. */
  Af = "AF",
  /** Akan. */
  Ak = "AK",
  /** Amharic. */
  Am = "AM",
  /** Arabic. */
  Ar = "AR",
  /** Assamese. */
  As = "AS",
  /** Azerbaijani. */
  Az = "AZ",
  /** Belarusian. */
  Be = "BE",
  /** Bulgarian. */
  Bg = "BG",
  /** Bambara. */
  Bm = "BM",
  /** Bangla. */
  Bn = "BN",
  /** Tibetan. */
  Bo = "BO",
  /** Breton. */
  Br = "BR",
  /** Bosnian. */
  Bs = "BS",
  /** Catalan. */
  Ca = "CA",
  /** Chechen. */
  Ce = "CE",
  /** Central Kurdish. */
  Ckb = "CKB",
  /** Czech. */
  Cs = "CS",
  /** Church Slavic. */
  Cu = "CU",
  /** Welsh. */
  Cy = "CY",
  /** Danish. */
  Da = "DA",
  /** German. */
  De = "DE",
  /** Dzongkha. */
  Dz = "DZ",
  /** Ewe. */
  Ee = "EE",
  /** Greek. */
  El = "EL",
  /** English. */
  En = "EN",
  /** Esperanto. */
  Eo = "EO",
  /** Spanish. */
  Es = "ES",
  /** Estonian. */
  Et = "ET",
  /** Basque. */
  Eu = "EU",
  /** Persian. */
  Fa = "FA",
  /** Fulah. */
  Ff = "FF",
  /** Finnish. */
  Fi = "FI",
  /** Filipino. */
  Fil = "FIL",
  /** Faroese. */
  Fo = "FO",
  /** French. */
  Fr = "FR",
  /** Western Frisian. */
  Fy = "FY",
  /** Irish. */
  Ga = "GA",
  /** Scottish Gaelic. */
  Gd = "GD",
  /** Galician. */
  Gl = "GL",
  /** Gujarati. */
  Gu = "GU",
  /** Manx. */
  Gv = "GV",
  /** Hausa. */
  Ha = "HA",
  /** Hebrew. */
  He = "HE",
  /** Hindi. */
  Hi = "HI",
  /** Croatian. */
  Hr = "HR",
  /** Hungarian. */
  Hu = "HU",
  /** Armenian. */
  Hy = "HY",
  /** Interlingua. */
  Ia = "IA",
  /** Indonesian. */
  Id = "ID",
  /** Igbo. */
  Ig = "IG",
  /** Sichuan Yi. */
  Ii = "II",
  /** Icelandic. */
  Is = "IS",
  /** Italian. */
  It = "IT",
  /** Japanese. */
  Ja = "JA",
  /** Javanese. */
  Jv = "JV",
  /** Georgian. */
  Ka = "KA",
  /** Kikuyu. */
  Ki = "KI",
  /** Kazakh. */
  Kk = "KK",
  /** Kalaallisut. */
  Kl = "KL",
  /** Khmer. */
  Km = "KM",
  /** Kannada. */
  Kn = "KN",
  /** Korean. */
  Ko = "KO",
  /** Kashmiri. */
  Ks = "KS",
  /** Kurdish. */
  Ku = "KU",
  /** Cornish. */
  Kw = "KW",
  /** Kyrgyz. */
  Ky = "KY",
  /** Latin. */
  La = "LA",
  /** Luxembourgish. */
  Lb = "LB",
  /** Ganda. */
  Lg = "LG",
  /** Lingala. */
  Ln = "LN",
  /** Lao. */
  Lo = "LO",
  /** Lithuanian. */
  Lt = "LT",
  /** Luba-Katanga. */
  Lu = "LU",
  /** Latvian. */
  Lv = "LV",
  /** Malagasy. */
  Mg = "MG",
  /** Māori. */
  Mi = "MI",
  /** Macedonian. */
  Mk = "MK",
  /** Malayalam. */
  Ml = "ML",
  /** Mongolian. */
  Mn = "MN",
  /** Moldavian. */
  Mo = "MO",
  /** Marathi. */
  Mr = "MR",
  /** Malay. */
  Ms = "MS",
  /** Maltese. */
  Mt = "MT",
  /** Burmese. */
  My = "MY",
  /** Norwegian (Bokmål). */
  Nb = "NB",
  /** North Ndebele. */
  Nd = "ND",
  /** Nepali. */
  Ne = "NE",
  /** Dutch. */
  Nl = "NL",
  /** Norwegian Nynorsk. */
  Nn = "NN",
  /** Norwegian. */
  No = "NO",
  /** Oromo. */
  Om = "OM",
  /** Odia. */
  Or = "OR",
  /** Ossetic. */
  Os = "OS",
  /** Punjabi. */
  Pa = "PA",
  /** Polish. */
  Pl = "PL",
  /** Pashto. */
  Ps = "PS",
  /** Portuguese. */
  Pt = "PT",
  /** Portuguese (Brazil). */
  PtBr = "PT_BR",
  /** Portuguese (Portugal). */
  PtPt = "PT_PT",
  /** Quechua. */
  Qu = "QU",
  /** Romansh. */
  Rm = "RM",
  /** Rundi. */
  Rn = "RN",
  /** Romanian. */
  Ro = "RO",
  /** Russian. */
  Ru = "RU",
  /** Kinyarwanda. */
  Rw = "RW",
  /** Sanskrit. */
  Sa = "SA",
  /** Sardinian. */
  Sc = "SC",
  /** Sindhi. */
  Sd = "SD",
  /** Northern Sami. */
  Se = "SE",
  /** Sango. */
  Sg = "SG",
  /** Serbo-Croatian. */
  Sh = "SH",
  /** Sinhala. */
  Si = "SI",
  /** Slovak. */
  Sk = "SK",
  /** Slovenian. */
  Sl = "SL",
  /** Shona. */
  Sn = "SN",
  /** Somali. */
  So = "SO",
  /** Albanian. */
  Sq = "SQ",
  /** Serbian. */
  Sr = "SR",
  /** Sundanese. */
  Su = "SU",
  /** Swedish. */
  Sv = "SV",
  /** Swahili. */
  Sw = "SW",
  /** Tamil. */
  Ta = "TA",
  /** Telugu. */
  Te = "TE",
  /** Tajik. */
  Tg = "TG",
  /** Thai. */
  Th = "TH",
  /** Tigrinya. */
  Ti = "TI",
  /** Turkmen. */
  Tk = "TK",
  /** Tongan. */
  To = "TO",
  /** Turkish. */
  Tr = "TR",
  /** Tatar. */
  Tt = "TT",
  /** Uyghur. */
  Ug = "UG",
  /** Ukrainian. */
  Uk = "UK",
  /** Urdu. */
  Ur = "UR",
  /** Uzbek. */
  Uz = "UZ",
  /** Vietnamese. */
  Vi = "VI",
  /** Volapük. */
  Vo = "VO",
  /** Wolof. */
  Wo = "WO",
  /** Xhosa. */
  Xh = "XH",
  /** Yiddish. */
  Yi = "YI",
  /** Yoruba. */
  Yo = "YO",
  /** Chinese. */
  Zh = "ZH",
  /** Chinese (Simplified). */
  ZhCn = "ZH_CN",
  /** Chinese (Traditional). */
  ZhTw = "ZH_TW",
  /** Zulu. */
  Zu = "ZU",
}

/** Information about the localized experiences configured for the shop. */
export type Localization = {
  /** The list of countries with enabled localized experiences. */
  availableCountries: Array<Country>;
  /** The list of languages available for the active country. */
  availableLanguages: Array<Language>;
  /** The country of the active localized experience. Use the `@inContext` directive to change this value. */
  country: Country;
  /** The language of the active localized experience. Use the `@inContext` directive to change this value. */
  language: Language;
  /**
   * The market including the country of the active localized experience. Use the `@inContext` directive to change this value.
   * @deprecated This `market` field will be removed in a future version of the API.
   */
  market: Market;
};

/** Represents a location where product inventory is held. */
export type Location = HasMetafields &
  Node & {
    /** The address of the location. */
    address: LocationAddress;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the location. */
    name: Scalars["String"]["output"];
  };

/** Represents a location where product inventory is held. */
export type LocationMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents a location where product inventory is held. */
export type LocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * Represents the address of a location.
 *
 */
export type LocationAddress = {
  /** The first line of the address for the location. */
  address1: Maybe<Scalars["String"]["output"]>;
  /** The second line of the address for the location. */
  address2: Maybe<Scalars["String"]["output"]>;
  /** The city of the location. */
  city: Maybe<Scalars["String"]["output"]>;
  /** The country of the location. */
  country: Maybe<Scalars["String"]["output"]>;
  /** The country code of the location. */
  countryCode: Maybe<Scalars["String"]["output"]>;
  /** A formatted version of the address for the location. */
  formatted: Array<Scalars["String"]["output"]>;
  /** The latitude coordinates of the location. */
  latitude: Maybe<Scalars["Float"]["output"]>;
  /** The longitude coordinates of the location. */
  longitude: Maybe<Scalars["Float"]["output"]>;
  /** The phone number of the location. */
  phone: Maybe<Scalars["String"]["output"]>;
  /** The province of the location. */
  province: Maybe<Scalars["String"]["output"]>;
  /**
   * The code for the province, state, or district of the address of the location.
   *
   */
  provinceCode: Maybe<Scalars["String"]["output"]>;
  /** The ZIP code of the location. */
  zip: Maybe<Scalars["String"]["output"]>;
};

/**
 * An auto-generated type for paginating through multiple Locations.
 *
 */
export type LocationConnection = {
  /** A list of edges. */
  edges: Array<LocationEdge>;
  /** A list of the nodes contained in LocationEdge. */
  nodes: Array<Location>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Location and a cursor during pagination.
 *
 */
export type LocationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of LocationEdge. */
  node: Location;
};

/** The set of valid sort keys for the Location query. */
export enum LocationSortKeys {
  /** Sort by the `city` value. */
  City = "CITY",
  /** Sort by the `distance` value. */
  Distance = "DISTANCE",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `name` value. */
  Name = "NAME",
}

/** Represents a mailing address for customers and shipping. */
export type MailingAddress = Node & {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Maybe<Scalars["String"]["output"]>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2: Maybe<Scalars["String"]["output"]>;
  /** The name of the city, district, village, or town. */
  city: Maybe<Scalars["String"]["output"]>;
  /** The name of the customer's company or organization. */
  company: Maybe<Scalars["String"]["output"]>;
  /** The name of the country. */
  country: Maybe<Scalars["String"]["output"]>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode: Maybe<Scalars["String"]["output"]>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   */
  countryCodeV2: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName: Maybe<Scalars["String"]["output"]>;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars["String"]["output"]>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The last name of the customer. */
  lastName: Maybe<Scalars["String"]["output"]>;
  /** The latitude coordinate of the customer address. */
  latitude: Maybe<Scalars["Float"]["output"]>;
  /** The longitude coordinate of the customer address. */
  longitude: Maybe<Scalars["Float"]["output"]>;
  /** The full name of the customer, based on firstName and lastName. */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone: Maybe<Scalars["String"]["output"]>;
  /** The region of the address, such as the province, state, or district. */
  province: Maybe<Scalars["String"]["output"]>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   *
   */
  provinceCode: Maybe<Scalars["String"]["output"]>;
  /** The zip or postal code of the address. */
  zip: Maybe<Scalars["String"]["output"]>;
};

/** Represents a mailing address for customers and shipping. */
export type MailingAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars["Boolean"]["input"]>;
  withName?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * An auto-generated type for paginating through multiple MailingAddresses.
 *
 */
export type MailingAddressConnection = {
  /** A list of edges. */
  edges: Array<MailingAddressEdge>;
  /** A list of the nodes contained in MailingAddressEdge. */
  nodes: Array<MailingAddress>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one MailingAddress and a cursor during pagination.
 *
 */
export type MailingAddressEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of MailingAddressEdge. */
  node: MailingAddress;
};

/** The input fields to create or update a mailing address. */
export type MailingAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company: InputMaybe<Scalars["String"]["input"]>;
  /** The name of the country. */
  country: InputMaybe<Scalars["String"]["input"]>;
  /** The first name of the customer. */
  firstName: InputMaybe<Scalars["String"]["input"]>;
  /** The last name of the customer. */
  lastName: InputMaybe<Scalars["String"]["input"]>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone: InputMaybe<Scalars["String"]["input"]>;
  /** The region of the address, such as the province, state, or district. */
  province: InputMaybe<Scalars["String"]["input"]>;
  /** The zip or postal code of the address. */
  zip: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * Manual discount applications capture the intentions of a discount that was manually created.
 *
 */
export type ManualDiscountApplication = DiscountApplication & {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The description of the application. */
  description: Maybe<Scalars["String"]["output"]>;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars["String"]["output"];
  /** The value of the discount application. */
  value: PricingValue;
};

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type Market = HasMetafields &
  Node & {
    /**
     * A human-readable unique string for the market automatically generated from its title.
     *
     */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
  };

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type MarketMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type MarketMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents a media interface. */
export type Media = {
  /** A word or phrase to share the nature or contents of a media. */
  alt: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The media content type. */
  mediaContentType: MediaContentType;
  /** The presentation for a media. */
  presentation: Maybe<MediaPresentation>;
  /** The preview image for the media. */
  previewImage: Maybe<Image>;
};

/**
 * An auto-generated type for paginating through multiple Media.
 *
 */
export type MediaConnection = {
  /** A list of edges. */
  edges: Array<MediaEdge>;
  /** A list of the nodes contained in MediaEdge. */
  nodes: Array<Media>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** The possible content types for a media object. */
export enum MediaContentType {
  /** An externally hosted video. */
  ExternalVideo = "EXTERNAL_VIDEO",
  /** A Shopify hosted image. */
  Image = "IMAGE",
  /** A 3d model. */
  Model_3D = "MODEL_3D",
  /** A Shopify hosted video. */
  Video = "VIDEO",
}

/**
 * An auto-generated type which holds one Media and a cursor during pagination.
 *
 */
export type MediaEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of MediaEdge. */
  node: Media;
};

/** Host for a Media Resource. */
export enum MediaHost {
  /** Host for Vimeo embedded videos. */
  Vimeo = "VIMEO",
  /** Host for YouTube embedded videos. */
  Youtube = "YOUTUBE",
}

/** Represents a Shopify hosted image. */
export type MediaImage = Media &
  Node & {
    /** A word or phrase to share the nature or contents of a media. */
    alt: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The image for the media. */
    image: Maybe<Image>;
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage: Maybe<Image>;
  };

/** A media presentation. */
export type MediaPresentation = Node & {
  /** A JSON object representing a presentation view. */
  asJson: Maybe<Scalars["JSON"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
};

/** A media presentation. */
export type MediaPresentationAsJsonArgs = {
  format: MediaPresentationFormat;
};

/** The possible formats for a media presentation. */
export enum MediaPresentationFormat {
  /** A media image presentation. */
  Image = "IMAGE",
  /** A model viewer presentation. */
  ModelViewer = "MODEL_VIEWER",
}

/**
 * A [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) representing a hierarchy
 * of hyperlinks (items).
 *
 */
export type Menu = Node & {
  /** The menu's handle. */
  handle: Scalars["String"]["output"];
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The menu's child items. */
  items: Array<MenuItem>;
  /** The count of items on the menu. */
  itemsCount: Scalars["Int"]["output"];
  /** The menu's title. */
  title: Scalars["String"]["output"];
};

/** A menu item within a parent menu. */
export type MenuItem = Node & {
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The menu item's child items. */
  items: Array<MenuItem>;
  /** The linked resource. */
  resource: Maybe<MenuItemResource>;
  /** The ID of the linked resource. */
  resourceId: Maybe<Scalars["ID"]["output"]>;
  /** The menu item's tags to filter a collection. */
  tags: Array<Scalars["String"]["output"]>;
  /** The menu item's title. */
  title: Scalars["String"]["output"];
  /** The menu item's type. */
  type: MenuItemType;
  /** The menu item's URL. */
  url: Maybe<Scalars["URL"]["output"]>;
};

/**
 * The list of possible resources a `MenuItem` can reference.
 *
 */
export type MenuItemResource =
  | Article
  | Blog
  | Collection
  | Metaobject
  | Page
  | Product
  | ShopPolicy;

/** A menu item type. */
export enum MenuItemType {
  /** An article link. */
  Article = "ARTICLE",
  /** A blog link. */
  Blog = "BLOG",
  /** A catalog link. */
  Catalog = "CATALOG",
  /** A collection link. */
  Collection = "COLLECTION",
  /** A collection link. */
  Collections = "COLLECTIONS",
  /** A customer account page link. */
  CustomerAccountPage = "CUSTOMER_ACCOUNT_PAGE",
  /** A frontpage link. */
  Frontpage = "FRONTPAGE",
  /** An http link. */
  Http = "HTTP",
  /** A metaobject page link. */
  Metaobject = "METAOBJECT",
  /** A page link. */
  Page = "PAGE",
  /** A product link. */
  Product = "PRODUCT",
  /** A search link. */
  Search = "SEARCH",
  /** A shop policy link. */
  ShopPolicy = "SHOP_POLICY",
}

/** The merchandise to be purchased at checkout. */
export type Merchandise = ProductVariant;

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export type Metafield = Node & {
  /** The date and time when the storefront metafield was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The description of a metafield. */
  description: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The unique identifier for the metafield within its namespace. */
  key: Scalars["String"]["output"];
  /** The container for a group of metafields that the metafield is associated with. */
  namespace: Scalars["String"]["output"];
  /** The type of resource that the metafield is attached to. */
  parentResource: MetafieldParentResource;
  /** Returns a reference object if the metafield's type is a resource reference. */
  reference: Maybe<MetafieldReference>;
  /** A list of reference objects if the metafield's type is a resource reference list. */
  references: Maybe<MetafieldReferenceConnection>;
  /**
   * The type name of the metafield.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars["String"]["output"];
  /** The date and time when the metafield was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars["String"]["output"];
};

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export type MetafieldReferencesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
};

/** Possible error codes that can be returned by `MetafieldDeleteUserError`. */
export enum MetafieldDeleteErrorCode {
  /** The owner ID is invalid. */
  InvalidOwner = "INVALID_OWNER",
  /** Metafield not found. */
  MetafieldDoesNotExist = "METAFIELD_DOES_NOT_EXIST",
}

/** An error that occurs during the execution of cart metafield deletion. */
export type MetafieldDeleteUserError = DisplayableError & {
  /** The error code. */
  code: Maybe<MetafieldDeleteErrorCode>;
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/**
 * A filter used to view a subset of products in a collection matching a specific metafield value.
 *
 * Only the following metafield types are currently supported:
 * - `number_integer`
 * - `number_decimal`
 * - `single_line_text_field`
 * - `boolean` as of 2022-04.
 *
 */
export type MetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars["String"]["input"];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars["String"]["input"];
  /** The value of the metafield. */
  value: Scalars["String"]["input"];
};

/** A resource that the metafield belongs to. */
export type MetafieldParentResource =
  | Article
  | Blog
  | Cart
  | Collection
  | Company
  | CompanyLocation
  | Customer
  | Location
  | Market
  | Order
  | Page
  | Product
  | ProductVariant
  | SellingPlan
  | Shop;

/**
 * Returns the resource which is being referred to by a metafield.
 *
 */
export type MetafieldReference =
  | Collection
  | GenericFile
  | MediaImage
  | Metaobject
  | Model3d
  | Page
  | Product
  | ProductVariant
  | Video;

/**
 * An auto-generated type for paginating through multiple MetafieldReferences.
 *
 */
export type MetafieldReferenceConnection = {
  /** A list of edges. */
  edges: Array<MetafieldReferenceEdge>;
  /** A list of the nodes contained in MetafieldReferenceEdge. */
  nodes: Array<MetafieldReference>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one MetafieldReference and a cursor during pagination.
 *
 */
export type MetafieldReferenceEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of MetafieldReferenceEdge. */
  node: MetafieldReference;
};

/** An error that occurs during the execution of `MetafieldsSet`. */
export type MetafieldsSetUserError = DisplayableError & {
  /** The error code. */
  code: Maybe<MetafieldsSetUserErrorCode>;
  /** The index of the array element that's causing the error. */
  elementIndex: Maybe<Scalars["Int"]["output"]>;
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/** Possible error codes that can be returned by `MetafieldsSetUserError`. */
export enum MetafieldsSetUserErrorCode {
  /** The input value is blank. */
  Blank = "BLANK",
  /** The input value isn't included in the list. */
  Inclusion = "INCLUSION",
  /** The owner ID is invalid. */
  InvalidOwner = "INVALID_OWNER",
  /** The type is invalid. */
  InvalidType = "INVALID_TYPE",
  /** The value is invalid for metafield type or for definition options. */
  InvalidValue = "INVALID_VALUE",
  /** The input value should be less than or equal to the maximum value allowed. */
  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",
  /** The input value needs to be blank. */
  Present = "PRESENT",
  /** The input value is too long. */
  TooLong = "TOO_LONG",
  /** The input value is too short. */
  TooShort = "TOO_SHORT",
}

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export type Metaobject = Node &
  OnlineStorePublishable & {
    /** Accesses a field of the object by key. */
    field: Maybe<MetaobjectField>;
    /**
     * All object fields with defined values.
     * Omitted object keys can be assumed null, and no guarantees are made about field order.
     *
     */
    fields: Array<MetaobjectField>;
    /** The unique handle of the metaobject. Useful as a custom ID. */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The URL used for viewing the metaobject on the shop's Online Store. Returns `null` if the metaobject definition doesn't have the `online_store` capability. */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /**
     * The metaobject's SEO information. Returns `null` if the metaobject definition
     * doesn't have the `renderable` capability.
     *
     */
    seo: Maybe<MetaobjectSeo>;
    /** The type of the metaobject. Defines the namespace of its associated metafields. */
    type: Scalars["String"]["output"];
    /** The date and time when the metaobject was last updated. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export type MetaobjectFieldArgs = {
  key: Scalars["String"]["input"];
};

/**
 * An auto-generated type for paginating through multiple Metaobjects.
 *
 */
export type MetaobjectConnection = {
  /** A list of edges. */
  edges: Array<MetaobjectEdge>;
  /** A list of the nodes contained in MetaobjectEdge. */
  nodes: Array<Metaobject>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Metaobject and a cursor during pagination.
 *
 */
export type MetaobjectEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of MetaobjectEdge. */
  node: Metaobject;
};

/** Provides the value of a Metaobject field. */
export type MetaobjectField = {
  /** The field key. */
  key: Scalars["String"]["output"];
  /** A referenced object if the field type is a resource reference. */
  reference: Maybe<MetafieldReference>;
  /** A list of referenced objects if the field type is a resource reference list. */
  references: Maybe<MetafieldReferenceConnection>;
  /**
   * The type name of the field.
   * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars["String"]["output"];
  /** The field value. */
  value: Maybe<Scalars["String"]["output"]>;
};

/** Provides the value of a Metaobject field. */
export type MetaobjectFieldReferencesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
};

/** The input fields used to retrieve a metaobject by handle. */
export type MetaobjectHandleInput = {
  /** The handle of the metaobject. */
  handle: Scalars["String"]["input"];
  /** The type of the metaobject. */
  type: Scalars["String"]["input"];
};

/** SEO information for a metaobject. */
export type MetaobjectSeo = {
  /** The meta description. */
  description: Maybe<MetaobjectField>;
  /** The SEO title. */
  title: Maybe<MetaobjectField>;
};

/** Represents a Shopify hosted 3D model. */
export type Model3d = Media &
  Node & {
    /** A word or phrase to share the nature or contents of a media. */
    alt: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage: Maybe<Image>;
    /** The sources for a 3d model. */
    sources: Array<Model3dSource>;
  };

/** Represents a source for a Shopify hosted 3d model. */
export type Model3dSource = {
  /** The filesize of the 3d model. */
  filesize: Scalars["Int"]["output"];
  /** The format of the 3d model. */
  format: Scalars["String"]["output"];
  /** The MIME type of the 3d model. */
  mimeType: Scalars["String"]["output"];
  /** The URL of the 3d model. */
  url: Scalars["String"]["output"];
};

/** The input fields for a monetary value with currency. */
export type MoneyInput = {
  /** Decimal money amount. */
  amount: Scalars["Decimal"]["input"];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/**
 * A monetary value with currency.
 *
 */
export type MoneyV2 = {
  /** Decimal money amount. */
  amount: Scalars["Decimal"]["output"];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type Mutation = {
  /** Updates the attributes on a cart. */
  cartAttributesUpdate: Maybe<CartAttributesUpdatePayload>;
  /** Updates the billing address on the cart. */
  cartBillingAddressUpdate: Maybe<CartBillingAddressUpdatePayload>;
  /**
   * Updates customer information associated with a cart.
   * Buyer identity is used to determine
   * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
   * and should match the customer's shipping address.
   *
   */
  cartBuyerIdentityUpdate: Maybe<CartBuyerIdentityUpdatePayload>;
  /** Creates a new cart. */
  cartCreate: Maybe<CartCreatePayload>;
  /** Adds delivery addresses to the cart. */
  cartDeliveryAddressesAdd: Maybe<CartDeliveryAddressesAddPayload>;
  /** Removes delivery addresses from the cart. */
  cartDeliveryAddressesRemove: Maybe<CartDeliveryAddressesRemovePayload>;
  /** Updates one or more delivery addresses on a cart. */
  cartDeliveryAddressesUpdate: Maybe<CartDeliveryAddressesUpdatePayload>;
  /** Updates the discount codes applied to the cart. */
  cartDiscountCodesUpdate: Maybe<CartDiscountCodesUpdatePayload>;
  /** Removes the gift card codes applied to the cart. */
  cartGiftCardCodesRemove: Maybe<CartGiftCardCodesRemovePayload>;
  /** Updates the gift card codes applied to the cart. */
  cartGiftCardCodesUpdate: Maybe<CartGiftCardCodesUpdatePayload>;
  /** Adds a merchandise line to the cart. */
  cartLinesAdd: Maybe<CartLinesAddPayload>;
  /** Removes one or more merchandise lines from the cart. */
  cartLinesRemove: Maybe<CartLinesRemovePayload>;
  /** Updates one or more merchandise lines on a cart. */
  cartLinesUpdate: Maybe<CartLinesUpdatePayload>;
  /** Deletes a cart metafield. */
  cartMetafieldDelete: Maybe<CartMetafieldDeletePayload>;
  /**
   * Sets cart metafield values. Cart metafield values will be set regardless if they were previously created or not.
   *
   * Allows a maximum of 25 cart metafields to be set at a time.
   *
   */
  cartMetafieldsSet: Maybe<CartMetafieldsSetPayload>;
  /** Updates the note on the cart. */
  cartNoteUpdate: Maybe<CartNoteUpdatePayload>;
  /** Update the customer's payment method that will be used to checkout. */
  cartPaymentUpdate: Maybe<CartPaymentUpdatePayload>;
  /** Prepare the cart for cart checkout completion. */
  cartPrepareForCompletion: Maybe<CartPrepareForCompletionPayload>;
  /** Removes personally identifiable information from the cart. */
  cartRemovePersonalData: Maybe<CartRemovePersonalDataPayload>;
  /** Update the selected delivery options for a delivery group. */
  cartSelectedDeliveryOptionsUpdate: Maybe<CartSelectedDeliveryOptionsUpdatePayload>;
  /** Submit the cart for checkout completion. */
  cartSubmitForCompletion: Maybe<CartSubmitForCompletionPayload>;
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   *
   */
  customerAccessTokenCreate: Maybe<CustomerAccessTokenCreatePayload>;
  /**
   * Creates a customer access token using a
   * [multipass token](https://shopify.dev/api/multipass) instead of email and
   * password. A customer record is created if the customer doesn't exist. If a customer
   * record already exists but the record is disabled, then the customer record is enabled.
   *
   */
  customerAccessTokenCreateWithMultipass: Maybe<CustomerAccessTokenCreateWithMultipassPayload>;
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete: Maybe<CustomerAccessTokenDeletePayload>;
  /**
   * Renews a customer access token.
   *
   * Access token renewal must happen *before* a token expires.
   * If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
   *
   */
  customerAccessTokenRenew: Maybe<CustomerAccessTokenRenewPayload>;
  /** Activates a customer. */
  customerActivate: Maybe<CustomerActivatePayload>;
  /** Activates a customer with the activation url received from `customerCreate`. */
  customerActivateByUrl: Maybe<CustomerActivateByUrlPayload>;
  /** Creates a new address for a customer. */
  customerAddressCreate: Maybe<CustomerAddressCreatePayload>;
  /** Permanently deletes the address of an existing customer. */
  customerAddressDelete: Maybe<CustomerAddressDeletePayload>;
  /** Updates the address of an existing customer. */
  customerAddressUpdate: Maybe<CustomerAddressUpdatePayload>;
  /** Creates a new customer. */
  customerCreate: Maybe<CustomerCreatePayload>;
  /** Updates the default address of an existing customer. */
  customerDefaultAddressUpdate: Maybe<CustomerDefaultAddressUpdatePayload>;
  /**
   * Sends a reset password email to the customer. The reset password
   * email contains a reset password URL and token that you can pass to
   * the [`customerResetByUrl`](https://shopify.dev/api/storefront/latest/mutations/customerResetByUrl) or
   * [`customerReset`](https://shopify.dev/api/storefront/latest/mutations/customerReset) mutation to reset the
   * customer password.
   *
   * This mutation is throttled by IP. With private access,
   * you can provide a [`Shopify-Storefront-Buyer-IP`](https://shopify.dev/api/usage/authentication#optional-ip-header) instead of the request IP.
   * The header is case-sensitive and must be sent as `Shopify-Storefront-Buyer-IP`.
   *
   * Make sure that the value provided to `Shopify-Storefront-Buyer-IP` is trusted. Unthrottled access to this
   * mutation presents a security risk.
   *
   */
  customerRecover: Maybe<CustomerRecoverPayload>;
  /**
   * "Resets a customer’s password with the token received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerReset: Maybe<CustomerResetPayload>;
  /**
   * "Resets a customer’s password with the reset password URL received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerResetByUrl: Maybe<CustomerResetByUrlPayload>;
  /** Updates an existing customer. */
  customerUpdate: Maybe<CustomerUpdatePayload>;
  /** Create a new Shop Pay payment request session. */
  shopPayPaymentRequestSessionCreate: Maybe<ShopPayPaymentRequestSessionCreatePayload>;
  /** Submits a Shop Pay payment request session. */
  shopPayPaymentRequestSessionSubmit: Maybe<ShopPayPaymentRequestSessionSubmitPayload>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartAttributesUpdateArgs = {
  attributes: Array<AttributeInput>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartBillingAddressUpdateArgs = {
  billingAddress: InputMaybe<MailingAddressInput>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartBuyerIdentityUpdateArgs = {
  buyerIdentity: CartBuyerIdentityInput;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartCreateArgs = {
  input: InputMaybe<CartInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesAddArgs = {
  addresses: Array<CartSelectableAddressInput>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesRemoveArgs = {
  addressIds: Array<Scalars["ID"]["input"]>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesUpdateArgs = {
  addresses: Array<CartSelectableAddressUpdateInput>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDiscountCodesUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  discountCodes: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartGiftCardCodesRemoveArgs = {
  appliedGiftCardIds: Array<Scalars["ID"]["input"]>;
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartGiftCardCodesUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  giftCardCodes: Array<Scalars["String"]["input"]>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesAddArgs = {
  cartId: Scalars["ID"]["input"];
  lines: Array<CartLineInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesRemoveArgs = {
  cartId: Scalars["ID"]["input"];
  lineIds: Array<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  lines: Array<CartLineUpdateInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartMetafieldDeleteArgs = {
  input: CartMetafieldDeleteInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartMetafieldsSetArgs = {
  metafields: Array<CartMetafieldsSetInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartNoteUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  note: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartPaymentUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  payment: CartPaymentInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartPrepareForCompletionArgs = {
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartRemovePersonalDataArgs = {
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartSelectedDeliveryOptionsUpdateArgs = {
  cartId: Scalars["ID"]["input"];
  selectedDeliveryOptions: Array<CartSelectedDeliveryOptionInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartSubmitForCompletionArgs = {
  attemptToken: Scalars["String"]["input"];
  cartId: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenCreateArgs = {
  input: CustomerAccessTokenCreateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenCreateWithMultipassArgs = {
  multipassToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerActivateArgs = {
  id: Scalars["ID"]["input"];
  input: CustomerActivateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars["URL"]["input"];
  password: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressCreateArgs = {
  address: MailingAddressInput;
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressDeleteArgs = {
  customerAccessToken: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressUpdateArgs = {
  address: MailingAddressInput;
  customerAccessToken: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerCreateArgs = {
  input: CustomerCreateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerDefaultAddressUpdateArgs = {
  addressId: Scalars["ID"]["input"];
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerRecoverArgs = {
  email: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerResetArgs = {
  id: Scalars["ID"]["input"];
  input: CustomerResetInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerResetByUrlArgs = {
  password: Scalars["String"]["input"];
  resetUrl: Scalars["URL"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerUpdateArgs = {
  customer: CustomerUpdateInput;
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationShopPayPaymentRequestSessionCreateArgs = {
  paymentRequest: ShopPayPaymentRequestInput;
  sourceIdentifier: Scalars["String"]["input"];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationShopPayPaymentRequestSessionSubmitArgs = {
  idempotencyKey: Scalars["String"]["input"];
  orderName: InputMaybe<Scalars["String"]["input"]>;
  paymentRequest: ShopPayPaymentRequestInput;
  token: Scalars["String"]["input"];
};

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](/docs/api/storefront/latest/queries/node)
 * and [nodes](/docs/api/storefront/latest/queries/nodes) queries.
 *
 */
export type Node = {
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
};

/** Represents a resource that can be published to the Online Store sales channel. */
export type OnlineStorePublishable = {
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type Order = HasMetafields &
  Node & {
    /** The address associated with the payment method. */
    billingAddress: Maybe<MailingAddress>;
    /** The reason for the order's cancellation. Returns `null` if the order wasn't canceled. */
    cancelReason: Maybe<OrderCancelReason>;
    /** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
    canceledAt: Maybe<Scalars["DateTime"]["output"]>;
    /** The code of the currency used for the payment. */
    currencyCode: CurrencyCode;
    /** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes aren't included unless the order is a taxes-included order. */
    currentSubtotalPrice: MoneyV2;
    /** The total cost of duties for the order, including refunds. */
    currentTotalDuties: Maybe<MoneyV2>;
    /** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
    currentTotalPrice: MoneyV2;
    /** The total cost of shipping, excluding shipping lines that have been refunded or removed. Taxes aren't included unless the order is a taxes-included order. */
    currentTotalShippingPrice: MoneyV2;
    /** The total of all taxes applied to the order, excluding taxes for returned line items. */
    currentTotalTax: MoneyV2;
    /** A list of the custom attributes added to the order. For example, whether an order is a customer's first. */
    customAttributes: Array<Attribute>;
    /** The locale code in which this specific order happened. */
    customerLocale: Maybe<Scalars["String"]["output"]>;
    /** The unique URL that the customer can use to access the order. */
    customerUrl: Maybe<Scalars["URL"]["output"]>;
    /** Discounts that have been applied on the order. */
    discountApplications: DiscountApplicationConnection;
    /** Whether the order has had any edits applied or not. */
    edited: Scalars["Boolean"]["output"];
    /** The customer's email address. */
    email: Maybe<Scalars["String"]["output"]>;
    /** The financial status of the order. */
    financialStatus: Maybe<OrderFinancialStatus>;
    /** The fulfillment status for the order. */
    fulfillmentStatus: OrderFulfillmentStatus;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** List of the order’s line items. */
    lineItems: OrderLineItemConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /**
     * Unique identifier for the order that appears on the order.
     * For example, _#1000_ or _Store1001.
     *
     */
    name: Scalars["String"]["output"];
    /** A unique numeric identifier for the order for use by shop owner and customer. */
    orderNumber: Scalars["Int"]["output"];
    /** The total cost of duties charged at checkout. */
    originalTotalDuties: Maybe<MoneyV2>;
    /** The total price of the order before any applied edits. */
    originalTotalPrice: MoneyV2;
    /** The customer's phone number for receiving SMS notifications. */
    phone: Maybe<Scalars["String"]["output"]>;
    /**
     * The date and time when the order was imported.
     * This value can be set to dates in the past when importing from other systems.
     * If no value is provided, it will be auto-generated based on current date and time.
     *
     */
    processedAt: Scalars["DateTime"]["output"];
    /** The address to where the order will be shipped. */
    shippingAddress: Maybe<MailingAddress>;
    /**
     * The discounts that have been allocated onto the shipping line by discount applications.
     *
     */
    shippingDiscountAllocations: Array<DiscountAllocation>;
    /** The unique URL for the order's status page. */
    statusUrl: Scalars["URL"]["output"];
    /** Price of the order before shipping and taxes. */
    subtotalPrice: Maybe<MoneyV2>;
    /**
     * Price of the order before duties, shipping and taxes.
     * @deprecated Use `subtotalPrice` instead.
     */
    subtotalPriceV2: Maybe<MoneyV2>;
    /** List of the order’s successful fulfillments. */
    successfulFulfillments: Maybe<Array<Fulfillment>>;
    /** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
    totalPrice: MoneyV2;
    /**
     * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
     * @deprecated Use `totalPrice` instead.
     */
    totalPriceV2: MoneyV2;
    /** The total amount that has been refunded. */
    totalRefunded: MoneyV2;
    /**
     * The total amount that has been refunded.
     * @deprecated Use `totalRefunded` instead.
     */
    totalRefundedV2: MoneyV2;
    /** The total cost of shipping. */
    totalShippingPrice: MoneyV2;
    /**
     * The total cost of shipping.
     * @deprecated Use `totalShippingPrice` instead.
     */
    totalShippingPriceV2: MoneyV2;
    /** The total cost of taxes. */
    totalTax: Maybe<MoneyV2>;
    /**
     * The total cost of taxes.
     * @deprecated Use `totalTax` instead.
     */
    totalTaxV2: Maybe<MoneyV2>;
  };

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderDiscountApplicationsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderLineItemsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderSuccessfulFulfillmentsArgs = {
  first: InputMaybe<Scalars["Int"]["input"]>;
};

/** Represents the reason for the order's cancellation. */
export enum OrderCancelReason {
  /** The customer wanted to cancel the order. */
  Customer = "CUSTOMER",
  /** Payment was declined. */
  Declined = "DECLINED",
  /** The order was fraudulent. */
  Fraud = "FRAUD",
  /** There was insufficient inventory. */
  Inventory = "INVENTORY",
  /** The order was canceled for an unlisted reason. */
  Other = "OTHER",
  /** Staff made an error. */
  Staff = "STAFF",
}

/**
 * An auto-generated type for paginating through multiple Orders.
 *
 */
export type OrderConnection = {
  /** A list of edges. */
  edges: Array<OrderEdge>;
  /** A list of the nodes contained in OrderEdge. */
  nodes: Array<Order>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Orders. */
  totalCount: Scalars["UnsignedInt64"]["output"];
};

/**
 * An auto-generated type which holds one Order and a cursor during pagination.
 *
 */
export type OrderEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of OrderEdge. */
  node: Order;
};

/** Represents the order's current financial status. */
export enum OrderFinancialStatus {
  /** Displayed as **Authorized**. */
  Authorized = "AUTHORIZED",
  /** Displayed as **Paid**. */
  Paid = "PAID",
  /** Displayed as **Partially paid**. */
  PartiallyPaid = "PARTIALLY_PAID",
  /** Displayed as **Partially refunded**. */
  PartiallyRefunded = "PARTIALLY_REFUNDED",
  /** Displayed as **Pending**. */
  Pending = "PENDING",
  /** Displayed as **Refunded**. */
  Refunded = "REFUNDED",
  /** Displayed as **Voided**. */
  Voided = "VOIDED",
}

/** Represents the order's aggregated fulfillment status for display purposes. */
export enum OrderFulfillmentStatus {
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  Fulfilled = "FULFILLED",
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  InProgress = "IN_PROGRESS",
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  OnHold = "ON_HOLD",
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  Open = "OPEN",
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  PartiallyFulfilled = "PARTIALLY_FULFILLED",
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  PendingFulfillment = "PENDING_FULFILLMENT",
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  Restocked = "RESTOCKED",
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  Scheduled = "SCHEDULED",
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  Unfulfilled = "UNFULFILLED",
}

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export type OrderLineItem = {
  /** The number of entries associated to the line item minus the items that have been removed. */
  currentQuantity: Scalars["Int"]["output"];
  /** List of custom attributes associated to the line item. */
  customAttributes: Array<Attribute>;
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: Array<DiscountAllocation>;
  /** The total price of the line item, including discounts, and displayed in the presentment currency. */
  discountedTotalPrice: MoneyV2;
  /** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it's displayed in the presentment currency. */
  originalTotalPrice: MoneyV2;
  /** The number of products variants associated to the line item. */
  quantity: Scalars["Int"]["output"];
  /** The title of the product combined with title of the variant. */
  title: Scalars["String"]["output"];
  /** The product variant object associated to the line item. */
  variant: Maybe<ProductVariant>;
};

/**
 * An auto-generated type for paginating through multiple OrderLineItems.
 *
 */
export type OrderLineItemConnection = {
  /** A list of edges. */
  edges: Array<OrderLineItemEdge>;
  /** A list of the nodes contained in OrderLineItemEdge. */
  nodes: Array<OrderLineItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one OrderLineItem and a cursor during pagination.
 *
 */
export type OrderLineItemEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of OrderLineItemEdge. */
  node: OrderLineItem;
};

/** The set of valid sort keys for the Order query. */
export enum OrderSortKeys {
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `processed_at` value. */
  ProcessedAt = "PROCESSED_AT",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `total_price` value. */
  TotalPrice = "TOTAL_PRICE",
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type Page = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    /** The description of the page, complete with HTML formatting. */
    body: Scalars["HTML"]["output"];
    /** Summary of the page body. */
    bodySummary: Scalars["String"]["output"];
    /** The timestamp of the page creation. */
    createdAt: Scalars["DateTime"]["output"];
    /** A human-friendly unique string for the page automatically generated from its title. */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /** The page's SEO information. */
    seo: Maybe<Seo>;
    /** The title of the page. */
    title: Scalars["String"]["output"];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters: Maybe<Scalars["String"]["output"]>;
    /** The timestamp of the latest page update. */
    updatedAt: Scalars["DateTime"]["output"];
  };

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type PageMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type PageMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * An auto-generated type for paginating through multiple Pages.
 *
 */
export type PageConnection = {
  /** A list of edges. */
  edges: Array<PageEdge>;
  /** A list of the nodes contained in PageEdge. */
  nodes: Array<Page>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Page and a cursor during pagination.
 *
 */
export type PageEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of PageEdge. */
  node: Page;
};

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
 *
 */
export type PageInfo = {
  /** The cursor corresponding to the last node in edges. */
  endCursor: Maybe<Scalars["String"]["output"]>;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars["Boolean"]["output"];
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** The cursor corresponding to the first node in edges. */
  startCursor: Maybe<Scalars["String"]["output"]>;
};

/** The set of valid sort keys for the Page query. */
export enum PageSortKeys {
  /** Sort by the `id` value. */
  Id = "ID",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
  /** Sort by the `updated_at` value. */
  UpdatedAt = "UPDATED_AT",
}

/** Type for paginating through multiple sitemap's resources. */
export type PaginatedSitemapResources = {
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars["Boolean"]["output"];
  /**
   * List of sitemap resources for the current page.
   * Note: The number of items varies between 0 and 250 per page.
   *
   */
  items: Array<SitemapResourceInterface>;
};

/** Settings related to payments. */
export type PaymentSettings = {
  /** List of the card brands which the business entity accepts. */
  acceptedCardBrands: Array<CardBrand>;
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Scalars["URL"]["output"];
  /** The country where the shop is located. When multiple business entities operate within the shop, then this will represent the country of the business entity that's serving the specified buyer context. */
  countryCode: CountryCode;
  /** The three-letter code for the shop's primary currency. */
  currencyCode: CurrencyCode;
  /**
   * A list of enabled currencies (ISO 4217 format) that the shop accepts.
   * Merchants can enable currencies from their Shopify Payments settings in the Shopify admin.
   *
   */
  enabledPresentmentCurrencies: Array<CurrencyCode>;
  /** The shop’s Shopify Payments account ID. */
  shopifyPaymentsAccountId: Maybe<Scalars["String"]["output"]>;
  /** List of the digital wallets which the business entity supports. */
  supportedDigitalWallets: Array<DigitalWallet>;
};

/** Decides the distribution of results. */
export enum PredictiveSearchLimitScope {
  /** Return results up to limit across all types. */
  All = "ALL",
  /** Return results up to limit per type. */
  Each = "EACH",
}

/**
 * A predictive search result represents a list of products, collections, pages, articles, and query suggestions
 * that matches the predictive search query.
 *
 */
export type PredictiveSearchResult = {
  /** The articles that match the search query. */
  articles: Array<Article>;
  /** The articles that match the search query. */
  collections: Array<Collection>;
  /** The pages that match the search query. */
  pages: Array<Page>;
  /** The products that match the search query. */
  products: Array<Product>;
  /** The query suggestions that are relevant to the search query. */
  queries: Array<SearchQuerySuggestion>;
};

/** The types of search items to perform predictive search on. */
export enum PredictiveSearchType {
  /** Returns matching articles. */
  Article = "ARTICLE",
  /** Returns matching collections. */
  Collection = "COLLECTION",
  /** Returns matching pages. */
  Page = "PAGE",
  /** Returns matching products. */
  Product = "PRODUCT",
  /** Returns matching query strings. */
  Query = "QUERY",
}

/** The preferred delivery methods such as shipping, local pickup or through pickup points. */
export enum PreferenceDeliveryMethodType {
  /** A delivery method used to let buyers collect purchases at designated locations like parcel lockers. */
  PickupPoint = "PICKUP_POINT",
  /** A delivery method used to let buyers receive items directly from a specific location within an area. */
  PickUp = "PICK_UP",
  /** A delivery method used to send items directly to a buyer’s specified address. */
  Shipping = "SHIPPING",
}

/**
 * The input fields for a filter used to view a subset of products in a collection matching a specific price range.
 *
 */
export type PriceRangeFilter = {
  /** The maximum price in the range. Empty indicates no max price. */
  max: InputMaybe<Scalars["Float"]["input"]>;
  /** The minimum price in the range. Defaults to zero. */
  min: InputMaybe<Scalars["Float"]["input"]>;
};

/** The value of the percentage pricing object. */
export type PricingPercentageValue = {
  /** The percentage value of the object. */
  percentage: Scalars["Float"]["output"];
};

/** The price value (fixed or percentage) for a discount application. */
export type PricingValue = MoneyV2 | PricingPercentageValue;

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type Product = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    /**
     * A list of variants whose selected options differ with the provided selected options by one, ordered by variant id.
     * If selected options are not provided, adjacent variants to the first available variant is returned.
     *
     * Note that this field returns an array of variants. In most cases, the number of variants in this array will be low.
     * However, with a low number of options and a high number of values per option, the number of variants returned
     * here can be high. In such cases, it recommended to avoid using this field.
     *
     * This list of variants can be used in combination with the `options` field to build a rich variant picker that
     * includes variant availability or other variant information.
     *
     */
    adjacentVariants: Array<ProductVariant>;
    /** Indicates if at least one product variant is available for sale. */
    availableForSale: Scalars["Boolean"]["output"];
    /** The category of a product from [Shopify's Standard Product Taxonomy](https://shopify.github.io/product-taxonomy/releases/unstable/?categoryId=sg-4-17-2-17). */
    category: Maybe<TaxonomyCategory>;
    /** A list of [collections](/docs/api/storefront/latest/objects/Collection) that include the product. */
    collections: CollectionConnection;
    /** The [compare-at price range](https://help.shopify.com/manual/products/details/product-pricing/sale-pricing) of the product in the shop's default currency. */
    compareAtPriceRange: ProductPriceRange;
    /** The date and time when the product was created. */
    createdAt: Scalars["DateTime"]["output"];
    /** A single-line description of the product, with [HTML tags](https://developer.mozilla.org/en-US/docs/Web/HTML) removed. */
    description: Scalars["String"]["output"];
    /**
     * The description of the product, with
     * HTML tags. For example, the description might include
     * bold `<strong></strong>` and italic `<i></i>` text.
     *
     */
    descriptionHtml: Scalars["HTML"]["output"];
    /**
     * An encoded string containing all option value combinations
     * with a corresponding variant that is currently available for sale.
     *
     * Integers represent option and values:
     * [0,1] represents option_value at array index 0 for the option at array index 0
     *
     * `:`, `,`, ` ` and `-` are control characters.
     * `:` indicates a new option. ex: 0:1 indicates value 0 for the option in position 1, value 1 for the option in position 2.
     * `,` indicates the end of a repeated prefix, mulitple consecutive commas indicate the end of multiple repeated prefixes.
     * ` ` indicates a gap in the sequence of option values. ex: 0 4 indicates option values in position 0 and 4 are present.
     * `-` indicates a continuous range of option values. ex: 0 1-3 4
     *
     * Decoding process:
     *
     * Example options: [Size, Color, Material]
     * Example values: [[Small, Medium, Large], [Red, Blue], [Cotton, Wool]]
     * Example encoded string: "0:0:0,1:0-1,,1:0:0-1,1:1,,2:0:1,1:0,,"
     *
     * Step 1: Expand ranges into the numbers they represent: "0:0:0,1:0 1,,1:0:0 1,1:1,,2:0:1,1:0,,"
     * Step 2: Expand repeated prefixes: "0:0:0,0:1:0 1,1:0:0 1,1:1:1,2:0:1,2:1:0,"
     * Step 3: Expand shared prefixes so data is encoded as a string: "0:0:0,0:1:0,0:1:1,1:0:0,1:0:1,1:1:1,2:0:1,2:1:0,"
     * Step 4: Map to options + option values to determine existing variants:
     *
     * [Small, Red, Cotton] (0:0:0), [Small, Blue, Cotton] (0:1:0), [Small, Blue, Wool] (0:1:1),
     * [Medium, Red, Cotton] (1:0:0), [Medium, Red, Wool] (1:0:1), [Medium, Blue, Wool] (1:1:1),
     * [Large, Red, Wool] (2:0:1), [Large, Blue, Cotton] (2:1:0).
     *
     *
     */
    encodedVariantAvailability: Maybe<Scalars["String"]["output"]>;
    /**
     * An encoded string containing all option value combinations with a corresponding variant.
     *
     * Integers represent option and values:
     * [0,1] represents option_value at array index 0 for the option at array index 0
     *
     * `:`, `,`, ` ` and `-` are control characters.
     * `:` indicates a new option. ex: 0:1 indicates value 0 for the option in position 1, value 1 for the option in position 2.
     * `,` indicates the end of a repeated prefix, mulitple consecutive commas indicate the end of multiple repeated prefixes.
     * ` ` indicates a gap in the sequence of option values. ex: 0 4 indicates option values in position 0 and 4 are present.
     * `-` indicates a continuous range of option values. ex: 0 1-3 4
     *
     * Decoding process:
     *
     * Example options: [Size, Color, Material]
     * Example values: [[Small, Medium, Large], [Red, Blue], [Cotton, Wool]]
     * Example encoded string: "0:0:0,1:0-1,,1:0:0-1,1:1,,2:0:1,1:0,,"
     *
     * Step 1: Expand ranges into the numbers they represent: "0:0:0,1:0 1,,1:0:0 1,1:1,,2:0:1,1:0,,"
     * Step 2: Expand repeated prefixes: "0:0:0,0:1:0 1,1:0:0 1,1:1:1,2:0:1,2:1:0,"
     * Step 3: Expand shared prefixes so data is encoded as a string: "0:0:0,0:1:0,0:1:1,1:0:0,1:0:1,1:1:1,2:0:1,2:1:0,"
     * Step 4: Map to options + option values to determine existing variants:
     *
     * [Small, Red, Cotton] (0:0:0), [Small, Blue, Cotton] (0:1:0), [Small, Blue, Wool] (0:1:1),
     * [Medium, Red, Cotton] (1:0:0), [Medium, Red, Wool] (1:0:1), [Medium, Blue, Wool] (1:1:1),
     * [Large, Red, Wool] (2:0:1), [Large, Blue, Cotton] (2:1:0).
     *
     *
     */
    encodedVariantExistence: Maybe<Scalars["String"]["output"]>;
    /**
     * The featured image for the product.
     *
     * This field is functionally equivalent to `images(first: 1)`.
     *
     */
    featuredImage: Maybe<Image>;
    /**
     * A unique, human-readable string of the product's title.
     * A handle can contain letters, hyphens (`-`), and numbers, but no spaces.
     * The handle is used in the online store URL for the product.
     *
     */
    handle: Scalars["String"]["output"];
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** List of images associated with the product. */
    images: ImageConnection;
    /** Whether the product is a gift card. */
    isGiftCard: Scalars["Boolean"]["output"];
    /** The [media](/docs/apps/build/online-store/product-media) that are associated with the product. Valid media are images, 3D models, videos. */
    media: MediaConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /**
     * The product's URL on the online store.
     * If `null`, then the product isn't published to the online store sales channel.
     *
     */
    onlineStoreUrl: Maybe<Scalars["URL"]["output"]>;
    /** A list of product options. The limit is defined by the [shop's resource limits for product options](/docs/api/admin-graphql/latest/objects/Shop#field-resourcelimits) (`Shop.resourceLimits.maxProductOptions`). */
    options: Array<ProductOption>;
    /**
     * The minimum and maximum prices of a product, expressed in decimal numbers.
     * For example, if the product is priced between $10.00 and $50.00,
     * then the price range is $10.00 - $50.00.
     *
     */
    priceRange: ProductPriceRange;
    /**
     * The [product type](https://help.shopify.com/manual/products/details/product-type)
     * that merchants define.
     *
     */
    productType: Scalars["String"]["output"];
    /** The date and time when the product was published to the channel. */
    publishedAt: Scalars["DateTime"]["output"];
    /** Whether the product can only be purchased with a [selling plan](/docs/apps/build/purchase-options/subscriptions/selling-plans). Products that are sold on subscription (`requiresSellingPlan: true`) can be updated only for online stores. If you update a product to be subscription-only (`requiresSellingPlan:false`), then the product is unpublished from all channels, except the online store. */
    requiresSellingPlan: Scalars["Boolean"]["output"];
    /**
     * Find an active product variant based on selected options, availability or the first variant.
     *
     * All arguments are optional. If no selected options are provided, the first available variant is returned.
     * If no variants are available, the first variant is returned.
     *
     */
    selectedOrFirstAvailableVariant: Maybe<ProductVariant>;
    /** A list of all [selling plan groups](/docs/apps/build/purchase-options/subscriptions/selling-plans/build-a-selling-plan) that are associated with the product either directly, or through the product's variants. */
    sellingPlanGroups: SellingPlanGroupConnection;
    /**
     * The [SEO title and description](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords)
     * that are associated with a product.
     *
     */
    seo: Seo;
    /**
     * A comma-separated list of searchable keywords that are
     * associated with the product. For example, a merchant might apply the `sports`
     * and `summer` tags to products that are associated with sportwear for summer.
     * Updating `tags` overwrites any existing tags that were previously added to the product.
     * To add new tags without overwriting existing tags,
     * use the GraphQL Admin API's [`tagsAdd`](/docs/api/admin-graphql/latest/mutations/tagsadd)
     * mutation.
     *
     */
    tags: Array<Scalars["String"]["output"]>;
    /**
     * The name for the product that displays to customers. The title is used to construct the product's handle.
     * For example, if a product is titled "Black Sunglasses", then the handle is `black-sunglasses`.
     *
     */
    title: Scalars["String"]["output"];
    /** The quantity of inventory that's in stock. */
    totalInventory: Maybe<Scalars["Int"]["output"]>;
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters: Maybe<Scalars["String"]["output"]>;
    /**
     * The date and time when the product was last modified.
     * A product's `updatedAt` value can change for different reasons. For example, if an order
     * is placed for a product that has inventory tracking set up, then the inventory adjustment
     * is counted as an update.
     *
     */
    updatedAt: Scalars["DateTime"]["output"];
    /**
     * Find a product’s variant based on its selected options.
     * This is useful for converting a user’s selection of product options into a single matching variant.
     * If there is not a variant for the selected options, `null` will be returned.
     *
     */
    variantBySelectedOptions: Maybe<ProductVariant>;
    /** A list of [variants](/docs/api/storefront/latest/objects/ProductVariant) that are associated with the product. */
    variants: ProductVariantConnection;
    /** The number of [variants](/docs/api/storefront/latest/objects/ProductVariant) that are associated with the product. */
    variantsCount: Maybe<Count>;
    /** The name of the product's vendor. */
    vendor: Scalars["String"]["output"];
  };

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductAdjacentVariantsArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars["Boolean"]["input"]>;
  ignoreUnknownOptions?: InputMaybe<Scalars["Boolean"]["input"]>;
  selectedOptions: InputMaybe<Array<SelectedOptionInput>>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductCollectionsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductDescriptionArgs = {
  truncateAt: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductImagesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ProductImageSortKeys>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMediaArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ProductMediaSortKeys>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductOptionsArgs = {
  first: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductSelectedOrFirstAvailableVariantArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars["Boolean"]["input"]>;
  ignoreUnknownOptions?: InputMaybe<Scalars["Boolean"]["input"]>;
  selectedOptions: InputMaybe<Array<SelectedOptionInput>>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductSellingPlanGroupsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductVariantBySelectedOptionsArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars["Boolean"]["input"]>;
  ignoreUnknownOptions?: InputMaybe<Scalars["Boolean"]["input"]>;
  selectedOptions: Array<SelectedOptionInput>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductVariantsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ProductVariantSortKeys>;
};

/** The set of valid sort keys for the ProductCollection query. */
export enum ProductCollectionSortKeys {
  /** Sort by the `best-selling` value. */
  BestSelling = "BEST_SELLING",
  /** Sort by the `collection-default` value. */
  CollectionDefault = "COLLECTION_DEFAULT",
  /** Sort by the `created` value. */
  Created = "CREATED",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `manual` value. */
  Manual = "MANUAL",
  /** Sort by the `price` value. */
  Price = "PRICE",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
}

/**
 * An auto-generated type for paginating through multiple Products.
 *
 */
export type ProductConnection = {
  /** A list of edges. */
  edges: Array<ProductEdge>;
  /** A list of available filters. */
  filters: Array<Filter>;
  /** A list of the nodes contained in ProductEdge. */
  nodes: Array<Product>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Product and a cursor during pagination.
 *
 */
export type ProductEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of ProductEdge. */
  node: Product;
};

/**
 * The input fields for a filter used to view a subset of products in a collection.
 * By default, the `available` and `price` filters are enabled. Filters are customized with the Shopify Search & Discovery app.
 * Learn more about [customizing storefront filtering](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).
 *
 */
export type ProductFilter = {
  /** Filter on if the product is available for sale. */
  available: InputMaybe<Scalars["Boolean"]["input"]>;
  /** A product category to filter on. */
  category: InputMaybe<CategoryFilter>;
  /** A range of prices to filter with-in. */
  price: InputMaybe<PriceRangeFilter>;
  /** A product metafield to filter on. */
  productMetafield: InputMaybe<MetafieldFilter>;
  /** The product type to filter on. */
  productType: InputMaybe<Scalars["String"]["input"]>;
  /** The product vendor to filter on. */
  productVendor: InputMaybe<Scalars["String"]["input"]>;
  /** A product tag to filter on. */
  tag: InputMaybe<Scalars["String"]["input"]>;
  /** A standard product attribute metafield to filter on. */
  taxonomyMetafield: InputMaybe<TaxonomyMetafieldFilter>;
  /** A variant metafield to filter on. */
  variantMetafield: InputMaybe<MetafieldFilter>;
  /** A variant option to filter on. */
  variantOption: InputMaybe<VariantOptionFilter>;
};

/** The set of valid sort keys for the ProductImage query. */
export enum ProductImageSortKeys {
  /** Sort by the `created_at` value. */
  CreatedAt = "CREATED_AT",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `position` value. */
  Position = "POSITION",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
}

/** The set of valid sort keys for the ProductMedia query. */
export enum ProductMediaSortKeys {
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `position` value. */
  Position = "POSITION",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
}

/**
 * Product property names like "Size", "Color", and "Material" that the customers can select.
 * Variants are selected based on permutations of these options.
 * 255 characters limit each.
 *
 */
export type ProductOption = Node & {
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The product option’s name. */
  name: Scalars["String"]["output"];
  /** The corresponding option value to the product option. */
  optionValues: Array<ProductOptionValue>;
  /**
   * The corresponding value to the product option name.
   * @deprecated Use `optionValues` instead.
   */
  values: Array<Scalars["String"]["output"]>;
};

/**
 * The product option value names. For example, "Red", "Blue", and "Green" for a "Color" option.
 *
 */
export type ProductOptionValue = Node & {
  /**
   * The product variant that combines this option value with the
   * lowest-position option values for all other options.
   *
   * This field will always return a variant, provided a variant including this option value exists.
   *
   */
  firstSelectableVariant: Maybe<ProductVariant>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The name of the product option value. */
  name: Scalars["String"]["output"];
  /** The swatch of the product option value. */
  swatch: Maybe<ProductOptionValueSwatch>;
};

/**
 * The product option value swatch.
 *
 */
export type ProductOptionValueSwatch = {
  /** The swatch color. */
  color: Maybe<Scalars["Color"]["output"]>;
  /** The swatch image. */
  image: Maybe<Media>;
};

/** The price range of the product. */
export type ProductPriceRange = {
  /** The highest variant's price. */
  maxVariantPrice: MoneyV2;
  /** The lowest variant's price. */
  minVariantPrice: MoneyV2;
};

/**
 * The recommendation intent that is used to generate product recommendations.
 * You can use intent to generate product recommendations according to different strategies.
 *
 */
export enum ProductRecommendationIntent {
  /** Offer customers products that are complementary to a product for which recommendations are to be fetched. An example is add-on products that display in a Pair it with section. */
  Complementary = "COMPLEMENTARY",
  /** Offer customers a mix of products that are similar or complementary to a product for which recommendations are to be fetched. An example is substitutable products that display in a You may also like section. */
  Related = "RELATED",
}

/** The set of valid sort keys for the Product query. */
export enum ProductSortKeys {
  /** Sort by the `best_selling` value. */
  BestSelling = "BEST_SELLING",
  /** Sort by the `created_at` value. */
  CreatedAt = "CREATED_AT",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `price` value. */
  Price = "PRICE",
  /** Sort by the `product_type` value. */
  ProductType = "PRODUCT_TYPE",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
  /** Sort by the `updated_at` value. */
  UpdatedAt = "UPDATED_AT",
  /** Sort by the `vendor` value. */
  Vendor = "VENDOR",
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariant = HasMetafields &
  Node & {
    /** Indicates if the product variant is available for sale. */
    availableForSale: Scalars["Boolean"]["output"];
    /** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
    barcode: Maybe<Scalars["String"]["output"]>;
    /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`. */
    compareAtPrice: Maybe<MoneyV2>;
    /**
     * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`.
     * @deprecated Use `compareAtPrice` instead.
     */
    compareAtPriceV2: Maybe<MoneyV2>;
    /**
     * List of bundles components included in the variant considering only fixed bundles.
     *
     */
    components: ProductVariantComponentConnection;
    /** Whether a product is out of stock but still available for purchase (used for backorders). */
    currentlyNotInStock: Scalars["Boolean"]["output"];
    /**
     * List of bundles that include this variant considering only fixed bundles.
     *
     */
    groupedBy: ProductVariantConnection;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** Image associated with the product variant. This field falls back to the product image if no image is available. */
    image: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The product variant’s price. */
    price: MoneyV2;
    /**
     * The product variant’s price.
     * @deprecated Use `price` instead.
     */
    priceV2: MoneyV2;
    /** The product object that the product variant belongs to. */
    product: Product;
    /** The total sellable quantity of the variant for online sales channels. */
    quantityAvailable: Maybe<Scalars["Int"]["output"]>;
    /** A list of quantity breaks for the product variant. */
    quantityPriceBreaks: QuantityPriceBreakConnection;
    /** The quantity rule for the product variant in a given context. */
    quantityRule: QuantityRule;
    /**
     * Whether a product variant requires components. The default value is `false`.
     * If `true`, then the product variant can only be purchased as a parent bundle with components.
     *
     */
    requiresComponents: Scalars["Boolean"]["output"];
    /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
    requiresShipping: Scalars["Boolean"]["output"];
    /** List of product options applied to the variant. */
    selectedOptions: Array<SelectedOption>;
    /** Represents an association between a variant and a selling plan. Selling plan allocations describe which selling plans are available for each variant, and what their impact is on pricing. */
    sellingPlanAllocations: SellingPlanAllocationConnection;
    /** The Shop Pay Installments pricing information for the product variant. */
    shopPayInstallmentsPricing: Maybe<ShopPayInstallmentsProductVariantPricing>;
    /** The SKU (stock keeping unit) associated with the variant. */
    sku: Maybe<Scalars["String"]["output"]>;
    /** The in-store pickup availability of this variant by location. */
    storeAvailability: StoreAvailabilityConnection;
    /** Whether tax is charged when the product variant is sold. */
    taxable: Scalars["Boolean"]["output"];
    /** The product variant’s title. */
    title: Scalars["String"]["output"];
    /** The unit price value for the variant based on the variant's measurement. */
    unitPrice: Maybe<MoneyV2>;
    /** The unit price measurement for the variant. */
    unitPriceMeasurement: Maybe<UnitPriceMeasurement>;
    /** The weight of the product variant in the unit system specified with `weight_unit`. */
    weight: Maybe<Scalars["Float"]["output"]>;
    /** Unit of measurement for weight. */
    weightUnit: WeightUnit;
  };

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantComponentsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantGroupedByArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantQuantityPriceBreaksArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantSellingPlanAllocationsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantStoreAvailabilityArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  near: InputMaybe<GeoCoordinateInput>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * Represents a component of a bundle variant.
 *
 */
export type ProductVariantComponent = {
  /** The product variant object that the component belongs to. */
  productVariant: ProductVariant;
  /** The quantity of component present in the bundle. */
  quantity: Scalars["Int"]["output"];
};

/**
 * An auto-generated type for paginating through multiple ProductVariantComponents.
 *
 */
export type ProductVariantComponentConnection = {
  /** A list of edges. */
  edges: Array<ProductVariantComponentEdge>;
  /** A list of the nodes contained in ProductVariantComponentEdge. */
  nodes: Array<ProductVariantComponent>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariantComponent and a cursor during pagination.
 *
 */
export type ProductVariantComponentEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of ProductVariantComponentEdge. */
  node: ProductVariantComponent;
};

/**
 * An auto-generated type for paginating through multiple ProductVariants.
 *
 */
export type ProductVariantConnection = {
  /** A list of edges. */
  edges: Array<ProductVariantEdge>;
  /** A list of the nodes contained in ProductVariantEdge. */
  nodes: Array<ProductVariant>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariant and a cursor during pagination.
 *
 */
export type ProductVariantEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of ProductVariantEdge. */
  node: ProductVariant;
};

/** The set of valid sort keys for the ProductVariant query. */
export enum ProductVariantSortKeys {
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `position` value. */
  Position = "POSITION",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `sku` value. */
  Sku = "SKU",
  /** Sort by the `title` value. */
  Title = "TITLE",
}

/** Represents information about the buyer that is interacting with the cart. */
export type PurchasingCompany = {
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
};

/**
 * Quantity price breaks lets you offer different rates that are based on the
 * amount of a specific variant being ordered.
 *
 */
export type QuantityPriceBreak = {
  /**
   * Minimum quantity required to reach new quantity break price.
   *
   */
  minimumQuantity: Scalars["Int"]["output"];
  /**
   * The price of variant after reaching the minimum quanity.
   *
   */
  price: MoneyV2;
};

/**
 * An auto-generated type for paginating through multiple QuantityPriceBreaks.
 *
 */
export type QuantityPriceBreakConnection = {
  /** A list of edges. */
  edges: Array<QuantityPriceBreakEdge>;
  /** A list of the nodes contained in QuantityPriceBreakEdge. */
  nodes: Array<QuantityPriceBreak>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one QuantityPriceBreak and a cursor during pagination.
 *
 */
export type QuantityPriceBreakEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of QuantityPriceBreakEdge. */
  node: QuantityPriceBreak;
};

/**
 * The quantity rule for the product variant in a given context.
 *
 */
export type QuantityRule = {
  /**
   * The value that specifies the quantity increment between minimum and maximum of the rule.
   * Only quantities divisible by this value will be considered valid.
   *
   * The increment must be lower than or equal to the minimum and the maximum, and both minimum and maximum
   * must be divisible by this value.
   *
   */
  increment: Scalars["Int"]["output"];
  /**
   * An optional value that defines the highest allowed quantity purchased by the customer.
   * If defined, maximum must be lower than or equal to the minimum and must be a multiple of the increment.
   *
   */
  maximum: Maybe<Scalars["Int"]["output"]>;
  /**
   * The value that defines the lowest allowed quantity purchased by the customer.
   * The minimum must be a multiple of the quantity rule's increment.
   *
   */
  minimum: Scalars["Int"]["output"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRoot = {
  /** Fetch a specific Article by its ID. */
  article: Maybe<Article>;
  /** List of the shop's articles. */
  articles: ArticleConnection;
  /** Fetch a specific `Blog` by one of its unique attributes. */
  blog: Maybe<Blog>;
  /**
   * Find a blog by its handle.
   * @deprecated Use `blog` instead.
   */
  blogByHandle: Maybe<Blog>;
  /** List of the shop's blogs. */
  blogs: BlogConnection;
  /**
   * Retrieve a cart by its ID. For more information, refer to
   * [Manage a cart with the Storefront API](https://shopify.dev/custom-storefronts/cart/manage).
   *
   */
  cart: Maybe<Cart>;
  /**
   * A poll for the status of the cart checkout completion and order creation.
   *
   */
  cartCompletionAttempt: Maybe<CartCompletionAttemptResult>;
  /** Fetch a specific `Collection` by one of its unique attributes. */
  collection: Maybe<Collection>;
  /**
   * Find a collection by its handle.
   * @deprecated Use `collection` instead.
   */
  collectionByHandle: Maybe<Collection>;
  /** List of the shop’s collections. */
  collections: CollectionConnection;
  /**
   * The customer associated with the given access token. Tokens are obtained by using the
   * [`customerAccessTokenCreate` mutation](https://shopify.dev/docs/api/storefront/latest/mutations/customerAccessTokenCreate).
   *
   */
  customer: Maybe<Customer>;
  /** Returns the localized experiences configured for the shop. */
  localization: Localization;
  /**
   * List of the shop's locations that support in-store pickup.
   *
   * When sorting by distance, you must specify a location via the `near` argument.
   *
   *
   */
  locations: LocationConnection;
  /** Retrieve a [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) by its handle. */
  menu: Maybe<Menu>;
  /** Fetch a specific Metaobject by one of its unique identifiers. */
  metaobject: Maybe<Metaobject>;
  /** All active metaobjects for the shop. */
  metaobjects: MetaobjectConnection;
  /** Returns a specific node by ID. */
  node: Maybe<Node>;
  /** Returns the list of nodes with the given IDs. */
  nodes: Array<Maybe<Node>>;
  /** Fetch a specific `Page` by one of its unique attributes. */
  page: Maybe<Page>;
  /**
   * Find a page by its handle.
   * @deprecated Use `page` instead.
   */
  pageByHandle: Maybe<Page>;
  /** List of the shop's pages. */
  pages: PageConnection;
  /** Settings related to payments. */
  paymentSettings: PaymentSettings;
  /** List of the predictive search results. */
  predictiveSearch: Maybe<PredictiveSearchResult>;
  /** Fetch a specific `Product` by one of its unique attributes. */
  product: Maybe<Product>;
  /**
   * Find a product by its handle.
   * @deprecated Use `product` instead.
   */
  productByHandle: Maybe<Product>;
  /**
   * Find recommended products related to a given `product_id`.
   * To learn more about how recommendations are generated, see
   * [*Showing product recommendations on product pages*](https://help.shopify.com/themes/development/recommended-products).
   *
   */
  productRecommendations: Maybe<Array<Product>>;
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   *
   */
  productTags: StringConnection;
  /** List of product types for the shop's products that are published to your app. */
  productTypes: StringConnection;
  /** Returns a list of the shop's products. For storefront search, use the [`search`](https://shopify.dev/docs/api/storefront/latest/queries/search) query. */
  products: ProductConnection;
  /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
  publicApiVersions: Array<ApiVersion>;
  /** List of the search results. */
  search: SearchResultItemConnection;
  /** The shop associated with the storefront access token. */
  shop: Shop;
  /** Contains all fields required to generate sitemaps. */
  sitemap: Sitemap;
  /** A list of redirects for a shop. */
  urlRedirects: UrlRedirectConnection;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootArticleArgs = {
  id: Scalars["ID"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootArticlesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ArticleSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogArgs = {
  handle: InputMaybe<Scalars["String"]["input"]>;
  id: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogByHandleArgs = {
  handle: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<BlogSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCartArgs = {
  id: Scalars["ID"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCartCompletionAttemptArgs = {
  attemptId: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionArgs = {
  handle: InputMaybe<Scalars["String"]["input"]>;
  id: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionByHandleArgs = {
  handle: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<CollectionSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCustomerArgs = {
  customerAccessToken: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootLocationsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  near: InputMaybe<GeoCoordinateInput>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<LocationSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMenuArgs = {
  handle: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMetaobjectArgs = {
  handle: InputMaybe<MetaobjectHandleInput>;
  id: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMetaobjectsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey: InputMaybe<Scalars["String"]["input"]>;
  type: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootNodeArgs = {
  id: Scalars["ID"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootNodesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPageArgs = {
  handle: InputMaybe<Scalars["String"]["input"]>;
  id: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPageByHandleArgs = {
  handle: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPagesArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<PageSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPredictiveSearchArgs = {
  limit: InputMaybe<Scalars["Int"]["input"]>;
  limitScope: InputMaybe<PredictiveSearchLimitScope>;
  query: Scalars["String"]["input"];
  searchableFields: InputMaybe<Array<SearchableField>>;
  types: InputMaybe<Array<PredictiveSearchType>>;
  unavailableProducts: InputMaybe<SearchUnavailableProductsType>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductArgs = {
  handle: InputMaybe<Scalars["String"]["input"]>;
  id: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductByHandleArgs = {
  handle: Scalars["String"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductRecommendationsArgs = {
  intent?: InputMaybe<ProductRecommendationIntent>;
  productHandle: InputMaybe<Scalars["String"]["input"]>;
  productId: InputMaybe<Scalars["ID"]["input"]>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductTagsArgs = {
  first: Scalars["Int"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductTypesArgs = {
  first: Scalars["Int"]["input"];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<ProductSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootSearchArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  prefix: InputMaybe<SearchPrefixQueryType>;
  productFilters: InputMaybe<Array<ProductFilter>>;
  query: Scalars["String"]["input"];
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortKey?: InputMaybe<SearchSortKeys>;
  types: InputMaybe<Array<SearchType>>;
  unavailableProducts: InputMaybe<SearchUnavailableProductsType>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootSitemapArgs = {
  type: SitemapType;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootUrlRedirectsArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  query: InputMaybe<Scalars["String"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** SEO information. */
export type Seo = {
  /** The meta description. */
  description: Maybe<Scalars["String"]["output"]>;
  /** The SEO title. */
  title: Maybe<Scalars["String"]["output"]>;
};

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 *
 */
export type ScriptDiscountApplication = DiscountApplication & {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application as defined by the Script. */
  title: Scalars["String"]["output"];
  /** The value of the discount application. */
  value: PricingValue;
};

/** Specifies whether to perform a partial word match on the last search term. */
export enum SearchPrefixQueryType {
  /** Perform a partial word match on the last search term. */
  Last = "LAST",
  /** Don't perform a partial word match on the last search term. */
  None = "NONE",
}

/** A search query suggestion. */
export type SearchQuerySuggestion = Trackable & {
  /** The text of the search query suggestion with highlighted HTML tags. */
  styledText: Scalars["String"]["output"];
  /** The text of the search query suggestion. */
  text: Scalars["String"]["output"];
  /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
  trackingParameters: Maybe<Scalars["String"]["output"]>;
};

/**
 * A search result that matches the search query.
 *
 */
export type SearchResultItem = Article | Page | Product;

/**
 * An auto-generated type for paginating through multiple SearchResultItems.
 *
 */
export type SearchResultItemConnection = {
  /** A list of edges. */
  edges: Array<SearchResultItemEdge>;
  /** A list of the nodes contained in SearchResultItemEdge. */
  nodes: Array<SearchResultItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of available filters. */
  productFilters: Array<Filter>;
  /** The total number of results. */
  totalCount: Scalars["Int"]["output"];
};

/**
 * An auto-generated type which holds one SearchResultItem and a cursor during pagination.
 *
 */
export type SearchResultItemEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of SearchResultItemEdge. */
  node: SearchResultItem;
};

/** The set of valid sort keys for the search query. */
export enum SearchSortKeys {
  /** Sort by the `price` value. */
  Price = "PRICE",
  /** Sort by relevance to the search terms. */
  Relevance = "RELEVANCE",
}

/** The types of search items to perform search within. */
export enum SearchType {
  /** Returns matching articles. */
  Article = "ARTICLE",
  /** Returns matching pages. */
  Page = "PAGE",
  /** Returns matching products. */
  Product = "PRODUCT",
}

/** Specifies whether to display results for unavailable products. */
export enum SearchUnavailableProductsType {
  /** Exclude unavailable products. */
  Hide = "HIDE",
  /** Show unavailable products after all other matching results. This is the default. */
  Last = "LAST",
  /** Show unavailable products in the order that they're found. */
  Show = "SHOW",
}

/** Specifies the list of resource fields to search. */
export enum SearchableField {
  /** Author of the page or article. */
  Author = "AUTHOR",
  /** Body of the page or article or product description or collection description. */
  Body = "BODY",
  /** Product type. */
  ProductType = "PRODUCT_TYPE",
  /** Tag associated with the product or article. */
  Tag = "TAG",
  /** Title of the page or article or product title or collection title. */
  Title = "TITLE",
  /** Variant barcode. */
  VariantsBarcode = "VARIANTS_BARCODE",
  /** Variant SKU. */
  VariantsSku = "VARIANTS_SKU",
  /** Variant title. */
  VariantsTitle = "VARIANTS_TITLE",
  /** Product vendor. */
  Vendor = "VENDOR",
}

/**
 * Properties used by customers to select a product variant.
 * Products can have multiple options, like different sizes or colors.
 *
 */
export type SelectedOption = {
  /** The product option’s name. */
  name: Scalars["String"]["output"];
  /** The product option’s value. */
  value: Scalars["String"]["output"];
};

/** The input fields required for a selected option. */
export type SelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars["String"]["input"];
  /** The product option’s value. */
  value: Scalars["String"]["input"];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlan = HasMetafields & {
  /** The billing policy for the selling plan. */
  billingPolicy: Maybe<SellingPlanBillingPolicy>;
  /** The initial payment due for the purchase. */
  checkoutCharge: SellingPlanCheckoutCharge;
  /** The delivery policy for the selling plan. */
  deliveryPolicy: Maybe<SellingPlanDeliveryPolicy>;
  /** The description of the selling plan. */
  description: Maybe<Scalars["String"]["output"]>;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars["String"]["output"];
  /** The selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing. */
  options: Array<SellingPlanOption>;
  /** The price adjustments that a selling plan makes when a variant is purchased with a selling plan. */
  priceAdjustments: Array<SellingPlanPriceAdjustment>;
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars["Boolean"]["output"];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents an association between a variant and a selling plan. Selling plan allocations describe the options offered for each variant, and the price of the variant when purchased with a selling plan. */
export type SellingPlanAllocation = {
  /** The checkout charge amount due for the purchase. */
  checkoutChargeAmount: MoneyV2;
  /** A list of price adjustments, with a maximum of two. When there are two, the first price adjustment goes into effect at the time of purchase, while the second one starts after a certain number of orders. A price adjustment represents how a selling plan affects pricing when a variant is purchased with a selling plan. Prices display in the customer's currency if the shop is configured for it. */
  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
  /** The remaining balance charge amount due for the purchase. */
  remainingBalanceChargeAmount: MoneyV2;
  /** A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlan: SellingPlan;
};

/**
 * An auto-generated type for paginating through multiple SellingPlanAllocations.
 *
 */
export type SellingPlanAllocationConnection = {
  /** A list of edges. */
  edges: Array<SellingPlanAllocationEdge>;
  /** A list of the nodes contained in SellingPlanAllocationEdge. */
  nodes: Array<SellingPlanAllocation>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one SellingPlanAllocation and a cursor during pagination.
 *
 */
export type SellingPlanAllocationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of SellingPlanAllocationEdge. */
  node: SellingPlanAllocation;
};

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export type SellingPlanAllocationPriceAdjustment = {
  /** The price of the variant when it's purchased without a selling plan for the same number of deliveries. For example, if a customer purchases 6 deliveries of $10.00 granola separately, then the price is 6 x $10.00 = $60.00. */
  compareAtPrice: MoneyV2;
  /** The effective price for a single delivery. For example, for a prepaid subscription plan that includes 6 deliveries at the price of $48.00, the per delivery price is $8.00. */
  perDeliveryPrice: MoneyV2;
  /** The price of the variant when it's purchased with a selling plan For example, for a prepaid subscription plan that includes 6 deliveries of $10.00 granola, where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00. */
  price: MoneyV2;
  /** The resulting price per unit for the variant associated with the selling plan. If the variant isn't sold by quantity or measurement, then this field returns `null`. */
  unitPrice: Maybe<MoneyV2>;
};

/** The selling plan billing policy. */
export type SellingPlanBillingPolicy = SellingPlanRecurringBillingPolicy;

/** The initial payment due for the purchase. */
export type SellingPlanCheckoutCharge = {
  /** The charge type for the checkout charge. */
  type: SellingPlanCheckoutChargeType;
  /** The charge value for the checkout charge. */
  value: SellingPlanCheckoutChargeValue;
};

/** The percentage value of the price used for checkout charge. */
export type SellingPlanCheckoutChargePercentageValue = {
  /** The percentage value of the price used for checkout charge. */
  percentage: Scalars["Float"]["output"];
};

/** The checkout charge when the full amount isn't charged at checkout. */
export enum SellingPlanCheckoutChargeType {
  /** The checkout charge is a percentage of the product or variant price. */
  Percentage = "PERCENTAGE",
  /** The checkout charge is a fixed price amount. */
  Price = "PRICE",
}

/** The portion of the price to be charged at checkout. */
export type SellingPlanCheckoutChargeValue =
  | MoneyV2
  | SellingPlanCheckoutChargePercentageValue;

/**
 * An auto-generated type for paginating through multiple SellingPlans.
 *
 */
export type SellingPlanConnection = {
  /** A list of edges. */
  edges: Array<SellingPlanEdge>;
  /** A list of the nodes contained in SellingPlanEdge. */
  nodes: Array<SellingPlan>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** The selling plan delivery policy. */
export type SellingPlanDeliveryPolicy = SellingPlanRecurringDeliveryPolicy;

/**
 * An auto-generated type which holds one SellingPlan and a cursor during pagination.
 *
 */
export type SellingPlanEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of SellingPlanEdge. */
  node: SellingPlan;
};

/** A fixed amount that's deducted from the original variant price. For example, $10.00 off. */
export type SellingPlanFixedAmountPriceAdjustment = {
  /** The money value of the price adjustment. */
  adjustmentAmount: MoneyV2;
};

/** A fixed price adjustment for a variant that's purchased with a selling plan. */
export type SellingPlanFixedPriceAdjustment = {
  /** A new price of the variant when it's purchased with the selling plan. */
  price: MoneyV2;
};

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type SellingPlanGroup = {
  /** A display friendly name for the app that created the selling plan group. */
  appName: Maybe<Scalars["String"]["output"]>;
  /** The name of the selling plan group. */
  name: Scalars["String"]["output"];
  /** Represents the selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. */
  options: Array<SellingPlanGroupOption>;
  /** A list of selling plans in a selling plan group. A selling plan is a representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlans: SellingPlanConnection;
};

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type SellingPlanGroupSellingPlansArgs = {
  after: InputMaybe<Scalars["String"]["input"]>;
  before: InputMaybe<Scalars["String"]["input"]>;
  first: InputMaybe<Scalars["Int"]["input"]>;
  last: InputMaybe<Scalars["Int"]["input"]>;
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/**
 * An auto-generated type for paginating through multiple SellingPlanGroups.
 *
 */
export type SellingPlanGroupConnection = {
  /** A list of edges. */
  edges: Array<SellingPlanGroupEdge>;
  /** A list of the nodes contained in SellingPlanGroupEdge. */
  nodes: Array<SellingPlanGroup>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one SellingPlanGroup and a cursor during pagination.
 *
 */
export type SellingPlanGroupEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of SellingPlanGroupEdge. */
  node: SellingPlanGroup;
};

/**
 * Represents an option on a selling plan group that's available in the drop-down list in the storefront.
 *
 * Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing.
 */
export type SellingPlanGroupOption = {
  /** The name of the option. For example, 'Delivery every'. */
  name: Scalars["String"]["output"];
  /** The values for the options specified by the selling plans in the selling plan group. For example, '1 week', '2 weeks', '3 weeks'. */
  values: Array<Scalars["String"]["output"]>;
};

/** Represents a valid selling plan interval. */
export enum SellingPlanInterval {
  /** Day interval. */
  Day = "DAY",
  /** Month interval. */
  Month = "MONTH",
  /** Week interval. */
  Week = "WEEK",
  /** Year interval. */
  Year = "YEAR",
}

/** An option provided by a Selling Plan. */
export type SellingPlanOption = {
  /** The name of the option (ie "Delivery every"). */
  name: Maybe<Scalars["String"]["output"]>;
  /** The value of the option (ie "Month"). */
  value: Maybe<Scalars["String"]["output"]>;
};

/** A percentage amount that's deducted from the original variant price. For example, 10% off. */
export type SellingPlanPercentagePriceAdjustment = {
  /** The percentage value of the price adjustment. */
  adjustmentPercentage: Scalars["Float"]["output"];
};

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. If a variant has multiple price adjustments, then the first price adjustment applies when the variant is initially purchased. The second price adjustment applies after a certain number of orders (specified by the `orderCount` field) are made. If a selling plan doesn't have any price adjustments, then the unadjusted price of the variant is the effective price. */
export type SellingPlanPriceAdjustment = {
  /** The type of price adjustment. An adjustment value can have one of three types: percentage, amount off, or a new price. */
  adjustmentValue: SellingPlanPriceAdjustmentValue;
  /** The number of orders that the price adjustment applies to. If the price adjustment always applies, then this field is `null`. */
  orderCount: Maybe<Scalars["Int"]["output"]>;
};

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. */
export type SellingPlanPriceAdjustmentValue =
  | SellingPlanFixedAmountPriceAdjustment
  | SellingPlanFixedPriceAdjustment
  | SellingPlanPercentagePriceAdjustment;

/** The recurring billing policy for the selling plan. */
export type SellingPlanRecurringBillingPolicy = {
  /** The billing frequency, it can be either: day, week, month or year. */
  interval: SellingPlanInterval;
  /** The number of intervals between billings. */
  intervalCount: Scalars["Int"]["output"];
};

/** The recurring delivery policy for the selling plan. */
export type SellingPlanRecurringDeliveryPolicy = {
  /** The delivery frequency, it can be either: day, week, month or year. */
  interval: SellingPlanInterval;
  /** The number of intervals between deliveries. */
  intervalCount: Scalars["Int"]["output"];
};

/** Shop represents a collection of the general settings and information about the shop. */
export type Shop = HasMetafields &
  Node & {
    /** The shop's branding configuration. */
    brand: Maybe<Brand>;
    /** The URL for the customer account (only present if shop has a customer account vanity domain). */
    customerAccountUrl: Maybe<Scalars["String"]["output"]>;
    /** A description of the shop. */
    description: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** A string representing the way currency is formatted when the currency isn’t specified. */
    moneyFormat: Scalars["String"]["output"];
    /** The shop’s name. */
    name: Scalars["String"]["output"];
    /** Settings related to payments. */
    paymentSettings: PaymentSettings;
    /** The primary domain of the shop’s Online Store. */
    primaryDomain: Domain;
    /** The shop’s privacy policy. */
    privacyPolicy: Maybe<ShopPolicy>;
    /** The shop’s refund policy. */
    refundPolicy: Maybe<ShopPolicy>;
    /** The shop’s shipping policy. */
    shippingPolicy: Maybe<ShopPolicy>;
    /** Countries that the shop ships to. */
    shipsToCountries: Array<CountryCode>;
    /** The Shop Pay Installments pricing information for the shop. */
    shopPayInstallmentsPricing: Maybe<ShopPayInstallmentsPricing>;
    /** The shop’s subscription policy. */
    subscriptionPolicy: Maybe<ShopPolicyWithDefault>;
    /** The shop’s terms of service. */
    termsOfService: Maybe<ShopPolicy>;
  };

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopMetafieldArgs = {
  key: Scalars["String"]["input"];
  namespace: InputMaybe<Scalars["String"]["input"]>;
};

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The financing plan in Shop Pay Installments. */
export type ShopPayInstallmentsFinancingPlan = Node & {
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The maximum price to qualify for the financing plan. */
  maxPrice: MoneyV2;
  /** The minimum price to qualify for the financing plan. */
  minPrice: MoneyV2;
  /** The terms of the financing plan. */
  terms: Array<ShopPayInstallmentsFinancingPlanTerm>;
};

/** The payment frequency for a Shop Pay Installments Financing Plan. */
export enum ShopPayInstallmentsFinancingPlanFrequency {
  /** Monthly payment frequency. */
  Monthly = "MONTHLY",
  /** Weekly payment frequency. */
  Weekly = "WEEKLY",
}

/** The terms of the financing plan in Shop Pay Installments. */
export type ShopPayInstallmentsFinancingPlanTerm = Node & {
  /** The annual percentage rate (APR) of the financing plan. */
  apr: Scalars["Int"]["output"];
  /** The payment frequency for the financing plan. */
  frequency: ShopPayInstallmentsFinancingPlanFrequency;
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** The number of installments for the financing plan. */
  installmentsCount: Maybe<Count>;
  /** The type of loan for the financing plan. */
  loanType: ShopPayInstallmentsLoan;
};

/** The loan type for a Shop Pay Installments Financing Plan Term. */
export enum ShopPayInstallmentsLoan {
  /** An interest-bearing loan type. */
  Interest = "INTEREST",
  /** A split-pay loan type. */
  SplitPay = "SPLIT_PAY",
  /** A zero-percent loan type. */
  ZeroPercent = "ZERO_PERCENT",
}

/** The result for a Shop Pay Installments pricing request. */
export type ShopPayInstallmentsPricing = {
  /** The financing plans available for the given price range. */
  financingPlans: Array<ShopPayInstallmentsFinancingPlan>;
  /** The maximum price to qualify for financing. */
  maxPrice: MoneyV2;
  /** The minimum price to qualify for financing. */
  minPrice: MoneyV2;
};

/** The shop pay installments pricing information for a product variant. */
export type ShopPayInstallmentsProductVariantPricing = Node & {
  /** Whether the product variant is available. */
  available: Scalars["Boolean"]["output"];
  /** Whether the product variant is eligible for Shop Pay Installments. */
  eligible: Scalars["Boolean"]["output"];
  /** The full price of the product variant. */
  fullPrice: MoneyV2;
  /** The ID of the product variant. */
  id: Scalars["ID"]["output"];
  /** The number of payment terms available for the product variant. */
  installmentsCount: Maybe<Count>;
  /** The price per term for the product variant. */
  pricePerTerm: MoneyV2;
};

/** Represents a Shop Pay payment request. */
export type ShopPayPaymentRequest = {
  /** The delivery methods for the payment request. */
  deliveryMethods: Array<ShopPayPaymentRequestDeliveryMethod>;
  /** The discount codes for the payment request. */
  discountCodes: Array<Scalars["String"]["output"]>;
  /** The discounts for the payment request order. */
  discounts: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The line items for the payment request. */
  lineItems: Array<ShopPayPaymentRequestLineItem>;
  /** The locale for the payment request. */
  locale: Scalars["String"]["output"];
  /** The presentment currency for the payment request. */
  presentmentCurrency: CurrencyCode;
  /** The delivery method type for the payment request. */
  selectedDeliveryMethodType: ShopPayPaymentRequestDeliveryMethodType;
  /** The shipping address for the payment request. */
  shippingAddress: Maybe<ShopPayPaymentRequestContactField>;
  /** The shipping lines for the payment request. */
  shippingLines: Array<ShopPayPaymentRequestShippingLine>;
  /** The subtotal amount for the payment request. */
  subtotal: MoneyV2;
  /** The total amount for the payment request. */
  total: MoneyV2;
  /** The total shipping price for the payment request. */
  totalShippingPrice: Maybe<ShopPayPaymentRequestTotalShippingPrice>;
  /** The total tax for the payment request. */
  totalTax: Maybe<MoneyV2>;
};

/** Represents a contact field for a Shop Pay payment request. */
export type ShopPayPaymentRequestContactField = {
  /** The first address line of the contact field. */
  address1: Scalars["String"]["output"];
  /** The second address line of the contact field. */
  address2: Maybe<Scalars["String"]["output"]>;
  /** The city of the contact field. */
  city: Scalars["String"]["output"];
  /** The company name of the contact field. */
  companyName: Maybe<Scalars["String"]["output"]>;
  /** The country of the contact field. */
  countryCode: Scalars["String"]["output"];
  /** The email of the contact field. */
  email: Maybe<Scalars["String"]["output"]>;
  /** The first name of the contact field. */
  firstName: Scalars["String"]["output"];
  /** The first name of the contact field. */
  lastName: Scalars["String"]["output"];
  /** The phone number of the contact field. */
  phone: Maybe<Scalars["String"]["output"]>;
  /** The postal code of the contact field. */
  postalCode: Maybe<Scalars["String"]["output"]>;
  /** The province of the contact field. */
  provinceCode: Maybe<Scalars["String"]["output"]>;
};

/** Represents a delivery method for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethod = {
  /** The amount for the delivery method. */
  amount: MoneyV2;
  /** The code of the delivery method. */
  code: Scalars["String"]["output"];
  /** The detail about when the delivery may be expected. */
  deliveryExpectationLabel: Maybe<Scalars["String"]["output"]>;
  /** The detail of the delivery method. */
  detail: Maybe<Scalars["String"]["output"]>;
  /** The label of the delivery method. */
  label: Scalars["String"]["output"];
  /** The maximum delivery date for the delivery method. */
  maxDeliveryDate: Maybe<Scalars["ISO8601DateTime"]["output"]>;
  /** The minimum delivery date for the delivery method. */
  minDeliveryDate: Maybe<Scalars["ISO8601DateTime"]["output"]>;
};

/** The input fields to create a delivery method for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethodInput = {
  /** The amount for the delivery method. */
  amount: InputMaybe<MoneyInput>;
  /** The code of the delivery method. */
  code: InputMaybe<Scalars["String"]["input"]>;
  /** The detail about when the delivery may be expected. */
  deliveryExpectationLabel: InputMaybe<Scalars["String"]["input"]>;
  /** The detail of the delivery method. */
  detail: InputMaybe<Scalars["String"]["input"]>;
  /** The label of the delivery method. */
  label: InputMaybe<Scalars["String"]["input"]>;
  /** The maximum delivery date for the delivery method. */
  maxDeliveryDate: InputMaybe<Scalars["ISO8601DateTime"]["input"]>;
  /** The minimum delivery date for the delivery method. */
  minDeliveryDate: InputMaybe<Scalars["ISO8601DateTime"]["input"]>;
};

/** Represents the delivery method type for a Shop Pay payment request. */
export enum ShopPayPaymentRequestDeliveryMethodType {
  /** The delivery method type is pickup. */
  Pickup = "PICKUP",
  /** The delivery method type is shipping. */
  Shipping = "SHIPPING",
}

/** Represents a discount for a Shop Pay payment request. */
export type ShopPayPaymentRequestDiscount = {
  /** The amount of the discount. */
  amount: MoneyV2;
  /** The label of the discount. */
  label: Scalars["String"]["output"];
};

/** The input fields to create a discount for a Shop Pay payment request. */
export type ShopPayPaymentRequestDiscountInput = {
  /** The amount of the discount. */
  amount: InputMaybe<MoneyInput>;
  /** The label of the discount. */
  label: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents an image for a Shop Pay payment request line item. */
export type ShopPayPaymentRequestImage = {
  /** The alt text of the image. */
  alt: Maybe<Scalars["String"]["output"]>;
  /** The source URL of the image. */
  url: Scalars["String"]["output"];
};

/** The input fields to create an image for a Shop Pay payment request. */
export type ShopPayPaymentRequestImageInput = {
  /** The alt text of the image. */
  alt: InputMaybe<Scalars["String"]["input"]>;
  /** The source URL of the image. */
  url: Scalars["String"]["input"];
};

/** The input fields represent a Shop Pay payment request. */
export type ShopPayPaymentRequestInput = {
  /**
   * The delivery methods for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethods: InputMaybe<Array<ShopPayPaymentRequestDeliveryMethodInput>>;
  /**
   * The discount codes for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes: InputMaybe<Array<Scalars["String"]["input"]>>;
  /**
   * The discounts for the payment request order.
   *
   * The input must not contain more than `250` values.
   */
  discounts: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /**
   * The line items for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  lineItems: InputMaybe<Array<ShopPayPaymentRequestLineItemInput>>;
  /** The locale for the payment request. */
  locale: Scalars["String"]["input"];
  /** The encrypted payment method for the payment request. */
  paymentMethod: InputMaybe<Scalars["String"]["input"]>;
  /** The presentment currency for the payment request. */
  presentmentCurrency: CurrencyCode;
  /** The delivery method type for the payment request. */
  selectedDeliveryMethodType: InputMaybe<ShopPayPaymentRequestDeliveryMethodType>;
  /**
   * The shipping lines for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  shippingLines: InputMaybe<Array<ShopPayPaymentRequestShippingLineInput>>;
  /** The subtotal amount for the payment request. */
  subtotal: MoneyInput;
  /** The total amount for the payment request. */
  total: MoneyInput;
  /** The total shipping price for the payment request. */
  totalShippingPrice: InputMaybe<ShopPayPaymentRequestTotalShippingPriceInput>;
  /** The total tax for the payment request. */
  totalTax: InputMaybe<MoneyInput>;
};

/** Represents a line item for a Shop Pay payment request. */
export type ShopPayPaymentRequestLineItem = {
  /** The final item price for the line item. */
  finalItemPrice: MoneyV2;
  /** The final line price for the line item. */
  finalLinePrice: MoneyV2;
  /** The image of the line item. */
  image: Maybe<ShopPayPaymentRequestImage>;
  /** The item discounts for the line item. */
  itemDiscounts: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The label of the line item. */
  label: Scalars["String"]["output"];
  /** The line discounts for the line item. */
  lineDiscounts: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The original item price for the line item. */
  originalItemPrice: Maybe<MoneyV2>;
  /** The original line price for the line item. */
  originalLinePrice: Maybe<MoneyV2>;
  /** The quantity of the line item. */
  quantity: Scalars["Int"]["output"];
  /** Whether the line item requires shipping. */
  requiresShipping: Maybe<Scalars["Boolean"]["output"]>;
  /** The SKU of the line item. */
  sku: Maybe<Scalars["String"]["output"]>;
};

/** The input fields to create a line item for a Shop Pay payment request. */
export type ShopPayPaymentRequestLineItemInput = {
  /** The final item price for the line item. */
  finalItemPrice: InputMaybe<MoneyInput>;
  /** The final line price for the line item. */
  finalLinePrice: InputMaybe<MoneyInput>;
  /** The image of the line item. */
  image: InputMaybe<ShopPayPaymentRequestImageInput>;
  /**
   * The item discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  itemDiscounts: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The label of the line item. */
  label: InputMaybe<Scalars["String"]["input"]>;
  /**
   * The line discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  lineDiscounts: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The original item price for the line item. */
  originalItemPrice: InputMaybe<MoneyInput>;
  /** The original line price for the line item. */
  originalLinePrice: InputMaybe<MoneyInput>;
  /** The quantity of the line item. */
  quantity: Scalars["Int"]["input"];
  /** Whether the line item requires shipping. */
  requiresShipping: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The SKU of the line item. */
  sku: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents a receipt for a Shop Pay payment request. */
export type ShopPayPaymentRequestReceipt = {
  /** The payment request object. */
  paymentRequest: ShopPayPaymentRequest;
  /** The processing status. */
  processingStatusType: Scalars["String"]["output"];
  /** The token of the receipt. */
  token: Scalars["String"]["output"];
};

/** Represents a Shop Pay payment request session. */
export type ShopPayPaymentRequestSession = {
  /** The checkout URL of the Shop Pay payment request session. */
  checkoutUrl: Scalars["URL"]["output"];
  /** The payment request associated with the Shop Pay payment request session. */
  paymentRequest: ShopPayPaymentRequest;
  /** The source identifier of the Shop Pay payment request session. */
  sourceIdentifier: Scalars["String"]["output"];
  /** The token of the Shop Pay payment request session. */
  token: Scalars["String"]["output"];
};

/** Return type for `shopPayPaymentRequestSessionCreate` mutation. */
export type ShopPayPaymentRequestSessionCreatePayload = {
  /** The new Shop Pay payment request session object. */
  shopPayPaymentRequestSession: Maybe<ShopPayPaymentRequestSession>;
  /** Error codes for failed Shop Pay payment request session mutations. */
  userErrors: Array<UserErrorsShopPayPaymentRequestSessionUserErrors>;
};

/** Return type for `shopPayPaymentRequestSessionSubmit` mutation. */
export type ShopPayPaymentRequestSessionSubmitPayload = {
  /** The checkout on which the payment was applied. */
  paymentRequestReceipt: Maybe<ShopPayPaymentRequestReceipt>;
  /** Error codes for failed Shop Pay payment request session mutations. */
  userErrors: Array<UserErrorsShopPayPaymentRequestSessionUserErrors>;
};

/** Represents a shipping line for a Shop Pay payment request. */
export type ShopPayPaymentRequestShippingLine = {
  /** The amount for the shipping line. */
  amount: MoneyV2;
  /** The code of the shipping line. */
  code: Scalars["String"]["output"];
  /** The label of the shipping line. */
  label: Scalars["String"]["output"];
};

/** The input fields to create a shipping line for a Shop Pay payment request. */
export type ShopPayPaymentRequestShippingLineInput = {
  /** The amount for the shipping line. */
  amount: InputMaybe<MoneyInput>;
  /** The code of the shipping line. */
  code: InputMaybe<Scalars["String"]["input"]>;
  /** The label of the shipping line. */
  label: InputMaybe<Scalars["String"]["input"]>;
};

/** Represents a shipping total for a Shop Pay payment request. */
export type ShopPayPaymentRequestTotalShippingPrice = {
  /** The discounts for the shipping total. */
  discounts: Array<ShopPayPaymentRequestDiscount>;
  /** The final total for the shipping total. */
  finalTotal: MoneyV2;
  /** The original total for the shipping total. */
  originalTotal: Maybe<MoneyV2>;
};

/** The input fields to create a shipping total for a Shop Pay payment request. */
export type ShopPayPaymentRequestTotalShippingPriceInput = {
  /**
   * The discounts for the shipping total.
   *
   * The input must not contain more than `250` values.
   */
  discounts: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The final total for the shipping total. */
  finalTotal: InputMaybe<MoneyInput>;
  /** The original total for the shipping total. */
  originalTotal: InputMaybe<MoneyInput>;
};

/**
 * The input fields for submitting Shop Pay payment method information for checkout.
 *
 */
export type ShopPayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** Session token for transaction. */
  sessionToken: Scalars["String"]["input"];
};

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export type ShopPolicy = Node & {
  /** Policy text, maximum size of 64kb. */
  body: Scalars["String"]["output"];
  /** Policy’s handle. */
  handle: Scalars["String"]["output"];
  /** A globally-unique ID. */
  id: Scalars["ID"]["output"];
  /** Policy’s title. */
  title: Scalars["String"]["output"];
  /** Public URL to the policy. */
  url: Scalars["URL"]["output"];
};

/**
 * A policy for the store that comes with a default value, such as a subscription policy.
 * If the merchant hasn't configured a policy for their store, then the policy will return the default value.
 * Otherwise, the policy will return the merchant-configured value.
 *
 */
export type ShopPolicyWithDefault = {
  /** The text of the policy. Maximum size: 64KB. */
  body: Scalars["String"]["output"];
  /** The handle of the policy. */
  handle: Scalars["String"]["output"];
  /** The unique ID of the policy. A default policy doesn't have an ID. */
  id: Maybe<Scalars["ID"]["output"]>;
  /** The title of the policy. */
  title: Scalars["String"]["output"];
  /** Public URL to the policy. */
  url: Scalars["URL"]["output"];
};

/** Contains all fields required to generate sitemaps. */
export type Sitemap = {
  /** The number of sitemap's pages for a given type. */
  pagesCount: Maybe<Count>;
  /**
   * A list of sitemap's resources for a given type.
   *
   * Important Notes:
   *   - The number of items per page varies from 0 to 250.
   *   - Empty pages (0 items) may occur and do not necessarily indicate the end of results.
   *   - Always check `hasNextPage` to determine if more pages are available.
   *
   */
  resources: Maybe<PaginatedSitemapResources>;
};

/** Contains all fields required to generate sitemaps. */
export type SitemapResourcesArgs = {
  page: Scalars["Int"]["input"];
};

/** Represents a sitemap's image. */
export type SitemapImage = {
  /** Image's alt text. */
  alt: Maybe<Scalars["String"]["output"]>;
  /** Path to the image. */
  filepath: Maybe<Scalars["String"]["output"]>;
  /** The date and time when the image was updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** Represents a sitemap resource that is not a metaobject. */
export type SitemapResource = SitemapResourceInterface & {
  /** Resource's handle. */
  handle: Scalars["String"]["output"];
  /** Resource's image. */
  image: Maybe<SitemapImage>;
  /** Resource's title. */
  title: Maybe<Scalars["String"]["output"]>;
  /** The date and time when the resource was updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** Represents the common fields for all sitemap resource types. */
export type SitemapResourceInterface = {
  /** Resource's handle. */
  handle: Scalars["String"]["output"];
  /** The date and time when the resource was updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

/**
 * A SitemapResourceMetaobject represents a metaobject with
 * [the `renderable` capability](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities#render-metaobjects-as-web-pages).
 *
 */
export type SitemapResourceMetaobject = SitemapResourceInterface & {
  /** Resource's handle. */
  handle: Scalars["String"]["output"];
  /** The URL handle for accessing pages of this metaobject type in the Online Store. */
  onlineStoreUrlHandle: Maybe<Scalars["String"]["output"]>;
  /** The type of the metaobject. Defines the namespace of its associated metafields. */
  type: Scalars["String"]["output"];
  /** The date and time when the resource was updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

/** The types of resources potentially present in a sitemap. */
export enum SitemapType {
  /** Articles present in the sitemap. */
  Article = "ARTICLE",
  /** Blogs present in the sitemap. */
  Blog = "BLOG",
  /** Collections present in the sitemap. */
  Collection = "COLLECTION",
  /**
   * Metaobjects present in the sitemap. Only metaobject types with the
   * [`renderable` capability](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities#render-metaobjects-as-web-pages)
   * are included in sitemap.
   *
   */
  Metaobject = "METAOBJECT",
  /** Pages present in the sitemap. */
  Page = "PAGE",
  /** Products present in the sitemap. */
  Product = "PRODUCT",
}

/**
 * The availability of a product variant at a particular location.
 * Local pick-up must be enabled in the  store's shipping settings, otherwise this will return an empty result.
 *
 */
export type StoreAvailability = {
  /** Whether the product variant is in-stock at this location. */
  available: Scalars["Boolean"]["output"];
  /** The location where this product variant is stocked at. */
  location: Location;
  /** Returns the estimated amount of time it takes for pickup to be ready (Example: Usually ready in 24 hours). */
  pickUpTime: Scalars["String"]["output"];
  /** The quantity of the product variant in-stock at this location. */
  quantityAvailable: Scalars["Int"]["output"];
};

/**
 * An auto-generated type for paginating through multiple StoreAvailabilities.
 *
 */
export type StoreAvailabilityConnection = {
  /** A list of edges. */
  edges: Array<StoreAvailabilityEdge>;
  /** A list of the nodes contained in StoreAvailabilityEdge. */
  nodes: Array<StoreAvailability>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one StoreAvailability and a cursor during pagination.
 *
 */
export type StoreAvailabilityEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of StoreAvailabilityEdge. */
  node: StoreAvailability;
};

/**
 * An auto-generated type for paginating through multiple Strings.
 *
 */
export type StringConnection = {
  /** A list of edges. */
  edges: Array<StringEdge>;
  /** A list of the nodes contained in StringEdge. */
  nodes: Array<Scalars["String"]["output"]>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one String and a cursor during pagination.
 *
 */
export type StringEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of StringEdge. */
  node: Scalars["String"]["output"];
};

/** An error that occurred during cart submit for completion. */
export type SubmissionError = {
  /** The error code. */
  code: SubmissionErrorCode;
  /** The error message. */
  message: Maybe<Scalars["String"]["output"]>;
};

/** The code of the error that occurred during cart submit for completion. */
export enum SubmissionErrorCode {
  BuyerIdentityEmailIsInvalid = "BUYER_IDENTITY_EMAIL_IS_INVALID",
  BuyerIdentityEmailRequired = "BUYER_IDENTITY_EMAIL_REQUIRED",
  BuyerIdentityPhoneIsInvalid = "BUYER_IDENTITY_PHONE_IS_INVALID",
  DeliveryAddress1Invalid = "DELIVERY_ADDRESS1_INVALID",
  DeliveryAddress1Required = "DELIVERY_ADDRESS1_REQUIRED",
  DeliveryAddress1TooLong = "DELIVERY_ADDRESS1_TOO_LONG",
  DeliveryAddress2Invalid = "DELIVERY_ADDRESS2_INVALID",
  DeliveryAddress2Required = "DELIVERY_ADDRESS2_REQUIRED",
  DeliveryAddress2TooLong = "DELIVERY_ADDRESS2_TOO_LONG",
  DeliveryAddressRequired = "DELIVERY_ADDRESS_REQUIRED",
  DeliveryCityInvalid = "DELIVERY_CITY_INVALID",
  DeliveryCityRequired = "DELIVERY_CITY_REQUIRED",
  DeliveryCityTooLong = "DELIVERY_CITY_TOO_LONG",
  DeliveryCompanyInvalid = "DELIVERY_COMPANY_INVALID",
  DeliveryCompanyRequired = "DELIVERY_COMPANY_REQUIRED",
  DeliveryCompanyTooLong = "DELIVERY_COMPANY_TOO_LONG",
  DeliveryCountryRequired = "DELIVERY_COUNTRY_REQUIRED",
  DeliveryFirstNameInvalid = "DELIVERY_FIRST_NAME_INVALID",
  DeliveryFirstNameRequired = "DELIVERY_FIRST_NAME_REQUIRED",
  DeliveryFirstNameTooLong = "DELIVERY_FIRST_NAME_TOO_LONG",
  DeliveryInvalidPostalCodeForCountry = "DELIVERY_INVALID_POSTAL_CODE_FOR_COUNTRY",
  DeliveryInvalidPostalCodeForZone = "DELIVERY_INVALID_POSTAL_CODE_FOR_ZONE",
  DeliveryLastNameInvalid = "DELIVERY_LAST_NAME_INVALID",
  DeliveryLastNameRequired = "DELIVERY_LAST_NAME_REQUIRED",
  DeliveryLastNameTooLong = "DELIVERY_LAST_NAME_TOO_LONG",
  DeliveryNoDeliveryAvailable = "DELIVERY_NO_DELIVERY_AVAILABLE",
  DeliveryNoDeliveryAvailableForMerchandiseLine = "DELIVERY_NO_DELIVERY_AVAILABLE_FOR_MERCHANDISE_LINE",
  DeliveryOptionsPhoneNumberInvalid = "DELIVERY_OPTIONS_PHONE_NUMBER_INVALID",
  DeliveryOptionsPhoneNumberRequired = "DELIVERY_OPTIONS_PHONE_NUMBER_REQUIRED",
  DeliveryPhoneNumberInvalid = "DELIVERY_PHONE_NUMBER_INVALID",
  DeliveryPhoneNumberRequired = "DELIVERY_PHONE_NUMBER_REQUIRED",
  DeliveryPostalCodeInvalid = "DELIVERY_POSTAL_CODE_INVALID",
  DeliveryPostalCodeRequired = "DELIVERY_POSTAL_CODE_REQUIRED",
  DeliveryZoneNotFound = "DELIVERY_ZONE_NOT_FOUND",
  DeliveryZoneRequiredForCountry = "DELIVERY_ZONE_REQUIRED_FOR_COUNTRY",
  Error = "ERROR",
  MerchandiseLineLimitReached = "MERCHANDISE_LINE_LIMIT_REACHED",
  MerchandiseNotApplicable = "MERCHANDISE_NOT_APPLICABLE",
  MerchandiseNotEnoughStockAvailable = "MERCHANDISE_NOT_ENOUGH_STOCK_AVAILABLE",
  MerchandiseOutOfStock = "MERCHANDISE_OUT_OF_STOCK",
  MerchandiseProductNotPublished = "MERCHANDISE_PRODUCT_NOT_PUBLISHED",
  NoDeliveryGroupSelected = "NO_DELIVERY_GROUP_SELECTED",
  PaymentsAddress1Invalid = "PAYMENTS_ADDRESS1_INVALID",
  PaymentsAddress1Required = "PAYMENTS_ADDRESS1_REQUIRED",
  PaymentsAddress1TooLong = "PAYMENTS_ADDRESS1_TOO_LONG",
  PaymentsAddress2Invalid = "PAYMENTS_ADDRESS2_INVALID",
  PaymentsAddress2Required = "PAYMENTS_ADDRESS2_REQUIRED",
  PaymentsAddress2TooLong = "PAYMENTS_ADDRESS2_TOO_LONG",
  PaymentsBillingAddressZoneNotFound = "PAYMENTS_BILLING_ADDRESS_ZONE_NOT_FOUND",
  PaymentsBillingAddressZoneRequiredForCountry = "PAYMENTS_BILLING_ADDRESS_ZONE_REQUIRED_FOR_COUNTRY",
  PaymentsCityInvalid = "PAYMENTS_CITY_INVALID",
  PaymentsCityRequired = "PAYMENTS_CITY_REQUIRED",
  PaymentsCityTooLong = "PAYMENTS_CITY_TOO_LONG",
  PaymentsCompanyInvalid = "PAYMENTS_COMPANY_INVALID",
  PaymentsCompanyRequired = "PAYMENTS_COMPANY_REQUIRED",
  PaymentsCompanyTooLong = "PAYMENTS_COMPANY_TOO_LONG",
  PaymentsCountryRequired = "PAYMENTS_COUNTRY_REQUIRED",
  PaymentsCreditCardBaseExpired = "PAYMENTS_CREDIT_CARD_BASE_EXPIRED",
  PaymentsCreditCardBaseGatewayNotSupported = "PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED",
  PaymentsCreditCardBaseInvalidStartDateOrIssueNumberForDebit = "PAYMENTS_CREDIT_CARD_BASE_INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT",
  PaymentsCreditCardBrandNotSupported = "PAYMENTS_CREDIT_CARD_BRAND_NOT_SUPPORTED",
  PaymentsCreditCardFirstNameBlank = "PAYMENTS_CREDIT_CARD_FIRST_NAME_BLANK",
  PaymentsCreditCardGeneric = "PAYMENTS_CREDIT_CARD_GENERIC",
  PaymentsCreditCardLastNameBlank = "PAYMENTS_CREDIT_CARD_LAST_NAME_BLANK",
  PaymentsCreditCardMonthInclusion = "PAYMENTS_CREDIT_CARD_MONTH_INCLUSION",
  PaymentsCreditCardNameInvalid = "PAYMENTS_CREDIT_CARD_NAME_INVALID",
  PaymentsCreditCardNumberInvalid = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID",
  PaymentsCreditCardNumberInvalidFormat = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT",
  PaymentsCreditCardSessionId = "PAYMENTS_CREDIT_CARD_SESSION_ID",
  PaymentsCreditCardVerificationValueBlank = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK",
  PaymentsCreditCardVerificationValueInvalidForCardType = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE",
  PaymentsCreditCardYearExpired = "PAYMENTS_CREDIT_CARD_YEAR_EXPIRED",
  PaymentsCreditCardYearInvalidExpiryYear = "PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR",
  PaymentsFirstNameInvalid = "PAYMENTS_FIRST_NAME_INVALID",
  PaymentsFirstNameRequired = "PAYMENTS_FIRST_NAME_REQUIRED",
  PaymentsFirstNameTooLong = "PAYMENTS_FIRST_NAME_TOO_LONG",
  PaymentsInvalidPostalCodeForCountry = "PAYMENTS_INVALID_POSTAL_CODE_FOR_COUNTRY",
  PaymentsInvalidPostalCodeForZone = "PAYMENTS_INVALID_POSTAL_CODE_FOR_ZONE",
  PaymentsLastNameInvalid = "PAYMENTS_LAST_NAME_INVALID",
  PaymentsLastNameRequired = "PAYMENTS_LAST_NAME_REQUIRED",
  PaymentsLastNameTooLong = "PAYMENTS_LAST_NAME_TOO_LONG",
  PaymentsMethodRequired = "PAYMENTS_METHOD_REQUIRED",
  PaymentsMethodUnavailable = "PAYMENTS_METHOD_UNAVAILABLE",
  PaymentsPhoneNumberInvalid = "PAYMENTS_PHONE_NUMBER_INVALID",
  PaymentsPhoneNumberRequired = "PAYMENTS_PHONE_NUMBER_REQUIRED",
  PaymentsPostalCodeInvalid = "PAYMENTS_POSTAL_CODE_INVALID",
  PaymentsPostalCodeRequired = "PAYMENTS_POSTAL_CODE_REQUIRED",
  PaymentsShopifyPaymentsRequired = "PAYMENTS_SHOPIFY_PAYMENTS_REQUIRED",
  PaymentsUnacceptablePaymentAmount = "PAYMENTS_UNACCEPTABLE_PAYMENT_AMOUNT",
  PaymentsWalletContentMissing = "PAYMENTS_WALLET_CONTENT_MISSING",
  /** Redirect to checkout required to complete this action. */
  RedirectToCheckoutRequired = "REDIRECT_TO_CHECKOUT_REQUIRED",
  TaxesDeliveryGroupIdNotFound = "TAXES_DELIVERY_GROUP_ID_NOT_FOUND",
  TaxesLineIdNotFound = "TAXES_LINE_ID_NOT_FOUND",
  TaxesMustBeDefined = "TAXES_MUST_BE_DEFINED",
  /** Validation failed. */
  ValidationCustom = "VALIDATION_CUSTOM",
}

/** Cart submit for checkout completion is successful. */
export type SubmitAlreadyAccepted = {
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars["String"]["output"];
};

/** Cart submit for checkout completion failed. */
export type SubmitFailed = {
  /** The URL of the checkout for the cart. */
  checkoutUrl: Maybe<Scalars["URL"]["output"]>;
  /** The list of errors that occurred from executing the mutation. */
  errors: Array<SubmissionError>;
};

/** Cart submit for checkout completion is already accepted. */
export type SubmitSuccess = {
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars["String"]["output"];
  /** The url to which the buyer should be redirected after the cart is successfully submitted. */
  redirectUrl: Scalars["URL"]["output"];
};

/** Cart submit for checkout completion is throttled. */
export type SubmitThrottled = {
  /**
   * UTC date time string that indicates the time after which clients should make their next
   * poll request. Any poll requests sent before this time will be ignored. Use this value to schedule the
   * next poll request.
   *
   */
  pollAfter: Scalars["DateTime"]["output"];
};

/** Color and image for visual representation. */
export type Swatch = {
  /** The swatch color. */
  color: Maybe<Scalars["Color"]["output"]>;
  /** The swatch image. */
  image: Maybe<MediaImage>;
};

/**
 * The taxonomy category for the product.
 *
 */
export type TaxonomyCategory = Node & {
  /** All parent nodes of the current taxonomy category. */
  ancestors: Array<TaxonomyCategory>;
  /** A static identifier for the taxonomy category. */
  id: Scalars["ID"]["output"];
  /** The localized name of the taxonomy category. */
  name: Scalars["String"]["output"];
};

/**
 * A filter used to view a subset of products in a collection matching a specific taxonomy metafield value.
 *
 */
export type TaxonomyMetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars["String"]["input"];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars["String"]["input"];
  /** The value of the metafield. */
  value: Scalars["String"]["input"];
};

/** Represents a resource that you can track the origin of the search traffic. */
export type Trackable = {
  /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
  trackingParameters: Maybe<Scalars["String"]["output"]>;
};

/**
 * The measurement used to calculate a unit price for a product variant (e.g. $9.99 / 100ml).
 *
 */
export type UnitPriceMeasurement = {
  /** The type of unit of measurement for the unit price measurement. */
  measuredType: Maybe<UnitPriceMeasurementMeasuredType>;
  /** The quantity unit for the unit price measurement. */
  quantityUnit: Maybe<UnitPriceMeasurementMeasuredUnit>;
  /** The quantity value for the unit price measurement. */
  quantityValue: Scalars["Float"]["output"];
  /** The reference unit for the unit price measurement. */
  referenceUnit: Maybe<UnitPriceMeasurementMeasuredUnit>;
  /** The reference value for the unit price measurement. */
  referenceValue: Scalars["Int"]["output"];
};

/** The accepted types of unit of measurement. */
export enum UnitPriceMeasurementMeasuredType {
  /** Unit of measurements representing areas. */
  Area = "AREA",
  /** Unit of measurements representing counts. */
  Count = "COUNT",
  /** Unit of measurements representing lengths. */
  Length = "LENGTH",
  /** The type of measurement is unknown. Upgrade to the latest version of the API to resolve this type. */
  Unknown = "UNKNOWN",
  /** Unit of measurements representing volumes. */
  Volume = "VOLUME",
  /** Unit of measurements representing weights. */
  Weight = "WEIGHT",
}

/** The valid units of measurement for a unit price measurement. */
export enum UnitPriceMeasurementMeasuredUnit {
  /** 100 centiliters equals 1 liter. */
  Cl = "CL",
  /** 100 centimeters equals 1 meter. */
  Cm = "CM",
  /** Imperial system unit of volume (U.S. customary unit). */
  Floz = "FLOZ",
  /** 1 foot equals 12 inches. */
  Ft = "FT",
  /** Imperial system unit of area. */
  Ft2 = "FT2",
  /** Metric system unit of weight. */
  G = "G",
  /** 1 gallon equals 128 fluid ounces (U.S. customary unit). */
  Gal = "GAL",
  /** Imperial system unit of length. */
  In = "IN",
  /** 1 item, a unit of count. */
  Item = "ITEM",
  /** 1 kilogram equals 1000 grams. */
  Kg = "KG",
  /** Metric system unit of volume. */
  L = "L",
  /** Imperial system unit of weight. */
  Lb = "LB",
  /** Metric system unit of length. */
  M = "M",
  /** Metric system unit of area. */
  M2 = "M2",
  /** 1 cubic meter equals 1000 liters. */
  M3 = "M3",
  /** 1000 milligrams equals 1 gram. */
  Mg = "MG",
  /** 1000 milliliters equals 1 liter. */
  Ml = "ML",
  /** 1000 millimeters equals 1 meter. */
  Mm = "MM",
  /** 16 ounces equals 1 pound. */
  Oz = "OZ",
  /** 1 pint equals 16 fluid ounces (U.S. customary unit). */
  Pt = "PT",
  /** 1 quart equals 32 fluid ounces (U.S. customary unit). */
  Qt = "QT",
  /** The unit of measurement is unknown. Upgrade to the latest version of the API to resolve this unit. */
  Unknown = "UNKNOWN",
  /** 1 yard equals 36 inches. */
  Yd = "YD",
}

/** Systems of weights and measures. */
export enum UnitSystem {
  /** Imperial system of weights and measures. */
  ImperialSystem = "IMPERIAL_SYSTEM",
  /** Metric system of weights and measures. */
  MetricSystem = "METRIC_SYSTEM",
}

/** A redirect on the online store. */
export type UrlRedirect = Node & {
  /** The ID of the URL redirect. */
  id: Scalars["ID"]["output"];
  /** The old path to be redirected from. When the user visits this path, they'll be redirected to the target location. */
  path: Scalars["String"]["output"];
  /** The target location where the user will be redirected to. */
  target: Scalars["String"]["output"];
};

/**
 * An auto-generated type for paginating through multiple UrlRedirects.
 *
 */
export type UrlRedirectConnection = {
  /** A list of edges. */
  edges: Array<UrlRedirectEdge>;
  /** A list of the nodes contained in UrlRedirectEdge. */
  nodes: Array<UrlRedirect>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one UrlRedirect and a cursor during pagination.
 *
 */
export type UrlRedirectEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of UrlRedirectEdge. */
  node: UrlRedirect;
};

/** Represents an error in the input of a mutation. */
export type UserError = DisplayableError & {
  /** The path to the input field that caused the error. */
  field: Maybe<Array<Scalars["String"]["output"]>>;
  /** The error message. */
  message: Scalars["String"]["output"];
};

/** Error codes for failed Shop Pay payment request session mutations. */
export type UserErrorsShopPayPaymentRequestSessionUserErrors =
  DisplayableError & {
    /** The error code. */
    code: Maybe<UserErrorsShopPayPaymentRequestSessionUserErrorsCode>;
    /** The path to the input field that caused the error. */
    field: Maybe<Array<Scalars["String"]["output"]>>;
    /** The error message. */
    message: Scalars["String"]["output"];
  };

/** Possible error codes that can be returned by `ShopPayPaymentRequestSessionUserErrors`. */
export enum UserErrorsShopPayPaymentRequestSessionUserErrorsCode {
  /** Idempotency key has already been used. */
  IdempotencyKeyAlreadyUsed = "IDEMPOTENCY_KEY_ALREADY_USED",
  /** Payment request input is invalid. */
  PaymentRequestInvalidInput = "PAYMENT_REQUEST_INVALID_INPUT",
  /** Payment request not found. */
  PaymentRequestNotFound = "PAYMENT_REQUEST_NOT_FOUND",
}

/** The input fields for a filter used to view a subset of products in a collection matching a specific variant option. */
export type VariantOptionFilter = {
  /** The name of the variant option to filter on. */
  name: Scalars["String"]["input"];
  /** The value of the variant option to filter on. */
  value: Scalars["String"]["input"];
};

/** Represents a Shopify hosted video. */
export type Video = Media &
  Node & {
    /** A word or phrase to share the nature or contents of a media. */
    alt: Maybe<Scalars["String"]["output"]>;
    /** A globally-unique ID. */
    id: Scalars["ID"]["output"];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage: Maybe<Image>;
    /** The sources for a video. */
    sources: Array<VideoSource>;
  };

/** Represents a source for a Shopify hosted video. */
export type VideoSource = {
  /** The format of the video source. */
  format: Scalars["String"]["output"];
  /** The height of the video. */
  height: Scalars["Int"]["output"];
  /** The video MIME type. */
  mimeType: Scalars["String"]["output"];
  /** The URL of the video. */
  url: Scalars["String"]["output"];
  /** The width of the video. */
  width: Scalars["Int"]["output"];
};

/** Units of measurement for weight. */
export enum WeightUnit {
  /** Metric system unit of mass. */
  Grams = "GRAMS",
  /** 1 kilogram equals 1000 grams. */
  Kilograms = "KILOGRAMS",
  /** Imperial system unit of mass. */
  Ounces = "OUNCES",
  /** 1 pound equals 16 ounces. */
  Pounds = "POUNDS",
}

export const CompleteCartFragmentDoc = `
    fragment CompleteCart on Cart {
  id
  createdAt
  updatedAt
  checkoutUrl
  discountCodes {
    applicable
    code
  }
  totalQuantity
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
  buyerIdentity {
    customer {
      displayName
      firstName
      lastName
      email
      phone
      defaultAddress {
        address1
        address2
        city
      }
    }
  }
  attributes {
    key
    value
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            product {
              title
              handle
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
    `;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Types.Maybe<TTypes> | Promise<Types.Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CartAddress: Types.CartDeliveryAddress;
  CartCompletionAction: Types.CompletePaymentChallenge;
  CartCompletionAttemptResult:
    | (Omit<Types.CartCompletionActionRequired, "action"> & {
        action: Types.Maybe<_RefType["CartCompletionAction"]>;
      })
    | Types.CartCompletionFailed
    | Types.CartCompletionProcessing
    | Types.CartCompletionSuccess;
  CartPrepareForCompletionResult:
    | (Omit<Types.CartStatusNotReady, "cart"> & {
        cart: Types.Maybe<_RefType["Cart"]>;
      })
    | (Omit<Types.CartStatusReady, "cart"> & {
        cart: Types.Maybe<_RefType["Cart"]>;
      })
    | (Omit<Types.CartThrottled, "cart"> & {
        cart: Types.Maybe<_RefType["Cart"]>;
      });
  CartSubmitForCompletionResult:
    | Types.SubmitAlreadyAccepted
    | Types.SubmitFailed
    | Types.SubmitSuccess
    | Types.SubmitThrottled;
  DeliveryAddress: Types.MailingAddress;
  MenuItemResource:
    | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
        blog: _RefType["Blog"];
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Blog,
        "articleByHandle" | "articles" | "metafield" | "metafields"
      > & {
        articleByHandle: Types.Maybe<_RefType["Article"]>;
        articles: _RefType["ArticleConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Collection,
        "image" | "metafield" | "metafields" | "products"
      > & {
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        products: _RefType["ProductConnection"];
      })
    | (Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
        field: Types.Maybe<_RefType["MetaobjectField"]>;
        fields: Array<_RefType["MetaobjectField"]>;
        seo: Types.Maybe<_RefType["MetaobjectSEO"]>;
      })
    | (Omit<Types.Page, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Product,
        | "adjacentVariants"
        | "collections"
        | "featuredImage"
        | "images"
        | "media"
        | "metafield"
        | "metafields"
        | "options"
        | "selectedOrFirstAvailableVariant"
        | "sellingPlanGroups"
        | "variantBySelectedOptions"
      > & {
        adjacentVariants: Array<_RefType["ProductVariant"]>;
        collections: _RefType["CollectionConnection"];
        featuredImage: Types.Maybe<_RefType["Image"]>;
        images: _RefType["ImageConnection"];
        media: _RefType["MediaConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        options: Array<_RefType["ProductOption"]>;
        selectedOrFirstAvailableVariant: Types.Maybe<
          _RefType["ProductVariant"]
        >;
        sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
        variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
      })
    | Types.ShopPolicy;
  Merchandise: Omit<
    Types.ProductVariant,
    | "image"
    | "metafield"
    | "metafields"
    | "product"
    | "sellingPlanAllocations"
    | "storeAvailability"
  > & {
    image: Types.Maybe<_RefType["Image"]>;
    metafield: Types.Maybe<_RefType["Metafield"]>;
    metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
    product: _RefType["Product"];
    sellingPlanAllocations: _RefType["SellingPlanAllocationConnection"];
    storeAvailability: _RefType["StoreAvailabilityConnection"];
  };
  MetafieldParentResource:
    | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
        blog: _RefType["Blog"];
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Blog,
        "articleByHandle" | "articles" | "metafield" | "metafields"
      > & {
        articleByHandle: Types.Maybe<_RefType["Article"]>;
        articles: _RefType["ArticleConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Cart,
        | "buyerIdentity"
        | "delivery"
        | "deliveryGroups"
        | "discountAllocations"
        | "lines"
        | "metafield"
        | "metafields"
      > & {
        buyerIdentity: _RefType["CartBuyerIdentity"];
        delivery: _RefType["CartDelivery"];
        deliveryGroups: _RefType["CartDeliveryGroupConnection"];
        discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
        lines: _RefType["BaseCartLineConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Collection,
        "image" | "metafield" | "metafields" | "products"
      > & {
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        products: _RefType["ProductConnection"];
      })
    | (Omit<Types.Company, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<Types.CompanyLocation, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<Types.Customer, "metafield" | "metafields" | "orders"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        orders: _RefType["OrderConnection"];
      })
    | (Omit<Types.Location, "address" | "metafield" | "metafields"> & {
        address: _RefType["LocationAddress"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<Types.Market, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Order,
        | "discountApplications"
        | "lineItems"
        | "metafield"
        | "metafields"
        | "shippingDiscountAllocations"
        | "successfulFulfillments"
      > & {
        discountApplications: _RefType["DiscountApplicationConnection"];
        lineItems: _RefType["OrderLineItemConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        shippingDiscountAllocations: Array<_RefType["DiscountAllocation"]>;
        successfulFulfillments: Types.Maybe<Array<_RefType["Fulfillment"]>>;
      })
    | (Omit<Types.Page, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Product,
        | "adjacentVariants"
        | "collections"
        | "featuredImage"
        | "images"
        | "media"
        | "metafield"
        | "metafields"
        | "options"
        | "selectedOrFirstAvailableVariant"
        | "sellingPlanGroups"
        | "variantBySelectedOptions"
      > & {
        adjacentVariants: Array<_RefType["ProductVariant"]>;
        collections: _RefType["CollectionConnection"];
        featuredImage: Types.Maybe<_RefType["Image"]>;
        images: _RefType["ImageConnection"];
        media: _RefType["MediaConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        options: Array<_RefType["ProductOption"]>;
        selectedOrFirstAvailableVariant: Types.Maybe<
          _RefType["ProductVariant"]
        >;
        sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
        variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
      })
    | (Omit<
        Types.ProductVariant,
        | "image"
        | "metafield"
        | "metafields"
        | "product"
        | "sellingPlanAllocations"
        | "storeAvailability"
      > & {
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        product: _RefType["Product"];
        sellingPlanAllocations: _RefType["SellingPlanAllocationConnection"];
        storeAvailability: _RefType["StoreAvailabilityConnection"];
      })
    | (Omit<
        Types.SellingPlan,
        | "billingPolicy"
        | "checkoutCharge"
        | "deliveryPolicy"
        | "metafield"
        | "metafields"
        | "priceAdjustments"
      > & {
        billingPolicy: Types.Maybe<_RefType["SellingPlanBillingPolicy"]>;
        checkoutCharge: _RefType["SellingPlanCheckoutCharge"];
        deliveryPolicy: Types.Maybe<_RefType["SellingPlanDeliveryPolicy"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        priceAdjustments: Array<_RefType["SellingPlanPriceAdjustment"]>;
      })
    | (Omit<Types.Shop, "brand" | "metafield" | "metafields"> & {
        brand: Types.Maybe<_RefType["Brand"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      });
  MetafieldReference:
    | (Omit<
        Types.Collection,
        "image" | "metafield" | "metafields" | "products"
      > & {
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        products: _RefType["ProductConnection"];
      })
    | (Omit<Types.GenericFile, "previewImage"> & {
        previewImage: Types.Maybe<_RefType["Image"]>;
      })
    | (Omit<Types.MediaImage, "image" | "previewImage"> & {
        image: Types.Maybe<_RefType["Image"]>;
        previewImage: Types.Maybe<_RefType["Image"]>;
      })
    | (Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
        field: Types.Maybe<_RefType["MetaobjectField"]>;
        fields: Array<_RefType["MetaobjectField"]>;
        seo: Types.Maybe<_RefType["MetaobjectSEO"]>;
      })
    | (Omit<Types.Model3d, "previewImage"> & {
        previewImage: Types.Maybe<_RefType["Image"]>;
      })
    | (Omit<Types.Page, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Product,
        | "adjacentVariants"
        | "collections"
        | "featuredImage"
        | "images"
        | "media"
        | "metafield"
        | "metafields"
        | "options"
        | "selectedOrFirstAvailableVariant"
        | "sellingPlanGroups"
        | "variantBySelectedOptions"
      > & {
        adjacentVariants: Array<_RefType["ProductVariant"]>;
        collections: _RefType["CollectionConnection"];
        featuredImage: Types.Maybe<_RefType["Image"]>;
        images: _RefType["ImageConnection"];
        media: _RefType["MediaConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        options: Array<_RefType["ProductOption"]>;
        selectedOrFirstAvailableVariant: Types.Maybe<
          _RefType["ProductVariant"]
        >;
        sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
        variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
      })
    | (Omit<
        Types.ProductVariant,
        | "image"
        | "metafield"
        | "metafields"
        | "product"
        | "sellingPlanAllocations"
        | "storeAvailability"
      > & {
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        product: _RefType["Product"];
        sellingPlanAllocations: _RefType["SellingPlanAllocationConnection"];
        storeAvailability: _RefType["StoreAvailabilityConnection"];
      })
    | (Omit<Types.Video, "previewImage"> & {
        previewImage: Types.Maybe<_RefType["Image"]>;
      });
  PricingValue: Types.MoneyV2 | Types.PricingPercentageValue;
  SearchResultItem:
    | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
        blog: _RefType["Blog"];
        image: Types.Maybe<_RefType["Image"]>;
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<Types.Page, "metafield" | "metafields"> & {
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
      })
    | (Omit<
        Types.Product,
        | "adjacentVariants"
        | "collections"
        | "featuredImage"
        | "images"
        | "media"
        | "metafield"
        | "metafields"
        | "options"
        | "selectedOrFirstAvailableVariant"
        | "sellingPlanGroups"
        | "variantBySelectedOptions"
      > & {
        adjacentVariants: Array<_RefType["ProductVariant"]>;
        collections: _RefType["CollectionConnection"];
        featuredImage: Types.Maybe<_RefType["Image"]>;
        images: _RefType["ImageConnection"];
        media: _RefType["MediaConnection"];
        metafield: Types.Maybe<_RefType["Metafield"]>;
        metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        options: Array<_RefType["ProductOption"]>;
        selectedOrFirstAvailableVariant: Types.Maybe<
          _RefType["ProductVariant"]
        >;
        sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
        variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
      });
  SellingPlanBillingPolicy: Types.SellingPlanRecurringBillingPolicy;
  SellingPlanCheckoutChargeValue:
    | Types.MoneyV2
    | Types.SellingPlanCheckoutChargePercentageValue;
  SellingPlanDeliveryPolicy: Types.SellingPlanRecurringDeliveryPolicy;
  SellingPlanPriceAdjustmentValue:
    | Types.SellingPlanFixedAmountPriceAdjustment
    | Types.SellingPlanFixedPriceAdjustment
    | Types.SellingPlanPercentagePriceAdjustment;
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    BaseCartLine:
      | (Omit<
          Types.CartLine,
          "discountAllocations" | "merchandise" | "sellingPlanAllocation"
        > & {
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          merchandise: _RefType["Merchandise"];
          sellingPlanAllocation: Types.Maybe<_RefType["SellingPlanAllocation"]>;
        })
      | (Omit<
          Types.ComponentizableCartLine,
          | "discountAllocations"
          | "lineComponents"
          | "merchandise"
          | "sellingPlanAllocation"
        > & {
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          lineComponents: Array<_RefType["CartLine"]>;
          merchandise: _RefType["Merchandise"];
          sellingPlanAllocation: Types.Maybe<_RefType["SellingPlanAllocation"]>;
        });
    CartDiscountAllocation:
      | (Omit<Types.CartAutomaticDiscountAllocation, "discountApplication"> & {
          discountApplication: _RefType["CartDiscountApplication"];
        })
      | (Omit<Types.CartCodeDiscountAllocation, "discountApplication"> & {
          discountApplication: _RefType["CartDiscountApplication"];
        })
      | (Omit<Types.CartCustomDiscountAllocation, "discountApplication"> & {
          discountApplication: _RefType["CartDiscountApplication"];
        });
    DiscountApplication:
      | (Omit<Types.AutomaticDiscountApplication, "value"> & {
          value: _RefType["PricingValue"];
        })
      | (Omit<Types.DiscountCodeApplication, "value"> & {
          value: _RefType["PricingValue"];
        })
      | (Omit<Types.ManualDiscountApplication, "value"> & {
          value: _RefType["PricingValue"];
        })
      | (Omit<Types.ScriptDiscountApplication, "value"> & {
          value: _RefType["PricingValue"];
        });
    DisplayableError:
      | Types.CartUserError
      | Types.CustomerUserError
      | Types.MetafieldDeleteUserError
      | Types.MetafieldsSetUserError
      | Types.UserError
      | Types.UserErrorsShopPayPaymentRequestSessionUserErrors;
    HasMetafields:
      | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
          blog: _RefType["Blog"];
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Blog,
          "articleByHandle" | "articles" | "metafield" | "metafields"
        > & {
          articleByHandle: Types.Maybe<_RefType["Article"]>;
          articles: _RefType["ArticleConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Cart,
          | "buyerIdentity"
          | "delivery"
          | "deliveryGroups"
          | "discountAllocations"
          | "lines"
          | "metafield"
          | "metafields"
        > & {
          buyerIdentity: _RefType["CartBuyerIdentity"];
          delivery: _RefType["CartDelivery"];
          deliveryGroups: _RefType["CartDeliveryGroupConnection"];
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          lines: _RefType["BaseCartLineConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Collection,
          "image" | "metafield" | "metafields" | "products"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          products: _RefType["ProductConnection"];
        })
      | (Omit<Types.Company, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<Types.CompanyLocation, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<Types.Customer, "metafield" | "metafields" | "orders"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          orders: _RefType["OrderConnection"];
        })
      | (Omit<Types.Location, "address" | "metafield" | "metafields"> & {
          address: _RefType["LocationAddress"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<Types.Market, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Order,
          | "discountApplications"
          | "lineItems"
          | "metafield"
          | "metafields"
          | "shippingDiscountAllocations"
          | "successfulFulfillments"
        > & {
          discountApplications: _RefType["DiscountApplicationConnection"];
          lineItems: _RefType["OrderLineItemConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          shippingDiscountAllocations: Array<_RefType["DiscountAllocation"]>;
          successfulFulfillments: Types.Maybe<Array<_RefType["Fulfillment"]>>;
        })
      | (Omit<Types.Page, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Product,
          | "adjacentVariants"
          | "collections"
          | "featuredImage"
          | "images"
          | "media"
          | "metafield"
          | "metafields"
          | "options"
          | "selectedOrFirstAvailableVariant"
          | "sellingPlanGroups"
          | "variantBySelectedOptions"
        > & {
          adjacentVariants: Array<_RefType["ProductVariant"]>;
          collections: _RefType["CollectionConnection"];
          featuredImage: Types.Maybe<_RefType["Image"]>;
          images: _RefType["ImageConnection"];
          media: _RefType["MediaConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          options: Array<_RefType["ProductOption"]>;
          selectedOrFirstAvailableVariant: Types.Maybe<
            _RefType["ProductVariant"]
          >;
          sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
          variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
        })
      | (Omit<
          Types.ProductVariant,
          | "image"
          | "metafield"
          | "metafields"
          | "product"
          | "sellingPlanAllocations"
          | "storeAvailability"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          product: _RefType["Product"];
          sellingPlanAllocations: _RefType["SellingPlanAllocationConnection"];
          storeAvailability: _RefType["StoreAvailabilityConnection"];
        })
      | (Omit<
          Types.SellingPlan,
          | "billingPolicy"
          | "checkoutCharge"
          | "deliveryPolicy"
          | "metafield"
          | "metafields"
          | "priceAdjustments"
        > & {
          billingPolicy: Types.Maybe<_RefType["SellingPlanBillingPolicy"]>;
          checkoutCharge: _RefType["SellingPlanCheckoutCharge"];
          deliveryPolicy: Types.Maybe<_RefType["SellingPlanDeliveryPolicy"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          priceAdjustments: Array<_RefType["SellingPlanPriceAdjustment"]>;
        })
      | (Omit<Types.Shop, "brand" | "metafield" | "metafields"> & {
          brand: Types.Maybe<_RefType["Brand"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        });
    Media:
      | (Omit<Types.ExternalVideo, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<Types.MediaImage, "image" | "previewImage"> & {
          image: Types.Maybe<_RefType["Image"]>;
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<Types.Model3d, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<Types.Video, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        });
    Node:
      | Types.AppliedGiftCard
      | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
          blog: _RefType["Blog"];
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Blog,
          "articleByHandle" | "articles" | "metafield" | "metafields"
        > & {
          articleByHandle: Types.Maybe<_RefType["Article"]>;
          articles: _RefType["ArticleConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Cart,
          | "buyerIdentity"
          | "delivery"
          | "deliveryGroups"
          | "discountAllocations"
          | "lines"
          | "metafield"
          | "metafields"
        > & {
          buyerIdentity: _RefType["CartBuyerIdentity"];
          delivery: _RefType["CartDelivery"];
          deliveryGroups: _RefType["CartDeliveryGroupConnection"];
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          lines: _RefType["BaseCartLineConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.CartLine,
          "discountAllocations" | "merchandise" | "sellingPlanAllocation"
        > & {
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          merchandise: _RefType["Merchandise"];
          sellingPlanAllocation: Types.Maybe<_RefType["SellingPlanAllocation"]>;
        })
      | (Omit<
          Types.Collection,
          "image" | "metafield" | "metafields" | "products"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          products: _RefType["ProductConnection"];
        })
      | Types.Comment
      | (Omit<Types.Company, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | Types.CompanyContact
      | (Omit<Types.CompanyLocation, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.ComponentizableCartLine,
          | "discountAllocations"
          | "lineComponents"
          | "merchandise"
          | "sellingPlanAllocation"
        > & {
          discountAllocations: Array<_RefType["CartDiscountAllocation"]>;
          lineComponents: Array<_RefType["CartLine"]>;
          merchandise: _RefType["Merchandise"];
          sellingPlanAllocation: Types.Maybe<_RefType["SellingPlanAllocation"]>;
        })
      | (Omit<Types.ExternalVideo, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<Types.GenericFile, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<Types.Location, "address" | "metafield" | "metafields"> & {
          address: _RefType["LocationAddress"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | Types.MailingAddress
      | (Omit<Types.Market, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<Types.MediaImage, "image" | "previewImage"> & {
          image: Types.Maybe<_RefType["Image"]>;
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | Types.MediaPresentation
      | (Omit<Types.Menu, "items"> & { items: Array<_RefType["MenuItem"]> })
      | (Omit<Types.MenuItem, "items" | "resource"> & {
          items: Array<_RefType["MenuItem"]>;
          resource: Types.Maybe<_RefType["MenuItemResource"]>;
        })
      | (Omit<
          Types.Metafield,
          "parentResource" | "reference" | "references"
        > & {
          parentResource: _RefType["MetafieldParentResource"];
          reference: Types.Maybe<_RefType["MetafieldReference"]>;
          references: Types.Maybe<_RefType["MetafieldReferenceConnection"]>;
        })
      | (Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
          field: Types.Maybe<_RefType["MetaobjectField"]>;
          fields: Array<_RefType["MetaobjectField"]>;
          seo: Types.Maybe<_RefType["MetaobjectSEO"]>;
        })
      | (Omit<Types.Model3d, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        })
      | (Omit<
          Types.Order,
          | "discountApplications"
          | "lineItems"
          | "metafield"
          | "metafields"
          | "shippingDiscountAllocations"
          | "successfulFulfillments"
        > & {
          discountApplications: _RefType["DiscountApplicationConnection"];
          lineItems: _RefType["OrderLineItemConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          shippingDiscountAllocations: Array<_RefType["DiscountAllocation"]>;
          successfulFulfillments: Types.Maybe<Array<_RefType["Fulfillment"]>>;
        })
      | (Omit<Types.Page, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Product,
          | "adjacentVariants"
          | "collections"
          | "featuredImage"
          | "images"
          | "media"
          | "metafield"
          | "metafields"
          | "options"
          | "selectedOrFirstAvailableVariant"
          | "sellingPlanGroups"
          | "variantBySelectedOptions"
        > & {
          adjacentVariants: Array<_RefType["ProductVariant"]>;
          collections: _RefType["CollectionConnection"];
          featuredImage: Types.Maybe<_RefType["Image"]>;
          images: _RefType["ImageConnection"];
          media: _RefType["MediaConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          options: Array<_RefType["ProductOption"]>;
          selectedOrFirstAvailableVariant: Types.Maybe<
            _RefType["ProductVariant"]
          >;
          sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
          variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
        })
      | (Omit<Types.ProductOption, "optionValues"> & {
          optionValues: Array<_RefType["ProductOptionValue"]>;
        })
      | (Omit<Types.ProductOptionValue, "firstSelectableVariant" | "swatch"> & {
          firstSelectableVariant: Types.Maybe<_RefType["ProductVariant"]>;
          swatch: Types.Maybe<_RefType["ProductOptionValueSwatch"]>;
        })
      | (Omit<
          Types.ProductVariant,
          | "image"
          | "metafield"
          | "metafields"
          | "product"
          | "sellingPlanAllocations"
          | "storeAvailability"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          product: _RefType["Product"];
          sellingPlanAllocations: _RefType["SellingPlanAllocationConnection"];
          storeAvailability: _RefType["StoreAvailabilityConnection"];
        })
      | (Omit<Types.Shop, "brand" | "metafield" | "metafields"> & {
          brand: Types.Maybe<_RefType["Brand"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | Types.ShopPayInstallmentsFinancingPlan
      | Types.ShopPayInstallmentsFinancingPlanTerm
      | Types.ShopPayInstallmentsProductVariantPricing
      | Types.ShopPolicy
      | Types.TaxonomyCategory
      | Types.UrlRedirect
      | (Omit<Types.Video, "previewImage"> & {
          previewImage: Types.Maybe<_RefType["Image"]>;
        });
    OnlineStorePublishable:
      | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
          blog: _RefType["Blog"];
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Blog,
          "articleByHandle" | "articles" | "metafield" | "metafields"
        > & {
          articleByHandle: Types.Maybe<_RefType["Article"]>;
          articles: _RefType["ArticleConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Collection,
          "image" | "metafield" | "metafields" | "products"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          products: _RefType["ProductConnection"];
        })
      | (Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
          field: Types.Maybe<_RefType["MetaobjectField"]>;
          fields: Array<_RefType["MetaobjectField"]>;
          seo: Types.Maybe<_RefType["MetaobjectSEO"]>;
        })
      | (Omit<Types.Page, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Product,
          | "adjacentVariants"
          | "collections"
          | "featuredImage"
          | "images"
          | "media"
          | "metafield"
          | "metafields"
          | "options"
          | "selectedOrFirstAvailableVariant"
          | "sellingPlanGroups"
          | "variantBySelectedOptions"
        > & {
          adjacentVariants: Array<_RefType["ProductVariant"]>;
          collections: _RefType["CollectionConnection"];
          featuredImage: Types.Maybe<_RefType["Image"]>;
          images: _RefType["ImageConnection"];
          media: _RefType["MediaConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          options: Array<_RefType["ProductOption"]>;
          selectedOrFirstAvailableVariant: Types.Maybe<
            _RefType["ProductVariant"]
          >;
          sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
          variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
        });
    SitemapResourceInterface:
      | Types.SitemapResource
      | Types.SitemapResourceMetaobject;
    Trackable:
      | (Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
          blog: _RefType["Blog"];
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Collection,
          "image" | "metafield" | "metafields" | "products"
        > & {
          image: Types.Maybe<_RefType["Image"]>;
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          products: _RefType["ProductConnection"];
        })
      | (Omit<Types.Page, "metafield" | "metafields"> & {
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
        })
      | (Omit<
          Types.Product,
          | "adjacentVariants"
          | "collections"
          | "featuredImage"
          | "images"
          | "media"
          | "metafield"
          | "metafields"
          | "options"
          | "selectedOrFirstAvailableVariant"
          | "sellingPlanGroups"
          | "variantBySelectedOptions"
        > & {
          adjacentVariants: Array<_RefType["ProductVariant"]>;
          collections: _RefType["CollectionConnection"];
          featuredImage: Types.Maybe<_RefType["Image"]>;
          images: _RefType["ImageConnection"];
          media: _RefType["MediaConnection"];
          metafield: Types.Maybe<_RefType["Metafield"]>;
          metafields: Array<Types.Maybe<_RefType["Metafield"]>>;
          options: Array<_RefType["ProductOption"]>;
          selectedOrFirstAvailableVariant: Types.Maybe<
            _RefType["ProductVariant"]
          >;
          sellingPlanGroups: _RefType["SellingPlanGroupConnection"];
          variantBySelectedOptions: Types.Maybe<_RefType["ProductVariant"]>;
        })
      | Types.SearchQuerySuggestion;
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApiVersion: ResolverTypeWrapper<Types.ApiVersion>;
  ApplePayWalletContentInput: Types.ApplePayWalletContentInput;
  ApplePayWalletHeaderInput: Types.ApplePayWalletHeaderInput;
  AppliedGiftCard: ResolverTypeWrapper<Types.AppliedGiftCard>;
  Article: ResolverTypeWrapper<
    Omit<Types.Article, "blog" | "image" | "metafield" | "metafields"> & {
      blog: ResolversTypes["Blog"];
      image: Types.Maybe<ResolversTypes["Image"]>;
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  ArticleAuthor: ResolverTypeWrapper<Types.ArticleAuthor>;
  ArticleConnection: ResolverTypeWrapper<
    Omit<Types.ArticleConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["ArticleEdge"]>;
      nodes: Array<ResolversTypes["Article"]>;
    }
  >;
  ArticleEdge: ResolverTypeWrapper<
    Omit<Types.ArticleEdge, "node"> & { node: ResolversTypes["Article"] }
  >;
  ArticleSortKeys: Types.ArticleSortKeys;
  Attribute: ResolverTypeWrapper<Types.Attribute>;
  AttributeInput: Types.AttributeInput;
  AutomaticDiscountApplication: ResolverTypeWrapper<
    Omit<Types.AutomaticDiscountApplication, "value"> & {
      value: ResolversTypes["PricingValue"];
    }
  >;
  BaseCartLine: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["BaseCartLine"]
  >;
  BaseCartLineConnection: ResolverTypeWrapper<
    Omit<Types.BaseCartLineConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["BaseCartLineEdge"]>;
      nodes: Array<ResolversTypes["BaseCartLine"]>;
    }
  >;
  BaseCartLineEdge: ResolverTypeWrapper<
    Omit<Types.BaseCartLineEdge, "node"> & {
      node: ResolversTypes["BaseCartLine"];
    }
  >;
  Blog: ResolverTypeWrapper<
    Omit<
      Types.Blog,
      "articleByHandle" | "articles" | "metafield" | "metafields"
    > & {
      articleByHandle: Types.Maybe<ResolversTypes["Article"]>;
      articles: ResolversTypes["ArticleConnection"];
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  BlogConnection: ResolverTypeWrapper<
    Omit<Types.BlogConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["BlogEdge"]>;
      nodes: Array<ResolversTypes["Blog"]>;
    }
  >;
  BlogEdge: ResolverTypeWrapper<
    Omit<Types.BlogEdge, "node"> & { node: ResolversTypes["Blog"] }
  >;
  BlogSortKeys: Types.BlogSortKeys;
  Boolean: ResolverTypeWrapper<Types.Scalars["Boolean"]["output"]>;
  Brand: ResolverTypeWrapper<
    Omit<Types.Brand, "coverImage" | "logo" | "squareLogo"> & {
      coverImage: Types.Maybe<ResolversTypes["MediaImage"]>;
      logo: Types.Maybe<ResolversTypes["MediaImage"]>;
      squareLogo: Types.Maybe<ResolversTypes["MediaImage"]>;
    }
  >;
  BrandColorGroup: ResolverTypeWrapper<Types.BrandColorGroup>;
  BrandColors: ResolverTypeWrapper<Types.BrandColors>;
  BuyerInput: Types.BuyerInput;
  CardBrand: Types.CardBrand;
  Cart: ResolverTypeWrapper<
    Omit<
      Types.Cart,
      | "buyerIdentity"
      | "delivery"
      | "deliveryGroups"
      | "discountAllocations"
      | "lines"
      | "metafield"
      | "metafields"
    > & {
      buyerIdentity: ResolversTypes["CartBuyerIdentity"];
      delivery: ResolversTypes["CartDelivery"];
      deliveryGroups: ResolversTypes["CartDeliveryGroupConnection"];
      discountAllocations: Array<ResolversTypes["CartDiscountAllocation"]>;
      lines: ResolversTypes["BaseCartLineConnection"];
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  CartAddress: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["CartAddress"]
  >;
  CartAddressInput: Types.CartAddressInput;
  CartAttributesUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartAttributesUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartAutomaticDiscountAllocation: ResolverTypeWrapper<
    Omit<Types.CartAutomaticDiscountAllocation, "discountApplication"> & {
      discountApplication: ResolversTypes["CartDiscountApplication"];
    }
  >;
  CartBillingAddressUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartBillingAddressUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartBuyerIdentity: ResolverTypeWrapper<
    Omit<
      Types.CartBuyerIdentity,
      "customer" | "deliveryAddressPreferences" | "purchasingCompany"
    > & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
      deliveryAddressPreferences: Array<ResolversTypes["DeliveryAddress"]>;
      purchasingCompany: Types.Maybe<ResolversTypes["PurchasingCompany"]>;
    }
  >;
  CartBuyerIdentityInput: Types.CartBuyerIdentityInput;
  CartBuyerIdentityUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartBuyerIdentityUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartCardSource: Types.CartCardSource;
  CartCodeDiscountAllocation: ResolverTypeWrapper<
    Omit<Types.CartCodeDiscountAllocation, "discountApplication"> & {
      discountApplication: ResolversTypes["CartDiscountApplication"];
    }
  >;
  CartCompletionAction: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["CartCompletionAction"]
  >;
  CartCompletionActionRequired: ResolverTypeWrapper<
    Omit<Types.CartCompletionActionRequired, "action"> & {
      action: Types.Maybe<ResolversTypes["CartCompletionAction"]>;
    }
  >;
  CartCompletionAttemptResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["CartCompletionAttemptResult"]
  >;
  CartCompletionFailed: ResolverTypeWrapper<Types.CartCompletionFailed>;
  CartCompletionProcessing: ResolverTypeWrapper<Types.CartCompletionProcessing>;
  CartCompletionSuccess: ResolverTypeWrapper<Types.CartCompletionSuccess>;
  CartCost: ResolverTypeWrapper<Types.CartCost>;
  CartCreatePayload: ResolverTypeWrapper<
    Omit<Types.CartCreatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartCustomDiscountAllocation: ResolverTypeWrapper<
    Omit<Types.CartCustomDiscountAllocation, "discountApplication"> & {
      discountApplication: ResolversTypes["CartDiscountApplication"];
    }
  >;
  CartDelivery: ResolverTypeWrapper<
    Omit<Types.CartDelivery, "addresses"> & {
      addresses: Array<ResolversTypes["CartSelectableAddress"]>;
    }
  >;
  CartDeliveryAddress: ResolverTypeWrapper<Types.CartDeliveryAddress>;
  CartDeliveryAddressInput: Types.CartDeliveryAddressInput;
  CartDeliveryAddressesAddPayload: ResolverTypeWrapper<
    Omit<Types.CartDeliveryAddressesAddPayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartDeliveryAddressesRemovePayload: ResolverTypeWrapper<
    Omit<Types.CartDeliveryAddressesRemovePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartDeliveryAddressesUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartDeliveryAddressesUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartDeliveryCoordinatesPreference: ResolverTypeWrapper<Types.CartDeliveryCoordinatesPreference>;
  CartDeliveryCoordinatesPreferenceInput: Types.CartDeliveryCoordinatesPreferenceInput;
  CartDeliveryGroup: ResolverTypeWrapper<
    Omit<Types.CartDeliveryGroup, "cartLines"> & {
      cartLines: ResolversTypes["BaseCartLineConnection"];
    }
  >;
  CartDeliveryGroupConnection: ResolverTypeWrapper<
    Omit<Types.CartDeliveryGroupConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["CartDeliveryGroupEdge"]>;
      nodes: Array<ResolversTypes["CartDeliveryGroup"]>;
    }
  >;
  CartDeliveryGroupEdge: ResolverTypeWrapper<
    Omit<Types.CartDeliveryGroupEdge, "node"> & {
      node: ResolversTypes["CartDeliveryGroup"];
    }
  >;
  CartDeliveryGroupType: Types.CartDeliveryGroupType;
  CartDeliveryInput: Types.CartDeliveryInput;
  CartDeliveryOption: ResolverTypeWrapper<Types.CartDeliveryOption>;
  CartDeliveryPreference: ResolverTypeWrapper<Types.CartDeliveryPreference>;
  CartDeliveryPreferenceInput: Types.CartDeliveryPreferenceInput;
  CartDirectPaymentMethodInput: Types.CartDirectPaymentMethodInput;
  CartDiscountAllocation: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["CartDiscountAllocation"]
  >;
  CartDiscountApplication: ResolverTypeWrapper<
    Omit<Types.CartDiscountApplication, "value"> & {
      value: ResolversTypes["PricingValue"];
    }
  >;
  CartDiscountCode: ResolverTypeWrapper<Types.CartDiscountCode>;
  CartDiscountCodesUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartDiscountCodesUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartErrorCode: Types.CartErrorCode;
  CartEstimatedCost: ResolverTypeWrapper<Types.CartEstimatedCost>;
  CartFreePaymentMethodInput: Types.CartFreePaymentMethodInput;
  CartGiftCardCodesRemovePayload: ResolverTypeWrapper<
    Omit<Types.CartGiftCardCodesRemovePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartGiftCardCodesUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartGiftCardCodesUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartInput: Types.CartInput;
  CartInputMetafieldInput: Types.CartInputMetafieldInput;
  CartLine: ResolverTypeWrapper<
    Omit<
      Types.CartLine,
      "discountAllocations" | "merchandise" | "sellingPlanAllocation"
    > & {
      discountAllocations: Array<ResolversTypes["CartDiscountAllocation"]>;
      merchandise: ResolversTypes["Merchandise"];
      sellingPlanAllocation: Types.Maybe<
        ResolversTypes["SellingPlanAllocation"]
      >;
    }
  >;
  CartLineCost: ResolverTypeWrapper<Types.CartLineCost>;
  CartLineEstimatedCost: ResolverTypeWrapper<Types.CartLineEstimatedCost>;
  CartLineInput: Types.CartLineInput;
  CartLineUpdateInput: Types.CartLineUpdateInput;
  CartLinesAddPayload: ResolverTypeWrapper<
    Omit<Types.CartLinesAddPayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartLinesRemovePayload: ResolverTypeWrapper<
    Omit<Types.CartLinesRemovePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartLinesUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartLinesUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartMetafieldDeleteInput: Types.CartMetafieldDeleteInput;
  CartMetafieldDeletePayload: ResolverTypeWrapper<Types.CartMetafieldDeletePayload>;
  CartMetafieldsSetInput: Types.CartMetafieldsSetInput;
  CartMetafieldsSetPayload: ResolverTypeWrapper<
    Omit<Types.CartMetafieldsSetPayload, "metafields"> & {
      metafields: Types.Maybe<Array<ResolversTypes["Metafield"]>>;
    }
  >;
  CartNoteUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartNoteUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartOperationError: ResolverTypeWrapper<Types.CartOperationError>;
  CartPaymentInput: Types.CartPaymentInput;
  CartPaymentUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartPaymentUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartPreferences: ResolverTypeWrapper<Types.CartPreferences>;
  CartPreferencesInput: Types.CartPreferencesInput;
  CartPrepareForCompletionPayload: ResolverTypeWrapper<
    Omit<Types.CartPrepareForCompletionPayload, "result"> & {
      result: Types.Maybe<ResolversTypes["CartPrepareForCompletionResult"]>;
    }
  >;
  CartPrepareForCompletionResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["CartPrepareForCompletionResult"]
  >;
  CartRemovePersonalDataPayload: ResolverTypeWrapper<
    Omit<Types.CartRemovePersonalDataPayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartSelectableAddress: ResolverTypeWrapper<
    Omit<Types.CartSelectableAddress, "address"> & {
      address: ResolversTypes["CartAddress"];
    }
  >;
  CartSelectableAddressInput: Types.CartSelectableAddressInput;
  CartSelectableAddressUpdateInput: Types.CartSelectableAddressUpdateInput;
  CartSelectedDeliveryOptionInput: Types.CartSelectedDeliveryOptionInput;
  CartSelectedDeliveryOptionsUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CartSelectedDeliveryOptionsUpdatePayload, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartStatusNotReady: ResolverTypeWrapper<
    Omit<Types.CartStatusNotReady, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartStatusReady: ResolverTypeWrapper<
    Omit<Types.CartStatusReady, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartSubmitForCompletionPayload: ResolverTypeWrapper<
    Omit<Types.CartSubmitForCompletionPayload, "result"> & {
      result: Types.Maybe<ResolversTypes["CartSubmitForCompletionResult"]>;
    }
  >;
  CartSubmitForCompletionResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["CartSubmitForCompletionResult"]
  >;
  CartThrottled: ResolverTypeWrapper<
    Omit<Types.CartThrottled, "cart"> & {
      cart: Types.Maybe<ResolversTypes["Cart"]>;
    }
  >;
  CartUserError: ResolverTypeWrapper<Types.CartUserError>;
  CartWalletPaymentMethodInput: Types.CartWalletPaymentMethodInput;
  CartWarning: ResolverTypeWrapper<Types.CartWarning>;
  CartWarningCode: Types.CartWarningCode;
  CategoryFilter: Types.CategoryFilter;
  Collection: ResolverTypeWrapper<
    Omit<
      Types.Collection,
      "image" | "metafield" | "metafields" | "products"
    > & {
      image: Types.Maybe<ResolversTypes["Image"]>;
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      products: ResolversTypes["ProductConnection"];
    }
  >;
  CollectionConnection: ResolverTypeWrapper<
    Omit<Types.CollectionConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["CollectionEdge"]>;
      nodes: Array<ResolversTypes["Collection"]>;
    }
  >;
  CollectionEdge: ResolverTypeWrapper<
    Omit<Types.CollectionEdge, "node"> & { node: ResolversTypes["Collection"] }
  >;
  CollectionSortKeys: Types.CollectionSortKeys;
  Color: ResolverTypeWrapper<Types.Scalars["Color"]["output"]>;
  Comment: ResolverTypeWrapper<Types.Comment>;
  CommentAuthor: ResolverTypeWrapper<Types.CommentAuthor>;
  CommentConnection: ResolverTypeWrapper<Types.CommentConnection>;
  CommentEdge: ResolverTypeWrapper<Types.CommentEdge>;
  Company: ResolverTypeWrapper<
    Omit<Types.Company, "metafield" | "metafields"> & {
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  CompanyContact: ResolverTypeWrapper<Types.CompanyContact>;
  CompanyLocation: ResolverTypeWrapper<
    Omit<Types.CompanyLocation, "metafield" | "metafields"> & {
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  CompletePaymentChallenge: ResolverTypeWrapper<Types.CompletePaymentChallenge>;
  CompletionError: ResolverTypeWrapper<Types.CompletionError>;
  CompletionErrorCode: Types.CompletionErrorCode;
  ComponentizableCartLine: ResolverTypeWrapper<
    Omit<
      Types.ComponentizableCartLine,
      | "discountAllocations"
      | "lineComponents"
      | "merchandise"
      | "sellingPlanAllocation"
    > & {
      discountAllocations: Array<ResolversTypes["CartDiscountAllocation"]>;
      lineComponents: Array<ResolversTypes["CartLine"]>;
      merchandise: ResolversTypes["Merchandise"];
      sellingPlanAllocation: Types.Maybe<
        ResolversTypes["SellingPlanAllocation"]
      >;
    }
  >;
  Count: ResolverTypeWrapper<Types.Count>;
  CountPrecision: Types.CountPrecision;
  Country: ResolverTypeWrapper<
    Omit<Types.Country, "market"> & {
      market: Types.Maybe<ResolversTypes["Market"]>;
    }
  >;
  CountryCode: Types.CountryCode;
  CropRegion: Types.CropRegion;
  Currency: ResolverTypeWrapper<Types.Currency>;
  CurrencyCode: Types.CurrencyCode;
  Customer: ResolverTypeWrapper<
    Omit<Types.Customer, "metafield" | "metafields" | "orders"> & {
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      orders: ResolversTypes["OrderConnection"];
    }
  >;
  CustomerAccessToken: ResolverTypeWrapper<Types.CustomerAccessToken>;
  CustomerAccessTokenCreateInput: Types.CustomerAccessTokenCreateInput;
  CustomerAccessTokenCreatePayload: ResolverTypeWrapper<Types.CustomerAccessTokenCreatePayload>;
  CustomerAccessTokenCreateWithMultipassPayload: ResolverTypeWrapper<Types.CustomerAccessTokenCreateWithMultipassPayload>;
  CustomerAccessTokenDeletePayload: ResolverTypeWrapper<Types.CustomerAccessTokenDeletePayload>;
  CustomerAccessTokenRenewPayload: ResolverTypeWrapper<Types.CustomerAccessTokenRenewPayload>;
  CustomerActivateByUrlPayload: ResolverTypeWrapper<
    Omit<Types.CustomerActivateByUrlPayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerActivateInput: Types.CustomerActivateInput;
  CustomerActivatePayload: ResolverTypeWrapper<
    Omit<Types.CustomerActivatePayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerAddressCreatePayload: ResolverTypeWrapper<Types.CustomerAddressCreatePayload>;
  CustomerAddressDeletePayload: ResolverTypeWrapper<Types.CustomerAddressDeletePayload>;
  CustomerAddressUpdatePayload: ResolverTypeWrapper<Types.CustomerAddressUpdatePayload>;
  CustomerCreateInput: Types.CustomerCreateInput;
  CustomerCreatePayload: ResolverTypeWrapper<
    Omit<Types.CustomerCreatePayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerDefaultAddressUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CustomerDefaultAddressUpdatePayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerErrorCode: Types.CustomerErrorCode;
  CustomerRecoverPayload: ResolverTypeWrapper<Types.CustomerRecoverPayload>;
  CustomerResetByUrlPayload: ResolverTypeWrapper<
    Omit<Types.CustomerResetByUrlPayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerResetInput: Types.CustomerResetInput;
  CustomerResetPayload: ResolverTypeWrapper<
    Omit<Types.CustomerResetPayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerUpdateInput: Types.CustomerUpdateInput;
  CustomerUpdatePayload: ResolverTypeWrapper<
    Omit<Types.CustomerUpdatePayload, "customer"> & {
      customer: Types.Maybe<ResolversTypes["Customer"]>;
    }
  >;
  CustomerUserError: ResolverTypeWrapper<Types.CustomerUserError>;
  DateTime: ResolverTypeWrapper<Types.Scalars["DateTime"]["output"]>;
  Decimal: ResolverTypeWrapper<Types.Scalars["Decimal"]["output"]>;
  DeliveryAddress: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["DeliveryAddress"]
  >;
  DeliveryAddressInput: Types.DeliveryAddressInput;
  DeliveryAddressValidationStrategy: Types.DeliveryAddressValidationStrategy;
  DeliveryMethodType: Types.DeliveryMethodType;
  DigitalWallet: Types.DigitalWallet;
  DiscountAllocation: ResolverTypeWrapper<
    Omit<Types.DiscountAllocation, "discountApplication"> & {
      discountApplication: ResolversTypes["DiscountApplication"];
    }
  >;
  DiscountApplication: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["DiscountApplication"]
  >;
  DiscountApplicationAllocationMethod: Types.DiscountApplicationAllocationMethod;
  DiscountApplicationConnection: ResolverTypeWrapper<
    Omit<Types.DiscountApplicationConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["DiscountApplicationEdge"]>;
      nodes: Array<ResolversTypes["DiscountApplication"]>;
    }
  >;
  DiscountApplicationEdge: ResolverTypeWrapper<
    Omit<Types.DiscountApplicationEdge, "node"> & {
      node: ResolversTypes["DiscountApplication"];
    }
  >;
  DiscountApplicationTargetSelection: Types.DiscountApplicationTargetSelection;
  DiscountApplicationTargetType: Types.DiscountApplicationTargetType;
  DiscountCodeApplication: ResolverTypeWrapper<
    Omit<Types.DiscountCodeApplication, "value"> & {
      value: ResolversTypes["PricingValue"];
    }
  >;
  DisplayableError: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["DisplayableError"]
  >;
  Domain: ResolverTypeWrapper<Types.Domain>;
  ExternalVideo: ResolverTypeWrapper<
    Omit<Types.ExternalVideo, "previewImage"> & {
      previewImage: Types.Maybe<ResolversTypes["Image"]>;
    }
  >;
  Filter: ResolverTypeWrapper<
    Omit<Types.Filter, "values"> & {
      values: Array<ResolversTypes["FilterValue"]>;
    }
  >;
  FilterPresentation: Types.FilterPresentation;
  FilterType: Types.FilterType;
  FilterValue: ResolverTypeWrapper<
    Omit<Types.FilterValue, "image" | "swatch"> & {
      image: Types.Maybe<ResolversTypes["MediaImage"]>;
      swatch: Types.Maybe<ResolversTypes["Swatch"]>;
    }
  >;
  Float: ResolverTypeWrapper<Types.Scalars["Float"]["output"]>;
  Fulfillment: ResolverTypeWrapper<
    Omit<Types.Fulfillment, "fulfillmentLineItems"> & {
      fulfillmentLineItems: ResolversTypes["FulfillmentLineItemConnection"];
    }
  >;
  FulfillmentLineItem: ResolverTypeWrapper<
    Omit<Types.FulfillmentLineItem, "lineItem"> & {
      lineItem: ResolversTypes["OrderLineItem"];
    }
  >;
  FulfillmentLineItemConnection: ResolverTypeWrapper<
    Omit<Types.FulfillmentLineItemConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["FulfillmentLineItemEdge"]>;
      nodes: Array<ResolversTypes["FulfillmentLineItem"]>;
    }
  >;
  FulfillmentLineItemEdge: ResolverTypeWrapper<
    Omit<Types.FulfillmentLineItemEdge, "node"> & {
      node: ResolversTypes["FulfillmentLineItem"];
    }
  >;
  FulfillmentTrackingInfo: ResolverTypeWrapper<Types.FulfillmentTrackingInfo>;
  GenericFile: ResolverTypeWrapper<
    Omit<Types.GenericFile, "previewImage"> & {
      previewImage: Types.Maybe<ResolversTypes["Image"]>;
    }
  >;
  GeoCoordinateInput: Types.GeoCoordinateInput;
  HTML: ResolverTypeWrapper<Types.Scalars["HTML"]["output"]>;
  HasMetafields: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["HasMetafields"]
  >;
  HasMetafieldsIdentifier: Types.HasMetafieldsIdentifier;
  ID: ResolverTypeWrapper<Types.Scalars["ID"]["output"]>;
  ISO8601DateTime: ResolverTypeWrapper<
    Types.Scalars["ISO8601DateTime"]["output"]
  >;
  Image: ResolverTypeWrapper<Types.Image>;
  ImageConnection: ResolverTypeWrapper<
    Omit<Types.ImageConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["ImageEdge"]>;
      nodes: Array<ResolversTypes["Image"]>;
    }
  >;
  ImageContentType: Types.ImageContentType;
  ImageEdge: ResolverTypeWrapper<
    Omit<Types.ImageEdge, "node"> & { node: ResolversTypes["Image"] }
  >;
  ImageTransformInput: Types.ImageTransformInput;
  InContextAnnotation: ResolverTypeWrapper<Types.InContextAnnotation>;
  InContextAnnotationType: ResolverTypeWrapper<Types.InContextAnnotationType>;
  Int: ResolverTypeWrapper<Types.Scalars["Int"]["output"]>;
  JSON: ResolverTypeWrapper<Types.Scalars["JSON"]["output"]>;
  Language: ResolverTypeWrapper<Types.Language>;
  LanguageCode: Types.LanguageCode;
  Localization: ResolverTypeWrapper<
    Omit<Types.Localization, "availableCountries" | "country" | "market"> & {
      availableCountries: Array<ResolversTypes["Country"]>;
      country: ResolversTypes["Country"];
      market: ResolversTypes["Market"];
    }
  >;
  Location: ResolverTypeWrapper<
    Omit<Types.Location, "address" | "metafield" | "metafields"> & {
      address: ResolversTypes["LocationAddress"];
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  LocationAddress: ResolverTypeWrapper<Types.LocationAddress>;
  LocationConnection: ResolverTypeWrapper<
    Omit<Types.LocationConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["LocationEdge"]>;
      nodes: Array<ResolversTypes["Location"]>;
    }
  >;
  LocationEdge: ResolverTypeWrapper<
    Omit<Types.LocationEdge, "node"> & { node: ResolversTypes["Location"] }
  >;
  LocationSortKeys: Types.LocationSortKeys;
  MailingAddress: ResolverTypeWrapper<Types.MailingAddress>;
  MailingAddressConnection: ResolverTypeWrapper<Types.MailingAddressConnection>;
  MailingAddressEdge: ResolverTypeWrapper<Types.MailingAddressEdge>;
  MailingAddressInput: Types.MailingAddressInput;
  ManualDiscountApplication: ResolverTypeWrapper<
    Omit<Types.ManualDiscountApplication, "value"> & {
      value: ResolversTypes["PricingValue"];
    }
  >;
  Market: ResolverTypeWrapper<
    Omit<Types.Market, "metafield" | "metafields"> & {
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  Media: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Media"]>;
  MediaConnection: ResolverTypeWrapper<
    Omit<Types.MediaConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["MediaEdge"]>;
      nodes: Array<ResolversTypes["Media"]>;
    }
  >;
  MediaContentType: Types.MediaContentType;
  MediaEdge: ResolverTypeWrapper<
    Omit<Types.MediaEdge, "node"> & { node: ResolversTypes["Media"] }
  >;
  MediaHost: Types.MediaHost;
  MediaImage: ResolverTypeWrapper<
    Omit<Types.MediaImage, "image" | "previewImage"> & {
      image: Types.Maybe<ResolversTypes["Image"]>;
      previewImage: Types.Maybe<ResolversTypes["Image"]>;
    }
  >;
  MediaPresentation: ResolverTypeWrapper<Types.MediaPresentation>;
  MediaPresentationFormat: Types.MediaPresentationFormat;
  Menu: ResolverTypeWrapper<
    Omit<Types.Menu, "items"> & { items: Array<ResolversTypes["MenuItem"]> }
  >;
  MenuItem: ResolverTypeWrapper<
    Omit<Types.MenuItem, "items" | "resource"> & {
      items: Array<ResolversTypes["MenuItem"]>;
      resource: Types.Maybe<ResolversTypes["MenuItemResource"]>;
    }
  >;
  MenuItemResource: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["MenuItemResource"]
  >;
  MenuItemType: Types.MenuItemType;
  Merchandise: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["Merchandise"]
  >;
  Metafield: ResolverTypeWrapper<
    Omit<Types.Metafield, "parentResource" | "reference" | "references"> & {
      parentResource: ResolversTypes["MetafieldParentResource"];
      reference: Types.Maybe<ResolversTypes["MetafieldReference"]>;
      references: Types.Maybe<ResolversTypes["MetafieldReferenceConnection"]>;
    }
  >;
  MetafieldDeleteErrorCode: Types.MetafieldDeleteErrorCode;
  MetafieldDeleteUserError: ResolverTypeWrapper<Types.MetafieldDeleteUserError>;
  MetafieldFilter: Types.MetafieldFilter;
  MetafieldParentResource: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["MetafieldParentResource"]
  >;
  MetafieldReference: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["MetafieldReference"]
  >;
  MetafieldReferenceConnection: ResolverTypeWrapper<
    Omit<Types.MetafieldReferenceConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["MetafieldReferenceEdge"]>;
      nodes: Array<ResolversTypes["MetafieldReference"]>;
    }
  >;
  MetafieldReferenceEdge: ResolverTypeWrapper<
    Omit<Types.MetafieldReferenceEdge, "node"> & {
      node: ResolversTypes["MetafieldReference"];
    }
  >;
  MetafieldsSetUserError: ResolverTypeWrapper<Types.MetafieldsSetUserError>;
  MetafieldsSetUserErrorCode: Types.MetafieldsSetUserErrorCode;
  Metaobject: ResolverTypeWrapper<
    Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
      field: Types.Maybe<ResolversTypes["MetaobjectField"]>;
      fields: Array<ResolversTypes["MetaobjectField"]>;
      seo: Types.Maybe<ResolversTypes["MetaobjectSEO"]>;
    }
  >;
  MetaobjectConnection: ResolverTypeWrapper<
    Omit<Types.MetaobjectConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["MetaobjectEdge"]>;
      nodes: Array<ResolversTypes["Metaobject"]>;
    }
  >;
  MetaobjectEdge: ResolverTypeWrapper<
    Omit<Types.MetaobjectEdge, "node"> & { node: ResolversTypes["Metaobject"] }
  >;
  MetaobjectField: ResolverTypeWrapper<
    Omit<Types.MetaobjectField, "reference" | "references"> & {
      reference: Types.Maybe<ResolversTypes["MetafieldReference"]>;
      references: Types.Maybe<ResolversTypes["MetafieldReferenceConnection"]>;
    }
  >;
  MetaobjectHandleInput: Types.MetaobjectHandleInput;
  MetaobjectSEO: ResolverTypeWrapper<
    Omit<Types.MetaobjectSeo, "description" | "title"> & {
      description: Types.Maybe<ResolversTypes["MetaobjectField"]>;
      title: Types.Maybe<ResolversTypes["MetaobjectField"]>;
    }
  >;
  Model3d: ResolverTypeWrapper<
    Omit<Types.Model3d, "previewImage"> & {
      previewImage: Types.Maybe<ResolversTypes["Image"]>;
    }
  >;
  Model3dSource: ResolverTypeWrapper<Types.Model3dSource>;
  MoneyInput: Types.MoneyInput;
  MoneyV2: ResolverTypeWrapper<Types.MoneyV2>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Node"]>;
  OnlineStorePublishable: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["OnlineStorePublishable"]
  >;
  Order: ResolverTypeWrapper<
    Omit<
      Types.Order,
      | "discountApplications"
      | "lineItems"
      | "metafield"
      | "metafields"
      | "shippingDiscountAllocations"
      | "successfulFulfillments"
    > & {
      discountApplications: ResolversTypes["DiscountApplicationConnection"];
      lineItems: ResolversTypes["OrderLineItemConnection"];
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      shippingDiscountAllocations: Array<ResolversTypes["DiscountAllocation"]>;
      successfulFulfillments: Types.Maybe<Array<ResolversTypes["Fulfillment"]>>;
    }
  >;
  OrderCancelReason: Types.OrderCancelReason;
  OrderConnection: ResolverTypeWrapper<
    Omit<Types.OrderConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["OrderEdge"]>;
      nodes: Array<ResolversTypes["Order"]>;
    }
  >;
  OrderEdge: ResolverTypeWrapper<
    Omit<Types.OrderEdge, "node"> & { node: ResolversTypes["Order"] }
  >;
  OrderFinancialStatus: Types.OrderFinancialStatus;
  OrderFulfillmentStatus: Types.OrderFulfillmentStatus;
  OrderLineItem: ResolverTypeWrapper<
    Omit<Types.OrderLineItem, "discountAllocations" | "variant"> & {
      discountAllocations: Array<ResolversTypes["DiscountAllocation"]>;
      variant: Types.Maybe<ResolversTypes["ProductVariant"]>;
    }
  >;
  OrderLineItemConnection: ResolverTypeWrapper<
    Omit<Types.OrderLineItemConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["OrderLineItemEdge"]>;
      nodes: Array<ResolversTypes["OrderLineItem"]>;
    }
  >;
  OrderLineItemEdge: ResolverTypeWrapper<
    Omit<Types.OrderLineItemEdge, "node"> & {
      node: ResolversTypes["OrderLineItem"];
    }
  >;
  OrderSortKeys: Types.OrderSortKeys;
  Page: ResolverTypeWrapper<
    Omit<Types.Page, "metafield" | "metafields"> & {
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  PageConnection: ResolverTypeWrapper<
    Omit<Types.PageConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["PageEdge"]>;
      nodes: Array<ResolversTypes["Page"]>;
    }
  >;
  PageEdge: ResolverTypeWrapper<
    Omit<Types.PageEdge, "node"> & { node: ResolversTypes["Page"] }
  >;
  PageInfo: ResolverTypeWrapper<Types.PageInfo>;
  PageSortKeys: Types.PageSortKeys;
  PaginatedSitemapResources: ResolverTypeWrapper<
    Omit<Types.PaginatedSitemapResources, "items"> & {
      items: Array<ResolversTypes["SitemapResourceInterface"]>;
    }
  >;
  PaymentSettings: ResolverTypeWrapper<Types.PaymentSettings>;
  PredictiveSearchLimitScope: Types.PredictiveSearchLimitScope;
  PredictiveSearchResult: ResolverTypeWrapper<
    Omit<
      Types.PredictiveSearchResult,
      "articles" | "collections" | "pages" | "products"
    > & {
      articles: Array<ResolversTypes["Article"]>;
      collections: Array<ResolversTypes["Collection"]>;
      pages: Array<ResolversTypes["Page"]>;
      products: Array<ResolversTypes["Product"]>;
    }
  >;
  PredictiveSearchType: Types.PredictiveSearchType;
  PreferenceDeliveryMethodType: Types.PreferenceDeliveryMethodType;
  PriceRangeFilter: Types.PriceRangeFilter;
  PricingPercentageValue: ResolverTypeWrapper<Types.PricingPercentageValue>;
  PricingValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["PricingValue"]
  >;
  Product: ResolverTypeWrapper<
    Omit<
      Types.Product,
      | "adjacentVariants"
      | "collections"
      | "featuredImage"
      | "images"
      | "media"
      | "metafield"
      | "metafields"
      | "options"
      | "selectedOrFirstAvailableVariant"
      | "sellingPlanGroups"
      | "variantBySelectedOptions"
    > & {
      adjacentVariants: Array<ResolversTypes["ProductVariant"]>;
      collections: ResolversTypes["CollectionConnection"];
      featuredImage: Types.Maybe<ResolversTypes["Image"]>;
      images: ResolversTypes["ImageConnection"];
      media: ResolversTypes["MediaConnection"];
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      options: Array<ResolversTypes["ProductOption"]>;
      selectedOrFirstAvailableVariant: Types.Maybe<
        ResolversTypes["ProductVariant"]
      >;
      sellingPlanGroups: ResolversTypes["SellingPlanGroupConnection"];
      variantBySelectedOptions: Types.Maybe<ResolversTypes["ProductVariant"]>;
    }
  >;
  ProductCollectionSortKeys: Types.ProductCollectionSortKeys;
  ProductConnection: ResolverTypeWrapper<
    Omit<Types.ProductConnection, "edges" | "filters" | "nodes"> & {
      edges: Array<ResolversTypes["ProductEdge"]>;
      filters: Array<ResolversTypes["Filter"]>;
      nodes: Array<ResolversTypes["Product"]>;
    }
  >;
  ProductEdge: ResolverTypeWrapper<
    Omit<Types.ProductEdge, "node"> & { node: ResolversTypes["Product"] }
  >;
  ProductFilter: Types.ProductFilter;
  ProductImageSortKeys: Types.ProductImageSortKeys;
  ProductMediaSortKeys: Types.ProductMediaSortKeys;
  ProductOption: ResolverTypeWrapper<
    Omit<Types.ProductOption, "optionValues"> & {
      optionValues: Array<ResolversTypes["ProductOptionValue"]>;
    }
  >;
  ProductOptionValue: ResolverTypeWrapper<
    Omit<Types.ProductOptionValue, "firstSelectableVariant" | "swatch"> & {
      firstSelectableVariant: Types.Maybe<ResolversTypes["ProductVariant"]>;
      swatch: Types.Maybe<ResolversTypes["ProductOptionValueSwatch"]>;
    }
  >;
  ProductOptionValueSwatch: ResolverTypeWrapper<
    Omit<Types.ProductOptionValueSwatch, "image"> & {
      image: Types.Maybe<ResolversTypes["Media"]>;
    }
  >;
  ProductPriceRange: ResolverTypeWrapper<Types.ProductPriceRange>;
  ProductRecommendationIntent: Types.ProductRecommendationIntent;
  ProductSortKeys: Types.ProductSortKeys;
  ProductVariant: ResolverTypeWrapper<
    Omit<
      Types.ProductVariant,
      | "image"
      | "metafield"
      | "metafields"
      | "product"
      | "sellingPlanAllocations"
      | "storeAvailability"
    > & {
      image: Types.Maybe<ResolversTypes["Image"]>;
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      product: ResolversTypes["Product"];
      sellingPlanAllocations: ResolversTypes["SellingPlanAllocationConnection"];
      storeAvailability: ResolversTypes["StoreAvailabilityConnection"];
    }
  >;
  ProductVariantComponent: ResolverTypeWrapper<
    Omit<Types.ProductVariantComponent, "productVariant"> & {
      productVariant: ResolversTypes["ProductVariant"];
    }
  >;
  ProductVariantComponentConnection: ResolverTypeWrapper<Types.ProductVariantComponentConnection>;
  ProductVariantComponentEdge: ResolverTypeWrapper<Types.ProductVariantComponentEdge>;
  ProductVariantConnection: ResolverTypeWrapper<
    Omit<Types.ProductVariantConnection, "nodes"> & {
      nodes: Array<ResolversTypes["ProductVariant"]>;
    }
  >;
  ProductVariantEdge: ResolverTypeWrapper<
    Omit<Types.ProductVariantEdge, "node"> & {
      node: ResolversTypes["ProductVariant"];
    }
  >;
  ProductVariantSortKeys: Types.ProductVariantSortKeys;
  PurchasingCompany: ResolverTypeWrapper<
    Omit<Types.PurchasingCompany, "company" | "location"> & {
      company: ResolversTypes["Company"];
      location: ResolversTypes["CompanyLocation"];
    }
  >;
  QuantityPriceBreak: ResolverTypeWrapper<Types.QuantityPriceBreak>;
  QuantityPriceBreakConnection: ResolverTypeWrapper<Types.QuantityPriceBreakConnection>;
  QuantityPriceBreakEdge: ResolverTypeWrapper<Types.QuantityPriceBreakEdge>;
  QuantityRule: ResolverTypeWrapper<Types.QuantityRule>;
  QueryRoot: ResolverTypeWrapper<{}>;
  SEO: ResolverTypeWrapper<Types.Seo>;
  ScriptDiscountApplication: ResolverTypeWrapper<
    Omit<Types.ScriptDiscountApplication, "value"> & {
      value: ResolversTypes["PricingValue"];
    }
  >;
  SearchPrefixQueryType: Types.SearchPrefixQueryType;
  SearchQuerySuggestion: ResolverTypeWrapper<Types.SearchQuerySuggestion>;
  SearchResultItem: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SearchResultItem"]
  >;
  SearchResultItemConnection: ResolverTypeWrapper<
    Omit<
      Types.SearchResultItemConnection,
      "edges" | "nodes" | "productFilters"
    > & {
      edges: Array<ResolversTypes["SearchResultItemEdge"]>;
      nodes: Array<ResolversTypes["SearchResultItem"]>;
      productFilters: Array<ResolversTypes["Filter"]>;
    }
  >;
  SearchResultItemEdge: ResolverTypeWrapper<
    Omit<Types.SearchResultItemEdge, "node"> & {
      node: ResolversTypes["SearchResultItem"];
    }
  >;
  SearchSortKeys: Types.SearchSortKeys;
  SearchType: Types.SearchType;
  SearchUnavailableProductsType: Types.SearchUnavailableProductsType;
  SearchableField: Types.SearchableField;
  SelectedOption: ResolverTypeWrapper<Types.SelectedOption>;
  SelectedOptionInput: Types.SelectedOptionInput;
  SellingPlan: ResolverTypeWrapper<
    Omit<
      Types.SellingPlan,
      | "billingPolicy"
      | "checkoutCharge"
      | "deliveryPolicy"
      | "metafield"
      | "metafields"
      | "priceAdjustments"
    > & {
      billingPolicy: Types.Maybe<ResolversTypes["SellingPlanBillingPolicy"]>;
      checkoutCharge: ResolversTypes["SellingPlanCheckoutCharge"];
      deliveryPolicy: Types.Maybe<ResolversTypes["SellingPlanDeliveryPolicy"]>;
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
      priceAdjustments: Array<ResolversTypes["SellingPlanPriceAdjustment"]>;
    }
  >;
  SellingPlanAllocation: ResolverTypeWrapper<
    Omit<Types.SellingPlanAllocation, "priceAdjustments" | "sellingPlan"> & {
      priceAdjustments: Array<
        ResolversTypes["SellingPlanAllocationPriceAdjustment"]
      >;
      sellingPlan: ResolversTypes["SellingPlan"];
    }
  >;
  SellingPlanAllocationConnection: ResolverTypeWrapper<
    Omit<Types.SellingPlanAllocationConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["SellingPlanAllocationEdge"]>;
      nodes: Array<ResolversTypes["SellingPlanAllocation"]>;
    }
  >;
  SellingPlanAllocationEdge: ResolverTypeWrapper<
    Omit<Types.SellingPlanAllocationEdge, "node"> & {
      node: ResolversTypes["SellingPlanAllocation"];
    }
  >;
  SellingPlanAllocationPriceAdjustment: ResolverTypeWrapper<Types.SellingPlanAllocationPriceAdjustment>;
  SellingPlanBillingPolicy: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SellingPlanBillingPolicy"]
  >;
  SellingPlanCheckoutCharge: ResolverTypeWrapper<
    Omit<Types.SellingPlanCheckoutCharge, "value"> & {
      value: ResolversTypes["SellingPlanCheckoutChargeValue"];
    }
  >;
  SellingPlanCheckoutChargePercentageValue: ResolverTypeWrapper<Types.SellingPlanCheckoutChargePercentageValue>;
  SellingPlanCheckoutChargeType: Types.SellingPlanCheckoutChargeType;
  SellingPlanCheckoutChargeValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SellingPlanCheckoutChargeValue"]
  >;
  SellingPlanConnection: ResolverTypeWrapper<
    Omit<Types.SellingPlanConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["SellingPlanEdge"]>;
      nodes: Array<ResolversTypes["SellingPlan"]>;
    }
  >;
  SellingPlanDeliveryPolicy: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SellingPlanDeliveryPolicy"]
  >;
  SellingPlanEdge: ResolverTypeWrapper<
    Omit<Types.SellingPlanEdge, "node"> & {
      node: ResolversTypes["SellingPlan"];
    }
  >;
  SellingPlanFixedAmountPriceAdjustment: ResolverTypeWrapper<Types.SellingPlanFixedAmountPriceAdjustment>;
  SellingPlanFixedPriceAdjustment: ResolverTypeWrapper<Types.SellingPlanFixedPriceAdjustment>;
  SellingPlanGroup: ResolverTypeWrapper<
    Omit<Types.SellingPlanGroup, "options" | "sellingPlans"> & {
      options: Array<ResolversTypes["SellingPlanGroupOption"]>;
      sellingPlans: ResolversTypes["SellingPlanConnection"];
    }
  >;
  SellingPlanGroupConnection: ResolverTypeWrapper<
    Omit<Types.SellingPlanGroupConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["SellingPlanGroupEdge"]>;
      nodes: Array<ResolversTypes["SellingPlanGroup"]>;
    }
  >;
  SellingPlanGroupEdge: ResolverTypeWrapper<
    Omit<Types.SellingPlanGroupEdge, "node"> & {
      node: ResolversTypes["SellingPlanGroup"];
    }
  >;
  SellingPlanGroupOption: ResolverTypeWrapper<Types.SellingPlanGroupOption>;
  SellingPlanInterval: Types.SellingPlanInterval;
  SellingPlanOption: ResolverTypeWrapper<Types.SellingPlanOption>;
  SellingPlanPercentagePriceAdjustment: ResolverTypeWrapper<Types.SellingPlanPercentagePriceAdjustment>;
  SellingPlanPriceAdjustment: ResolverTypeWrapper<
    Omit<Types.SellingPlanPriceAdjustment, "adjustmentValue"> & {
      adjustmentValue: ResolversTypes["SellingPlanPriceAdjustmentValue"];
    }
  >;
  SellingPlanPriceAdjustmentValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SellingPlanPriceAdjustmentValue"]
  >;
  SellingPlanRecurringBillingPolicy: ResolverTypeWrapper<Types.SellingPlanRecurringBillingPolicy>;
  SellingPlanRecurringDeliveryPolicy: ResolverTypeWrapper<Types.SellingPlanRecurringDeliveryPolicy>;
  Shop: ResolverTypeWrapper<
    Omit<Types.Shop, "brand" | "metafield" | "metafields"> & {
      brand: Types.Maybe<ResolversTypes["Brand"]>;
      metafield: Types.Maybe<ResolversTypes["Metafield"]>;
      metafields: Array<Types.Maybe<ResolversTypes["Metafield"]>>;
    }
  >;
  ShopPayInstallmentsFinancingPlan: ResolverTypeWrapper<Types.ShopPayInstallmentsFinancingPlan>;
  ShopPayInstallmentsFinancingPlanFrequency: Types.ShopPayInstallmentsFinancingPlanFrequency;
  ShopPayInstallmentsFinancingPlanTerm: ResolverTypeWrapper<Types.ShopPayInstallmentsFinancingPlanTerm>;
  ShopPayInstallmentsLoan: Types.ShopPayInstallmentsLoan;
  ShopPayInstallmentsPricing: ResolverTypeWrapper<Types.ShopPayInstallmentsPricing>;
  ShopPayInstallmentsProductVariantPricing: ResolverTypeWrapper<Types.ShopPayInstallmentsProductVariantPricing>;
  ShopPayPaymentRequest: ResolverTypeWrapper<Types.ShopPayPaymentRequest>;
  ShopPayPaymentRequestContactField: ResolverTypeWrapper<Types.ShopPayPaymentRequestContactField>;
  ShopPayPaymentRequestDeliveryMethod: ResolverTypeWrapper<Types.ShopPayPaymentRequestDeliveryMethod>;
  ShopPayPaymentRequestDeliveryMethodInput: Types.ShopPayPaymentRequestDeliveryMethodInput;
  ShopPayPaymentRequestDeliveryMethodType: Types.ShopPayPaymentRequestDeliveryMethodType;
  ShopPayPaymentRequestDiscount: ResolverTypeWrapper<Types.ShopPayPaymentRequestDiscount>;
  ShopPayPaymentRequestDiscountInput: Types.ShopPayPaymentRequestDiscountInput;
  ShopPayPaymentRequestImage: ResolverTypeWrapper<Types.ShopPayPaymentRequestImage>;
  ShopPayPaymentRequestImageInput: Types.ShopPayPaymentRequestImageInput;
  ShopPayPaymentRequestInput: Types.ShopPayPaymentRequestInput;
  ShopPayPaymentRequestLineItem: ResolverTypeWrapper<Types.ShopPayPaymentRequestLineItem>;
  ShopPayPaymentRequestLineItemInput: Types.ShopPayPaymentRequestLineItemInput;
  ShopPayPaymentRequestReceipt: ResolverTypeWrapper<Types.ShopPayPaymentRequestReceipt>;
  ShopPayPaymentRequestSession: ResolverTypeWrapper<Types.ShopPayPaymentRequestSession>;
  ShopPayPaymentRequestSessionCreatePayload: ResolverTypeWrapper<Types.ShopPayPaymentRequestSessionCreatePayload>;
  ShopPayPaymentRequestSessionSubmitPayload: ResolverTypeWrapper<Types.ShopPayPaymentRequestSessionSubmitPayload>;
  ShopPayPaymentRequestShippingLine: ResolverTypeWrapper<Types.ShopPayPaymentRequestShippingLine>;
  ShopPayPaymentRequestShippingLineInput: Types.ShopPayPaymentRequestShippingLineInput;
  ShopPayPaymentRequestTotalShippingPrice: ResolverTypeWrapper<Types.ShopPayPaymentRequestTotalShippingPrice>;
  ShopPayPaymentRequestTotalShippingPriceInput: Types.ShopPayPaymentRequestTotalShippingPriceInput;
  ShopPayWalletContentInput: Types.ShopPayWalletContentInput;
  ShopPolicy: ResolverTypeWrapper<Types.ShopPolicy>;
  ShopPolicyWithDefault: ResolverTypeWrapper<Types.ShopPolicyWithDefault>;
  Sitemap: ResolverTypeWrapper<
    Omit<Types.Sitemap, "resources"> & {
      resources: Types.Maybe<ResolversTypes["PaginatedSitemapResources"]>;
    }
  >;
  SitemapImage: ResolverTypeWrapper<Types.SitemapImage>;
  SitemapResource: ResolverTypeWrapper<Types.SitemapResource>;
  SitemapResourceInterface: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["SitemapResourceInterface"]
  >;
  SitemapResourceMetaobject: ResolverTypeWrapper<Types.SitemapResourceMetaobject>;
  SitemapType: Types.SitemapType;
  StoreAvailability: ResolverTypeWrapper<
    Omit<Types.StoreAvailability, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  StoreAvailabilityConnection: ResolverTypeWrapper<
    Omit<Types.StoreAvailabilityConnection, "edges" | "nodes"> & {
      edges: Array<ResolversTypes["StoreAvailabilityEdge"]>;
      nodes: Array<ResolversTypes["StoreAvailability"]>;
    }
  >;
  StoreAvailabilityEdge: ResolverTypeWrapper<
    Omit<Types.StoreAvailabilityEdge, "node"> & {
      node: ResolversTypes["StoreAvailability"];
    }
  >;
  String: ResolverTypeWrapper<Types.Scalars["String"]["output"]>;
  StringConnection: ResolverTypeWrapper<Types.StringConnection>;
  StringEdge: ResolverTypeWrapper<Types.StringEdge>;
  SubmissionError: ResolverTypeWrapper<Types.SubmissionError>;
  SubmissionErrorCode: Types.SubmissionErrorCode;
  SubmitAlreadyAccepted: ResolverTypeWrapper<Types.SubmitAlreadyAccepted>;
  SubmitFailed: ResolverTypeWrapper<Types.SubmitFailed>;
  SubmitSuccess: ResolverTypeWrapper<Types.SubmitSuccess>;
  SubmitThrottled: ResolverTypeWrapper<Types.SubmitThrottled>;
  Swatch: ResolverTypeWrapper<
    Omit<Types.Swatch, "image"> & {
      image: Types.Maybe<ResolversTypes["MediaImage"]>;
    }
  >;
  TaxonomyCategory: ResolverTypeWrapper<Types.TaxonomyCategory>;
  TaxonomyMetafieldFilter: Types.TaxonomyMetafieldFilter;
  Trackable: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["Trackable"]
  >;
  URL: ResolverTypeWrapper<Types.Scalars["URL"]["output"]>;
  UnitPriceMeasurement: ResolverTypeWrapper<Types.UnitPriceMeasurement>;
  UnitPriceMeasurementMeasuredType: Types.UnitPriceMeasurementMeasuredType;
  UnitPriceMeasurementMeasuredUnit: Types.UnitPriceMeasurementMeasuredUnit;
  UnitSystem: Types.UnitSystem;
  UnsignedInt64: ResolverTypeWrapper<Types.Scalars["UnsignedInt64"]["output"]>;
  UrlRedirect: ResolverTypeWrapper<Types.UrlRedirect>;
  UrlRedirectConnection: ResolverTypeWrapper<Types.UrlRedirectConnection>;
  UrlRedirectEdge: ResolverTypeWrapper<Types.UrlRedirectEdge>;
  UserError: ResolverTypeWrapper<Types.UserError>;
  UserErrorsShopPayPaymentRequestSessionUserErrors: ResolverTypeWrapper<Types.UserErrorsShopPayPaymentRequestSessionUserErrors>;
  UserErrorsShopPayPaymentRequestSessionUserErrorsCode: Types.UserErrorsShopPayPaymentRequestSessionUserErrorsCode;
  VariantOptionFilter: Types.VariantOptionFilter;
  Video: ResolverTypeWrapper<
    Omit<Types.Video, "previewImage"> & {
      previewImage: Types.Maybe<ResolversTypes["Image"]>;
    }
  >;
  VideoSource: ResolverTypeWrapper<Types.VideoSource>;
  WeightUnit: Types.WeightUnit;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ApiVersion: Types.ApiVersion;
  ApplePayWalletContentInput: Types.ApplePayWalletContentInput;
  ApplePayWalletHeaderInput: Types.ApplePayWalletHeaderInput;
  AppliedGiftCard: Types.AppliedGiftCard;
  Article: Omit<
    Types.Article,
    "blog" | "image" | "metafield" | "metafields"
  > & {
    blog: ResolversParentTypes["Blog"];
    image: Types.Maybe<ResolversParentTypes["Image"]>;
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  ArticleAuthor: Types.ArticleAuthor;
  ArticleConnection: Omit<Types.ArticleConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["ArticleEdge"]>;
    nodes: Array<ResolversParentTypes["Article"]>;
  };
  ArticleEdge: Omit<Types.ArticleEdge, "node"> & {
    node: ResolversParentTypes["Article"];
  };
  Attribute: Types.Attribute;
  AttributeInput: Types.AttributeInput;
  AutomaticDiscountApplication: Omit<
    Types.AutomaticDiscountApplication,
    "value"
  > & { value: ResolversParentTypes["PricingValue"] };
  BaseCartLine: ResolversInterfaceTypes<ResolversParentTypes>["BaseCartLine"];
  BaseCartLineConnection: Omit<
    Types.BaseCartLineConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["BaseCartLineEdge"]>;
    nodes: Array<ResolversParentTypes["BaseCartLine"]>;
  };
  BaseCartLineEdge: Omit<Types.BaseCartLineEdge, "node"> & {
    node: ResolversParentTypes["BaseCartLine"];
  };
  Blog: Omit<
    Types.Blog,
    "articleByHandle" | "articles" | "metafield" | "metafields"
  > & {
    articleByHandle: Types.Maybe<ResolversParentTypes["Article"]>;
    articles: ResolversParentTypes["ArticleConnection"];
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  BlogConnection: Omit<Types.BlogConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["BlogEdge"]>;
    nodes: Array<ResolversParentTypes["Blog"]>;
  };
  BlogEdge: Omit<Types.BlogEdge, "node"> & {
    node: ResolversParentTypes["Blog"];
  };
  Boolean: Types.Scalars["Boolean"]["output"];
  Brand: Omit<Types.Brand, "coverImage" | "logo" | "squareLogo"> & {
    coverImage: Types.Maybe<ResolversParentTypes["MediaImage"]>;
    logo: Types.Maybe<ResolversParentTypes["MediaImage"]>;
    squareLogo: Types.Maybe<ResolversParentTypes["MediaImage"]>;
  };
  BrandColorGroup: Types.BrandColorGroup;
  BrandColors: Types.BrandColors;
  BuyerInput: Types.BuyerInput;
  Cart: Omit<
    Types.Cart,
    | "buyerIdentity"
    | "delivery"
    | "deliveryGroups"
    | "discountAllocations"
    | "lines"
    | "metafield"
    | "metafields"
  > & {
    buyerIdentity: ResolversParentTypes["CartBuyerIdentity"];
    delivery: ResolversParentTypes["CartDelivery"];
    deliveryGroups: ResolversParentTypes["CartDeliveryGroupConnection"];
    discountAllocations: Array<ResolversParentTypes["CartDiscountAllocation"]>;
    lines: ResolversParentTypes["BaseCartLineConnection"];
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  CartAddress: ResolversUnionTypes<ResolversParentTypes>["CartAddress"];
  CartAddressInput: Types.CartAddressInput;
  CartAttributesUpdatePayload: Omit<
    Types.CartAttributesUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartAutomaticDiscountAllocation: Omit<
    Types.CartAutomaticDiscountAllocation,
    "discountApplication"
  > & { discountApplication: ResolversParentTypes["CartDiscountApplication"] };
  CartBillingAddressUpdatePayload: Omit<
    Types.CartBillingAddressUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartBuyerIdentity: Omit<
    Types.CartBuyerIdentity,
    "customer" | "deliveryAddressPreferences" | "purchasingCompany"
  > & {
    customer: Types.Maybe<ResolversParentTypes["Customer"]>;
    deliveryAddressPreferences: Array<ResolversParentTypes["DeliveryAddress"]>;
    purchasingCompany: Types.Maybe<ResolversParentTypes["PurchasingCompany"]>;
  };
  CartBuyerIdentityInput: Types.CartBuyerIdentityInput;
  CartBuyerIdentityUpdatePayload: Omit<
    Types.CartBuyerIdentityUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartCodeDiscountAllocation: Omit<
    Types.CartCodeDiscountAllocation,
    "discountApplication"
  > & { discountApplication: ResolversParentTypes["CartDiscountApplication"] };
  CartCompletionAction: ResolversUnionTypes<ResolversParentTypes>["CartCompletionAction"];
  CartCompletionActionRequired: Omit<
    Types.CartCompletionActionRequired,
    "action"
  > & { action: Types.Maybe<ResolversParentTypes["CartCompletionAction"]> };
  CartCompletionAttemptResult: ResolversUnionTypes<ResolversParentTypes>["CartCompletionAttemptResult"];
  CartCompletionFailed: Types.CartCompletionFailed;
  CartCompletionProcessing: Types.CartCompletionProcessing;
  CartCompletionSuccess: Types.CartCompletionSuccess;
  CartCost: Types.CartCost;
  CartCreatePayload: Omit<Types.CartCreatePayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartCustomDiscountAllocation: Omit<
    Types.CartCustomDiscountAllocation,
    "discountApplication"
  > & { discountApplication: ResolversParentTypes["CartDiscountApplication"] };
  CartDelivery: Omit<Types.CartDelivery, "addresses"> & {
    addresses: Array<ResolversParentTypes["CartSelectableAddress"]>;
  };
  CartDeliveryAddress: Types.CartDeliveryAddress;
  CartDeliveryAddressInput: Types.CartDeliveryAddressInput;
  CartDeliveryAddressesAddPayload: Omit<
    Types.CartDeliveryAddressesAddPayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartDeliveryAddressesRemovePayload: Omit<
    Types.CartDeliveryAddressesRemovePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartDeliveryAddressesUpdatePayload: Omit<
    Types.CartDeliveryAddressesUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartDeliveryCoordinatesPreference: Types.CartDeliveryCoordinatesPreference;
  CartDeliveryCoordinatesPreferenceInput: Types.CartDeliveryCoordinatesPreferenceInput;
  CartDeliveryGroup: Omit<Types.CartDeliveryGroup, "cartLines"> & {
    cartLines: ResolversParentTypes["BaseCartLineConnection"];
  };
  CartDeliveryGroupConnection: Omit<
    Types.CartDeliveryGroupConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["CartDeliveryGroupEdge"]>;
    nodes: Array<ResolversParentTypes["CartDeliveryGroup"]>;
  };
  CartDeliveryGroupEdge: Omit<Types.CartDeliveryGroupEdge, "node"> & {
    node: ResolversParentTypes["CartDeliveryGroup"];
  };
  CartDeliveryInput: Types.CartDeliveryInput;
  CartDeliveryOption: Types.CartDeliveryOption;
  CartDeliveryPreference: Types.CartDeliveryPreference;
  CartDeliveryPreferenceInput: Types.CartDeliveryPreferenceInput;
  CartDirectPaymentMethodInput: Types.CartDirectPaymentMethodInput;
  CartDiscountAllocation: ResolversInterfaceTypes<ResolversParentTypes>["CartDiscountAllocation"];
  CartDiscountApplication: Omit<Types.CartDiscountApplication, "value"> & {
    value: ResolversParentTypes["PricingValue"];
  };
  CartDiscountCode: Types.CartDiscountCode;
  CartDiscountCodesUpdatePayload: Omit<
    Types.CartDiscountCodesUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartEstimatedCost: Types.CartEstimatedCost;
  CartFreePaymentMethodInput: Types.CartFreePaymentMethodInput;
  CartGiftCardCodesRemovePayload: Omit<
    Types.CartGiftCardCodesRemovePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartGiftCardCodesUpdatePayload: Omit<
    Types.CartGiftCardCodesUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartInput: Types.CartInput;
  CartInputMetafieldInput: Types.CartInputMetafieldInput;
  CartLine: Omit<
    Types.CartLine,
    "discountAllocations" | "merchandise" | "sellingPlanAllocation"
  > & {
    discountAllocations: Array<ResolversParentTypes["CartDiscountAllocation"]>;
    merchandise: ResolversParentTypes["Merchandise"];
    sellingPlanAllocation: Types.Maybe<
      ResolversParentTypes["SellingPlanAllocation"]
    >;
  };
  CartLineCost: Types.CartLineCost;
  CartLineEstimatedCost: Types.CartLineEstimatedCost;
  CartLineInput: Types.CartLineInput;
  CartLineUpdateInput: Types.CartLineUpdateInput;
  CartLinesAddPayload: Omit<Types.CartLinesAddPayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartLinesRemovePayload: Omit<Types.CartLinesRemovePayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartLinesUpdatePayload: Omit<Types.CartLinesUpdatePayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartMetafieldDeleteInput: Types.CartMetafieldDeleteInput;
  CartMetafieldDeletePayload: Types.CartMetafieldDeletePayload;
  CartMetafieldsSetInput: Types.CartMetafieldsSetInput;
  CartMetafieldsSetPayload: Omit<
    Types.CartMetafieldsSetPayload,
    "metafields"
  > & { metafields: Types.Maybe<Array<ResolversParentTypes["Metafield"]>> };
  CartNoteUpdatePayload: Omit<Types.CartNoteUpdatePayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartOperationError: Types.CartOperationError;
  CartPaymentInput: Types.CartPaymentInput;
  CartPaymentUpdatePayload: Omit<Types.CartPaymentUpdatePayload, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartPreferences: Types.CartPreferences;
  CartPreferencesInput: Types.CartPreferencesInput;
  CartPrepareForCompletionPayload: Omit<
    Types.CartPrepareForCompletionPayload,
    "result"
  > & {
    result: Types.Maybe<ResolversParentTypes["CartPrepareForCompletionResult"]>;
  };
  CartPrepareForCompletionResult: ResolversUnionTypes<ResolversParentTypes>["CartPrepareForCompletionResult"];
  CartRemovePersonalDataPayload: Omit<
    Types.CartRemovePersonalDataPayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartSelectableAddress: Omit<Types.CartSelectableAddress, "address"> & {
    address: ResolversParentTypes["CartAddress"];
  };
  CartSelectableAddressInput: Types.CartSelectableAddressInput;
  CartSelectableAddressUpdateInput: Types.CartSelectableAddressUpdateInput;
  CartSelectedDeliveryOptionInput: Types.CartSelectedDeliveryOptionInput;
  CartSelectedDeliveryOptionsUpdatePayload: Omit<
    Types.CartSelectedDeliveryOptionsUpdatePayload,
    "cart"
  > & { cart: Types.Maybe<ResolversParentTypes["Cart"]> };
  CartStatusNotReady: Omit<Types.CartStatusNotReady, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartStatusReady: Omit<Types.CartStatusReady, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartSubmitForCompletionPayload: Omit<
    Types.CartSubmitForCompletionPayload,
    "result"
  > & {
    result: Types.Maybe<ResolversParentTypes["CartSubmitForCompletionResult"]>;
  };
  CartSubmitForCompletionResult: ResolversUnionTypes<ResolversParentTypes>["CartSubmitForCompletionResult"];
  CartThrottled: Omit<Types.CartThrottled, "cart"> & {
    cart: Types.Maybe<ResolversParentTypes["Cart"]>;
  };
  CartUserError: Types.CartUserError;
  CartWalletPaymentMethodInput: Types.CartWalletPaymentMethodInput;
  CartWarning: Types.CartWarning;
  CategoryFilter: Types.CategoryFilter;
  Collection: Omit<
    Types.Collection,
    "image" | "metafield" | "metafields" | "products"
  > & {
    image: Types.Maybe<ResolversParentTypes["Image"]>;
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    products: ResolversParentTypes["ProductConnection"];
  };
  CollectionConnection: Omit<Types.CollectionConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["CollectionEdge"]>;
    nodes: Array<ResolversParentTypes["Collection"]>;
  };
  CollectionEdge: Omit<Types.CollectionEdge, "node"> & {
    node: ResolversParentTypes["Collection"];
  };
  Color: Types.Scalars["Color"]["output"];
  Comment: Types.Comment;
  CommentAuthor: Types.CommentAuthor;
  CommentConnection: Types.CommentConnection;
  CommentEdge: Types.CommentEdge;
  Company: Omit<Types.Company, "metafield" | "metafields"> & {
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  CompanyContact: Types.CompanyContact;
  CompanyLocation: Omit<Types.CompanyLocation, "metafield" | "metafields"> & {
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  CompletePaymentChallenge: Types.CompletePaymentChallenge;
  CompletionError: Types.CompletionError;
  ComponentizableCartLine: Omit<
    Types.ComponentizableCartLine,
    | "discountAllocations"
    | "lineComponents"
    | "merchandise"
    | "sellingPlanAllocation"
  > & {
    discountAllocations: Array<ResolversParentTypes["CartDiscountAllocation"]>;
    lineComponents: Array<ResolversParentTypes["CartLine"]>;
    merchandise: ResolversParentTypes["Merchandise"];
    sellingPlanAllocation: Types.Maybe<
      ResolversParentTypes["SellingPlanAllocation"]
    >;
  };
  Count: Types.Count;
  Country: Omit<Types.Country, "market"> & {
    market: Types.Maybe<ResolversParentTypes["Market"]>;
  };
  Currency: Types.Currency;
  Customer: Omit<Types.Customer, "metafield" | "metafields" | "orders"> & {
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    orders: ResolversParentTypes["OrderConnection"];
  };
  CustomerAccessToken: Types.CustomerAccessToken;
  CustomerAccessTokenCreateInput: Types.CustomerAccessTokenCreateInput;
  CustomerAccessTokenCreatePayload: Types.CustomerAccessTokenCreatePayload;
  CustomerAccessTokenCreateWithMultipassPayload: Types.CustomerAccessTokenCreateWithMultipassPayload;
  CustomerAccessTokenDeletePayload: Types.CustomerAccessTokenDeletePayload;
  CustomerAccessTokenRenewPayload: Types.CustomerAccessTokenRenewPayload;
  CustomerActivateByUrlPayload: Omit<
    Types.CustomerActivateByUrlPayload,
    "customer"
  > & { customer: Types.Maybe<ResolversParentTypes["Customer"]> };
  CustomerActivateInput: Types.CustomerActivateInput;
  CustomerActivatePayload: Omit<Types.CustomerActivatePayload, "customer"> & {
    customer: Types.Maybe<ResolversParentTypes["Customer"]>;
  };
  CustomerAddressCreatePayload: Types.CustomerAddressCreatePayload;
  CustomerAddressDeletePayload: Types.CustomerAddressDeletePayload;
  CustomerAddressUpdatePayload: Types.CustomerAddressUpdatePayload;
  CustomerCreateInput: Types.CustomerCreateInput;
  CustomerCreatePayload: Omit<Types.CustomerCreatePayload, "customer"> & {
    customer: Types.Maybe<ResolversParentTypes["Customer"]>;
  };
  CustomerDefaultAddressUpdatePayload: Omit<
    Types.CustomerDefaultAddressUpdatePayload,
    "customer"
  > & { customer: Types.Maybe<ResolversParentTypes["Customer"]> };
  CustomerRecoverPayload: Types.CustomerRecoverPayload;
  CustomerResetByUrlPayload: Omit<
    Types.CustomerResetByUrlPayload,
    "customer"
  > & { customer: Types.Maybe<ResolversParentTypes["Customer"]> };
  CustomerResetInput: Types.CustomerResetInput;
  CustomerResetPayload: Omit<Types.CustomerResetPayload, "customer"> & {
    customer: Types.Maybe<ResolversParentTypes["Customer"]>;
  };
  CustomerUpdateInput: Types.CustomerUpdateInput;
  CustomerUpdatePayload: Omit<Types.CustomerUpdatePayload, "customer"> & {
    customer: Types.Maybe<ResolversParentTypes["Customer"]>;
  };
  CustomerUserError: Types.CustomerUserError;
  DateTime: Types.Scalars["DateTime"]["output"];
  Decimal: Types.Scalars["Decimal"]["output"];
  DeliveryAddress: ResolversUnionTypes<ResolversParentTypes>["DeliveryAddress"];
  DeliveryAddressInput: Types.DeliveryAddressInput;
  DiscountAllocation: Omit<Types.DiscountAllocation, "discountApplication"> & {
    discountApplication: ResolversParentTypes["DiscountApplication"];
  };
  DiscountApplication: ResolversInterfaceTypes<ResolversParentTypes>["DiscountApplication"];
  DiscountApplicationConnection: Omit<
    Types.DiscountApplicationConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["DiscountApplicationEdge"]>;
    nodes: Array<ResolversParentTypes["DiscountApplication"]>;
  };
  DiscountApplicationEdge: Omit<Types.DiscountApplicationEdge, "node"> & {
    node: ResolversParentTypes["DiscountApplication"];
  };
  DiscountCodeApplication: Omit<Types.DiscountCodeApplication, "value"> & {
    value: ResolversParentTypes["PricingValue"];
  };
  DisplayableError: ResolversInterfaceTypes<ResolversParentTypes>["DisplayableError"];
  Domain: Types.Domain;
  ExternalVideo: Omit<Types.ExternalVideo, "previewImage"> & {
    previewImage: Types.Maybe<ResolversParentTypes["Image"]>;
  };
  Filter: Omit<Types.Filter, "values"> & {
    values: Array<ResolversParentTypes["FilterValue"]>;
  };
  FilterValue: Omit<Types.FilterValue, "image" | "swatch"> & {
    image: Types.Maybe<ResolversParentTypes["MediaImage"]>;
    swatch: Types.Maybe<ResolversParentTypes["Swatch"]>;
  };
  Float: Types.Scalars["Float"]["output"];
  Fulfillment: Omit<Types.Fulfillment, "fulfillmentLineItems"> & {
    fulfillmentLineItems: ResolversParentTypes["FulfillmentLineItemConnection"];
  };
  FulfillmentLineItem: Omit<Types.FulfillmentLineItem, "lineItem"> & {
    lineItem: ResolversParentTypes["OrderLineItem"];
  };
  FulfillmentLineItemConnection: Omit<
    Types.FulfillmentLineItemConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["FulfillmentLineItemEdge"]>;
    nodes: Array<ResolversParentTypes["FulfillmentLineItem"]>;
  };
  FulfillmentLineItemEdge: Omit<Types.FulfillmentLineItemEdge, "node"> & {
    node: ResolversParentTypes["FulfillmentLineItem"];
  };
  FulfillmentTrackingInfo: Types.FulfillmentTrackingInfo;
  GenericFile: Omit<Types.GenericFile, "previewImage"> & {
    previewImage: Types.Maybe<ResolversParentTypes["Image"]>;
  };
  GeoCoordinateInput: Types.GeoCoordinateInput;
  HTML: Types.Scalars["HTML"]["output"];
  HasMetafields: ResolversInterfaceTypes<ResolversParentTypes>["HasMetafields"];
  HasMetafieldsIdentifier: Types.HasMetafieldsIdentifier;
  ID: Types.Scalars["ID"]["output"];
  ISO8601DateTime: Types.Scalars["ISO8601DateTime"]["output"];
  Image: Types.Image;
  ImageConnection: Omit<Types.ImageConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["ImageEdge"]>;
    nodes: Array<ResolversParentTypes["Image"]>;
  };
  ImageEdge: Omit<Types.ImageEdge, "node"> & {
    node: ResolversParentTypes["Image"];
  };
  ImageTransformInput: Types.ImageTransformInput;
  InContextAnnotation: Types.InContextAnnotation;
  InContextAnnotationType: Types.InContextAnnotationType;
  Int: Types.Scalars["Int"]["output"];
  JSON: Types.Scalars["JSON"]["output"];
  Language: Types.Language;
  Localization: Omit<
    Types.Localization,
    "availableCountries" | "country" | "market"
  > & {
    availableCountries: Array<ResolversParentTypes["Country"]>;
    country: ResolversParentTypes["Country"];
    market: ResolversParentTypes["Market"];
  };
  Location: Omit<Types.Location, "address" | "metafield" | "metafields"> & {
    address: ResolversParentTypes["LocationAddress"];
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  LocationAddress: Types.LocationAddress;
  LocationConnection: Omit<Types.LocationConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["LocationEdge"]>;
    nodes: Array<ResolversParentTypes["Location"]>;
  };
  LocationEdge: Omit<Types.LocationEdge, "node"> & {
    node: ResolversParentTypes["Location"];
  };
  MailingAddress: Types.MailingAddress;
  MailingAddressConnection: Types.MailingAddressConnection;
  MailingAddressEdge: Types.MailingAddressEdge;
  MailingAddressInput: Types.MailingAddressInput;
  ManualDiscountApplication: Omit<Types.ManualDiscountApplication, "value"> & {
    value: ResolversParentTypes["PricingValue"];
  };
  Market: Omit<Types.Market, "metafield" | "metafields"> & {
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  Media: ResolversInterfaceTypes<ResolversParentTypes>["Media"];
  MediaConnection: Omit<Types.MediaConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["MediaEdge"]>;
    nodes: Array<ResolversParentTypes["Media"]>;
  };
  MediaEdge: Omit<Types.MediaEdge, "node"> & {
    node: ResolversParentTypes["Media"];
  };
  MediaImage: Omit<Types.MediaImage, "image" | "previewImage"> & {
    image: Types.Maybe<ResolversParentTypes["Image"]>;
    previewImage: Types.Maybe<ResolversParentTypes["Image"]>;
  };
  MediaPresentation: Types.MediaPresentation;
  Menu: Omit<Types.Menu, "items"> & {
    items: Array<ResolversParentTypes["MenuItem"]>;
  };
  MenuItem: Omit<Types.MenuItem, "items" | "resource"> & {
    items: Array<ResolversParentTypes["MenuItem"]>;
    resource: Types.Maybe<ResolversParentTypes["MenuItemResource"]>;
  };
  MenuItemResource: ResolversUnionTypes<ResolversParentTypes>["MenuItemResource"];
  Merchandise: ResolversUnionTypes<ResolversParentTypes>["Merchandise"];
  Metafield: Omit<
    Types.Metafield,
    "parentResource" | "reference" | "references"
  > & {
    parentResource: ResolversParentTypes["MetafieldParentResource"];
    reference: Types.Maybe<ResolversParentTypes["MetafieldReference"]>;
    references: Types.Maybe<
      ResolversParentTypes["MetafieldReferenceConnection"]
    >;
  };
  MetafieldDeleteUserError: Types.MetafieldDeleteUserError;
  MetafieldFilter: Types.MetafieldFilter;
  MetafieldParentResource: ResolversUnionTypes<ResolversParentTypes>["MetafieldParentResource"];
  MetafieldReference: ResolversUnionTypes<ResolversParentTypes>["MetafieldReference"];
  MetafieldReferenceConnection: Omit<
    Types.MetafieldReferenceConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["MetafieldReferenceEdge"]>;
    nodes: Array<ResolversParentTypes["MetafieldReference"]>;
  };
  MetafieldReferenceEdge: Omit<Types.MetafieldReferenceEdge, "node"> & {
    node: ResolversParentTypes["MetafieldReference"];
  };
  MetafieldsSetUserError: Types.MetafieldsSetUserError;
  Metaobject: Omit<Types.Metaobject, "field" | "fields" | "seo"> & {
    field: Types.Maybe<ResolversParentTypes["MetaobjectField"]>;
    fields: Array<ResolversParentTypes["MetaobjectField"]>;
    seo: Types.Maybe<ResolversParentTypes["MetaobjectSEO"]>;
  };
  MetaobjectConnection: Omit<Types.MetaobjectConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["MetaobjectEdge"]>;
    nodes: Array<ResolversParentTypes["Metaobject"]>;
  };
  MetaobjectEdge: Omit<Types.MetaobjectEdge, "node"> & {
    node: ResolversParentTypes["Metaobject"];
  };
  MetaobjectField: Omit<Types.MetaobjectField, "reference" | "references"> & {
    reference: Types.Maybe<ResolversParentTypes["MetafieldReference"]>;
    references: Types.Maybe<
      ResolversParentTypes["MetafieldReferenceConnection"]
    >;
  };
  MetaobjectHandleInput: Types.MetaobjectHandleInput;
  MetaobjectSEO: Omit<Types.MetaobjectSeo, "description" | "title"> & {
    description: Types.Maybe<ResolversParentTypes["MetaobjectField"]>;
    title: Types.Maybe<ResolversParentTypes["MetaobjectField"]>;
  };
  Model3d: Omit<Types.Model3d, "previewImage"> & {
    previewImage: Types.Maybe<ResolversParentTypes["Image"]>;
  };
  Model3dSource: Types.Model3dSource;
  MoneyInput: Types.MoneyInput;
  MoneyV2: Types.MoneyV2;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>["Node"];
  OnlineStorePublishable: ResolversInterfaceTypes<ResolversParentTypes>["OnlineStorePublishable"];
  Order: Omit<
    Types.Order,
    | "discountApplications"
    | "lineItems"
    | "metafield"
    | "metafields"
    | "shippingDiscountAllocations"
    | "successfulFulfillments"
  > & {
    discountApplications: ResolversParentTypes["DiscountApplicationConnection"];
    lineItems: ResolversParentTypes["OrderLineItemConnection"];
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    shippingDiscountAllocations: Array<
      ResolversParentTypes["DiscountAllocation"]
    >;
    successfulFulfillments: Types.Maybe<
      Array<ResolversParentTypes["Fulfillment"]>
    >;
  };
  OrderConnection: Omit<Types.OrderConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["OrderEdge"]>;
    nodes: Array<ResolversParentTypes["Order"]>;
  };
  OrderEdge: Omit<Types.OrderEdge, "node"> & {
    node: ResolversParentTypes["Order"];
  };
  OrderLineItem: Omit<
    Types.OrderLineItem,
    "discountAllocations" | "variant"
  > & {
    discountAllocations: Array<ResolversParentTypes["DiscountAllocation"]>;
    variant: Types.Maybe<ResolversParentTypes["ProductVariant"]>;
  };
  OrderLineItemConnection: Omit<
    Types.OrderLineItemConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["OrderLineItemEdge"]>;
    nodes: Array<ResolversParentTypes["OrderLineItem"]>;
  };
  OrderLineItemEdge: Omit<Types.OrderLineItemEdge, "node"> & {
    node: ResolversParentTypes["OrderLineItem"];
  };
  Page: Omit<Types.Page, "metafield" | "metafields"> & {
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  PageConnection: Omit<Types.PageConnection, "edges" | "nodes"> & {
    edges: Array<ResolversParentTypes["PageEdge"]>;
    nodes: Array<ResolversParentTypes["Page"]>;
  };
  PageEdge: Omit<Types.PageEdge, "node"> & {
    node: ResolversParentTypes["Page"];
  };
  PageInfo: Types.PageInfo;
  PaginatedSitemapResources: Omit<Types.PaginatedSitemapResources, "items"> & {
    items: Array<ResolversParentTypes["SitemapResourceInterface"]>;
  };
  PaymentSettings: Types.PaymentSettings;
  PredictiveSearchResult: Omit<
    Types.PredictiveSearchResult,
    "articles" | "collections" | "pages" | "products"
  > & {
    articles: Array<ResolversParentTypes["Article"]>;
    collections: Array<ResolversParentTypes["Collection"]>;
    pages: Array<ResolversParentTypes["Page"]>;
    products: Array<ResolversParentTypes["Product"]>;
  };
  PriceRangeFilter: Types.PriceRangeFilter;
  PricingPercentageValue: Types.PricingPercentageValue;
  PricingValue: ResolversUnionTypes<ResolversParentTypes>["PricingValue"];
  Product: Omit<
    Types.Product,
    | "adjacentVariants"
    | "collections"
    | "featuredImage"
    | "images"
    | "media"
    | "metafield"
    | "metafields"
    | "options"
    | "selectedOrFirstAvailableVariant"
    | "sellingPlanGroups"
    | "variantBySelectedOptions"
  > & {
    adjacentVariants: Array<ResolversParentTypes["ProductVariant"]>;
    collections: ResolversParentTypes["CollectionConnection"];
    featuredImage: Types.Maybe<ResolversParentTypes["Image"]>;
    images: ResolversParentTypes["ImageConnection"];
    media: ResolversParentTypes["MediaConnection"];
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    options: Array<ResolversParentTypes["ProductOption"]>;
    selectedOrFirstAvailableVariant: Types.Maybe<
      ResolversParentTypes["ProductVariant"]
    >;
    sellingPlanGroups: ResolversParentTypes["SellingPlanGroupConnection"];
    variantBySelectedOptions: Types.Maybe<
      ResolversParentTypes["ProductVariant"]
    >;
  };
  ProductConnection: Omit<
    Types.ProductConnection,
    "edges" | "filters" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["ProductEdge"]>;
    filters: Array<ResolversParentTypes["Filter"]>;
    nodes: Array<ResolversParentTypes["Product"]>;
  };
  ProductEdge: Omit<Types.ProductEdge, "node"> & {
    node: ResolversParentTypes["Product"];
  };
  ProductFilter: Types.ProductFilter;
  ProductOption: Omit<Types.ProductOption, "optionValues"> & {
    optionValues: Array<ResolversParentTypes["ProductOptionValue"]>;
  };
  ProductOptionValue: Omit<
    Types.ProductOptionValue,
    "firstSelectableVariant" | "swatch"
  > & {
    firstSelectableVariant: Types.Maybe<ResolversParentTypes["ProductVariant"]>;
    swatch: Types.Maybe<ResolversParentTypes["ProductOptionValueSwatch"]>;
  };
  ProductOptionValueSwatch: Omit<Types.ProductOptionValueSwatch, "image"> & {
    image: Types.Maybe<ResolversParentTypes["Media"]>;
  };
  ProductPriceRange: Types.ProductPriceRange;
  ProductVariant: Omit<
    Types.ProductVariant,
    | "image"
    | "metafield"
    | "metafields"
    | "product"
    | "sellingPlanAllocations"
    | "storeAvailability"
  > & {
    image: Types.Maybe<ResolversParentTypes["Image"]>;
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    product: ResolversParentTypes["Product"];
    sellingPlanAllocations: ResolversParentTypes["SellingPlanAllocationConnection"];
    storeAvailability: ResolversParentTypes["StoreAvailabilityConnection"];
  };
  ProductVariantComponent: Omit<
    Types.ProductVariantComponent,
    "productVariant"
  > & { productVariant: ResolversParentTypes["ProductVariant"] };
  ProductVariantComponentConnection: Types.ProductVariantComponentConnection;
  ProductVariantComponentEdge: Types.ProductVariantComponentEdge;
  ProductVariantConnection: Omit<Types.ProductVariantConnection, "nodes"> & {
    nodes: Array<ResolversParentTypes["ProductVariant"]>;
  };
  ProductVariantEdge: Omit<Types.ProductVariantEdge, "node"> & {
    node: ResolversParentTypes["ProductVariant"];
  };
  PurchasingCompany: Omit<Types.PurchasingCompany, "company" | "location"> & {
    company: ResolversParentTypes["Company"];
    location: ResolversParentTypes["CompanyLocation"];
  };
  QuantityPriceBreak: Types.QuantityPriceBreak;
  QuantityPriceBreakConnection: Types.QuantityPriceBreakConnection;
  QuantityPriceBreakEdge: Types.QuantityPriceBreakEdge;
  QuantityRule: Types.QuantityRule;
  QueryRoot: {};
  SEO: Types.Seo;
  ScriptDiscountApplication: Omit<Types.ScriptDiscountApplication, "value"> & {
    value: ResolversParentTypes["PricingValue"];
  };
  SearchQuerySuggestion: Types.SearchQuerySuggestion;
  SearchResultItem: ResolversUnionTypes<ResolversParentTypes>["SearchResultItem"];
  SearchResultItemConnection: Omit<
    Types.SearchResultItemConnection,
    "edges" | "nodes" | "productFilters"
  > & {
    edges: Array<ResolversParentTypes["SearchResultItemEdge"]>;
    nodes: Array<ResolversParentTypes["SearchResultItem"]>;
    productFilters: Array<ResolversParentTypes["Filter"]>;
  };
  SearchResultItemEdge: Omit<Types.SearchResultItemEdge, "node"> & {
    node: ResolversParentTypes["SearchResultItem"];
  };
  SelectedOption: Types.SelectedOption;
  SelectedOptionInput: Types.SelectedOptionInput;
  SellingPlan: Omit<
    Types.SellingPlan,
    | "billingPolicy"
    | "checkoutCharge"
    | "deliveryPolicy"
    | "metafield"
    | "metafields"
    | "priceAdjustments"
  > & {
    billingPolicy: Types.Maybe<
      ResolversParentTypes["SellingPlanBillingPolicy"]
    >;
    checkoutCharge: ResolversParentTypes["SellingPlanCheckoutCharge"];
    deliveryPolicy: Types.Maybe<
      ResolversParentTypes["SellingPlanDeliveryPolicy"]
    >;
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
    priceAdjustments: Array<ResolversParentTypes["SellingPlanPriceAdjustment"]>;
  };
  SellingPlanAllocation: Omit<
    Types.SellingPlanAllocation,
    "priceAdjustments" | "sellingPlan"
  > & {
    priceAdjustments: Array<
      ResolversParentTypes["SellingPlanAllocationPriceAdjustment"]
    >;
    sellingPlan: ResolversParentTypes["SellingPlan"];
  };
  SellingPlanAllocationConnection: Omit<
    Types.SellingPlanAllocationConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["SellingPlanAllocationEdge"]>;
    nodes: Array<ResolversParentTypes["SellingPlanAllocation"]>;
  };
  SellingPlanAllocationEdge: Omit<Types.SellingPlanAllocationEdge, "node"> & {
    node: ResolversParentTypes["SellingPlanAllocation"];
  };
  SellingPlanAllocationPriceAdjustment: Types.SellingPlanAllocationPriceAdjustment;
  SellingPlanBillingPolicy: ResolversUnionTypes<ResolversParentTypes>["SellingPlanBillingPolicy"];
  SellingPlanCheckoutCharge: Omit<Types.SellingPlanCheckoutCharge, "value"> & {
    value: ResolversParentTypes["SellingPlanCheckoutChargeValue"];
  };
  SellingPlanCheckoutChargePercentageValue: Types.SellingPlanCheckoutChargePercentageValue;
  SellingPlanCheckoutChargeValue: ResolversUnionTypes<ResolversParentTypes>["SellingPlanCheckoutChargeValue"];
  SellingPlanConnection: Omit<
    Types.SellingPlanConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["SellingPlanEdge"]>;
    nodes: Array<ResolversParentTypes["SellingPlan"]>;
  };
  SellingPlanDeliveryPolicy: ResolversUnionTypes<ResolversParentTypes>["SellingPlanDeliveryPolicy"];
  SellingPlanEdge: Omit<Types.SellingPlanEdge, "node"> & {
    node: ResolversParentTypes["SellingPlan"];
  };
  SellingPlanFixedAmountPriceAdjustment: Types.SellingPlanFixedAmountPriceAdjustment;
  SellingPlanFixedPriceAdjustment: Types.SellingPlanFixedPriceAdjustment;
  SellingPlanGroup: Omit<Types.SellingPlanGroup, "options" | "sellingPlans"> & {
    options: Array<ResolversParentTypes["SellingPlanGroupOption"]>;
    sellingPlans: ResolversParentTypes["SellingPlanConnection"];
  };
  SellingPlanGroupConnection: Omit<
    Types.SellingPlanGroupConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["SellingPlanGroupEdge"]>;
    nodes: Array<ResolversParentTypes["SellingPlanGroup"]>;
  };
  SellingPlanGroupEdge: Omit<Types.SellingPlanGroupEdge, "node"> & {
    node: ResolversParentTypes["SellingPlanGroup"];
  };
  SellingPlanGroupOption: Types.SellingPlanGroupOption;
  SellingPlanOption: Types.SellingPlanOption;
  SellingPlanPercentagePriceAdjustment: Types.SellingPlanPercentagePriceAdjustment;
  SellingPlanPriceAdjustment: Omit<
    Types.SellingPlanPriceAdjustment,
    "adjustmentValue"
  > & {
    adjustmentValue: ResolversParentTypes["SellingPlanPriceAdjustmentValue"];
  };
  SellingPlanPriceAdjustmentValue: ResolversUnionTypes<ResolversParentTypes>["SellingPlanPriceAdjustmentValue"];
  SellingPlanRecurringBillingPolicy: Types.SellingPlanRecurringBillingPolicy;
  SellingPlanRecurringDeliveryPolicy: Types.SellingPlanRecurringDeliveryPolicy;
  Shop: Omit<Types.Shop, "brand" | "metafield" | "metafields"> & {
    brand: Types.Maybe<ResolversParentTypes["Brand"]>;
    metafield: Types.Maybe<ResolversParentTypes["Metafield"]>;
    metafields: Array<Types.Maybe<ResolversParentTypes["Metafield"]>>;
  };
  ShopPayInstallmentsFinancingPlan: Types.ShopPayInstallmentsFinancingPlan;
  ShopPayInstallmentsFinancingPlanTerm: Types.ShopPayInstallmentsFinancingPlanTerm;
  ShopPayInstallmentsPricing: Types.ShopPayInstallmentsPricing;
  ShopPayInstallmentsProductVariantPricing: Types.ShopPayInstallmentsProductVariantPricing;
  ShopPayPaymentRequest: Types.ShopPayPaymentRequest;
  ShopPayPaymentRequestContactField: Types.ShopPayPaymentRequestContactField;
  ShopPayPaymentRequestDeliveryMethod: Types.ShopPayPaymentRequestDeliveryMethod;
  ShopPayPaymentRequestDeliveryMethodInput: Types.ShopPayPaymentRequestDeliveryMethodInput;
  ShopPayPaymentRequestDiscount: Types.ShopPayPaymentRequestDiscount;
  ShopPayPaymentRequestDiscountInput: Types.ShopPayPaymentRequestDiscountInput;
  ShopPayPaymentRequestImage: Types.ShopPayPaymentRequestImage;
  ShopPayPaymentRequestImageInput: Types.ShopPayPaymentRequestImageInput;
  ShopPayPaymentRequestInput: Types.ShopPayPaymentRequestInput;
  ShopPayPaymentRequestLineItem: Types.ShopPayPaymentRequestLineItem;
  ShopPayPaymentRequestLineItemInput: Types.ShopPayPaymentRequestLineItemInput;
  ShopPayPaymentRequestReceipt: Types.ShopPayPaymentRequestReceipt;
  ShopPayPaymentRequestSession: Types.ShopPayPaymentRequestSession;
  ShopPayPaymentRequestSessionCreatePayload: Types.ShopPayPaymentRequestSessionCreatePayload;
  ShopPayPaymentRequestSessionSubmitPayload: Types.ShopPayPaymentRequestSessionSubmitPayload;
  ShopPayPaymentRequestShippingLine: Types.ShopPayPaymentRequestShippingLine;
  ShopPayPaymentRequestShippingLineInput: Types.ShopPayPaymentRequestShippingLineInput;
  ShopPayPaymentRequestTotalShippingPrice: Types.ShopPayPaymentRequestTotalShippingPrice;
  ShopPayPaymentRequestTotalShippingPriceInput: Types.ShopPayPaymentRequestTotalShippingPriceInput;
  ShopPayWalletContentInput: Types.ShopPayWalletContentInput;
  ShopPolicy: Types.ShopPolicy;
  ShopPolicyWithDefault: Types.ShopPolicyWithDefault;
  Sitemap: Omit<Types.Sitemap, "resources"> & {
    resources: Types.Maybe<ResolversParentTypes["PaginatedSitemapResources"]>;
  };
  SitemapImage: Types.SitemapImage;
  SitemapResource: Types.SitemapResource;
  SitemapResourceInterface: ResolversInterfaceTypes<ResolversParentTypes>["SitemapResourceInterface"];
  SitemapResourceMetaobject: Types.SitemapResourceMetaobject;
  StoreAvailability: Omit<Types.StoreAvailability, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  StoreAvailabilityConnection: Omit<
    Types.StoreAvailabilityConnection,
    "edges" | "nodes"
  > & {
    edges: Array<ResolversParentTypes["StoreAvailabilityEdge"]>;
    nodes: Array<ResolversParentTypes["StoreAvailability"]>;
  };
  StoreAvailabilityEdge: Omit<Types.StoreAvailabilityEdge, "node"> & {
    node: ResolversParentTypes["StoreAvailability"];
  };
  String: Types.Scalars["String"]["output"];
  StringConnection: Types.StringConnection;
  StringEdge: Types.StringEdge;
  SubmissionError: Types.SubmissionError;
  SubmitAlreadyAccepted: Types.SubmitAlreadyAccepted;
  SubmitFailed: Types.SubmitFailed;
  SubmitSuccess: Types.SubmitSuccess;
  SubmitThrottled: Types.SubmitThrottled;
  Swatch: Omit<Types.Swatch, "image"> & {
    image: Types.Maybe<ResolversParentTypes["MediaImage"]>;
  };
  TaxonomyCategory: Types.TaxonomyCategory;
  TaxonomyMetafieldFilter: Types.TaxonomyMetafieldFilter;
  Trackable: ResolversInterfaceTypes<ResolversParentTypes>["Trackable"];
  URL: Types.Scalars["URL"]["output"];
  UnitPriceMeasurement: Types.UnitPriceMeasurement;
  UnsignedInt64: Types.Scalars["UnsignedInt64"]["output"];
  UrlRedirect: Types.UrlRedirect;
  UrlRedirectConnection: Types.UrlRedirectConnection;
  UrlRedirectEdge: Types.UrlRedirectEdge;
  UserError: Types.UserError;
  UserErrorsShopPayPaymentRequestSessionUserErrors: Types.UserErrorsShopPayPaymentRequestSessionUserErrors;
  VariantOptionFilter: Types.VariantOptionFilter;
  Video: Omit<Types.Video, "previewImage"> & {
    previewImage: Types.Maybe<ResolversParentTypes["Image"]>;
  };
  VideoSource: Types.VideoSource;
};

export type AccessRestrictedDirectiveArgs = {
  reason?: Types.Maybe<Types.Scalars["String"]["input"]>;
};

export type AccessRestrictedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AccessRestrictedDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DeferDirectiveArgs = {
  if?: Types.Maybe<Types.Scalars["Boolean"]["input"]>;
  label: Types.Maybe<Types.Scalars["String"]["input"]>;
};

export type DeferDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DeferDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type InContextDirectiveArgs = {
  buyer: Types.Maybe<Types.BuyerInput>;
  country: Types.Maybe<Types.CountryCode>;
  language: Types.Maybe<Types.LanguageCode>;
  preferredLocationId: Types.Maybe<Types.Scalars["ID"]["input"]>;
};

export type InContextDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = InContextDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ApiVersionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ApiVersion"] = ResolversParentTypes["ApiVersion"],
> = {
  displayName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  supported: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppliedGiftCardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AppliedGiftCard"] = ResolversParentTypes["AppliedGiftCard"],
> = {
  amountUsed: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  amountUsedV2: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  balance: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  balanceV2: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastCharacters: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  presentmentAmountUsed: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Article"] = ResolversParentTypes["Article"],
> = {
  author: Resolver<ResolversTypes["ArticleAuthor"], ParentType, ContextType>;
  authorV2: Resolver<
    Types.Maybe<ResolversTypes["ArticleAuthor"]>,
    ParentType,
    ContextType
  >;
  blog: Resolver<ResolversTypes["Blog"], ParentType, ContextType>;
  comments: Resolver<
    ResolversTypes["CommentConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ArticleCommentsArgs, "reverse">
  >;
  content: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    Types.ArticleContentArgs
  >;
  contentHtml: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  excerpt: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    Types.ArticleExcerptArgs
  >;
  excerptHtml: Resolver<
    Types.Maybe<ResolversTypes["HTML"]>,
    ParentType,
    ContextType
  >;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.ArticleMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.ArticleMetafieldsArgs, "identifiers">
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  publishedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  seo: Resolver<Types.Maybe<ResolversTypes["SEO"]>, ParentType, ContextType>;
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleAuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ArticleAuthor"] = ResolversParentTypes["ArticleAuthor"],
> = {
  bio: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ArticleConnection"] = ResolversParentTypes["ArticleConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["ArticleEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<Array<ResolversTypes["Article"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ArticleEdge"] = ResolversParentTypes["ArticleEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Article"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Attribute"] = ResolversParentTypes["Attribute"],
> = {
  key: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AutomaticDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AutomaticDiscountApplication"] = ResolversParentTypes["AutomaticDiscountApplication"],
> = {
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseCartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseCartLine"] = ResolversParentTypes["BaseCartLine"],
> = {
  __resolveType: TypeResolveFn<
    "CartLine" | "ComponentizableCartLine",
    ParentType,
    ContextType
  >;
  attribute: Resolver<
    Types.Maybe<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType,
    RequireFields<Types.BaseCartLineAttributeArgs, "key">
  >;
  attributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  cost: Resolver<ResolversTypes["CartLineCost"], ParentType, ContextType>;
  discountAllocations: Resolver<
    Array<ResolversTypes["CartDiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  estimatedCost: Resolver<
    ResolversTypes["CartLineEstimatedCost"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  merchandise: Resolver<ResolversTypes["Merchandise"], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sellingPlanAllocation: Resolver<
    Types.Maybe<ResolversTypes["SellingPlanAllocation"]>,
    ParentType,
    ContextType
  >;
};

export type BaseCartLineConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseCartLineConnection"] = ResolversParentTypes["BaseCartLineConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["BaseCartLineEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["BaseCartLine"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseCartLineEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseCartLineEdge"] = ResolversParentTypes["BaseCartLineEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["BaseCartLine"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Blog"] = ResolversParentTypes["Blog"],
> = {
  articleByHandle: Resolver<
    Types.Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<Types.BlogArticleByHandleArgs, "handle">
  >;
  articles: Resolver<
    ResolversTypes["ArticleConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.BlogArticlesArgs, "reverse" | "sortKey">
  >;
  authors: Resolver<
    Array<ResolversTypes["ArticleAuthor"]>,
    ParentType,
    ContextType
  >;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.BlogMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.BlogMetafieldsArgs, "identifiers">
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  seo: Resolver<Types.Maybe<ResolversTypes["SEO"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BlogConnection"] = ResolversParentTypes["BlogConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["BlogEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Blog"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BlogEdge"] = ResolversParentTypes["BlogEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Blog"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Brand"] = ResolversParentTypes["Brand"],
> = {
  colors: Resolver<ResolversTypes["BrandColors"], ParentType, ContextType>;
  coverImage: Resolver<
    Types.Maybe<ResolversTypes["MediaImage"]>,
    ParentType,
    ContextType
  >;
  logo: Resolver<
    Types.Maybe<ResolversTypes["MediaImage"]>,
    ParentType,
    ContextType
  >;
  shortDescription: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slogan: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  squareLogo: Resolver<
    Types.Maybe<ResolversTypes["MediaImage"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandColorGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BrandColorGroup"] = ResolversParentTypes["BrandColorGroup"],
> = {
  background: Resolver<
    Types.Maybe<ResolversTypes["Color"]>,
    ParentType,
    ContextType
  >;
  foreground: Resolver<
    Types.Maybe<ResolversTypes["Color"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandColorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BrandColors"] = ResolversParentTypes["BrandColors"],
> = {
  primary: Resolver<
    Array<ResolversTypes["BrandColorGroup"]>,
    ParentType,
    ContextType
  >;
  secondary: Resolver<
    Array<ResolversTypes["BrandColorGroup"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Cart"] = ResolversParentTypes["Cart"],
> = {
  appliedGiftCards: Resolver<
    Array<ResolversTypes["AppliedGiftCard"]>,
    ParentType,
    ContextType
  >;
  attribute: Resolver<
    Types.Maybe<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CartAttributeArgs, "key">
  >;
  attributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  buyerIdentity: Resolver<
    ResolversTypes["CartBuyerIdentity"],
    ParentType,
    ContextType
  >;
  checkoutUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  cost: Resolver<ResolversTypes["CartCost"], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  delivery: Resolver<ResolversTypes["CartDelivery"], ParentType, ContextType>;
  deliveryGroups: Resolver<
    ResolversTypes["CartDeliveryGroupConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CartDeliveryGroupsArgs, "reverse" | "withCarrierRates">
  >;
  discountAllocations: Resolver<
    Array<ResolversTypes["CartDiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  discountCodes: Resolver<
    Array<ResolversTypes["CartDiscountCode"]>,
    ParentType,
    ContextType
  >;
  estimatedCost: Resolver<
    ResolversTypes["CartEstimatedCost"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lines: Resolver<
    ResolversTypes["BaseCartLineConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CartLinesArgs, "reverse">
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CartMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.CartMetafieldsArgs, "identifiers">
  >;
  note: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalQuantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartAddress"] = ResolversParentTypes["CartAddress"],
> = {
  __resolveType: TypeResolveFn<"CartDeliveryAddress", ParentType, ContextType>;
};

export type CartAttributesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartAttributesUpdatePayload"] = ResolversParentTypes["CartAttributesUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartAutomaticDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartAutomaticDiscountAllocation"] = ResolversParentTypes["CartAutomaticDiscountAllocation"],
> = {
  discountApplication: Resolver<
    ResolversTypes["CartDiscountApplication"],
    ParentType,
    ContextType
  >;
  discountedAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBillingAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartBillingAddressUpdatePayload"] = ResolversParentTypes["CartBillingAddressUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBuyerIdentityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartBuyerIdentity"] = ResolversParentTypes["CartBuyerIdentity"],
> = {
  countryCode: Resolver<
    Types.Maybe<ResolversTypes["CountryCode"]>,
    ParentType,
    ContextType
  >;
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  deliveryAddressPreferences: Resolver<
    Array<ResolversTypes["DeliveryAddress"]>,
    ParentType,
    ContextType
  >;
  email: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  preferences: Resolver<
    Types.Maybe<ResolversTypes["CartPreferences"]>,
    ParentType,
    ContextType
  >;
  purchasingCompany: Resolver<
    Types.Maybe<ResolversTypes["PurchasingCompany"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBuyerIdentityUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartBuyerIdentityUpdatePayload"] = ResolversParentTypes["CartBuyerIdentityUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCodeDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCodeDiscountAllocation"] = ResolversParentTypes["CartCodeDiscountAllocation"],
> = {
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  discountApplication: Resolver<
    ResolversTypes["CartDiscountApplication"],
    ParentType,
    ContextType
  >;
  discountedAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionActionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionAction"] = ResolversParentTypes["CartCompletionAction"],
> = {
  __resolveType: TypeResolveFn<
    "CompletePaymentChallenge",
    ParentType,
    ContextType
  >;
};

export type CartCompletionActionRequiredResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionActionRequired"] = ResolversParentTypes["CartCompletionActionRequired"],
> = {
  action: Resolver<
    Types.Maybe<ResolversTypes["CartCompletionAction"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionAttemptResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionAttemptResult"] = ResolversParentTypes["CartCompletionAttemptResult"],
> = {
  __resolveType: TypeResolveFn<
    | "CartCompletionActionRequired"
    | "CartCompletionFailed"
    | "CartCompletionProcessing"
    | "CartCompletionSuccess",
    ParentType,
    ContextType
  >;
};

export type CartCompletionFailedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionFailed"] = ResolversParentTypes["CartCompletionFailed"],
> = {
  errors: Resolver<
    Array<ResolversTypes["CompletionError"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionProcessingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionProcessing"] = ResolversParentTypes["CartCompletionProcessing"],
> = {
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pollDelay: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionSuccessResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCompletionSuccess"] = ResolversParentTypes["CartCompletionSuccess"],
> = {
  completedAt: Resolver<
    Types.Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  orderId: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  orderUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCost"] = ResolversParentTypes["CartCost"],
> = {
  checkoutChargeAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  subtotalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  subtotalAmountEstimated: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  totalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalAmountEstimated: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  totalDutyAmount: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  totalDutyAmountEstimated: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  totalTaxAmount: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  totalTaxAmountEstimated: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCreatePayload"] = ResolversParentTypes["CartCreatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCustomDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartCustomDiscountAllocation"] = ResolversParentTypes["CartCustomDiscountAllocation"],
> = {
  discountApplication: Resolver<
    ResolversTypes["CartDiscountApplication"],
    ParentType,
    ContextType
  >;
  discountedAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDelivery"] = ResolversParentTypes["CartDelivery"],
> = {
  addresses: Resolver<
    Array<ResolversTypes["CartSelectableAddress"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CartDeliveryAddressesArgs, "selected">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryAddress"] = ResolversParentTypes["CartDeliveryAddress"],
> = {
  address1: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  address2: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  company: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  countryCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  firstName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  formatted: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.CartDeliveryAddressFormattedArgs,
      "withCompany" | "withName"
    >
  >;
  formattedArea: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  latitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  longitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  name: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provinceCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  zip: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryAddressesAddPayload"] = ResolversParentTypes["CartDeliveryAddressesAddPayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryAddressesRemovePayload"] = ResolversParentTypes["CartDeliveryAddressesRemovePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryAddressesUpdatePayload"] = ResolversParentTypes["CartDeliveryAddressesUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryCoordinatesPreferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryCoordinatesPreference"] = ResolversParentTypes["CartDeliveryCoordinatesPreference"],
> = {
  countryCode: Resolver<ResolversTypes["CountryCode"], ParentType, ContextType>;
  latitude: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  longitude: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryGroup"] = ResolversParentTypes["CartDeliveryGroup"],
> = {
  cartLines: Resolver<
    ResolversTypes["BaseCartLineConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CartDeliveryGroupCartLinesArgs, "reverse">
  >;
  deliveryAddress: Resolver<
    ResolversTypes["MailingAddress"],
    ParentType,
    ContextType
  >;
  deliveryOptions: Resolver<
    Array<ResolversTypes["CartDeliveryOption"]>,
    ParentType,
    ContextType
  >;
  groupType: Resolver<
    ResolversTypes["CartDeliveryGroupType"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  selectedDeliveryOption: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryOption"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryGroupConnection"] = ResolversParentTypes["CartDeliveryGroupConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["CartDeliveryGroupEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["CartDeliveryGroup"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryGroupEdge"] = ResolversParentTypes["CartDeliveryGroupEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["CartDeliveryGroup"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryOption"] = ResolversParentTypes["CartDeliveryOption"],
> = {
  code: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  deliveryMethodType: Resolver<
    ResolversTypes["DeliveryMethodType"],
    ParentType,
    ContextType
  >;
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  estimatedCost: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryPreferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDeliveryPreference"] = ResolversParentTypes["CartDeliveryPreference"],
> = {
  coordinates: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryCoordinatesPreference"]>,
    ParentType,
    ContextType
  >;
  deliveryMethod: Resolver<
    Array<ResolversTypes["PreferenceDeliveryMethodType"]>,
    ParentType,
    ContextType
  >;
  pickupHandle: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDiscountAllocation"] = ResolversParentTypes["CartDiscountAllocation"],
> = {
  __resolveType: TypeResolveFn<
    | "CartAutomaticDiscountAllocation"
    | "CartCodeDiscountAllocation"
    | "CartCustomDiscountAllocation",
    ParentType,
    ContextType
  >;
  discountApplication: Resolver<
    ResolversTypes["CartDiscountApplication"],
    ParentType,
    ContextType
  >;
  discountedAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
};

export type CartDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDiscountApplication"] = ResolversParentTypes["CartDiscountApplication"],
> = {
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountCodeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDiscountCode"] = ResolversParentTypes["CartDiscountCode"],
> = {
  applicable: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountCodesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartDiscountCodesUpdatePayload"] = ResolversParentTypes["CartDiscountCodesUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartEstimatedCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartEstimatedCost"] = ResolversParentTypes["CartEstimatedCost"],
> = {
  checkoutChargeAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  subtotalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalDutyAmount: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  totalTaxAmount: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartGiftCardCodesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartGiftCardCodesRemovePayload"] = ResolversParentTypes["CartGiftCardCodesRemovePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartGiftCardCodesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartGiftCardCodesUpdatePayload"] = ResolversParentTypes["CartGiftCardCodesUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLine"] = ResolversParentTypes["CartLine"],
> = {
  attribute: Resolver<
    Types.Maybe<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CartLineAttributeArgs, "key">
  >;
  attributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  cost: Resolver<ResolversTypes["CartLineCost"], ParentType, ContextType>;
  discountAllocations: Resolver<
    Array<ResolversTypes["CartDiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  estimatedCost: Resolver<
    ResolversTypes["CartLineEstimatedCost"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  merchandise: Resolver<ResolversTypes["Merchandise"], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sellingPlanAllocation: Resolver<
    Types.Maybe<ResolversTypes["SellingPlanAllocation"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLineCost"] = ResolversParentTypes["CartLineCost"],
> = {
  amountPerQuantity: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  compareAtAmountPerQuantity: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  subtotalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineEstimatedCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLineEstimatedCost"] = ResolversParentTypes["CartLineEstimatedCost"],
> = {
  amount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  compareAtAmount: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  subtotalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLinesAddPayload"] = ResolversParentTypes["CartLinesAddPayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLinesRemovePayload"] = ResolversParentTypes["CartLinesRemovePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartLinesUpdatePayload"] = ResolversParentTypes["CartLinesUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartMetafieldDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartMetafieldDeletePayload"] = ResolversParentTypes["CartMetafieldDeletePayload"],
> = {
  deletedId: Resolver<
    Types.Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["MetafieldDeleteUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartMetafieldsSetPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartMetafieldsSetPayload"] = ResolversParentTypes["CartMetafieldsSetPayload"],
> = {
  metafields: Resolver<
    Types.Maybe<Array<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["MetafieldsSetUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartNoteUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartNoteUpdatePayload"] = ResolversParentTypes["CartNoteUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartOperationErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartOperationError"] = ResolversParentTypes["CartOperationError"],
> = {
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPaymentUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartPaymentUpdatePayload"] = ResolversParentTypes["CartPaymentUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPreferencesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartPreferences"] = ResolversParentTypes["CartPreferences"],
> = {
  delivery: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryPreference"]>,
    ParentType,
    ContextType
  >;
  wallet: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPrepareForCompletionPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartPrepareForCompletionPayload"] = ResolversParentTypes["CartPrepareForCompletionPayload"],
> = {
  result: Resolver<
    Types.Maybe<ResolversTypes["CartPrepareForCompletionResult"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPrepareForCompletionResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartPrepareForCompletionResult"] = ResolversParentTypes["CartPrepareForCompletionResult"],
> = {
  __resolveType: TypeResolveFn<
    "CartStatusNotReady" | "CartStatusReady" | "CartThrottled",
    ParentType,
    ContextType
  >;
};

export type CartRemovePersonalDataPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartRemovePersonalDataPayload"] = ResolversParentTypes["CartRemovePersonalDataPayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSelectableAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartSelectableAddress"] = ResolversParentTypes["CartSelectableAddress"],
> = {
  address: Resolver<ResolversTypes["CartAddress"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  oneTimeUse: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  selected: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSelectedDeliveryOptionsUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartSelectedDeliveryOptionsUpdatePayload"] = ResolversParentTypes["CartSelectedDeliveryOptionsUpdatePayload"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  warnings: Resolver<
    Array<ResolversTypes["CartWarning"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartStatusNotReadyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartStatusNotReady"] = ResolversParentTypes["CartStatusNotReady"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  errors: Resolver<
    Array<ResolversTypes["CartOperationError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartStatusReadyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartStatusReady"] = ResolversParentTypes["CartStatusReady"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSubmitForCompletionPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartSubmitForCompletionPayload"] = ResolversParentTypes["CartSubmitForCompletionPayload"],
> = {
  result: Resolver<
    Types.Maybe<ResolversTypes["CartSubmitForCompletionResult"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["CartUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSubmitForCompletionResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartSubmitForCompletionResult"] = ResolversParentTypes["CartSubmitForCompletionResult"],
> = {
  __resolveType: TypeResolveFn<
    | "SubmitAlreadyAccepted"
    | "SubmitFailed"
    | "SubmitSuccess"
    | "SubmitThrottled",
    ParentType,
    ContextType
  >;
};

export type CartThrottledResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartThrottled"] = ResolversParentTypes["CartThrottled"],
> = {
  cart: Resolver<Types.Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  pollAfter: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartUserError"] = ResolversParentTypes["CartUserError"],
> = {
  code: Resolver<
    Types.Maybe<ResolversTypes["CartErrorCode"]>,
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartWarningResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CartWarning"] = ResolversParentTypes["CartWarning"],
> = {
  code: Resolver<ResolversTypes["CartWarningCode"], ParentType, ContextType>;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  target: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Collection"] = ResolversParentTypes["Collection"],
> = {
  description: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    Types.CollectionDescriptionArgs
  >;
  descriptionHtml: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CollectionMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.CollectionMetafieldsArgs, "identifiers">
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  products: Resolver<
    ResolversTypes["ProductConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CollectionProductsArgs, "reverse" | "sortKey">
  >;
  seo: Resolver<ResolversTypes["SEO"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CollectionConnection"] = ResolversParentTypes["CollectionConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["CollectionEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<Array<ResolversTypes["Collection"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount: Resolver<
    ResolversTypes["UnsignedInt64"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CollectionEdge"] = ResolversParentTypes["CollectionEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Collection"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ColorScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Color"], any> {
  name: "Color";
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  author: Resolver<ResolversTypes["CommentAuthor"], ParentType, ContextType>;
  content: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    Types.CommentContentArgs
  >;
  contentHtml: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentAuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CommentAuthor"] = ResolversParentTypes["CommentAuthor"],
> = {
  email: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CommentConnection"] = ResolversParentTypes["CommentConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["CommentEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<Array<ResolversTypes["Comment"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CommentEdge"] = ResolversParentTypes["CommentEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Comment"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Company"] = ResolversParentTypes["Company"],
> = {
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  externalId: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CompanyMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.CompanyMetafieldsArgs, "identifiers">
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CompanyContact"] = ResolversParentTypes["CompanyContact"],
> = {
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  locale: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  title: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CompanyLocation"] = ResolversParentTypes["CompanyLocation"],
> = {
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  externalId: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  locale: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CompanyLocationMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.CompanyLocationMetafieldsArgs, "identifiers">
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompletePaymentChallengeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CompletePaymentChallenge"] = ResolversParentTypes["CompletePaymentChallenge"],
> = {
  redirectUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompletionErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CompletionError"] = ResolversParentTypes["CompletionError"],
> = {
  code: Resolver<
    ResolversTypes["CompletionErrorCode"],
    ParentType,
    ContextType
  >;
  message: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ComponentizableCartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ComponentizableCartLine"] = ResolversParentTypes["ComponentizableCartLine"],
> = {
  attribute: Resolver<
    Types.Maybe<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType,
    RequireFields<Types.ComponentizableCartLineAttributeArgs, "key">
  >;
  attributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  cost: Resolver<ResolversTypes["CartLineCost"], ParentType, ContextType>;
  discountAllocations: Resolver<
    Array<ResolversTypes["CartDiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  estimatedCost: Resolver<
    ResolversTypes["CartLineEstimatedCost"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lineComponents: Resolver<
    Array<ResolversTypes["CartLine"]>,
    ParentType,
    ContextType
  >;
  merchandise: Resolver<ResolversTypes["Merchandise"], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sellingPlanAllocation: Resolver<
    Types.Maybe<ResolversTypes["SellingPlanAllocation"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Count"] = ResolversParentTypes["Count"],
> = {
  count: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  precision: Resolver<
    ResolversTypes["CountPrecision"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Country"] = ResolversParentTypes["Country"],
> = {
  availableLanguages: Resolver<
    Array<ResolversTypes["Language"]>,
    ParentType,
    ContextType
  >;
  currency: Resolver<ResolversTypes["Currency"], ParentType, ContextType>;
  defaultLanguage: Resolver<
    ResolversTypes["Language"],
    ParentType,
    ContextType
  >;
  isoCode: Resolver<ResolversTypes["CountryCode"], ParentType, ContextType>;
  market: Resolver<
    Types.Maybe<ResolversTypes["Market"]>,
    ParentType,
    ContextType
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  unitSystem: Resolver<ResolversTypes["UnitSystem"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Currency"] = ResolversParentTypes["Currency"],
> = {
  isoCode: Resolver<ResolversTypes["CurrencyCode"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  symbol: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Customer"] = ResolversParentTypes["Customer"],
> = {
  acceptsMarketing: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  addresses: Resolver<
    ResolversTypes["MailingAddressConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CustomerAddressesArgs, "reverse">
  >;
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  defaultAddress: Resolver<
    Types.Maybe<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  displayName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  firstName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.CustomerMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.CustomerMetafieldsArgs, "identifiers">
  >;
  numberOfOrders: Resolver<
    ResolversTypes["UnsignedInt64"],
    ParentType,
    ContextType
  >;
  orders: Resolver<
    ResolversTypes["OrderConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.CustomerOrdersArgs, "reverse" | "sortKey">
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAccessToken"] = ResolversParentTypes["CustomerAccessToken"],
> = {
  accessToken: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expiresAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAccessTokenCreatePayload"] = ResolversParentTypes["CustomerAccessTokenCreatePayload"],
> = {
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenCreateWithMultipassPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAccessTokenCreateWithMultipassPayload"] = ResolversParentTypes["CustomerAccessTokenCreateWithMultipassPayload"],
> = {
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAccessTokenDeletePayload"] = ResolversParentTypes["CustomerAccessTokenDeletePayload"],
> = {
  deletedAccessToken: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  deletedCustomerAccessTokenId: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenRenewPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAccessTokenRenewPayload"] = ResolversParentTypes["CustomerAccessTokenRenewPayload"],
> = {
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerActivateByUrlPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerActivateByUrlPayload"] = ResolversParentTypes["CustomerActivateByUrlPayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerActivatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerActivatePayload"] = ResolversParentTypes["CustomerActivatePayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAddressCreatePayload"] = ResolversParentTypes["CustomerAddressCreatePayload"],
> = {
  customerAddress: Resolver<
    Types.Maybe<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAddressDeletePayload"] = ResolversParentTypes["CustomerAddressDeletePayload"],
> = {
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  deletedCustomerAddressId: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerAddressUpdatePayload"] = ResolversParentTypes["CustomerAddressUpdatePayload"],
> = {
  customerAddress: Resolver<
    Types.Maybe<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerCreatePayload"] = ResolversParentTypes["CustomerCreatePayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerDefaultAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerDefaultAddressUpdatePayload"] = ResolversParentTypes["CustomerDefaultAddressUpdatePayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerRecoverPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerRecoverPayload"] = ResolversParentTypes["CustomerRecoverPayload"],
> = {
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResetByUrlPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerResetByUrlPayload"] = ResolversParentTypes["CustomerResetByUrlPayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResetPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerResetPayload"] = ResolversParentTypes["CustomerResetPayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerUpdatePayload"] = ResolversParentTypes["CustomerUpdatePayload"],
> = {
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType
  >;
  customerAccessToken: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessToken"]>,
    ParentType,
    ContextType
  >;
  customerUserErrors: Resolver<
    Array<ResolversTypes["CustomerUserError"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CustomerUserError"] = ResolversParentTypes["CustomerUserError"],
> = {
  code: Resolver<
    Types.Maybe<ResolversTypes["CustomerErrorCode"]>,
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface DecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Decimal"], any> {
  name: "Decimal";
}

export type DeliveryAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeliveryAddress"] = ResolversParentTypes["DeliveryAddress"],
> = {
  __resolveType: TypeResolveFn<"MailingAddress", ParentType, ContextType>;
};

export type DiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DiscountAllocation"] = ResolversParentTypes["DiscountAllocation"],
> = {
  allocatedAmount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  discountApplication: Resolver<
    ResolversTypes["DiscountApplication"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DiscountApplication"] = ResolversParentTypes["DiscountApplication"],
> = {
  __resolveType: TypeResolveFn<
    | "AutomaticDiscountApplication"
    | "DiscountCodeApplication"
    | "ManualDiscountApplication"
    | "ScriptDiscountApplication",
    ParentType,
    ContextType
  >;
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
};

export type DiscountApplicationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DiscountApplicationConnection"] = ResolversParentTypes["DiscountApplicationConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["DiscountApplicationEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["DiscountApplication"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountApplicationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DiscountApplicationEdge"] = ResolversParentTypes["DiscountApplicationEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<
    ResolversTypes["DiscountApplication"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountCodeApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DiscountCodeApplication"] = ResolversParentTypes["DiscountCodeApplication"],
> = {
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  applicable: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayableErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DisplayableError"] = ResolversParentTypes["DisplayableError"],
> = {
  __resolveType: TypeResolveFn<
    | "CartUserError"
    | "CustomerUserError"
    | "MetafieldDeleteUserError"
    | "MetafieldsSetUserError"
    | "UserError"
    | "UserErrorsShopPayPaymentRequestSessionUserErrors",
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type DomainResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Domain"] = ResolversParentTypes["Domain"],
> = {
  host: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sslEnabled: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalVideoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ExternalVideo"] = ResolversParentTypes["ExternalVideo"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  embedUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  embeddedUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  host: Resolver<ResolversTypes["MediaHost"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mediaContentType: Resolver<
    ResolversTypes["MediaContentType"],
    ParentType,
    ContextType
  >;
  originUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["MediaPresentation"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Filter"] = ResolversParentTypes["Filter"],
> = {
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["FilterPresentation"]>,
    ParentType,
    ContextType
  >;
  type: Resolver<ResolversTypes["FilterType"], ParentType, ContextType>;
  values: Resolver<
    Array<ResolversTypes["FilterValue"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FilterValue"] = ResolversParentTypes["FilterValue"],
> = {
  count: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["MediaImage"]>,
    ParentType,
    ContextType
  >;
  input: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  swatch: Resolver<
    Types.Maybe<ResolversTypes["Swatch"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Fulfillment"] = ResolversParentTypes["Fulfillment"],
> = {
  fulfillmentLineItems: Resolver<
    ResolversTypes["FulfillmentLineItemConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.FulfillmentFulfillmentLineItemsArgs, "reverse">
  >;
  trackingCompany: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  trackingInfo: Resolver<
    Array<ResolversTypes["FulfillmentTrackingInfo"]>,
    ParentType,
    ContextType,
    Types.FulfillmentTrackingInfoArgs
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FulfillmentLineItem"] = ResolversParentTypes["FulfillmentLineItem"],
> = {
  lineItem: Resolver<ResolversTypes["OrderLineItem"], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FulfillmentLineItemConnection"] = ResolversParentTypes["FulfillmentLineItemConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["FulfillmentLineItemEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["FulfillmentLineItem"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FulfillmentLineItemEdge"] = ResolversParentTypes["FulfillmentLineItemEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<
    ResolversTypes["FulfillmentLineItem"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentTrackingInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FulfillmentTrackingInfo"] = ResolversParentTypes["FulfillmentTrackingInfo"],
> = {
  number: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  url: Resolver<Types.Maybe<ResolversTypes["URL"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericFileResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GenericFile"] = ResolversParentTypes["GenericFile"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mimeType: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  originalFileSize: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  url: Resolver<Types.Maybe<ResolversTypes["URL"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface HtmlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HTML"], any> {
  name: "HTML";
}

export type HasMetafieldsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["HasMetafields"] = ResolversParentTypes["HasMetafields"],
> = {
  __resolveType: TypeResolveFn<
    | "Article"
    | "Blog"
    | "Cart"
    | "Collection"
    | "Company"
    | "CompanyLocation"
    | "Customer"
    | "Location"
    | "Market"
    | "Order"
    | "Page"
    | "Product"
    | "ProductVariant"
    | "SellingPlan"
    | "Shop",
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.HasMetafieldsMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.HasMetafieldsMetafieldsArgs, "identifiers">
  >;
};

export interface Iso8601DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISO8601DateTime"], any> {
  name: "ISO8601DateTime";
}

export type ImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
> = {
  altText: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  height: Resolver<Types.Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id: Resolver<Types.Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  originalSrc: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  src: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  thumbhash: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  transformedSrc: Resolver<
    ResolversTypes["URL"],
    ParentType,
    ContextType,
    RequireFields<Types.ImageTransformedSrcArgs, "scale">
  >;
  url: Resolver<
    ResolversTypes["URL"],
    ParentType,
    ContextType,
    Types.ImageUrlArgs
  >;
  width: Resolver<Types.Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ImageConnection"] = ResolversParentTypes["ImageConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["ImageEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ImageEdge"] = ResolversParentTypes["ImageEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InContextAnnotationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["InContextAnnotation"] = ResolversParentTypes["InContextAnnotation"],
> = {
  description: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type: Resolver<
    ResolversTypes["InContextAnnotationType"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InContextAnnotationTypeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["InContextAnnotationType"] = ResolversParentTypes["InContextAnnotationType"],
> = {
  kind: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type LanguageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Language"] = ResolversParentTypes["Language"],
> = {
  endonymName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isoCode: Resolver<ResolversTypes["LanguageCode"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Localization"] = ResolversParentTypes["Localization"],
> = {
  availableCountries: Resolver<
    Array<ResolversTypes["Country"]>,
    ParentType,
    ContextType
  >;
  availableLanguages: Resolver<
    Array<ResolversTypes["Language"]>,
    ParentType,
    ContextType
  >;
  country: Resolver<ResolversTypes["Country"], ParentType, ContextType>;
  language: Resolver<ResolversTypes["Language"], ParentType, ContextType>;
  market: Resolver<ResolversTypes["Market"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Location"] = ResolversParentTypes["Location"],
> = {
  address: Resolver<ResolversTypes["LocationAddress"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.LocationMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.LocationMetafieldsArgs, "identifiers">
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["LocationAddress"] = ResolversParentTypes["LocationAddress"],
> = {
  address1: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  address2: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  country: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  countryCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  formatted: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  latitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  longitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  province: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provinceCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  zip: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["LocationConnection"] = ResolversParentTypes["LocationConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["LocationEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<Array<ResolversTypes["Location"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["LocationEdge"] = ResolversParentTypes["LocationEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MailingAddress"] = ResolversParentTypes["MailingAddress"],
> = {
  address1: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  address2: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  company: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  country: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  countryCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  countryCodeV2: Resolver<
    Types.Maybe<ResolversTypes["CountryCode"]>,
    ParentType,
    ContextType
  >;
  firstName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  formatted: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MailingAddressFormattedArgs, "withCompany" | "withName">
  >;
  formattedArea: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  latitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  longitude: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  name: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  province: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provinceCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  zip: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MailingAddressConnection"] = ResolversParentTypes["MailingAddressConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["MailingAddressEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MailingAddressEdge"] = ResolversParentTypes["MailingAddressEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["MailingAddress"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManualDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ManualDiscountApplication"] = ResolversParentTypes["ManualDiscountApplication"],
> = {
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Market"] = ResolversParentTypes["Market"],
> = {
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MarketMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.MarketMetafieldsArgs, "identifiers">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Media"] = ResolversParentTypes["Media"],
> = {
  __resolveType: TypeResolveFn<
    "ExternalVideo" | "MediaImage" | "Model3d" | "Video",
    ParentType,
    ContextType
  >;
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mediaContentType: Resolver<
    ResolversTypes["MediaContentType"],
    ParentType,
    ContextType
  >;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["MediaPresentation"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
};

export type MediaConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MediaConnection"] = ResolversParentTypes["MediaConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["MediaEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Media"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MediaEdge"] = ResolversParentTypes["MediaEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Media"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MediaImage"] = ResolversParentTypes["MediaImage"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  mediaContentType: Resolver<
    ResolversTypes["MediaContentType"],
    ParentType,
    ContextType
  >;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["MediaPresentation"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaPresentationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MediaPresentation"] = ResolversParentTypes["MediaPresentation"],
> = {
  asJson: Resolver<
    Types.Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MediaPresentationAsJsonArgs, "format">
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Menu"] = ResolversParentTypes["Menu"],
> = {
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  items: Resolver<Array<ResolversTypes["MenuItem"]>, ParentType, ContextType>;
  itemsCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MenuItem"] = ResolversParentTypes["MenuItem"],
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  items: Resolver<Array<ResolversTypes["MenuItem"]>, ParentType, ContextType>;
  resource: Resolver<
    Types.Maybe<ResolversTypes["MenuItemResource"]>,
    ParentType,
    ContextType
  >;
  resourceId: Resolver<
    Types.Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType
  >;
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type: Resolver<ResolversTypes["MenuItemType"], ParentType, ContextType>;
  url: Resolver<Types.Maybe<ResolversTypes["URL"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MenuItemResource"] = ResolversParentTypes["MenuItemResource"],
> = {
  __resolveType: TypeResolveFn<
    | "Article"
    | "Blog"
    | "Collection"
    | "Metaobject"
    | "Page"
    | "Product"
    | "ShopPolicy",
    ParentType,
    ContextType
  >;
};

export type MerchandiseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Merchandise"] = ResolversParentTypes["Merchandise"],
> = {
  __resolveType: TypeResolveFn<"ProductVariant", ParentType, ContextType>;
};

export type MetafieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Metafield"] = ResolversParentTypes["Metafield"],
> = {
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  key: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  namespace: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  parentResource: Resolver<
    ResolversTypes["MetafieldParentResource"],
    ParentType,
    ContextType
  >;
  reference: Resolver<
    Types.Maybe<ResolversTypes["MetafieldReference"]>,
    ParentType,
    ContextType
  >;
  references: Resolver<
    Types.Maybe<ResolversTypes["MetafieldReferenceConnection"]>,
    ParentType,
    ContextType,
    Types.MetafieldReferencesArgs
  >;
  type: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldDeleteUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldDeleteUserError"] = ResolversParentTypes["MetafieldDeleteUserError"],
> = {
  code: Resolver<
    Types.Maybe<ResolversTypes["MetafieldDeleteErrorCode"]>,
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldParentResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldParentResource"] = ResolversParentTypes["MetafieldParentResource"],
> = {
  __resolveType: TypeResolveFn<
    | "Article"
    | "Blog"
    | "Cart"
    | "Collection"
    | "Company"
    | "CompanyLocation"
    | "Customer"
    | "Location"
    | "Market"
    | "Order"
    | "Page"
    | "Product"
    | "ProductVariant"
    | "SellingPlan"
    | "Shop",
    ParentType,
    ContextType
  >;
};

export type MetafieldReferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldReference"] = ResolversParentTypes["MetafieldReference"],
> = {
  __resolveType: TypeResolveFn<
    | "Collection"
    | "GenericFile"
    | "MediaImage"
    | "Metaobject"
    | "Model3d"
    | "Page"
    | "Product"
    | "ProductVariant"
    | "Video",
    ParentType,
    ContextType
  >;
};

export type MetafieldReferenceConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldReferenceConnection"] = ResolversParentTypes["MetafieldReferenceConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["MetafieldReferenceEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["MetafieldReference"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldReferenceEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldReferenceEdge"] = ResolversParentTypes["MetafieldReferenceEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["MetafieldReference"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldsSetUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetafieldsSetUserError"] = ResolversParentTypes["MetafieldsSetUserError"],
> = {
  code: Resolver<
    Types.Maybe<ResolversTypes["MetafieldsSetUserErrorCode"]>,
    ParentType,
    ContextType
  >;
  elementIndex: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Metaobject"] = ResolversParentTypes["Metaobject"],
> = {
  field: Resolver<
    Types.Maybe<ResolversTypes["MetaobjectField"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MetaobjectFieldArgs, "key">
  >;
  fields: Resolver<
    Array<ResolversTypes["MetaobjectField"]>,
    ParentType,
    ContextType
  >;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  seo: Resolver<
    Types.Maybe<ResolversTypes["MetaobjectSEO"]>,
    ParentType,
    ContextType
  >;
  type: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetaobjectConnection"] = ResolversParentTypes["MetaobjectConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["MetaobjectEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<Array<ResolversTypes["Metaobject"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetaobjectEdge"] = ResolversParentTypes["MetaobjectEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Metaobject"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectFieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetaobjectField"] = ResolversParentTypes["MetaobjectField"],
> = {
  key: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reference: Resolver<
    Types.Maybe<ResolversTypes["MetafieldReference"]>,
    ParentType,
    ContextType
  >;
  references: Resolver<
    Types.Maybe<ResolversTypes["MetafieldReferenceConnection"]>,
    ParentType,
    ContextType,
    Types.MetaobjectFieldReferencesArgs
  >;
  type: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectSeoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MetaobjectSEO"] = ResolversParentTypes["MetaobjectSEO"],
> = {
  description: Resolver<
    Types.Maybe<ResolversTypes["MetaobjectField"]>,
    ParentType,
    ContextType
  >;
  title: Resolver<
    Types.Maybe<ResolversTypes["MetaobjectField"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Model3dResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Model3d"] = ResolversParentTypes["Model3d"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mediaContentType: Resolver<
    ResolversTypes["MediaContentType"],
    ParentType,
    ContextType
  >;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["MediaPresentation"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  sources: Resolver<
    Array<ResolversTypes["Model3dSource"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Model3dSourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Model3dSource"] = ResolversParentTypes["Model3dSource"],
> = {
  filesize: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  format: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  mimeType: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoneyV2Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MoneyV2"] = ResolversParentTypes["MoneyV2"],
> = {
  amount: Resolver<ResolversTypes["Decimal"], ParentType, ContextType>;
  currencyCode: Resolver<
    ResolversTypes["CurrencyCode"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  cartAttributesUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartAttributesUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartAttributesUpdateArgs,
      "attributes" | "cartId"
    >
  >;
  cartBillingAddressUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartBillingAddressUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartBillingAddressUpdateArgs, "cartId">
  >;
  cartBuyerIdentityUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartBuyerIdentityUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartBuyerIdentityUpdateArgs,
      "buyerIdentity" | "cartId"
    >
  >;
  cartCreate: Resolver<
    Types.Maybe<ResolversTypes["CartCreatePayload"]>,
    ParentType,
    ContextType,
    Types.MutationCartCreateArgs
  >;
  cartDeliveryAddressesAdd: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryAddressesAddPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartDeliveryAddressesAddArgs,
      "addresses" | "cartId"
    >
  >;
  cartDeliveryAddressesRemove: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryAddressesRemovePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartDeliveryAddressesRemoveArgs,
      "addressIds" | "cartId"
    >
  >;
  cartDeliveryAddressesUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartDeliveryAddressesUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartDeliveryAddressesUpdateArgs,
      "addresses" | "cartId"
    >
  >;
  cartDiscountCodesUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartDiscountCodesUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartDiscountCodesUpdateArgs, "cartId">
  >;
  cartGiftCardCodesRemove: Resolver<
    Types.Maybe<ResolversTypes["CartGiftCardCodesRemovePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartGiftCardCodesRemoveArgs,
      "appliedGiftCardIds" | "cartId"
    >
  >;
  cartGiftCardCodesUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartGiftCardCodesUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartGiftCardCodesUpdateArgs,
      "cartId" | "giftCardCodes"
    >
  >;
  cartLinesAdd: Resolver<
    Types.Maybe<ResolversTypes["CartLinesAddPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartLinesAddArgs, "cartId" | "lines">
  >;
  cartLinesRemove: Resolver<
    Types.Maybe<ResolversTypes["CartLinesRemovePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartLinesRemoveArgs, "cartId" | "lineIds">
  >;
  cartLinesUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartLinesUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartLinesUpdateArgs, "cartId" | "lines">
  >;
  cartMetafieldDelete: Resolver<
    Types.Maybe<ResolversTypes["CartMetafieldDeletePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartMetafieldDeleteArgs, "input">
  >;
  cartMetafieldsSet: Resolver<
    Types.Maybe<ResolversTypes["CartMetafieldsSetPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartMetafieldsSetArgs, "metafields">
  >;
  cartNoteUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartNoteUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartNoteUpdateArgs, "cartId" | "note">
  >;
  cartPaymentUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartPaymentUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartPaymentUpdateArgs, "cartId" | "payment">
  >;
  cartPrepareForCompletion: Resolver<
    Types.Maybe<ResolversTypes["CartPrepareForCompletionPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartPrepareForCompletionArgs, "cartId">
  >;
  cartRemovePersonalData: Resolver<
    Types.Maybe<ResolversTypes["CartRemovePersonalDataPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCartRemovePersonalDataArgs, "cartId">
  >;
  cartSelectedDeliveryOptionsUpdate: Resolver<
    Types.Maybe<ResolversTypes["CartSelectedDeliveryOptionsUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartSelectedDeliveryOptionsUpdateArgs,
      "cartId" | "selectedDeliveryOptions"
    >
  >;
  cartSubmitForCompletion: Resolver<
    Types.Maybe<ResolversTypes["CartSubmitForCompletionPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCartSubmitForCompletionArgs,
      "attemptToken" | "cartId"
    >
  >;
  customerAccessTokenCreate: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessTokenCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerAccessTokenCreateArgs, "input">
  >;
  customerAccessTokenCreateWithMultipass: Resolver<
    Types.Maybe<
      ResolversTypes["CustomerAccessTokenCreateWithMultipassPayload"]
    >,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAccessTokenCreateWithMultipassArgs,
      "multipassToken"
    >
  >;
  customerAccessTokenDelete: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessTokenDeletePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAccessTokenDeleteArgs,
      "customerAccessToken"
    >
  >;
  customerAccessTokenRenew: Resolver<
    Types.Maybe<ResolversTypes["CustomerAccessTokenRenewPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAccessTokenRenewArgs,
      "customerAccessToken"
    >
  >;
  customerActivate: Resolver<
    Types.Maybe<ResolversTypes["CustomerActivatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerActivateArgs, "id" | "input">
  >;
  customerActivateByUrl: Resolver<
    Types.Maybe<ResolversTypes["CustomerActivateByUrlPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerActivateByUrlArgs,
      "activationUrl" | "password"
    >
  >;
  customerAddressCreate: Resolver<
    Types.Maybe<ResolversTypes["CustomerAddressCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAddressCreateArgs,
      "address" | "customerAccessToken"
    >
  >;
  customerAddressDelete: Resolver<
    Types.Maybe<ResolversTypes["CustomerAddressDeletePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAddressDeleteArgs,
      "customerAccessToken" | "id"
    >
  >;
  customerAddressUpdate: Resolver<
    Types.Maybe<ResolversTypes["CustomerAddressUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerAddressUpdateArgs,
      "address" | "customerAccessToken" | "id"
    >
  >;
  customerCreate: Resolver<
    Types.Maybe<ResolversTypes["CustomerCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerCreateArgs, "input">
  >;
  customerDefaultAddressUpdate: Resolver<
    Types.Maybe<ResolversTypes["CustomerDefaultAddressUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerDefaultAddressUpdateArgs,
      "addressId" | "customerAccessToken"
    >
  >;
  customerRecover: Resolver<
    Types.Maybe<ResolversTypes["CustomerRecoverPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerRecoverArgs, "email">
  >;
  customerReset: Resolver<
    Types.Maybe<ResolversTypes["CustomerResetPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerResetArgs, "id" | "input">
  >;
  customerResetByUrl: Resolver<
    Types.Maybe<ResolversTypes["CustomerResetByUrlPayload"]>,
    ParentType,
    ContextType,
    RequireFields<Types.MutationCustomerResetByUrlArgs, "password" | "resetUrl">
  >;
  customerUpdate: Resolver<
    Types.Maybe<ResolversTypes["CustomerUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationCustomerUpdateArgs,
      "customer" | "customerAccessToken"
    >
  >;
  shopPayPaymentRequestSessionCreate: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestSessionCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationShopPayPaymentRequestSessionCreateArgs,
      "paymentRequest" | "sourceIdentifier"
    >
  >;
  shopPayPaymentRequestSessionSubmit: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestSessionSubmitPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.MutationShopPayPaymentRequestSessionSubmitArgs,
      "idempotencyKey" | "paymentRequest" | "token"
    >
  >;
};

export type NodeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Node"] = ResolversParentTypes["Node"],
> = {
  __resolveType: TypeResolveFn<
    | "AppliedGiftCard"
    | "Article"
    | "Blog"
    | "Cart"
    | "CartLine"
    | "Collection"
    | "Comment"
    | "Company"
    | "CompanyContact"
    | "CompanyLocation"
    | "ComponentizableCartLine"
    | "ExternalVideo"
    | "GenericFile"
    | "Location"
    | "MailingAddress"
    | "Market"
    | "MediaImage"
    | "MediaPresentation"
    | "Menu"
    | "MenuItem"
    | "Metafield"
    | "Metaobject"
    | "Model3d"
    | "Order"
    | "Page"
    | "Product"
    | "ProductOption"
    | "ProductOptionValue"
    | "ProductVariant"
    | "Shop"
    | "ShopPayInstallmentsFinancingPlan"
    | "ShopPayInstallmentsFinancingPlanTerm"
    | "ShopPayInstallmentsProductVariantPricing"
    | "ShopPolicy"
    | "TaxonomyCategory"
    | "UrlRedirect"
    | "Video",
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type OnlineStorePublishableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OnlineStorePublishable"] = ResolversParentTypes["OnlineStorePublishable"],
> = {
  __resolveType: TypeResolveFn<
    "Article" | "Blog" | "Collection" | "Metaobject" | "Page" | "Product",
    ParentType,
    ContextType
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
};

export type OrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Order"] = ResolversParentTypes["Order"],
> = {
  billingAddress: Resolver<
    Types.Maybe<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  cancelReason: Resolver<
    Types.Maybe<ResolversTypes["OrderCancelReason"]>,
    ParentType,
    ContextType
  >;
  canceledAt: Resolver<
    Types.Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  currencyCode: Resolver<
    ResolversTypes["CurrencyCode"],
    ParentType,
    ContextType
  >;
  currentSubtotalPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  currentTotalDuties: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  currentTotalPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  currentTotalShippingPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  currentTotalTax: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  customAttributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  customerLocale: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  customerUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  discountApplications: Resolver<
    ResolversTypes["DiscountApplicationConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.OrderDiscountApplicationsArgs, "reverse">
  >;
  edited: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  email: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  financialStatus: Resolver<
    Types.Maybe<ResolversTypes["OrderFinancialStatus"]>,
    ParentType,
    ContextType
  >;
  fulfillmentStatus: Resolver<
    ResolversTypes["OrderFulfillmentStatus"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lineItems: Resolver<
    ResolversTypes["OrderLineItemConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.OrderLineItemsArgs, "reverse">
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.OrderMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.OrderMetafieldsArgs, "identifiers">
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  orderNumber: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  originalTotalDuties: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  originalTotalPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  processedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  shippingAddress: Resolver<
    Types.Maybe<ResolversTypes["MailingAddress"]>,
    ParentType,
    ContextType
  >;
  shippingDiscountAllocations: Resolver<
    Array<ResolversTypes["DiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  statusUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  subtotalPrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  subtotalPriceV2: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  successfulFulfillments: Resolver<
    Types.Maybe<Array<ResolversTypes["Fulfillment"]>>,
    ParentType,
    ContextType,
    Types.OrderSuccessfulFulfillmentsArgs
  >;
  totalPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalPriceV2: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalRefunded: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalRefundedV2: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalShippingPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  totalShippingPriceV2: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  totalTax: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  totalTaxV2: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OrderConnection"] = ResolversParentTypes["OrderConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["OrderEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Order"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount: Resolver<
    ResolversTypes["UnsignedInt64"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OrderEdge"] = ResolversParentTypes["OrderEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Order"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OrderLineItem"] = ResolversParentTypes["OrderLineItem"],
> = {
  currentQuantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  customAttributes: Resolver<
    Array<ResolversTypes["Attribute"]>,
    ParentType,
    ContextType
  >;
  discountAllocations: Resolver<
    Array<ResolversTypes["DiscountAllocation"]>,
    ParentType,
    ContextType
  >;
  discountedTotalPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  originalTotalPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  variant: Resolver<
    Types.Maybe<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OrderLineItemConnection"] = ResolversParentTypes["OrderLineItemConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["OrderLineItemEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["OrderLineItem"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OrderLineItemEdge"] = ResolversParentTypes["OrderLineItemEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["OrderLineItem"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Page"] = ResolversParentTypes["Page"],
> = {
  body: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  bodySummary: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.PageMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.PageMetafieldsArgs, "identifiers">
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  seo: Resolver<Types.Maybe<ResolversTypes["SEO"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PageConnection"] = ResolversParentTypes["PageConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["PageEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Page"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PageEdge"] = ResolversParentTypes["PageEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Page"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"],
> = {
  endCursor: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  startCursor: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedSitemapResourcesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PaginatedSitemapResources"] = ResolversParentTypes["PaginatedSitemapResources"],
> = {
  hasNextPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  items: Resolver<
    Array<ResolversTypes["SitemapResourceInterface"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSettingsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PaymentSettings"] = ResolversParentTypes["PaymentSettings"],
> = {
  acceptedCardBrands: Resolver<
    Array<ResolversTypes["CardBrand"]>,
    ParentType,
    ContextType
  >;
  cardVaultUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  countryCode: Resolver<ResolversTypes["CountryCode"], ParentType, ContextType>;
  currencyCode: Resolver<
    ResolversTypes["CurrencyCode"],
    ParentType,
    ContextType
  >;
  enabledPresentmentCurrencies: Resolver<
    Array<ResolversTypes["CurrencyCode"]>,
    ParentType,
    ContextType
  >;
  shopifyPaymentsAccountId: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  supportedDigitalWallets: Resolver<
    Array<ResolversTypes["DigitalWallet"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PredictiveSearchResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PredictiveSearchResult"] = ResolversParentTypes["PredictiveSearchResult"],
> = {
  articles: Resolver<Array<ResolversTypes["Article"]>, ParentType, ContextType>;
  collections: Resolver<
    Array<ResolversTypes["Collection"]>,
    ParentType,
    ContextType
  >;
  pages: Resolver<Array<ResolversTypes["Page"]>, ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes["Product"]>, ParentType, ContextType>;
  queries: Resolver<
    Array<ResolversTypes["SearchQuerySuggestion"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingPercentageValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PricingPercentageValue"] = ResolversParentTypes["PricingPercentageValue"],
> = {
  percentage: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PricingValue"] = ResolversParentTypes["PricingValue"],
> = {
  __resolveType: TypeResolveFn<
    "MoneyV2" | "PricingPercentageValue",
    ParentType,
    ContextType
  >;
};

export type ProductResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Product"] = ResolversParentTypes["Product"],
> = {
  adjacentVariants: Resolver<
    Array<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.ProductAdjacentVariantsArgs,
      "caseInsensitiveMatch" | "ignoreUnknownOptions"
    >
  >;
  availableForSale: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  category: Resolver<
    Types.Maybe<ResolversTypes["TaxonomyCategory"]>,
    ParentType,
    ContextType
  >;
  collections: Resolver<
    ResolversTypes["CollectionConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductCollectionsArgs, "reverse">
  >;
  compareAtPriceRange: Resolver<
    ResolversTypes["ProductPriceRange"],
    ParentType,
    ContextType
  >;
  createdAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    Types.ProductDescriptionArgs
  >;
  descriptionHtml: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  encodedVariantAvailability: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  encodedVariantExistence: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  featuredImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  images: Resolver<
    ResolversTypes["ImageConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductImagesArgs, "reverse" | "sortKey">
  >;
  isGiftCard: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  media: Resolver<
    ResolversTypes["MediaConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductMediaArgs, "reverse" | "sortKey">
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.ProductMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.ProductMetafieldsArgs, "identifiers">
  >;
  onlineStoreUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  options: Resolver<
    Array<ResolversTypes["ProductOption"]>,
    ParentType,
    ContextType,
    Types.ProductOptionsArgs
  >;
  priceRange: Resolver<
    ResolversTypes["ProductPriceRange"],
    ParentType,
    ContextType
  >;
  productType: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publishedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  requiresSellingPlan: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  selectedOrFirstAvailableVariant: Resolver<
    Types.Maybe<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.ProductSelectedOrFirstAvailableVariantArgs,
      "caseInsensitiveMatch" | "ignoreUnknownOptions"
    >
  >;
  sellingPlanGroups: Resolver<
    ResolversTypes["SellingPlanGroupConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductSellingPlanGroupsArgs, "reverse">
  >;
  seo: Resolver<ResolversTypes["SEO"], ParentType, ContextType>;
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  totalInventory: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  variantBySelectedOptions: Resolver<
    Types.Maybe<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType,
    RequireFields<
      Types.ProductVariantBySelectedOptionsArgs,
      "caseInsensitiveMatch" | "ignoreUnknownOptions" | "selectedOptions"
    >
  >;
  variants: Resolver<
    ResolversTypes["ProductVariantConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductVariantsArgs, "reverse" | "sortKey">
  >;
  variantsCount: Resolver<
    Types.Maybe<ResolversTypes["Count"]>,
    ParentType,
    ContextType
  >;
  vendor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductConnection"] = ResolversParentTypes["ProductConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["ProductEdge"]>,
    ParentType,
    ContextType
  >;
  filters: Resolver<Array<ResolversTypes["Filter"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["Product"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductEdge"] = ResolversParentTypes["ProductEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductOption"] = ResolversParentTypes["ProductOption"],
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  optionValues: Resolver<
    Array<ResolversTypes["ProductOptionValue"]>,
    ParentType,
    ContextType
  >;
  values: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductOptionValue"] = ResolversParentTypes["ProductOptionValue"],
> = {
  firstSelectableVariant: Resolver<
    Types.Maybe<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  swatch: Resolver<
    Types.Maybe<ResolversTypes["ProductOptionValueSwatch"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionValueSwatchResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductOptionValueSwatch"] = ResolversParentTypes["ProductOptionValueSwatch"],
> = {
  color: Resolver<
    Types.Maybe<ResolversTypes["Color"]>,
    ParentType,
    ContextType
  >;
  image: Resolver<
    Types.Maybe<ResolversTypes["Media"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductPriceRangeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductPriceRange"] = ResolversParentTypes["ProductPriceRange"],
> = {
  maxVariantPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  minVariantPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariant"] = ResolversParentTypes["ProductVariant"],
> = {
  availableForSale: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  barcode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  compareAtPrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  compareAtPriceV2: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  components: Resolver<
    ResolversTypes["ProductVariantComponentConnection"],
    ParentType,
    ContextType,
    Types.ProductVariantComponentsArgs
  >;
  currentlyNotInStock: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  groupedBy: Resolver<
    ResolversTypes["ProductVariantConnection"],
    ParentType,
    ContextType,
    Types.ProductVariantGroupedByArgs
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.ProductVariantMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.ProductVariantMetafieldsArgs, "identifiers">
  >;
  price: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  priceV2: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  product: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  quantityAvailable: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  quantityPriceBreaks: Resolver<
    ResolversTypes["QuantityPriceBreakConnection"],
    ParentType,
    ContextType,
    Types.ProductVariantQuantityPriceBreaksArgs
  >;
  quantityRule: Resolver<
    ResolversTypes["QuantityRule"],
    ParentType,
    ContextType
  >;
  requiresComponents: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  requiresShipping: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  selectedOptions: Resolver<
    Array<ResolversTypes["SelectedOption"]>,
    ParentType,
    ContextType
  >;
  sellingPlanAllocations: Resolver<
    ResolversTypes["SellingPlanAllocationConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductVariantSellingPlanAllocationsArgs, "reverse">
  >;
  shopPayInstallmentsPricing: Resolver<
    Types.Maybe<ResolversTypes["ShopPayInstallmentsProductVariantPricing"]>,
    ParentType,
    ContextType
  >;
  sku: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  storeAvailability: Resolver<
    ResolversTypes["StoreAvailabilityConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.ProductVariantStoreAvailabilityArgs, "reverse">
  >;
  taxable: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  unitPrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  unitPriceMeasurement: Resolver<
    Types.Maybe<ResolversTypes["UnitPriceMeasurement"]>,
    ParentType,
    ContextType
  >;
  weight: Resolver<
    Types.Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  weightUnit: Resolver<ResolversTypes["WeightUnit"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariantComponent"] = ResolversParentTypes["ProductVariantComponent"],
> = {
  productVariant: Resolver<
    ResolversTypes["ProductVariant"],
    ParentType,
    ContextType
  >;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariantComponentConnection"] = ResolversParentTypes["ProductVariantComponentConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["ProductVariantComponentEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["ProductVariantComponent"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariantComponentEdge"] = ResolversParentTypes["ProductVariantComponentEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<
    ResolversTypes["ProductVariantComponent"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariantConnection"] = ResolversParentTypes["ProductVariantConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["ProductVariantEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["ProductVariant"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ProductVariantEdge"] = ResolversParentTypes["ProductVariantEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["ProductVariant"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchasingCompanyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PurchasingCompany"] = ResolversParentTypes["PurchasingCompany"],
> = {
  company: Resolver<ResolversTypes["Company"], ParentType, ContextType>;
  contact: Resolver<
    Types.Maybe<ResolversTypes["CompanyContact"]>,
    ParentType,
    ContextType
  >;
  location: Resolver<
    ResolversTypes["CompanyLocation"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["QuantityPriceBreak"] = ResolversParentTypes["QuantityPriceBreak"],
> = {
  minimumQuantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  price: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["QuantityPriceBreakConnection"] = ResolversParentTypes["QuantityPriceBreakConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["QuantityPriceBreakEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["QuantityPriceBreak"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["QuantityPriceBreakEdge"] = ResolversParentTypes["QuantityPriceBreakEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["QuantityPriceBreak"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["QuantityRule"] = ResolversParentTypes["QuantityRule"],
> = {
  increment: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  maximum: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  minimum: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryRootResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["QueryRoot"] = ResolversParentTypes["QueryRoot"],
> = {
  article: Resolver<
    Types.Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootArticleArgs, "id">
  >;
  articles: Resolver<
    ResolversTypes["ArticleConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootArticlesArgs, "reverse" | "sortKey">
  >;
  blog: Resolver<
    Types.Maybe<ResolversTypes["Blog"]>,
    ParentType,
    ContextType,
    Types.QueryRootBlogArgs
  >;
  blogByHandle: Resolver<
    Types.Maybe<ResolversTypes["Blog"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootBlogByHandleArgs, "handle">
  >;
  blogs: Resolver<
    ResolversTypes["BlogConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootBlogsArgs, "reverse" | "sortKey">
  >;
  cart: Resolver<
    Types.Maybe<ResolversTypes["Cart"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootCartArgs, "id">
  >;
  cartCompletionAttempt: Resolver<
    Types.Maybe<ResolversTypes["CartCompletionAttemptResult"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootCartCompletionAttemptArgs, "attemptId">
  >;
  collection: Resolver<
    Types.Maybe<ResolversTypes["Collection"]>,
    ParentType,
    ContextType,
    Types.QueryRootCollectionArgs
  >;
  collectionByHandle: Resolver<
    Types.Maybe<ResolversTypes["Collection"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootCollectionByHandleArgs, "handle">
  >;
  collections: Resolver<
    ResolversTypes["CollectionConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootCollectionsArgs, "reverse" | "sortKey">
  >;
  customer: Resolver<
    Types.Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootCustomerArgs, "customerAccessToken">
  >;
  localization: Resolver<
    ResolversTypes["Localization"],
    ParentType,
    ContextType
  >;
  locations: Resolver<
    ResolversTypes["LocationConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootLocationsArgs, "reverse" | "sortKey">
  >;
  menu: Resolver<
    Types.Maybe<ResolversTypes["Menu"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootMenuArgs, "handle">
  >;
  metaobject: Resolver<
    Types.Maybe<ResolversTypes["Metaobject"]>,
    ParentType,
    ContextType,
    Types.QueryRootMetaobjectArgs
  >;
  metaobjects: Resolver<
    ResolversTypes["MetaobjectConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootMetaobjectsArgs, "reverse" | "type">
  >;
  node: Resolver<
    Types.Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootNodeArgs, "id">
  >;
  nodes: Resolver<
    Array<Types.Maybe<ResolversTypes["Node"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootNodesArgs, "ids">
  >;
  page: Resolver<
    Types.Maybe<ResolversTypes["Page"]>,
    ParentType,
    ContextType,
    Types.QueryRootPageArgs
  >;
  pageByHandle: Resolver<
    Types.Maybe<ResolversTypes["Page"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootPageByHandleArgs, "handle">
  >;
  pages: Resolver<
    ResolversTypes["PageConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootPagesArgs, "reverse" | "sortKey">
  >;
  paymentSettings: Resolver<
    ResolversTypes["PaymentSettings"],
    ParentType,
    ContextType
  >;
  predictiveSearch: Resolver<
    Types.Maybe<ResolversTypes["PredictiveSearchResult"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootPredictiveSearchArgs, "query">
  >;
  product: Resolver<
    Types.Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    Types.QueryRootProductArgs
  >;
  productByHandle: Resolver<
    Types.Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootProductByHandleArgs, "handle">
  >;
  productRecommendations: Resolver<
    Types.Maybe<Array<ResolversTypes["Product"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootProductRecommendationsArgs, "intent">
  >;
  productTags: Resolver<
    ResolversTypes["StringConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootProductTagsArgs, "first">
  >;
  productTypes: Resolver<
    ResolversTypes["StringConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootProductTypesArgs, "first">
  >;
  products: Resolver<
    ResolversTypes["ProductConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootProductsArgs, "reverse" | "sortKey">
  >;
  publicApiVersions: Resolver<
    Array<ResolversTypes["ApiVersion"]>,
    ParentType,
    ContextType
  >;
  search: Resolver<
    ResolversTypes["SearchResultItemConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootSearchArgs, "query" | "reverse" | "sortKey">
  >;
  shop: Resolver<ResolversTypes["Shop"], ParentType, ContextType>;
  sitemap: Resolver<
    ResolversTypes["Sitemap"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootSitemapArgs, "type">
  >;
  urlRedirects: Resolver<
    ResolversTypes["UrlRedirectConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.QueryRootUrlRedirectsArgs, "reverse">
  >;
};

export type SeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SEO"] = ResolversParentTypes["SEO"],
> = {
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  title: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ScriptDiscountApplication"] = ResolversParentTypes["ScriptDiscountApplication"],
> = {
  allocationMethod: Resolver<
    ResolversTypes["DiscountApplicationAllocationMethod"],
    ParentType,
    ContextType
  >;
  targetSelection: Resolver<
    ResolversTypes["DiscountApplicationTargetSelection"],
    ParentType,
    ContextType
  >;
  targetType: Resolver<
    ResolversTypes["DiscountApplicationTargetType"],
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["PricingValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchQuerySuggestionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchQuerySuggestion"] = ResolversParentTypes["SearchQuerySuggestion"],
> = {
  styledText: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  text: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchResultItem"] = ResolversParentTypes["SearchResultItem"],
> = {
  __resolveType: TypeResolveFn<
    "Article" | "Page" | "Product",
    ParentType,
    ContextType
  >;
};

export type SearchResultItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchResultItemConnection"] = ResolversParentTypes["SearchResultItemConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["SearchResultItemEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["SearchResultItem"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  productFilters: Resolver<
    Array<ResolversTypes["Filter"]>,
    ParentType,
    ContextType
  >;
  totalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchResultItemEdge"] = ResolversParentTypes["SearchResultItemEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["SearchResultItem"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SelectedOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SelectedOption"] = ResolversParentTypes["SelectedOption"],
> = {
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlan"] = ResolversParentTypes["SellingPlan"],
> = {
  billingPolicy: Resolver<
    Types.Maybe<ResolversTypes["SellingPlanBillingPolicy"]>,
    ParentType,
    ContextType
  >;
  checkoutCharge: Resolver<
    ResolversTypes["SellingPlanCheckoutCharge"],
    ParentType,
    ContextType
  >;
  deliveryPolicy: Resolver<
    Types.Maybe<ResolversTypes["SellingPlanDeliveryPolicy"]>,
    ParentType,
    ContextType
  >;
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.SellingPlanMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.SellingPlanMetafieldsArgs, "identifiers">
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  options: Resolver<
    Array<ResolversTypes["SellingPlanOption"]>,
    ParentType,
    ContextType
  >;
  priceAdjustments: Resolver<
    Array<ResolversTypes["SellingPlanPriceAdjustment"]>,
    ParentType,
    ContextType
  >;
  recurringDeliveries: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanAllocation"] = ResolversParentTypes["SellingPlanAllocation"],
> = {
  checkoutChargeAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  priceAdjustments: Resolver<
    Array<ResolversTypes["SellingPlanAllocationPriceAdjustment"]>,
    ParentType,
    ContextType
  >;
  remainingBalanceChargeAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  sellingPlan: Resolver<ResolversTypes["SellingPlan"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanAllocationConnection"] = ResolversParentTypes["SellingPlanAllocationConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["SellingPlanAllocationEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["SellingPlanAllocation"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanAllocationEdge"] = ResolversParentTypes["SellingPlanAllocationEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<
    ResolversTypes["SellingPlanAllocation"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanAllocationPriceAdjustment"] = ResolversParentTypes["SellingPlanAllocationPriceAdjustment"],
> = {
  compareAtPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  perDeliveryPrice: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  price: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  unitPrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanBillingPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanBillingPolicy"] = ResolversParentTypes["SellingPlanBillingPolicy"],
> = {
  __resolveType: TypeResolveFn<
    "SellingPlanRecurringBillingPolicy",
    ParentType,
    ContextType
  >;
};

export type SellingPlanCheckoutChargeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanCheckoutCharge"] = ResolversParentTypes["SellingPlanCheckoutCharge"],
> = {
  type: Resolver<
    ResolversTypes["SellingPlanCheckoutChargeType"],
    ParentType,
    ContextType
  >;
  value: Resolver<
    ResolversTypes["SellingPlanCheckoutChargeValue"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanCheckoutChargePercentageValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanCheckoutChargePercentageValue"] = ResolversParentTypes["SellingPlanCheckoutChargePercentageValue"],
> = {
  percentage: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanCheckoutChargeValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanCheckoutChargeValue"] = ResolversParentTypes["SellingPlanCheckoutChargeValue"],
> = {
  __resolveType: TypeResolveFn<
    "MoneyV2" | "SellingPlanCheckoutChargePercentageValue",
    ParentType,
    ContextType
  >;
};

export type SellingPlanConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanConnection"] = ResolversParentTypes["SellingPlanConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["SellingPlanEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["SellingPlan"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanDeliveryPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanDeliveryPolicy"] = ResolversParentTypes["SellingPlanDeliveryPolicy"],
> = {
  __resolveType: TypeResolveFn<
    "SellingPlanRecurringDeliveryPolicy",
    ParentType,
    ContextType
  >;
};

export type SellingPlanEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanEdge"] = ResolversParentTypes["SellingPlanEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["SellingPlan"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanFixedAmountPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanFixedAmountPriceAdjustment"] = ResolversParentTypes["SellingPlanFixedAmountPriceAdjustment"],
> = {
  adjustmentAmount: Resolver<
    ResolversTypes["MoneyV2"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanFixedPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanFixedPriceAdjustment"] = ResolversParentTypes["SellingPlanFixedPriceAdjustment"],
> = {
  price: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanGroup"] = ResolversParentTypes["SellingPlanGroup"],
> = {
  appName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  options: Resolver<
    Array<ResolversTypes["SellingPlanGroupOption"]>,
    ParentType,
    ContextType
  >;
  sellingPlans: Resolver<
    ResolversTypes["SellingPlanConnection"],
    ParentType,
    ContextType,
    RequireFields<Types.SellingPlanGroupSellingPlansArgs, "reverse">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanGroupConnection"] = ResolversParentTypes["SellingPlanGroupConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["SellingPlanGroupEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["SellingPlanGroup"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanGroupEdge"] = ResolversParentTypes["SellingPlanGroupEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["SellingPlanGroup"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanGroupOption"] = ResolversParentTypes["SellingPlanGroupOption"],
> = {
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanOption"] = ResolversParentTypes["SellingPlanOption"],
> = {
  name: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  value: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPercentagePriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanPercentagePriceAdjustment"] = ResolversParentTypes["SellingPlanPercentagePriceAdjustment"],
> = {
  adjustmentPercentage: Resolver<
    ResolversTypes["Float"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanPriceAdjustment"] = ResolversParentTypes["SellingPlanPriceAdjustment"],
> = {
  adjustmentValue: Resolver<
    ResolversTypes["SellingPlanPriceAdjustmentValue"],
    ParentType,
    ContextType
  >;
  orderCount: Resolver<
    Types.Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPriceAdjustmentValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanPriceAdjustmentValue"] = ResolversParentTypes["SellingPlanPriceAdjustmentValue"],
> = {
  __resolveType: TypeResolveFn<
    | "SellingPlanFixedAmountPriceAdjustment"
    | "SellingPlanFixedPriceAdjustment"
    | "SellingPlanPercentagePriceAdjustment",
    ParentType,
    ContextType
  >;
};

export type SellingPlanRecurringBillingPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanRecurringBillingPolicy"] = ResolversParentTypes["SellingPlanRecurringBillingPolicy"],
> = {
  interval: Resolver<
    ResolversTypes["SellingPlanInterval"],
    ParentType,
    ContextType
  >;
  intervalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanRecurringDeliveryPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SellingPlanRecurringDeliveryPolicy"] = ResolversParentTypes["SellingPlanRecurringDeliveryPolicy"],
> = {
  interval: Resolver<
    ResolversTypes["SellingPlanInterval"],
    ParentType,
    ContextType
  >;
  intervalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Shop"] = ResolversParentTypes["Shop"],
> = {
  brand: Resolver<
    Types.Maybe<ResolversTypes["Brand"]>,
    ParentType,
    ContextType
  >;
  customerAccountUrl: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  description: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  metafield: Resolver<
    Types.Maybe<ResolversTypes["Metafield"]>,
    ParentType,
    ContextType,
    RequireFields<Types.ShopMetafieldArgs, "key">
  >;
  metafields: Resolver<
    Array<Types.Maybe<ResolversTypes["Metafield"]>>,
    ParentType,
    ContextType,
    RequireFields<Types.ShopMetafieldsArgs, "identifiers">
  >;
  moneyFormat: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  paymentSettings: Resolver<
    ResolversTypes["PaymentSettings"],
    ParentType,
    ContextType
  >;
  primaryDomain: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  privacyPolicy: Resolver<
    Types.Maybe<ResolversTypes["ShopPolicy"]>,
    ParentType,
    ContextType
  >;
  refundPolicy: Resolver<
    Types.Maybe<ResolversTypes["ShopPolicy"]>,
    ParentType,
    ContextType
  >;
  shippingPolicy: Resolver<
    Types.Maybe<ResolversTypes["ShopPolicy"]>,
    ParentType,
    ContextType
  >;
  shipsToCountries: Resolver<
    Array<ResolversTypes["CountryCode"]>,
    ParentType,
    ContextType
  >;
  shopPayInstallmentsPricing: Resolver<
    Types.Maybe<ResolversTypes["ShopPayInstallmentsPricing"]>,
    ParentType,
    ContextType
  >;
  subscriptionPolicy: Resolver<
    Types.Maybe<ResolversTypes["ShopPolicyWithDefault"]>,
    ParentType,
    ContextType
  >;
  termsOfService: Resolver<
    Types.Maybe<ResolversTypes["ShopPolicy"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsFinancingPlanResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayInstallmentsFinancingPlan"] = ResolversParentTypes["ShopPayInstallmentsFinancingPlan"],
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  maxPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  minPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  terms: Resolver<
    Array<ResolversTypes["ShopPayInstallmentsFinancingPlanTerm"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsFinancingPlanTermResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayInstallmentsFinancingPlanTerm"] = ResolversParentTypes["ShopPayInstallmentsFinancingPlanTerm"],
> = {
  apr: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  frequency: Resolver<
    ResolversTypes["ShopPayInstallmentsFinancingPlanFrequency"],
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  installmentsCount: Resolver<
    Types.Maybe<ResolversTypes["Count"]>,
    ParentType,
    ContextType
  >;
  loanType: Resolver<
    ResolversTypes["ShopPayInstallmentsLoan"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsPricingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayInstallmentsPricing"] = ResolversParentTypes["ShopPayInstallmentsPricing"],
> = {
  financingPlans: Resolver<
    Array<ResolversTypes["ShopPayInstallmentsFinancingPlan"]>,
    ParentType,
    ContextType
  >;
  maxPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  minPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsProductVariantPricingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayInstallmentsProductVariantPricing"] = ResolversParentTypes["ShopPayInstallmentsProductVariantPricing"],
> = {
  available: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  eligible: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  fullPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  installmentsCount: Resolver<
    Types.Maybe<ResolversTypes["Count"]>,
    ParentType,
    ContextType
  >;
  pricePerTerm: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequest"] = ResolversParentTypes["ShopPayPaymentRequest"],
> = {
  deliveryMethods: Resolver<
    Array<ResolversTypes["ShopPayPaymentRequestDeliveryMethod"]>,
    ParentType,
    ContextType
  >;
  discountCodes: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  discounts: Resolver<
    Types.Maybe<Array<ResolversTypes["ShopPayPaymentRequestDiscount"]>>,
    ParentType,
    ContextType
  >;
  lineItems: Resolver<
    Array<ResolversTypes["ShopPayPaymentRequestLineItem"]>,
    ParentType,
    ContextType
  >;
  locale: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  presentmentCurrency: Resolver<
    ResolversTypes["CurrencyCode"],
    ParentType,
    ContextType
  >;
  selectedDeliveryMethodType: Resolver<
    ResolversTypes["ShopPayPaymentRequestDeliveryMethodType"],
    ParentType,
    ContextType
  >;
  shippingAddress: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestContactField"]>,
    ParentType,
    ContextType
  >;
  shippingLines: Resolver<
    Array<ResolversTypes["ShopPayPaymentRequestShippingLine"]>,
    ParentType,
    ContextType
  >;
  subtotal: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  total: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  totalShippingPrice: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestTotalShippingPrice"]>,
    ParentType,
    ContextType
  >;
  totalTax: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestContactFieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestContactField"] = ResolversParentTypes["ShopPayPaymentRequestContactField"],
> = {
  address1: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  address2: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  companyName: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  countryCode: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  firstName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  postalCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provinceCode: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestDeliveryMethodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestDeliveryMethod"] = ResolversParentTypes["ShopPayPaymentRequestDeliveryMethod"],
> = {
  amount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  deliveryExpectationLabel: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  detail: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  maxDeliveryDate: Resolver<
    Types.Maybe<ResolversTypes["ISO8601DateTime"]>,
    ParentType,
    ContextType
  >;
  minDeliveryDate: Resolver<
    Types.Maybe<ResolversTypes["ISO8601DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestDiscountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestDiscount"] = ResolversParentTypes["ShopPayPaymentRequestDiscount"],
> = {
  amount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestImage"] = ResolversParentTypes["ShopPayPaymentRequestImage"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestLineItem"] = ResolversParentTypes["ShopPayPaymentRequestLineItem"],
> = {
  finalItemPrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  finalLinePrice: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestImage"]>,
    ParentType,
    ContextType
  >;
  itemDiscounts: Resolver<
    Types.Maybe<Array<ResolversTypes["ShopPayPaymentRequestDiscount"]>>,
    ParentType,
    ContextType
  >;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lineDiscounts: Resolver<
    Types.Maybe<Array<ResolversTypes["ShopPayPaymentRequestDiscount"]>>,
    ParentType,
    ContextType
  >;
  originalItemPrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  originalLinePrice: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  requiresShipping: Resolver<
    Types.Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  sku: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestReceiptResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestReceipt"] = ResolversParentTypes["ShopPayPaymentRequestReceipt"],
> = {
  paymentRequest: Resolver<
    ResolversTypes["ShopPayPaymentRequest"],
    ParentType,
    ContextType
  >;
  processingStatusType: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  token: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestSession"] = ResolversParentTypes["ShopPayPaymentRequestSession"],
> = {
  checkoutUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  paymentRequest: Resolver<
    ResolversTypes["ShopPayPaymentRequest"],
    ParentType,
    ContextType
  >;
  sourceIdentifier: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestSessionCreatePayload"] = ResolversParentTypes["ShopPayPaymentRequestSessionCreatePayload"],
> = {
  shopPayPaymentRequestSession: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestSession"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserErrorsShopPayPaymentRequestSessionUserErrors"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionSubmitPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestSessionSubmitPayload"] = ResolversParentTypes["ShopPayPaymentRequestSessionSubmitPayload"],
> = {
  paymentRequestReceipt: Resolver<
    Types.Maybe<ResolversTypes["ShopPayPaymentRequestReceipt"]>,
    ParentType,
    ContextType
  >;
  userErrors: Resolver<
    Array<ResolversTypes["UserErrorsShopPayPaymentRequestSessionUserErrors"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestShippingLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestShippingLine"] = ResolversParentTypes["ShopPayPaymentRequestShippingLine"],
> = {
  amount: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestTotalShippingPriceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPayPaymentRequestTotalShippingPrice"] = ResolversParentTypes["ShopPayPaymentRequestTotalShippingPrice"],
> = {
  discounts: Resolver<
    Array<ResolversTypes["ShopPayPaymentRequestDiscount"]>,
    ParentType,
    ContextType
  >;
  finalTotal: Resolver<ResolversTypes["MoneyV2"], ParentType, ContextType>;
  originalTotal: Resolver<
    Types.Maybe<ResolversTypes["MoneyV2"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPolicy"] = ResolversParentTypes["ShopPolicy"],
> = {
  body: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPolicyWithDefaultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShopPolicyWithDefault"] = ResolversParentTypes["ShopPolicyWithDefault"],
> = {
  body: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<Types.Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Sitemap"] = ResolversParentTypes["Sitemap"],
> = {
  pagesCount: Resolver<
    Types.Maybe<ResolversTypes["Count"]>,
    ParentType,
    ContextType
  >;
  resources: Resolver<
    Types.Maybe<ResolversTypes["PaginatedSitemapResources"]>,
    ParentType,
    ContextType,
    RequireFields<Types.SitemapResourcesArgs, "page">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SitemapImage"] = ResolversParentTypes["SitemapImage"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  filepath: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SitemapResource"] = ResolversParentTypes["SitemapResource"],
> = {
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image: Resolver<
    Types.Maybe<ResolversTypes["SitemapImage"]>,
    ParentType,
    ContextType
  >;
  title: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResourceInterfaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SitemapResourceInterface"] = ResolversParentTypes["SitemapResourceInterface"],
> = {
  __resolveType: TypeResolveFn<
    "SitemapResource" | "SitemapResourceMetaobject",
    ParentType,
    ContextType
  >;
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
};

export type SitemapResourceMetaobjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SitemapResourceMetaobject"] = ResolversParentTypes["SitemapResourceMetaobject"],
> = {
  handle: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  onlineStoreUrlHandle: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StoreAvailability"] = ResolversParentTypes["StoreAvailability"],
> = {
  available: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  location: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  pickUpTime: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  quantityAvailable: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StoreAvailabilityConnection"] = ResolversParentTypes["StoreAvailabilityConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["StoreAvailabilityEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["StoreAvailability"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StoreAvailabilityEdge"] = ResolversParentTypes["StoreAvailabilityEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["StoreAvailability"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StringConnection"] = ResolversParentTypes["StringConnection"],
> = {
  edges: Resolver<Array<ResolversTypes["StringEdge"]>, ParentType, ContextType>;
  nodes: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StringEdge"] = ResolversParentTypes["StringEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmissionErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubmissionError"] = ResolversParentTypes["SubmissionError"],
> = {
  code: Resolver<
    ResolversTypes["SubmissionErrorCode"],
    ParentType,
    ContextType
  >;
  message: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitAlreadyAcceptedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubmitAlreadyAccepted"] = ResolversParentTypes["SubmitAlreadyAccepted"],
> = {
  attemptId: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitFailedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubmitFailed"] = ResolversParentTypes["SubmitFailed"],
> = {
  checkoutUrl: Resolver<
    Types.Maybe<ResolversTypes["URL"]>,
    ParentType,
    ContextType
  >;
  errors: Resolver<
    Array<ResolversTypes["SubmissionError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitSuccessResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubmitSuccess"] = ResolversParentTypes["SubmitSuccess"],
> = {
  attemptId: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  redirectUrl: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitThrottledResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubmitThrottled"] = ResolversParentTypes["SubmitThrottled"],
> = {
  pollAfter: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SwatchResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Swatch"] = ResolversParentTypes["Swatch"],
> = {
  color: Resolver<
    Types.Maybe<ResolversTypes["Color"]>,
    ParentType,
    ContextType
  >;
  image: Resolver<
    Types.Maybe<ResolversTypes["MediaImage"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonomyCategoryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TaxonomyCategory"] = ResolversParentTypes["TaxonomyCategory"],
> = {
  ancestors: Resolver<
    Array<ResolversTypes["TaxonomyCategory"]>,
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Trackable"] = ResolversParentTypes["Trackable"],
> = {
  __resolveType: TypeResolveFn<
    "Article" | "Collection" | "Page" | "Product" | "SearchQuerySuggestion",
    ParentType,
    ContextType
  >;
  trackingParameters: Resolver<
    Types.Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export type UnitPriceMeasurementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UnitPriceMeasurement"] = ResolversParentTypes["UnitPriceMeasurement"],
> = {
  measuredType: Resolver<
    Types.Maybe<ResolversTypes["UnitPriceMeasurementMeasuredType"]>,
    ParentType,
    ContextType
  >;
  quantityUnit: Resolver<
    Types.Maybe<ResolversTypes["UnitPriceMeasurementMeasuredUnit"]>,
    ParentType,
    ContextType
  >;
  quantityValue: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  referenceUnit: Resolver<
    Types.Maybe<ResolversTypes["UnitPriceMeasurementMeasuredUnit"]>,
    ParentType,
    ContextType
  >;
  referenceValue: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UnsignedInt64ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedInt64"], any> {
  name: "UnsignedInt64";
}

export type UrlRedirectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UrlRedirect"] = ResolversParentTypes["UrlRedirect"],
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  path: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  target: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlRedirectConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UrlRedirectConnection"] = ResolversParentTypes["UrlRedirectConnection"],
> = {
  edges: Resolver<
    Array<ResolversTypes["UrlRedirectEdge"]>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Array<ResolversTypes["UrlRedirect"]>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlRedirectEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UrlRedirectEdge"] = ResolversParentTypes["UrlRedirectEdge"],
> = {
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<ResolversTypes["UrlRedirect"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserError"] = ResolversParentTypes["UserError"],
> = {
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorsShopPayPaymentRequestSessionUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserErrorsShopPayPaymentRequestSessionUserErrors"] = ResolversParentTypes["UserErrorsShopPayPaymentRequestSessionUserErrors"],
> = {
  code: Resolver<
    Types.Maybe<
      ResolversTypes["UserErrorsShopPayPaymentRequestSessionUserErrorsCode"]
    >,
    ParentType,
    ContextType
  >;
  field: Resolver<
    Types.Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Video"] = ResolversParentTypes["Video"],
> = {
  alt: Resolver<Types.Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mediaContentType: Resolver<
    ResolversTypes["MediaContentType"],
    ParentType,
    ContextType
  >;
  presentation: Resolver<
    Types.Maybe<ResolversTypes["MediaPresentation"]>,
    ParentType,
    ContextType
  >;
  previewImage: Resolver<
    Types.Maybe<ResolversTypes["Image"]>,
    ParentType,
    ContextType
  >;
  sources: Resolver<
    Array<ResolversTypes["VideoSource"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoSourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VideoSource"] = ResolversParentTypes["VideoSource"],
> = {
  format: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mimeType: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  width: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ApiVersion: ApiVersionResolvers<ContextType>;
  AppliedGiftCard: AppliedGiftCardResolvers<ContextType>;
  Article: ArticleResolvers<ContextType>;
  ArticleAuthor: ArticleAuthorResolvers<ContextType>;
  ArticleConnection: ArticleConnectionResolvers<ContextType>;
  ArticleEdge: ArticleEdgeResolvers<ContextType>;
  Attribute: AttributeResolvers<ContextType>;
  AutomaticDiscountApplication: AutomaticDiscountApplicationResolvers<ContextType>;
  BaseCartLine: BaseCartLineResolvers<ContextType>;
  BaseCartLineConnection: BaseCartLineConnectionResolvers<ContextType>;
  BaseCartLineEdge: BaseCartLineEdgeResolvers<ContextType>;
  Blog: BlogResolvers<ContextType>;
  BlogConnection: BlogConnectionResolvers<ContextType>;
  BlogEdge: BlogEdgeResolvers<ContextType>;
  Brand: BrandResolvers<ContextType>;
  BrandColorGroup: BrandColorGroupResolvers<ContextType>;
  BrandColors: BrandColorsResolvers<ContextType>;
  Cart: CartResolvers<ContextType>;
  CartAddress: CartAddressResolvers<ContextType>;
  CartAttributesUpdatePayload: CartAttributesUpdatePayloadResolvers<ContextType>;
  CartAutomaticDiscountAllocation: CartAutomaticDiscountAllocationResolvers<ContextType>;
  CartBillingAddressUpdatePayload: CartBillingAddressUpdatePayloadResolvers<ContextType>;
  CartBuyerIdentity: CartBuyerIdentityResolvers<ContextType>;
  CartBuyerIdentityUpdatePayload: CartBuyerIdentityUpdatePayloadResolvers<ContextType>;
  CartCodeDiscountAllocation: CartCodeDiscountAllocationResolvers<ContextType>;
  CartCompletionAction: CartCompletionActionResolvers<ContextType>;
  CartCompletionActionRequired: CartCompletionActionRequiredResolvers<ContextType>;
  CartCompletionAttemptResult: CartCompletionAttemptResultResolvers<ContextType>;
  CartCompletionFailed: CartCompletionFailedResolvers<ContextType>;
  CartCompletionProcessing: CartCompletionProcessingResolvers<ContextType>;
  CartCompletionSuccess: CartCompletionSuccessResolvers<ContextType>;
  CartCost: CartCostResolvers<ContextType>;
  CartCreatePayload: CartCreatePayloadResolvers<ContextType>;
  CartCustomDiscountAllocation: CartCustomDiscountAllocationResolvers<ContextType>;
  CartDelivery: CartDeliveryResolvers<ContextType>;
  CartDeliveryAddress: CartDeliveryAddressResolvers<ContextType>;
  CartDeliveryAddressesAddPayload: CartDeliveryAddressesAddPayloadResolvers<ContextType>;
  CartDeliveryAddressesRemovePayload: CartDeliveryAddressesRemovePayloadResolvers<ContextType>;
  CartDeliveryAddressesUpdatePayload: CartDeliveryAddressesUpdatePayloadResolvers<ContextType>;
  CartDeliveryCoordinatesPreference: CartDeliveryCoordinatesPreferenceResolvers<ContextType>;
  CartDeliveryGroup: CartDeliveryGroupResolvers<ContextType>;
  CartDeliveryGroupConnection: CartDeliveryGroupConnectionResolvers<ContextType>;
  CartDeliveryGroupEdge: CartDeliveryGroupEdgeResolvers<ContextType>;
  CartDeliveryOption: CartDeliveryOptionResolvers<ContextType>;
  CartDeliveryPreference: CartDeliveryPreferenceResolvers<ContextType>;
  CartDiscountAllocation: CartDiscountAllocationResolvers<ContextType>;
  CartDiscountApplication: CartDiscountApplicationResolvers<ContextType>;
  CartDiscountCode: CartDiscountCodeResolvers<ContextType>;
  CartDiscountCodesUpdatePayload: CartDiscountCodesUpdatePayloadResolvers<ContextType>;
  CartEstimatedCost: CartEstimatedCostResolvers<ContextType>;
  CartGiftCardCodesRemovePayload: CartGiftCardCodesRemovePayloadResolvers<ContextType>;
  CartGiftCardCodesUpdatePayload: CartGiftCardCodesUpdatePayloadResolvers<ContextType>;
  CartLine: CartLineResolvers<ContextType>;
  CartLineCost: CartLineCostResolvers<ContextType>;
  CartLineEstimatedCost: CartLineEstimatedCostResolvers<ContextType>;
  CartLinesAddPayload: CartLinesAddPayloadResolvers<ContextType>;
  CartLinesRemovePayload: CartLinesRemovePayloadResolvers<ContextType>;
  CartLinesUpdatePayload: CartLinesUpdatePayloadResolvers<ContextType>;
  CartMetafieldDeletePayload: CartMetafieldDeletePayloadResolvers<ContextType>;
  CartMetafieldsSetPayload: CartMetafieldsSetPayloadResolvers<ContextType>;
  CartNoteUpdatePayload: CartNoteUpdatePayloadResolvers<ContextType>;
  CartOperationError: CartOperationErrorResolvers<ContextType>;
  CartPaymentUpdatePayload: CartPaymentUpdatePayloadResolvers<ContextType>;
  CartPreferences: CartPreferencesResolvers<ContextType>;
  CartPrepareForCompletionPayload: CartPrepareForCompletionPayloadResolvers<ContextType>;
  CartPrepareForCompletionResult: CartPrepareForCompletionResultResolvers<ContextType>;
  CartRemovePersonalDataPayload: CartRemovePersonalDataPayloadResolvers<ContextType>;
  CartSelectableAddress: CartSelectableAddressResolvers<ContextType>;
  CartSelectedDeliveryOptionsUpdatePayload: CartSelectedDeliveryOptionsUpdatePayloadResolvers<ContextType>;
  CartStatusNotReady: CartStatusNotReadyResolvers<ContextType>;
  CartStatusReady: CartStatusReadyResolvers<ContextType>;
  CartSubmitForCompletionPayload: CartSubmitForCompletionPayloadResolvers<ContextType>;
  CartSubmitForCompletionResult: CartSubmitForCompletionResultResolvers<ContextType>;
  CartThrottled: CartThrottledResolvers<ContextType>;
  CartUserError: CartUserErrorResolvers<ContextType>;
  CartWarning: CartWarningResolvers<ContextType>;
  Collection: CollectionResolvers<ContextType>;
  CollectionConnection: CollectionConnectionResolvers<ContextType>;
  CollectionEdge: CollectionEdgeResolvers<ContextType>;
  Color: GraphQLScalarType;
  Comment: CommentResolvers<ContextType>;
  CommentAuthor: CommentAuthorResolvers<ContextType>;
  CommentConnection: CommentConnectionResolvers<ContextType>;
  CommentEdge: CommentEdgeResolvers<ContextType>;
  Company: CompanyResolvers<ContextType>;
  CompanyContact: CompanyContactResolvers<ContextType>;
  CompanyLocation: CompanyLocationResolvers<ContextType>;
  CompletePaymentChallenge: CompletePaymentChallengeResolvers<ContextType>;
  CompletionError: CompletionErrorResolvers<ContextType>;
  ComponentizableCartLine: ComponentizableCartLineResolvers<ContextType>;
  Count: CountResolvers<ContextType>;
  Country: CountryResolvers<ContextType>;
  Currency: CurrencyResolvers<ContextType>;
  Customer: CustomerResolvers<ContextType>;
  CustomerAccessToken: CustomerAccessTokenResolvers<ContextType>;
  CustomerAccessTokenCreatePayload: CustomerAccessTokenCreatePayloadResolvers<ContextType>;
  CustomerAccessTokenCreateWithMultipassPayload: CustomerAccessTokenCreateWithMultipassPayloadResolvers<ContextType>;
  CustomerAccessTokenDeletePayload: CustomerAccessTokenDeletePayloadResolvers<ContextType>;
  CustomerAccessTokenRenewPayload: CustomerAccessTokenRenewPayloadResolvers<ContextType>;
  CustomerActivateByUrlPayload: CustomerActivateByUrlPayloadResolvers<ContextType>;
  CustomerActivatePayload: CustomerActivatePayloadResolvers<ContextType>;
  CustomerAddressCreatePayload: CustomerAddressCreatePayloadResolvers<ContextType>;
  CustomerAddressDeletePayload: CustomerAddressDeletePayloadResolvers<ContextType>;
  CustomerAddressUpdatePayload: CustomerAddressUpdatePayloadResolvers<ContextType>;
  CustomerCreatePayload: CustomerCreatePayloadResolvers<ContextType>;
  CustomerDefaultAddressUpdatePayload: CustomerDefaultAddressUpdatePayloadResolvers<ContextType>;
  CustomerRecoverPayload: CustomerRecoverPayloadResolvers<ContextType>;
  CustomerResetByUrlPayload: CustomerResetByUrlPayloadResolvers<ContextType>;
  CustomerResetPayload: CustomerResetPayloadResolvers<ContextType>;
  CustomerUpdatePayload: CustomerUpdatePayloadResolvers<ContextType>;
  CustomerUserError: CustomerUserErrorResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  Decimal: GraphQLScalarType;
  DeliveryAddress: DeliveryAddressResolvers<ContextType>;
  DiscountAllocation: DiscountAllocationResolvers<ContextType>;
  DiscountApplication: DiscountApplicationResolvers<ContextType>;
  DiscountApplicationConnection: DiscountApplicationConnectionResolvers<ContextType>;
  DiscountApplicationEdge: DiscountApplicationEdgeResolvers<ContextType>;
  DiscountCodeApplication: DiscountCodeApplicationResolvers<ContextType>;
  DisplayableError: DisplayableErrorResolvers<ContextType>;
  Domain: DomainResolvers<ContextType>;
  ExternalVideo: ExternalVideoResolvers<ContextType>;
  Filter: FilterResolvers<ContextType>;
  FilterValue: FilterValueResolvers<ContextType>;
  Fulfillment: FulfillmentResolvers<ContextType>;
  FulfillmentLineItem: FulfillmentLineItemResolvers<ContextType>;
  FulfillmentLineItemConnection: FulfillmentLineItemConnectionResolvers<ContextType>;
  FulfillmentLineItemEdge: FulfillmentLineItemEdgeResolvers<ContextType>;
  FulfillmentTrackingInfo: FulfillmentTrackingInfoResolvers<ContextType>;
  GenericFile: GenericFileResolvers<ContextType>;
  HTML: GraphQLScalarType;
  HasMetafields: HasMetafieldsResolvers<ContextType>;
  ISO8601DateTime: GraphQLScalarType;
  Image: ImageResolvers<ContextType>;
  ImageConnection: ImageConnectionResolvers<ContextType>;
  ImageEdge: ImageEdgeResolvers<ContextType>;
  InContextAnnotation: InContextAnnotationResolvers<ContextType>;
  InContextAnnotationType: InContextAnnotationTypeResolvers<ContextType>;
  JSON: GraphQLScalarType;
  Language: LanguageResolvers<ContextType>;
  Localization: LocalizationResolvers<ContextType>;
  Location: LocationResolvers<ContextType>;
  LocationAddress: LocationAddressResolvers<ContextType>;
  LocationConnection: LocationConnectionResolvers<ContextType>;
  LocationEdge: LocationEdgeResolvers<ContextType>;
  MailingAddress: MailingAddressResolvers<ContextType>;
  MailingAddressConnection: MailingAddressConnectionResolvers<ContextType>;
  MailingAddressEdge: MailingAddressEdgeResolvers<ContextType>;
  ManualDiscountApplication: ManualDiscountApplicationResolvers<ContextType>;
  Market: MarketResolvers<ContextType>;
  Media: MediaResolvers<ContextType>;
  MediaConnection: MediaConnectionResolvers<ContextType>;
  MediaEdge: MediaEdgeResolvers<ContextType>;
  MediaImage: MediaImageResolvers<ContextType>;
  MediaPresentation: MediaPresentationResolvers<ContextType>;
  Menu: MenuResolvers<ContextType>;
  MenuItem: MenuItemResolvers<ContextType>;
  MenuItemResource: MenuItemResourceResolvers<ContextType>;
  Merchandise: MerchandiseResolvers<ContextType>;
  Metafield: MetafieldResolvers<ContextType>;
  MetafieldDeleteUserError: MetafieldDeleteUserErrorResolvers<ContextType>;
  MetafieldParentResource: MetafieldParentResourceResolvers<ContextType>;
  MetafieldReference: MetafieldReferenceResolvers<ContextType>;
  MetafieldReferenceConnection: MetafieldReferenceConnectionResolvers<ContextType>;
  MetafieldReferenceEdge: MetafieldReferenceEdgeResolvers<ContextType>;
  MetafieldsSetUserError: MetafieldsSetUserErrorResolvers<ContextType>;
  Metaobject: MetaobjectResolvers<ContextType>;
  MetaobjectConnection: MetaobjectConnectionResolvers<ContextType>;
  MetaobjectEdge: MetaobjectEdgeResolvers<ContextType>;
  MetaobjectField: MetaobjectFieldResolvers<ContextType>;
  MetaobjectSEO: MetaobjectSeoResolvers<ContextType>;
  Model3d: Model3dResolvers<ContextType>;
  Model3dSource: Model3dSourceResolvers<ContextType>;
  MoneyV2: MoneyV2Resolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  OnlineStorePublishable: OnlineStorePublishableResolvers<ContextType>;
  Order: OrderResolvers<ContextType>;
  OrderConnection: OrderConnectionResolvers<ContextType>;
  OrderEdge: OrderEdgeResolvers<ContextType>;
  OrderLineItem: OrderLineItemResolvers<ContextType>;
  OrderLineItemConnection: OrderLineItemConnectionResolvers<ContextType>;
  OrderLineItemEdge: OrderLineItemEdgeResolvers<ContextType>;
  Page: PageResolvers<ContextType>;
  PageConnection: PageConnectionResolvers<ContextType>;
  PageEdge: PageEdgeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  PaginatedSitemapResources: PaginatedSitemapResourcesResolvers<ContextType>;
  PaymentSettings: PaymentSettingsResolvers<ContextType>;
  PredictiveSearchResult: PredictiveSearchResultResolvers<ContextType>;
  PricingPercentageValue: PricingPercentageValueResolvers<ContextType>;
  PricingValue: PricingValueResolvers<ContextType>;
  Product: ProductResolvers<ContextType>;
  ProductConnection: ProductConnectionResolvers<ContextType>;
  ProductEdge: ProductEdgeResolvers<ContextType>;
  ProductOption: ProductOptionResolvers<ContextType>;
  ProductOptionValue: ProductOptionValueResolvers<ContextType>;
  ProductOptionValueSwatch: ProductOptionValueSwatchResolvers<ContextType>;
  ProductPriceRange: ProductPriceRangeResolvers<ContextType>;
  ProductVariant: ProductVariantResolvers<ContextType>;
  ProductVariantComponent: ProductVariantComponentResolvers<ContextType>;
  ProductVariantComponentConnection: ProductVariantComponentConnectionResolvers<ContextType>;
  ProductVariantComponentEdge: ProductVariantComponentEdgeResolvers<ContextType>;
  ProductVariantConnection: ProductVariantConnectionResolvers<ContextType>;
  ProductVariantEdge: ProductVariantEdgeResolvers<ContextType>;
  PurchasingCompany: PurchasingCompanyResolvers<ContextType>;
  QuantityPriceBreak: QuantityPriceBreakResolvers<ContextType>;
  QuantityPriceBreakConnection: QuantityPriceBreakConnectionResolvers<ContextType>;
  QuantityPriceBreakEdge: QuantityPriceBreakEdgeResolvers<ContextType>;
  QuantityRule: QuantityRuleResolvers<ContextType>;
  QueryRoot: QueryRootResolvers<ContextType>;
  SEO: SeoResolvers<ContextType>;
  ScriptDiscountApplication: ScriptDiscountApplicationResolvers<ContextType>;
  SearchQuerySuggestion: SearchQuerySuggestionResolvers<ContextType>;
  SearchResultItem: SearchResultItemResolvers<ContextType>;
  SearchResultItemConnection: SearchResultItemConnectionResolvers<ContextType>;
  SearchResultItemEdge: SearchResultItemEdgeResolvers<ContextType>;
  SelectedOption: SelectedOptionResolvers<ContextType>;
  SellingPlan: SellingPlanResolvers<ContextType>;
  SellingPlanAllocation: SellingPlanAllocationResolvers<ContextType>;
  SellingPlanAllocationConnection: SellingPlanAllocationConnectionResolvers<ContextType>;
  SellingPlanAllocationEdge: SellingPlanAllocationEdgeResolvers<ContextType>;
  SellingPlanAllocationPriceAdjustment: SellingPlanAllocationPriceAdjustmentResolvers<ContextType>;
  SellingPlanBillingPolicy: SellingPlanBillingPolicyResolvers<ContextType>;
  SellingPlanCheckoutCharge: SellingPlanCheckoutChargeResolvers<ContextType>;
  SellingPlanCheckoutChargePercentageValue: SellingPlanCheckoutChargePercentageValueResolvers<ContextType>;
  SellingPlanCheckoutChargeValue: SellingPlanCheckoutChargeValueResolvers<ContextType>;
  SellingPlanConnection: SellingPlanConnectionResolvers<ContextType>;
  SellingPlanDeliveryPolicy: SellingPlanDeliveryPolicyResolvers<ContextType>;
  SellingPlanEdge: SellingPlanEdgeResolvers<ContextType>;
  SellingPlanFixedAmountPriceAdjustment: SellingPlanFixedAmountPriceAdjustmentResolvers<ContextType>;
  SellingPlanFixedPriceAdjustment: SellingPlanFixedPriceAdjustmentResolvers<ContextType>;
  SellingPlanGroup: SellingPlanGroupResolvers<ContextType>;
  SellingPlanGroupConnection: SellingPlanGroupConnectionResolvers<ContextType>;
  SellingPlanGroupEdge: SellingPlanGroupEdgeResolvers<ContextType>;
  SellingPlanGroupOption: SellingPlanGroupOptionResolvers<ContextType>;
  SellingPlanOption: SellingPlanOptionResolvers<ContextType>;
  SellingPlanPercentagePriceAdjustment: SellingPlanPercentagePriceAdjustmentResolvers<ContextType>;
  SellingPlanPriceAdjustment: SellingPlanPriceAdjustmentResolvers<ContextType>;
  SellingPlanPriceAdjustmentValue: SellingPlanPriceAdjustmentValueResolvers<ContextType>;
  SellingPlanRecurringBillingPolicy: SellingPlanRecurringBillingPolicyResolvers<ContextType>;
  SellingPlanRecurringDeliveryPolicy: SellingPlanRecurringDeliveryPolicyResolvers<ContextType>;
  Shop: ShopResolvers<ContextType>;
  ShopPayInstallmentsFinancingPlan: ShopPayInstallmentsFinancingPlanResolvers<ContextType>;
  ShopPayInstallmentsFinancingPlanTerm: ShopPayInstallmentsFinancingPlanTermResolvers<ContextType>;
  ShopPayInstallmentsPricing: ShopPayInstallmentsPricingResolvers<ContextType>;
  ShopPayInstallmentsProductVariantPricing: ShopPayInstallmentsProductVariantPricingResolvers<ContextType>;
  ShopPayPaymentRequest: ShopPayPaymentRequestResolvers<ContextType>;
  ShopPayPaymentRequestContactField: ShopPayPaymentRequestContactFieldResolvers<ContextType>;
  ShopPayPaymentRequestDeliveryMethod: ShopPayPaymentRequestDeliveryMethodResolvers<ContextType>;
  ShopPayPaymentRequestDiscount: ShopPayPaymentRequestDiscountResolvers<ContextType>;
  ShopPayPaymentRequestImage: ShopPayPaymentRequestImageResolvers<ContextType>;
  ShopPayPaymentRequestLineItem: ShopPayPaymentRequestLineItemResolvers<ContextType>;
  ShopPayPaymentRequestReceipt: ShopPayPaymentRequestReceiptResolvers<ContextType>;
  ShopPayPaymentRequestSession: ShopPayPaymentRequestSessionResolvers<ContextType>;
  ShopPayPaymentRequestSessionCreatePayload: ShopPayPaymentRequestSessionCreatePayloadResolvers<ContextType>;
  ShopPayPaymentRequestSessionSubmitPayload: ShopPayPaymentRequestSessionSubmitPayloadResolvers<ContextType>;
  ShopPayPaymentRequestShippingLine: ShopPayPaymentRequestShippingLineResolvers<ContextType>;
  ShopPayPaymentRequestTotalShippingPrice: ShopPayPaymentRequestTotalShippingPriceResolvers<ContextType>;
  ShopPolicy: ShopPolicyResolvers<ContextType>;
  ShopPolicyWithDefault: ShopPolicyWithDefaultResolvers<ContextType>;
  Sitemap: SitemapResolvers<ContextType>;
  SitemapImage: SitemapImageResolvers<ContextType>;
  SitemapResource: SitemapResourceResolvers<ContextType>;
  SitemapResourceInterface: SitemapResourceInterfaceResolvers<ContextType>;
  SitemapResourceMetaobject: SitemapResourceMetaobjectResolvers<ContextType>;
  StoreAvailability: StoreAvailabilityResolvers<ContextType>;
  StoreAvailabilityConnection: StoreAvailabilityConnectionResolvers<ContextType>;
  StoreAvailabilityEdge: StoreAvailabilityEdgeResolvers<ContextType>;
  StringConnection: StringConnectionResolvers<ContextType>;
  StringEdge: StringEdgeResolvers<ContextType>;
  SubmissionError: SubmissionErrorResolvers<ContextType>;
  SubmitAlreadyAccepted: SubmitAlreadyAcceptedResolvers<ContextType>;
  SubmitFailed: SubmitFailedResolvers<ContextType>;
  SubmitSuccess: SubmitSuccessResolvers<ContextType>;
  SubmitThrottled: SubmitThrottledResolvers<ContextType>;
  Swatch: SwatchResolvers<ContextType>;
  TaxonomyCategory: TaxonomyCategoryResolvers<ContextType>;
  Trackable: TrackableResolvers<ContextType>;
  URL: GraphQLScalarType;
  UnitPriceMeasurement: UnitPriceMeasurementResolvers<ContextType>;
  UnsignedInt64: GraphQLScalarType;
  UrlRedirect: UrlRedirectResolvers<ContextType>;
  UrlRedirectConnection: UrlRedirectConnectionResolvers<ContextType>;
  UrlRedirectEdge: UrlRedirectEdgeResolvers<ContextType>;
  UserError: UserErrorResolvers<ContextType>;
  UserErrorsShopPayPaymentRequestSessionUserErrors: UserErrorsShopPayPaymentRequestSessionUserErrorsResolvers<ContextType>;
  Video: VideoResolvers<ContextType>;
  VideoSource: VideoSourceResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  accessRestricted: AccessRestrictedDirectiveResolver<any, any, ContextType>;
  defer: DeferDirectiveResolver<any, any, ContextType>;
  inContext: InContextDirectiveResolver<any, any, ContextType>;
};
