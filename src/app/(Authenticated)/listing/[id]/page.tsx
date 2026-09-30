import ListingDetailsContent from "./ListingDetailsContent";

const ListingDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const listingId = (await params).id;
  return <ListingDetailsContent listingId={listingId} />;
};

export default ListingDetailPage;
