import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { type, updatedData } = req.body;

  const filePath = path.join(process.cwd(), 'data', `${type}.json`);

  let existingData = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(fileContents);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  const updatedItems = existingData.map((item: any) =>
    item.id === updatedData.id ? updatedData : item
  );

  try {
    fs.writeFileSync(filePath, JSON.stringify(updatedItems, null, 2), 'utf8');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to write data' });
  }
}