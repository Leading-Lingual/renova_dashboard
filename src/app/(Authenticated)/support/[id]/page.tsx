import TicketDetailContent from "./TicketDetailContent";

const ListingDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const ticketId = (await params).id;
  return <TicketDetailContent ticketId={ticketId} />;
};

export default ListingDetailPage;
