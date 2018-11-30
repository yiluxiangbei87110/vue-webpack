<template>
    <div>
        <Table :data="data" :columns="column" :loading="loading" stripe></Table>
        <Page :total="total" :page-size="per_page" :current="page_number" show-total show-elevator @on-change="handleChangePage"></Page>
    </div>
</template>
<script>
import { getTableList } from '@api/index.js'
export default {
    data() {
        return {
            loading: false,
            total: 100,
            per_page: 16,
            page_number: 1,
            originData: [],
            data: [],
            column: [{
                type: 'index',
                width: 60,
                align: 'center'
            }, {
                title: 'province',
                key: 'province'
            }, {
                title: 'county',
                key: 'county'
            }, {
                title: 'datetime',
                key: 'datetime'
            }, {
                title: 'email',
                key: 'email'
            }, {
                title: 'float',
                key: 'float',
                sortable: true
            }, {
                title: 'image',
                key: 'image',
                render: (h, params) => {
                    return h('img', {
                        attrs: {
                            src: params.row.image
                        },
                        style: {
                            width: '40px',
                            height: '40px',
                            verticalAlign: 'middle'
                        }
                    })
                }
            }, {
                title: 'csentence',
                key: 'csentence'
            }, {
                title: 'range',
                key: 'range'
            }]
        }
    },
    created() {
        // console.log(routers);
        this.apiGetTableList();
    },
    methods: {
        apiGetTableList() {
            this.loading = true;
            getTableList()
                .then(res => {
                    this.originData = res.list;
                    this.data = res.list.slice(0, this.per_page);
                    console.log(res);
                })
                .catch(e => {
                    console.error('error', e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 分页，真实数据直接改变参数提交即可。
        handleChangePage(val) {
            this.loading = true;
            const totolPage = Math.ceil(this.total / this.per_page);
            this.page_number = val;
            this.data = this.originData.slice((this.page_number - 1) * this.per_page, (this.page_number - 1) * this.per_page + this.per_page);
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }
}
</script>