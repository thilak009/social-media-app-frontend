import { defaultColours } from "fictoan-react";
import { lighten } from "polished";
import { createGlobalStyle } from "styled-components";
import "./Fonts.css"
import { SetuLightTheme } from "./Light.theme";
// import { DatePickerStyles } from "./datepicker-override-custom";
// import { setuColours } from "./Setu/SetuColours";
// import "./Razorpay/RazorpayFonts.css";
const setuColours = {
    deepPurple   : "hsl(265,  97%,  15%)",
    flashTurk    : "hsl(181,  58%,  53%)",
    crackedYolk  : "hsl( 34,  99%,  66%)",
    salmonRouge  : "hsl(351,  98%,  78%)",
    murkyNight   : "hsl(208,  42%,   6%)",
    fadedMing    : "hsl(208,  42%,  69%)",
    thunderCloud : "hsl(208,  42%,  80%)",
    pearlyCoke   : "hsl(208,  42%,  97%)",
    azureBlue    : "hsl(212, 100%,  54%)",
    knollGreen   : "hsl(148,  50%,  42%)",
    dartRed      : "hsl(  0,  84%,  64%)",
    peelOrange   : "hsl( 30,  92%,  60%)"
};

// ${DatePickerStyles}
export const GlobalLightStyles = createGlobalStyle`
    #root { display : flex; }

    #content-wrapper {
        margin-left : 64px;
        padding-top : 4px;
        //width       : calc(100% - 64px);
    }

    aside.is-expanded + #content-wrapper {
        width       : calc(100% - 220px);
        margin-left : 220px;
    }

    article {
        min-height     : 100vh;
        padding-bottom : 4vh;
    }

    a {
        width       : unset;
        font-weight : 400;
    }

    p {
        margin : 0;
    }

    ol.list li,
    ul.list li {
        width         : 100%;
        list-style    : unset;
        margin-bottom : 24px;
    }

    li { color : ${lighten(0.16, setuColours.murkyNight)}; }

    button,
    td {
        white-space : nowrap;
    }

    button { width : fit-content; }

    input[type=file]:-moz-read-only { background-color : ${defaultColours.white}; }

    input:read-only { background-color : ${defaultColours.white} !important; }

    //*:focus { box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25); }

    .vertically-centre-items,
    .vertically-center-items {
        display : flex;
    }

    .push-to-ends {
        display         : flex;
        justify-content : space-between;
    }

    .wrapping-list {
        display        : flex;
        flex-direction : row;

        > *:not(:last-child) { margin-right : 8px }
    }

    .is-inactive {
        pointer-events   : none;
        opacity          : 0.32;
        background-color : ${SetuLightTheme.Inactive.bg};
        user-select      : none;
    }

    .is-clickable { cursor : pointer; }

    .subtext { color : ${(props) => props.theme.text.paras.subtext} }

    .line-height-reset { line-height : 1; }

    //  TO RECREATE THAT PESKY TEAL ARROW ON HOVER  ///////////////////////////
    .has-external-arrow {
        position : relative;
        cursor   : pointer;

        &::after {
            display     : none;
            content     : "\u2197";
            margin-left : 8px;
            color       : ${setuColours.flashTurk};
        }
    }

    .arrow-on-hover:hover {
        .has-external-arrow::after { display : inline-block; }
    }

    //  DEFAULT STYLING FOR ICONS  /////////////////////////////////////////
    svg {
        width           : 24px;
        fill            : none;
        stroke          : ${defaultColours.slate60};
        stroke-width    : 2px;
        stroke-linecap  : round;
        stroke-linejoin : round;
    }

    div[class*="border"] { border-width : 1px !important; }

    summary {
        position : relative;
        cursor   : pointer;
    }

    summary::after {
        display      : inline-block;
        position     : absolute;
        width        : 8px;
        height       : 8px;
        top          : 8px;
        right        : 18px;
        content      : "";
        border-style : solid;
        border-width : 0 2px 2px 0;
        transform    : rotate(45deg);
        color        : hsl(208, 13%, 80%);
        transition   : all 0.2s;
        cursor       : pointer;
    }

    // input[type="radio"]:checked + label::before,
    // input[type="checkbox"]:checked + label::before {
    //     background: ${setuColours.flashTurk} !important;
    // }

    .radio-set { flex-direction : row; }

    .placeholder-card {
        background-color : transparent !important;
        border           : 1px solid ${(props) => props.theme.PlaceholderCard.border} !important;
    }

    //  TABS  /////////////////////////////////////////////////////////////////
    .tabs-wrapper nav {
        position         : absolute;
        top              : 0;
        left             : 0;
        width            : 240px;
        height           : 100%;
        overflow         : scroll;
        background-color : rgba(241, 243, 244, 0.16);
        display          : flex;
        flex-direction   : column;
        padding          : 24px 0;
        border-right     : 1px solid ${defaultColours.slate20};

        a {
            color   : ${defaultColours.slate};
            padding : 8px 0 8px 32px;
            width   : 100%;
            margin  : 4px 0;

        }

        a.active {
            color        : ${setuColours.flashTurk};
            border-right : 3px solid ${setuColours.flashTurk};
            background   : ${lighten(0.4, `${setuColours.flashTurk}`)};
        }

        progress[value] { height : 4px; }
    }

    .tabs-wrapper main {
        margin-left : 240px;
        padding     : 40px;
    }

    details.disabled summary {
        pointer-events : none;
        opacity        : 0.24;
    }

    .code-wrapped {
        code {
            width       : 100%;
            white-space : pre-wrap !important;
        }
    }

    //  CARD THAT WORKS LIKE A RADIO BUTTON AND CHECKBOX  /////////////////////
    .choice-card {
        user-select : none;
        transition  : all 0.2s;

        &:not(.disabled) { cursor : pointer; }

        &.disabled { pointer-events : none; }

        &:hover {
            z-index    : 500;
            box-shadow : 0 1px 2px rgba(0, 0, 0, 0.04),
            0 12px 24px rgba(0, 0, 0, 0.08);
        }

        &:active { box-shadow : none; }

        &.selected {
            border           : 1px solid ${defaultColours.green80};
            background-color : ${defaultColours.green10};
            color            : ${defaultColours.green};
        }
    }


    //  TABLES  ///////////////////////////////////////////////////////////////
    .table-container { overflow-x : auto; }

    .scrolling-table {
        position   : relative;
        overflow-x : scroll;
    }

    .dismiss-button {
        border-radius : ${(props) => props.theme.button.primary.default.borderRadius};
    }

    //  CHECKLIST TICK  ///////////////////////////////////////////////////////
    .tick circle {
        stroke : none;
    }

    .tick polyline {
        stroke-linecap  : round;
        stroke-linejoin : round;
        stroke-width    : 5px;
    }

    .tick-complete {
        circle { fill : #3aaa35; }

        polyline { stroke : ${defaultColours.white}; }
    }

    .tick-incomplete {
        circle { fill : ${defaultColours.slate20}; }

        polyline { stroke : ${defaultColours.white}; }
    }
`;
