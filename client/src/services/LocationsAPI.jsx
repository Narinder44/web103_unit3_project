export const getAllLocations = async () => {
  try {
    const res = await fetch("/api/locations");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getLocationById = async (id) => {
  try {
    const res = await fetch(`/api/locations/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAllLocations, getLocationById };
