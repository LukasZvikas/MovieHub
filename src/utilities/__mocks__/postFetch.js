const movieIds = { data: [1456] };

const isFavorited = { response: { status: "added" } };

export default async (urlProp, parameters = {}) => {
  console.log("url", urlProp);
  if (urlProp === "http://localhost:5000/user/get_user_favorites")
    return await new Promise(resolve => {
      resolve(movieIds);
    });
    return await new Promise(resolve => {
        resolve(movieIds);
      });
};
