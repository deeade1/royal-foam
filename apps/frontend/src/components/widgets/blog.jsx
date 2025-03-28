import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const BlogWidget = memo(({ id, media, blogTitle, blogText, blogBody, slug }) => {
  const mediaUrl = `http://localhost:8080/media/${media}`;

  const isImage = /\.(jpeg|jpg|gif|png|webp)$/i.test(media);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

  return (
    <>
      {/* Media Section */}
      <Link to={`/blog/blog-detail/${slug}`} style={{ textDecoration: 'none' }}>
        {isImage && (
          <img
            src={mediaUrl}
            alt={blogTitle}
            className="img-fluid"
            loading="lazy"
            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
          />
        )}

        {isVideo && (
          <video
            controls
            className="img-fluid"
            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            preload="metadata"
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {!isImage && !isVideo && (
          <div className="ratio ratio-16x9">
            <iframe
              loading="lazy"
              src={mediaUrl}
              title={blogTitle}
              allowFullScreen
              style={{ width: '100%' }}
            ></iframe>
          </div>
        )}
      </Link>

      {/* Blog Text */}
      <Card.Body>
        <h6 className="my-2">{blogTitle}</h6>
        {blogText && <p>{blogText}</p>}
        {blogBody && <p>{blogBody}</p>}
      </Card.Body>
    </>
  );
});

export default BlogWidget;
