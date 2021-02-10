import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CancelIcon from "../../../Images/CancelIcon";
import { openModal } from "../../../modules/CheckModalModule";

function CheckFreeEventModal() {
  const dispatch = useDispatch();
  const notEnoughPoint = useSelector(store => store.notenoughReducer);
  const username = useSelector(store => store.usernameReducer);
  const eventname = useSelector(store => store.eventnameReducer);
  const profileimg = useSelector(store => store.profileimgReducer);
  const eventimg = useSelector(store => store.eventimgReducer);
  const eventUrl = useSelector(store => store.eventurlReducer);
  const shoppingUrl = useSelector(store => store.shoppingurlReducer);
  const originalPrice = useSelector(store => store.originalpriceReducer);
  const newPrice = useSelector(store => store.newpriceReducer);
  const durationStart = useSelector(store => store.durationStartReducer);
  const durationEnd = useSelector(store => store.durationEndReducer);
  const category = useSelector(store => store.eventcategoryReducer);
  const duration = durationStart && durationEnd;

  // 이벤트 생성시 값을 선택하지 않고 확인 버튼을 눌렀을 때 나오는 알림창 생성용 LIST
  const lists = [
    // { type: notEnoughPoint, text: "포인트가 부족합니다. 충전해주세요" },
    { type: username, text: "ID를 입력해주세요" },
    { type: eventname, text: "이벤트 이름을 입력해주세요" },
    { type: eventUrl, text: "이벤트 URL을 입력해주세요" },
    { type: shoppingUrl, text: "샵페이지 URL을 입력해주세요" },
    { type: originalPrice, text: "정상판매가를 입력해주세요" },
    { type: newPrice, text: "할인판매가를 입력해주세요" },
    { type: duration, text: "이벤트 기간을 입력해주세요" },
    { type: category, text: "카테고리를 입력해주세요" },
    { type: profileimg, text: "프로필 사진을 업로드 해주세요" },
    { type: eventimg, text: "이벤트 썸네일을 업로드 해주세요" }
  ];

  const keepModalWindow = e => {
    e.stopPropagation();
  };

  const handleModal = () => {
    dispatch(openModal(false));
  };

  return (
    <Wrapper onClick={handleModal}>
      <ModalContainer onClick={keepModalWindow}>
        <SubContainer>
          <Title>다음항목을 확인해주세요</Title>
          <IconWrap onClick={handleModal}>
            <CancelIcon />
          </IconWrap>
        </SubContainer>
        <MainContainer>
          {lists.map(list => (
            <>
              {!list.type && (
                <List>
                  <Image src="/images/xIcon.svg" />
                  {list.text}
                </List>
              )}
            </>
          ))}
        </MainContainer>
      </ModalContainer>
    </Wrapper>
  );
}

export default CheckFreeEventModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.65);
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const ModalContainer = styled.div`
  width: 688px;
  left: 29px;
  top: 0px;
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
`;

const SubContainer = styled.div`
  height: 35px;
  top: 10px;
  left: 100px;
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const Title = styled.span`
  font-size: 30px;
  margin-top: 80px;
`;

const IconWrap = styled.div`
  cursor: pointer;
  position: relative;
  top: 35px;
  left: 100px;
`;

const MainContainer = styled.div`
  width: 100%;
  padding: 70px 100px 60px;
`;

const List = styled.div`
  color: #424242;
  font-size: 16px;
  margin: 20px;
  width: 237px;
  white-space: nowrap;
  height: 21px;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  color: red;
  margin-right: 10px;
`;
