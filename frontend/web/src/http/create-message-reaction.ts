interface CreateMessageReactionsRequest {
  roomId: string
  messageId: string
}

export async function createMessageReactions({ messageId, roomId }: CreateMessageReactionsRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'PATCH',
  })
}