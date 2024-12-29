import { request } from '@/utils/request.js'

/**
 * Request Statistics
 */

export default {

  /**
   * Query request statistics
   * @returns
   */
  query (params = {}) {
    return request({
      url: 'adm/requestStatistics/query',
      method: 'get',
      params
    })
  },
}