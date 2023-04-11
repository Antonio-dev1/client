export const getPriceRange = (prices) => {
    prices = Array.from(prices, price => parseInt(price));
    const priceSet = new Set(prices);
    const sortedPrices = Array.from(priceSet).sort((a, b) => a - b);
  
    const minPrice = sortedPrices[0];
    const maxPrice = sortedPrices[sortedPrices.length - 1];
    const range = maxPrice - minPrice;
  
    const steps = [0, 1, 2, 2.25, 2.75, 3.25]; // added a 6th step here
  
    const ranges = steps.map((step) => {
      const price = minPrice + range * step;
      const rangeStart = Math.floor(price);
      const rangeEnd = Math.ceil(price);
      return `${rangeStart} - ${rangeEnd}`;
    });
  
    return ranges;
    };