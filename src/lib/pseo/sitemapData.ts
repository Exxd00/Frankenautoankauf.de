import { pseoCasesList } from "@/lib/pseo/pseoCases"
import { coreCityKeys, pseoCitiesList } from "@/lib/pseo/pseoCities"

const DEFAULT_BASE = "https://frankenautoankauf.de"

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE).replace(/\/$/, "")
}

const BUILD_TIME_ISO = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

export function getNowIso() {
  return BUILD_TIME_ISO
}

export function staticPagePaths() {
  return [
    "/",
    "/auto-verkaufen",
    "/faelle",
    "/staedte",
    "/auto-verkaufen-heute",
    "/auto-verkaufen-sofort",
    "/impressum",
    "/datenschutz",
  ]
}

export function caseKeys() {
  return pseoCasesList.map(c => c.key)
}

export function cityKeysAll() {
  return pseoCitiesList.map(c => c.key)
}

export function cityKeysCore() {
  return coreCityKeys
}

export function caseOnlyPaths() {
  return caseKeys().map(k => `/auto-verkaufen/${k}`)
}

export function cityOnlyPathsCore() {
  return cityKeysCore().map(k => `/autoankauf/${k}`)
}

export function cityOnlyPathsAll() {
  return cityKeysAll().map(k => `/autoankauf/${k}`)
}

export function intentCityPathsCore() {
  const cities = cityKeysCore()
  const out: string[] = []
  for (const c of cities) {
    out.push(`/auto-verkaufen-heute/${c}`)
    out.push(`/auto-verkaufen-sofort/${c}`)
  }
  return out
}

export function caseCityPathsAll() {
  const out: string[] = []
  const cases = caseKeys()
  const cities = cityKeysAll()
  for (const ca of cases) {
    for (const ci of cities) {
      out.push(`/auto-verkaufen/${ca}/${ci}`)
    }
  }
  return out
}