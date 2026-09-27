import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const VictoryScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 曙光冲破黑暗
  const lightProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lightWidth = interpolate(lightProgress, [0, 1], [0, 100]);
  const lightOpacity = interpolate(lightProgress, [0, 0.5, 1], [0, 0.8, 1]);

  // 标题动画
  const titleOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [40, 90], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 光芒射线
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const length = interpolate(frame, [20 + i * 3, 60 + i * 3], [0, 300], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
    const opacity = interpolate(frame, [20 + i * 3, 50 + i * 3], [0, 0.6], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          width: 3,
          height: length,
          background:
            "linear-gradient(to top, rgba(255,215,0,0.8), transparent)",
          transformOrigin: "bottom center",
          transform: `rotate(${angle}rad) translateX(-50%)`,
          opacity,
          filter: "blur(1px)",
        }}
      />
    );
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
      {/* 底部曙光 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${lightWidth}%`,
          background:
            "linear-gradient(to top, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 50%, transparent 100%)",
          opacity: lightOpacity,
        }}
      />

      {/* 光芒射线 */}
      {rays}

      {/* 中心光源 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.6) 40%, transparent 70%)",
          transform: `scale(${interpolate(frame, [30, 90], [0, 1.5], {
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          })})`,
          opacity: interpolate(frame, [30, 70], [0, 1], {
            extrapolateRight: "clamp",
          }),
          filter: "blur(20px)",
        }}
      />

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: "bold",
            color: "#ffd700",
            letterSpacing: 12,
            textShadow: "0 0 50px rgba(255,215,0,0.8)",
            fontFamily: "serif",
          }}
        >
          胜利曙光
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#ccc",
            marginTop: 20,
            letterSpacing: 6,
          }}
        >
          The Dawn of Victory
        </div>
      </div>

      {/* 年份标记 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          opacity: interpolate(frame, [60, 100], [0, 1], {
            extrapolateRight: "clamp",
          }),
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            color: "#ffd700",
            fontWeight: "bold",
            letterSpacing: 10,
            textShadow: "0 0 30px rgba(255,215,0,0.6)",
          }}
        >
          1945
        </div>
      </div>
    </AbsoluteFill>
  );
};
