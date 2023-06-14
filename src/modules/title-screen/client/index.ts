import { RpgClient, RpgModule, RpgGui } from '@rpgjs/client'
import titleGui from './gui/title.vue'
import { sprite } from './sprite'

@RpgModule<RpgClient>({ 
    sprite,
    gui: [
        titleGui
    ]
})
export default class RpgClientEngine {}