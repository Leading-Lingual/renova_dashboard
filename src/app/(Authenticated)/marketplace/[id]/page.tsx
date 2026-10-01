import ListingDetailsContent from "../../listing/[id]/ListingDetailsContent";

const MarketplaceDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const listingId = (await params).id;
  return <ListingDetailsContent listingId={listingId} isMarketPlace />;
};

export default MarketplaceDetailPage;
