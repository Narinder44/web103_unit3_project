export const getAllEvents = async () => {
  try {
    const res = await fetch("/api/events");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getEventById = async (id) => {
  try {
    const res = await fetch(`/api/events/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAllEvents, getEventById };
