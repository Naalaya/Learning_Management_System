const fetchAddress = (url: any) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      return { success: true, result: data.result }; // Corrected to return data directly
    })
    .catch((error) => {
      console.error(error);
      return { success: false };
    });
};

export const province = async () => {
  return fetchAddress(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/province`);
};

export const district = async (id: any) => {
  return fetchAddress(
    `${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/district/${id}`
  );
};
export const ward = async (id: any) => {
  return fetchAddress(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/ward/${id}`);
};
