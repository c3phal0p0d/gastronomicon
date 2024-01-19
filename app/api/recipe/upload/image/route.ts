import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    const { filename, contentType } = await request.json();

    const bucketName = process.env.AWS_BUCKET_NAME || "";

    try {
        const client = new S3Client({ region: process.env.AWS_REGION });
        const key = uuidv4();

        const { url, fields } = await createPresignedPost(client, {
            Bucket: bucketName,
            Key: key,
            Conditions: [
                ['content-length-range', 0, 10485760], // up to 10 MB
                ['starts-with', '$Content-Type', contentType],
            ],
            Fields: {
                acl: 'public-read',
                'Content-Type': contentType,
            },
            Expires: 600, // Seconds before the presigned post expires. 3600 by default.
        })
        return Response.json({ url, fields, key })
    } catch (error) {
        return Response.json({})
    }
}