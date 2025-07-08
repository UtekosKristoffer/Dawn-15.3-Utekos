//@ts-nocheck
import { productWithVaultVariantDataArrays } from '../Javascript/productWithVaultVariantData.js'



// Alle vaultvariant:
const allVaultVariants = productWithVaultVariantDataArrays
  .flatMap(p => p.vaults)
  .flatMap(v => v.entries)
  .filter(e => e.type === 'vaultvariant');

console.log(allVaultVariants.map(v => v.fields));

// Hente en spesifikk:
const myVariant = allVaultVariants.find(v => v.handle === 'vault_fjellbla_dawn_l');
console.log(myVariant?.fields);
