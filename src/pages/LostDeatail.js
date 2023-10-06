import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faComments, faArrowUpFromBracket, faBookmark } from "@fortawesome/free-solid-svg-icons";
import testImg from "../resources/image.jpg";
import banner from "../resources/bannerTest.png";

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

    .contentHeader{
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         
         width: 90%;
        

         .userProfile{
            display: flex;
            flex-direction: row;
           .profile{
            margin: 0px 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            img{
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
           }
           .user{
            margin: 0px 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .usertTitle{
              display: flex;
              p{
              margin: 5px 0px;
              border: 2px solid #DEDEDE;
              border-radius: 5px;
              padding: 5px;
              font-weight: bolder;
             }
            }
          
            .viewicon{
              margin: 5px 0px;
              span{
                margin-right: 15px;
               }
            }
           }
         }
        .icon{
            
        }
    }

 
    .descHeader{
        width: 90%;
        margin: 15px 0px;
        font-weight: bolder;
        font-size: 45px;
    }
    .desc{
        width: 90%;
        border: 1px solid hsla(220,9%,46%,.3);
        height: 30%;
        margin: 30px 0px;
    }
    .commentProfile {
       // flex: 0 1 10%;
        //margin: 0 15px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
    }
    .commentBox{
      display: flex;
      flex-direction: row;
      width:90%;
      height: 70px;
      margin-top: 30px;
      .commentProfile{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .commentDesc{
        width:100%;
        display: flex;
        margin-left: 25px;
        
        input{
          width:100%;
          border-radius: 5px;
        }
        
      }

    }
    .submit{
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 15px;
      input{
       background-color: #1CC0E4;
       height: 40px;
       width: 100px;
       font-size: large;
       border: #DEDEDE;
       border-radius: 5px;
       color: white;

      }
    }

    .commentBox2{
      width: 90%;
      .comment{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      margin-top: 80px;

      .userProfile{
            display: flex;
            flex-direction: column;
            margin-top: 10px;

       
          .useruser{
         
            display: flex;
            flex-direction: row;

             .profile{
                margin: 0px 5px;
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }  
             }
            

              .user{
                display: flex;
                flex-direction: column;
                justify-content: center;

                p{
                 margin-left: 10px;
                 border: 2px solid #DEDEDE;
                 border-radius: 5px;
                 padding: 5px;
                 font-weight: bolder;
                 
                }
                span{
                  margin-right: 10px;
                }
              }
          }
           .comment-desc{
             padding: 20px;
             margin-top: 10px;
           }

           .commentBox2-button{
            padding: 20px;
            button{
              background-color: white;
              border: 1px solid #DEDEDE;
              border-radius: 5px;
              color: #ACACAC;
            }
           }
           
      }
      
    }
    }

`;



const LostDeatail = () => {

  

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
                    <a className="text-blue" href="#">커뮤니티</a>
                    <span></span>
                </div>
              </div>

              <div className="full">
                <div className="full-line-right"></div>
              </div>
           </div>

           <div className="contentHeader">
              <div className="userProfile">
                  <div className="profile">
                     <img src={testImg} alt="작성자 프로필"/>
                  </div> 

                  <div className="user">
                    <div className="usertTitle">
                      <p style={{fontSize:"18px", fontWeight:"border"}}>흰둥이를 찾자</p>
                    </div>
                    
                    <div className="viewicon">
                      <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                      <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                    </div>
                  </div>
              </div>

              <div className="icon">
                 <FontAwesomeIcon icon={faArrowUpFromBracket} style={{color:"#C9C9C9", margin:"0px 5px", fontSize:"20px"}}/>
                 <FontAwesomeIcon icon={faBookmark} style={{color:"#C9C9C9", margin:"0px 5px", fontSize:"20px"}}/>
              </div>
           </div>
           
           
           <div className="descHeader">
                  <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
           </div>
           <div className="desc">
                   <div>
                       제가 문을 살짝 열어놓고 방 청소를 하고 왔는데 집에 있던 흰둥이가 사라졌어요 ㅠㅠㅠ 
                       나이는 3살, 털은 흰색, 종류는 치와와입니다.
                       저희 흰둥이를 보시게 된다면 채팅 및 010-1234-5678로 연락주세요!!
                   </div>
           </div>

          <div className="commentBox">
             <div className="commentProfile">
               <img src={testImg}></img>
             </div>
             <div className="commentDesc">
               <input type="text" placeholder="작성하려면 로그인이 필요합니다."/>
             </div>
           </div>

           <div className="submit">
            <input type="submit" value="댓글 쓰기"/>
           </div>
          
          <section className="commentBox2">
           <ul className="comment">
              <li className="userProfile">
                 <div className="useruser">
                    <div className="profile">
                     <img src={testImg} alt="작성자 프로필"/>
                    </div> 

                    <div className="user">
                     <p style={{fontSize:"18px", fontWeight:"border"}}>최강 우주 귀요미</p>
                    </div>
                 </div>                

                  <div className="comment-desc">
                     <p>
                     아 진짜 지금 엄청 마음 졸이고 있겠써요,,,,, 흰둥이 어디갔니
                     얼른 돌아와 돌아와 돌아와 어디갔써 흰둥이 어디갓니 어디로 갔니 
                     ㅠㅠㅠ 얼른 찾길 바랄께요 ㅠㅠㅠ
                     </p>  
                  </div>
                  
                  <div  className="commentBox2-button">
                    <button >댓글 쓰기</button>
                    
                    
                  </div>
                  <hr style={{width :"100%", border:"0px",borderTop: "1px solid #7BCFE1"}}/>
              </li>
              
              <li className="userProfile">
                 <div className="useruser">
                    <div className="profile">
                     <img src={testImg} alt="작성자 프로필"/>
                    </div> 

                    <div className="user">
                     <p style={{fontSize:"18px", fontWeight:"border"}}>최강 우주 귀요미</p>
                    </div>
                 </div>                

                  <div className="comment-desc">
                     <p>
                     아 진짜 지금 엄청 마음 졸이고 있겠써요,,,,, 흰둥이 어디갔니
                     얼른 돌아와 돌아와 돌아와 어디갔써 흰둥이 어디갓니 어디로 갔니 
                     ㅠㅠㅠ 얼른 찾길 바랄께요 ㅠㅠㅠ
                     </p>  
                  </div>
                  
                  <div  className="commentBox2-button">
                    <button>댓글 쓰기</button>
                  </div>
                  <hr style={{width :"100%", border:"0px",borderTop: "1px solid #7BCFE1"}}/>
              </li>

              <li className="userProfile">
                 <div className="useruser">
                    <div className="profile">
                     <img src={testImg} alt="작성자 프로필"/>
                    </div> 

                    <div className="user">
                     <p style={{fontSize:"18px", fontWeight:"border"}}>최강 우주 귀요미</p>
                    </div>
                 </div>                

                  <div className="comment-desc">
                     <p>
                     아 진짜 지금 엄청 마음 졸이고 있겠써요,,,,, 흰둥이 어디갔니
                     얼른 돌아와 돌아와 돌아와 어디갔써 흰둥이 어디갓니 어디로 갔니 
                     ㅠㅠㅠ 얼른 찾길 바랄께요 ㅠㅠㅠ
                     </p>  
                  </div>
                  
                  <div  className="commentBox2-button">
                    <button>댓글 쓰기</button>
                  </div>
                  <hr style={{width :"100%", border:"0px",borderTop: "1px solid #7BCFE1"}}/>
              </li>
            </ul>
          </section>
          
          
    
          
             
           </StyledMain>
          
    );
}
export default LostDeatail;