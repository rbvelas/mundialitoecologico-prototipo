import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'db.json');

export default function handler(req, res) {
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
  const { ronda } = req.query;
  const data = ronda ? db.resultados.filter((r) => r.ronda === ronda) : db.resultados;
  res.status(200).json(data);
}