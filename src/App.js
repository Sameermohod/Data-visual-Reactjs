import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"
import Dashboard from "./components/Dashboard"
import Sidebar1 from "./components/Sidebar1"
import { Route,Routes, } from "react-router-dom"
const App = () => {
  return (
    <div className="flex" >
    <div>

  
    <Sidebar1 />

    </div>
    <div className="">

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/form" element={<ContactForm />} />
    </Routes>
    
    </div>


    </div>
  )
}
export default App