import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'db.json');

export default function handler(req, res) {
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
  res.status(200).json(db.retos);
}