import {model,models, Schema} from 'mongoose';

import { withAuth } from '@workos-inc/authkit-nextjs';
import {
  AutoPaginatable,
  OrganizationMembership,
  User,
  WorkOS,
} from '@workos-inc/node';
import mongoose from 'mongoose';

export type Jobs = {
    _id: string;
    title: string;
    description: string;
    orgName?: string;
    remote: string;
    type: string;
    salary: number;
    country: string;
    state: string;
    city: string;
    countryId: string;
    stateId: string;
    cityId: string;
    jobIcon: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    orgId: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
  };
  

const JobSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    remote: {type: String, required: true},
    type: {type: String, required: true},
    salary: {type: Number, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String,required: true},
    countryId: {type: String, required: true},
    stateId: {type: String, required: true},
    cityId: {type: String, required: true},
    jobIcon: {type: String},
    contactPhoto: {type: String},
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail: {type: String, required: true},
    orgId: {type: String, required: true},
  }, {
    timestamps: true,
  });
  export async  function addOrgAndUserData(jobsDocs:Jobs[],user:User|null){
   
      
      await mongoose.connect(process.env.MONGO_URI as string);
      const workos = new WorkOS(process.env.WORKOS_API_KEY);
      jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
      let oms: AutoPaginatable<OrganizationMembership> | null = null;
      if (user) {
        oms = await workos.userManagement.listOrganizationMemberships({
          userId: user.id,
        });
      }
    
      for (const job of jobsDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
        if (oms && oms.data.length > 0) {
          job.isAdmin = !!oms.data.find((om) => om.organizationId === job.orgId);
        }
      }
  return jobsDocs;


   }

   export const Job=models?.Job || model('Job',JobSchema)