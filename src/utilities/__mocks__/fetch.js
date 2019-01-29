const data = {
  id: 332562,
  poster_path: "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
  title: "A Star Is Born",
  release_date: "2018-08-24"
};

export default async (urlProp, parameters = {}) => {
  return await new Promise(resolve => {
    console.log("DATAAAA", data);
    resolve(data);
  });
};
