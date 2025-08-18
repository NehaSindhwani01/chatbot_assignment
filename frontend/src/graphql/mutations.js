import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!, $user_id: uuid!) {
    insert_chats_one(object: { title: $title, user_id: $user_id }) {
      id
      title
      created_at
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $content: String!
    $chat_id: uuid!
    $sender: String!  # Must be either "user" or "bot"
  ) {
    insert_messages_one(
      object: {
        content: $content
        chat_id: $chat_id
        sender: $sender
      }
    ) {
      id
      content
      created_at
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($chat_id: uuid!) {
    delete_chats_by_pk(id: $chat_id) {
      id
    }
  }
`;