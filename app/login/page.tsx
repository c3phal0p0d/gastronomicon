"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const params = useSearchParams()!;
    const session = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [error, setError] = useState<string | null>("");

    useEffect(() => {
        setError(params.get("error"));
      }, [params]);

    if (session.status === "authenticated") {
        router?.push("/");
    }

    const formSubmit: SubmitHandler<Inputs> = (form) => {
        const { email, password } = form;
        signIn("credentials", {
            email,
            password,
        });
    };

    return (
        <main className={styles.main}>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icons/app-icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <div className={styles.loginContainer}>
                <h2 className={styles.loginHeading}>Log in to your account</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit(formSubmit)}>
                    <input 
                        className={styles.formField} 
                        type="email" 
                        placeholder="Email" 
                        {...register("email", {
                            required: "Email is required",
                            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        })}
                    />
                    <input 
                        className={styles.formField}
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <button className={styles.loginButton} type="submit">Log in</button>
                </form>
            </div>
        </main>

    );
}
