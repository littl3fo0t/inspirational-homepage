import React from "react";
import type { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import styles from "./BackgroundImageNavigation.module.css";
import { nextImage, previousImage } from "../backgroundImageSlice";

const BackgroundImageNavigation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles.navContainer}>
            <button
                className={styles.navButton}
                aria-label="Previous Image"
                onClick={() => dispatch(previousImage())}
            >
                &lt;
            </button>
            <button
                className={styles.navButton}
                aria-label="Next Image"
                onClick={() => dispatch(nextImage())}
            >
                &gt;
            </button>
        </div>
    );
};

export default BackgroundImageNavigation;