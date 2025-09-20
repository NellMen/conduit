import { useState, useEffect } from 'react';
import { Index } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Authentication } from './pages/Authentication';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { EditArticle } from './pages/EditArticle';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import { HeaderActive } from './layouts/HeaderActive';
import { useAppSelector, useUppDispatch } from "./store/store";
import { fetchUser } from "./store/slices/userInfoRequest";
import Article from "./pages/Article";

function App() {
	const dispatch = useUppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const isAuthenticated = useAppSelector(state => state.userInfoRequest.username);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (localStorage.length !== 0) {
					await dispatch(fetchUser()).unwrap();
				}
			} catch (error) {
				console.error('Authentication check failed:', error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{isAuthenticated ? <HeaderActive /> : <Header />}
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/article/:nameArticle' element={<Article />} />
				<Route path="/profile/:username" element={<Profile />} />
				{isAuthenticated ? (
					<>
						<Route path='/profile/settings' element={<Settings />} />
						<Route path='/editArticle' element={<EditArticle />} />
					</>
				) : (
					<>
						<Route path='/login' element={<Authentication />} />
						<Route path='/register' element={<Register />} />
					</>
				)}

				<Route path='*' element={<Index />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;