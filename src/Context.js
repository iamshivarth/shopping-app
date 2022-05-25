import React, { useState, useEffect, useReducer, createContext } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  banners: [],
  categories: [],
  products: [],
  filteredProducts: [],
  productsInCart: [],
};

// Reducer updates the state on the basis of type of action
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "banners":
      return { ...state, banners: payload };
    case "categories":
      return { ...state, categories: payload };
    case "products":
      return { ...state, products: payload };
    case "filteredProducts":
      return { ...state, filteredProducts: payload };
    default:
      throw new Error();
  }
}

const addCartProduct = (
  cartProducts,
  productToAdd,
  totalProductsInCart,
  setTotalProductsInCart
) => {
  setTotalProductsInCart(totalProductsInCart + 1);
  const existingCartProduct = cartProducts.find(
    (cartProduct) => cartProduct.id === productToAdd.id
  );

  if (existingCartProduct) {
    return cartProducts.map((cartProduct) =>
      cartProduct.id === productToAdd.id
        ? { ...cartProduct, qty: cartProduct.qty + 1 }
        : cartProduct
    );
  }

  return [...cartProducts, { ...productToAdd, qty: 1 }];
};

const removeCartProduct = (
  cartProducts,
  productToRemove,
  totalProductsInCart,
  setTotalProductsInCart
) => {
  setTotalProductsInCart(totalProductsInCart - 1);
  const singleQtyProduct = cartProducts.find(
    (cartProduct) =>
      cartProduct.id === productToRemove.id && productToRemove.qty === 1
  );

  if (singleQtyProduct) {
    return cartProducts.filter(
      (cartProduct) => cartProduct.id !== productToRemove.id
    );
  }

  return cartProducts.map((cartProduct) => {
    return cartProduct.id === productToRemove.id
      ? { ...cartProduct, qty: cartProduct.qty - 1 }
      : cartProduct;
  });
};

// To use information from below provider, we will import Context.
export const Context = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { banners, categories, products, filteredProducts } = state;

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex = /[0-9a-zA-Z]{6,}/;

  const [cartProducts, setCartProducts] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);

  const [initialCategories, setInitialCategories] = useState([]);

  const initialSignupData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialLoginData = {
    email: "",
    password: "",
  };

  const [signupData, setSignupData] = useState(initialSignupData);

  const [loginData, setLoginData] = useState(initialLoginData);

  const [signupErrData, setSignupErrData] = useState({});
  const [loginErrData, setLoginErrData] = useState({});

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [isSignUpSubmitted, setIsSignUpSubmitted] = useState(false);
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

  useEffect(() => {
    fetchBanners();
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/addToCart", {
      method: "POST",
      body: JSON.stringify(cartProducts),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //if (res.length > 0) setTotalProductsInCart(totalProductsInCart + 1);
      })
      .catch((err) => console.log(err));
  }, [cartProducts]);

  useEffect(() => {
    if (Object.keys(signupErrData).length === 0 && isSignUpSubmitted) {
      setRegisteredUsers([...registeredUsers, signupData]);
      setSignupData(initialSignupData);

      navigate("/");
    }
  }, [signupErrData]);

  useEffect(() => {
    if (Object.keys(loginErrData).length === 0 && isLoginSubmitted) {
      registeredUsers.filter(
        (regUser) =>
          regUser.email === loginData.email &&
          regUser.password === loginData.password &&
          setLoggedInUser(regUser)
      );
      setLoginData(initialLoginData);

      navigate("/");
    }
  }, [loginErrData]);

  const fetchBanners = async () => {
    const res = await fetch("http://localhost:3000/banners");
    const data = await res.json();
    dispatch({ type: "banners", payload: data });
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories");
    let data = await res.json();
    let data2 = data.map((ctg) =>
      ctg.enabled === true ? { ...ctg, enabled: false } : ctg
    );
    setInitialCategories(data2);
    dispatch({ type: "categories", payload: data2 });
  };

  const fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())

      //   .then((res) => setProducts(res))
      .then((res) => dispatch({ type: "products", payload: res }))
      .catch((err) => console.error(err));
  };

  const handleCategoryClick = (category, page) => {
    let categoriesOnClick;
    categoriesOnClick = categories.map((ctg) => {
      return ctg === category
        ? { ...ctg, enabled: page === "PLP" ? !ctg.enabled : true }
        : { ...ctg, enabled: false };
    });

    dispatch({ type: "categories", payload: categoriesOnClick });
    let tempProducts = state.products.filter(
      (product) => product.category === category.id
    );

    dispatch({ type: "filteredProducts", payload: tempProducts });
  };

  const addProductToCart = (productToAdd) => {
    setCartProducts(
      addCartProduct(
        cartProducts,
        productToAdd,
        totalProductsInCart,
        setTotalProductsInCart
      )
    );
  };

  const removeProductFromCart = (productToRemove) => {
    setCartProducts(
      removeCartProduct(
        cartProducts,
        productToRemove,
        totalProductsInCart,
        setTotalProductsInCart
      )
    );
  };

  const handleProductsClick = () => {
    dispatch({ type: "categories", payload: initialCategories });
  };

  const handleFormSubmit = (e, feature) => {
    e.preventDefault();
    if (feature === "Signup") {
      setSignupErrData(handleValidation(signupData, feature));
      setIsSignUpSubmitted(true);
    } else {
      setLoginErrData(handleValidation(loginData, feature));
      setIsLoginSubmitted(true);
    }
  };

  const handleInputChange = (e, feature) => {
    const { id, value } = e.target;
    if (feature === "Signup") {
      setSignupData({
        ...signupData,
        [id]: value,
      });
    } else {
      setLoginData({ ...loginData, [id]: value });
    }
  };

  const handleValidation = (data, feature) => {
    const emptyError = "Cannot be empty";
    const errors = {};

    if (feature === "Signup") {
      if (!data.firstName) {
        errors.firstName = emptyError;
      }

      if (!data.lastName) {
        errors.lastName = emptyError;
      }

      if (!data.email) {
        errors.email = emptyError;
      } else if (!emailRegex.test(data.email)) {
        errors.email = "Email Address is invalid";
      }

      if (!data.password) {
        errors.password = emptyError;
      } else if (!passwordRegex.test(data.password)) {
        errors.password = "Password does not meet the requirements";
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = emptyError;
      } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Password should be same";
      }
    } else {
      if (!data.email) {
        errors.email = emptyError;
      } else if (!emailRegex.test(data.email)) {
        errors.email = "Email Address is invalid";
      }

      if (!data.password) {
        errors.password = emptyError;
      } else if (!passwordRegex.test(data.password)) {
        errors.password = "Password does not meet the requirements";
      }
    }

    return errors;
  };
  /* 
  registeredUsers.length > 0 && console.log(registeredUsers);
  console.log(loginData);
  Object.keys(loginErrData).length > 0 && console.log(loginErrData); */
  // console.log(initialCategories);

  return (
    <Context.Provider
      value={{
        banners,
        initialCategories,
        categories,
        products,
        handleCategoryClick,
        filteredProducts,
        addProductToCart,
        removeProductFromCart,
        cartProducts,
        cartOpen,
        setCartOpen,
        totalProductsInCart,
        handleFormSubmit,
        loginData,
        loginErrData,
        loggedInUser,
        handleInputChange,
        signupData,
        signupErrData,
        handleProductsClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};
