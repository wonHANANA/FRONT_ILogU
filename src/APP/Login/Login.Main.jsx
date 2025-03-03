import React, { useEffect, useState } from 'react';
import {
	BrowserRouter,
	Route,
	Router,
	useLocation,
	Routes,
	useNavigate,
} from 'react-router-dom';
//Styles
import * as mainS from './styles/Sign.Main.Styles';
import * as signInS from './styles/Sign.In.Styles';
//recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import * as signInRecoil from './recoil/Login.recoil.states';
import * as signInApi from './apis/Signup.API';

function LoginMain() {
	const handleSignUpBtn = (e) => {
		e.preventDefault();
		navigate('signup');
	};
	const handleSignInBtn = (e) => {
		e.preventDefault();
		navigate('/signin');
	};
	const [isChattingState, setIsChattingState] = useRecoilState(
		signInRecoil.isChattingState,
	);

	const navigate = useNavigate();
	const [isLoginAvailable, setIsLoginAvailable] = useState(false);
	const [idInput, setIdInput] = useState('');
	const [pwInput, setPwInput] = useState('');
	const [isCheckboxClicked, setIsCheckboxClicked] = useState(
		localStorage.getItem('isCheckboxClicked'),
	);
	const [userFamilyType, setUserFamilyType] = useRecoilState(
		signInRecoil.familyType,
	);

	const handleBackwardClick = (e) => {
		navigate(`/`);
	};

	const handleIdEnter = (e, type) => {
		const inputValue = e.target.value;
		if (type == 'id') {
			setIdInput(inputValue);

			if (inputValue.length === 0 || pwInput.length === 0) {
				setIsLoginAvailable(false);
			} else {
				setIsLoginAvailable(true);
			}
		}
		if (type == 'pw') {
			setPwInput(e.target.value);

			if (inputValue.length === 0 || idInput.length === 0) {
				setIsLoginAvailable(false);
			} else {
				setIsLoginAvailable(true);
			}
		}
	};

	const handleLoginBtn = async (e) => {
		e.preventDefault();

		const response = await signInApi.SignInUser(idInput, pwInput);

		if (response.isSuccess == false) {
			alert('아이디/비밀번호를 다시 확인해주세요.');
			setIdInput('');
			setPwInput('');
		} else {
			const accessToken = response.result.accessToken;
			const refreshToken = response.result.refreshToken;
			localStorage.setItem('access', accessToken);
			localStorage.setItem('refresh', refreshToken);
			localStorage.setItem('userType', response.result.familyType);
			localStorage.setItem('userProfile', response.result.imageUrl);
			const userType = localStorage.getItem('userType');

			if (userType === 'PARENTS') navigate('/home');
			else if (userType === 'OTHERS') navigate('/family');
		}
	};

	const handleAutoLoginBtn = (e) => {
		setIsCheckboxClicked(!isCheckboxClicked);
	};

	const handleToSingUp = () => {
		navigate('/signup');
	};

	useEffect(() => {}, [setIsChattingState(false)]);
	return (
		<mainS.MainScreenWrapper>
			<mainS.MainLogoArea>
				<mainS.MainLogo></mainS.MainLogo>
			</mainS.MainLogoArea>
			<signInS.MainWrapper>
				<signInS.RecommendIdPwWrapper>
					<signInS.RecommendIcon></signInS.RecommendIcon>
					<signInS.RecommendText>
						테스트 계정으로 로그인해보세요<br></br> ID: onehana / PW: onehana1!
					</signInS.RecommendText>
				</signInS.RecommendIdPwWrapper>
				<signInS.SignInWrapper>
					<signInS.userInput
						type="text"
						placeholder="아이디"
						placeholderTextColor="#797A7A"
						onChange={(e) => handleIdEnter(e, 'id')}
						value={idInput}
					></signInS.userInput>
					<signInS.userInput
						type="password"
						placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
						placeholderTextColor="#797A7A"
						onChange={(e) => handleIdEnter(e, 'pw')}
						value={pwInput}
					></signInS.userInput>
					<signInS.SignInTextWrapper>
						<signInS.AutoSignInWrapper>
							<signInS.AutoSignInBox
								isCheckboxClicked={isCheckboxClicked}
								onClick={(e) => handleAutoLoginBtn(e)}
							></signInS.AutoSignInBox>
							자동 로그인
						</signInS.AutoSignInWrapper>
						<signInS.FindPassword>비밀번호 찾기</signInS.FindPassword>
					</signInS.SignInTextWrapper>
				</signInS.SignInWrapper>
				<signInS.SignInBtn
					isAvailable={isLoginAvailable}
					onClick={handleLoginBtn}
				>
					로그인
				</signInS.SignInBtn>
				<div style={{ marginTop: '15px' }}>
					<signInS.SignUpTitle>계정이 없으신가요?</signInS.SignUpTitle>
					<signInS.SignUpBtn onClick={handleToSingUp}>
						회원가입하기
					</signInS.SignUpBtn>
				</div>
			</signInS.MainWrapper>
		</mainS.MainScreenWrapper>
	);
}

export default LoginMain;
