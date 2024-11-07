import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserClient } from '@/components/admin/tables/user-tables/client';
import { getAllUsers } from '@/data/user';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin' },
  { title: 'User', link: '/admin/users' }
];
export default async function page() {
    const users= await getAllUsers();
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 w-full">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}