import { useEffect, useRef } from "react";

const HospitalMap = ({ hospitalAddress }) => {

    const mapRef = useRef(null); 
    var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };
      
    useEffect(() => {

        if(hospitalAddress!==undefined) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(hospitalAddress, function(result, status) {
    
                if (status === window.kakao.maps.services.Status.OK) {
                    
                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    var map = new window.kakao.maps.Map(mapRef.current, options);
    
                    var markerPosition = coords;

                    var marker = new window.kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                    });
    
                    marker.setMap(map);
                    map.setCenter(markerPosition);
                }
            })
        }
        
    }, [hospitalAddress])

    return <div ref={mapRef} style={{width: "100%", height: "250px"}}></div>
};

export default HospitalMap;