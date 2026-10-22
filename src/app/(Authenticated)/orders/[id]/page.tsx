import OrderDetailsContent from "./OrderDetailsContent";

const OrderDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const orderId = (await params).id;
  return <OrderDetailsContent orderId={orderId} />;
};

export default OrderDetail;
