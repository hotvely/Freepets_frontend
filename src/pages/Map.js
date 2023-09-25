import styled from "styled-components";
import banner from "../resources/bannerTest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import map from "../resources/map.png";

const StyledMain = styled.main`
     display: flex;
    flex-direction:column;
    width: 100%;
   
    height: 100vw;
    align-items: center;

    .venner{
      width: 90%;
      img{
        width: 100%;
        height: 150px;
      }
    }

    .vennerBottom {
        display: flex;
        align-items: center;
        width: 90%;
        margin-top: 1.75rem;
        margin-bottom: 1.75rem;
        position: relative;

        .full{
            display: flex;
            flex-direction: column;      
            position: absolute;
            width: 100%;
           
            
            .full-line-left{
              border: 1px solid hsla(220,9%,46%,.3);;   
              width: 1%;
           }

           .full-line-right{
              border: 1px solid hsla(220,9%,46%,.3);;   
              width: 92.7%;
              margin-left: 103px;
           }
        }
        .vennerText{
            .text-box{
                background-color: white;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                margin-left: 1.25rem;
                
                .text-blue{
                    color: #2687A6;
                }
            }
        }   
    }

    .header{
       display: flex;
       flex-direction: row;
       justify-content: flex-start;
       width: 90%;
       height: 70px;
       margin-top: 20px;

       .mapicon{
        display: flex;
        flex-direction: column;
        justify-content: center;
       }

       h1{
        display: flex;
        align-items: center;
        font-size: 40px;
       }

    }
    .map{
        img{
          margin-top: 20px;
          width: 100%;
          height: 90%;
        }
    }
    .footer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 60%;
        .footerDesc{
           p{
            margin: 10px 0px;
           }
        }
        
    }

`;

const Map = () => {
    return (
       
        <StyledMain>
           <div className="venner">
              <img src={banner}/>
           </div>

           <div className="vennerBottom">
              <div className="full">
                <div className="full-line-left"></div>
              </div>

              <div className="vennerText">
                <div className="text-box">
                  <span></span>
                    <a className="text-blue" href="#">병원 찾기</a>
                    <span></span>
                </div>
              </div>

              <div className="full">
                <div className="full-line-right"></div>
              </div>
           </div>

            <div className="header">
              <div className="mapicon">
                <FontAwesomeIcon icon={faMapLocationDot} style={{fontSize:"40px"}}/>
              </div>
              <h1>병원 지도</h1>   
            </div>

            <div className="map">
               <img src={map}/>
            </div>

            <div>
                <label>키워드</label> <input type="submit"/>
            </div>
            
            <div className="footer">
                <ul className="footerDesc">
                  <li>
                     <div className="hospitalList">
                        <p>oo병원 이태원점</p>
                        <p>서울 용산구 녹사평대로 136</p>
                        <p>지번 : 서울 용산구 이태원동 34-14</p>
                        <p>02-790-7300</p>
                     </div>
                  </li>
                  
                </ul>
            </div>
        
        </StyledMain>
        
        
    );
};
export default Map;