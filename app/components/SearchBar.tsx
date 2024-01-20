'use client';

import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    function search(event: { preventDefault: () => void; }) {
        event.preventDefault();

        console.log("search");
    }

    return (
        <form className={styles.searchForm}>
            <button className={styles.searchButton} onClick={search}>
                <span>
                    <object type="image/svg+xml" data="/icons/search.svg" className={styles.icon} />
                </span>
            </button>
            <input className={styles.search} type="text" placeholder="search your recipes..." />
        </form>
    );
}
