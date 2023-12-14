
//Confirguracion estandar para las alertas del Login
const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' :
    'from-green-400 to-green-600'} bg-gradient-to-br text-center rounded-xl 
     text-white font-bold text-sm my-3 w-full py-2` } >
        {alert.msg}
    </div>
  )
}

export default Alert
