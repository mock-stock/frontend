import { SVGProps } from "react";

export function Alarm(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9M15 17H18.5905C18.973 17 19.1652 17 19.3201 16.9478C19.616 16.848 19.8475 16.6156 19.9473 16.3198C19.9997 16.1643 19.9997 15.9715 19.9997 15.5859C19.9997 15.4172 19.9995 15.3329 19.9863 15.2524C19.9614 15.1004 19.9024 14.9563 19.8126 14.8312C19.7651 14.7651 19.7048 14.7048 19.5858 14.5858L19.1963 14.1963C19.0706 14.0706 19 13.9001 19 13.7224V10C19 6.134 15.866 2.99999 12 3C8.13401 3.00001 5 6.13401 5 10V13.7224C5 13.9002 4.92924 14.0706 4.80357 14.1963L4.41406 14.5858C4.29476 14.7051 4.23504 14.765 4.1875 14.8312C4.09766 14.9564 4.03815 15.1004 4.0132 15.2524C4 15.3329 4 15.4172 4 15.586C4 15.9715 4 16.1642 4.05245 16.3197C4.15225 16.6156 4.3848 16.848 4.68066 16.9478C4.83556 17 5.02701 17 5.40956 17H9"
        stroke="#B1B8C0"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Search(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
        stroke="#B1B8C0"
      />
    </svg>
  );
}
export function ChevronLeft(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <g>
        <path d="M15 6L9 12L15 18" stroke="#2D3748" strokeWidth="2" />
      </g>
    </svg>
  );
}
export function ChevronRight(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <g>
        <path d="M9 6L15 12L9 18" stroke="#2D3748" strokeWidth="2" />
      </g>
    </svg>
  );
}
export function WatchStar(svgProps: SVGProps<SVGSVGElement>) {
  const { fill, ...rest } = svgProps;
  return (
    <svg
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4951 2.7143C11.7017 2.29575 12.2985 2.29575 12.5051 2.7143L15.1791 8.13242C15.2611 8.29863 15.4196 8.41383 15.6031 8.44048L21.5823 9.30932C22.0442 9.37644 22.2286 9.94406 21.8944 10.2698L17.5678 14.4873C17.4351 14.6166 17.3745 14.803 17.4058 14.9857L18.4272 20.9408C18.5061 21.4008 18.0233 21.7516 17.6101 21.5345L12.2621 18.7228C12.0981 18.6366 11.9021 18.6366 11.738 18.7228L6.39002 21.5345C5.97689 21.7516 5.49404 21.4008 5.57294 20.9408L6.59432 14.9857C6.62565 14.803 6.56509 14.6166 6.43236 14.4873L2.10573 10.2698C1.7715 9.94406 1.95594 9.37644 2.41783 9.30932L8.39708 8.44048C8.5805 8.41383 8.73906 8.29863 8.82109 8.13242L11.4951 2.7143Z"
        fill={fill}
        stroke="#2D3748"
      />
    </svg>
  );
}
export function Close(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M6 6L18 18M6 18L18 6"
        stroke="#2D3748"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Pay(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <circle cx="7" cy="7" r="7" fill="#477EEA" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.33333 4.55374V6.52101C6.82138 6.64089 7.37723 6.69949 7.82877 6.5996C8.11933 6.53532 8.31535 6.41704 8.43864 6.26536C8.55387 6.12359 8.66667 5.87814 8.66667 5.41429C8.66667 5.1032 8.5785 4.9489 8.4773 4.84689C8.35294 4.72153 8.14379 4.61441 7.83729 4.55062C7.33922 4.44696 6.75609 4.49123 6.33333 4.55374ZM6.33333 8.03828C6.88189 8.14556 7.5083 8.18829 8.08789 8.06007C8.56123 7.95536 9.05271 7.72517 9.42594 7.26599C9.80724 6.79689 10 6.16906 10 5.41429C10 4.71201 9.7714 4.1456 9.37075 3.74174C8.99326 3.36122 8.51547 3.17727 8.08159 3.08697C7.21956 2.90757 6.2751 3.04777 5.83101 3.13338C5.60686 3.17659 5.38325 3.29931 5.21964 3.52556C5.05856 3.74832 5 4.00983 5 4.24595V10.2556C5 10.6667 5.29848 11 5.66667 11C6.03486 11 6.33333 10.6667 6.33333 10.2556V8.03828Z"
        fill="white"
      />
    </svg>
  );
}
export function ChartLine(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M3 18L9.5 9.5L14 15L21 7"
        stroke="#4C92F7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ChartCandle(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5.47827C7 5.20213 6.77614 4.97827 6.5 4.97827C6.22386 4.97827 6 5.20213 6 5.47827V7.21729H4C2.89543 7.21729 2 8.11272 2 9.21728V14.7825C2 15.8871 2.89543 16.7825 4 16.7825H6L6 19.3913C6 19.6675 6.22386 19.8913 6.5 19.8913C6.77614 19.8913 7 19.6675 7 19.3913V16.7825H9C10.1046 16.7825 11 15.8871 11 14.7825V9.21729C11 8.11272 10.1046 7.21729 9 7.21729H7V5.47827Z"
        fill="#4C92F7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 2C18 1.72386 17.7761 1.5 17.5 1.5C17.2239 1.5 17 1.72386 17 2V4.60864H15C13.8954 4.60864 13 5.50407 13 6.60864V17.3913C13 18.4958 13.8954 19.3913 15 19.3913H17V22C17 22.2761 17.2239 22.5 17.5 22.5C17.7761 22.5 18 22.2761 18 22V19.3913H20C21.1046 19.3913 22 18.4958 22 17.3913V6.60864C22 5.50407 21.1046 4.60864 20 4.60864H18V2Z"
        fill="#FF3B3C"
      />
    </svg>
  );
}
