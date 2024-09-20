interface BtnProps {
  text: string;
  className?: string;
  handleClick: () => void;
}

export default function Button({ text, className, handleClick }: BtnProps) {
  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
}
