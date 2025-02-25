import { S3Client } from '@aws-sdk/client-s3'
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_REGION, S3_URL } from './env'

export const s3Client = new S3Client({
  forcePathStyle: true, // Required for Supabase
  region: S3_REGION,
  endpoint: S3_URL,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})
