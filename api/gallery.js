import { createClient } from '@sanity/client';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = createClient({
  projectId: 'm5wsa8rt',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN, // Protected Private Token
  apiVersion: '2023-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form' });

    const file = files.image[0];
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const caption = Array.isArray(fields.location) ? fields.location[0] : fields.location;

    try {
      // 1. Upload Asset
      const asset = await client.assets.upload('image', fs.createReadStream(file.filepath));
      
      // 2. Create Document
      const doc = await client.create({
        _type: 'galleryItem',
        title: title || 'New Photo',
        caption: caption || '',
        image: {
          _type: 'image',
          asset: { _ref: asset._id }
        }
      });

      res.status(200).json({ success: true, doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
}
