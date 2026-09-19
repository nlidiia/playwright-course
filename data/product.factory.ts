export function createProduct(index: number) {
  const uniqueId = `${Date.now()}-${index}`;

  return {
    id: uniqueId,
    name: `AQA Product ${index}`,
    description: `Description for AQA Product ${index}`,
    price: index,
    is_location_offer: false,
    is_rental: false,
    in_stock: true,
    co2_rating: 'A',
    is_eco_friendly: true,

    brand: {
      id: `brand-${uniqueId}`,
      name: 'AQA Brand',
      slug: 'aqa-brand',
    },

    category: {
      id: `category-${uniqueId}`,
      parent_id: null,
      name: 'AQA Category',
      slug: 'aqa-category',
      sub_categories: [],
    },

    product_image: {
      id: `image-${uniqueId}`,
      by_name: '',
      by_url: '',
      source_name: '',
      source_url: '',
      file_name: '',
      title: `AQA Product ${index}`,
    },
  };
}