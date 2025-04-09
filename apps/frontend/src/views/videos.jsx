import React, { memo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Col, Row, Container } from "react-bootstrap";
import { GET_VIDEOS, GET_VIDEO } from "../videoQuery/video-query";
const Video = memo(() => {
  // Fetch all videos
  const { loading, error, data } = useQuery(GET_VIDEOS, {
    variables: { first: 10 },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.allVideos?.edges?.length) {
      console.log("Fetched Video URLs:", data.allVideos.edges.map(({ node }) => `http://localhost:8080/media/${node.media}`));
    }
  }, [data]);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>Error loading videos: {error.message}</div>;

  // Get all video nodes
  const videoEdges = data?.allVideos?.edges || [];

  return (
    <div className="content-inner pb-0 container-fluid" id="page_layout">
      <Container>
        <h2 className="text-center mb-4">All Videos</h2>
        <Row className="justify-content-center">
          {videoEdges.length > 0 ? (
            videoEdges.map(({ node }) => (
              <Col key={node.id} sm={6} md={4} className="text-center mb-4">
                <video controls className="img-fluid rounded" style={{ width: "100%", maxHeight: "400px" }}>
                  <source src={`http://localhost:8080/media/${node.media}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
            ))
          ) : (
            <p className="text-center">No videos available.</p>
          )}
        </Row>
      </Container>
    </div>
  );
});

export default Video;
