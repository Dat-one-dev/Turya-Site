import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme, VIEW_W, VIEW_H, WORLD_W, WORLD_H} from './theme';
import {Grade, Grain, Starfield, Vignette, WordReveal} from './components';

const CX = 1080;

// First-party proof only: cbsemastery-card.tsx, homepage products,
// lib/events.ts (Falling Sun). Descriptions shortened for legibility.
const PROOF = [
  {
    status: 'LIVE',
    index: 'EDUCATION / 01',
    title: 'cbsemastery.in',
    text: 'Programming and CS courses for understanding — not just exams.',
    y: 450,
  },
  {
    status: 'NEXT',
    index: 'EXPERIMENTS / 02',
    title: 'Open shelf',
    text: 'Prompts, tools, and tiny starting points. Coming into focus.',
    y: 720,
  },
  {
    status: 'UPCOMING',
    index: '24–25 OCT · DELHI',
    title: 'Falling Sun',
    text: 'A two-day IRL sprint. Show up with a rough idea, leave shipped.',
    y: 1000,
  },
];

const ProofRow: React.FC<{
  status: string;
  index: string;
  title: string;
  text: string;
  y: number;
  delay: number;
}> = ({status, index, title, text, y, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: theme.spring.smooth});
  const dotP = spring({frame: frame - delay - 8, fps, config: theme.spring.bouncy});
  const opacity = Math.max(0, Math.min(1, p));
  if (opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: CX,
        top: y,
        width: 920,
        opacity,
        transform: `translate(-50%, -50%) translateY(${interpolate(p, [0, 1], [44, 0], {
          easing: theme.ease.out,
        })}px) scale(${interpolate(p, [0, 1], [0.96, 1], {
          easing: theme.ease.out,
        })})`,
        border: `1px solid ${theme.colors.line}`,
        backgroundColor: theme.colors.bgAlt,
        boxShadow: '0 24px 60px -24px rgba(0,0,0,0.55)',
        padding: '28px 36px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: theme.colors.fog,
              transform: `scale(${Math.max(0.01, dotP)})`,
            }}
          />
          <span
            style={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.body,
              fontSize: 24,
              letterSpacing: '0.17em',
            }}
          >
            {status}
          </span>
        </div>
        <span
          style={{
            color: theme.colors.fog,
            fontFamily: theme.fonts.body,
            fontSize: 22,
            letterSpacing: '0.14em',
          }}
        >
          {index}
        </span>
      </div>
      <div
        style={{
          color: theme.colors.paper,
          fontFamily: theme.fonts.display,
          fontWeight: 200,
          fontSize: 64,
          letterSpacing: '-0.03em',
          marginTop: 18,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: theme.colors.fog,
          fontFamily: theme.fonts.body,
          fontSize: 27,
          lineHeight: 1.45,
          marginTop: 12,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ReelAct3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ease = Easing.inOut(Easing.cubic);
  const KEY_T = [0, 45, 120, 180, 230, 299];
  const fx = interpolate(frame, KEY_T, [1080, 1080, 1080, 1080, 1080, 1080], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fy = interpolate(frame, KEY_T, [960, 960, 960, 960, 960, 960], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const z = interpolate(frame, KEY_T, [1.25, 1.25, 1.08, 1.0, 1.0, 1.0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Faint wall-divider remnant for continuity with Act 2, then gone.
  const remnantO = interpolate(frame, [0, 40], [0.5, 0], {
    easing: theme.ease.in,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eyebrowP = spring({frame: frame - 150, fps, config: theme.spring.snappy});
  const ruleP = interpolate(frame, [175, 200], [0, 1], {
    easing: theme.ease.out,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaP = spring({frame: frame - 190, fps, config: theme.spring.snappy});
  const breathe = 1 + Math.sin(frame / 22) * 0.008;

  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
      <AbsoluteFill>
        <Starfield width={WORLD_W} height={WORLD_H} />
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(${VIEW_W / 2 - fx}px, ${VIEW_H / 2 - fy}px) scale(${z})`,
          transformOrigin: `${fx}px ${fy}px`,
        }}
      >
        {remnantO > 0.001 && (
          <div style={{position: 'absolute', left: 0, top: 0, opacity: remnantO}}>
            {[560, 800, 1040].map((y) => (
              <div
                key={y}
                style={{
                  position: 'absolute',
                  left: CX - 460,
                  top: y,
                  width: 920,
                  height: 1,
                  backgroundColor: theme.colors.softLine,
                }}
              />
            ))}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            left: CX,
            top: 210,
            transform: 'translateX(-50%)',
            opacity: interpolate(frame, [40, 70], [0, 1], {
              easing: theme.ease.out,
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            color: theme.colors.fog,
            fontFamily: theme.fonts.body,
            fontSize: 27,
            letterSpacing: '0.35em',
            textIndent: '0.35em',
          }}
        >
          USEFUL THINGS, ALREADY IN MOTION
        </div>

        {PROOF.map((r, i) => (
          <ProofRow
            key={r.title}
            status={r.status}
            index={r.index}
            title={r.title}
            text={r.text}
            y={r.y}
            delay={10 + i * 24}
          />
        ))}

        {/* Closing lockup: THE hero accent is the gold CTA rule */}
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: 1300,
            transform: `translateX(-50%) scale(${breathe})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 940,
          }}
        >
          <div
            style={{
              opacity: Math.max(0, Math.min(1, eyebrowP)),
              color: theme.colors.fog,
              fontFamily: theme.fonts.body,
              fontSize: 26,
              letterSpacing: '0.35em',
              textIndent: '0.35em',
              marginBottom: 26,
            }}
          >
            FIND YOUR PEOPLE
          </div>
          <WordReveal
            text="There is always room for one more."
            delay={158}
            per={3}
            style={{justifyContent: 'center', gap: 20}}
            wordStyle={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.display,
              fontWeight: 200,
              fontSize: 72,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              textAlign: 'center',
            }}
          />
          <div
            style={{
              width: 240,
              height: 3,
              backgroundColor: theme.colors.primary,
              marginTop: 32,
              marginBottom: 28,
              transform: `scaleX(${ruleP})`,
              transformOrigin: 'left center',
            }}
          />
          <div
            style={{
              opacity: Math.max(0, Math.min(1, ctaP)),
              borderBottom: `1px solid ${theme.colors.paper}`,
              paddingBottom: 10,
              color: theme.colors.paper,
              fontFamily: theme.fonts.body,
              fontSize: 30,
              letterSpacing: '0.14em',
            }}
          >
            SAY HELLO — TURYA.SUNYA@GMAIL.COM
          </div>
        </div>
      </div>

      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
