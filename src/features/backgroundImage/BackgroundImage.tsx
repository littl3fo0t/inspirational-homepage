import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import fallbackImage from "../../assets/images/background-img-fallback.svg";
import setBackgroundImage from "../../utils/setBackgroundImage";
import {
  selectImages,
  selectCurrentImageIndex,
  selectBackgroundImagesStatus
} from './backgroundImageSlice';

const BackgroundImageComponent: React.FC = () => {

    const imageStatus = useSelector(selectBackgroundImagesStatus);
    const currentImageIndex = useSelector(selectCurrentImageIndex);
    const images = useSelector(selectImages);
    const currentImage = images[currentImageIndex];

    // Set background image
    useEffect(() => {
        if (imageStatus === "succeeded") {
            setBackgroundImage(currentImage.url);
        } else {
            setBackgroundImage(fallbackImage);
        }
    }, [currentImageIndex, imageStatus]);

    return null;
};

export default BackgroundImageComponent;