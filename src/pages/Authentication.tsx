import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { requests } from '../api';
import {fetchUser} from "../store/slices/userInfoRequest";
import {useUppDispatch} from "../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormAuth} from "./formTypes";


export const Authentication = () => {
	const navigate = useNavigate();
	const {register, handleSubmit, formState} = useForm<FormAuth>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<FormAuth> = (data) => {
		setError(false)
		const signUpUser = async () => {
			try {
				await requests.singIn(data['email'], data['password']);
				dispatch(fetchUser());
				navigate('/');
			} catch (error) {
				console.error('Sign-up error:', error);
				setError(true);
			}
		};
		signUpUser()
	}

	const emailError = formState.errors['email']?.message;
	const passwordError = formState.errors['password']?.message;

	const dispatch = useUppDispatch();
	const [error, setError] = useState(false);


	return (
		<div className='auth-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Sign in</h1>
						<p className='text-xs-center'>
							<Link to='/register'>Need an account?</Link>
						</p>
						<ul className='error-messages'>
							{error && <li>That email is already taken</li>}
							{emailError && <li>{emailError}</li>}
							{passwordError && <li>{passwordError}</li>}
						</ul>
						<form onSubmit={handleSubmit(onSubmit)}>
							<fieldset className='form-group'>
							<input
									className='form-control form-control-lg'
									type='text'
									placeholder='Email'
									{...register('email', {
										required: 'This field is required',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: 'Invalid email address'
										}
									})}
								/>
							</fieldset>
							<fieldset className='form-group'>
								<input
									className='form-control form-control-lg'
									type='password'
									placeholder='Password'
									{...register
									('password', {
										required: 'This field is required',
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,16}$/,
											message: 'Invalid password address'
										}
									})}
								/>
							</fieldset>
							<button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
