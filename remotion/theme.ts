// Turya video theme — single source of truth. No inline colors/easings elsewhere.
import {Easing} from 'remotion';

export const theme = {
  colors: {
    bg: '#060606',
    bgAlt: '#0C0C0C',
    paper: '#F2F0E8',
    fog: '#A5A49E',
    primary: '#C9A24B', // THE hero color — max one hero element per frame
    line: 'rgba(242, 240, 232, 0.24)',
    softLine: 'rgba(242, 240, 232, 0.13)',
  },
  fonts: {
    // Turya site stack (Arial/Helvetica) — offline-safe, brand-authentic.
    display: 'Arial, Helvetica, sans-serif',
    body: 'Arial, Helvetica, sans-serif',
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: {damping: 14, stiffness: 160, mass: 0.6},
    smooth: {damping: 20, stiffness: 90, mass: 1},
    bouncy: {damping: 11, stiffness: 170, mass: 0.7},
  },
} as const;

export const VIEW_W = 1080;
export const VIEW_H = 1920;
export const WORLD_W = 2160;
export const WORLD_H = 1920;
