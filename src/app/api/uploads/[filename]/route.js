// app/api/uploads/[filename]/route.js
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), 'uploads', filename);
  
  try {
    const fileContents = await fs.readFile(filePath);
    // تعیین Content-Type بر اساس پسوند فایل (اینجا فرض می‌کنیم jpg است)
    return new Response(fileContents, {
      headers: { 'Content-Type': 'image/jpeg' }
    });
  } catch (error) {
    return new Response('File not found', { status: 404 });
  }
}
    