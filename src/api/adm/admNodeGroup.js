import { request } from '@/utils/request.js'

/**
 * 节点分组 API JS
 */

export default {

  /**
   * 获取节点分组分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'adm/nodeGroup/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加节点分组
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'adm/nodeGroup/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新节点分组数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'adm/nodeGroup/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取节点分组
   * @returns
   */
  read (id) {
    return request({
      url: 'adm/nodeGroup/read/' + id,
      method: 'get'
    })
  },

  /**
   * 将节点分组删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'adm/nodeGroup/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取节点分组数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'adm/nodeGroup/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复节点分组数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'adm/nodeGroup/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除节点分组
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'adm/nodeGroup/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改节点分组数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'adm/nodeGroup/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 修改节点分组数值数据，自增自减
   * @returns
   */
  numberOperation (data = {}) {
    return request({
      url: 'adm/nodeGroup/numberOperation',
      method: 'put',
      data
    })
  },


}