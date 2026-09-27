import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

const Dove: React.FC<{ delay: number; startX: number; startY: number }> = ({
  delay,
  startX,
  startY,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const x = interpolate(progress, [0, 1], [startX, startX + 30]);
  const y = interpolate(progress, [0, 1], [startY, startY - 40]);
  const opacity = interpolate(progress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const wingFlap = Math.sin(frame * 0.3) * 15;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `rotate(${wingFlap}deg)`,
      }}
    >
      {/* 简化和平鸽形状 */}
      <svg width="60" height="40" viewBox="0 0 60 40">
        <path
          d="M10 25 Q20 15 30 20 Q40 10 50 15 Q55 18 52 22 Q45 28 35 25 Q25 30 15 28 Q8 27 10 25"
          fill="rgba(255,255,255,0.9)"
          stroke="rgba(200,200,200,0.5)"
          strokeWidth="1"
        />
        <path
          d="M30 20 Q35 5 45 8 Q40 15 35 18"
          fill="rgba(255,255,255,0.7)"
        />
      </svg>
    </div>
  );
};

export const PeaceScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入
  const titleOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleScale = interpolate(frame, [20, 70], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 橄榄枝生长
  const branchProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 和平鸽配置
  const doves = [
    { delay: 10, startX: 20, startY: 70 },
    { delay: 25, startX: 50, startY: 75 },
    { delay: 40, startX: 75, startY: 70 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f0a",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景光晕 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at center, rgba(34,139,34,0.1) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 60], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* 和平鸽 */}
      {doves.map((d, i) => (
        <Dove key={i} {...d} />
      ))}

      {/* 橄榄枝 */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [40, 80], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg
          width="300"
          height="100"
          viewBox="0 0 300 100"
          style={{
            transform: `scaleX(${branchProgress})`,
            transformOrigin: "center",
          }}
        >
          <path
            d="M50 50 Q100 30 150 50 Q200 70 250 50"
            fill="none"
            stroke="#228b22"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 叶子 */}
          <ellipse cx="80" cy="42" rx="12" ry="6" fill="#228b22" opacity="0.8" transform="rotate(-20 80 42)" />
          <ellipse cx="120" cy="48" rx="12" ry="6" fill="#228b22" opacity="0.8" transform="rotate(10 120 48)" />
          <ellipse cx="180" cy="48" rx="12" ry="6" fill="#228b22" opacity="0.8" transform="rotate(-10 180 48)" />
          <ellipse cx="220" cy="42" rx="12" ry="6" fill="#228b22" opacity="0.8" transform="rotate(20 220 42)" />
        </svg>
      </div>

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#90ee90",
            letterSpacing: 10,
            textShadow: "0 0 40px rgba(144,238,144,0.4)",
            fontFamily: "serif",
          }}
        >
          珍爱和平
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#888",
            marginTop: 16,
            letterSpacing: 5,
          }}
        >
          Cherish Peace
        </div>
      </div>

      {/* 底部寓意文字 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          opacity: interpolate(frame, [70, 110], [0, 1], {
            extrapolateRight: "clamp",
          }),
          textAlign: "center",
          maxWidth: 800,
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#777",
            letterSpacing: 3,
            lineHeight: 2,
          }}
        >
          历史是最好的教科书，也是最好的清醒剂
          <br />
          铭记历史，不是为了延续仇恨，而是为了守护和平
        </div>
      </div>
    </AbsoluteFill>
  );
};
