import { Link, LinkProps } from "expo-router";
import { Text } from "react-native";

type LinkButtonProps = LinkProps<string> & {
  title: string
}

export function LinkButton({title, ...rest}: LinkButtonProps) {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      <Text>{title}</Text>
    </Link>
  )
}