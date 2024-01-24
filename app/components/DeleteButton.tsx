'use client'

import React, { useEffect } from 'react';
import styles from '@/app/recipe/[slug]/page.module.css'
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export default function DeleteButton({id}: any) {
    const router = useRouter();
    const [shouldFetch, setShouldFetch] = React.useState(false);

    const fetcher = (url: string | Request | URL) => fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert("Recipe deleted");
                router?.push("/");
            }
        });
        
    const { data, error } = useSWR(shouldFetch ? `/api/recipe/delete?id=${id}` : null, fetcher);

    function onDeleteClicked() {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            console.log("deleting");
            setShouldFetch(true);
        }
    }

    return (
        <button className={styles.button} onClick={onDeleteClicked}>
            <object type="image/svg+xml" data="/icons/delete.svg" className={styles.deleteIcon} />
        </button>
    );
}