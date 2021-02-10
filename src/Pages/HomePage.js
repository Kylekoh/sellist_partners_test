import React, { useLayoutEffect, useState, useEffect } from "react";
import styled from "styled-components";
import Home from "../Components/homeComponents/Home";
import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";
import Modal from "react-modal";
import { FaTimes, FaGithub } from "react-icons/fa";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function HomePage(props) {
  const [width, height] = useWindowSize();
  const [modalToggle, setModalToggle] = useState(false);

  // HOME 크기를 측정해서 모바일 사이즈면 경고 모달을 띄우는 것
  // useEffect(() => {
  //   console.log("와이드", width);
  //   if (width <= 800) {
  //     setModalToggle(true);
  //   } else {
  //     setModalToggle(false);
  //   }
  // }, [width]);

  return (
    <Container>
      {/* <ImgRight src={Img2} />
      <ImgLeft src={Img1} /> */}
      <LeftImage></LeftImage>
      <Home props={props} />
      <RightImage></RightImage>
      {/* <TotalList>
        <Introduction>
          <ul>
            <li>서울특별시 강남구 신사동 525-1 이룸빌딩 1층</li>
            <li>머치스퀘어(주)사업자등록번호:168-81-00659</li>
            <li>Email:info@moduseller.com</li>
            <li>Copyright © Merchsquare,Inc.2020 All Rights Reserved</li>
          </ul>
        </Introduction>
        <Link>
          <a href="https://www.moduseller.com/terms-of-service" target="_blank">
            이용약관
          </a>
          <a href="https://www.moduseller.com/privacy-policy" target="_blank">
            개인정보처리방침
          </a>
        </Link>
      </TotalList> */}

      {/* <Modal
        isOpen={modalToggle}
        ariaHideApp={false}
        onRequestClose={() => setModalToggle(false)}
        style={{
          content: {
            width: "300px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "auto auto"
          },
          overlay: {
            backgroundColor: "gray",
            background: "rgba(0,0,0,0.8)",
            transition: "opacity 0.4s ease-in-out",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        <span>
          모두의 셀러 파트너스 페이지는 <br></br>데스크탑에 최적화 되어
          있습니다.
        </span>
        <FaTimes
          onClick={() => setModalToggle(false)}
          style={{ position: "absolute", bottom: 10, right: 10 }}
        />
      </Modal> */}
    </Container>
  );
}
export default HomePage;

const Container = styled.section`
  /* width: 100%; */
  background-color: #f2f6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  @media (max-width: 500px) {
    background-color: #ffffff;
  }
`;

const RightImage = styled.div`
  width: 100%;
  height: 900px;
  background: url("/images/main_right.png") no-repeat center;
  @media (max-width: 500px) {
    width: 0px;
    height: 0px;
  }
`;

const LeftImage = styled.div`
  width: 100%;
  height: 800px;
  background: url("/images/main_left.png") no-repeat center;
  @media (max-width: 500px) {
    width: 0px;
    height: 0px;
  }
`;
