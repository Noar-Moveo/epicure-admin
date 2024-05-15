import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: "AKIAZQ3DTA4XWDI3NJMX",
    secretAccessKey: "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",
  },
});

export async function fetchImagesFromS3(bucketName: string): Promise<string[]> {
  try {
    const data = await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );
    return data.Contents?.map((item) => item.Key) || [];
  } catch (err) {
    console.error("Error fetching images from S3", err);
    return [];
  }
}
