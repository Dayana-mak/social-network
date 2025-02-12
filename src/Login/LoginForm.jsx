import { Field, reduxForm } from "redux-form"
import { Input } from "../components/common/FormControls/FormControls";
import { required } from "../utils/validators/validators";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Email"} 
               name={"email"} 
               component={Input}
               validate={required}/>
      </div>
      <div>
        <Field type="password" 
               placeholder={"Password"} 
               name={"password"} 
               component={Input}
               validate={required}/>
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

export default reduxForm({form: 'login'}) (LoginForm);