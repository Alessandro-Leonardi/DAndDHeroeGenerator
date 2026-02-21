import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CharacterGenerator from './CharacterGenerator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharacterGenerator/>
  </StrictMode>,
)
