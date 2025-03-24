import preloader from "../../assets/images/preloader.svg"

const Preloader: React.FC = () => {
  return (
    <div>
      <img src={preloader} alt="Preloader" width={100}/>
    </div>
  )
}

export default Preloader