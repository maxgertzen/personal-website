import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Max Gertzen — Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111',
          }}
        >
          Max Gertzen
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 300,
            color: '#555',
            marginTop: 16,
          }}
        >
          Full-Stack Developer
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 300,
            color: '#999',
            marginTop: 40,
            position: 'absolute',
            bottom: 40,
          }}
        >
          maxgertzen.com
        </div>
      </div>
    ),
    { ...size }
  );
}
