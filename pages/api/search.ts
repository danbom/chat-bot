import axios from "axios";

axios.get("https://openapi.naver.com/v1/search/encyc.json").then((res) => {
  console.log(res.data);
});
