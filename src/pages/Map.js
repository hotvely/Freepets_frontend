import styled from "styled-components";
const StyledMain = styled.main`
     display: flex;
    flex-direction:column;
    width: 100%;
   
    height: 100vw;
    align-items: center;

    .venner{
        width: 90%;
        border: 2px solid black;
        height: 100px;
    }
    .header{
       display: flex;
       flex-direction: row;
       justify-content: flex-start;
       width: 90%;
       height: 70px;
       margin-top: 20px;

       h1{
        display: flex;
        align-items: center;
        font-size: 40px;
       }

    }
    .map{
        
        margin-top: 20px;
        border: 2px solid black;
        width: 60%;
        height: 30%;
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
              <h1>커뮤니티</h1>
              <span>여기는 커뮤니티 게시판입니다(베너)</span>
           </div>
            <div className="header">
              <h1>병원 지도</h1>   
            </div>

            <div className="map">
               <h1>병원 api</h1>
            </div>

            <div>
                <label>키워드 : </label>
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