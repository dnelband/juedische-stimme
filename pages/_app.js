import 'styles/globals.css'

import Layout from 'components/Layout';
import AdminLayout from 'components/admin/Layout';
import { store } from 'store/store';
import { Provider } from 'react-redux';

const layouts = {
  "main":Layout,
  "admin":AdminLayout
}

function MyApp({ Component, pageProps }) {
    const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
    return (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    );
}

export default MyApp
