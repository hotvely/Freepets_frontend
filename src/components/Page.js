import '../css/page.css'

const Page = () => {
    return (
          <div className="page">
            <ul className="pagination">
              <li>
                <a href="#" id="first">
                  처음 페이지
                </a>
              </li>
              <li>
                <a href="#" id="arrow-left">
                  ◀
                </a>
              </li>
              <li>
                <a href="#" id="active-num">
                  1
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  2
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  3
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  4
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  5
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  6
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  7
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  8
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  9
                </a>
              </li>
              <li>
                <a href="#" id="arrow-right">
                  ▶
                </a>
              </li>
              <li>
                <a href="#" id="last">
                  마지막 페이지
                </a>
              </li>
            </ul>
          </div>
    )
}

export default Page;