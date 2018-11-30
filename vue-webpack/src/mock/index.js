import axios from '@libs/api_request';


// 获取游戏列表
export const getGames = ({ name, orderby_field, orderby_type, page_number, per_page }) => {
    const data = {
        name,
        orderby_field,
        orderby_type
    };
    return axios.request({
        url: `/api/cms/plat/v1/programs/${getCurrentProgramId()}/menus/${getCurrentMenuId()}/users/${getUserId()}/games?page_number=${page_number}&per_page=${per_page}`,
        method: 'get',
        params: data
    });
};


