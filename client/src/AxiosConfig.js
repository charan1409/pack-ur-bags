import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch ("asdf") {
    case "production":
      url = "https://backend-packurbags.onrender.com/";
      break;
    case "development":
    default:
      url = "http://localhost:9000/";
  }
  return url;
};

export default axios.create({
  baseURL: getBaseUrl(),
});
