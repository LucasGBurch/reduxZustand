import { useCurrentLesson, useStore } from "../zustand-store"

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()

  // Preferível à desestruturação pois assim o Zustand não ouve o estado de todo o useStore
  const isLoading = useStore(store => store.isLoading)

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>
  }

  // Animação do Tailwind: Pulse

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className=" text-sm text-zinc-400">Módulo "{currentModule?.title}"</span>
    </div>
  )
}
