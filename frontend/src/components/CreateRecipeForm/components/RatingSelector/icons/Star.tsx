type Props = {
  colour?: string;
};
export default function Star({ colour }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 24 24"
      width="24"
      fill={colour ?? 'white'}
      stroke="black"
    >
      <path d="M10 16.207l-6.173 3.246 1.179-6.874L.01 7.71l6.902-1.003L10 .453l3.087 6.254 6.902 1.003-4.995 4.869 1.18 6.874z" />
    </svg>
  );
}
