export const Items_Per_Page = 10

export function discountedPrice(item){
    return Math.round(item.price*(1-item.discountPercentage/100)).toFixed(2)
}

