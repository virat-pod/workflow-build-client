import Auth from "@/components/auth/auths"

const Signup = () => {
  return (
    <Auth auth={{title: "Welcome back", whatis: "Get back to your discipline again.",value: "Don't have an account?",action: "SignUp", button: "Take me in →"}}/>
  )
}

export default Signup
