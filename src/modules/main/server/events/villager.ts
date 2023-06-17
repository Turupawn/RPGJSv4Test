import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
import Web3 from 'web3'

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
		// Init stuff (TODO: move this to state)
        try
        {
		let web3 = new Web3("https://optimism-mainnet.infura.io/v3/e36c360e9f504634957f516f1b068f29");
		let contractAddress = '0xa5e742b4aCCD558F2D17555E4387099f6D4261cC';
		let abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"randomnessCeremonyAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"ceremonies","outputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bool","name":"isNFTClaimed","type":"bool"},{"internalType":"bool","name":"isETHClaimed","type":"bool"},{"internalType":"bool","name":"isNFTCreatorETHClaimed","type":"bool"},{"internalType":"bool","name":"isProtocolETHClaimed","type":"bool"},{"internalType":"uint256","name":"ticketCount","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"components":[{"internalType":"uint256","name":"lottoETHPercentage","type":"uint256"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"internalType":"structLottoAndNFTCeremony.Percentages","name":"percentages","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceremonyCount","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFTCreatorETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimProtocolETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"claimSlashedETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"commiter","type":"address"},{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"commitmentDeadline","type":"uint256"},{"internalType":"uint256","name":"revealDeadline","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"name":"createCeremony","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"getRandomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"enumLottoAndNFTCeremony.WinnerType","name":"winnerType","type":"uint8"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomnessCeremony","outputs":[{"internalType":"contractRandomnessCeremony","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"},{"internalType":"bytes32","name":"secretValue","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"ticketOwner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`);
        let contract = new web3.eth.Contract(abi, contractAddress)

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