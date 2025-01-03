import React, { useState } from 'react';
import "../../../styles/About.css";

const gifs = [
  { src: "/image/about/about1.gif", alt: "description of picture 1" },
  { src: "/image/about/about2.gif", alt: "description of picture 2" },
  { src: "/image/about/about3.gif", alt: "description of picture 3" },
  { src: "/image/about/about4.gif", alt: "description of picture 4" },
  { src: "/image/about/about5.gif", alt: "description of picture 5" },
  { src: "/image/about/about6.gif", alt: "description of picture 6" },
  { src: "/image/about/about7.gif", alt: "description of picture 7" },
  { src: "/image/about/about8.gif", alt: "description of picture 8" },
];

const GifGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 1;

  const totalPages = Math.ceil(gifs.length / imagesPerPage);

  const displayGifs = gifs.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='grid-gallery-center'>
      <div className="gallery">
        {displayGifs.map((gif, index) => (
          <figure className="card" key={index}>
            <img src={gif.src} alt={gif.alt} />
          </figure>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <a
            key={index}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default GifGallery;
