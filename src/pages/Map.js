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
            
            <div className="footer">
                <div className="footerDesc">
                  <p>여긴 병원정보 기입????????</p>
                  <p> oo 병원</p>
                  <p>24시 병원</p>
                </div>
            </div>
        
        </StyledMain>
        
        
    );
};
export default Map;