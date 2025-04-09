import React, { memo, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Row, Col, Card } from "react-bootstrap";
import { Title, Meta, Link as HeadLink } from "react-head";
import SubHeader from "../../components/widgets/sub-header";
import placeholderImage from '../../assets/images/products/Royal Infinity/elite/Elite-Scene-1.png';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GET_PRODUCTS, GET_PRODUCT } from "../../product_query/productQuery";

const ProductDetail = () => {
  const { slug } = useParams();

  const { loading: loadingProduct, error: errorProduct, data: dataProduct } = useQuery(GET_PRODUCT, { variables: { slug } });
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS, { variables: { first: 10 } });

  const isLoading = loadingProduct || loadingProducts;
  const hasError = errorProduct || errorProducts;

  const product = dataProduct?.productBySlug;

  const productStructuredData = useMemo(() => {
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.media?.edges?.map(({ node }) => `http://localhost:8080/media/${node.image}`),
      "offers": {
        "@type": "Offer",
        "priceCurrency": "NGN",
        "price": "0",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating || 4.5,
        "reviewCount": "10"
      }
    };
  }, [product]);

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error loading content. Please try again later.</p>;

  return (
    <>
      <Title>{product?.name} | Royal Foam</Title>
      <Meta name="description" content={product?.description?.substring(0, 160)} />
      <Meta property="og:title" content={product?.name} />
      <Meta property="og:description" content={product?.description?.substring(0, 160)} />
      <Meta property="og:type" content="product" />
      {product?.media?.edges?.[0]?.node.image && (
        <Meta property="og:image" content={`http://localhost:8080/media/${product.media.edges[0].node.image}`} />
      )}
      <Meta property="product:brand" content="Royal Foam" />
      <Meta property="product:price:amount" content="0" />
      <Meta property="product:price:currency" content="NGN" />
      {productStructuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }} />
      )}
      
      <SubHeader breadcrumbItems={[{ name: "Home", url: "/" }, { name: product?.name, url: null }]} />
      <div className="content-inner pb-0 container-fluid" id="page_layout">
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={7}>
                    {product?.media?.edges.length > 0 ? (
                      <Swiper spaceBetween={16} slidesPerView={1} navigation modules={[Navigation]} className="product-gallery">
                        {product.media.edges.map(({ node }, idx) => (
                          <SwiperSlide key={idx}>
                            <img alt={node.alt || `${product.name}-${idx}`} src={`http://localhost:8080/media/${node.image}`} className="img-fluid iq-product-img rounded-2 w-100 mb-3" loading="lazy" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <p>No product images available.</p>
                    )}
                  </Col>
                  <Col lg={5} className="mt-4 mt-lg-0">
                    <h1 className="mb-3">{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo(ProductDetail);
