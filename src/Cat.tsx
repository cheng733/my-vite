import { createPortal } from "react-dom"

const Cat = () => {
  return   createPortal(<div>
        <div>1212</div>
    </div>, document.body)
}

export default Cat