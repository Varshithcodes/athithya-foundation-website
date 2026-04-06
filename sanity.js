import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// This client handles both READ (public) and WRITE (with token)
const getWriteToken = () => {
  return "skacpSe1YADeBSjFRDpXCWdGjxy4uO0jubtTB0Zk7p00Qn55Tgx1SgRfSqJLHHoPBDSNyvB8dx3MYcaChRHb1oyq3NtFNoywoBrCUNlwbSzKTVI8apVjZ8NKgazccUq2kdwurCORlNsEj1LdI3Xz4Voq00Z9KkkmDJ4Wn4chZQXsHh9BHg89";
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
