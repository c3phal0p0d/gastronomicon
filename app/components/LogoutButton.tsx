import styles from '@/app/page.module.css';

import { signOut } from "next-auth/react";

export default async function LogoutButton() {
    // const logoutButtonClick = () => {
    //     console.log("signing out");
    //     // signOut();
    // }

    return (
        <button className={styles.logoutButton}>
            <object type="image/svg+xml" data="/icons/logout.svg" className={styles.icon} />
        </button>
    )
}