import './App.css';

import React from 'react';
import Layout from './components/Layout/Layout';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setAuthenticated(!!token);
  //   setLoading(false);
  // }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return <Layout/>
}

export default App;
