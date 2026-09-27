import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入
  const titleOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 年份淡入
  const yearOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 背景阴影扩散
  const shadowScale = interpolate(frame, [0, 120], [0.8, 1.5], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const shadowOpacity = interpolate(frame, [0, 60], [0, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 扩散的阴影层 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(139,0,0,0.3) 0%, rgba(0,0,0,0.9) 70%)",
          transform: `scale(${shadowScale})`,
          opacity: shadowOpacity,
        }}
      />

      {/* 铁幕线条 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #8b0000, transparent)",
          top: "30%",
          opacity: interpolate(frame, [30, 70], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 0 20px #8b0000",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #8b0000, transparent)",
          top: "70%",
          opacity: interpolate(frame, [40, 80], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 0 20px #8b0000",
        }}
      />

      {/* 主标题 */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#d4af37",
            letterSpacing: 12,
            textShadow: "0 0 30px rgba(212,175,55,0.5)",
            fontFamily: "serif",
          }}
        >
          黑暗降临
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#888",
            marginTop: 20,
            letterSpacing: 6,
          }}
        >
          The Darkness Falls
        </div>
      </div>

      {/* 年份 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          opacity: yearOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            color: "#8b0000",
            fontWeight: "bold",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(139,0,0,0.8)",
          }}
        >
          1931 — 1945
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#666",
            marginTop: 10,
            letterSpacing: 4,
          }}
        >
          世界反法西斯战争
        </div>
      </div>
    </AbsoluteFill>
  );
};
