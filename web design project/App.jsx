import React, { useState } from 'react';
import Navigation from '/src/modules/Navigation.jsx';
import Home from '/src/modules/Home.jsx';
import Order from '/src/modules/Order.jsx';
import Gallery from '/src/modules/Gallery.jsx';
import Contact from '/src/modules/Contact.jsx';
import Topics from '/src/modules/Topics.jsx';
import OperaPage from '/src/modules/Operas/OperaPage.jsx';
import OperaAdd from '/src/modules/Operas/OperaAdd.jsx';
import OperaEdit from '/src/modules/Operas/OperaEdit.jsx';
import products from '/src/data/products.js';
import '/src/App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [opera, setOpera] = useState([])

  return (
    <>
      <header>
        <h1>Scott Dispensa</h1>
      </header>
      <Router>
      <Navigation /> 
    <main>
        <section>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/topics" element={<Topics />}></Route>
                <Route path="/gallery" element={<Gallery />}></Route>
                <Route path="/operaPage" element={<OperaPage setOpera={setOpera}/>}></Route>
                <Route path="/create" element={<OperaAdd />} />
                <Route path="/update" element={<OperaEdit operaToEdit={opera}/>} />
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/order" element={<Order products={products} />}></Route>
            </Routes>
        </section>
    </main>
</Router>
<footer>
    <p>&copy; 2024 Scott Dispensa </p>
</footer>
    </>
  )
}

export default App;
