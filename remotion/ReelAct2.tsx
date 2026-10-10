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

// Verified activity rows (app/page.tsx), shortened for 9:16 legibility.
const ROWS = [
  {
    n: '01',
    title: 'HACKATHONS & GAME JAMS',
    text: 'Weekend sprints — rough ideas become playable, working things.',
  },
  {
    n: '02',
    title: 'CONTENT & DESIGN',
    text: 'Writing, video, visuals people actually want to share.',
  },
  {
    n: '03',
    title: 'COURSE CREATION',
    text: 'Hands-on courses built from real work, not textbooks.',
  },
  {
    n: '04',
    title: 'TEACHING & MENTORSHIP',
    text: 'Builders teaching builders, a few steps ahead.',
  },
  {
    n: '05',
    title: 'LEARN BY BUILDING',
    text: 'Pick up skills by shipping real projects in public.',
  },
];

const ROW_Y = [470, 695, 920, 1145, 1370];

const PracticeRow: React.FC<{
  n: string;
  title: string;
  text: string;
  y: number;
  delay: number;
}> = ({n, title, text, y, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: theme.spring.smooth});
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
        borderTop: `1px solid ${theme.colors.softLine}`,
        borderBottom: `1px solid ${theme.colors.softLine}`,
        backgroundColor: theme.colors.bgAlt,
        padding: '30px 36px',
      }}
    >
      <div style={{display: 'flex', alignItems: 'baseline', gap: 22}}>
        <span
          style={{
            color: theme.colors.fog,
            fontFamily: theme.fonts.body,
            fontSize: 24,
            letterSpacing: '0.17em',
          }}
        >
          {n}
        </span>
        <span
          style={{
            color: theme.colors.paper,
            fontFamily: theme.fonts.body,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          color: theme.colors.fog,
          fontFamily: theme.fonts.body,
          fontSize: 27,
          lineHeight: 1.45,
          marginTop: 14,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ReelAct2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ease = Easing.inOut(Easing.cubic);
  const KEY_T = [0, 40, 120, 200, 260, 299];
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
  const z = interpolate(frame, KEY_T, [1.1, 1.1, 1.03, 1.0, 1.0, 1.0], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Match-cut: Act 1 lockup recedes as the wall takes over.
  const lockO = interpolate(frame, [30, 70], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lockS = interpolate(frame, [0, 70], [0.62, 0.4], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eyebrowP = spring({frame: frame - 25, fps, config: theme.spring.snappy});
  // Gold progress rule fills as rows complete (rows cause the fill).
  const ruleP = interpolate(frame, [45, 200], [0, 1], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sectionP = spring({frame: frame - 200, fps, config: theme.spring.snappy});
  const breathe = 1 + Math.sin(frame / 24) * 0.006;

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
        {lockO > 0.001 && (
          <div
            style={{
              position: 'absolute',
              left: CX,
              top: 960,
              transform: `translate(-50%, -50%) scale(${lockS})`,
              opacity: lockO,
              color: theme.colors.paper,
              fontFamily: theme.fonts.display,
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: '0.24em',
              textIndent: '0.24em',
            }}
          >
            TURYA
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            left: CX,
            top: 300,
            transform: 'translateX(-50%)',
            opacity: Math.max(0, Math.min(1, eyebrowP)),
            color: theme.colors.fog,
            fontFamily: theme.fonts.body,
            fontSize: 27,
            letterSpacing: '0.35em',
            textIndent: '0.35em',
          }}
        >
          THE PRACTICE
        </div>

        {/* THE hero accent: single gold progress rule */}
        <div
          style={{
            position: 'absolute',
            left: CX - 460,
            top: 380,
            width: 920,
            height: 3,
            backgroundColor: theme.colors.primary,
            transform: `scaleX(${ruleP})`,
            transformOrigin: 'left center',
          }}
        />

        {ROWS.map((r, i) => (
          <PracticeRow
            key={r.n}
            n={r.n}
            title={r.title}
            text={r.text}
            y={ROW_Y[i]}
            delay={45 + i * 14}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: CX,
            top: 1540,
            transform: `translateX(-50%) scale(${breathe})`,
            opacity: Math.max(0, Math.min(1, sectionP)),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <WordReveal
            text="ECOSYSTEM IN ACTION"
            delay={200}
            per={3}
            style={{justifyContent: 'center', gap: 20}}
            wordStyle={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.body,
              fontWeight: 600,
              fontSize: 44,
              letterSpacing: '0.14em',
            }}
          />
          <div
            style={{
              color: theme.colors.fog,
              fontFamily: theme.fonts.body,
              fontSize: 28,
              letterSpacing: '0.06em',
            }}
          >
            by doing, not just watching.
          </div>
        </div>
      </div>

      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
