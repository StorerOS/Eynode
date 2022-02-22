import dayjs from 'dayjs'

export function timeFormat(time, f) {
  if (!time) return ''
  const t = time * 1000
  if (!f) return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
  return dayjs(t).format(f)
}

export function interceptionText(value, count = 3) {
  if (!value) return ''
  return String(value).slice(0, count)
}
