import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' 

export async function GET() {
  try {
    // Busca todas as 7 espécies que você cadastrou através do seed no PostgreSQL
    const species = await prisma.species.findMany()
    
    // Retorna a lista em formato JSON com status 200 (Sucesso)
    return NextResponse.json(species, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar espécies no banco:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}