import { backendFetchUrl } from "./api";


async function addtocart(productData){
    await backendFetchUrl("/products/addToCart", {
        method: 'GET',
        body: JSON.stringify(productData)
    });
}