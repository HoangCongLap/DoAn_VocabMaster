import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import withAuthCheck from '../auth/withAuthCheck';
import Login from '../screens/Login/Login';
import { Layout } from '../Layout';
import { Layout2 } from '../Layout2';
// import { AllUserGetter } from '../GetAllUser/AllUserGetter';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const VocabsScreen = lazy(() => import('~/components/screens/Vocabs'));

const Page404Screen = lazy(() => import('~/components/screens/404'));

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/vocabs',
      element: <Layout2 />,
      children: [
        {
          index: true,
          element: <VocabsScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },

    // {
    //   path: '/getalluser',
    //   element: <Layout2 />,
    //   children: [
    //     {
    //       index: true,
    //       element: <AllUserGetter />,
    //     },
    //     {
    //       path: '*',
    //       element: <Page404Screen />,
    //     },
    //   ],
    // },

    {
      path: '/login',
      // element: <Login />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        // {
        //   path: '*',
        //   element: <Page404Screen />,
        // },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
const AuthenticatedRouter = withAuthCheck(InnerRouter);

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthenticatedRouter />
    </BrowserRouter>
  );
};
