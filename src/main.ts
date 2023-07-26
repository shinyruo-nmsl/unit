import { createApp } from './util'
import humanInstanceEl from './human'
import Routers from './router'

createApp(humanInstanceEl, document.getElementById('app')!, Routers)
