import React, { memo, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import { AuthContext } from '../../context/authContext';
import { GET_ALL_POSTS } from '../../blogQueries/blogQuery';
//import BlogWidget from '../../components/widgets/blog';
import SubHeader from '../../components/widgets/sub-header';
import {Row, Col, Nav, Tab, Button, Card} from 'react-bootstrap'


const Blog = memo(() => {
    const [toggleState, setToggleState] = useState('all');
    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        variables: { first: 50 }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <SubHeader title={"Blog"} />
            
            <div className="content-inner pb-0 container-fluid" id="page_layout">
					<div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0 me-auto">Royal Blog</h4>
                        <div className="d-flex justify-content-end">
                            <Nav as="ul" className="nav-tabs nav-tunnel nav-slider">
                                <Nav.Item as="li" role="presentation">
                                    <Nav.Link
                                        className={toggleState === 'all' ? "tabs active bg-primary" : "tabs d-flex align-items-center"}
                                        onClick={() => setToggleState('all')}
                                        data-bs-toggle="tab"
                                        data-bs-target="#content-card-all"
                                        role="tab"
                                        aria-controls="content-card-all"
                                        aria-selected={toggleState === 'all'}
                                    >
                                        All Blog
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" role="presentation">
                                    <Nav.Link
                                        className={toggleState === 'detail' ? "tabs active bg-primary" : "tabs d-flex align-items-center"}
                                        onClick={() => setToggleState('detail')}
                                        data-bs-toggle="tab"
                                        data-bs-target="#content-card-popular"
                                        role="tab"
                                        aria-controls="content-card-detail"
                                        aria-selected={toggleState === 'detail'}
                                    >
                                       Blog Detail 
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" role="presentation">
                                    <Nav.Link
                                        className={toggleState === 'trending' ? "tabs active bg-primary" : "tabs d-flex align-items-center"}
                                        onClick={() => setToggleState('trending')}
                                        data-bs-toggle="tab"
                                        data-bs-target="#content-card-trending"
                                        role="tab"
                                        aria-controls="content-card-trending"
                                        aria-selected={toggleState === 'trending'}
                                    >
                                       Trending Blog
                                    </Nav.Link>
                                </Nav.Item>
								<Nav.Item as="li" role="presentation">
                                    <Nav.Link
                                        className={toggleState === 'comments' ? "tabs active bg-primary" : "tabs d-flex align-items-center"}
                                        onClick={() => setToggleState('comments ')}
                                        data-bs-toggle="tab"
                                        data-bs-target="#content-card-comments "
                                        role="tab"
                                        aria-controls="content-card-comments "
                                        aria-selected={toggleState === 'comments '}
                                    >
                                        Comments 
                                    </Nav.Link>
                                </Nav.Item>
								<Nav.Item as="li" role="presentation">
                                    <Nav.Link
                                        className={toggleState === 'category' ? "tabs active bg-primary" : "tabs d-flex align-items-center"}
                                        onClick={() => setToggleState('category')}
                                        data-bs-toggle="tab"
                                        data-bs-target="#content-card-category"
                                        role="tab"
                                        aria-controls="content-card-category"
                                        aria-selected={toggleState === 'category'}
                                    >
                                       Category
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
					
					<Tab.Container activeKey={toggleState}>
                        <Tab.Content>
                            <Tab.Pane eventKey="all" className={toggleState === 'all' ? "content active-content" : "content"} id="content-card-all" role="tabpanel">
                                
                                   <div class="row">
                                        <div class="col-lg-8">
                                            <div class="overflow-hidden blog-data-slider slider-circle-btn position-relative swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                                <ul class="p-0 m-0 mb-2 swiper-wrapper list-inline" id="swiper-wrapper-89c4641223aa70f6" aria-live="polite" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
                                                    <li class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style={{width: "423px", marginRight: "32px"}}>
                                                        <div class="card iq-incoming-blogs">
                                                            <div class="card-body card-thumbnail">
                                                                <div class="row align-items-center">
                                                                    <div class="col-md-9">
                                                                        <img src="../blog/assets/images/blog-dashboard/01.png" alt="02" class="img-fluid me-0 mb-3 mb-md-0 iq-blog-img" loading="lazy" />
                                                                    </div>
                                                                    <div class="col-md-3 ps-md-2">
                                                                        <div class="d-flex flex-column justify-content-center">
                                                                            <small class="text-primary">
                                                                                14 Dec 2021
                                                                            </small>
                                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="Summer Cocktails and Mocktails">Summer Cocktails and Mocktails</h4>
                                                                            </a>
                                                                            <div class="d-flex mb-3 gap-2">
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Food">Food</a><span> | </span>
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Simmons">Simmons</a>
                                                                            </div>
                                                                            <div>
                                                                                <button type="button" class="btn btn-primary">Read More</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                    
                                                    </li>
                                                    <li class="swiper-slide swiper-slide-next" role="group" aria-label="2 / 3" style={{width: "423px", marginRight: "32px"}}>
                                                        <div class="card iq-incoming-blogs">
                                                            <div class="card-body card-thumbnail">
                                                                <div class="row align-items-center">
                                                                    <div class="col-md-9">
                                                                        <img src="../blog/assets/images/blog-dashboard/13.png" alt="02" class="img-fluid me-0 mb-3 mb-md-0 iq-blog-img" loading="lazy" />
                                                                    </div>
                                                                    <div class="col-md-3 ps-md-2">
                                                                        <div class="d-flex flex-column justify-content-center">
                                                                            <small class="text-primary">
                                                                                20 Dec 2021
                                                                            </small>
                                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="Curious About Vegan Skincare?">Curious About Vegan Skincare?</h4>
                                                                            </a>
                                                                            <div class="d-flex mb-3 gap-2">
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Lifestyle">Lifestyle</a><span> | </span>
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Jenny Wilson">Jenny Wilson</a>
                                                                            </div>
                                                                            <div>
                                                                                <button type="button" class="btn btn-primary">Read More</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                    </li>
                                                    <li class="swiper-slide" role="group" aria-label="3 / 3" style={{width: "423px", marginRight: "32px"}}>
                                                        <div class="card iq-incoming-blogs">
                                                            <div class="card-body card-thumbnail">
                                                                <div class="row align-items-center">
                                                                    <div class="col-md-9">
                                                                        <img src="../blog/assets/images/blog-dashboard/14.png" alt="02" class="img-fluid me-0 mb-3 mb-md-0 iq-blog-img" loading="lazy" />
                                                                    </div>
                                                                    <div class="col-md-3 ps-md-2">
                                                                        <div class="d-flex flex-column justify-content-center">
                                                                            <small class="text-primary">
                                                                                22 Dec 2021
                                                                            </small>
                                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="Foods for a Healthy System">Foods for a Healthy System</h4>
                                                                            </a>
                                                                            <div class="d-flex mb-3 gap-2">
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Health">Health</a><span> | </span>
                                                                                <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Jane cooper">Jane cooper</a>
                                                                            </div>
                                                                            <div>
                                                                                <button type="button" class="btn btn-primary">Read More</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                    </li>
                                                </ul>
                                                <div class="swiper-button swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-89c4641223aa70f6" aria-disabled="false"></div>
                                                <div class="swiper-button swiper-button-prev swiper-button-disabled" tabIndex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-89c4641223aa70f6" aria-disabled="true"></div>
                                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4 class="card-title">Author of the Week</h4>
                                                </div>
                                                <div class="card-body card-thumbnail">
                                                    <div class="d-flex align-items-center">
                                                        <img class="img-fluid rounded-circle avatar-130" src="../blog/assets/images/blog-avatar/01.png" alt="user-img" loading="lazy" />
                                                        <div class="ms-3">
                                                            <h6 class="mb-3">Loren Banks</h6>
                                                            <div class="d-flex justify-content-start align-items-center gap-2">
                                                                <span class="text-primary">Travel </span>
                                                                <span> | </span>
                                                                <span class="d-flex  align-items-center gap-2">
                                                                    <svg class="icon-18" width="18" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 0.677006L11.9317 4.32776C12.1108 4.68616 12.4565 4.93467 12.8573 4.99218L16.9453 5.58062C17.9554 5.72644 18.3573 6.95054 17.6263 7.65194L14.6702 10.4924C14.3797 10.7718 14.2474 11.1733 14.3162 11.5676L15.0138 15.5778C15.1856 16.5698 14.1298 17.3267 13.227 16.8574L9.57321 14.9627C9.21502 14.7768 8.78602 14.7768 8.42679 14.9627L4.773 16.8574C3.87023 17.3267 2.81439 16.5698 2.98724 15.5778L3.68385 11.5676C3.75257 11.1733 3.62033 10.7718 3.32982 10.4924L0.37368 7.65194C-0.357285 6.95054 0.0446417 5.72644 1.05466 5.58062L5.14265 4.99218C5.54354 4.93467 5.89028 4.68616 6.06937 4.32776L7.89574 0.677006C8.34765 -0.225669 9.65235 -0.225669 10.1043 0.677006Z" fill="#FFD329"></path>
                                                                    </svg> <span>4.2</span>
                                                                </span>
                                                            </div>
                                                            <p class="my-4">Elit vitae neque velit mattis elementum egestas non, Sem eget.</p>
                                                            <div class="d-flex gap-3">
                                                                <a href="javascript:void(0)">
                                                                    <svg class="icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M23.9998 12C23.9998 5.37234 18.6273 0 12.0007 0C5.37201 0 0 5.37218 0 12C0 18.6268 5.37217 24 12.0007 24C18.6275 24 23.9998 18.6268 23.9998 12Z" fill="#3D83D9"></path>
                                                                        <path d="M9.06396 9.07227H6.28613V17.011H9.06396V9.07227Z" fill="white"></path>
                                                                        <path d="M7.67514 5.10254C6.80501 5.10254 6.12388 5.90215 6.32007 6.80286C6.43403 7.32607 6.86083 7.74668 7.38588 7.85212C8.28124 8.03193 9.06397 7.35414 9.06397 6.49153C9.06397 5.72568 8.44333 5.10254 7.67514 5.10254Z" fill="white"></path>
                                                                        <path d="M18.1938 11.511C18.0069 10.0148 17.2585 9.07227 15.2358 9.07227C13.8002 9.07227 13.2293 9.29619 12.9001 9.92284V9.07227H10.6514V17.011H12.9656V12.8554C12.9656 11.818 13.1622 11.0344 14.4449 11.0344C15.7092 11.0344 15.8108 11.9988 15.8108 12.9228V17.0112H18.1939C18.1938 17.0112 18.2379 11.8608 18.1938 11.511Z" fill="white"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0)">
                                                                    <svg class="icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M24.0002 11.9992C24.0002 5.37225 18.6279 0 12 0C5.37242 0 0 5.37225 0 11.9992C0 18.6262 5.37242 24 12 24C18.6281 24 24.0002 18.6262 24.0002 11.9992Z" fill="#395196"></path>
                                                                        <path d="M13.0575 9.15703V8.02035C13.0575 7.46672 13.427 7.33737 13.6857 7.33737C13.9452 7.33737 15.2811 7.33737 15.2811 7.33737V4.90325L13.0846 4.89355C10.6466 4.89355 10.093 6.71004 10.093 7.87296V9.15703H8.68359V12.0004H10.1052C10.1052 15.2223 10.1052 19.1073 10.1052 19.1073H12.9477C12.9477 19.1073 12.9477 15.1827 12.9477 12.0004H15.0575L15.317 9.15703H13.0575V9.15703Z" fill="white"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-8">
                                        <div>
                                        <div class="d-flex justify-content-between mb-4">
                                            <h3 class="mb-0">Trending Blogs</h3>
                                            <a href="../blog/blog-detail.html" class="text-body">View All</a>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6">
                                                <div class="card ">
                                                    <div class="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-dashboard/07.png" alt="02" class="img-fluid w-100 rounded object-cover " loading="lazy" />
                                                    </div>
                                                    <div class="card-body card-thumbnail">
                                                        <div>
                                                            <small class="text-primary">
                                                                02 Dec 2021
                                                            </small>
                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Expierience: If more of us valued food and cheer and song above hoarded gold.">The Expierience: If more of us valued food and cheer and song above hoarded gold.</h4>
                                                            </a>
                                                            <div class="d-flex gap-3">
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure">Travel</a><span> | </span>
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                            </div>
                                                            <p class="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas dolor at feugiat in tempor maecenas placerat...</p>
                                                            <div>
                                                                <a href="../blog/blog-detail.html" role="button" class="btn btn-primary">Read More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                    </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="card ">
                                                    <div class="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-dashboard/05.png" alt="02" class="img-fluid w-100 rounded object-cover " loading="lazy" />
                                                    </div>
                                                    <div class="card-body card-thumbnail">
                                                        <div>
                                                            <small class="text-primary">
                                                                02 Dec 2021
                                                            </small>
                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Ultimate Travel Guide: What To Do, See &amp; Eat.">The Ultimate Travel Guide: What To Do, See &amp; Eat.</h4>
                                                            </a>
                                                            <div class="d-flex gap-3">
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure">Travel</a><span> | </span>
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                            </div>
                                                            <p class="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas dolor at feugiat in tempor maecenas placerat...</p>
                                                            <div>
                                                                <a href="../blog/blog-detail.html" role="button" class="btn btn-primary">Read More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                    </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="card ">
                                                    <div class="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-dashboard/06.png" alt="02" class="img-fluid w-100 rounded object-cover " loading="lazy" />
                                                    </div>
                                                    <div class="card-body card-thumbnail">
                                                        <div>
                                                            <small class="text-primary">
                                                                03 Aug 2021
                                                            </small>
                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="WIT AND DELIGHT: The Advice From A Twenty Something">WIT AND DELIGHT: The Advice From A Twenty Something</h4>
                                                            </a>
                                                            <div class="d-flex gap-3">
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure">Travel</a><span> | </span>
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                            </div>
                                                            <p class="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas dolor at feugiat in tempor maecenas placerat...</p>
                                                            <div>
                                                                <a href="../blog/blog-detail.html" role="button" class="btn btn-primary">Read More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                  
                                                </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="card ">
                                                    <div class="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-dashboard/07.png" alt="02" class="img-fluid w-100 rounded object-cover " loading="lazy" />
                                                    </div>
                                                    <div class="card-body card-thumbnail">
                                                        <div>
                                                            <small class="text-primary">
                                                                02 Dec 2021
                                                            </small>
                                                            <a href="../blog/blog-detail.html" class="iq-title">
                                                                <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Foreign and Domestic Culinary Adventures: An Art">The Foreign and Domestic Culinary Adventures: An Art</h4>
                                                            </a>
                                                            <div class="d-flex gap-3">
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure">Travel</a><span> | </span>
                                                                <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                            </div>
                                                            <p class="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas dolor at feugiat in tempor maecenas placerat...</p>
                                                            <div>
                                                                <a href="../blog/blog-detail.html" role="button" class="btn btn-primary">Read More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                    
                                            </div>
                                        </div>
                                    </div>
        </div>
        <div class="col-lg-4">
            <div>
                <div class="d-flex justify-content-between mb-4">
                    <h3 class="mb-0">Top Categories</h3>
                    <a href="../blog/blog-detail.html" class="text-body">View All</a>
                </div>
                <div class="row row-cols-1 row-cols-md-2">
                    <div class="col">
                        <div class="card">
                            <div class="card-body card-thumbnail">
                                <img src="../blog/assets/images/blog-dashboard/09.png" class="img-fluid object-cover iq-top-categories" alt="Top-Categories" loading="lazy" />
                                <div class="text-center">
                                    <h5 class="text-ellipsis short-1">Food</h5>
                                    <small>6542 Post</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-body card-thumbnail">
                                <img src="../blog/assets/images/blog-dashboard/10.png" class="img-fluid object-cover iq-top-categories" alt="01" loading="lazy" />
                                <div class="text-center">
                                    <h5 class="text-ellipsis short-1">Travel</h5>
                                    <small>3545 Post</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-body card-thumbnail">
                                <img src="../blog/assets/images/blog-dashboard/11.png" class="img-fluid object-cover iq-top-categories" alt="01" loading="lazy" />
                                <div class="text-center">
                                    <h5 class="text-ellipsis short-1">Workspace</h5>
                                    <small>1565 Post</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-body card-thumbnail">
                                <img src="../blog/assets/images/blog-dashboard/12.png" class="img-fluid object-cover iq-top-categories" alt="01" loading="lazy" />
                                <div class="text-center">
                                    <h5 class="text-ellipsis short-1">Photography</h5>
                                    <small>8985 Post</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Suggested Writers For You</h4>
                </div>
                <div class="card-body d-flex flex-column gap-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/02.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Jane Cooper</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 2.5
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/03.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Wade Warren</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 5.0
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/04.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Jacob Jones</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 3.5
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/05.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Cody Fisher</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 4.8
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/06.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Dianne Russell</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 2.4
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img class="img-fluid avatar-50 rounded-circle" src="../blog/assets/images/blog-avatar/04.png" alt="01" loading="lazy" />
                            <div>
                                <h6>Jacob Jones</h6>
                                <small class="text-ellipsis short-1">Lorem ipsum dolor consectetur sit amet.</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <svg class="icon-18" width="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z" fill="#FFD329"></path>
                            </svg> 3.5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row row-cols-1">
        <div class="d-flex pb-4 align-items-center justify-content-between">
            <h4 class="mb-0">Upcoming Blogs</h4>
            <a href="../blog/blog-detail.html" class="text-body">View All</a>
        </div>
        <div class="overflow-hidden upcoming-blog-slider position-relative slider-circle-btn swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
            <ul class="p-0 m-0 mb-4 swiper-wrapper list-inline" id="swiper-wrapper-271a9a19d278b1073" aria-live="polite" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
                <li class="swiper-slide card-slide swiper-slide-active" role="group" aria-label="1 / 5" style={{width: "423px", marginRight: "32px"}}>
                    <div class="card mb-0">
                        <div class="card-body card-thumbnail">
                            <div class="d-flex align-items-center iq-upcoming-blogs gap-3">
                                <img src="../blog/assets/images/blog-dashboard/02.png" alt="02" class="img-fluid object-cover rounded" loading="lazy" />
                                <div class="d-flex flex-column justify-content-center">
                                    <small class="text-primary">
                                        14 Dec 2021
                                    </small>
                                    <a href="../blog/blog-detail.html" class="iq-title">
                                        <h4 class="mt-2 mb-3 text-ellipsis short-1" data-bs-toggle="tooltip" data-bs-original-title="How to Make Green Bean">How to Make Green Bean</h4>
                                    </a>
                                    <div class="d-flex mb-4 gap-2">
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Food">Food</a><span> | </span>
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Simmons">Simmons</a>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-primary">Notify Me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>                <li class="swiper-slide card-slide swiper-slide-next" role="group" aria-label="2 / 5" style={{width: "423px", marginRight: "32px"}}>
                    <div class="card mb-0">
                        <div class="card-body card-thumbnail">
                            <div class="d-flex align-items-center iq-upcoming-blogs gap-3">
                                <img src="../blog/assets/images/blog-dashboard/03.png" alt="02" class="img-fluid object-cover rounded" loading="lazy" />
                                <div class="d-flex flex-column justify-content-center">
                                    <small class="text-primary">
                                        20 Dec 2021
                                    </small>
                                    <a href="../blog/blog-detail.html" class="iq-title">
                                        <h4 class="mt-2 mb-3 text-ellipsis short-1" data-bs-toggle="tooltip" data-bs-original-title="Curious About Vegan Skincare?">Curious About Vegan Skincare?</h4>
                                    </a>
                                    <div class="d-flex mb-4 gap-2">
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Lifestyle">Lifestyle</a><span> | </span>
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Jenny Wilson">Jenny Wilson</a>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-primary">Notify Me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>                <li class="swiper-slide card-slide" role="group" aria-label="3 / 5" style={{width: "423px", marginRight: "32px"}}>
                    <div class="card mb-0">
                        <div class="card-body card-thumbnail">
                            <div class="d-flex align-items-center iq-upcoming-blogs gap-3">
                                <img src="../blog/assets/images/blog-dashboard/04.png" alt="02" class="img-fluid object-cover rounded" loading="lazy" />
                                <div class="d-flex flex-column justify-content-center">
                                    <small class="text-primary">
                                        20 Dec 2021
                                    </small>
                                    <a href="../blog/blog-detail.html" class="iq-title">
                                        <h4 class="mt-2 mb-3 text-ellipsis short-1" data-bs-toggle="tooltip" data-bs-original-title="Foods for a Healthy System">Foods for a Healthy System</h4>
                                    </a>
                                    <div class="d-flex mb-4 gap-2">
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Health">Health</a><span> | </span>
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Jane cooper">Jane cooper</a>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-primary">Notify Me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>                <li class="swiper-slide card-slide" role="group" aria-label="4 / 5" style={{width: "423px", marginRight: "32px"}}>
                    <div class="card mb-0">
                        <div class="card-body card-thumbnail">
                            <div class="d-flex align-items-center iq-upcoming-blogs gap-3">
                                <img src="../blog/assets/images/blog-dashboard/02.png" alt="02" class="img-fluid object-cover rounded" loading="lazy" />
                                <div class="d-flex flex-column justify-content-center">
                                    <small class="text-primary">
                                        14 Dec 2021
                                    </small>
                                    <a href="../blog/blog-detail.html" class="iq-title">
                                        <h4 class="mt-2 mb-3 text-ellipsis short-1" data-bs-toggle="tooltip" data-bs-original-title="How to Make Green Bean">How to Make Green Bean</h4>
                                    </a>
                                    <div class="d-flex mb-4 gap-2">
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Food">Food</a><span> | </span>
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Simmons">Simmons</a>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-primary">Notify Me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>                <li class="swiper-slide card-slide" role="group" aria-label="5 / 5" style={{width: "423px", marginRight: "32px"}}>
                    <div class="card mb-0">
                        <div class="card-body card-thumbnail">
                            <div class="d-flex align-items-center iq-upcoming-blogs gap-3">
                                <img src="../blog/assets/images/blog-dashboard/03.png" alt="02" class="img-fluid object-cover rounded" loading="lazy" />
                                <div class="d-flex flex-column justify-content-center">
                                    <small class="text-primary">
                                        20 Dec 2021
                                    </small>
                                    <a href="../blog/blog-detail.html" class="iq-title">
                                        <h4 class="mt-2 mb-3 text-ellipsis short-1" data-bs-toggle="tooltip" data-bs-original-title="Curious About Vegan Skincare?">Curious About Vegan Skincare?</h4>
                                    </a>
                                    <div class="d-flex mb-4 gap-2">
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1" data-bs-original-title="Lifestyle">Lifestyle</a><span> | </span>
                                        <a href="../blog/blog-detail.html" data-bs-toggle="tooltip" class="iq-blog-adventure text-ellipsis short-1 text-primary" data-bs-original-title="Jenny Wilson">Jenny Wilson</a>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-primary">Notify Me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>            </ul>
            <div class="swiper-button swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-271a9a19d278b1073" aria-disabled="false"></div>
            <div class="swiper-button swiper-button-prev swiper-button-disabled" tabIndex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-271a9a19d278b1073" aria-disabled="true"></div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
    </div>

                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="detail" className={toggleState === 'detail' ? "content active-content" : "content"} id="content-card-detail" role="tabpanel">
                                 <div class="row ">
                                    <div class="col-lg-8">
                                        <div class="card">
                                            <div class="card-body card-thumbnail">
                                                    <span class="text-primary">02 Dec 2021</span>
                                                    <h4 class="mt-2">The Experience: Travel Tales From India and Abroad.</h4> 
                                                    <div class="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" class="iq-blog-adventure fs-6">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary fs-6">Jenny Wilson</a>
                                                    </div>
                                                <img class="img-fluid rounded object-cover iq-blog-experience mt-3 mb-3 w-100" src="../blog/assets/images/blog-detail/01.png" alt="01" loading="lazy" />
                                                <h5 class="mt-3 mb-0">Through the States</h5>
                                                <p class="mt-3">Lorem ipsum dolor sit amet, <span class="text-primary">consectetur</span> adipiscing elit. Neque at velit ultrices convallis. Purus sed adipiscing hendrerit risus id dapibus tristique consectetur. Enim non viverra massa sollicitudin arcu aliquam, sagittis aliquet diam.</p>
                                                <div class="bg-primary rounded my-4">
                                                    <div class="card-body p-4">
                                                        <div class="d-flex justify-content-evenly align-items-center text-white">
                                                            <svg class="iq-blog-special" width="50" viewBox="0 0 71 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.2" d="M19.508 33.7143C23.1374 33.7143 26.0107 34.8972 28.1278 37.2632C30.3962 39.4812 31.5304 42.4386 31.5304 46.1353C31.5304 50.1278 30.1693 53.307 27.4473 55.6729C24.8765 57.891 21.3227 59 16.7859 59C11.4931 59 7.3344 57.0038 4.3099 53.0113C1.43664 49.0188 0 43.3258 0 35.9323C0 29.2782 1.51225 23.1416 4.53674 17.5226C7.56124 11.7556 12.098 5.98872 18.147 0.221802C18.2982 0.0739339 18.525 0 18.8275 0C19.2812 0 19.6592 0.221802 19.9617 0.665405C20.2641 1.10902 20.2641 1.47869 19.9617 1.77443C12.5517 9.16791 8.84665 17.8922 8.84665 27.9474C8.84665 32.0877 9.60277 35.119 11.115 37.0414C12.476 34.8233 15.2737 33.7143 19.508 33.7143ZM58.9776 33.7143C62.607 33.7143 65.4803 34.8972 67.5975 37.2632C69.8658 39.4812 71 42.4386 71 46.1353C71 50.1278 69.639 53.307 66.9169 55.6729C64.3461 57.891 60.7923 59 56.2556 59C50.9627 59 46.804 57.0038 43.7796 53.0113C40.9063 49.0188 39.4696 43.3258 39.4696 35.9323C39.4696 29.2782 40.9819 23.1416 44.0064 17.5226C47.0309 11.7556 51.5676 5.98872 57.6166 0.221802C57.7678 0.0739339 57.9947 0 58.2971 0C58.7508 0 59.1289 0.221802 59.4313 0.665405C59.7338 1.10902 59.7338 1.47869 59.4313 1.77443C52.0213 9.16791 48.3163 17.8922 48.3163 27.9474C48.3163 32.0877 49.0724 35.119 50.5847 37.0414C51.9457 34.8233 54.7433 33.7143 58.9776 33.7143Z" fill="currentcolor"></path>
                                                            </svg>
                                                            <div>
                                                                <h4 class="text-white text-center mb-0">
                                                                    <span>
                                                                        “Travel is the only thing you buy that
                                                                    </span>
                                                                    <br />
                                                                    <span>
                                                                        makes you richer.”
                                                                    </span>
                                                                </h4>
                                                                <h6 class="text-white text-center mt-3">- John Tom</h6>
                                                            </div>
                                                            <svg class="iq-blog-special" width="50" viewBox="0 0 77 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.2" d="M55.8434 27.4286C51.9073 27.4286 48.7913 26.1454 46.4952 23.5789C44.0351 21.1729 42.8051 17.9649 42.8051 13.9549C42.8051 9.62406 44.2811 6.17543 47.2332 3.60902C50.0213 1.203 53.8754 -5.60778e-06 58.7955 -6.03791e-06C64.5357 -6.53973e-06 69.0458 2.1654 72.3259 6.49622C75.442 10.8271 77 17.0025 77 25.0226C77 32.2406 75.36 38.8972 72.0799 44.9925C68.7998 51.2481 63.8797 57.5038 57.3195 63.7594C57.1555 63.9198 56.9095 64 56.5815 64C56.0895 64 55.6794 63.7594 55.3514 63.2782C55.0234 62.797 55.0234 62.396 55.3514 62.0752C63.3876 54.0551 67.4058 44.5915 67.4057 33.6842C67.4057 29.193 66.5857 25.9048 64.9457 23.8195C63.4696 26.2256 60.4356 27.4286 55.8434 27.4286ZM13.0383 27.4286C9.10224 27.4286 5.98615 26.1454 3.69009 23.5789C1.23003 21.1729 3.60488e-06 17.9649 3.25431e-06 13.9549C2.8757e-06 9.62406 1.47604 6.17543 4.42811 3.60902C7.21619 1.20301 11.0703 -1.86564e-06 15.9904 -2.29577e-06C21.7306 -2.79759e-06 26.2407 2.1654 29.5208 6.49623C32.6368 10.8271 34.1949 17.0025 34.1949 25.0226C34.1949 32.2406 32.5548 38.8972 29.2748 44.9925C25.9947 51.2481 21.0745 57.5038 14.5144 63.7594C14.3504 63.9198 14.1044 64 13.7764 64C13.2844 64 12.8743 63.7594 12.5463 63.2782C12.2183 62.797 12.2183 62.396 12.5463 62.0752C20.5825 54.0551 24.6006 44.5915 24.6006 33.6842C24.6006 29.193 23.7806 25.9048 22.1406 23.8195C20.6645 26.2256 17.6305 27.4286 13.0383 27.4286Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 class="mt-4">To Travel Is To Live</h5>
                                                <p class="mt-3">Lorem ipsum dolor sit amet, <span class="text-primary">consectetur adipiscing elit.</span> Neque at velit ultrices convallis set. Purus sed adipiscing hendrerit risus id dapibus tristique consectetur enim non viverra.</p>
                                                <p class="mt-3 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque at velit ultrices convallis set. Purus sed adipiscing hendrerit risus id dapibus tristique consectetur enim non viverra.</p>
                                                <div class="d-flex justify-content-end">
                                                    <div class="me-4 d-flex align-items-center gap-2">
                                                        <a href="#">
                                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.015C2 6.74712 6.21 2 12.02 2C17.7 2 22 6.65699 22 11.985C22 18.1642 16.96 22 12 22C10.36 22 8.54 21.5593 7.08 20.698C6.57 20.3876 6.14 20.1572 5.59 20.3375L3.57 20.9384C3.06 21.0986 2.6 20.698 2.75 20.1572L3.42 17.9139C3.53 17.6034 3.51 17.2729 3.35 17.0125C2.49 15.4301 2 13.6975 2 12.015ZM10.7 12.015C10.7 12.7261 11.27 13.2969 11.98 13.307C12.69 13.307 13.26 12.7261 13.26 12.025C13.26 11.314 12.69 10.7431 11.98 10.7431C11.28 10.7331 10.7 11.314 10.7 12.015ZM15.31 12.025C15.31 12.7261 15.88 13.307 16.59 13.307C17.3 13.307 17.87 12.7261 17.87 12.025C17.87 11.314 17.3 10.7431 16.59 10.7431C15.88 10.7431 15.31 11.314 15.31 12.025ZM7.37 13.307C6.67 13.307 6.09 12.7261 6.09 12.025C6.09 11.314 6.66 10.7431 7.37 10.7431C8.08 10.7431 8.65 11.314 8.65 12.025C8.65 12.7261 8.08 13.2969 7.37 13.307Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                        <span class="fs-6 ">Comment</span>
                                                    </div>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <a href="#"> 
                                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.85 2.50065C16.481 2.50065 17.111 2.58965 17.71 2.79065C21.401 3.99065 22.731 8.04065 21.62 11.5806C20.99 13.3896 19.96 15.0406 18.611 16.3896C16.68 18.2596 14.561 19.9196 12.28 21.3496L12.03 21.5006L11.77 21.3396C9.48102 19.9196 7.35002 18.2596 5.40102 16.3796C4.06102 15.0306 3.03002 13.3896 2.39002 11.5806C1.26002 8.04065 2.59002 3.99065 6.32102 2.76965C6.61102 2.66965 6.91002 2.59965 7.21002 2.56065H7.33002C7.61102 2.51965 7.89002 2.50065 8.17002 2.50065H8.28002C8.91002 2.51965 9.52002 2.62965 10.111 2.83065H10.17C10.21 2.84965 10.24 2.87065 10.26 2.88965C10.481 2.96065 10.69 3.04065 10.89 3.15065L11.27 3.32065C11.3618 3.36962 11.4649 3.44445 11.554 3.50912C11.6104 3.55009 11.6612 3.58699 11.7 3.61065C11.7163 3.62028 11.7329 3.62996 11.7496 3.63972C11.8354 3.68977 11.9247 3.74191 12 3.79965C13.111 2.95065 14.46 2.49065 15.85 2.50065ZM18.51 9.70065C18.92 9.68965 19.27 9.36065 19.3 8.93965V8.82065C19.33 7.41965 18.481 6.15065 17.19 5.66065C16.78 5.51965 16.33 5.74065 16.18 6.16065C16.04 6.58065 16.26 7.04065 16.68 7.18965C17.321 7.42965 17.75 8.06065 17.75 8.75965V8.79065C17.731 9.01965 17.8 9.24065 17.94 9.41065C18.08 9.58065 18.29 9.67965 18.51 9.70065Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                        <span class="fs-6 ">Like</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Comment(3)</h4>
                                            </div>
                                            <div class="card-body">
                                                <div class="card shadow-none bg-transparent border mb-3">
                                                    <div class="card-body">
                                                        <div class="d-flex flex-sm-nowrap flex-wrap justify-content-center gap-3">
                                                            <div>
                                                                <img class="img-fluid object-contain avatar-120 rounded-0" src="../blog/assets/images/blog-avatar/07.png" alt="01" loading="lazy" />
                                                            </div>
                                                            <div>
                                                                <div class="d-flex justify-content-between align-items-center my-2 my-lg-0">
                                                                    <h6 class="mb-0">Jackson Jones</h6>
                                                                    <a class="text-dark " href="javascript:void(0)">Reply</a>
                                                                </div>
                                                                <small class="text-primary">March 01st 2021</small>
                                                                <p class="mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut eu morbi tincidunt erat egestas quisque ultrices ut. Vel elementum blandit et tellus sit tincidunt.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card shadow-none bg-transparent border ms-5">
                                                    <div class="card-body">
                                                        <div class="d-flex flex-sm-nowrap flex-wrap justify-content-center gap-3">
                                                            <div>
                                                                <img class="img-fluid object-contain avatar-120 rounded-0" src="../blog/assets/images/blog-avatar/08.png" alt="01" loading="lazy" />
                                                            </div>
                                                            <div>
                                                                <div class="d-flex justify-content-between align-items-center my-2 my-lg-0">
                                                                    <h6 class="mb-0">Lara Williams</h6>
                                                                    <a class="text-dark " href="javascript:void(0)">Reply</a>
                                                                </div>
                                                                <small class="text-primary">March 13th 2021</small>
                                                                <p class="mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut eu morbi tincidunt erat egestas quisque ultrices ut. Vel elementum blandit et tellus sit tincidunt.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card shadow-none bg-transparent border mb-0">
                                                    <div class="card-body">
                                                        <div class="d-flex flex-sm-nowrap flex-wrap justify-content-center gap-3">
                                                            <div>
                                                                <img class="img-fluid object-contain avatar-120 rounded-0" src="../blog/assets/images/blog-avatar/07.png" alt="01" loading="lazy" />
                                                            </div>
                                                            <div>
                                                                <div class="d-flex justify-content-between align-items-center my-2 my-lg-0">
                                                                    <h6 class="mb-0">Jackson Jones</h6>
                                                                    <a class="text-dark " href="javascript:void(0)">Reply</a>
                                                                </div>
                                                                <small class="text-primary">March 20th 2021</small>
                                                                <p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut eu morbi tincidunt erat egestas quisque ultrices ut. Vel elementum blandit et tellus sit tincidunt.</p>
                                                                <div class="d-flex mb-3">
                                                                    <a class="" href="javascript:void(0)">Reply To Jackson Jones</a>
                                                                    <a class="text-body ms-3" href="javascript:void(0)">Cancel Reply</a>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group ">
                                                                        <input type="text" class="form-control" placeholder=" Hi there, I love your blog " />
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex">
                                                                    <button type="submit" class="btn btn-primary rounded">Get Started</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">Post a Comment.</h4>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="full-name" className="form-label">First Name</label>
                                                                <input type="text" className="form-control w-100" id="full-name" placeholder=" John" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="last-name" className="form-label">Email ID</label>
                                                                <input type="text" className="form-control w-100" id="last-name" placeholder="XYZ@exampleemail.com " />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label for="message" className="form-label">Enter your Comment</label>
                                                                <input type="text" id="message" className="form-control w-100" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 d-flex justify-content-between">
                                                            <div className="form-check mb-3">
                                                                <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                                <label className="form-check-label" for="customCheck1">Save my name and email in this browser for the next time I comment.</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-3">Search</h4>
                                                <div className="nav">
                                                    <div className="form-group input-group mb-0 search-input w-100">
                                                        <input type="text" className="form-control" placeholder="Search..." />
                                                        <span className="input-group-text">
                                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                            <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-4">About Me</h4>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img className="img-fluid rounded-circle avatar-130" src="../blog/assets/images/blog-avatar/01.png" alt="user-img" />
                                                    <div>
                                                        <h6 className="mb-3 text-primary">Loren Banks</h6>
                                                        <p className="mt-3">Elit vitae neque velit mattis elementum egestas non, Sem eget.</p>
                                                        <div className="d-flex gap-3">
                                                        <a href="javascript:void(0)">
                                                                <svg className="icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M23.9998 12C23.9998 5.37234 18.6273 0 12.0007 0C5.37201 0 0 5.37218 0 12C0 18.6268 5.37217 24 12.0007 24C18.6275 24 23.9998 18.6268 23.9998 12Z" fill="#3D83D9"></path>
                                                                    <path d="M9.06396 9.07227H6.28613V17.011H9.06396V9.07227Z" fill="white"></path>
                                                                    <path d="M7.67514 5.10254C6.80501 5.10254 6.12388 5.90215 6.32007 6.80286C6.43403 7.32607 6.86083 7.74668 7.38588 7.85212C8.28124 8.03193 9.06397 7.35414 9.06397 6.49153C9.06397 5.72568 8.44333 5.10254 7.67514 5.10254Z" fill="white"></path>
                                                                    <path d="M18.1938 11.511C18.0069 10.0148 17.2585 9.07227 15.2358 9.07227C13.8002 9.07227 13.2293 9.29619 12.9001 9.92284V9.07227H10.6514V17.011H12.9656V12.8554C12.9656 11.818 13.1622 11.0344 14.4449 11.0344C15.7092 11.0344 15.8108 11.9988 15.8108 12.9228V17.0112H18.1939C18.1938 17.0112 18.2379 11.8608 18.1938 11.511Z" fill="white"></path>
                                                                </svg>
                                                        </a>
                                                        <a href="javascript:void(0)">
                                                            <svg className="icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M24.0002 11.9992C24.0002 5.37225 18.6279 0 12 0C5.37242 0 0 5.37225 0 11.9992C0 18.6262 5.37242 24 12 24C18.6281 24 24.0002 18.6262 24.0002 11.9992Z" fill="#395196"></path>
                                                                <path d="M13.0575 9.15703V8.02035C13.0575 7.46672 13.427 7.33737 13.6857 7.33737C13.9452 7.33737 15.2811 7.33737 15.2811 7.33737V4.90325L13.0846 4.89355C10.6466 4.89355 10.093 6.71004 10.093 7.87296V9.15703H8.68359V12.0004H10.1052C10.1052 15.2223 10.1052 19.1073 10.1052 19.1073H12.9477C12.9477 19.1073 12.9477 15.1827 12.9477 12.0004H15.0575L15.317 9.15703H13.0575V9.15703Z" fill="white"></path>
                                                            </svg>
                                                        </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-3">Categories</h4>
                                                <ul className="list-inline list-main d-flex flex-column gap-4 mb-0">
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">Beauty</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(8)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">SkinCare</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(2)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">HairCare</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(6)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">Makeup</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(6)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">Business</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(5)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">Salon</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(4)</span>
                                                        </div>
                                                    </li>
                                                    <li className="">
                                                        <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                                                            <h6 className="iq-categories-name mb-0">Toner</h6>
                                                            <p className="iq-categories-indicator line-around-2 mb-0">
                                                                <span className="px-5"></span>
                                                            </p>
                                                            <span className="px-3 d-flex align-items-center">(8)</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-3">Recent Posts</h4>
                                                <img className="img-fluid fit-img mb-4 object-cover iq-recent-post w-100" src="../blog/assets/images/blog-detail/05.png" alt="01" loading="lazy" />
                                                    <small className="text-primary">April 19th 2021</small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3">5 Beauty Essentials Everyone Should Have in Their Collection.</h4>
                                                    </a>
                                                    <div className="d-flex gap-2">
                                                        <a href="../blog/blog-dashboard.html" className="text-body">Travel</a><span> | </span>
                                                        <a href="../blog/blog-dashboard.html" className="text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut eu morbi tincidunt </p>
                                                    <button type="submit" className="btn btn-primary mt-2 rounded">Read More</button>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-4">Popular Tags</h4>
                                                <ul className="iq-col-masonry logik-blogtag list-unstyled gap-3">
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#Care</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                        <span>#Beauty</span></a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#HairCare</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#SkinCare</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#Serum</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#Skin</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#Hydrate</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="bg-primary-subtle rounded-pill iq-custom-badge">
                                                            <span>#Radiant</span>
                                                        </a>
                                                    </li>
                                                </ul> 
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="mb-4">Follow Us</h4>
                                                <div className="d-grid gap-3 grid-cols-2">
                                                    <a href="#">
                                                        <svg width="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="currentcolor"></circle>
                                                        </svg>
                                                        <span className="text-body">Facebook</span></a>
                                                    <a href="javascript:void(0)">
                                                        <svg width="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="currentcolor"></circle>
                                                        </svg>
                                                        <span className="text-body">Instagram</span>
                                                    </a>
                                                    <a href="#">
                                                        <svg width="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="currentcolor"></circle>
                                                        </svg>
                                                        <span className="text-body">Twitter</span></a>
                                                    <a href="javascript:void(0)">
                                                        <svg width="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="currentcolor"></circle>
                                                        </svg>
                                                        <span className="text-body">Youtube</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="trending" classNameName={toggleState === 'trending' ? "content active-content" : "content"} id="content-card-trending" role="tabpanel">
                                <div className="d-flex justify-content-between mb-4">
                                    <h4 className="mb-0">Trending Blogs</h4>
                                    <div className="dropdown d-flex align-items-center">
                                        Sorting By:
                                        <div className="dropdown">
                                            <a href="#" className="text-gray dropdown-toggle" id="dropdownMenuButton22" data-bs-toggle="dropdown" aria-expanded="false">Name</a>
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton22" >
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" data-toggle="masonry" style={{position: "relative", height: "3633.15px"}}>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "0px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-categories/02.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        02 Dec 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Ultimate Travel Guide: What To Do, See &amp; Eat.">The Ultimate Travel Guide: What To Do, See &amp; Eat.</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "497.662px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-grid/15.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        02 Dec 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Cheapest Destinations of All Time, A list of Beauty and Budget.">The Cheapest Destinations of All Time, A list of Beauty and Budget.</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "1211.05px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-grid/18.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        02 Dec 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Foreign and Domestic Culinary Adventures: An Art">The Foreign and Domestic Culinary Adventures: An Art</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "1708.71px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-grid/17.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        11 Dec 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="Paranomal and Ghost Experience: The man behind the musical">Paranomal and Ghost Experience: The man behind the musical</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "2422.1px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-grid/16.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        02 Dec 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Expierience: Travel Tales From India and Abroad.">The Expierience: Travel Tales From India and Abroad.</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                    <div className="col-lg-4" style={{position: "absolute", left: "0px", top: "3161.69px"}}>
                                        <div className="card ">
                                            <div className="card-header card-thumbnail">
                                                <img src="../blog/assets/images/blog-grid/19.png" alt="02" className="img-fluid w-100 rounded object-cover " loading="lazy" />
                                            </div>
                                            <div className="card-body card-thumbnail">
                                                <div>
                                                    <small className="text-primary">
                                                        03 Aug 2021
                                                    </small>
                                                    <a href="../blog/blog-detail.html" className="iq-title">
                                                        <h4 className="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="WIT AND DELIGHT: The Advice From A Twenty Something">WIT AND DELIGHT: The Advice From A Twenty Something</h4>
                                                    </a>
                                                    <div className="d-flex gap-3">
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure">Travel</a><span> | </span>
                                                        <a href="../blog/blog-detail.html" className="iq-blog-adventure text-primary">Jenny Wilson</a>
                                                    </div>
                                                    <p className="my-4 text-ellipsis short-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div>
                                                        <a href="../blog/blog-detail.html" role="button" className="btn btn-primary">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        </div>
                                </div>
                                <div className="text-center">
                                    <a href="blog-detail.html" className="btn btn-primary card">Load More</a>
                                </div>

						   
                            </Tab.Pane>
							<Tab.Pane eventKey="comments" classNameName={toggleState === 'comments' ? "content active-content" : "content"} id="content-card-comments" role="tabpanel">
                                <div className="pb-4">
                                        <h4>Category</h4>
                                    </div>
                                    <div className="card">
                                        <div className="card-body px-0">
                                            <div className="table-responsive">
                                                <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                                    <div className="row"><div className="col-sm-12 col-md-6">
                                                        <div className="dataTables_length" id="DataTables_Table_0_length">
                                                            <label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select form-select-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div></div><div className="col-sm-12 col-md-6">
                                                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                        <label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" />
                                                        </label>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        <div className="row dt-row">
                                                            <div className="col-sm-12">
                                                                <table className="table table-striped py-3 dataTable no-footer" role="grid" data-table="blog-comment" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                                    <thead>
                                                        <tr><th className="sorting sorting_asc" tabIndex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Profiles: activate to sort column descending" style={{width: "219.132px"}}>Profiles</th><th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Comment: activate to sort column ascending" style={{width: "125.169px"}}>Comment</th><th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Email ID: activate to sort column ascending" style={{width: "148.842px"}}>Email ID</th><th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Country: activate to sort column ascending" style={{width: "72.2909px"}}>Country</th><th className="text-center sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{width: "124.539px"}}>Action</th></tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                    <tr className="odd">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/1.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                        <h5 className="iq-sub-label">Elon Musk</h5>
                                                                        <p className="mb-0">@musk</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 555-0112</td>
                                                            <td className="text-dark">musk.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="18" className="me-2" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect y="0.5" width="20" height="13.75" fill="#EEF3F8"></rect>
                                                                    <rect y="0.5" width="11.25" height="8.75" fill="#41479B"></rect>
                                                                    <rect x="11.25" y="0.5" width="8.75" height="1.25" fill="#DC251C"></rect>
                                                                    <rect x="11.25" y="3" width="8.75" height="1.25" fill="#DC251C"></rect>
                                                                    <rect x="11.25" y="5.5" width="8.75" height="1.25" fill="#DC251C"></rect>
                                                                    <rect x="11.25" y="8" width="8.75" height="1.25" fill="#DC251C"></rect>
                                                                    <rect y="10.5" width="20" height="1.25" fill="#DC251C"></rect>
                                                                    <rect y="13" width="20" height="1.25" fill="#DC251C"></rect>
                                                                    <rect x="1.25" y="1.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="3.75" y="1.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="6.25" y="1.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="8.75" y="1.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="1.25" y="4.25" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="3.75" y="4.25" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="6.25" y="4.25" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="2.5" y="5.5" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="5" y="5.5" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="7.5" y="5.5" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="2.5" y="3" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="5" y="3" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="7.5" y="3" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="8.75" y="4.25" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="1.25" y="6.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="3.75" y="6.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="6.25" y="6.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                    <rect x="8.75" y="6.75" width="1.25" height="1.25" fill="#C5D0EC"></rect>
                                                                </svg>
                                                                    USA
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="even">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/2.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                        <h5 className="iq-sub-label">Marie Clark</h5>
                                                                        <p className="mb-0">@mclark</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 262-238</td>
                                                            <td className="text-dark">mclark@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="18" className="me-2" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="20" height="15" transform="translate(0 0.5)" fill="#FFD018"></rect>
                                                                    <rect y="0.5" width="20" height="3.75" fill="#DC251C"></rect>
                                                                    <rect y="11.75" width="20" height="3.75" fill="#DC251C"></rect>
                                                                    <rect x="3.75" y="5.5" width="2.5" height="2.5" fill="#DC251C"></rect>
                                                                    <path d="M3.75 8H6.25V10.5H4.75C4.19772 10.5 3.75 10.0523 3.75 9.5V8Z" fill="#FF8718"></path>
                                                                    <path d="M6.25 8H8.75V9.5C8.75 10.0523 8.30228 10.5 7.75 10.5H6.25V8Z" fill="#DC251C"></path>
                                                                    <rect x="6.25" y="5.5" width="2.5" height="2.5" fill="#A6A6A6"></rect>
                                                                    <circle cx="6.25" cy="8" r="0.625" fill="#41479B"></circle>
                                                                </svg>
                                                                SPN
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="odd">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/7.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Clara Mist</h5>
                                                                    <p className="mb-0">@mist.c</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 674-3424</td>
                                                            <td className="text-dark">mist.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="22" className="me-2" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect y="5.3335" width="21.3333" height="5.33333" fill="#F5F8FB"></rect>
                                                                    <rect width="21.3333" height="5.33333" fill="#2B9F5A"></rect>
                                                                    <rect y="10.6665" width="21.3333" height="5.33333" fill="#272727"></rect>
                                                                    <rect width="6.66667" height="16" fill="#DC251C"></rect>
                                                                </svg>
                                                                UAE
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="even">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/4.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Clinette Mark</h5>
                                                                    <p className="mb-0">@c.mark</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 346-4687</td>
                                                            <td className="text-dark">c.mark@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="18" className="me-2" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="20" height="15" transform="translate(0 0.5)" fill="#F5F8FB"></rect>
                                                                    <circle cx="9.5" cy="7.5" r="3.5" fill="#DC251C"></circle>
                                                                </svg>
                                                                JPN
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="odd">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/6.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Dennis Hall</h5>
                                                                    <p className="mb-0">@dennis</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 555-0112</td>
                                                            <td className="text-dark">dennis.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="21" className="me-2" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_80_4707)">
                                                                    <path d="M0 0H21V5.33333H0V0Z" fill="#FF8718"></path>
                                                                    <path d="M0 5.3335H21V10.6668H0V5.3335Z" fill="#F5F8FB"></path>
                                                                    <path d="M0 10.6665H21V15.9998H0V10.6665Z" fill="#2B9F5A"></path>
                                                                    <path d="M11.813 8.00033C11.813 8.73671 11.2254 9.33366 10.5005 9.33366C9.77561 9.33366 9.18799 8.73671 9.18799 8.00033C9.18799 7.26395 9.77561 6.66699 10.5005 6.66699C11.2254 6.66699 11.813 7.26395 11.813 8.00033Z" fill="#F5F8FB"></path>
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4995 7.33333C10.1371 7.33333 9.84326 7.63181 9.84326 8C9.84326 8.36819 10.1371 8.66667 10.4995 8.66667C10.8619 8.66667 11.1558 8.36819 11.1558 8C11.1558 7.63181 10.8619 7.33333 10.4995 7.33333ZM8.53076 8C8.53076 6.89543 9.4122 6 10.4995 6C11.5868 6 12.4683 6.89543 12.4683 8C12.4683 9.10457 11.5868 10 10.4995 10C9.4122 10 8.53076 9.10457 8.53076 8Z" fill="#41479B"></path>
                                                                    </g>
                                                                    <defs>
                                                                    <clipPath id="clip0_80_4707">
                                                                    <rect width="21" height="16" fill="white"></rect>
                                                                    </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                IND
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="even">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/8.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Elon Musk</h5>
                                                                    <p className="mb-0">@musk</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 555-0112</td>
                                                            <td className="text-dark">musk.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="21" className="me-2" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="21" height="16" fill="#F5F8FB"></rect>
                                                                    <rect width="21" height="2" fill="#41479B"></rect>
                                                                    <rect y="3" width="21" height="3" fill="#41479B"></rect>
                                                                    <rect y="7" width="21" height="2" fill="#41479B"></rect>
                                                                    <rect width="9" height="9" fill="#41479B"></rect>
                                                                    <rect y="3" width="9" height="3" fill="#F5F8FB"></rect>
                                                                    <rect x="3" y="9" width="9" height="3" transform="rotate(-90 3 9)" fill="#F5F8FB"></rect>
                                                                    <rect y="10" width="21" height="3" fill="#41479B"></rect>
                                                                    <rect y="14" width="21" height="2" fill="#41479B"></rect>
                                                                </svg>
                                                                GRC
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="odd">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/9.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Elon Musk</h5>
                                                                    <p className="mb-0">@musk</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 555-0112</td>
                                                            <td className="text-dark">musk.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="18" className="me-2" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="21" height="16" fill="#F5F8FB"></rect>
                                                                    <ellipse cx="10.5" cy="7.69231" rx="3.5" ry="3.69231" fill="#DC251C"></ellipse>
                                                                    <mask style={{maskType: "alpha", maskUnits: "userSpaceOnUse"}} x="7" y="7" width="7" height="5">
                                                                    <path d="M14 12.0002V8.30792C12.832 6.15169 10.4961 7.92611 10.4961 7.92611C10.4961 7.92611 8.16538 9.53597 7 7.07715V12.0002H14Z" fill="#C4C4C4"></path>
                                                                    </mask>
                                                                    <g mask="url(#mask0_80_4853)">
                                                                    <ellipse cx="10.5" cy="7.69231" rx="3.5" ry="3.69231" fill="#41479B"></ellipse>
                                                                    </g>
                                                                    <path d="M2.16455 4.83789L4.32821 1.09033" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M3.12744 5.39551L5.2911 1.64795" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M4.09131 5.95117L6.25496 2.20361" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M18.9995 4.83789L16.8359 1.09033" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                    <path d="M18.0366 5.39551L15.873 1.64795" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M17.0728 5.95117L14.9091 2.20361" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                    <path d="M2.16406 11.5049L4.32772 15.2524" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M3.12744 10.9492L5.2911 14.6968" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                    <path d="M4.09082 10.3926L6.25447 14.1401" stroke="black" stroke-width="0.5"></path>
                                                                    <path d="M18.9995 11.5049L16.8359 15.2524" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                    <path d="M18.0366 10.9492L15.873 14.6968" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                    <path d="M17.0732 10.3926L14.9096 14.1401" stroke="black" stroke-width="0.5" stroke-dasharray="8 1"></path>
                                                                </svg>
                                                                S.KO
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="even">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/3.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">James Mason</h5>
                                                                    <p className="mb-0">@mason.j</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 326-4679</td>
                                                            <td className="text-dark">mason.j@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="18" className="me-2" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect y="0.5" width="20" height="15" fill="#F5F8FB"></rect>
                                                                    <rect y="0.5" width="6.25" height="15" fill="#2B9F5A"></rect>
                                                                    <rect x="13.75" y="0.5" width="6.25" height="15" fill="#DC251C"></rect>
                                                                </svg>
                                                                ITL
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr><tr className="odd">
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="rounded img-fluid avatar-65 me-3" src="../assets/images/table/5.png" alt="" loading="lazy" />
                                                                    <div className="media-support-info">
                                                                    <h5 className="iq-sub-label">Jamie Park</h5>
                                                                    <p className="mb-0">@jpark</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-dark">(208) 778-6878</td>
                                                            <td className="text-dark">park.e@mail.com</td>
                                                            <td className="text-dark">
                                                                <svg width="22" className="me-2" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="21.3333" height="16" fill="#272727"></rect>
                                                                    <rect y="5.3335" width="21.3333" height="5.33333" fill="#E31D1C"></rect>
                                                                    <rect y="10.6665" width="21.3333" height="5.33333" fill="#FFD018"></rect>
                                                                </svg>
                                                                GER
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-3 justify-content-center">
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor"></path>
                                                                                <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                                                <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                    <a className="btn btn-primary btn-icon btn-sm rounded-pill" href="javascript:void(0);" role="button">
                                                                        <span className="btn-inner">
                                                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr></tbody>
                                                </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 9 of 9 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex="-1" className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabIndex="0" className="page-link">1</a></li><li className="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next" tabIndex="-1" className="page-link">Next</a></li></ul></div></div></div></div>
                                            </div>
                                        </div>
                                </div>
                            </Tab.Pane>
							<Tab.Pane eventKey="category" classNameName={toggleState === 'category' ? "content active-content" : "content"} id="content-card-category" role="tabpanel">
                                <div>
                                        <h4 className="mb-0">Category</h4>
                                </div>
                                <div>
                                    <ul className="nav nav-pills  iq-nav-category mt-3 mb-3 justify-content-start bg-transparent" data-bs-toggle="slider-tab" role="tablist">
                                        <li className="nav-item me-3" role="presentation">
                                            <a className="nav-link active" id="pills-no-1-tab" data-bs-toggle="pill" href="" data-bs-target="#pills-no-1" role="tab" aria-controls="pills-no-1" aria-selected="true">All</a>
                                        </li>
                                        <li className="nav-item me-3" role="presentation">
                                            <a className="nav-link" id="pills-no-2-tab" data-bs-toggle="pill" data-bs-target="#pills-no-2" href="" role="tab" aria-controls="pills-no-2" aria-selected="false" tabIndex="-1">Popular</a>
                                        </li>
                                        <li className="nav-item me-3" role="presentation">
                                            <a className="nav-link" id="pills-no-3-tab" data-bs-toggle="pill" data-bs-target="#pills-no-3" href="" role="tab" aria-controls="pills-no-3" aria-selected="false" tabIndex="-1">Latest</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content mt-3" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-no-1" role="tabpanel" aria-labelledby="pills-no-1">
                                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/02.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Food</a>
                                                            <span className="text-muted">5458 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/04.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Workspace</a>
                                                            <span className="text-muted">6542 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/04.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Workspace</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/04.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Workspace</a>
                                                            <span className="text-muted">500 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/02.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Food</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                <div className="card-header card-thumbnail">
                                    <img src="../blog/assets/images/blog-list/02.png" alt="post-category" className="img-fluid" loading="lazy" />
                                </div>
                                <div className="card-body card-thumbnail">
                                    <div className="d-flex flex-column">
                                        <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Food</a>
                                        <span className="text-muted">500 Post</span>
                                    </div>
                                </div>
                            </div>                    </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/02.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Food</a>
                                                            <span className="text-muted">5458  Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                    <div className="card text-center">
                                                        <div className="card-header card-thumbnail">
                                                            <img src="../blog/assets/images/blog-list/04.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <div className="card-body card-thumbnail">
                                                            <div className="d-flex flex-column">
                                                                <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Workspace</a>
                                                                <span className="text-muted">6542 Post</span>
                                                            </div>
                                                        </div>
                                                    </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/02.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Food</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/04.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Workspace</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/05.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Card</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-no-2" role="tabpanel" aria-labelledby="pills-no-2">
                                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/10.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Animals</a>
                                                            <span className="text-muted">5458  Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/11.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Entertainment</a>
                                                            <span className="text-muted">6542 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/12.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Health</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/13.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Music</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/11.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Entertainment</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/13.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Music</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/10.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Animals</a>
                                                            <span className="text-muted">500 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/12.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Health</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/10.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Animals</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                <div className="card-header card-thumbnail">
                                    <img src="../blog/assets/images/blog-list/14.png" alt="post-category" className="img-fluid" loading="lazy" />
                                </div>
                                <div className="card-body card-thumbnail">
                                    <div className="d-flex flex-column">
                                        <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Business</a>
                                        <span className="text-muted">500 Post</span>
                                    </div>
                                </div>
                            </div>                       </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/11.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Entertainment</a>
                                                            <span className="text-muted">5458  Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/13.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Music</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                    <div className="card text-center">
                                                        <div className="card-header card-thumbnail">
                                                            <img src="../blog/assets/images/blog-list/10.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <div className="card-body card-thumbnail">
                                                            <div className="d-flex flex-column">
                                                                <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Animals</a>
                                                                <span className="text-muted">6542 Post</span>
                                                            </div>
                                                        </div>
                                                    </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/12.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Health</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/14.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Business</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/12.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Health</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-no-3" role="tabpanel" aria-labelledby="pills-no-3">
                                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/15.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Sports</a>
                                                            <span className="text-muted">5458  Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/16.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">News</a>
                                                            <span className="text-muted">6542 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/17.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Cars</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/18.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Movies</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/19.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Fashion</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/14.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Business</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/16.png" alt="post-category" className="img-fluid" loading="lazy" /> 
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">News</a>
                                                            <span className="text-muted">500 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/18.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Movie</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/17.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Cars</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                <div className="card-header card-thumbnail">
                                    <img src="../blog/assets/images/blog-list/19.png" alt="post-category" className="img-fluid" loading="lazy" />
                                </div>
                                <div className="card-body card-thumbnail">
                                    <div className="d-flex flex-column">
                                        <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Fashion</a>
                                        <span className="text-muted">500 Post</span>
                                    </div>
                                </div>
                            </div>                    </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/16.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">News</a>
                                                            <span className="text-muted">5458  Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/15.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Sports</a>
                                                            <span className="text-muted">3265 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                    <div className="card text-center">
                                                        <div className="card-header card-thumbnail">
                                                            <img src="../blog/assets/images/blog-list/13.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <div className="card-body card-thumbnail">
                                                            <div className="d-flex flex-column">
                                                                <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Music</a>
                                                                <span className="text-muted">6542 Post</span>
                                                            </div>
                                                        </div>
                                                    </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/18.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Movie</a>
                                                            <span className="text-muted">365 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/19.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">Fashion</a>
                                                            <span className="text-muted">1546 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                            <div className="col">
                                                <div className="card text-center">
                                                    <div className="card-header card-thumbnail">
                                                        <img src="../blog/assets/images/blog-list/16.png" alt="post-category" className="img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="card-body card-thumbnail">
                                                        <div className="d-flex flex-column">
                                                            <a href="./blog-detail.html" className="h5 mb-0 iq-product-detail mb-2">News</a>
                                                            <span className="text-muted">4623 Post</span>
                                                        </div>
                                                    </div>
                                                </div>                </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="text-center">
                                    <a href="javascript:void(0);" className="btn btn-primary card">Load More</a>
                                </div>
                            </Tab.Pane>
							
                        </Tab.Content>
                    </Tab.Container>
				</div>
            
        </>
    );
});



export default Blog;
