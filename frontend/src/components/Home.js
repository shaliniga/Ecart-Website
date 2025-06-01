import { Fragment } from "react/jsx-runtime";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../actions/productsAction";
import Product from "./product/Product";

export default function Home() {
    const dispatch = useDispatch();

    const {products} = useSelector((state) => state.productsState)

    useEffect(()=>{
        dispatch(getProducts)
    },[])

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                {products && products.map(product => (
                   <Product product={product}/>
                ))}
                    
                </div>
            </section>
        </Fragment>
    )
}