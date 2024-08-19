import { useParams } from "react-router-dom"
import { ArrowRight, Share2 } from "lucide-react"
import { toast } from "sonner"

import amaLogo from '../assets/ama-logo.svg'
import { Message } from "../components/message"

export function Room() {
  const { roomId } = useParams()

  function handleShareRoom(){
    const url = window.location.href.toString()

    if(navigator.share !== undefined && navigator.canShare()){
      navigator.share({url})
    }else {
      navigator.clipboard.writeText(url)
      toast.info('The room URL was copied to your clipboard')
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />
        <span className="flex-1 text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button onClick={handleShareRoom} type="submit" className='flex   items-center gap-1.5 text-zinc-300 font-medium hover:bg-zinc-500 bg-zinc-800 px-3 py-1.5 rounded-lg'>
          Compartilhar <Share2 className='size-4' /></button>
      </div>

      <div className="h-px w-full bg-zinc-900">      </div>

      <form className="flex px-2 py-2 bg-zinc-800 rounded-xl items-center ring-orange-400 ring-offset-4 ring-offset-zinc-800 focus-within:ring-1">
        <input
          type="text"
          name="theme"
          autoComplete='off'
          placeholder='Qual a sua pergunta?'
          className='flex-1 text-sm mx-2 placeholder:text-zinc-500 text-zinc-100 bg-transparent outline-none' />
        <button
          className='flex  items-center gap-1.5 text-orange-950 font-medium hover:bg-orange-500 bg-orange-400 px-3 py-1.5 rounded-lg'
        >
          Criar pergunta <ArrowRight className='size-4' /></button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <Message text="O que é GoLang e quais são suas principais vantagens em comparação com outras linguagens de programação como Python, Java ou C++?" amountOfReactions={123}  answered={true}/>
        <Message text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?" amountOfReactions={50} />
        <Message text="Quais são as melhores práticas para organizar o código em um projeto GoLang, incluindo pacotes, módulos e a estrutura de diretórios?" amountOfReactions={20} />
      </ol>
    </div>
  )
}