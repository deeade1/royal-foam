import React, { memo, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';

import { AuthContext } from '../context/authContext';
import { GET_ALL_POSTS, GET_ALL_TESTIMONIALS } from '../blogQueries/blogQuery';
import { GET_VIDEOS } from '../videoQuery/video-query';

import BlogWidget from '../components/widgets/blog';
import TestimonialOne from '../components/widgets/testimonial-one';

import HomesSized1 from '../assets/images/HomesSized1.png';
import HomesSized2 from '../assets/images/HomesSized2.png';
import HomesSized3 from '../assets/images/HomesSized3.png';
import HomesSized6 from '../assets/images/HomesSized6.png';
import fact from '../assets/images/fact.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import "../style.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  // Fetch Posts
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_ALL_POSTS, {
    variables: { first: 10 },
  });

  // Fetch Videos
  const { loading: videosLoading, error: videosError, data: videosData } = useQuery(GET_VIDEOS, {
    variables: { first: 10 },
  });

  // Fetch Testimonials
  const { loading: testimonialsLoading, error: testimonialsError, data: testimonialsData } = useQuery(GET_ALL_TESTIMONIALS, {
    variables: { first: 6 },
  });

  // Combined Loading & Error State
  const isLoading = postsLoading || videosLoading || testimonialsLoading;
  const hasError = postsError || videosError || testimonialsError;

  // Memoized random video selection
  const randomVideo = useMemo(() => {
    if (videosData?.allVideos?.edges.length) {
      const videos = videosData.allVideos.edges;
      const randomIndex = Math.floor(Math.random() * videos.length);
      return videos[randomIndex].node;
    }
    return null;
  }, [videosData]);

  // Early Return for Loading/Error States
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center py-5 text-danger">
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner Section */}
      <div className="banner-one">
        <Container>
          <Row>
            {/* Video Section */}
            <Col sm={6} className="banner-img text-center">
              {randomVideo ? (
                <div key={randomVideo.id}>
                  <video controls className="img-fluid" style={{ width: "400px", height: "400px" }}>
                    <source src={`http://localhost:8080/media/${randomVideo.media}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Link to="/videos" className="btn btn-primary mt-3">Watch More</Link>
                </div>
              ) : (
                <p>No videos available.</p>
              )}
            </Col>

            {/* Text Content */}
            <Col sm={6} className="inner-box">
              <p className="mb-2 text-uppercase text-secondary">Sleep good, Look fit, feel fit</p>
              <h1 className="text-secondary mb-4">
                The Joy Of<br /><span className="text-primary">Right Health</span>
              </h1>
              <p className="mb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <div className="d-flex align-items-center store-btn">
                <Link className="btn btn-primary" to="#">Download Free</Link>
                <Link className="btn btn-secondary ms-3" to="#">Become A Distributor</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="section-padding bg-white">
        <Container fluid>
          <Swiper
            spaceBetween={30}
            effect={'fade'}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {[HomesSized1, HomesSized2, HomesSized3, HomesSized6].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`feature-${idx}`} className="img-fluid w-100" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>

      {/* About Section */}
      <div className="section-padding bg-white">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img src={fact} alt="About Us" className="img-fluid" />
            </Col>
            <Col md={6}>
              <p className="mb-2 text-secondary text-uppercase">About Us</p>
              <h2 className="text-secondary mb-4">What they say <span className="text-primary">About Us</span></h2>
              <p>We’ve been manufacturing high quality foam products since 1980.</p>
              <Link to="/about" className="btn btn-primary">Know More</Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Blog Section */}
      <div className="section-card-padding">
        <Container>
          <div className="text-center mb-5">
            <div className="mb-2 text-uppercase text-primary sub-title">Blog</div>
            <h2 className="text-secondary text-capitalize">All the <span className="text-primary">Support you Need</span></h2>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={32}
            modules={[Navigation]}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
            }}
          >
            {postsData?.allPosts?.edges.map(({ node: post }) => (
              <SwiperSlide key={post.id}>
                <Card>
                  <BlogWidget
                    id={post.id}
                    slug={post.slug}
                    media={post.media}
                    blogTitle={post.title}
                    blogText={post.subtitle}
                    blogBody={post.body}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>

      {/* Testimonials Section */}
      <div className="section-padding">
        <Container>
          <div className="text-center mb-5">
            <div className="mb-2 text-uppercase text-primary sub-title">Testimony</div>
            <h2 className="text-secondary customer-txt text-capitalize">What our <span className="text-primary">Customers</span> are saying</h2>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={32}
            modules={[Navigation]}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
            }}
          >
            {testimonialsData?.allTestimonials?.edges.map(({ node: testimonial }, index) => (
              <SwiperSlide key={testimonial.id}>
                <Card>
                  <TestimonialOne
                    Id={index + 1}
                    testTitle={testimonial.title}
                    testText={testimonial.body.length > 150 ? `${testimonial.body.substring(0, 150)}...` : testimonial.body}
                    testImage={testimonial.media ? `http://localhost:8080/media/${testimonial.media}` : "/path/to/default-image.png"}
                    userTitle={testimonial.author?.first_name || "Anonymous"}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default memo(Home);
