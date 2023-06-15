import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'EV-Commit', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export class CommitEvent extends RpgEvent {
    onInit() {
        this.setGraphic('commitCharacter')
    }
    async onAction(player: RpgPlayer) {
        this.gui('commit-tooltip').open()
        player.showAttachedGui([this])
        player.setVariable('commitEvent', this)
    }
} 