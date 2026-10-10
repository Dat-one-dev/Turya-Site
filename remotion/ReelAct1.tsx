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
const CY = 820;

// Same five verified fragments as the sting, re-timed for the 10s hook.
const FRAGMENTS = [
  {n: '01', label: 'HACKATHONS', x: 660, y: 620},
  {n: '02', label: 'GAME JAMS', x: 960, y: 750},
  {n: '03', label: 'CONTENT & DESIGN', x: 740, y: 1000},
  {n: '04', label: 'COURSE CREATION', x: 930, y: 1150},
  {n: '05', label: 'MENTORSHIP', x: 700, y: 1370},
];

const FragmentChip: React.FC<{
  n: string;
  label: string;
  x: number;
  y: number;
  delay: number;
}> = ({n, label, x, y, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: theme.spring.smooth});
  const driftY = Math.sin((frame + delay * 3) / 30) * 6;
  const cx = interpolate(frame, [170, 225], [x, CX], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cy = interpolate(frame, [170, 225], [y + driftY, CY + 140], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fade = interpolate(frame, [212, 238], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shrink = interpolate(frame, [170, 225], [1, 0.82], {
    easing: theme.ease.inOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.max(0, Math.min(1, p)) * fade;
  if (opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: cx,
        top: cy,
        opacity,
        transform: `translate(-50%, -50%) scale(${interpolate(p, [0, 1], [0.9, 1], {
          easing: theme.ease.out,
        }) * shrink})`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          backgroundColor: theme.colors.bgAlt,
          border: `1px solid ${theme.colors.line}`,
          boxShadow: '0 24px 60px -24px rgba(0,0,0,0.55)',
          padding: '22px 28px',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            color: theme.colors.fog,
            fontFamily: theme.fonts.body,
            fontSize: 20,
            letterSpacing: '0.17em',
          }}
        >
          {n}
        </span>
        <span
          style={{
            color: theme.colors.paper,
            fontFamily: theme.fonts.body,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: '0.12em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const ReelAct1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ease = Easing.inOut(Easing.cubic);
  const KEY_T = [0, 70, 95, 130, 175, 240, 275, 299];
  const fx = interpolate(
    frame,
    KEY_T,
    [740, 740, 740, 900, 1080, 1080, 1080, 1080],
    {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fy = interpolate(
    frame,
    KEY_T,
    [960, 960, 960, 950, 960, 960, 960, 960],
    {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const z = interpolate(
    frame,
    KEY_T,
    [1.3, 1.3, 1.3, 1.15, 1.0, 1.02, 1.02, 1.02],
    {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const markP = spring({frame: frame - 195, fps, config: theme.spring.bouncy});
  const ruleP = interpolate(frame, [210, 240], [0, 1], {
    easing: theme.ease.out,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eyebrowP = spring({frame: frame - 225, fps, config: theme.spring.snappy});
  const footP = spring({frame: frame - 245, fps, config: theme.spring.snappy});
  const linkIn = interpolate(frame, [90, 130], [0, 1], {
    easing: theme.ease.out,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linkOut = interpolate(frame, [170, 200], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linkO = linkIn * linkOut;
  const ringO = interpolate(frame, [130, 170], [0, 0.9], {
    easing: theme.ease.out,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const breathe = 1 + Math.sin(frame / 22) * 0.008;
  const lockupScale =
    interpolate(markP, [0, 1], [0.92, 1], {easing: theme.ease.out}) * breathe;

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
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: CY + 140,
            width: 920,
            height: 920,
            opacity: ringO,
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${theme.colors.softLine}`,
            borderRadius: '50%',
          }}
        />

        <svg
          width={WORLD_W}
          height={WORLD_H}
          style={{position: 'absolute', left: 0, top: 0, opacity: linkO}}
        >
          {FRAGMENTS.map((f, i) => (
            <line
              key={i}
              x1={f.x}
              y1={f.y}
              x2={CX}
              y2={CY + 140}
              stroke={theme.colors.paper}
              strokeOpacity={0.28}
              strokeWidth={1.5}
              strokeDasharray={1}
              pathLength={1}
              strokeDashoffset={1 - linkIn}
            />
          ))}
        </svg>

        {FRAGMENTS.map((f, i) => (
          <FragmentChip
            key={f.n}
            n={f.n}
            label={f.label}
            x={f.x}
            y={f.y}
            delay={6 + i * 6}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: CX,
            top: CY + 140,
            transform: `translate(-50%, -50%) scale(${lockupScale})`,
            opacity: Math.max(0, Math.min(1, markP)),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 900,
          }}
        >
          <div
            style={{
              opacity: Math.max(0, Math.min(1, eyebrowP)),
              color: theme.colors.fog,
              fontFamily: theme.fonts.body,
              fontSize: 27,
              letterSpacing: '0.35em',
              marginBottom: 34,
              textIndent: '0.35em',
            }}
          >
            A PLACE TO BEGIN
          </div>
          <div
            style={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.display,
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: '0.24em',
              textIndent: '0.24em',
              lineHeight: 1,
            }}
          >
            TURYA
          </div>
          <div
            style={{
              width: 240,
              height: 3,
              backgroundColor: theme.colors.primary,
              marginTop: 36,
              marginBottom: 36,
              transform: `scaleX(${ruleP})`,
              transformOrigin: 'left center',
            }}
          />
          <WordReveal
            text="Go Beyond."
            delay={218}
            per={4}
            style={{justifyContent: 'center', gap: 24}}
            wordStyle={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.display,
              fontWeight: 200,
              fontSize: 96,
              letterSpacing: '-0.02em',
              lineHeight: 1.02,
            }}
          />
          <WordReveal
            text="Make Something."
            delay={229}
            per={4}
            style={{justifyContent: 'center', gap: 24}}
            wordStyle={{
              color: theme.colors.paper,
              fontFamily: theme.fonts.display,
              fontWeight: 200,
              fontSize: 96,
              letterSpacing: '-0.02em',
              lineHeight: 1.02,
            }}
          />
          <div
            style={{
              opacity: Math.max(0, Math.min(1, footP)),
              color: theme.colors.fog,
              fontFamily: theme.fonts.body,
              fontSize: 25,
              letterSpacing: '0.3em',
              textIndent: '0.3em',
              marginTop: 40,
            }}
          >
            ECOSYSTEM FOR YOUNG BUILDERS
          </div>
        </div>
      </div>

      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
