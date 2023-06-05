import Breadcrumb from '../components/Breadcrumb';
import TableJurys from '../components/TableJurys';
import DefaultLayout from '../layout/DefaultLayout';

const Jurys = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Jurys" />

      <div className="flex flex-col gap-10">
        <TableJurys />
      </div>
    </DefaultLayout>
  );
};

export default Jurys;
