import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

export const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.setGraphic('male012')
        player.setHitbox(16, 16)
        player.setComponentsTop(Components.text('{name}'))
        player.changeMap('simplemap')
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            var revealEvent = player.getVariable('revealEvent')
            var commitEvent = player.getVariable('commitEvent')
            if(revealEvent)
                player.hideAttachedGui([revealEvent])
            if(commitEvent)
                player.hideAttachedGui([commitEvent])
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }
        player.setVariable('AFTER_INTRO', true)
    }
}