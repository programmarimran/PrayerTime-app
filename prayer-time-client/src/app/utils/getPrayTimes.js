const { default: axiosInstance } = require("./axios");

const getPrayTimes = async ({district}) => {
  try {
    const res = await axiosInstance.get(`/prayer-time?district=${district}`); 
    return res.data;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return [];
  }
};
export default getPrayTimes;