import React, { memo } from 'react';
import { Card, Col, Container, FormGroup, Row, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../../blogQueries/blogQuery';
import BlogWidget from '../../components/widgets/blog';
import placeholderImage from '../../assets/images/blog/01.webp';

const BlogDetail = () => {
  const { slug } = useParams();

  // Fetch post by slug
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { slug },
  });

  const post = data?.postBySlug;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  return (
    <div className="inner-box">
      <Container>
        <Row>
          <Col lg={12}>
            {post ? (
              <BlogWidget
                media={post.media}
                blogTitle={post.title}
                blogText={post.subtitle}
                blogBody={post.body}
                blogDate={post.dateCreated}
                blogAuther={post.author?.firstName || 'Admin'}
                slug={post.slug}
                blogImage={placeholderImage} // fallback image
              />
            ) : (
              <p>Post not found.</p>
            )}
          </Col>

          {/* Comment Form */}
          <Col lg={12}>
            <Card className="mt-4">
              <Card.Body>
                <h3>Leave a Reply</h3>
                <p className="my-4">
                  Your Email Address Will Not Be Published. Required Fields Are Marked *
                </p>
                <Form>
                  <FormGroup className="mb-3">
                    <Form.Label htmlFor="your-message">Comment *</Form.Label>
                    <Form.Control as="textarea" rows={6} id="your-message" required />
                  </FormGroup>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="full-name">Name *</Form.Label>
                    <Form.Control type="text" id="full-name" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="your-email">Email *</Form.Label>
                    <Form.Control type="email" id="your-email" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="your-website">Website</Form.Label>
                    <Form.Control type="url" id="your-website" />
                  </Form.Group>

                  <Form.Check className="mb-3">
                    <Form.Check.Input type="checkbox" id="save-info" />
                    <Form.Check.Label htmlFor="save-info">
                      Save my name, email, and website in this browser for the next time I comment.
                    </Form.Check.Label>
                  </Form.Check>

                  <button type="submit" className="btn btn-primary">
                    Post Comment
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(BlogDetail);
