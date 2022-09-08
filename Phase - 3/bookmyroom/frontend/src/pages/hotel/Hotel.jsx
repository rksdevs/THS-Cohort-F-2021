import "./hotel.css";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import MailList from "../../components/MailList";
import Footer from "../../components/footer/Footer";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../components/hooks/useFetch";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${pathId}`);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <CancelIcon className="close" onClick={() => setOpen(false)} />

                <ArrowCircleLeftIcon
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>

                <ArrowCircleRightIcon
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <LocationOnIcon />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get
                a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a 9-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>$945</b> (9 nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Hotel;
