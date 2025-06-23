import React from "react";
import { useSelector } from "react-redux";
import { selectQuote, selectQuoteStatus } from "./quoteSlice";
import styles from "./quote.module.css";

const Quote: React.FC = () => {

    const quoteStatus = useSelector(selectQuoteStatus);
    const { text, author } = useSelector(selectQuote);

    if (quoteStatus === "succeeded") {
        return (
            <div className={styles.quotContainer}>
                <q className={styles.quoteText}>{text}</q>
                <p className={styles.quoteAuthor}>&ndash; {author}</p>
            </div>
        );
    }

    return null;
};

export default Quote;