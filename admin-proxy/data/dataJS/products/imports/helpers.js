import {
  getAllVaultVariants,
  findVaultVariantByHandle,
  getFieldsByVaultHandle,
  getImageDataByVaultHandle
} from './vault-helpers.js'

import { productWithVaultVariantDataArrays } from '../Javascript/productWithVaultVariantData.js'

// Alle vaultvariants
const allVariants = getAllVaultVariants(productWithVaultVariantDataArrays);
console.log(allVariants);

// Finne én
const fjellblaVault = findVaultVariantByHandle(
  productWithVaultVariantDataArrays,
  'vault_fjellbla_dawn_l'
);

console.log(fjellblaVault);

// Hente bare fields
const fields = getFieldsByVaultHandle(
  productWithVaultVariantDataArrays,
  'vault_fjellbla_dawn_l'
);

console.log(fields?.background_color);
console.log(fields?.images);

const images = getImageDataByVaultHandle(
  productWithVaultVariantDataArrays,
  'vault_fjellbla_dawn_l'
);
console.log(images.map(img => img.url));