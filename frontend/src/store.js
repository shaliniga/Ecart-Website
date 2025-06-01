import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';


const reducer= combineReducers({
    productsState : productsReducer,
    productState: productReducer ,
    cartState : cartReducer
})

const store=configureStore({
    reducer,
    //middleware : [thunk]
})

export default store;