import { MoonLoader, ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <MoonLoader size={100} color="#15b1ee" />
    </div>
  )
}

export default LoadingSpinner
