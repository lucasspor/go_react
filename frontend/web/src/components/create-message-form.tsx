import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessage } from "../http/create-message";

export function CreateMessageForm(){

  const { roomId } = useParams()
  
    if (!roomId) {
      throw new Error('Messages component must be used within room page')
    }
  
   async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if(!message || !roomId){
      return
    }

    try{
      await createMessage({message, roomId})
    }catch{
      toast.error('Falha ao enviar a pergunta')
    }
   }
  return(
    <form action={createMessageAction} className="flex px-2 py-2 bg-zinc-800 rounded-xl items-center ring-orange-400 ring-offset-4 ring-offset-zinc-800 focus-within:ring-1">
        <input
          type="text"
          name="message"
          autoComplete='off'
          placeholder='Qual a sua pergunta?'
          className='flex-1 text-sm mx-2 placeholder:text-zinc-500 text-zinc-100 bg-transparent outline-none' />
        <button
          className='flex  items-center gap-1.5 text-orange-950 font-medium hover:bg-orange-500 bg-orange-400 px-3 py-1.5 rounded-lg'
        >
          Criar pergunta <ArrowRight className='size-4' /></button>
      </form>
  )
}