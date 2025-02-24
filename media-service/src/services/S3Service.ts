import fs from 'fs'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '../config/s3Client'
import { SUPABASE_PROJECT_URL } from '../config/env'
import logger from '../utils/logger'

type S3UploadSuccess = {
  message: string
  key: string
  location: string
}

export class S3Service {
  readonly bucket
  constructor(bucket: string) {
    this.bucket = bucket || 'uploads'
  }
  uploadToS3 = async (
    file: Express.Multer.File
  ): Promise<S3UploadSuccess | undefined> => {
    try {
      if (!file) throw new Error('File is required!')

      const fileStream = fs.createReadStream(file.path)
      const fileKey = file.filename

      const uploader = new Upload({
        client: s3Client,
        params: {
          Bucket: this.bucket,
          Key: fileKey,
          Body: fileStream,
          ContentType: file.mimetype
        }
      })

      await uploader.done()

      return {
        message: 'File uploaded successfully',
        key: fileKey,
        location: `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${this.bucket}/${fileKey}`
      }

      //   const uploadParams = {
      //     Bucket: this.bucket,
      //     Key: fileKey,
      //     Body: fileStream,
      //     ContentType: file.mimetype
      //   }

      //   await s3Client.send(new PutObjectCommand(uploadParams))
      //   return {
      //     message: 'File uploaded successfully',
      //     key: fileKey,
      //     location: `https://${this.bucket}.s3.${S3_REGION}.amazonaws.com/${fileKey}`
      //   }
    } catch (e) {
      logger.error('Error upload to S3', e)
    }
  }

  deleteFromS3 = async (fileKey: string) => {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: fileKey
        })
      )
    } catch (e) {
      logger.error('Error delete from S3', e)
    }
  }
}
