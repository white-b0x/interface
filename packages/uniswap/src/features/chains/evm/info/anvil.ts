import { SwapConfigKey } from '@universe/gating'
import { ETH_LOGO, ETHEREUM_LOGO } from 'ui/src/assets'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { buildUSDC } from 'uniswap/src/features/tokens/stablecoin'

// Local Anvil deployment - no stablecoins deployed yet
const tokens = buildChainTokens({
  stables: {
    // Placeholder - deploy stablecoins to Anvil if needed
    USDC: buildUSDC('0x0000000000000000000000000000000000000000', UniverseChainId.Anvil),
  },
})

// Anvil local RPC URL
const ANVIL_RPC_URL = 'http://127.0.0.1:8545'

export const ANVIL_CHAIN_INFO = {
  id: UniverseChainId.Anvil,
  name: 'Anvil Local',
  testnet: true,
  platform: Platform.EVM,
  assetRepoNetworkName: undefined,
  backendChain: {
    // Anvil is local-only, no backend support
    chain: undefined as never,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://book.getfoundry.sh/anvil/',
  elementName: ElementName.ChainEthereum, // Reuse Ethereum element
  explorer: {
    name: 'Local',
    url: 'http://127.0.0.1:8545/' as const,
  },
  interfaceName: 'anvil',
  label: 'Anvil Local',
  logo: ETHEREUM_LOGO,
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ETH_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  pendingTransactionsRetryOptions: undefined,
  rpcUrls: {
    [RPCType.Default]: { http: [ANVIL_RPC_URL] },
    [RPCType.Public]: { http: [ANVIL_RPC_URL] },
    [RPCType.Private]: { http: [ANVIL_RPC_URL] },
    [RPCType.Interface]: { http: [ANVIL_RPC_URL] },
    [RPCType.Fallback]: { http: [ANVIL_RPC_URL] },
  },
  urlParam: 'anvil',
  statusPage: undefined,
  tokens,
  supportsV4: true,
  supportsNFTs: false,
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    // Deployed WETH9 address on local Anvil
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  },
  gasConfig: {
    send: {
      configKey: SwapConfigKey.EthSendMinGasAmount,
      default: 20, // .002 ETH
    },
    swap: {
      configKey: SwapConfigKey.EthSwapMinGasAmount,
      default: 150, // .015 ETH
    },
  },
  tradingApiPollingIntervalMs: 500,
} as const satisfies UniverseChainInfo
