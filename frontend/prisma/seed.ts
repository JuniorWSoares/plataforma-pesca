import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Atualizando o seed do catálogo de peixes do Rio Paraíba do Sul...')

  // Limpa os dados existentes para evitar duplicados
  await prisma.species.deleteMany()

  await prisma.species.createMany({
    data: [
      {
        popularName: "Dourado",
        scientificName: "Salminus brasiliensis",
        description: "O 'Rei do Rio'. Predador alfa das corredeiras do Paraíba do Sul. Exige muita técnica, pois ataca com extrema violência e salta muito fora d'água. Altamente influenciado pela transparência da água e pressão atmosférica.",
        bestBaits: ["Iscas de Meia-água grandes (barbela longa)", "Colheres cromadas", "Tuvira viva"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Tucunaré",
        scientificName: "Cichla ocellaris",
        description: "Espécie introduzida que se adaptou muito bem nos trechos mais lentos e represados do rio. Muito ativo em dias quentes e de pressão estável. Detesta frentes frias, onde fica totalmente manhoso no fundo.",
        bestBaits: ["Iscas de Superfície (Zara/Popper)", "Meia-água", "Jigs de bucktail"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Piapara",
        scientificName: "Leporinus elongatus",
        description: "Peixe manhoso e muito forte, que habita as cevas e canais mais profundos do rio. A pescaria exige extrema sensibilidade na linha. É muito afetada por mudanças bruscas no nível da água (vazão das barragens).",
        bestBaits: ["Milho azedo", "Caranguejo", "Massa de farinha", "Larva de bicho da seda"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Mandi",
        scientificName: "Pimelodus maculatus",
        description: "Peixe de couro de pequeno porte, extremamente comum em todo o leito do Paraíba do Sul. Tem hábitos noturnos e atividade intensa quando o rio sobe e a água fica mais turva (barrenta) após as chuvas.",
        bestBaits: ["Minhoca", "Pedaço de peixe/lambari", "Coração de boi", "Queijo"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Traíra",
        scientificName: "Hoplias malabaricus",
        description: "Predador de emboscada clássico. Habita as margens paradas, lagoas marginais e locais com muita vegetação ou galhada no rio. Mantém-se ativa mesmo em águas com menor oxigenação.",
        bestBaits: ["Sapos artificiais (Frogs)", "Iscas de borracha (Soft baits)", "Lambari vivo"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Curimba",
        scientificName: "Prochilodus lineatus",
        description: "Também conhecido como Curimbatá. Peixe detritívoro que se alimenta no fundo limpando o lodo das pedras. Conhecido por dar saltos espetaculares quando fisgado. Muito importante para o monitoramento da bacia.",
        bestBaits: ["Massa azeda à base de farelo", "Miolo de pão", "Vegetação marginal"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      },
      {
        popularName: "Piau",
        scientificName: "Leporinus friderici",
        description: "Piau-três-pintas. Peixe muito rápido e arisco, parente da Piapara. Gosta de se alimentar nas margens perto de árvores frutíferas. Uma das espécies mais divertidas de pescar com material leve.",
        bestBaits: ["Milho verde", "Massa de trigo", "Cupim", "Bichinho do lenho"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400"
      }
    ]
  })

  console.log('✅ Catálogo completo com 7 espécies do Rio Paraíba do Sul populado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })