import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgId(props: PageProps) {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return 'Login please';
  }
  const orgId = props.params.orgId;
  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
      organizationId: orgId,
    });
  // const organizationMember = organizationMemberships.data.find(
  //   (organizationMember) => organizationMember.organizationId === orgId
  // );
  const hasAccess = organizationMemberships.data.length > 0;
  if (!hasAccess) {
    return 'No Access';
  }

  return <form action=''>new job here</form>;
}
