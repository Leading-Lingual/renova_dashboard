import { CreateTicketSchema } from "@/validations/support.validation";
import { Ticket } from "lucide-react";
import z from "zod";

export type CreateTicketDataType = z.infer<typeof CreateTicketSchema>;
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";
export type TicketCategory =
  | "ACCOUNT_PROFILE"
  | "PAYMENTS"
  | "PICKUP_DELIVERY"
  | "SAFETY_SECURITY";

export type TicketMessage = {
  id: string;
  authorRole: "USER" | "SUPPORT";
  author: {
    id: string;
    name: string;
  };
  message: string;
  attachments: [
    {
      id: string;
      url: string;
      expiresAt: string;
      createdAt: string;
    },
  ];
  createdAt: string;
};

export type TicketAttachment = {
  id: string;
  url: string;
  expiresAt: string;
  createdAt: string;
};

export type TicketRelatedEntity = {
  type: "ORDER";
  id: string;
  reference: string;
};

export type RequesterType = {
  id: string;
  name: string;
  email: string;
};

export interface Ticket {
  id: string;
  ticketNumber: string;
  category: TicketCategory;
  subject: string;
  descriptionPreview: string;
  status: TicketStatus;
  requester: RequesterType;
  lastActivityAt: string;
  createdAt: string;
}

export type TicketResponse = {
  id: string;
  ticketNumber: string;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  requester: RequesterType;
  relatedEntity: TicketRelatedEntity;
  attachments: TicketAttachment[];
  messages: TicketMessage[];
  resolvedAt: string;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetTicketsresponse {
  items: Ticket[];
  counts: {
    all: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
  nextCursor: string;
}

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export interface Article {
  id: string;
  category: TicketCategory;
  status: ArticleStatus;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetArticleResponse {
  items: Article[];
  nextCursor: string;
}
