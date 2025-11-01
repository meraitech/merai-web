import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  /** Gunakan size untuk set width & height sekaligus (boleh number atau string, default 24) */
  size?: number | string;
  /** Warna stroke/fill; default pakai currentColor biar bisa dikontrol via CSS */
  color?: string;
  /** Ketebalan garis */
  strokeWidth?: number | string;
};

const IconInstagram = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 24,
      width,
      height,
      color = "currentColor",
      strokeWidth = 1.5,
      // kamu masih bisa kirim className, style, onClick, aria-label, dll lewat ...props
      ...props
    },
    ref
  ) => {
    const w = width ?? size;
    const h = height ?? size;

    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // biar warna bisa dikontrol via CSS (.text-white, .text-pink-500, dll)
        color={color}
        {...props}
      >
        <path
          d="M12 16c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <path
          d="M17.5 6.51 17.51 6.499"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

IconInstagram.displayName = "IconInstagram";

export default IconInstagram;
