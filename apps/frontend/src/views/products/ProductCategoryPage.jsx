import React, { memo, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Title, Meta, Link as HeadLink } from "react-head";
import SubHeader from "../../components/widgets/sub-header";
import placeholderImage from '../../assets/images/products/Royal Infinity/elite/Elite-Scene-1.png';
import { GET_PRODUCTS } from "../../product_query/productQuery";

const ProductCategoryPage = ({ categoryName }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { first: 50 },
  });

  const filteredProducts = useMemo(() => {
    if (!data?.allProducts?.edges) return [];
    return data.allProducts.edges.filter(({ node: product }) => {
      const category = product?.productCategory;
      return (
        category?.name === categoryName || 
        category?.parent?.name === categoryName
      );
    });
  }, [data, categoryName]);

  const categoryStructuredData = useMemo(() => {
    const productList = filteredProducts.map(({ node: product }) => ({
      "@type": "Product",
      "name": product.name,
      "url": `http://localhost:3000/products/product-detail/${product.slug}`,
      "image": product?.media?.edges?.[0]?.node?.image 
        ? `http://localhost:8080/media/${product.media.edges[0].node.image}`
        : placeholderImage
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${categoryName} Products`,
      "description": `Browse our collection of ${categoryName} products`,
      "hasPart": productList
    };
  }, [filteredProducts, categoryName]);

  const breadcrumbItems = useMemo(() => [
    { name: "Home", url: "/" },
    { name: categoryName, url: null }
  ], [categoryName]);

  const handleHover = useCallback((slug) => {
    console.log(`Prefetching data for: ${slug}`);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Title>{categoryName} Products | Royal Foam</Title>
      <Meta name="description" content={`Browse our premium collection of ${categoryName} products`} />
      <Meta property="og:title" content={`${categoryName} Products | Royal Foam`} />
      <Meta property="og:description" content={`Discover our ${categoryName} collection`} />
      <Meta property="og:type" content="website" />
      <HeadLink rel="canonical" href={`http://localhost:3000/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />

      <SubHeader breadcrumbItems={breadcrumbItems} />

      <div className="content-inner pb-0 container-fluid" id="page_layout">
        <h1 className="text-center my-4">{categoryName} Products</h1>

        <div className="row my-5 justify-content-center">
          {filteredProducts.length === 0 ? (
            <p className="text-center">No products found under {categoryName}.</p>
          ) : (
            filteredProducts.map(({ node: product }) => {
              const productMedia = product?.media?.edges?.[0]?.node?.image;
              const productImage = productMedia
                ? `http://localhost:8080/media/${productMedia}`
                : placeholderImage;

              return (
                <div key={product.slug} className="col-md-3 mb-4 d-flex flex-column align-items-center">
                  <div className="user-images position-relative overflow-hidden">
                    <Link
                      to={`/products/product-detail/${product.slug}`}
                      onMouseOver={() => handleHover(product.slug)}
                      className="text-decoration-none"
                      aria-label={`View ${product.name} details`}
                    >
                      <img
                        src={productImage}
                        alt={product.name}
                        className="img-fluid rounded"
                        loading="lazy"
                        width="300"
                        height="300"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="mt-3 text-center">
                    <h2 className="h6 mb-1">
                      <Link
                        to={`/products/product-detail/${product.slug}`}
                        className="text-decoration-none text-dark"
                      >
                        {product.name}
                      </Link>
                    </h2>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ProductCategoryPage);
