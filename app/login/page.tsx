import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

// import {ReactComponent as Icon} from "../public/icon.svg"

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icon4.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <div className={styles.loginContainer}>
                <h2 className={styles.loginHeading}>Log in to your account</h2>
                <form className={styles.loginForm}>
                    <input className={styles.formField} type="email" placeholder="Email" />
                    <input className={styles.formField} type="password" placeholder="Password" />
                    <button className={styles.loginButton} type="submit">Log in</button>
                </form>
            </div>
        </main>


    );
}
