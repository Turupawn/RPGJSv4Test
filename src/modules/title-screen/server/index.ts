import { RpgServer, RpgModule, RpgPlayer } from '@rpgjs/server'

@RpgModule<RpgServer>({ 
    player: {
        onConnected(player: RpgPlayer) {
            const gui = player.gui('rpg-title-screen')
            gui.on('start-game', () => {
                gui.close()
                player.changeMap('simplemap')
            })
            gui.open()
        }
    }
})
export default class RpgServerModule {}