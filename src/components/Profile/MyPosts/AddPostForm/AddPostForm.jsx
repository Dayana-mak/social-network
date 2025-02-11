import { Field, reduxForm } from 'redux-form';
import { required, maxLengthConstructor } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/FormControls/FormControls';


const maxLength10 = maxLengthConstructor(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea}
             name="newPostText"
             placeholder="New post"
             validate={[required, maxLength10]} />
      <button>Addpost</button>
    </form>
  )
}

export default reduxForm({form: "profileAddPostForm"}) (AddPostForm)