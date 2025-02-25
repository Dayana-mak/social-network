import { maxLengthConstructor, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthConstructor(10);

 const AddMessageFormCopy = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea}
             name="newMessageBody"
             placeholder="Write message"
             validate={[required, maxLength10]}/>
      <button>Отправить</button>
    </form>
  )
} 

export default reduxForm({form: "dialogAddMessageForm"}) (AddMessageFormCopy)


