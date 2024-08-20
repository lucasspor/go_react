import { useEffect } from "react"
import { GetRoomMessageResponse } from "../http/get-room-messages"
import { useQueryClient } from "@tanstack/react-query"

interface useMesssagesWebSocketParams{
  roomId: string
}

type WebhookMessage = 
|{ kind: 'message_created'; value: {id: string, message: string}}
|{ kind: 'message_answered'; value: {id: string}}
|{ kind: 'message_reaction_increased'; value: {id: string, count: number;}}
|{ kind: 'message_reaction_decreased'; value: {id: string, count: number;}};

export function useMesssagesWebSockets({roomId,}: useMesssagesWebSocketParams){
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)

    ws.onopen = () => {
      console.log('Websocket Connection')
    }

    ws.onopen = () => {
      console.log('Websocket Connection lost')
    }

    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data)

      switch (data.kind) {
        case 'message_created':
          queryClient.setQueryData<GetRoomMessageResponse>(['messages', roomId], state => {
            return {
              messages: [
                ...(state?.messages ?? []),
                {
                  id: data.value.id,
                  text: data.value.message,
                  amountOfReactions: 0,
                  answered: false,
                }
              ],
            }
          })
          break;
        case 'message_answered':
          queryClient.setQueryData<GetRoomMessageResponse>(['messages', roomId], state => {
            if (!state) {
              return undefined
            }
            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return { ...item, answered: true }
                }

                return item
              }),
            }
          })
          break;
        case 'message_reaction_increased':
        case 'message_reaction_decreased':
          queryClient.setQueryData<GetRoomMessageResponse>(['messages', roomId], state => {
            if (!state) {
              return undefined
            }
            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return { ...item, amountOfReactions: data.value.count }
                }

                return item
              }),
            }
          })
          break;
      }
    }

    return () => {
      ws.close()
    }

  }, [roomId, queryClient])
}