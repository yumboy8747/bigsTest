import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle<{scrollbarWidth?:any}>`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font: revert;
        vertical-align: baseline;
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    ol,
    ul {
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    a {
        text-decoration: none;
        outline: none;
    }

    a:hover,
    a:active {
        text-decoration: none;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: #001B43;
    }

    ::-webkit-scrollbar-thumb {
        background: #212121;
        border-radius: 2px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner,
    ::-webkit-resizer {
        background: #fff;
    }

    * {
        font-family: 'Noto Sans KR', 'Spoqa Han Sans Neo', 'Roboto', 'sans-serif';
        font-antialiasing: subpixel;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-antialiasing: subpixel;
    }

    /* prevent bouncing */
    body {
        min-height: 100vh;
        overscroll-behavior: none; /* or overscroll-behavior: none; */
    }


    body > #root > div {
        min-height: 100vh;
    }


    *:focus {
        outline: none;
    }

    input[type=checkbox] {
        background: transparent;
    }


    .warning {
        color: red;
        font-size: 13px;
        padding: 10px 5px;
    }

    .modalConfirm {
        font-size: 14px;
    }

    .modalConfirm h1 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    input:-webkit-autofill {
        -webkit-text-fill-color: #99f;
    }

    input:-webkit-autofill:focus {
        -webkit-text-fill-color: #999;
    }

    @media (max-width: 1400px) {


    }


    @keyframes flashgreen {
        20% {
            background-color: rgba(0, 0, 255, 0.5);
        }
    }


    @keyframes flashred {
        20% {
            background-color: rgba(255, 0, 0, 0.5);
        }
    }

    .ag-theme-alpine {
        --ag-material-primary-color: #f00;
        --ag-data-color: #f00;
        --ag-selected-row-background-color: rgb(0, 255, 255, 0.1);
    }


    input {
        color: black !important;
    }

    button {
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }

    .ant-layout {
        background-color: transparent !important;
    }


    .Ellipse {
        cursor: pointer;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;

        img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;

        }

    }


    .scroll-container::-webkit-scrollbar {
        width: 15px !important;
    }

    .scroll-container::-webkit-scrollbar-thumb {
        background-color: #530DAD !important;
        border-radius: 0 !important;
        cursor: pointer !important;

        &:hover {
            background-color: #6c2cbd !important;
        }
    }

`

