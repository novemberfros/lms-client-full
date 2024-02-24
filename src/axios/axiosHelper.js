const getAccessJWT = () => {
  const token = sessionStorage.getItem("accessJWT");
  return token;
};

export const axiosConfig = ()=> {
    return {
      headers : {
        Authorization: getAccessJWT(),
      }
    }
}