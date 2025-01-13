
const Loading = ({type} : {type?: string}) => {
  return (
    <span className={`loading loading-spinner loading-md ${type === 'black' && '!bg-black'}`}></span>
  )
}

export default Loading