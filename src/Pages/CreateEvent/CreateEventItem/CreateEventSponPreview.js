import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import EventPartial from "../../../Images/EventPartial";
import WishIcon from "../../../Images/WishIcon";
import { center } from "../../../Config/commonStyles";

const CreateEventSponPreview = ({
  eventimg,
  eventBase64,
  eventname,
  userImage,
  profileBase64,
  username,
  newPrice,
  originalPrice,
  durationStart,
  durationEnd,
  startdate,
  shoppingUrl
}) => {
  useEffect(() => {
    // console.log("프로필 체크", eventBase64);
    // console.log("프로필 이미지 체크", userImage);
    // console.log("유저네임", username);
  }, []);

  const handleShopBtn = () => {
    console.log("hihihi");
    console.log(shoppingUrl);
  };

  return (
    <PreviewWrap>
      <EventWrap>
        <IntroContainer>
          <IntroTextFirst>
            스폰서 이벤트로 등록하시면 신청하시는
            <br /> 기간동안 상단에 노출되어 홍보효과를 높이실 수 있습니다.
          </IntroTextFirst>
          <IntroTextSecond>
            이벤트 정보 입력 후 다음 페이지에서 포인트를
            <br /> 사용하셔서 스폰서 이벤트 홍보기간을 신청해 주시면 됩니다.
          </IntroTextSecond>
        </IntroContainer>
        <EventItemContainer>
          <EventImageContainer>
            <EventImg eventimg={eventimg} eventBase64={eventBase64} />
            <InstagramLogo />
          </EventImageContainer>
          <EventContainer>
            <UserAndUserImageContainer>
              <UserImage userImage={userImage} profileBase64={profileBase64} />
              <Username>{username ? username : "사용자 이름"}</Username>
              <WishIconContainer>
                <WishIcon color="#757575" />
              </WishIconContainer>

              {/* <BlurView blurType="light" blurAmount={1} /> */}
            </UserAndUserImageContainer>
            <PriceContainer>
              <DiscountRate>
                {newPrice
                  ? Math.ceil(
                      ((originalPrice - newPrice) / originalPrice) * 100
                    ) + "%"
                  : "00%"}
              </DiscountRate>
              <PriceNum>
                {newPrice
                  ? "₩" + Number(newPrice).toLocaleString()
                  : "₩000,000"}
              </PriceNum>
            </PriceContainer>
            <EventName>{eventname ? eventname : "이벤트 이름"}</EventName>
            <EventDurationShopContainer>
              <EventDurationContainer>
                <EventDuration>
                  {durationStart && durationEnd
                    ? `${format(durationStart, "MM/dd", {
                        locale: ko
                      })} - ${format(durationEnd, "MM/dd", {
                        locale: ko
                      })}`
                    : "이벤트 기간"}
                </EventDuration>
              </EventDurationContainer>
              <ShopContainer href={shoppingUrl}>
                <ShopText>SHOP</ShopText>
                <ShopIcon />
              </ShopContainer>
            </EventDurationShopContainer>
          </EventContainer>
        </EventItemContainer>
      </EventWrap>
    </PreviewWrap>
  );
};

const PreviewWrap = styled.div`
  /* padding: 24px 24px; */
  background-color: #f2f6ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const EventWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 528px;
  height: 451px;
  background-color: #ffffff;
  border-radius: 24px;
  margin: 0 auto;
  /* background-color: yellowgreen; */
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const IntroContainer = styled.div`
  padding: 72px 90px 48px 90px;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 500px) {
    padding: 60px 12px 36px 12px;
  }
`;

const IntroTextFirst = styled.p`
  font-size: 14px;
  color: #757575;
  line-height: 130%;
  margin-bottom: 20px;
`;

const IntroTextSecond = styled.p`
  font-size: 14px;
  color: #757575;
  line-height: 130%;
`;

const EventItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border-radius: 24px;
  /* background-color: yellowgreen; */
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const EventImageContainer = styled.div`
  width: 156px;
  height: 156px;
  border-radius: 14px;
  position: relative;
`;

const EventImg = styled.span`
  display: inline-block;
  width: 100%;
  height: 156px;
  margin-right: 12px;
  background: ${({ eventimg, eventBase64 }) =>
    eventimg
      ? `url(${eventBase64}) center no-repeat `
      : `url("/images/previewimage.svg") center no-repeat`};
  background-size: cover;
  border-radius: 12px;
`;

const InstagramLogo = styled.p`
  background: url("/images/InstagramLogo.svg") center no-repeat;
  width: 22px;
  height: 18px;
  z-index: 1;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const UserAndUserImageContainer = styled.div`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const UserImage = styled.div`
  width: 20px;
  height: 18px;
  background: ${({ userImage, profileBase64 }) =>
    userImage
      ? `url(${profileBase64}) center no-repeat `
      : `url("/images/Avatar_Image.jpg") center no-repeat`};
  background-size: cover;
  border: 0.25px solid #ffffff;
  margin-right: 5px;
  border-radius: 2px;
`;

const Username = styled.p`
  width: 90px;
  font-size: 11px;
  margin-right: 20px;
  /* line-height: 130%; */
  letter-spacing: -0.03em;
  color: #424242;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WishIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const PriceContainer = styled.div`
  width: 111px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const DiscountRate = styled.p`
  color: #ee6352;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
`;

const PriceNum = styled.p`
  font-weight: 700;
  color: #212121;
  font-size: 14px;
`;

const EventContainer = styled.div`
  width: 190px;
  height: 156px;
  padding: 12px 8px 12px 12px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  /* border: 0.5px solid #dee8ff; */
`;

const EventName = styled.p`
  margin-bottom: 20px;
  color: #424242;
  font-size: 14px;
  width: 50x;
  /* background-color: yellowgreen; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventDurationShopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EventDurationContainer = styled.div`
  background-color: #ffebe2;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const EventDuration = styled.p`
  font-size: 11px;
  font-weight: bold;
`;

const ShopContainer = styled.a`
  display: flex;
  height: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ShopText = styled.p`
  color: #3c66ba;
  font-size: 12px;
  font-weight: bold;
  margin-right: 5px;
  text-align: center;
`;

const ShopIcon = styled.p`
  background: url("/images/ShopIcon.svg") center no-repeat;
  width: 18px;
  height: 15px;
`;

export default CreateEventSponPreview;
