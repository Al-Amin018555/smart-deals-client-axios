import { use } from "react";
import Product from "../Product/Product";

const RecentProducts = ({ recentProductsPromise }) => {
    const products = use(recentProductsPromise);
    return (
        <div className="mt-14" >
            <h2 className="font-bold text-center text-4xl mb-10">Recent <span className="text-gradient-primary">Products</span> </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default RecentProducts;