'use client';

import React, { ChangeEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchInput = event.target.value;

        setSearchInput(searchInput);
    }


    function search(event: { preventDefault: () => void; }) {
        event.preventDefault();

        if (searchInput) return router.push(`/?q=${searchInput}`);

        if (!searchInput) return router.push("/");

    }

    function clear(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setSearchInput("");

        return router.push("/");

    }

    return (
        <form className={styles.searchForm}>
            <button className={styles.searchButton} onClick={search}>
                <span>
                    <object type="image/svg+xml" data="/icons/search.svg" className={styles.icon} />
                </span>
            </button>
            <input
                className={styles.search}
                type="text"
                placeholder="search your recipes..."
                value={searchInput ?? ""} onChange={handleChange}
            />
            <button className={styles.clearButton} onClick={clear}>Clear</button>
        </form>
    );
}
