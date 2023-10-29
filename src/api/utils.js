import axios from "axios";

// 2023-10-19 10:23
export const dateFormatDefault = (data) => {
  const dateObj = new Date(data);
  let formattedDate =
    dateObj.getFullYear() +
    "-" +
    dateObj.getMonth() +
    "-" +
    dateObj.getDay() +
    " " +
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes();
  return formattedDate;
};

// 7일 전 & 오늘 날짜면 시간만 나옴
export const dateFormatTrans = (data) => {
  const dateObj = new Date(data);
  let currentDate = new Date();
  const timeDiff = currentDate - dateObj;
  let date = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  if (date == 0) {
    date = dateObj.getHours() + ":" + dateObj.getMinutes();
  } else {
    date += "일 전";
  }
  return date;
};

export const getWeather = async (lat, lon) => {
  console.log(lat);
  console.log(lon);
  console.log("날씨 API접속..?");
  const key = `451caf66add814bfc5587bbf6e077350`;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang`
  );
  return await response.data;
};

// export const getPost = async () => {
//   return await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}
//     &key=YOUR_GOOGLE_MAPS_API_KEY`
//   );
// };

export const getIp = async () => {
  return await axios.get("https://ipapi.co/json");
};

export const getAddress = async (lat, lon) => {
  console.log(lat);
  console.log(lon);
  return await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lat},${lon}&output=json`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "7t48wvf7nm",
        "X-NCP-APIGW-API-KEY": "GsnL3OKV5tRTP3NbBAnWrIfoLQ6lyym4UpCf39jY",
      },
    }
  );
};
