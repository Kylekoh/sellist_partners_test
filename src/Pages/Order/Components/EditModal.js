import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

function EditModal({ edit, setEdit, details }) {
  return (
    <Fade>
      <Container>
        <TopContainer>
          <TitleGroup>
            <Title>이벤트 정보</Title>
            <CancelBtn
              onClick={() => {
                setEdit(!edit);
              }}
            />
          </TitleGroup>
          <User>
            <UserImg userImg={details["event_user_image"]} />
            <UserName>{details["event_username"]}</UserName>
          </User>
          <Event>
            <EventImg eventImg={details["event_image"]} />
            <Description>
              <TitleDes>{details["event_name"]}</TitleDes>
              <DurationDes>{details["event_duration"]}</DurationDes>
              <CategoryDes>{details["event_category"]}</CategoryDes>
              <UrlDes>
                {details["event_ext_link"]
                  ? details["event_ext_link"]
                  : "http://www.shopurl.com"}
              </UrlDes>
            </Description>
          </Event>
        </TopContainer>
        <BottomContainer>
          <BottomWrap>
            <OrderNum>주문번호</OrderNum>
            <Num>{details["event_order"]}</Num>
          </BottomWrap>
          <BottomWrap>
            <Cost>비용</Cost>
            <Credits>{details["event_credit"]}</Credits>
          </BottomWrap>
        </BottomContainer>
      </Container>
    </Fade>
  );
}

export default EditModal;

const Container = styled.main`
  height: 550px;
  width: 500px;
  left: 29px;
  top: 0px;
  padding: 8% 13%;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const TopContainer = styled.section`
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  margin-top: 16px;
  ${({ theme }) => theme.flex("flex-start", "flex-start", "column")};
`;
const TitleGroup = styled.div`
  width: 100%;
  padding-bottom: 32px;
  ${({ theme }) => theme.flex("space-between", "center", "row")};
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #212121;
`;
const CancelBtn = styled.div`
  width: 12px;
  height: 12px;
  padding: 20px 0 0 20px;
  cursor: pointer;
  background: url("/images/detailclosebtn.svg") no-repeat center;
`;
const User = styled.div`
  padding-bottom: 24px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")};
`;
const UserImg = styled.span`
  width: 24px;
  height: 24px;
  border: 0.5px solid #bdbdbd;
  border-radius: 4px;
  background: ${({ userImg }) =>
    userImg
      ? `url(${userImg}) no-repeat center`
      : `url("/images/previewusername.png") no-repeat`};
  background-size: cover;
`;

const UserName = styled.div`
  margin-left: 8px;
  font-size: 14px;
  color: #424242;
`;

const Event = styled.div`
  ${({ theme }) => theme.flex("flex-start", "flex-start", "row")};
`;
const EventImg = styled.span`
  width: 124px;
  height: 124px;
  margin-right: 16px;
  border: 0.5px solid #bdbdbd;
  border-radius: 24px;
  background: ${({ eventImg }) =>
    eventImg
      ? `url(${eventImg}) no-repeat center`
      : `url("/images/previewimage.svg") no-repeat`};
  background-size: cover;
`;

const Description = styled.div``;

const TitleDes = styled.div`
  width: 220px;
  font-size: 16px;
  line-height: 130%;
  padding: 10px 13px;
  margin-bottom: 15px;
  border: 0.5px solid #dee8ff;
  border-radius: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DurationDes = styled(TitleDes)``;
const CategoryDes = styled(TitleDes)``;
const UrlDes = styled(TitleDes)`
  margin-bottom: 0;
`;

const BottomContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px 16px 0;
  border-top: 1px solid #dee8ff;
`;
const BottomWrap = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex("space-between", "center", "row")};
`;
const OrderNum = styled.div`
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  color: #424242;
`;
const Num = styled.p`
  font-size: 16px;
  line-height: 130%;
  padding: 10px 13px;
  margin-bottom: 15px;
`;
const Cost = styled(OrderNum)``;
const Credits = styled(Num)``;
