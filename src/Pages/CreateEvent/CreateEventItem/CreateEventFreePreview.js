import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import EventPartial from "../../../Images/EventPartial";
import WishIcon from "../../../Images/WishIcon";
import { center } from "../../../Config/commonStyles";

const CreateEventFreePreview = ({
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
      <EventContainer>
        <UpperContainer>
          <EventImg eventimg={eventimg} eventBase64={eventBase64} />
          <EventPartialContainer>
            <EventPartial />
          </EventPartialContainer>
          <WishIconContainer>
            <WishIcon color="#757575" />
          </WishIconContainer>
          <UserAndUserImageContainer>
            <UserImage userImage={userImage} profileBase64={profileBase64} />
            <Username>{username ? username : "사용자 이름"}</Username>
            <InstagramLogo />
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
              {newPrice ? "₩" + Number(newPrice).toLocaleString() : "₩00,000"}
            </PriceNum>
          </PriceContainer>
        </UpperContainer>
        <UnderContainer>
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
        </UnderContainer>
      </EventContainer>
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

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 528px;
  height: 451px;
  background-color: #ffffff;
  border-radius: 24px;
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const UpperContainer = styled.div`
  width: 156px;
  height: 195px;
  border-radius: 14px;
  position: relative;
`;

const EventImg = styled.span`
  display: inline-block;
  width: 100%;
  height: 195px;
  margin-right: 12px;
  background: ${({ eventimg, eventBase64 }) =>
    eventimg
      ? `url(${eventBase64}) center no-repeat `
      : `url("/images/previewimage.svg") center no-repeat`};
  background-size: cover;
  border-radius: 12px;
`;

const EventPartialContainer = styled.div`
  position: absolute;
  right: -1px;
  top: -1px;
`;

const WishIconContainer = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 12px;
  top: 10px;
  border-radius: 30px;
`;

const PriceContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  width: 111px;
  height: 23px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0px 6px 6px 0px;
`;

const DiscountRate = styled.p`
  color: #ee6352;
  margin-right: 10px;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 700;
`;

const PriceNum = styled.p`
  font-weight: 700;
  color: #212121;
  font-size: 14px;
`;

const UserAndUserImageContainer = styled.div`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 0;
  z-index: 1;
  background-color: rgba(184, 184, 184, 0.45);
  width: 100%;
  height: 40px;
  padding: 9px 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

const UserImage = styled.div`
  width: 18px;
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
  width: 100px;
  font-size: 11px;
  margin-right: 20px;
  /* line-height: 130%; */
  letter-spacing: -0.03em;
  color: white;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InstagramLogo = styled.p`
  background: url("/images/InstagramLogo.svg") center no-repeat;
  width: 22px;
  height: 18px;
  z-index: 1;
  /* background-color: white; */
`;

const UnderContainer = styled.div`
  width: 155px;
  height: 59px;
  padding: 12px 8px 12px 8px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  border: 0.5px solid #dee8ff;
  /* border: 5px solid #dee8ff; */
  /* background-color: blueviolet; */
  @media (max-width: 500px) {
    padding: 12px 4px 12px 4px;
  }
`;

const EventName = styled.p`
  padding-bottom: 8px;
  color: #424242;
  font-size: 14px;
  width: 140px;
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
  /* width: 80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 3px 2px 3px;
  border-radius: 5px;
`;

const EventDuration = styled.p`
  font-size: 12px;
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
  width: 15px;
  height: 12px;
`;

export default CreateEventFreePreview;
