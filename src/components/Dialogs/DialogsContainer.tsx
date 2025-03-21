import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { dialogsActions, InitialStateType } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  dialogsPage: InitialStateType
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, {sendMessage: dialogsActions.sendMessage}),
  withAuthRedirect
)(Dialogs)


export default DialogsContainer;


