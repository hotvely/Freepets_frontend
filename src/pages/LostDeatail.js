import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faComments, faArrowUpFromBracket, faBookmark } from "@fortawesome/free-solid-svg-icons";
const StyledMain = styled.main`
    display: flex;
    flex-direction:column;
    width: 100%;
   
    height: 100vw;
    align-items: center;

    .venner{
        width: 100%;
        border: 2px solid black;
        height: 100px;
    }
    
    .vennerBottom {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 1.75rem;
        margin-bottom: 1.75rem;
        position: relative;

        .full{
            display: flex;
            flex-direction: column;      
            position: absolute;
            width: 100%;
           
            
            .full-line{
              border: 1px solid hsla(220,9%,46%,.3);;   
              width: 100%;

              
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

    .contentBox{
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         
         width: 100%;
        

         .userProfile{
            display: flex;
            flex-direction: row;
           .profile{
            margin: 0px 5px;
           }
           .user{
            margin: 0px 5px;
           }
         }
        .icon{
            
        }
    }
   
   
`;


const LostDeatail = () => {
       return (
          


        <StyledMain>
           <div className="venner">
              <h1>커뮤니티</h1>
              <span>여기는 커뮤니티 게시판입니다(베너)</span>
           </div>

           <div className="vennerBottom">
              <div className="full">
                <div className="full-line"></div>
              </div>

              <div className="vennerText">
                <div className="text-box">
                    <a className="text-blue" href="#">커뮤니티</a>
                </div>
              </div>
           </div>

           <div className="contentBox">
              <div className="userProfile">
                  <div className="profile">
                <img src={"/upload/"} alt="프로필" />
                  </div> 

                  <div className="user">
                <p>작성자 닉네임</p>
                <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                  </div>
              </div>

              <div className="icon">
                 <FontAwesomeIcon icon={faArrowUpFromBracket} style={{}}/>
                 <FontAwesomeIcon icon={faBookmark}/>
              </div>
             

           </div>
           
            

     
          
    
          
             
           </StyledMain>
          
    );
}
export default LostDeatail;