import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    return (
        <form className={styles.searchForm}>
            <object type="image/svg+xml" data="/icons/search.svg" className={styles.icon} />
            <input className={styles.search} type="text" placeholder="search your recipes..." />
        </form>
    );
}
