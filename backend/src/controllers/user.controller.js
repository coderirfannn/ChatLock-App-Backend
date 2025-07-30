import asyncHandler from "express-async-handler"
import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express"

export const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" })

    res.status(200).json({ user })
})


export const updateProfile = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await User.findByIdAndUpdate({ clerkId: userId }, req.body, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" })

    res.status(200).json({ user })
})


export const syncUser = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const existingUser = await User.findOne({ clerkId: userId })
    if (existingUser) return res.status(200).json({ error: "User already exist" })

    //create new user from clerk data

    const clerkuser = await clerkClient.users.getUser(userId);

    const userData = {
        clerkId:userId,
        email:clerkuser.emailAddresses[0].emailAddress,
        firstName:clerkuser.firstName || "",
        lastName:clerkuser.lastName || "",
        username:clerkuser.emailAddresses[0].emailAddress.split("@")[0],
        profilePicture:clerkuser.imageUrl || "",
    };

    const user = await User.create(userData);

    res.status(200).json({ user ,message:"User Created Successfully" })




})

