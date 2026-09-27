import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { WarSpreadScene } from "./scenes/WarSpreadScene";
import { UnityScene } from "./scenes/UnityScene";
import { VictoryScene } from "./scenes/VictoryScene";
import { PeaceScene } from "./scenes/PeaceScene";

export const AntiFascistWar: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* 序章 - 黑暗降临 0-4s */}
      <Sequence from={0} durationInFrames={4 * fps} premountFor={fps}>
        <IntroScene />
      </Sequence>

      {/* 战火蔓延 4-9s */}
      <Sequence from={4 * fps} durationInFrames={5 * fps} premountFor={fps}>
        <WarSpreadScene />
      </Sequence>

      {/* 众志成城 9-14s */}
      <Sequence from={9 * fps} durationInFrames={5 * fps} premountFor={fps}>
        <UnityScene />
      </Sequence>

      {/* 胜利曙光 14-18s */}
      <Sequence from={14 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <VictoryScene />
      </Sequence>

      {/* 和平反思 18-22s */}
      <Sequence from={18 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <PeaceScene />
      </Sequence>
    </AbsoluteFill>
  );
};
