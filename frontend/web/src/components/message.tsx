import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReactions } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReactions } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false)

  const { roomId } = useParams()

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await createMessageReactions({ messageId, roomId });
      setHasReacted(true);
    } catch {
      toast.error("Falha ao curtir mensagem");
    }
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await removeMessageReactions({ messageId, roomId });
      setHasReacted(false);
    } catch {
      toast.error("Falha ao remover a curtida, tente novamente!");
    }
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="button"
          className="flex items-center text-orange-400 hover:text-orange-500 gap-2 mt-3"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="button"
          className="flex items-center text-zinc-400 gap-2 mt-3 hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  );
}