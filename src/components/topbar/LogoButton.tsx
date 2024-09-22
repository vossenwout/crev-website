import { useRouter } from "next/navigation";

interface LogoButtonProps {
  title: string;
  href: string;
}

export default function LogoButton(props: LogoButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(props.href)}
      className="text-3xl  font-extrabold  cursor-pointer hover:underline"
    >
      {props.title}
    </button>
  );
}
