import React from 'react'
import styles from './Pagination.module.css'
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = (e) => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    }
    const prevPage = (e) => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <div className={styles.wrapper}>
            <button
                className={currentPage === 1 ? `${styles.buttonGray} .first-page` : `${styles.button} .first-page`}
                onClick={() => setCurrentPage(1)}
            ><MdKeyboardDoubleArrowLeft className={styles.icons}/></button>
            <button
                className={currentPage === 1 ? `${styles.buttonGray} .previous-page` : `${styles.button} .previous-page`}
                onClick={prevPage}
            ><MdKeyboardArrowLeft className={styles.icons}/></button>
            {
                pageNumbers.map((pgno) => (
                    <button
                        key={pgno}
                        className={currentPage == pgno ? styles.activeButton : styles.buttonNumber}
                        onClick={() => setCurrentPage(pgno)}>
                        {pgno}
                    </button>
                ))
            }
            <button
                className={currentPage === nPages ? `${styles.buttonGray} .next-page` : `${styles.button} .next-page`}
                onClick={nextPage}
            ><MdKeyboardArrowRight className={styles.icons}/></button>
            <button
                className={currentPage === nPages ? `${styles.buttonGray} .last-page` : `${styles.button} .last-page`}
                onClick={() => setCurrentPage(nPages)}
            ><MdKeyboardDoubleArrowRight className={styles.icons}/></button>
        </div>
    )
}

export default Pagination