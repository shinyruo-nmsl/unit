import { renderCommonElement } from './util'
// import humanInstanceEl from './human'

;(async () => {
  const humanInstanceEl = (await import('./human')).default
  renderCommonElement(humanInstanceEl, document.getElementById('app')!)
})()
