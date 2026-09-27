import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

const LightBeam: React.FC<{
  delay: number;
  angle: number;
  color: string;
}> = ({ delay, angle, color }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const height = interpolate(progress, [0, 1], [0, 400]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.8, 0.4]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "50%",
        left: "50%",
        width: 4,
        height,
        background: `linear-gradient(to top, ${color}, transparent)`,
        transformOrigin: "bottom center",
        transform: `rotate(${angle}deg) translateX(-50%)`,
        opacity,
        filter: "blur(1px)",
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
};

export const UnityScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleScale = interpolate(frame, [20, 70], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 中心光球
  const glowScale = interpolate(frame, [0, 100], [0.5, 1.3], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const glowOpacity = interpolate(frame, [0, 60], [0.3, 0.9], {
    extrapolateRight: "clamp",
  });

  // 光束配置 - 代表各国力量汇聚
  const beams = [
    { delay: 0, angle: -60, color: "#d4af37" },
    { delay: 5, angle: -30, color: "#c0c0c0" },
    { delay: 10, angle: 0, color: "#d4af37" },
    { delay: 15, angle: 30, color: "#c0c0c0" },
    { delay: 20, angle: 60, color: "#d4af37" },
    { delay: 8, angle: -45, color: "#cd7f32" },
    { delay: 12, angle: 45, color: "#cd7f32" },
    { delay: 18, angle: -15, color: "#a0a0a0" },
    { delay: 22, angle: 15, color: "#a0a0a0" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050510",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景光晕 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* 光束 */}
      {beams.map((b, i) => (
        <LightBeam key={i} {...b} />
      ))}

      {/* 中心光点 */}
      <div
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #fff 0%, rgba(212,175,55,0.8) 50%, transparent 100%)",
          transform: `scale(${interpolate(frame, [0, 80], [0, 1], {
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          })})`,
          boxShadow: "0 0 60px rgba(212,175,55,0.8)",
        }}
      />

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
          zIndex: 10,
          position: "relative",
          marginTop: 200,
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: "bold",
            color: "#d4af37",
            letterSpacing: 10,
            textShadow: "0 0 40px rgba(212,175,55,0.6)",
            fontFamily: "serif",
          }}
        >
          众志成城
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#aaa",
            marginTop: 16,
            letterSpacing: 5,
          }}
        >
          United We Stand
        </div>
      </div>

      {/* 底部文字 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          opacity: interpolate(frame, [70, 110], [0, 1], {
            extrapolateRight: "clamp",
          }),
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#999",
            letterSpacing: 3,
            lineHeight: 1.8,
          }}
        >
          不同肤色、不同语言、不同信仰的人们
          <br />
          为了共同的正义事业，携手并肩作战
        </div>
      </div>
    </AbsoluteFill>
  );
};
