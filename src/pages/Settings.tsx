import {useState} from 'react';
import { useAppSelector, useUppDispatch} from '../store/store';
import {fetchUser} from '../store/slices/userInfoRequest';
import {settingsRequest} from "../store/slices/settingsRequest";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormSettings} from "./formTypes";


export const Settings = () => {
	const dispatch = useUppDispatch();
	const userInfo = useAppSelector((state) => state.userInfoRequest);
	const sattingsInfo = useAppSelector(state => state.settingsReq)
	const [error, setError] = useState<string>('');
	const [buttonChange, setButtonChange] = useState<boolean>(false);

	const { register, handleSubmit, formState } = useForm<FormSettings>({
		mode: 'onChange',
		defaultValues: {
			email: userInfo.email !== null ? userInfo.email : '',
			bio: userInfo.bio !== null ? userInfo.bio : '',
			image: userInfo.image !== null ? userInfo.image : '',
			username: userInfo.username,
		}
	})

	const onSubmit: SubmitHandler<FormSettings> = (data) => {
		setError('')
		setButtonChange(false)
		async function settingsDispatch() {
			try {
				await dispatch(settingsRequest({
					urlImage: data.image,
					username: data.username,
					bio: data.bio,
					email: data.email,
					password: data.password
				}))
				await dispatch(fetchUser())
			} catch {
				setError('Error public')
			}
		}
		settingsDispatch()
	}

	const emailError = formState.errors['email']?.message;
	const passwordError = formState.errors['password']?.message;
	const userNameError = formState.errors['username']?.message;

	return (
		<div className='settings-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Your Settings</h1>
							<ul className='error-messages'>
								{(sattingsInfo.error && (
									<li>{sattingsInfo.error}</li>
								))}
								{userNameError && <li>{userNameError}</li>}
								{emailError && <li>{emailError}</li>}
								{passwordError && <li>{passwordError}</li>}
								{error !== '' && <li>{error}</li>}
							</ul>
						<form onSubmit={handleSubmit(onSubmit)}>
							<fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control'
										type='text'
										placeholder='URL of profile picture'
										{...register('image', {
											onChange: e => setButtonChange(true)
										})}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control form-control-lg'
										type='text'
										placeholder='Your Name'
										{...register
										('username', {
											required: 'This field is required',
											onChange: e => setButtonChange(true),
											pattern: {
												value: /^[A-Za-zА-Яа-яЁё0-9]{3,14}$/,
												message: 'Invalid userName address'
											}
										})}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control form-control-lg'
										rows={8}
										placeholder='Short bio about you'
										{...register('bio', {
											onChange: e => setButtonChange(true)
										})}

									></textarea>
								</fieldset>
								<fieldset className='form-group'>
									<input className='form-control form-control-lg'
										   type='text'
										   placeholder='Email'
										   {...register('email', {
											   required: 'This field is required',
											   onChange: e => setButtonChange(true),
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
										placeholder='New Password'
										{...register
										('password', {
											onChange: e => setButtonChange(true),
											pattern: {
												value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,16}$/,
												message: 'Invalid password address'
											}
										})}
									/>
								</fieldset>

                                {(sattingsInfo.status !== 'success' || buttonChange) ?
                                    <button
                                       className='btn btn-lg btn-primary pull-xs-right'
                                       type='submit'>
                                        Update Settings
                                    </button> : ''
                                }
                            </fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
