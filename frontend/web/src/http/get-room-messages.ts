interface GetRoomMessageRequest {
  roomId: string
}

export async function getRoomMessage({ roomId }: GetRoomMessageRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`,)

  const data: Array<{
    id: string
    roomId: string
    message: string
    reaction_count: number
    answered: boolean
  }> = await response.json()

  return {
    messages: data.map(item => {
      return{
        id: item.id,
        text: item.message,
        amountOfReactions: item.reaction_count,
        answered: item.answered,
      }
    })
  }
}