"use client";

import styled from "styled-components";

export default function Home() {
  const settingType = [
    "결제수단 레이아웃",
    "카드사 레이아웃",
    "기본 설정",
    "배지 스타일",
  ];
  return (
    <Wrapper>
      <LeftAside>
        <SettingTypeButtonList>
          {settingType.map((ele, key) => {
            return <SettingTypeButton key={key}>{ele}</SettingTypeButton>;
          })}
        </SettingTypeButtonList>
        <DesignResetButtonList>
          <DesignResetButton></DesignResetButton>
        </DesignResetButtonList>
      </LeftAside>
      <Main></Main>
      <RightAside></RightAside>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

const LeftAside = styled.aside`
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 200px;
  height: calc(100vh);
  border-right: 1px solid rgba(0, 29, 58, 0.18);
  overflow: auto;
  padding-top: 8px;
  background: "white";
`;

const RightAside = styled.aside`
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: 256px;
  height: calc(100vh);
  border-left: 1px solid rgba(0, 29, 58, 0.18);
  overflow: auto;
`;

const Main = styled.main`
  width: calc((100vw - 456px) - 56px);
  height: calc(100vh);
`;

const SettingTypeButtonList = styled.div``;

const SettingTypeButton = styled.button`
  color: "#4e5968";
  border-radius: 8px;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 16px;
  background-color: transparent;
  outline: none;
  border: none;
  margin: 0;
  overflow: visible;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const DesignResetButtonList = styled.div``;

const DesignResetButton = styled.button``;
