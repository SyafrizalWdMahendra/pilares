export async function getStudios() {
  try {
    const studios = await fetch("/api/court");
    const res = await studios.json();
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to fetch studio datas",
    };
  }
}
