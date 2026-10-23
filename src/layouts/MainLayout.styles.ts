import styled from "styled-components";

import { colors } from "@/commons/colors";

export const StyledLayoutRoot = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${colors.neutral.lightest};
`;

export const StyledMainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
`;

export const StyledContentContainer = styled.main`
  flex: 1;
  padding: 28px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

