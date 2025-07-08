/**
 * Validates a Shopify product JSON object.
 * Checks that structure and minimal required properties exist.
 *
 * @param {any} productData - Parsed JSON from Shopify
 * @returns {{ isValid: boolean, errors: string[] }}
 */
 function validateProductData(productData) {
  const errors = [];

  if (!productData || typeof productData !== 'object') {
    errors.push('Product data is not an object.');
    return { isValid: false, errors };
  }

  if (!Array.isArray(productData.variants)) {
    errors.push('Missing or invalid `variants` array.');
  } else if (productData.variants.length === 0) {
    errors.push('Variants array is empty.');
  }

  // Optional: Check required properties if needed
  if (typeof productData.title !== 'string' || !productData.title.trim()) {
    errors.push('Missing or invalid `title`.');
  }

  if (typeof productData.id !== 'number') {
    errors.push('Missing or invalid `id`.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export {validateProductData}