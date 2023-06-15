import { RpgClient, RpgModule, RpgGui } from '@rpgjs/client'
import { Characters } from './characters/characters'
import { CommitCharacter } from './characters/commitCharacter'
import { RevealCharacter } from './characters/revealCharacter'
import commitTooltip from './gui/commit-tooltip.vue'
import revealTooltip from './gui/reveal-tooltip.vue'

@RpgModule<RpgClient>({ 
    spritesheets: [
        Characters,
        CommitCharacter,
        RevealCharacter
    ],
    gui: [
        commitTooltip,
        revealTooltip
    ],
    scenes: {
        map: {
            onAfterLoading() {
                RpgGui.display('commit-tooltip')
                RpgGui.display('reveal-tooltip')
            }
        }
    },
})
export default class RpgClientModuleEngine {}