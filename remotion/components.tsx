import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from './theme';

// Premium entrance: opacity + rise + scale together. Never a lone fade.
export const Entrance: React.FC<{delay?: number; children: React.ReactNode}> = ({
  delay = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: theme.spring.smooth});
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [44, 0], {
          easing: theme.ease.out,
        })}px) scale(${interpolate(p, [0, 1], [0.94, 1], {
          easing: theme.ease.out,
        })})`,
      }}
    >
      {children}
    </div>
  );
};

// Word-by-word reveal with stagger. Pixel gaps handled by callers.
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  per?: number;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
}> = ({text, delay = 0, per = 3, style, wordStyle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', ...style}}>
      {text.split(' ').map((word, i) => {
        const p = spring({
          frame: frame - delay - i * per,
          fps,
          config: theme.spring.snappy,
        });
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [30, 0], {
                easing: theme.ease.out,
              })}px)`,
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Flat ink starfield (Turya site motif). Tiny paper dots, slow drift.
// No gradient orbs, no colored glows — flat fills only.
const STARS: Array<{x: number; y: number; r: number; o: number}> = [
  {x: 120, y: 200, r: 1.6, o: 0.8},
  {x: 300, y: 420, r: 1.1, o: 0.5},
  {x: 520, y: 180, r: 1.4, o: 0.7},
  {x: 700, y: 340, r: 1.0, o: 0.45},
  {x: 900, y: 150, r: 1.7, o: 0.75},
  {x: 1050, y: 400, r: 1.1, o: 0.5},
  {x: 1250, y: 220, r: 1.5, o: 0.7},
  {x: 1420, y: 430, r: 1.0, o: 0.45},
  {x: 1600, y: 170, r: 1.6, o: 0.8},
  {x: 1780, y: 380, r: 1.1, o: 0.5},
  {x: 1980, y: 210, r: 1.4, o: 0.65},
  {x: 2100, y: 450, r: 1.0, o: 0.4},
  {x: 180, y: 700, r: 1.2, o: 0.55},
  {x: 620, y: 820, r: 1.5, o: 0.7},
  {x: 980, y: 680, r: 1.0, o: 0.45},
  {x: 1330, y: 800, r: 1.6, o: 0.75},
  {x: 1700, y: 700, r: 1.1, o: 0.5},
  {x: 2050, y: 830, r: 1.4, o: 0.6},
  {x: 240, y: 1120, r: 1.4, o: 0.65},
  {x: 560, y: 1250, r: 1.0, o: 0.45},
  {x: 880, y: 1150, r: 1.6, o: 0.75},
  {x: 1200, y: 1280, r: 1.1, o: 0.5},
  {x: 1520, y: 1140, r: 1.5, o: 0.7},
  {x: 1860, y: 1270, r: 1.0, o: 0.45},
  {x: 2080, y: 1130, r: 1.3, o: 0.6},
  {x: 140, y: 1500, r: 1.5, o: 0.7},
  {x: 480, y: 1650, r: 1.0, o: 0.45},
  {x: 820, y: 1520, r: 1.4, o: 0.65},
  {x: 1150, y: 1680, r: 1.1, o: 0.5},
  {x: 1480, y: 1510, r: 1.6, o: 0.75},
  {x: 1820, y: 1660, r: 1.0, o: 0.45},
  {x: 2030, y: 1500, r: 1.4, o: 0.6},
  {x: 350, y: 1830, r: 1.1, o: 0.5},
  {x: 760, y: 1780, r: 1.4, o: 0.6},
  {x: 1300, y: 1840, r: 1.0, o: 0.45},
  {x: 1750, y: 1800, r: 1.3, o: 0.55},
];

export const Starfield: React.FC<{width: number; height: number}> = ({
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [0, -24], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tw = 0.72 + Math.sin(frame / 28) * 0.08;
  return (
    <div style={{position: 'absolute', width, height, overflow: 'hidden'}}>
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y + drift,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: '50%',
            backgroundColor: theme.colors.paper,
            opacity: s.o * tw,
          }}
        />
      ))}
    </div>
  );
};

// Unifying grade above content, below grain. Neutral — no colored wash.
export const Grade: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primary,
        mixBlendMode: 'soft-light',
        opacity: 0.1,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.12), transparent 28%, transparent 72%, rgba(0,0,0,0.22))',
      }}
    />
  </AbsoluteFill>
);

// Procedural grain — zero asset files.
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        backgroundImage: noise,
        backgroundSize: '220px',
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.07,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

// Neutral vignette, topmost.
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse at center, transparent 56%, rgba(0,0,0,0.24) 100%)',
    }}
  />
);
