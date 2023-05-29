import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 900px;
  background: linear-gradient(180deg, #12100e 0%, #12100e 50%, #2b4162 100%);
  position: relative;
  overflow: hidden;
`;
/** 동적인 움직임을 주기 위해 scroll에 따라 위치와 각도가 변화하는 달 */
const Moon = styled.img`
  position: absolute;
  height: 25%;
  rotate: ${(props) => {
    return props.Gauge * 0.1 + "deg";
  }};
  top: ${(props) => {
    return props.Gauge < 850 ? props.Gauge + 50 + "px" : "900px";
  }};
  z-index: 2;
`;
/** 고정적인 형태의 산 */
const Mountain = styled.img`
  position: absolute;
  bottom: ${(props) => {
    let buf = -0.3 * props.Gauge;
    return buf < 300 ? buf + "px" : "300px";
  }};
  width: 100%;
  z-index: 3;
  min-width: 1300px;
`;
/** 동적으로 보이기 위해 움직임을 준 산 */
const MovingMountain = styled.img`
  position: absolute;
  bottom: 0;
  width: ${(props) => {
    return props.Size + "%";
  }};
  z-index: ${(props) => {
    return props.ZIndex;
  }};
  ${(props) => {
    return props.Direction === "right"
      ? { marginLeft: props.Gauge < 900 ? props.Gauge * 1.5 + "px" : "1350px" }
      : {
          marginRight: props.Gauge < 900 ? props.Gauge * 1.5 + "px" : "1350px",
        };
  }}
`;
/** 가까이에 보이는 나무 이미지 */
const NearTrees = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 1300px;
  z-index: 5;
  scale: ${(props) => {
    return 1 + props.Gauge * 0.0003;
  }};
`;
/** 멀리서 보이는 나무이미지 */
const FarTrees = styled.img`
  position: absolute;
  bottom: 0;
  min-width: 1300px;
  z-index: 6;
  scale: ${(props) => {
    return 1 - props.Gauge * 0.0003;
  }};
`;
/** 나 자신을 표현한 남성( 낚시 의자에 앉아 밤하늘을 보기 좋아한다. ) */
const Person = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 6;
  height: 35%;
`;
/** 밤하늘을 표현하기 위한 별 콘테이너 */
const StarContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 50%;
  z-index: 1;
  margin-top: ${(props) => {
    return props.Margin < 900 ? props.Margin + "px" : "900px";
  }};
`;
/** 기본 별 */
const CircleStar = styled.span`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  box-shadow: 0px 0px 40px 5px rgba(255, 255, 255, 1);
  background-color: white;
  animation: Flash 10s infinite linear;
  animation-delay: ${(props) => {
    return props.Delay + "s";
  }};
  top: ${(props) => {
    return props.Top ? props.Top + "px" : "";
  }};
  bottom: ${(props) => {
    return props.Bottom ? props.Bottom + "px" : "";
  }};
  left: ${(props) => {
    return props.Left ? props.Left + "px" : "";
  }};
  right: ${(props) => {
    return props.Right ? props.Right + "px" : "";
  }};
  @keyframes Flash {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0.5;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
`;
/** 별똥별 */
const ShootingStar = styled.div`
  position: absolute;
  top: ${(props) => {
    return props.Top + "vh";
  }};
  left: ${(props) => {
    return props.Left + "vw";
  }};
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background-color: white;
  background: linear-gradient(
    127deg,
    #12100e,
    #12100e,
    rgba(255, 255, 255, 1) 100%
  );
  rotate: 55deg;
  animation: Shooting 6s linear, Tail 3s ease-in-out;
  animation-delay: ${(props) => {
    return props.Delay + "s";
  }};
  @keyframes Shooting {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(2000px);
    }
  }
  @keyframes Tail {
    0% {
      width: 3;
    }
    80% {
      width: 100px;
    }
  }
  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
`;
function ForestNight({ position }) {
  const [shootingStar, setShootingStar] = useState(0);
  /** 별똥별 생성 및 애니메이션 반복을 위한 함수 */
  const ShootingStarGen = useCallback(() => {
    let contents = (
      <>
        <ShootingStar Delay={5} Top={9} Left={5}></ShootingStar>
        <ShootingStar Delay={8} Top={0.5} Left={15}></ShootingStar>
        <ShootingStar Delay={12} Top={0.5} Left={53}></ShootingStar>
        <ShootingStar Delay={2} Top={9} Left={41}></ShootingStar>
        <ShootingStar Delay={1} Top={7} Left={67}></ShootingStar>
        <ShootingStar Delay={3} Top={9} Left={41}></ShootingStar>
      </>
    );
    if (shootingStar) return contents;
    else return <></>;
  }, [shootingStar]);
  useEffect(() => {
    /** 별똥별 애니메이션 반복 및 초기화 주기 */
    const Start = setInterval(() => {
      setShootingStar(true);
    }, 3000);
    const Done = setInterval(() => {
      setShootingStar(false);
    }, 40000);
    return () => {
      clearInterval(Start);
      clearInterval(Done);
    };
  }, []);
  return (
    <Container>
      <StarContain Margin={position}>
        <CircleStar Delay={1} Top={10} Left={10}></CircleStar>
        <CircleStar Delay={2} Top={100} Left={50}></CircleStar>
        <CircleStar Delay={3} Top={80} Left={300}></CircleStar>
        <CircleStar Delay={0} Top={300} Left={10}></CircleStar>
        <CircleStar Delay={1} Top={400} Left={200}></CircleStar>
        <CircleStar Delay={0.5} Top={350} Left={300}></CircleStar>
        <CircleStar Delay={2} Bottom={300} Left={200}></CircleStar>
        <CircleStar Delay={5} Bottom={10} Left={30}></CircleStar>
        <CircleStar Delay={1} Top={50} Left={500}></CircleStar>
        <CircleStar Delay={1} Top={300} Left={400}></CircleStar>
        <CircleStar Delay={3} Top={80} Left={450}></CircleStar>
        <CircleStar Delay={1} Top={200} Left={500}></CircleStar>
        <CircleStar Delay={2} Top={300} Left={450}></CircleStar>
        <CircleStar Delay={1} Top={200} Left={400}></CircleStar>
        <CircleStar Delay={0} Top={400} Left={550}></CircleStar>
        <CircleStar Delay={3} Top={320} Left={700}></CircleStar>
        <CircleStar Delay={1} Top={100} Left={650}></CircleStar>
        <CircleStar Delay={0} Top={200} Left={600}></CircleStar>
        <CircleStar Delay={1} Top={10} Right={10}></CircleStar>
        <CircleStar Delay={2} Top={100} Right={50}></CircleStar>
        <CircleStar Delay={3} Top={80} Right={300}></CircleStar>
        <CircleStar Delay={0} Top={300} Right={10}></CircleStar>
        <CircleStar Delay={1} Top={400} Right={200}></CircleStar>
        <CircleStar Delay={0.5} Top={350} Right={300}></CircleStar>
        <CircleStar Delay={2} Bottom={300} Right={200}></CircleStar>
        <CircleStar Delay={5} Bottom={10} Right={30}></CircleStar>
        <CircleStar Delay={1} Top={50} Right={500}></CircleStar>
        <CircleStar Delay={1} Top={300} Right={400}></CircleStar>
        <CircleStar Delay={3} Top={80} Right={450}></CircleStar>
        <CircleStar Delay={1} Top={200} Right={500}></CircleStar>
        <CircleStar Delay={5} Top={300} Right={450}></CircleStar>
        <CircleStar Delay={1} Top={200} Right={400}></CircleStar>
        <CircleStar Delay={2} Top={400} Right={550}></CircleStar>
        <CircleStar Delay={3} Top={320} Right={700}></CircleStar>
        <CircleStar Delay={1} Top={100} Right={650}></CircleStar>
        <CircleStar Delay={0.5} Top={200} Right={600}></CircleStar>
        {ShootingStarGen()}
      </StarContain>
      <Moon Gauge={position} src="./Moon.png"></Moon>
      <MovingMountain
        src="./Mountain 1.png"
        Size={80}
        ZIndex={3}
        Direction={"left"}
        Gauge={position}
      />
      <Mountain Gauge={position} src="./Mountains 1.png" />
      <MovingMountain
        src="./Mountain 2.png"
        Size={40}
        ZIndex={4}
        Direction={"right"}
        Gauge={position}
      />
      <NearTrees Gauge={position} src="./Big Tree.png"></NearTrees>
      <FarTrees Gauge={position} src="./Back Trees.png"></FarTrees>
      <Person Margin={position} src="./Person.png"></Person>
    </Container>
  );
}

export default ForestNight;
