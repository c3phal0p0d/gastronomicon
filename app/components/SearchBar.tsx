import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    return (
        <div className={styles.searchContainer}>
            <object type="image/svg+xml" data="/search.svg" className={styles.icon} />
            <div className={styles.search}>
                search your recipes...
            </div>
        </div>
    );
}
