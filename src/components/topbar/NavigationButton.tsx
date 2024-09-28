import { useRouter } from "next/navigation";

interface NavigationButtonProps {
  title: string;
  href: string;
  active: boolean;
}

export default function NavigationButton(props: NavigationButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(props.href)}
      className={`${
        props.active ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200"
      } focus:outline-none rounded-md py-2 px-4 border border-gray-200 transition duration-300 ease-in-out`}
    >
      {props.title}
    </button>
  );
}
