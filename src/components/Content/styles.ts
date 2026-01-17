import styled from "styled-components";

interface ContentDivProps {
  justifyCenter?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentDiv = styled.div<ContentDivProps>`
  width: 100%;
  max-width: 700px;
  ${({ justifyCenter }) =>
    justifyCenter &&
    `
    display: flex;
    justify-content: center;
  `}
`;
