export function formatCurrency(price: number){
    const currency = new Intl.NumberFormat('en-US', {style: "currency", currency: "usd"})
    return currency.format(price);
}