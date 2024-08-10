import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const VideoCarousel = () => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //     actions.getVideos();
    // }, []);

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {store.videos.map((video, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : ""}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {store.videos.map((video, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <iframe
                            src={video.link}
                            title={video.title}
                            className="d-block w-100"
                        ></iframe>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{video.title}</h5>
                            <p>Some representative placeholder content for the slide.</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

