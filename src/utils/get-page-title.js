import defaultSettings from '@/settings'

const title = defaultSettings.title || '动环浏览器'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
