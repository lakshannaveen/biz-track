import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getBannerImages } from "../../action/Common";
function NewCarousel() {
  const { responseBody } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  useEffect(() => {
    if (responseBody) {
      dispatch(getBannerImages());
    }
  }, [dispatch]);

  return (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {responseBody.map((name, index) => (
          <div className="slide" key={index}>
            <img
              src={`https://esystems.cdl.lk/backend-test/BizTrack/home/GetBannerImg?imgName=${name}`}
              // style={{height:200,width:'100%'}}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NewCarousel;
