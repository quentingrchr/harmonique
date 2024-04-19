import MusicCollectionHeaderSkeleton from "@/components/pages/collection/collection-header/collection-header-skeleton";
import PageContainer from "@/components/shared/page-container";

export default function PlaylistPageSkeleton() {
  return (
    <PageContainer>
      <div className="mt-12 w-full">
        <MusicCollectionHeaderSkeleton />

        {/* <Table /> */}
      </div>
    </PageContainer>
  );
}
