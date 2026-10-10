import React from 'react';
import {Composition} from 'remotion';
import {TuryaSting} from './TuryaSting';
import {ReelAct1} from './ReelAct1';
import {ReelAct2} from './ReelAct2';
import {ReelAct3} from './ReelAct3';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="TuryaSting"
        component={TuryaSting}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ReelAct1"
        component={ReelAct1}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ReelAct2"
        component={ReelAct2}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ReelAct3"
        component={ReelAct3}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
