import api from '@request/index.js';
export const getTableList=()=>{
	return api.request({
		method:'get',
		url:'/mock/5b3b5c5bdae7213852e9668f/mock/tableList'
	})
}

