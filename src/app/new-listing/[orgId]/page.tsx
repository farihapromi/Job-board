import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { TextArea, TextField, Theme, RadioGroup } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

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

  return (
    <Theme>
      <form action='' className='container mt-6 flex flex-col gap-2'>
        <TextField.Root placeholder='Job Title' />

        <div className='flex gap-4'></div>
        <div>
          Remote?
          <RadioGroup.Root defaultValue='1' name='example'>
            <RadioGroup.Item value='1'>On-Site</RadioGroup.Item>
            <RadioGroup.Item value='2'>Hybrid-Remote</RadioGroup.Item>
            <RadioGroup.Item value='3'>Fully Remote</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
        <TextArea placeholder='Job Description' resize='vertical' />
      </form>
    </Theme>
  );
}
