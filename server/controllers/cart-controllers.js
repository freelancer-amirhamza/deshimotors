const Cart = require("../models/cart-model.js");
const UserModel = require("../models/user-model.js");

const addToCartItem = async(req, res)=>{
    try {
        const userId = req.userId;
        const{ productId} = req.body;
        if(!productId){
            return res.status(401).json({
                success: false,
                error: true,
                message: "Provide the product id!",
            })
        }
        const checkCart = await Cart.findOne({
            userId: userId,
            productId: productId,
        });
        if(checkCart){
            return res.status(400).json({
                success: false,
                error: true,
                message: "This item is already added to cart",
            })
        }
        const createCart = new Cart({
            quantity:1,
            userId: userId,
            productId: productId,
        })
        const newCart = await createCart.save();

        const updateUser = await UserModel.updateOne({_id: userId},
            {
                $push:{
                    shopping_cart: productId,
                }
            }
        )

        return res.status(200).json({
            success: true,
            error: false,
            message: "The Cart Added Successfully!",
            data: newCart,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
};

const getCartItems = async(req, res)=>{
    try {
        const userId = req.userId;
        const cartItems = await Cart.find({
            userId: userId,
        }).populate("productId");

        return res.status(200).json({
            success: true,
            error: false,
            message: "Cart items gotten successfully!",
            data: cartItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}


module.exports = {addToCartItem,getCartItems, }