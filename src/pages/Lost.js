import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faEye, faComments } from "@fortawesome/free-solid-svg-icons";
const StyledMain = styled.main`
    display: flex;
    flex-direction:column;
    width: 100%;
   
    height: 100vw;
    align-items: center;

    .select{
        width: 100%;
     display:flex;
     justify-content: space-between;
     align-items: center;
    .option
    {
        margin: 20px  20px;
        
    }
     .search{
        margin-right: 100px;
     }
    }

   
   
`;

const BorderBox = styled.div`
      width: 1200px;
      border: 2px solid #C1F1FC;
    

     
`;

const MainContent = styled.div`
    width: 100%;
    border: 5px solid black;//#C1F1FC;
  
    section{
        margin: 50px 50px;

        .post{
            margin: 15px 10px;
        }
    }   
   
`;


const Paging = styled.div`
     display: flex;
     flex-direction: row;
    justify-content: center;
    margin: 20px 0;
     a{
        padding: 5px;

     }

`;
const Lost = () => {
       return (
          


        <StyledMain>
           
            <div className="select">
                <div className="option"> 
                    <select>
                        <option value="1">추천 순</option>
                        <option value="2">댓글 순</option>
                        <option value="3">조회 순</option>
                    </select>
                </div>
                <div className="search">
                    {/* <h1>Lost 게시판 </h1>    */}
                    <label>검색</label><input type="text" id="search" name="search"/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#138CA7"}}/>
                </div>
            </div>
            

            <MainContent>
                <section>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>  
                        <hr style={{width:"100%"}}/>
                    </div>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>    <hr style={{width:"100%"}}/>
                    </div>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>    <hr style={{width:"100%"}}/>
                    </div>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>    <hr style={{width:"100%"}}/>
                    </div>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>    <hr style={{width:"100%"}}/>
                    </div>
                    <div className="post">
                        <a href="#">
                            <div>
                            <span id="profile">프로필</span>
                            <span id="date">7일 전</span>
                            </div>
                            <div>
                            <h1>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</h1>
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#1FB1D1"}}/><span id="like">50</span> <FontAwesomeIcon icon={faEye} style={{color:"#1FB1D1"}}/><span id="views">150</span> 
                            <FontAwesomeIcon icon={faComments} style={{color:"#1FB1D1"}}/><span id="comment">30</span>   
                            </div>
                        </a>    <hr style={{width:"100%"}}/>
                    </div>
                    
                </section>
            </MainContent>
            <Paging>
                <div>
                    <a href="#"> Prev</a>
                    <a href="#">Num</a>
                    <a href="#">Next</a>
                </div>                    
            </Paging>
    
          
             
           </StyledMain>
          
       );


};
export default Lost;