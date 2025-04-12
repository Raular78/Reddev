import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const width = searchParams.get('width') || '300';
  const height = searchParams.get('height') || '200';
  
  // Crear un SVG placeholder con las dimensiones especificadas
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">RedDev ${width}x${height}</text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}