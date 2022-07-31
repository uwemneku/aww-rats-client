import { LayoutDashboard } from '~/components/backtalk/LayoutDashboard';
import { GetServerSideProps, NextPage } from 'next';
import { BacktalkSurveyFormContextProvider } from '~/components/context/BacktalkSurveyForm';
import AuthCookieRequired from 'common/components/access/AuthCookieRequired';
import Login from 'common/components/access/Login';
import { hashids } from '~/utils/hash-ids';
import EditSurveyForm from '~/components/backtalk/survey/EditSurveyForm';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id: number | null = null;
  if (ctx.params?.id && typeof ctx.params.id === 'string') {
    id = Number(hashids.decode(ctx.params.id)[0]);
    console.log(id, ctx.params);
  }
  return {
    props: {
      id,
      host: ctx.req.headers.host,
    },
  };
};

const EditSurveyPage: NextPage<{ id: number }> = ({ id }) => {
  return (
    <LayoutDashboard>
      <AuthCookieRequired fallback={<Login login />}>
        <BacktalkSurveyFormContextProvider id={id}>
          <EditSurveyForm />
        </BacktalkSurveyFormContextProvider>
      </AuthCookieRequired>
    </LayoutDashboard>
  );
};

export default EditSurveyPage;
