<template>
  <div class="background">
      <div class="title">
          <h1>{{ title }}</h1>
      </div>
      <div v-if="!isMMO" class="full" :class="`step-${step}`">
          <rpg-window 
        width="350px" 
        position="top" 
        class="top" 
        >
          <p>{{ walletText }}</p>
        </rpg-window>

          <rpg-window 
        width="200px" 
        position="bottom-middle" 
        class="margin-bottom" 
        >
          <rpg-choice :choices="menuChoice" @selected="selected"></rpg-choice>
        </rpg-window>
    </div>
    <rpg-login v-else class="margin-bottom"></rpg-login>
  </div>
</template>

<script lang="ts">
import { Control } from '@rpgjs/client'
import Web3 from 'web3'
import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider
    }
}

// @ts-ignore
const isMMORPG = import.meta.env.VITE_RPG_TYPE == 'mmorpg'

const name = 'rpg-title-screen'

export default {
    name,
    inject: ['rpgEngine', 'rpgGui', 'rpgGuiInteraction', 'rpgKeypress', 'rpgSound'],
    data() {
        return {
            menu: [
                { text:  'Connect Wallet', value: 'connect', visible: false },
                { text: 'Start Game', value: 'start', visible: true }
            ],
            step: 'title',
            title: 'Web3 MMO',
            connected: false,
            walletText: 'Please connect your wallet.',
            isMMO: false // Add this line
        }
    },
    mounted() {
        const { screenTitle } = this.rpgEngine.globalConfig
        if (screenTitle) {
            this.title = screenTitle.title
            if (screenTitle.music) {
                this.rpgSound.get(screenTitle.music).play()
            }
        }
        this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            if (control.actionName == Control.Back) {
                this.step = 'title'
            }
        })
    },
    unmounted() {
        this.obsKeyPress.unsubscribe()
    },
    methods: {
        
        selected(visibleIndex) {
            var selectedValue = null
            var arrayIndex = 0
            for(var i=0;i<this.menu.length;i++)
            {
                if(visibleIndex == arrayIndex)
                    selectedValue = this.menu[i].value
                if(this.menu[i].visible == true)
                    arrayIndex+=1
            }
            if (!selectedValue) return;
            switch (selectedValue) {
                case 'connect':
                    if (window.ethereum) { // first we check if metamask is installed
                        window.ethereum.request({ method: 'eth_requestAccounts' })
                        .then((accounts) => {
                            // this.walletText = "Welcome " + accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4);
                            this.walletText = "Welcome " + (accounts && accounts[0]?.slice(0, 6) + "..." + accounts[0]?.slice(-4));
                            this.connected = true;
                        });
                    }
                    this.step = 'connected'
                    break
                case 'start':
                    this.rpgGuiInteraction('rpg-title-screen', 'start-game')
                    break
            }
        }
    },
    computed: {
        menuChoice() {
            return this.menu.filter(menu => {
                if (menu.value == 'connect' && this.step != 'title') {
                    menu.visible = false
                    return false
                }
                else if (menu.value == 'start' && this.step != 'connected') {
                    menu.visible = false
                    return false
                }
                menu.visible = true
                return true
            })
        }
    }
}
</script>

<style scoped lang="scss">
$title-screen-font-size: 40px !default;
$title-screen-font-color: white !default;
$title-screen-font-border-color: black !default;
$title-screen-background: url('./assets/default.png') !default;

.title {
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 50px;
    font-family: $window-font-family;
    font-size: $title-screen-font-size;
    & h1 {
        color: white;
        text-shadow: 
            -1px -1px 0 $title-screen-font-border-color, 
            1px -1px 0 $title-screen-font-border-color, 
            -1px 1px 0 $title-screen-font-border-color, 
            1px 1px 0 $title-screen-font-border-color;
    }
}

.background {
    position: absolute;
    background: $title-screen-background;
    width: 100%;
    height: 100%;
    display: flex;
    background-size: cover;
}

.margin-bottom {
    margin-bottom: 50px;
}

.full {
    width: 100%;
}

.step-title {
    display: flex;
}

.step-connected {
    display: flex;
}
</style>