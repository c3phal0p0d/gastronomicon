'use client';

import type { PutBlobResult } from '@vercel/blob';
import styles from './page.module.css';
import ImageUploadForm from './components/ImageUploadForm';
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';

type Inputs = {
    recipeName: string,
    imageURL: string,
    preparationTime: string,
    servings: number,
    category: string,
    ingredients: string,
    instructions: string,
    sourceURL: string,
    addedBy: string | null
};

export default function RecipeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageURL, setImageURL] = useState("");

    const params = useSearchParams()!;
    const router = useRouter();

    const { data: session, status } = useSession();

    // if (status !== "authenticated") {
    //     router?.push("/login");
    // }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            recipeName: "",
            imageURL: "",
            preparationTime: "",
            servings: undefined,
            category: "",
            ingredients: "",
            instructions: "",
            sourceURL: "",
            addedBy: "",
        },
    });

    const [message, setMessage] = useState<null | string>(null);

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { recipeName, preparationTime, servings, category, ingredients, instructions, sourceURL } = form;

        let addedBy = "";

        if (session?.user?.email) {
            addedBy = session.user.email;
        }

        try {
            const res = await fetch("/api/recipe/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeName,
                    imageURL,
                    preparationTime,
                    servings,
                    category,
                    ingredients,
                    instructions,
                    sourceURL,
                    addedBy,
                }),
            });
            res.status === 201 &&
                router.push("/");
        } catch (err: any) {
            setMessage(err);
        }
    };

    return (
        <main className={styles.main}>
            <h2 className={styles.heading}>Add recipe</h2>
            <div className={styles.imageUploadContainer}>
                <form className={styles.imageUploadForm}
                    onSubmit={async (event) => {
                        event.preventDefault();

                        setUploading(true);

                        console.log("app url: ", process.env.APP_URL);

                        const response = await fetch(
                            '/api/recipe/upload/image',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filename: file?.name, contentType: file?.type }),
                            }
                        )

                        if (response.ok) {
                            const { url, fields, key } = await response.json();

                            const formData = new FormData();
                            Object.entries(fields).forEach(([key, value]) => {
                                formData.append(key, value as string)
                            });
                            if (file) {
                                formData.append('file', file);
                            };

                            const uploadResponse = await fetch(url, {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Headers": "*"
                                },
                            })
                            
                            if (uploadResponse.ok) {
                                setImageURL("https://gastronomicon.s3.amazonaws.com/" + key);
                                alert('Upload successful!');
                            } else {
                                console.error('S3 Upload Error:', uploadResponse)
                                alert('Upload failed.')
                            }
                        } else {
                            alert('Failed to get pre-signed URL.')
                        }

                        setUploading(false);

                    }}
                >
                    <input id="file"
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                                setFile(files[0])
                            }
                        }}
                        accept="image/png, image/jpeg"
                    />
                    <button type="submit" className={styles.uploadImageButton} disabled={uploading}>Upload</button>
                </form>
            </div>
            <form className={styles.addRecipeForm} onSubmit={handleSubmit(formSubmit)}>
                <input
                    className={styles.formField}
                    type="text"
                    placeholder="Recipe name"
                    {...register("recipeName", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="string"
                    placeholder="Preparation time"
                    {...register("preparationTime", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="number"
                    placeholder="Servings"
                    {...register("servings", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="string"
                    placeholder="Category"
                    {...register("category")}
                />
                <textarea
                    className={styles.formTextArea}
                    placeholder="Ingredients"
                    {...register("ingredients", {
                        required: "Required",
                    })}
                />
                <textarea
                    className={styles.formTextArea}
                    placeholder="Instructions"
                    {...register("instructions", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="text"
                    placeholder="Original recipe source (URL)"
                    {...register("sourceURL")}
                />
                <div className="buttonsContainer">
                    <button type="submit" className={styles.submitButton}>Submit</button>
                    <Link href="/" className={styles.cancelButton}>Cancel</Link>
                </div>
            </form>
        </main>
    );

}