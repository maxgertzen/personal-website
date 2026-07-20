import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Max Gertzen — Senior Full-Stack Engineer, AI Integration';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  const [josefinBold, josefinLight, majorMono] = await Promise.all([
    fetch(new URL('../public/fonts/JosefinSans-Bold.ttf', import.meta.url)).then(
      (r) => r.arrayBuffer()
    ),
    fetch(
      new URL('../public/fonts/JosefinSans-Light.ttf', import.meta.url)
    ).then((r) => r.arrayBuffer()),
    fetch(
      new URL('../public/fonts/MajorMonoDisplay-Regular.ttf', import.meta.url)
    ).then((r) => r.arrayBuffer()),
  ]);

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
          position: 'relative',
          fontFamily: 'Josefin Sans',
          background:
            'linear-gradient(180deg, #210c33 0%, #43124f 34%, #160a26 66%, #07070c 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            width: 640,
            height: 640,
            top: 250,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(245,165,36,0.55), rgba(255,45,149,0.22) 46%, rgba(255,45,149,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: 402,
            left: 0,
            right: 0,
            height: 2,
            background:
              'linear-gradient(90deg, rgba(245,165,36,0) 0%, rgba(245,165,36,0.9) 30%, #ff2d95 50%, rgba(245,165,36,0.9) 70%, rgba(245,165,36,0) 100%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            zIndex: 1,
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          Max Gertzen
        </div>
        <div
          style={{
            display: 'flex',
            zIndex: 1,
            fontSize: 34,
            fontWeight: 300,
            color: '#f5cfa0',
            marginTop: 18,
          }}
        >
          Senior Full-Stack Engineer · AI Integration
        </div>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            bottom: 46,
            fontFamily: 'Major Mono Display',
            fontSize: 24,
            color: '#9a8fc0',
          }}
        >
          maxgertzen.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Josefin Sans', data: josefinBold, weight: 700, style: 'normal' },
        {
          name: 'Josefin Sans',
          data: josefinLight,
          weight: 300,
          style: 'normal',
        },
        {
          name: 'Major Mono Display',
          data: majorMono,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}
