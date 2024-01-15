import Link from 'next/link';
import styles from './footer.module.css';

// Define the Footer component
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p><Link href="https://github.com/c3phal0p0d">c3phal0p0d</Link> &copy; {new Date().getFullYear()}</p>
            {/* <div>
                <a href="https://github.com/your-username">
                    <object type="image/svg+xml" data="/icons/github-white.svg" className={styles.githubIcon} />
                </a>
            </div> */}
        </footer>
    );
}