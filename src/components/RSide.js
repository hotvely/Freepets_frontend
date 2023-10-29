import styled from "styled-components";
import { getAddress, getIp, getWeather } from "../api/utils";
import { useEffect } from "react";
import { useState } from "react";

const StyledRSide = styled.div`
  /* width: 300px; */
  height: 400px;
  display: flex;
  justify-content: center;
  flex: 0 0 250px;
  margin-left: 30px;
  padding-right: 50px;
  .rMenu {
    width: 100%;

    display: flex;
    flex: 1 0 250px;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    border: 10px solid skyblue;
    border-radius: 25px;
    .rMenuAction {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      width: 100%;
      div {
        flex: 1 1 80%;
        width: 80%;
        border: 1px solid black;
        margin: 20px 0;
      }
    }

    text-align: center;
  }
`;

const RSide = () => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [weather, setWeather] = useState();

  const searchAddr = async () => {
    if (window.naver) {
      const coords = new window.naver.maps.LatLng(lat, lng);

      window.naver.maps.Service.reverseGeocode(
        {
          coords: coords,
          orders: [
            window.naver.maps.Service.OrderType.ADDR,
            window.naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        (status, response) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }
          const result = response.v2;

          setCity(result.results[0].region.area1.name);
          setArea(result.results[0].region.area2.name);
          // setLocation(result.address.jibunAddress);
        }
      );
    }
  };
  const weatherHandler = async () => {
    const responseWeather = await getWeather(lat, lng);
    setWeather(responseWeather);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (window.naver) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      });
    }
    // setCity(address.area1.name);
  }, [window.naver]);

  useEffect(() => {
    if (lat && lng) searchAddr();
  }, [lat, lng]);

  useEffect(() => {
    if (city && area) {
      weatherHandler(lat, lng);
    }
  }, [city, area]);

  return (
    <>
      <StyledRSide>
        <div className="rMenu">
          <div className="rMenuAction">
            <div className="weather-content">
              <div>
                {city} {area}
              </div>
              <div>날씨 정보</div>
              <div>
                {weather ? weather?.weather[0].description : "Loading.."}
              </div>
              <div>
                {weather
                  ? (weather?.main.temp - 273.15).toFixed(1) + " ºC"
                  : "Loading.."}
              </div>
            </div>
            <div>우측 기능1ads sa ada sasd a </div>
            <div>우측 기능1 ads dasd ad </div>
          </div>
        </div>
      </StyledRSide>
    </>
  );
};

export default RSide;
