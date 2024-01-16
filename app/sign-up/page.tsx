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
    confirmPassword: string;
};

export default function SignUp() {
    const params = useSearchParams()!;
    const session = useSession();
    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [error, setError] = useState<string | null>("");

    useEffect(() => {
        setError(params.get("error"));
    }, [params]);

    if (session.status === "authenticated") {
        router?.push("/");
    }

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { email, password } = form;
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            res.status === 201 &&
                router.push("/login?success=Account has been created");
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icons/app-icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <div className={styles.signUpContainer}>
                <h2 className={styles.signUpHeading}>Sign up for a new account</h2>
                <form className={styles.signUpForm} onSubmit={handleSubmit(formSubmit)}>
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
                            // pattern:
                            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                        })}
                    />
                    <input
                        className={styles.formField}
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                            required: "Password is required",
                            validate: (val) => {
                                if (watch('password') != val) {
                                    return "Your passwords do not match";
                                }
                            },
                        })}
                    />
                    <div className={styles.loginRedirectContainer}>Already have an account? <Link href="/login" className={styles.redirectLink}>Log in</Link></div>
                    <button className={styles.signUpButton} type="submit">Sign up</button>
                </form>
            </div>
        </main>

    );
}
