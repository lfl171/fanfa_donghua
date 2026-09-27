import { Composition } from "remotion";
import { AntiFascistWar } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AntiFascistWar"
        component={AntiFascistWar}
        durationInFrames={660}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
