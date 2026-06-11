import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'feedback.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.push({
    id: Date.now(),
    name: body.name,
    message: body.message,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return Response.json({ success: true });
}

export async function DELETE(req) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const updated = data.filter((item) => item.id !== body.id);

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return Response.json({ success: true });
}
