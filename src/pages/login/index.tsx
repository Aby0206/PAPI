import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleLogin } from '@react-oauth/google';
import CircularProgress from '@mui/material/CircularProgress';
import CustomInput from '../../components/custom-input';
import Logo from '../../assets/images/simelabs-logo.svg';
import GoogleIcon from '../../assets/icons/google-icon.svg';
import {
	StyledLoginpage,
	StyledGoogleBtn,
	StyledButton,
	StyledErrorDiv,
} from './styledComponents';
import { useLoginMutation,useLoginGoogleMutation } from '../../redux/services/LoginApi';
const baseEmail = import.meta.env.VITE_BASE_EMAIL

type FormInputs = {
	username: string;
	password: string;
};

let validationSchema = yup.object().shape({
	username: yup.string().matches(
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		'Please enter a valid email!'
	)
		.min(8, 'Username is too short, please enter a longer username.')
		.max(254, 'Username is too long, please enter a shorter username.')
		.required('Username is required'),
	password: yup.string()
		.min(8, 'Password is too short, please enter a longer password.')
		.max(64, 'Password is too long, please enter a shorter password.')
		.required('Password is required'),
});

const LoginPage: React.FC = () => {
	let googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	let googleClientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
	const [commonError, setCommonError] = useState('');
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const usernameController = useController({
		name: 'username',
		control,
		defaultValue: '',
	});

	const passwordController = useController({
		name: 'password',
		control,
		defaultValue: '',
	});

	const [loginMutation, { isLoading }] =
		useLoginMutation();
	const [LoginGoogleMutation] = useLoginGoogleMutation()
	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		try {
			let responseData = await loginMutation({
				email: data?.username,
				password: data?.password,
			}).unwrap();
			if (responseData?.access) {
				navigate('/home');
			} else {
				setCommonError('Oops. Something went wrong.');
			}
		} catch (err: any) {
			setCommonError(`${err?.status} - ${err?.data?.detail}`);
		}
	};
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			try {
				const tokens = await axios.post('https://oauth2.googleapis.com/token', {
					code: codeResponse.code,
					client_id: googleClientId,
					client_secret: googleClientSecret,
					redirect_uri: 'postmessage',
					grant_type: 'authorization_code',
				});
				fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens?.data?.access_token}`).then((res) => res.json()).then(async (data) => {
					if (data.email.split("@")[1] === baseEmail) {
						let responseData = await LoginGoogleMutation({
							id_token: tokens?.data?.id_token,
							access_token: tokens?.data?.access_token,
						}).unwrap();

						if (responseData?.access_token) {
							navigate('/home');
						} else {
							setCommonError('Oops. Something went wrong.');
						}
					}
					else {
						setCommonError(`Not a simelabs Gmail Account`);
					}


				})
			}
			catch (err: any) {
				setCommonError(`${err?.status} - ${err?.data?.detail}`);

			}
		},

		flow: 'auth-code',
	});

	return (
		<StyledLoginpage>
			<img src={Logo} alt="logo" />
			<div className="login-label">Login to your account</div>
			<StyledGoogleBtn onClick={() => handleGoogleLogin()}>
				<img src={GoogleIcon} alt="google-icon" />
				<span>Sign in with Google</span>
			</StyledGoogleBtn>
			<div className="signin-email">
				<span className="line" />
				<span>or sign in with email</span>
				<span className="line" />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} className='form-div'>
				<CustomInput
					type="text"
					label="Username or Email"
					name="username"
					placeholder=""
					value={usernameController.field.value}
					error={!!errors?.username}
					helperText={errors?.username?.message || ''}
					validation={{
						required: 'This is required field.',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Please enter a valid email !',
						},
						maxLength: {
							value: 254,
							message: 'This input exceed maxLength.',
						},
					}}
					onChange={(value: string) => {
						setCommonError('');
						usernameController.field.onChange(value);
					}}
				/>
				<div className='pswd-div'>
					<CustomInput
						type="password"
						label="Password"
						name="password"
						link={{ to: '/forgot', label: 'Forgot?' }}
						placeholder=""
						value={passwordController.field.value}
						error={!!errors?.password}
						helperText={errors?.password?.message || ''}
						onChange={(value: string) => {
							setCommonError('');
							passwordController.field.onChange(value);

						}}
					/></div>
				<StyledButton
					type="submit"
					disabled={isSubmitting || !isValid || isLoading}
				>
					{isLoading ? <CircularProgress /> : 'Sign In'}
				</StyledButton>
				{commonError && <StyledErrorDiv>{commonError}</StyledErrorDiv>}
			</form>
		</StyledLoginpage>
	);
};

export default LoginPage;