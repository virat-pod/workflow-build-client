import Auth from "@/components/auth/auths"

export const metadata = {
  title: "Login | Workflows Builder",
  description: "Workflows Builder Login",
};

const Signup = () => {
  return (
    <Auth auth={{title: "Welcome back", whatis: "Get back to your discipline again.",value: "Don't have an account?",action: "SignUp", button: "Take me in →"}}/>
  )
}

export default Signup
