// Estado compartilhado entre o HUD, o minigame e a lista de conquistas.
export const ACHIEVEMENTS = [
  { id: 'first', icon: '01', name: 'Primeiro bug', desc: 'Todo dev começa assim.' },
  { id: 'review', icon: '25', name: 'Code review', desc: 'Faça 25 pontos.' },
  { id: 'combo', icon: 'x10', name: 'Combo x10', desc: '10 bugs sem respirar. Pontos em dobro.' },
  { id: 'boss', icon: 'B', name: 'Bug de produção', desc: 'Derrube o chefão amarelo.' },
  { id: 'friday', icon: '100', name: 'Deploy na sexta', desc: '100 pontos. E nada quebrou.' }
]

export const BEST_STORAGE_KEY = 'felipecss-best'

export const useArcade = () => {
  const score = useState('arcade-score', () => 0)
  const best = useState('arcade-best', () => 0)
  const unlocked = useState('arcade-unlocked', () => ({}))
  const trophies = computed(() => ACHIEVEMENTS.filter((a) => unlocked.value[a.id]).length)

  return { score, best, unlocked, trophies, total: ACHIEVEMENTS.length }
}

export const padScore = (n) => String(n).padStart(4, '0')
