import AdminEditProductPage from '../[id]/page';

export default async function Page() {
  const dummyParams = Promise.resolve({ id: 'SIN-KT-1800' });
  return <AdminEditProductPage params={dummyParams} />;
}
