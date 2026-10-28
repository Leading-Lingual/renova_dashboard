export interface TicketType {
  id: string;
  subject:string;
  description: string;
  date: string;
  status: string;
  reference?: string;
}