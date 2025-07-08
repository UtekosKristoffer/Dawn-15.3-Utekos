/**
 * Finn alle vaultvariant entries i produktarrayet.
 * @param {Array} products - Hele productWithVaultVariantDataArrays
 * @returns {Array} - Alle vaultvariant-entries
 */
import { productWithVaultVariantDataArrays } from '../Javascript/productWithVaultVariantData.js'
export function getAllVaultVariants(products) {
  return products
    .flatMap(product => product.vaults)
    .flatMap(vault => vault.entries)
    .filter(entry => entry.type === 'vaultvariant');
}

/**
 * Finn én vaultvariant basert på handle.
 * @param {Array} products - Hele productWithVaultVariantDataArrays
 * @param {string} handle - Eksakt handle for variant du vil finne
 * @returns {Object|null} - Vaultvariant entry eller null
 */
export function findVaultVariantByHandle(products, handle) {
  const allVariants = getAllVaultVariants(products);
  return allVariants.find(entry => entry.handle === handle) || null;
}

/**
 * Eksempel: Finn alle felter til en spesifikk variant.
 * @param {Array} products
 * @param {string} handle
 * @returns {Object|null}
 */
export function getFieldsByVaultHandle(products, handle) {
  const vault = findVaultVariantByHandle(products, handle);
  return vault ? vault.fields : null;
}

export function getImageDataByVaultHandle(products, handle) {
  const fields = getFieldsByVaultHandle(products, handle);
  if (!fields || !Array.isArray(fields.images)) {
    return [];
  }
  return fields.images.map(img => ({
    url: img.url,
    alt: img.alt || ''
  }));
}