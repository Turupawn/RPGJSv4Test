import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'EV-Reveal', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export class RevealEvent extends RpgEvent {
    onInit() {
        this.setGraphic('revealCharacter')
    }
    async onAction(player: RpgPlayer) {
        player.gui('reveal-tooltip').open()
        player.showAttachedGui()
    }
} 