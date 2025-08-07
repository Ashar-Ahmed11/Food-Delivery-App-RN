
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import AppContext from "./appContext";
const AppState = (props) => {
    const data = "hello ashar"
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const login = async (credentials) => {

        console.log(credentials);

        const response = await fetch("http://192.168.18.224:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
            // …
        });
        const data = await response.json()
        if (data.errors) {
            data.errors.map((e) => { Toast.error(e.msg) })
        }
        else {
            Toast.success("Login Successful")
            await AsyncStorage.setItem("authToken", data.authToken)
            setIsLoggedIn(true)
        }
        // console.log(data);

    }
    const [userDetails, setUserDetails] = useState(null)
    const [profileLoader, setProfileLoader] = useState(false)
    const getUser = async () => {
        setProfileLoader(true)
        const authToken = await AsyncStorage.getItem("authToken")
        const response = await fetch("http://192.168.18.224:8000/api/auth/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken
            }

            // …
        });
        const data = await response.json()
        console.log(data);
        setProfileLoader(false)
        setUserDetails(data)
        // if (data.errors) {
        //     data.errors.map((e) => { Toast.error(e.msg) })
        // }
        // else {
        //     Toast.success("Login Successful")
        //     await AsyncStorage.setItem("authToken", data.authToken)
        //     setIsLoggedIn(true)
        // }
        // console.log(data);

    }
    useEffect(() => {
        if (isLoggedIn) {
            getUser()
        }
    }, [isLoggedIn])
    // console.log('this is loggedin',isLoggedIn);
    const [productLoader, setproductLoader] = useState(false)


    
    const getProducts = async () => {

        console.log("it is fired");
        
        // setproductLoader(true)
        const response = await fetch("http://192.168.18.224:8000/api/product/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });
        console.log('This is reponse:',response);
        
        const data = await response.json()
        console.log(data);
        // setproductLoader(false)
        setProducts(data)

        // console.log(data);

    }

    const getProduct = async (productID) => {
        //    localhost:8000/api/product/product/


        const response = await fetch(`http://192.168.18.224:8000/api/product/product/${productID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });
        const data = await response.json()
        console.log(data);

        setProduct(data)

        // console.log(data);

    }

    const [cart, setCart] = useState([])

    const addToCart = (product, quantity) => {

        const productExist = cart.findIndex((e) => e.prod._id == product._id)
        console.log(productExist);

        if (productExist !== -1) {
            const productIndex = cart.findIndex((e) => e.prod._id == product._id)
            cart[productIndex].quantity += quantity
        }
        else {
            const theCart = cart
            theCart.push({ prod: product, quantity })
            setCart(theCart)
        }

        Toast.success("Product Added to Cart")
        console.log(cart);

    }
    console.log(cart);

    const increaseQtyInCart = (product) => {
        const productIndex = cart.findIndex((e) => e.prod._id == product.prod._id)
        cart[productIndex].quantity += 1

        setCart([...cart])

    }

    const decreaseQtyInCart = (product) => {
        const productIndex = cart.findIndex((e) => e.prod._id == product.prod._id)
        if (cart[productIndex].quantity == 1) {
            const filteredProducts = cart.filter((e) => e.prod._id !== product.prod._id)
            setCart(filteredProducts)

        }
        else {
            cart[productIndex].quantity -= 1
            setCart([...cart])
        }
    }
    const removeFromCart = (product) => {
        const filteredProducts = cart.filter((e) => e.prod._id !== product.prod._id)
        setCart(filteredProducts)

    }
    const [subTotal, setsubTotal] = useState(0)
    // console.log(router);

    return (
        <AppContext.Provider value={{ subTotal,setsubTotal,cart, increaseQtyInCart,decreaseQtyInCart,removeFromCart,addToCart, productLoader, profileLoader, getUser, userDetails, isLoggedIn, setIsLoggedIn, login, getProducts, products, getProduct, product }}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppState