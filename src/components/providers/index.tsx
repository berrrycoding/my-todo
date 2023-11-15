import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
