import Header from "./Header"
import Main from "./Main"

export default function CombinedHeaderMain({ dataUser, ...props }) {

  return (
      <>
       <Header dataUser={dataUser} />
       <Main
         name='main'
         {...props}
       />
      </>
  )
}
