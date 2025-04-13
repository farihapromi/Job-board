
import {  withAuth } from "@workos-inc/authkit-nextjs";
import {  WorkOS } from "@workos-inc/node";
import { createCompany } from "../components/actions/workosAction";
export default async function NewListingPage(){
    const {user}=await withAuth();
   
        async function handleCompany(data:FormData){
            'use server'
            if(user){
                await createCompany(data.get('newCompany') as string ,user.id)

            }
         
        

    }
   
    if(!user){
        return (
            <div className="container">
            {
                !user && (
                    <div>you need to be logged in to post a job </div>
                )
            }

        </div>
            
        )
       
    }
    const workos=new WorkOS(process.env.WORKOS_API_KEY);
    
   
     const organizationMemberships= await workos.userManagement.listOrganizationMemberships({
            userId:user.id,
        })

    
   
    return(
        <>
        <div className="container">
            
          
                <div>
                    <pre>
                    {JSON.stringify(organizationMemberships ,null,2)}

                    </pre>
                   
                     <h1 className="text-lg font-bold mt-6">Your Companies</h1>
                     <p className="text-gray-400 text-sm mb-2">Select a company to create job add for</p>
                     <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">
                        No Companies found assigned to your user

                     </div>
                      <h1 className="text-lg font-bold mt-6">Create a new company</h1>
                      <p className="text-gray-400 text-sm mb-2">To create a job lisitng yopu first need to registred</p>
                      {/* for making organization under user we have to pass user.id too */}
                    <form action={handleCompany} className="flex gap-2">
                      
                        <input type="text" name="newCompany" id=""
                        className="p-2 border border-gray-400 rounded-md"
                         placeholder="company name" />
                        <button  type='submit'className="flex gap-2 items-center bg-gray-200 px-4 py-4 rounded-md">
                            create company 
                            
                        </button>
                    </form>
                </div>
            
            
        </div>
        </>
    )
}