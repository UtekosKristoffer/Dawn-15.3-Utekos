//@ts-nocheck
import { productWithVaultVariantDataArrays } from '../Javascript/productWithVaultVariantData.js'
 
function getEntryArrays(){

  if(productWithVaultVariantDataArrays){
        const vaultEntries = productWithVaultVariantDataArrays.entries
        console.log(vaultEntries)
    }
}


function getVaultImagesArray(images){
    const arrayImages = []    
    for (let image of images){
        for (let image of entries.images){
            if (!emotionsArray.includes(images)){
                emotionsArray.push(images)
            }
        }
    }
    return arrayImages
    console.log(getVaultImagesArray)
}

getEntryArrays()