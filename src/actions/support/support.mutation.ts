import { apiClient } from "@/lib/api-client";
import { CreateTicketDataType, TicketResponse } from "@/types/support.types";
import { mutationOptions } from "@tanstack/react-query";

export const CreateSupportTicketMutation = mutationOptions({
  mutationKey: ["createTicket"],
  mutationFn: (payload: CreateTicketDataType) => {
    const formData = new FormData();

    formData.append("category", payload.category);
    formData.append("message", String(payload.message));
    formData.append("subject", payload.subject);

    payload.screenshots.forEach((image) => {
      formData.append("screenshots", image);
    });

    return apiClient<TicketResponse>("/v1/support/tickets", {
      method: "POST",
      body: formData,
    });
  },
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey;

        return key.includes("tickets");
      },
    });
  },
});

export const ReplyTicketMutation = mutationOptions({
  mutationKey: ["replyTicket"],
  mutationFn: (payload: {
    ticketId: string;
    body: {
      message: string;
      screenshots?: File[];
    };
  }) => {
    const formData = new FormData();

    formData.append("message", payload.body.message);

    if (payload.body.screenshots) {
      payload.body.screenshots.forEach((image) => {
        formData.append("screenshots", image);
      });
    }

    return apiClient<TicketResponse>(
      `/v1/support/tickets/${payload.ticketId}/replies`,
      {
        method: "POST",
        body: formData,
      },
    );
  },
  onSuccess: (_data, variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey;

        return key.includes("ticketDetail") && key.includes(variables.ticketId)
      },
    });
  },
});
