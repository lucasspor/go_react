import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessage} from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMesssagesWebSockets } from "../hooks/use-message-web-socket";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages component must be used within room page')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessage({ roomId }),
  })

  useMesssagesWebSockets({roomId})

  const sortedMessages = data.messages.sort((a, b) =>{
    return b.amountOfReactions - a.amountOfReactions
  })
  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {
        sortedMessages.map(message => {
          return (
            <Message
              id={message.id}
              key={message.id}
              text={message.text}
              amountOfReactions={message.amountOfReactions}
              answered={message.answered} />
          )

        })
      }
    </ol>
  )
}