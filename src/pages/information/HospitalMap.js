import { useEffect, useRef } from "react";

const HospitalMap = ({hospitalAddress}) => {

    const mapRef = useRef(null); // hook (참조)
    var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
        level: 3
    };
      
    useEffect(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(hospitalAddress, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === window.kakao.maps.services.Status.OK) {
                
                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                
                    // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                });

                var markerPosition = coords;
                var marker = new window.kakao.maps.Marker({
                    position: markerPosition
                });

                var map = new window.kakao.maps.Map(mapRef.current, options);
                marker.setMap(map);
                map.setCenter(coords);
            }
        })
    }, [hospitalAddress])

    return <div ref={mapRef} style={{width: "100%", height: "250px"}}></div>
};

export default HospitalMap;