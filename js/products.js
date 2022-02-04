const products = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "wtka",
            products: [],
            temp: {},
        }
    }, 
    methods: {
        checkLogin() {            
            axios.post(`${this.url}/api/user/check`)
                .then(() => {                    
                    this.getProducts();
                })
                .catch((err) => {                    
                    alert(err.data.message);
                    window.location = 'index.html';
                });
        },
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;                    
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        showProducts(item) {
            this.temp = item;
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');        
        // 在全域預設 headers 設定預設值
        axios.defaults.headers.common.Authorization = token;
        this.checkLogin();
    }
};
Vue.createApp(products).mount('#app2');

