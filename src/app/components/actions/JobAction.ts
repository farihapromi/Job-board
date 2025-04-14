'use server';

import {Job} from "@/models/Job";
import mongoose from "mongoose";
import {revalidatePath} from "next/cache";

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const {id, ...jobData} = Object.fromEntries(formData);
  const jobDoc = (id)
    ? await Job.findByIdAndUpdate(id, jobData)
    : await Job.create( jobData );
  if ('orgId' in jobData) {
    revalidatePath('/jobs/'+jobData?.orgId);
  }
  return JSON.parse( JSON.stringify(jobDoc) );
}