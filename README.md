# 🌙 Welcome to Lunar Wallet

## Summary
##### [1. What is Lunar Wallet?](#1-what-is-lunar-wallet)
##### [2. How is it different from other wallets?](#2-how-is-it-different-from-other-wallets-1)
##### [3. How to use it?](#3-how-to-see-that-metamask-is-leaking-ip-address)
##### [4. How to use it?](#4-how-to-use-it-1)
##### [4. What's next?](#4-whats-next-1)

## 1. What is Lunar Wallet?
Lunar Wallet is the first non-custodial **privacy wallet** created on the Ethereum blockchain, allowing to **guarantee the anonymity of its user** thanks to a **built-in TOR integration**. This integration enables user's personal information, such as **IP addresses** to be completely isolated from stakeholders with whom the wallet directly communicates (RPCs, Etherscan, Coingecko...).

This is the first wallet enabling that, as other wallets claiming privacy are using this word for marketing purposes mainly, such as BlockWallet which has access to its users' IPs through the use of their own servers as a proxy.
Wasabi and Samourai allow you to have an offchain privacy, using TOR, but you have to manually install TOR Network and run a node in order to profit from this.
With Lunar Wallet, no need to install TOR, just install Lunar extension, et voilà.

## 2. How is it different from other wallets?

#### Metamask and other wallets
Your IP is leaked with your wallet address. Both Metamask servers and third parties servers (RPCs, Etherscan, Coingecko..) can then use it to link all of your wallet address together, which can then be used to track you, even if you are using on-chain privacy tools such as Aztec Network or Tornado Cash.

#### Lunar Wallet
You don't have to trust our wallet, the third parties just can't see your IP address, as they only receive the TOR's IP address.

<img width="762" alt="Screenshot 2022-11-12 at 11 27 37" src="https://user-images.githubusercontent.com/117318058/201469966-191d2c65-c680-4d52-a9af-93203bf8c1b5.png">

## 3. How to see that Metamask is leaking IP address?
1. Add our proxy to your metamask networks
Network name: ETHBrno - Proxy
New RPC URL : lien du proxy
Chain ID: 1
Currency Symbol: ETH

Then click on `Save`.

2. Go there https://ethbrno-logs.vercel.app/ and you can see some Metamask requests on the right side with your IP address.

## 4. How to use it?
#### A. Install the wallet
1. Clone the repo
2. Install and build
- Go into the lunar-wallet folder
- Enter `npm install`
- Enter `npm run build`
3. Go on Chrome
- Enable `Developer mode`,
- Click on `Manage Extensions`,
- `Load unpacked`, go into the `lunar-wallet/chrome`,
- Click on `select`.

#### B. Use the wallet 
1. Launch the extension, click on `Create wallet`.
2. Enter a name for your wallet click on `Add`.
3. Click on your wallet, copy your wallet address, fund your wallet with Goerli by clicking on the $ icon.
4. Add a recipient, a value and send some Goerli to a lucky guy.
5. Click on the TOR logo to analyse your transaction and see on the left side that the IP address is hidden (to analyse the IP, we added a proxy that give us the IP address received by the RPC/third parties, if you don't find the website with the TOR logo, here you go: https://ethbrno-logs.vercel.app/).

🎉🥳🍾 Congrats, you just used the first privacy oriented wallet on Ethereum.

## 4. What's next?
After ETHBrno, we plan to further develop Lunar Wallet by adding several features necessary for everyday use, such as the integration of on-chain privacy tools (Aztec Network), supporting other blockchains (EVM & Non-EVM) and adding a token approval manager.


Here is what Lunar Wallet features would look like on Q1 2023:


<img width="966" alt="Screenshot 2022-11-12 at 12 00 57" src="https://user-images.githubusercontent.com/117318058/201471000-ab4b3836-227d-46ff-99b8-887968624cfe.png">
