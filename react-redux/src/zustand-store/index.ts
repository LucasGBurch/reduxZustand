import { create } from 'zustand'

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex
      })
    },

    next: () => { // Não precisa de payload (action). Por isso ao tirar ele entende lá no Video.tsx que não precisa colocar nada dentro da chamada do next()
      const { currentModuleIndex, currentLessonIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]
      // Se ainda houver próximas lições no módulo (não faz sentido o next quando é a última no array):
      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      } else { // Agora, se houver módulo seguinte...
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          // Se houver o próximo módulo, o índice de aulas volta para o primeiro:
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    },
  }
})
