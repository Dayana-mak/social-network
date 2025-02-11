import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { sendMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessage(newMessageBody));
    }
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthRedirect
)(Dialogs)


/* const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs) */

export default DialogsContainer;

/* function DialogsContainer(props) {
  const state = props.store.getState().dialogsPage;

  const sendMessage = ()=> {
    props.store.dispatch(sendMessageActionCreator())
  }

  const updateNewMessageText = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text))
  }
 
  return (
    <Dialogs updateNewMessageText={updateNewMessageText}
             sendMessage={sendMessage}
             dialogsPage={state}/>
  );
} */

