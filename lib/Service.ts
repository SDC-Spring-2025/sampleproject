
export async function getAllRestaurants() {
  const url = '/api/getAllRestaurants';

  try {
    const res = await fetch(url);

    return await res.json();
  } catch (e) {
    console.error('Failed to get user', e);
  }
}

export async function getRestaurantsByCuisine(cuisine: string) {
  const url = `/api/getRestaurantsByCuisine?cuisine=${cuisine}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.error('Failed to get user', e);
  }
}