import { useContext } from 'react'
import { LearningContext } from '../context/learningContext'

export function useLearning() {
  return useContext(LearningContext)
}
