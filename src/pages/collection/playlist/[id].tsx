import PlaylistPage from "@/components/pages/collection/playlist-page";
import AuthGuard from "@/components/shared/auth-guard/auth-gard";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  return (
    <AuthGuard>
      <PlaylistPage id={id as string} />
    </AuthGuard>
  );
}
