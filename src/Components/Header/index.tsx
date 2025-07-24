import { useLocalStorage } from "@/hooks/use-local-storage";
import type { UserType } from "@/types/UserType";

export default function Header() {
    const user = useLocalStorage().getItem<UserType>("user");
  return (
    <div className="flex items-center justify-between py-2 px-12">
        <h2 className="text-3xl">Apoint</h2>
        <div>
            <p className="text-xl">{user?.username}</p>
        </div>
    </div>
  )
}