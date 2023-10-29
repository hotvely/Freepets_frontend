import styled from "styled-components";
import { getAddress, getIp, getWeather } from "../api/utils";
import { useEffect } from "react";
import { useState } from "react";
import {
  faTemperature3,
  faSun,
  faCloud,
  faUmbrella,
  faSnowflake,
  faBolt,
  faWind,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      margin-top: 20px;
      align-items: center;
      justify-content: center;
      width: 80%;
      .weather-content {
        background-color: #3a98b9;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: start;
        flex-basis: 190px;
        border-radius: 20px;
        flex-shrink: 0;
        flex-grow: 1;
        width: 100%;

        .weather-addr {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .weather-info-header {
          font-size: 1.1rem;
          font-weight: 550;
          height: 40px;
          display: flex;
          align-items: start;
          justify-content: center;
        }

        .weather-info {
          font-size: 1.2rem;
          font-weight: 550;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .weather-temp {
          font-size: 1.2rem;
          font-weight: 550;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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
              <div className="weather-addr">
                {city} {area}
              </div>
              <div className="weather-info-header">날씨 정보</div>
              <div className="weather-info">
                {weather ? (
                  weather?.weather[0].description.includes("clear") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>맑음</span>
                    </span>
                  ) : weather?.weather[0].description.includes("cloud") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>구름</span>
                    </span>
                  ) : weather?.weather[0].description.includes("rain") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faUmbrella}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>비</span>
                    </span>
                  ) : weather?.weather[0].description.includes("snow") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>눈</span>
                    </span>
                  ) : weather?.weather[0].description.includes(
                      "thunderstorm"
                    ) ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faBolt}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>번개</span>
                    </span>
                  ) : weather?.weather[0].description.includes("windy") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faWind}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                    </span>
                  ) : weather?.weather[0].description.includes("fog") ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faSmog}
                        style={{
                          color: "white",
                          margin: "0px 5px",
                        }}
                      />
                      <span>안개</span>
                    </span>
                  ) : null
                ) : (
                  "Loading.."
                )}
              </div>
              <div className="weather-temp">
                <FontAwesomeIcon
                  icon={faTemperature3}
                  style={{
                    color: "white",
                    margin: "0px 5px",
                  }}
                />
                {weather
                  ? (weather?.main.temp - 273.15).toFixed(1) + " ºC"
                  : "Loading.."}
              </div>
            </div>
          </div>
        </div>
      </StyledRSide>
    </>
  );
};

export default RSide;
