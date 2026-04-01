import Auth from "@/components/auth/auths"

export const metadata = {
  title: "Signup | Workflows Builder",
  description: "Workflows Builder Signup",
};

const Signup = () => {
  return (
    <Auth auth={{whatis: "Create your account and start grinding.",value: "Already have an account?",action: "login", button: "Create account →"}}/>
  )
}

export default Signup
