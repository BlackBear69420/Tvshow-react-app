import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

export default function Details() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    movieName: "",
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const responseData = await res.json();
        setShowDetails(responseData);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  const parseHtmlContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.innerHTML;
  };

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Store user details in localStorage or sessionStorage
    // You can customize this based on your requirements
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Close the popup
    setShowPopup(false);
  };

  // Load user details from localStorage on component mount
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <div className="card-container">
      {showDetails ? (
        <div className="details-container">
          <div className="image-container">
            <img
              src={showDetails.image && showDetails.image.medium}
              alt={showDetails.name}
            />
            <div className="name">
              <h1>{showDetails.name}</h1>
              <p style={{ color: "white" }}>Language: {showDetails.language}</p>
              <p style={{ color: "white" }}>
                Rating: {showDetails.rating && showDetails.rating.average}
              </p>
              <p style={{ color: "white" }}>
                Genres: {showDetails.genres && showDetails.genres.join(", ")}
              </p>
              <button onClick={handlePopupToggle}>Book Your Show</button>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: parseHtmlContent(showDetails.summary),
            }}
          />

          {showPopup && (
            <div className="overlay">
              <div className="popup">
                <h2 style={{ color: "black" }}>Movie booking</h2>
                <form onSubmit={handleFormSubmit}>
                  <p style={{ color: "black" }}>
                    Movie Name: {showDetails.name}
                  </p>
                  <p style={{ color: "black" }}>
                    Language: {showDetails.language}
                  </p>
                  <p style={{ color: "black" }}>
                    Genres:{" "}
                    {showDetails.genres && showDetails.genres.join(", ")}
                  </p>
                  <p style={{ color: "black" }}>
                    Schedule:{" "}
                    {showDetails.schedule &&
                      showDetails.schedule.days.join(", ")}{" "}
                    at {showDetails.schedule && showDetails.schedule.time}
                  </p>

                  <label>
                    Your Name :
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Your Email :
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </label>
                  <button type="submit">Submit</button>
                  <button
                    style={{ width: 300, alignSelf: "center", marginTop: 20 }}
                    onClick={handlePopupToggle}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
