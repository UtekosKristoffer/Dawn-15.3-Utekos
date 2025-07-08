const allMetafields = 
[
{
  "article": [],
  "blog": [],
  "collection": [],
  "company": [],
  "company_location": [],
  "location": [],
  "market": [],
  "order": [],
  "page": [
    {
      "key": "beskrivelse",
      "namespace": "custom",
      "name": "Beskrivelse",
      "description": "Beskrivelse av produkt",
      "type": {
        "name": "multi_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "storrelsesguide",
      "namespace": "utekos",
      "name": "Størrelsesguide",
      "description": "",
      "type": {
        "name": "link",
        "category": "LINK"
      }
    },
    {
      "key": "passform",
      "namespace": "utekos",
      "name": "Passform",
      "description": "",
      "type": {
        "name": "metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "inspirasjon",
      "namespace": "page",
      "name": "Inspirasjon",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "pictures",
      "namespace": "hytteliv",
      "name": "Hytteliv Bilder",
      "description": "",
      "type": {
        "name": "list.file_reference",
        "category": "REFERENCE"
      }
    }
  ],
  "product": [
    {
      "key": "rating",
      "namespace": "reviews",
      "name": "Produktvurdering",
      "description": "Gjennomsnittlig vurdering fra kunder",
      "type": {
        "name": "rating",
        "category": "RATING"
      }
    },
    {
      "key": "rating_count",
      "namespace": "reviews",
      "name": "Antall produktvurderinger",
      "description": "Totalt antall vurderinger fra kunder",
      "type": {
        "name": "number_integer",
        "category": "NUMBER"
      }
    },
    {
      "key": "custom_product",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Product",
      "description": "Use to indicate whether or not the unique product identifiers (UPIs) GTIN, MPN, and brand are available for your product.",
      "type": {
        "name": "boolean",
        "category": "TRUE_FALSE"
      }
    },
    {
      "key": "color_styles",
      "namespace": "custom",
      "name": "Fargeknapp-stiler",
      "description": "",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "relaterte_produkter",
      "namespace": "custom",
      "name": "Related Products",
      "description": "Flere som er klar for eventyr",
      "type": {
        "name": "list.product_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "storrelse_og_temperaturguide",
      "namespace": "custom",
      "name": "Størrelse- og temperaturguide",
      "description": "",
      "type": {
        "name": "page_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "ulike_beskrivelser",
      "namespace": "custom",
      "name": "Ulike beskrivelser",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "product_care",
      "namespace": "utekos",
      "name": "Product Care",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "size_fit",
      "namespace": "utekos",
      "name": "Size Fit",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "areas_of_use",
      "namespace": "utekos",
      "name": "Areas of Use",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "functions",
      "namespace": "utekos",
      "name": "Functions",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "product_description",
      "namespace": "utekos",
      "name": "Product Description",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "target-gender",
      "namespace": "shopify",
      "name": "Målkjønn",
      "description": "Angir hvilket kjønn et produkt er beregnet på, for eksempel kvinne, mann eller unisex.",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "productbridge",
      "namespace": "dock",
      "name": "ProductBridge",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "color-pattern",
      "namespace": "shopify",
      "name": "Farge",
      "description": "Angir hovedfargen eller -mønsteret, for eksempel blå eller stripet.",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "size",
      "namespace": "shopify",
      "name": "Størrelse",
      "description": "Brukes til å spesifisere størrelsen til et produkt, for eksempel 0–3 måneder eller Ekstra stor (XL).",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "filter",
      "namespace": "vaultvariant",
      "name": "Vault Variant Filter",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "title",
      "namespace": "creative",
      "name": "Creative Title",
      "description": "",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "materials",
      "namespace": "related",
      "name": "Materials",
      "description": "",
      "type": {
        "name": "rich_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "field_vault",
      "namespace": "pathfinder",
      "name": "Field Vault",
      "description": "",
      "type": {
        "name": "list.metaobject_reference",
        "category": "REFERENCE"
      }
    },
    {
      "key": "resolved_data",
      "namespace": "custom",
      "name": "Resolved Data",
      "description": "",
      "type": {
        "name": "json",
        "category": "JSON"
      }
    }
  ],
  "variant": [
    {
      "key": "age_group",
      "namespace": "mm-google-shopping",
      "name": "Google: Age Group",
      "description": "The demographic for which your product is intended.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "custom_label_0",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Label 0",
      "description": "Label that you assign to a product to help organize bidding and reporting in Shopping campaigns.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "size_system",
      "namespace": "mm-google-shopping",
      "name": "Google: Size System",
      "description": "The country of the size system used by your product.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "custom_label_2",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Label 02",
      "description": "Label that you assign to a product to help organize bidding and reporting in Shopping campaigns.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "condition",
      "namespace": "mm-google-shopping",
      "name": "Google: Condition",
      "description": "The condition of your product at time of sale.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "custom_label_3",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Label 3",
      "description": "Label that you assign to a product to help organize bidding and reporting in Shopping campaigns.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "custom_label_4",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Label 4",
      "description": "Label that you assign to a product to help organize bidding and reporting in Shopping campaigns.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "custom_label_1",
      "namespace": "mm-google-shopping",
      "name": "Google: Custom Label 1",
      "description": "Label that you assign to a product to help organize bidding and reporting in Shopping campaigns.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "size_type",
      "namespace": "mm-google-shopping",
      "name": "Google: Size Type",
      "description": "Your apparel product’s cut.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "mpn",
      "namespace": "mm-google-shopping",
      "name": "Google: MPN",
      "description": "Your product’s Manufacturer Part Number (MPN).",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "gender",
      "namespace": "mm-google-shopping",
      "name": "Google: Gender",
      "description": "The gender for which your product is intended.",
      "type": {
        "name": "single_line_text_field",
        "category": "TEXT"
      }
    },
    {
      "key": "Varianthandler",
      "namespace": "bridgeFor",
      "name": "VariantHandler",
      "description": "",
      "type": {
        "name": "metaobject_reference",
        "category": "REFERENCE"
      }
    }
  ],
  "shop": []
}
]