import React, { Fragment, memo } from "react";
import { Card } from "react-bootstrap";
import RatingFill from "../widgets/rating-star";

const TestimonialOne = memo(({ testTitle, testText, testImage, userTitle }) => {
  return (
    <Fragment>
      <div className="position-relative">
        <div className="shape"></div>
        <Card.Body className="position-relative">
          <h6 className="mb-3 mt-3">{testTitle}</h6>
          <p>{testText}</p>
          <div className="border-bottom"></div>
          <div className="d-flex align-items-center mt-3">
            {/* ✅ Show Image with Fallback if No Media Exists */}
            <img
              src={testImage ? testImage : "/path/to/default-user.png"} // ✅ Fallback image
              alt={userTitle || "Anonymous"} // ✅ Handle missing name
              className="img-fluid rounded-pill"
              style={{ width: "50px", height: "50px", objectFit: "cover" }} // ✅ Ensure proper display
            />
            <div className="ms-3">
              <p className="mb-2">{userTitle || "Anonymous"}</p> {/* ✅ Use `first_name`, fallback to "Anonymous" */}
              <RatingFill unfillStar={1} fillStar={4} />
            </div>
          </div>
        </Card.Body>
      </div>
    </Fragment>
  );
});

export default TestimonialOne;
