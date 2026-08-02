import { getCloudflareContext } from '@opennextjs/cloudflare'
import { KVNamespace } from '@cloudflare/workers-types'

type TokenStore = { ONEDRIVE_CF_INDEX_KV: KVNamespace }

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const { ONEDRIVE_CF_INDEX_KV } = getCloudflareContext().env as TokenStore

  const accessToken = await ONEDRIVE_CF_INDEX_KV.get('access_token')
  const refreshToken = await ONEDRIVE_CF_INDEX_KV.get('refresh_token')

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {
  const { ONEDRIVE_CF_INDEX_KV } = getCloudflareContext().env as TokenStore

  await ONEDRIVE_CF_INDEX_KV.put('access_token', accessToken, { expirationTtl: accessTokenExpiry })
  await ONEDRIVE_CF_INDEX_KV.put('refresh_token', refreshToken)
}
