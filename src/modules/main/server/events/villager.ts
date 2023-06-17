import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'EV-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female132')
    }
    async onAction(player: RpgPlayer) {
        try
        {
            var contract = player.getVariable('contract')
            var ceremonyCount = await contract.methods.ceremonyCount().call()
            var lastCeremonyId = parseInt(ceremonyCount) - 1
            var ethWinner = await contract.methods.getWinner(lastCeremonyId,0).call()
            var nftWinner = await contract.methods.getWinner(lastCeremonyId,1).call()
            var loser = await contract.methods.getWinner(lastCeremonyId,2).call()

            await player.showText(
                'The ETH winner is ' + ethWinner +
                '. The NFT winner is ' + nftWinner +
                '. And ' + loser + " has to invite a beer. Also, take ths 10 gold."
                        , {
                talkWith: this
            })
            player.gold += 10
        }catch(e)
        {
            await player.showText(
                'Oops, looks like the results are not ready yet. Please come back later.'
                        , {
                talkWith: this
            })
        }

    }
} 