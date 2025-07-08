import { productWithVaultVariantDataArrays } from '../Javascript/productWithVaultVariantData.js'

function getEntryArrays() {
  const result = []
  if (Array.isArray(productWithVaultVariantDataArrays)) {
    for (const product of productWithVaultVariantDataArrays) {
      if (product.vaults) {
        for (const vault of product.vaults) {
          if (Array.isArray(vault.entries)) {
            result.push(...vault.entries)
          }
        }
      }
    }
  }
  return result
}

function getVaultImagesArray() {
  const entries = getEntryArrays()
  const imageUrls = []

  for (const entry of entries) {
    if (entry.fields && Array.isArray(entry.fields.images)) {
      for (const image of entry.fields.images) {
        if (image.url && !imageUrls.includes(image.url)) {
          imageUrls.push(image.url)
        }
      }
    }
  }

  console.log(imageUrls)
  return imageUrls
}

getVaultImagesArray()
