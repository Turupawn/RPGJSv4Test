<template>
	<span class="tooltip tooltip-effect" :class="{ hover }">
		<span class="tooltip-item"></span>
			<span class="tooltip-content clearfix">
			<span class="tooltip-text">
				<h3>Commit</h3>
				<label for="commitCeremonyId">Ceremony Id:</label>
				<input type="text" id="commitCeremonyId" v-model="commitCeremonyId">
				<br>
				<label for="commitSecret">Secret:</label>
				<input type="text" id="commitSecret" v-model="commitSecret">
				<br>
				<button @click="onCommit">Commit</button>
				<br>
				<h3>Reveal</h3>
				<label for="revealCeremonyId">Ceremony Id:</label>
				<input type="text" id="revealCeremonyId" v-model="revealCeremonyId">
				<br>
				<label for="revealSecret">Secret:</label>
				<input type="text" id="revealSecret" v-model="revealSecret">
				<br>
				<button @click="onReveal">Reveal</button>
			</span>
		</span>
	</span>
</template>

<script>
import Web3 from 'web3'

export default {
  name: "reveal-tooltip",
  rpgAttachToSprite: true,
  props: ["spriteData"],
  inject: ["rpgScene"],
  data() {
    return {
      hover: false,
	  commitCeremonyId: null,
	  commitSecret: null
    };
  },
  async mounted() {
    const sprite = this.rpgScene().getSprite(this.spriteData.id)
    console.log(sprite)
    setTimeout(() => { this.hover = true }, 100)
  },
  methods: {
	  async onCommit() {
		  // Init stuff (TODO: move this to state)
		  let web3 = new Web3(window.ethereum);
		  let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
		  let contractAddress = '0xa5e742b4aCCD558F2D17555E4387099f6D4261cC';
		  let abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"randomnessCeremonyAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"ceremonies","outputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bool","name":"isNFTClaimed","type":"bool"},{"internalType":"bool","name":"isETHClaimed","type":"bool"},{"internalType":"bool","name":"isNFTCreatorETHClaimed","type":"bool"},{"internalType":"bool","name":"isProtocolETHClaimed","type":"bool"},{"internalType":"uint256","name":"ticketCount","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"components":[{"internalType":"uint256","name":"lottoETHPercentage","type":"uint256"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"internalType":"structLottoAndNFTCeremony.Percentages","name":"percentages","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceremonyCount","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFTCreatorETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimProtocolETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"claimSlashedETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"commiter","type":"address"},{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"commitmentDeadline","type":"uint256"},{"internalType":"uint256","name":"revealDeadline","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"name":"createCeremony","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"getRandomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"enumLottoAndNFTCeremony.WinnerType","name":"winnerType","type":"uint8"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomnessCeremony","outputs":[{"internalType":"contractRandomnessCeremony","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"},{"internalType":"bytes32","name":"secretValue","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"ticketOwner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`);
		  let contract = new web3.eth.Contract(abi, contractAddress)
		  // Prepare contract params
		  var secretCommit = web3.utils.asciiToHex(this.commitSecret)
		  secretCommit = secretCommit.slice(0, 2) + "0".repeat(64-secretCommit.length) + secretCommit.slice(2)
		  var hashedValue = web3.utils.soliditySha3({ type: 'bytes32', value: secretCommit})
		  var ceremony = await contract.methods.ceremonies(this.commitCeremonyId).call()
		  var ticketPrice = ceremony[6]
		  var stakeAmount = ceremony[7]
		  var valueSent = parseInt(ticketPrice) + parseInt(stakeAmount)
		  // Send tx
		  console.log(secretCommit)
		  console.log(accounts[0], this.commitCeremonyId, hashedValue)
		  contract.methods.commit(accounts[0], this.commitCeremonyId, hashedValue)
		  	.send({ from: accounts[0], gas: 0, value: valueSent, gasLimit:500000, gasPrice:600000000 })
	  },
		async onReveal() {
		  // Init stuff (TODO: move this to state)
		  let web3 = new Web3(window.ethereum);
		  let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
		  let contractAddress = '0xa5e742b4aCCD558F2D17555E4387099f6D4261cC';
		  let abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"randomnessCeremonyAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"ceremonies","outputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bool","name":"isNFTClaimed","type":"bool"},{"internalType":"bool","name":"isETHClaimed","type":"bool"},{"internalType":"bool","name":"isNFTCreatorETHClaimed","type":"bool"},{"internalType":"bool","name":"isProtocolETHClaimed","type":"bool"},{"internalType":"uint256","name":"ticketCount","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"components":[{"internalType":"uint256","name":"lottoETHPercentage","type":"uint256"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"internalType":"structLottoAndNFTCeremony.Percentages","name":"percentages","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceremonyCount","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimNFTCreatorETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"claimProtocolETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"randomnessCeremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"claimSlashedETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"commiter","type":"address"},{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"commitmentDeadline","type":"uint256"},{"internalType":"uint256","name":"revealDeadline","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"address","name":"nftCreatorAddress","type":"address"},{"internalType":"address","name":"protocolAddress","type":"address"},{"internalType":"uint256","name":"nftCreatorETHPercentage","type":"uint256"},{"internalType":"uint256","name":"protocolETHPercentage","type":"uint256"}],"name":"createCeremony","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"}],"name":"getRandomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"enumLottoAndNFTCeremony.WinnerType","name":"winnerType","type":"uint8"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomnessCeremony","outputs":[{"internalType":"contractRandomnessCeremony","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"bytes32","name":"hashedValue","type":"bytes32"},{"internalType":"bytes32","name":"secretValue","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ceremonyId","type":"uint256"},{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"ticketOwner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`);
		  let contract = new web3.eth.Contract(abi, contractAddress)
		  // Prepare contract params
		  var secretReveal = web3.utils.asciiToHex(this.revealSecret)
		  // TODO: WTF is this conversion
		  var secretRevealContractParam = secretReveal.slice(0, 2) + "0".repeat(64-secretReveal.length+2) + secretReveal.slice(2)
		  var secretRevealHashParam = secretReveal.slice(0, 2) + "0".repeat(64-secretReveal.length) + secretReveal.slice(2)
		  var hashedValue = web3.utils.soliditySha3({ type: 'bytes32', value: secretRevealHashParam})
		  console.log(this.revealCeremonyId, hashedValue, secretRevealContractParam)
		  // Send tx
		  contract.methods.reveal(this.revealCeremonyId, hashedValue, secretRevealContractParam)
		  	.send({ from: accounts[0], gas: 0, value: 0, gasLimit:30000, gasLimit:500000, gasPrice:600000000 })
	  }
  },
};
</script>

<style lang="scss">
.tooltip {
	display: inline;
	position: relative;
	z-index: 999;
    left: 16px;
}

/* Gap filler */

.tooltip-item::after {
	content: '';
	position: absolute;
	width: 360px;
	height: 20px;
	bottom: 100%;
	left: 50%;
	pointer-events: none;
	transform: translateX(-50%);
}

.tooltip:hover .tooltip-item::after {
	pointer-events: auto;
}

/* Tooltip */

.tooltip-content {
	position: absolute;
	z-index: 9999;
	width: 360px;
	left: 50%;
	margin: 0 0 20px -180px;
	bottom: 100%;
	text-align: left;
	font-size: 0.765em;
	line-height: 1.4;
	box-shadow: -5px -5px 15px rgba(48,54,61,0.2);
	background: #2a3035;
	opacity: 0;
	cursor: default;
	pointer-events: none;
}

.tooltip-effect .tooltip-content {
	transform: translate3d(0,-10px,0);
	transition: opacity 0.3s, transform 0.3s;
}

.tooltip.hover .tooltip-content {
	pointer-events: auto;
	opacity: 1;
	transform: translate3d(0,0,0) rotate3d(0,0,0,0);
}
/* Arrow */

.tooltip-content::after {
	content: '';
	top: 100%;
	left: 50%;
	border: solid transparent;
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: transparent;
	border-top-color: #2a3035;
	border-width: 10px;
	margin-left: -10px;
}

/* Tooltip content*/

.tooltip-content img {
	position: relative;
	max-width: 300px;
	display: block;
	float: left;
	margin-right: 1em;
}

.tooltip-text {
	line-height: 1.35;
	display: block;
	padding: 1.31em 1.21em 1.21em 0;
	color: #fff;
    font-family: Lato;
}

.tooltip-text a {
	font-weight: bold;
    color: #fff;
}
</style>