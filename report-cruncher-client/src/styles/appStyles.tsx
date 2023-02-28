import { css, GlobalStyles, styled, Theme } from '@mui/material'
import React from 'react'

const appStyles = (theme: Theme) => css`
  body {
    --base-color: rgb(0, 103, 128);
    --error-color: #a94442;
    --success-color: #42a948;
    --footer-height: 48px;
    --border-color: #c0c6c8;
    --button-active-background-color: rgb(60, 66, 66);
    --calculation-single-request-field-width: 256px;
    --error-box-border-color: #aa736e;
    --error-box-in-border-color: #c89f9f;
    --error-box-color: #72170c;
    --warning-box-border-color: #e69124;
    --warning-box-in-border-color: #f6d2aa;
    --warning-box-color: inherit;

    --color-primary-petrol: #00677f;
    --color-petrol-light-one: #007a92;
    --color-petrol-light-four: #a5c9d8;
    --color-petrol-dark-one: #003341;
    --color-petrol-dark-three: #00566a;

    --color-primary-cool-gray: #e2e5e6;
    --color-primary-gray: #8f9b9e;
    --color-primary-gray-dark: #5f6d70;
    --color-primary-gray-pale: #f8f8f9;
    --color-secondary-orange-light-four: #fae6d2;
    --color-secondary-orange: #e69124;
    --color-grey-light-one: #c0c6c8;
    --color-gray-light-two: #f0f2f2;
    --color-green: #6e9f47;
    --color-green-light-four: #e1ebdc;
    --color-rouge: #9f1924;
    --color-deep-red: #72170c;

    /* bootstrap functions, variables and overrides */
    --body-color: #000;
    --input-border-radius: 0;
    --primary: var(--color-primary-petrol);
    --btn-border-width: 0;
    --btn-box-shadow: none;
    --navbar-light-hover-color: rgba(#000, 0.5);
    --input-box-shadow: none;
    --input-focus-box-shadow: none;
    --input-border-color: #c0c6c8;
    --input-focus-border-color: var(--input-border-color);
    --btn-focus-box-shadow: none;
    --btn-padding-y: 0.5rem;
    --btn-padding-x: 1.5rem;
    --btn-line-height: 1.5rem;
    --btn-padding-y-sm: 0.5rem;
    --btn-padding-x-sm: 1rem;
    --btn-line-height-sm: 1rem;
    --secondary: var(--color-primary-cool-gray);
    --color-petrol-primary: rgba(2, 175, 238, 1);
    --color-petrol-primary-hover: rgba(2, 175, 238, 0.7);
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .app {
    grid-area: content;
    align-items: stretch !important;
    justify-content: stretch !important;
    max-height: 100%;
    overflow: hidden;
  }

  main {
    flex: 1;
  }

`
const StyledGlobalStyles = styled(GlobalStyles, { name: 'AppGlobalStyles' })``

type AppGlobalStylesProps = {
  darkMode?: boolean
}
const AppGlobalStyles = ({  }: AppGlobalStylesProps) => {
  return (
    <>
      <StyledGlobalStyles styles={appStyles as any} />
    </>
  )
}
export const MemoizedAppGlobalStyles = React.memo(
  AppGlobalStyles,
  (prevProps, nextProps) => prevProps.darkMode === nextProps.darkMode,
)
