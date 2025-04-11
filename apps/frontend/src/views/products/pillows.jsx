import React, { memo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import SubHeader from "../../components/widgets/sub-header";
import { GET_PRODUCTS, GET_PRODUCT } from "../../product_query/productQuery";
pillows.jsx 
const  SpringMattresses = memo(() => {
  const { loading, error, data, client } = useQuery(GET_PRODUCTS, { variables: { first: 10 } });

  useEffect(() => {
    if (data) {
      console.log(data.allProducts.edges);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <SubHeader title="Luxury Mattresses" />
      <div className="content-inner pb-0 container-fluid" id="page_layout">
        <div className="row my-5">
          {data.allProducts.edges.map(({ node: product }) => {
            const productMedia = product.media.edges.map(({ node }) => node.image);
            const firstValidMedia = productMedia.find(media => media !== '');

            return (
              <div key={product.slug} className="d-grid gap-3 d-grid-template-1fr-19">
                <div className="user-images position-relative overflow-hidden">
                  <Link 
                    data-fslightbox="gallery" 
                    to={`/products/product-detail/${product.slug}`}
                    onMouseOver={() =>
                      client.query({
                        query: GET_PRODUCT,
                        variables: { slug: product.slug },
                      })
                    }
                    style={{ textDecoration: "none" }}
                  >
                    {firstValidMedia ? (
                      <img
                        src={`http://localhost:8080/media/${firstValidMedia}`}
                        alt={product.name}
                        style={{
                          width: "400px",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }} 
                        className="img-fluid rounded"  
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src="/path/to/default-image.png"
                        alt="Default Image"
                        className="img-fluid rounded" 
                        loading="lazy"
                      />
                    )}
                  </Link>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="text-white d-flex justify-content-center align-items-center gap-2">
                            60
                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                              <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                              <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white d-flex justify-content-center align-items-center gap-2">
                            30
                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.99 12.04 21.99C17.85 21.99 22.06 17.25 22.06 11.99C22.06 6.74 17.85 2 12.02 2Z" fill="currentColor"></path>
                              <path d="M15.69 12.07H12.74V8.80996C12.74 8.39996 12.4 8.05996 11.99 8.05996C11.58 8.05996 11.24 8.39996 11.24 8.80996V12.82C11.24 13.23 11.58 13.57 11.99 13.57H15.69C16.1 13.57 16.44 13.23 16.44 12.82C16.44 12.41 16.1 12.07 15.69 12.07Z" fill="currentColor"></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h6 className="mb-1">
                    <Link
                      to={`/products/product-detail/${product.slug}`}
                      className="text-decoration-none"
                      style={{ color: "#000000" }}
                      onMouseOver={() =>
                        client.query({
                          query: GET_PRODUCT,
                          variables: { slug: product.slug },
                        })
                      }
                    >
                      {product.name}
                    </Link>
                  </h6>
                  <p className="text-primary">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default  SpringMattresses;
