import { request } from '@/utils/request.js'

/**
 * 节点管理 API JS
 */

export default {

  /**
   * 获取节点管理分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'adm/node/index',
      method: 'get',
      params
    })
  },

  /**
   * 更新节点管理数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'adm/node/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 将节点管理删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'adm/node/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改节点管理数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'adm/node/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 从回收站获取节点管理数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'adm/node/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复节点管理数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'adm/node/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除节点管理
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'adm/node/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 读取节点管理
   * @returns
   */
  read (id) {
    return request({
      url: 'adm/node/read/' + id,
      method: 'get'
    })
  },

  /**
   * 修改节点管理数值数据，自增自减
   * @returns
   */
  numberOperation (data = {}) {
    return request({
      url: 'adm/node/numberOperation',
      method: 'put',
      data
    })
  },

  /**
   * 更改节点enable
   * @returns
   */
  nodeEnable (id, data = {}) {
    return request({
      url: 'adm/node/enable/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 更改节点block
   * @returns
   */
  nodeBlock (id, data = {}) {
    return request({
      url: 'adm/node/block/' + id,
      method: 'put',
      data
    })
  },


}