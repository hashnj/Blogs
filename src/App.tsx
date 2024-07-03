import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Suspense, lazy } from 'react';
import { Loading } from './components/Loading';


const LazyMain = lazy(() => import('./pages/Main'));
const LazyBlog = lazy(() => import('./pages/Blog'));
const LazyBlogs = lazy(() => import('./pages/Blogs'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/' element={<LazyMain />} />
            <Route path='/blog/:id' element={<LazyBlog />} />
            <Route path='/blogs' element={<LazyBlogs />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
