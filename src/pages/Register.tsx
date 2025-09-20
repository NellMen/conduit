import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requests } from '../api';
import {fetchUser} from "../store/slices/userInfoRequest";
import {useUppDispatch} from "../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormRegister} from "./formTypes";


export const Register: React.FC = () => {
	const {register, handleSubmit, formState} = useForm<FormRegister>({
		mode: 'onChange',
	})

	const navigate = useNavigate();
	const dispatch = useUppDispatch();

	const [AlreadyTake, setAlreadyTake] = useState(1);

	const onSubmit: SubmitHandler<FormRegister> = (data) => {
		setAlreadyTake(1)
		async function postFetch() {
			try {
				await requests.signUp(data['email'], data['username'], data['password']);
				dispatch(fetchUser());
				navigate('/');
			} catch (error) {
				setAlreadyTake(0);
				console.error('Sign-up error:', error);
			}
		}
		postFetch()
	}

	const emailError = formState.errors['email']?.message;
	const passwordError = formState.errors['password']?.message;
	const loginError = formState.errors['username']?.message;

	return (
		<div className='auth-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Sign up</h1>
						<p className='text-xs-center'>
							<Link to='/login'>Have an account?</Link>
						</p>
						<ul className='error-messages'>
							{AlreadyTake === 0 ? <li>That email is already taken</li> : ''}
							{loginError && <li>{loginError}</li>}
							{emailError && <li>{emailError}</li>}
							{passwordError && <li>{passwordError}</li>}
						</ul>

						<form onSubmit={handleSubmit(onSubmit)}>
							<fieldset className='form-group'>
								<input
									className='form-control form-control-lg'
									type='text'
									placeholder='Username'
									{...register
									('username', {
										required: 'This field is required',
										pattern: {
											value: /^[A-Za-zА-Яа-яЁё0-9]{3,14}$/,
											message: 'Invalid userName address'
										}
									})}
								/>
							</fieldset>
							<fieldset className='form-group'>
								<input
									required={true}
									type='email'
									className='form-control form-control-lg'
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
								Sign up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
