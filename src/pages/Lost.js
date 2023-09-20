import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const StyledMain = styled.div`
    display: flex;
    width: 100vw;
    height: 100vw;
    justify-content: center;


`;

const BorderBox = styled.main`
      width: 1200px;
      height: 800px;
      border: 2px solid #C1F1FC;
      margin-right: 200px;
`;
const Lost = () => {
       return (
           <StyledMain>
            
            <BorderBox>
               <select>
                   <option value="1">추천 순</option>
                   <option value="2">댓글 순</option>
                   <option value="3">조회 순</option>
               </select>
                

               {/* <h1>Lost 게시판 </h1>    */}
              <label>검색</label><input type="text" />
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#138CA7"}}/>
              <section>
                <a><p>우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</p></a>

              </section>

            <table className="Lost"> 
             <tbody>
               <tr>
                <td>123</td>
              </tr>
              <tr>
                <td>123</td>
              </tr>
              <tr>
                <td>123</td>
              </tr>
            </tbody>
           </table>

    
            </BorderBox>
             
           </StyledMain>
           
       );


};
export default Lost;