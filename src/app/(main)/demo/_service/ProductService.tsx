export const ProductService = {
    getProductsData() {
        return [
            {
                id: "1000",
                key: "1",
                up_key: "",
                name: "Bamboo Watch",
            },
            {
                id: "1001",
                key: "1.1",
                up_key: "1",
                name: "Black Watch",
            },
            {
                id: "1002",
                key: "1.2",
                up_key: "1",
                name: "Blue Band",
            },
            {
                id: "1003",
                key: "2",
                up_key: "",
                name: "Blue T-Shirt",
            },
            {
                id: "1004",
                key: "2.1",
                up_key: "2",
                name: "Bracelet",
            },
            {
                id: "1004",
                key: "3",
                up_key: "",
                name: "Bracelet",
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 6));
    },
};
