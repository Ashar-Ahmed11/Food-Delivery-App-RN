
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import AppContext from "./appContext";
const AppState = (props) => {
    const data = "hello ashar"
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const router = useRouter()
    const login = async (credentials) => {

        console.log(credentials);

        const response = await fetch("https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/auth/login", {
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
        const response = await fetch("https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/auth/getUser", {
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
        const checkAuthToken = async () => {
            const authToken = await AsyncStorage.getItem("authToken")
            if (authToken) {
                setIsLoggedIn(true)
                getUser()
            }
            else {

                setUserDetails(null)
            }
        }
        checkAuthToken()
    }, [isLoggedIn])



    // console.log('this is loggedin',isLoggedIn);
    const [productLoader, setproductLoader] = useState(false)



    const getProducts = async () => {

        console.log("it is fired");

        setproductLoader(true)
        const response = await fetch("https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/product/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });
        console.log('This is reponse:', response);

        const data = await response.json()
        console.log(data);
        setproductLoader(false)
        setProducts(data)

        // console.log(data);

    }

    const getProduct = async (productID) => {
        //    localhost:8000/api/product/product/


        const response = await fetch(`https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/product/product/${productID}`, {
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
    const [categories, setCategories] = useState([])
    const [fabLoader, setfabLoader] = useState(false)
    const getCategories = async () => {
        //    localhost:8000/api/product/product/

        setfabLoader(true)
        const response = await fetch(`https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/category/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });
        const data = await response.json()

        setCategories(data)
        setfabLoader(false)

        // console.log(data); 

    }


    const [categoryProducts, setCategoryProducts] = useState([])
    const getCategoryProduct = async (categoryID) => {
        //    localhost:8000/api/product/product/


        const response = await fetch(`https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/product/products/${categoryID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });
        const data = await response.json()
        setCategoryProducts(data)

        // console.log(data); 

    }
    useEffect(() => {
        getCategories()
    }, [])


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



    const addToFavourite = async (productID) => {
        console.log("Favourite function is fired");


        const authToken = await AsyncStorage.getItem("authToken")
        if (authToken) {
            const response = await fetch(`https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/product/addToFavourite/${productID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": authToken
                },
                // body: JSON.stringify({
                //     email: credentials.email,
                //     password: credentials.password
                // }),

            });
            const data = await response.json()
            setUserDetails(data)
            Toast.success("Product Added To Favourite")


        }
        else {
            router.navigate("signin")
        }
        // console.log(data);

    }
    const removeFromFavourite = async (productID) => {
        console.log("Favourite function is fired");


        const authToken = await AsyncStorage.getItem("authToken")
        if (authToken) {
            const response = await fetch(`https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/product/removeFromFavourite/${productID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": authToken
                },
                // body: JSON.stringify({
                //     email: credentials.email,
                //     password: credentials.password
                // }),

            });
            const data = await response.json()
            setUserDetails(data)
            Toast.success("Product Removed From Favourite")


        }
        else {
            router.navigate("signin")
        }
        // console.log(data);

    }

    const createOrder = async () => {
        const location = await AsyncStorage.getItem("userLocation")
        if (location) {


            const response = await fetch("https://fooddeliveryesserver-dot-arched-gear-433017-u9.de.r.appspot.com/api/order/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        recipient: userDetails._id,
                        total: subTotal + 150,
                        products:

                            Array.from(cart, (({ prod, quantity }) => { return { product: prod._id, quantity } }))
                        // [
                        //     {
                        //         product: "688290d3a9ec36058b81c7f7",
                        //         quantity: 10
                        //     },
                        //     {
                        //         product: "6898e083bbca24a9428a2d72",
                        //         quantity: 2
                        //     }
                        // ]
                        ,
                        status: "Pending",
                        address: location
                    }
                ),
                // …
            });
            const data = await response.json()

            let {_id:orderID} = data


            if (data.errors) {
                data.errors.map((e) => { Toast.error(e.msg) })
            }
            else {
                await getUser()
                Toast.success("Order placed successfully")
                router.navigate(`/order/${orderID}`)
            }
        }
        else {
             Toast.error("Please select delivery address")
        }



        // console.log(data);

    }



    return (
        <AppContext.Provider value={{ fabLoader,createOrder,setProduct, setCategoryProducts, categoryProducts, getCategoryProduct, categories, removeFromFavourite, addToFavourite, subTotal, setsubTotal, cart, increaseQtyInCart, decreaseQtyInCart, removeFromCart, addToCart, productLoader, profileLoader, getUser, userDetails, isLoggedIn, setIsLoggedIn, login, getProducts, products, getProduct, product }}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppState