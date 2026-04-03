"use client"

export type LeadSource = {
  source_url: string
  source_path: string
  click_source: string
  ts: number
}

export type TrackEventType = 'whatsapp_click' | 'phone_click' | 'form_submit'

export interface TrackEventData {
  event_type: TrackEventType
  page_url?: string
  page_path?: string
  referrer?: string
  device_type?: string
  timestamp?: string
  click_source?: string
  // Additional data for form_submit
  brand?: string
  model?: string
  year?: string
  mileage?: string
  fuel?: string
  name?: string
  email?: string
  phone?: string
  location?: string
  message?: string
}

const KEY = "faa_lead_source"

export function setLeadSource(click_source: string) {
  if (typeof window === "undefined") return
  const data: LeadSource = {
    source_url: window.location.href,
    source_path: window.location.pathname,
    click_source,
    ts: Date.now(),
  }
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function getLeadSource(): LeadSource | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LeadSource
    if (!parsed || typeof parsed !== "object") return null
    return parsed
  } catch {
    return null
  }
}

export function clearLeadSource() {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

type GtagFn = (command: "event", eventName: string, params?: Record<string, unknown>) => void

export function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag
  if (typeof gtag === "function") {
    gtag("event", eventName, {
      ...params,
      page_path: window.location.pathname,
    })
  }
}

/**
 * Track an event and send it to Google Sheets via the API
 * Used for: whatsapp_click, phone_click, form_submit
 */
export async function trackToSheets(eventType: TrackEventType, additionalData?: Partial<TrackEventData>) {
  if (typeof window === "undefined") return

  const leadSource = getLeadSource()
  const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop'

  const eventData: TrackEventData = {
    event_type: eventType,
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer || '',
    device_type: deviceType,
    timestamp: new Date().toISOString(),
    click_source: leadSource?.click_source || '',
    ...additionalData,
  }

  // Also send GA4 event
  gtagEvent(eventType, {
    event_category: eventType === 'form_submit' ? 'Lead' : 'Engagement',
    event_label: window.location.pathname,
  })

  try {
    await fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
  } catch (err) {
    console.error('Track event failed:', err)
  }
}

/**
 * Track WhatsApp button click
 */
export function trackWhatsAppClick() {
  trackToSheets('whatsapp_click')
}

/**
 * Track Phone button click
 */
export function trackPhoneClick() {
  trackToSheets('phone_click')
}
