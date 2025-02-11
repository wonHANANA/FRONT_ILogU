import React, { useEffect, useState } from 'react';
import {
	BrowserRouter,
	Route,
	Router,
	useLocation,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import * as signUpS from './styles/Sign.Up.Main.Styles';
import * as signInRecoil from './recoil/Login.recoil.states';

import TermsOfUseAgree from './Sign.Up.TermsOfUse';
import SelectIsParent from './Sign.Up.isParent';
import SignUpGetInfo from './Sign.Up.parent.getInfo';
import SignUpInviteGetInfo from './Sign.Up.invite.getInfo';
import SimplePassWord from './Sign.Up.getInfo.SimplePW';

function SignUpMain() {
	const navigate = useNavigate();

	//유저의 답변
	const [inviteCode, setInviteCode] = useRecoilState(signInRecoil.inviteCode);
	const [relateName, setRelateName] = useRecoilState(signInRecoil.relateName);
	const [babyName, setBabyName] = useRecoilState(signInRecoil.babyName);
	const [babyBirth, setBabyBirth] = useRecoilState(signInRecoil.babyBirth);
	const [isBirthUpdate, setIsBirthUpdate] = useState(false);
	const [userNickName, setUserNickName] = useRecoilState(
		signInRecoil.userNickname,
	);
	const [userEmail, setUserEmail] = useRecoilState(signInRecoil.userEmail);
	const [userPassword_1, setUserPassword_1] = useState('');
	const [userPassword_2, setUserPassword_2] = useRecoilState(
		signInRecoil.userPassword,
	);
	const [goToSimplePassword, setGotoSimplePassword] = useRecoilState(
		signInRecoil.goToSimplePassword,
	);

	const [isNextBtnClicked, setIsNextBtnClicked] = useRecoilState(
		signInRecoil.isTermsOfAgreeBtnClicked,
	);
	const [isGetInfoBtnClicked, setIsGetInfoBtnClicked] = useRecoilState(
		signInRecoil.isGetInfoBtnClicked,
	);
	const [isChattingState, setIsChattingState] = useRecoilState(
		signInRecoil.isChattingState,
	);
	const [signUpType, setSignUpType] = useRecoilState(signInRecoil.signUpType);

	const handleBackwardClick = (e) => {
		e.preventDefault();
		setIsNextBtnClicked(false);
		setIsGetInfoBtnClicked(false);

		setInviteCode('');
		setRelateName('');
		setIsChattingState(true);
		setIsBirthUpdate(false);
		setUserEmail('');
		setBabyName('');
		setUserNickName('');
		setUserPassword_1('');
		setUserPassword_2('');
		setBabyBirth(new Date());
		setGotoSimplePassword(false);

		navigate(`/`);
	};
	//유저 회원정보 초기화
	useEffect(() => {
		setIsNextBtnClicked(false);
		setIsGetInfoBtnClicked(false);

		setIsChattingState(true);
		setIsBirthUpdate(false);
		setUserEmail('');
		setBabyName('');
		setUserNickName('');
		setUserPassword_1('');
		setUserPassword_2('');
		setBabyBirth(new Date());
		setGotoSimplePassword(false);
	}, []);

	//보여질 컴포넌트 수정
	let ComponentToShow;

	if (isNextBtnClicked === false) {
		ComponentToShow = TermsOfUseAgree;
	} else if (
		isNextBtnClicked === true &&
		isGetInfoBtnClicked === false &&
		goToSimplePassword == false
	) {
		ComponentToShow = SelectIsParent;
	} else if (
		isNextBtnClicked === true &&
		isGetInfoBtnClicked === true &&
		goToSimplePassword == false
	) {
		if (signUpType == 'parent') ComponentToShow = SignUpGetInfo;
		else if (signUpType == 'invite') ComponentToShow = SignUpInviteGetInfo;
	} else if (
		isNextBtnClicked === true &&
		isGetInfoBtnClicked === true &&
		goToSimplePassword == true
	) {
		setIsChattingState(false);
		ComponentToShow = SimplePassWord;
	}

	return (
		<>
			<signUpS.TopNavBar>
				<signUpS.TopBackwardArea
					onClick={(e) => handleBackwardClick(e)}
				></signUpS.TopBackwardArea>
				<signUpS.TopTextArea>회원가입</signUpS.TopTextArea>
			</signUpS.TopNavBar>
			<signUpS.SignUpMain isChattingState={isChattingState}>
				<ComponentToShow></ComponentToShow>
			</signUpS.SignUpMain>
		</>
	);
}

export default SignUpMain;
