import { DaumPostcodeEmbed } from "react-daum-postcode";

const KakaoPostAPI = () => {
  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "500px",
    height: "500px",
  };
  const complete = (data) => {
    let address = data.address;
    console.log(address);

    window.opener.postMessage({ address: address }, "*");
  };
  return (
    <>
      <DaumPostcodeEmbed
        style={postCodeStyle}
        autoClose
        onComplete={complete}
      />
    </>
  );
};

export default KakaoPostAPI;
