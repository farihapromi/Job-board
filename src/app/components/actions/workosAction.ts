'use server'
import { WorkOS } from "@workos-inc/node"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
const workos=new WorkOS(process.env.WORKOS_API_KEY)


export async function createCompany(companyName:string,userId:string){
    const org = await workos.organizations.createOrganization({
        name: companyName
      })
      // Creates a new organization in WorkOS using the name from the submitted form.
      // data.get('newCompany') retrieves the organization name from the form input.
    
      // Now that the organization is created, we create a membership linking the user to this new org.
      await workos.userManagement.createOrganizationMembership({
        userId,                    // The ID of the user to be added
        organizationId: org.id,    // The ID of the newly created organization
        roleSlug: 'admin'          // Assigning the role of 'admin' to the user within this organization
      });
      //refresh the cach on this page
      revalidatePath('/new-listing')
      redirect('/new-listing')
    }
