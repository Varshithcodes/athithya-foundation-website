import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "m5wsa8rt",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false, // Use false for real-time updates (like moderation)
  token: process.env.SANITY_SECRET_TOKEN, // For submitting forms
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
