import { useParams } from "react-router-dom"
import amaLogo from '../assets/ama-logo.svg'
import { Share2 } from "lucide-react"

export function Room() {
  const { roomId } = useParams()
  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5"/>
        <span className="text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button type="submit"  className='flex  items-center gap-1.5 text-zinc-300 font-medium hover:bg-zinc-500 bg-zinc-800 px-3 py-1.5 rounded-lg'>
            Compartilhar <Share2 className='size-4'/></button>
      </div>

      <div className="f">

      </div>
    </div>
  )
}