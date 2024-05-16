import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const fetchImagesFromS3Folder = async (
  bucket: string,
  folder: string
) => {
  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params = {
    Bucket: bucket,
    Prefix: folder,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents.map((item) => item.Key);
  } catch (err) {
    console.error("Error fetching images from S3:", err);
    return [];
  }
};
