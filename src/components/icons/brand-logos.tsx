
export const ToyotaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" {...props}>
    <g>
      <ellipse
        fill="#EB0A1E"
        stroke="#EB0A1E"
        strokeWidth="6.5"
        strokeMiterlimit="10"
        cx="100"
        cy="100"
        rx="28.8"
        ry="73.1"
      />
      <ellipse
        fill="none"
        stroke="#EB0A1E"
        strokeWidth="7"
        strokeMiterlimit="10"
        cx="100"
        cy="100"
        rx="80.6"
        ry="29.9"
      />
      <ellipse
        fill="none"
        stroke="#EB0A1E"
        strokeWidth="7"
        strokeMiterlimit="10"
        cx="100"
        cy="100"
        rx="80.6"
        ry="80.6"
      />
    </g>
  </svg>
);

export const HondaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" {...props}>
    <g>
      <path
        fill="#E40521"
        d="M62.5,25h75v50h-25v25h-25V75h-25V25z M100,100h25v25h-25V100z M75,100h25v25H75V100z M50,125h100v25H50V125z"
      />
    </g>
  </svg>
);

export const BmwLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" {...props}>
    <g>
      <circle fill="#333" cx="100" cy="100" r="80" />
      <circle fill="#fff" cx="100" cy="100" r="70" />
      <path
        fill="#0094d8"
        d="M100,30C61.3,30,30,61.3,30,100h70V30z M100,170c38.7,0,70-31.3,70-70h-70V170z"
      />
      <path fill="#000" d="M100,30v70h70C170,61.3,138.7,30,100,30z M100,170v-70H30C30,138.7,61.3,170,100,170z" />
    </g>
  </svg>
);

export const MazdaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" {...props}>
    <g>
      <path
        fill="#444"
        d="M100,20C55.8,20,20,55.8,20,100s35.8,80,80,80s80-35.8,80-80S144.2,20,100,20z M100,165c-35.9,0-65-29.1-65-65 s29.1-65,65-65s65,29.1,65,65S135.9,165,100,165z"
      />
      <path
        fill="#444"
        d="M100,50c-22.1,0-40,17.9-40,40h20c0-11,9-20,20-20s20,9,20,20h20C140,67.9,122.1,50,100,50z"
      />
      <path
        fill="#444"
        d="M100,120c-11,0-20-9-20-20h20c0,0,0,0,0,0c0,0,0,0,0,0c0-11,9-20,20-20s20,9,20,20c0,0,0,0,0,0c0,0,0,0,0,0h20 C120,111,111,120,100,120z"
      />
    </g>
  </svg>
);

export const FordLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" {...props}>
    <g>
      <ellipse fill="#003366" cx="100" cy="100" rx="80" ry="60" />
      <text
        x="100"
        y="115"
        fontFamily="Arial, sans-serif"
        fontSize="60"
        fill="white"
        textAnchor="middle"
        fontStyle="italic"
      >
        Ford
      </text>
    </g>
  </svg>
);

export const AxiomLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 12L22 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
