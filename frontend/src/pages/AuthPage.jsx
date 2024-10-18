import authScreenAtom from '../../atom/Authatom';
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import { useRecoilValue } from 'recoil';
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

	return(
   <>
   {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
   </>
   )
}

export default AuthPage
