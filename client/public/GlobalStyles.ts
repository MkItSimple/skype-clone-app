import { createGlobalStyle, css } from "styled-components";

// MIXINS
export const SampleMixins = () => css`
  background: pink;
  border-radius: 5px;
`;

export const OtherMixin = () => css`
.other {
  .name__avatar {
    color: var(--violet700);
  }

  background-image: linear-gradient(
    to bottom,
    var(--violet50),
    var(--violet200)
  );
}
`

export const NotifictionMixin = () => css`
  .notification {
    height: 17px;
    width: 17px;
    background-color: var(--sky500);
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Gilroy Medium";
    font-size: 9px;
    letter-spacing: 1px;
  }
`

export const LogoMixins = () => css`
  .logo__container {
    height: 130px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #eee; */
    .image_container {
      height: 123px;
      width: 280px;
      position: relative;
      margin-bottom: 1em;
    }
  }
`


export const ParticipantsMixins = () => css`
  .partipants__name {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5em 1em;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    svg {
      height: 20px;
      width: 20px;
      fill: var(--red600);
      vertical-align: center;
    }
    svg.disabled {
      fill: var(--gray300);
    }
    span {
      padding-bottom: 3px;
    }
  }
`


export const ModalMixins = () => css`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  /* background-color: rgba(0, 0, 0, 0.3); */
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    min-height: 300px;
    max-height: 500px;
    min-width: 400px;
    max-width: 500px;
    z-index: 10;
    color: var(--color600);
    background-color: white;
    position: fixed;
    margin: 0 auto;
    border: 1px solid #e8e8e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 2em;
  }
`;
export const BackDropMixins = () => css`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 5;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.3);
`




const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "600px",
  tablet: "900px",
  tabletL: "1000px",
  laptop: "1280px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const GlobalStyles = createGlobalStyle`
    html {
        --color800: #1e293b
        --color600: #475569;
        --color500: #64748b;
        --color400: #94a3b8;
        --color300: #cbd5e1;
        --color200: #e2e8f0;
        --color100: #f1f5f9;
        --color50: #f8fafc;

        --red50: #fef2f2;
        --red100: #fee2e2;
        --red200: #fecaca;
        --red300: #fca5a5;
        --red400: #f87171;
        --red500: #ef4444;
        --red400: #f87171;
        --red600: #dc2626;

        --violet50: #ede9fe;
        --violet100: #ede9fe;
        --violet200: #ddd6fe;
        --violet300: #c4b5fd;
        --violet400: #a78bfa;
        --violet500: #8b5cf6;
        --violet600: #7c3aed;
        --violet700: #6d28d9;
        --violet800: #5b21b6;

        --statusOnline: #4ade80;
        --statusAway: #fbbf24;

        --gray50: #f8fafc;
        --gray100: #f1f5f9;
        --gray200: #e2e8f0;
        --gray300: #cbd5e1;
        --gray400: #94a3b8;
        --gray500: #64748b;
        --gray600: #4b5563;
        --gray700: #374151;
        --gray800: #1f2937;
        --gray900: #0f172a;

        --blue50: #eff6ff;
        --blue100: #dbeafe;
        --blue200: #bfdbfe;
        --blue300: #93c5fd;
        --blue400: #60a5fa;
        --blue500: #3b82f6;
        --blue600: #2563eb;
        --blue900: #1e3a8a;

        --indigo50: #eef2ff;
        --indigo100: #e0e7ff;
        --indigo200: #c7d2fe;
        --indigo300: #a5b4fc;
        --indigo400: #818cf8;
        --indigo500: #6366f1;
        --indigo600: #4f46e5;
        --indigo700: #4338ca;
        --indigo900: #312e81;

        --sky50: #f0f9ff;
        --sky100: #e0f2fe;
        --sky200: #bae6fd;
        --sky300: #7dd3fc;
        --sky400: #38bdf8;
        --sky500: #0ea5e9;
        --sky600: #0284c7;
        --sky700: #0369a1;
        --sky800: #075985;
        --sky900: #0c4a6e;

        --green50: #f0fdf4;
        --green100: #dcfce7;
        --green200: #bbf7d0;
        --green300: #86efac;
        --green400: #4ade80;
        --green500: #22c55e;
        --green600: #16a34a;
        --green700: #15803d;

        --lightGreen: #64dd17;
        --greenAccent: #00c853;

        --lime500: #00FF00;

        --blue50: #eff6ff;
        --blue100: #dbeafe;
        --blue200: #bfdbfe;
        --blue300: #93c5fd;
        --blue400: #60a5fa;
        --blue500: #3b82f6;
        --blue600: #2563eb;
        --blue700: #1d4ed8;

        --slate800: #1e293b;
        --zinc800: #27272a;

        --neutral700: #404040;
        --neutral800: #262626;
        --neutral900: #171717;

        --zinc700: #3f3f46;
        --zinc800: #27272a;
        --zinc900: #18181b;

         --slate100: #f1f5f9;
        --slate200: #e2e8f0;
        --slate300: #cbd5e1;
        --slate400: #94a3b8;
        --slate600: #475569;

        --streamContainer: #1B1A1A;
        --messagesContainer: #232222;
        --chatInput: #2D2C2C;

        --skype1: #009DE4;
        --skype2: #009CF8;
        
    }

    .rotate {
      transform: rotate(180deg);
    }
    /* img[src="bar.png"] */
    img[src='emoji_smile_gif.png'] {
      transform: rotate(180deg);
    }
    img {
      vertical-align:  middle;
    }

    .input {
      margin-right: 0px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      height: 38px;
      padding: 8px 17px;
      background-color: #fff;
      font-family: Gilroy, sans-serif;
      font-size: 14px;
      color: #767587;
      border: 1px solid #cccccc;
      border-radius: 3px;
      width: 100%;
      outline: none;
  }

  .btn {
    width: 100%;
    margin: 10px 0px 10px;
    padding: 1em;
    background-color: #01B0EF;
    color: #fff;
    text-align: center;
    font-family: Gilroy, sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.2em;
    outline: none;
    border: none;
    border-radius: 2em;
    border: 2px solid white;
    &:hover {
    cursor: pointer;
    background-color: var(--sky300);
    }
  }

  .status_text {
    color: var(--color500);
    font-weight: 400;
    font-size: 13px;
  }

  .scroll__styles {
    &:hover {
      &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.2);
      }
    }
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar:hover {
      cursor: pointer;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
     background-color: transparent;
      border-radius: 2em;
    }
  }

`;
