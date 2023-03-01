import React from "react";
import {styled} from "@mui/material";

interface PageStructureLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
    title: string
    subtitle?: string
}

const ContainerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledHeader = styled('div')`
  padding: 20px;
  display: flex;
`

const ChildrenWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const PageStructureLayoutComponent = ({children, header}: PageStructureLayoutProps) => {
    return (
        <ContainerWrapper>
            <StyledHeader>
                {header}
            </StyledHeader>
            <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContainerWrapper>
    )
}
