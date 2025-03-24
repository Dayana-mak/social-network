import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export type RouterProps = {
  router: {
    location: ReturnType<typeof useLocation>
    navigate: ReturnType<typeof useNavigate>
    params: {userId?: string}
  }
}
function withRouter<P>(WrappedComponent: React.ComponentType<P & RouterProps>): React.FC<P> {

  const ComponentWithRouter = (props: P) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams<{userId?: string}>();
    const router = {location, navigate, params}

    return <WrappedComponent {...props} router={router}/>
  }

  return ComponentWithRouter;
}

export default withRouter;