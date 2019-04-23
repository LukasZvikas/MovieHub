const movieIds = { data: [1456] };

export default async (urlProp, parameters = {}) => {
  if (urlProp === "http://localhost:5000/user/get_user_favorites")
    return await new Promise(resolve => {
      resolve(movieIds);
    });
  return await new Promise(resolve => {
    resolve(movieIds);
  });
};
