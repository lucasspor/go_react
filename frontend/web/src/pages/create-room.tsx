import { ArrowRight } from 'lucide-react'
import amaLogo from '../assets/ama-logo.svg'
import { useNavigate } from 'react-router-dom'
import { createRoom } from '../http/create-room'
import { toast } from 'sonner'

export function CreateRoom() {
  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      const { roomId } = await createRoom({ theme })

      navigate(`/room/${roomId}`)
    } catch {
      toast.error('Failed to create a room!')
    }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[475px] flex flex-col gap-6'>
        <img src={amaLogo} alt="AMA" className='h-10' />
        <p className='leading-relaxed text-zinc-300 text-center'>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>
        <form action={handleCreateRoom} className="flex px-2 py-2 bg-zinc-800 rounded-xl items-center ring-orange-400 ring-offset-4 ring-offset-zinc-800 focus-within:ring-1">
          <input
            type="text"
            name="theme"
            autoComplete='off'
            placeholder='Nome da sala'
            className='flex-1 text-sm mx-2 placeholder:text-zinc-500 text-zinc-100 bg-transparent outline-none'
            required />
          <button className='flex  items-center gap-1.5 text-orange-950 font-medium hover:bg-orange-500 bg-orange-400 px-3 py-1.5 rounded-lg'>
            Criar sala <ArrowRight className='size-4' /></button>
        </form>
      </div>

    </main>
  )
}