import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

const FlameParticle: React.FC<{
  delay: number;
  x: number;
  y: number;
  size: number;
}> = ({ delay, x, y, size }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 0]);
  const scale = interpolate(progress, [0, 1], [0.5, 1.5]);
  const rise = interpolate(progress, [0, 1], [0, -80]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,${Math.floor(
          100 + progress * 100
        )},0,0.9) 0%, rgba(255,50,0,0.6) 50%, transparent 100%)`,
        opacity,
        transform: `scale(${scale}) translateY(${rise}px)`,
        filter: "blur(2px)",
      }}
    />
  );
};

export const WarSpreadScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleOpacity = interpolate(frame, [10, 50], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 火焰粒子配置 - 代表战火蔓延
  const flames = [
    { delay: 0, x: 20, y: 60, size: 60 },
    { delay: 5, x: 35, y: 50, size: 80 },
    { delay: 10, x: 50, y: 55, size: 100 },
    { delay: 15, x: 65, y: 45, size: 70 },
    { delay: 20, x: 80, y: 55, size: 90 },
    { delay: 8, x: 28, y: 70, size: 50 },
    { delay: 12, x: 45, y: 65, size: 65 },
    { delay: 18, x: 72, y: 60, size: 55 },
    { delay: 25, x: 55, y: 40, size: 75 },
    { delay: 30, x: 15, y: 50, size: 45 },
  ];

  // 背景红光
  const redGlow = interpolate(frame, [0, 100], [0.1, 0.4], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0505",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景红光 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at bottom, rgba(139,0,0,${redGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* 火焰粒子 */}
      {flames.map((f, i) => (
        <FlameParticle key={i} {...f} />
      ))}

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#ff6b35",
            letterSpacing: 10,
            textShadow: "0 0 40px rgba(255,107,53,0.6)",
            fontFamily: "serif",
          }}
        >
          战火蔓延
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#aaa",
            marginTop: 16,
            letterSpacing: 5,
          }}
        >
          The Flame of War Spreads
        </div>
      </div>

      {/* 底部文字 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          opacity: interpolate(frame, [60, 100], [0, 1], {
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
          从欧洲到亚洲，从大西洋到太平洋
          <br />
          法西斯铁蹄踏碎和平，人类文明面临浩劫
        </div>
      </div>
    </AbsoluteFill>
  );
};
