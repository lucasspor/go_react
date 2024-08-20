interface RemoveMessageReactionsRequest {
  roomId: string
  messageId: string
}

export async function removeMessageReactions({ messageId, roomId }: RemoveMessageReactionsRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'DELETE',
  })
}