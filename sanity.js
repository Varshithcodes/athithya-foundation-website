import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// This client handles both READ (public) and WRITE (with token)
// It prioritizes environment variables, then falls back to localStorage for the admin panel.
const getWriteToken = () => {
  if (typeof process !== 'undefined' && process.env.SANITY_SECRET_TOKEN) {
    return process.env.SANITY_SECRET_TOKEN;
  }
  if (typeof window !== 'undefined') {
    return localStorage.getItem('af_sanity_token');
  }
  return null;
};

export const client = createClient({
  projectId: "m5wsa8rt",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: getWriteToken(),
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source).url();
};
