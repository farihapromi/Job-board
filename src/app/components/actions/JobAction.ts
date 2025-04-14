'use server'

import { JobModel } from "@/models/Job"
import mongoose from "mongoose"

 export  async function saveJobAction(data:FormData){
    mongoose.connect(process.env.MONGO_URI as string)
   const JobDoc= await JobModel.create(Object.fromEntries(data))
   return JSON.parse(JSON.stringify(JobDoc))
}