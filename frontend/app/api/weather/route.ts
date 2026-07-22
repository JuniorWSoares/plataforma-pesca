import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // 1. Pega os parâmetros lat e lon da URL enviada pelo front-end
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    // Validação de presença
    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude e Longitude são obrigatórias" }, { status: 400 })
    }

    // Validação de formato numérico
    const latNum = parseFloat(lat)
    const lonNum = parseFloat(lon)

    if (isNaN(latNum) || isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
      return NextResponse.json({ error: "Latitude ou Longitude inválidas" }, { status: 400 })
    }

    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API de clima não configurada no .env" }, { status: 500 })
    }

    // 2. Faz a chamada HTTP para o OpenWeatherMap (em Celsius / metric)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latNum}&lon=${lonNum}&appid=${apiKey}&units=metric&lang=pt_br`

    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Erro ao consultar provedor de clima externo (status ${response.status})` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Garante que os arrays e campos opcionais existem antes de acessar
    const weatherDescription = data.weather?.[0]?.description ?? 'indefinido'
    const weatherIcon = data.weather?.[0]?.icon ?? ''

    // 3. Mapeia e higieniza apenas os dados relevantes para o algoritmo de pesca
    const weatherData = {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,         // hPa (1013 hPa é o padrão ideal ao nível do mar)
      humidity: data.main.humidity,         // %
      windSpeed: data.wind.speed,           // m/s
      windDirection: data.wind.deg ?? null, // graus (pode ser null quando não há vento)
      condition: weatherDescription,
      icon: weatherIcon,
      locationName: data.name
    }

    return NextResponse.json(weatherData, { status: 200 })

  } catch (error) {
    console.error("Erro na rota de clima:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}
