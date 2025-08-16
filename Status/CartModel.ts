// Components/Cart/CartProcessProvider.tsx  (Server Component)

import CartProcessClient from "@/Components/Cart/CartProcessClient";
import { addLines, updateLine, removeLine, clear } from "@/ServerFunctions/Cart/actions";

export default function CartProcessProvider({ children }: { children: React.ReactNode }) {
  return <CartProcessClient actions={{ addLines, updateLine, removeLine, clear }}>{children}</CartProcessClient>;
}
