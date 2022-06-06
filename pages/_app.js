import 'styles/globals.css'
import { Provider } from "context";
import Layout from 'components/Layout';
import AdminLayout from 'components/admin/Layout';

const layouts = {
  "main":Layout,
  "admin":AdminLayout
}

function MyApp({ Component, pageProps }) {
    const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
    return (
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
}

export default MyApp
