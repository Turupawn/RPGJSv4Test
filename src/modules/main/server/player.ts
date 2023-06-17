import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'
import Web3 from 'web3'
import dotenv from 'dotenv'

var contract

async function initWeb3(player: RpgPlayer) {
    // Init stuff (TODO: move this to state)
    console.log("=== Loading web3 stuff")
    dotenv.config()
    console.log(process.env.RPC_URL)
    let web3 = new Web3(process.env.RPC_URL);
    let contractAddress = '0xa5e742b4aCCD558F2D17555E4387099f6D4261cC';
    let abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"randomnessCeremonyAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"ceremonies","outputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bool","name":"isNFTClaimed","type":"bool"},{"internalType":"bool","name":"isETHClaimed","type":"bool"},{"internalType":"bool","name":"isNFTCreatorETHClaimed","type":"bool"},{"internalType":"bool","name":"isProtocolETHClaimed","type":"bool"},{"internalType":"uint256","name":"ticketCount","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"components":[{"internalType":"uint256","name":"lottoETHPercentage","type":"uint256"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"internalType":"structLottoAndNFTCeremony.Percentages","name":"percentages","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceremonyCount","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFTCreatorETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimProtocolETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"claimSlashedETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"commiter","type":"address"},{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"commitmentDeadline","type":"uint256"},{"internalType":"uint256","name":"revealDeadline","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"name":"createCeremony","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"getRandomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"enumLottoAndNFTCeremony.WinnerType","name":"winnerType","type":"uint8"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomnessCeremony","outputs":[{"internalType":"contractRandomnessCeremony","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"},{"internalType":"bytes32","name":"secretValue","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"ticketOwner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`);
    contract = new web3.eth.Contract(abi, contractAddress)
    player.setVariable('contract', contract)
    console.log("end web3 load ===")
}

export const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.setGraphic('male012')
        player.setHitbox(16, 16)
        player.setComponentsTop(Components.text('{name}'))
        player.changeMap('simplemap')
        initWeb3(player)
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