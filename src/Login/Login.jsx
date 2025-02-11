import { Field, reduxForm } from "redux-form"

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field type="text" placeholder={"Login"} name={"login"} component={"input"}/>
      </div>
      <div>
        <Field type="password" placeholder={"Password"} name={"password"} component={"input"}/>
      </div>
      <div>
        <Field type="checkbox"
               placeholder={"Remember me" }
               name={"rememberMe"} 
               component={"input"}/>
         remember me
      </div>
      <div>
        <button>login</button>
        </div>
    </form>
  )
}

const LoginReduxFrom = reduxForm({form: 'login'}) (LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData)
  }
  
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxFrom onSubmit={onSubmit}/>
    </div>
  )
}

export default Login;