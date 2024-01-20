'use client';

import styles from './LogoutButton.module.css';

import { signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    function logout(event: { preventDefault: () => void; }) {
        event.preventDefault();

        signOut();
    }
    
    return (
        <button className={styles.logoutButton} onClick={logout}>
            <span>
                <object type="image/svg+xml" data="/icons/logout.svg" className={styles.icon}/>
            </span>
        </button>
    )
}