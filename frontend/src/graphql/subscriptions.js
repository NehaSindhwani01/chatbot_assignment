import { gql } from "@apollo/client";

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageSubscription($chat_id: uuid!) {
    messages(
      where: { chat_id: { _eq: $chat_id } }
      order_by: { created_at: asc }
    ) {
      id
      sender
      content
      created_at
    }
  }
`;

export const CHATS_SUBSCRIPTION = gql`
  subscription ChatsSubscription($user_id: uuid!) {
    chats(
      where: { user_id: { _eq: $user_id } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
    }
  }
`;