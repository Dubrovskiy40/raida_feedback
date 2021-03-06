import React from "react"

const BackIcon: React.FC<{ mainColor: string }> = ({mainColor}) => (
    <svg width="52" height="54" viewBox="0 0 52 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_dd_772_2089)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M25.0814 32.5538C25.3736 32.2603 25.3726 31.7854 25.0791 31.4931L20.3157 26.7502H33.5001L33.6019 26.7433C33.968 26.6937 34.2501 26.3799 34.2501 26.0002C34.2501 25.586 33.9143 25.2502 33.5001 25.2502H20.3168L25.0791 20.507L25.1519 20.423C25.3704 20.1299 25.3471 19.7132 25.0813 19.4464C24.7891 19.1529 24.3142 19.1519 24.0207 19.4442L17.9814 25.4585C17.9454 25.493 17.9129 25.5309 17.8843 25.5719C17.6799 25.8648 17.7087 26.2711 17.9707 26.5321L24.0207 32.5561L24.105 32.6285C24.3991 32.8457 24.8157 32.8206 25.0814 32.5538Z"
                  fill={mainColor}/>
            <rect x="2.75" y="2.75" width="46.5" height="46.5" rx="3.25" stroke={mainColor} strokeWidth="1.5"/>
        </g>
        <defs>
            <filter id="filter0_dd_772_2089" x="0" y="0" width="52" height="54" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_772_2089"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_772_2089" result="effect2_dropShadow_772_2089"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_772_2089" result="shape"/>
            </filter>
        </defs>
    </svg>
)


export default BackIcon;