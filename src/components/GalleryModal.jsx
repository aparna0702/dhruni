import React from "react";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import { RxCross2 } from "react-icons/rx";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const GalleryModal = ({ open, close, images }) => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index, item) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } w-full h-screen items-center justify-center p-2 md:p-20 lg:p-44 fixed top-0 left-0 bg-[#000d] z-[1011]`}
    >
      <section
        className="w-full h-screen rounded-3xl bg-[#fff] p-10 pt-20 md:p-20 relative no-scrollbar"
        onBlur={() => close(false)}
      >
        <span
          className="absolute top-10 right-10 text-4xl"
          onClick={() => close(false)}
        >
          <RxCross2 />
        </span>
        <div className="w-full h-full overflow-y-scroll no-scrollbar z-[1020]">
          <Gallery
            images={images}
            onClick={handleClick}
            enableImageSelection={false}
          />
          {!!currentImage && (
            <Lightbox
              mainSrc={currentImage.original}
              imageTitle={currentImage.caption}
              mainSrcThumbnail={currentImage.src}
              nextSrc={nextImage.original}
              nextSrcThumbnail={nextImage.src}
              prevSrc={prevImage.original}
              prevSrcThumbnail={prevImage.src}
              onCloseRequest={handleClose}
              onMovePrevRequest={handleMovePrev}
              onMoveNextRequest={handleMoveNext}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryModal;
