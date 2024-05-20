import { useState } from "react";
import './App.css';

const products = [
  { id: 1, name: 'Ração ROYAL CANIN', description: 'Para Gatos Adultos Com Tendencia De Obesidade, Frango', price: 239.99, weight: 5, category: 'ração', species: 'gato'},
  { id: 2, name: 'Banho cachorro', description: 'Grande porte, com adereços', price: 150, weight: 20, category: 'banho', species: 'cachorro' },
  { id: 3, name: 'Tosa coelho', description: 'Completa, Pequeno porte', price: 150, weight: 5, category: 'tosa', species: 'coelho' },
  { id: 4, name: 'Ração Adimax', description: 'Ração Origens Class Cães Porte Médio E Grande Carne E Frango', price: 130.40, weight: 15, category: 'ração', species: 'cachorro' },
  { id: 5, name: 'Ração Whiskas', description: 'Ração Para Gatos Sabor Peixe, Adultos', price: 19.90, weight: 1, category: 'ração', species: 'gato' },
  { id: 6, name: 'Ração PEDIGREE', description: 'Ração Pedigree Para Cães Adultos Raças Pequenas', price: 139.99, weight: 10, category: 'ração', species: 'cachorro' },
  { id: 7, name: 'Banho cachorro', description: 'Pequeno porte, sem adereços', price: 50, weight: 5, category: 'banho', species: 'cachorro' },
  { id: 8, name: 'Ração Purina Alpo', description: 'Ração Cães Adultos Carne E Frango', price: 99.89, weight: 10, category: 'ração', species: 'cachorro' },
  { id: 9, name: 'Tosa cachorro', description: 'Completa, Pequeno porte', price: 100, weight: 5, category: 'tosa', species: 'cachorro' },
  { id: 10, name: 'Ração Affinity GranPlus', description: 'Choice Cães Adultos Frango Carne', price: 148.47, weight: 15, category: 'ração', species: 'cachorro' }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [serviceToSearch, setService] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function Modal({ closeModal }) {
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Detalhes dos serviços/produtos</h2>
        <div className="infos">
          <div>
              <label>Título </label><input></input><br></br>
              <label>Descrição </label><input></input><br></br>
              <label>Categoria </label><input></input><br></br>
            </div>
            <div>
              <label>Preço </label><input></input><br></br>
              <label>Peso </label><input></input><br></br>
              <label>Espécie </label><input></input><br></br>
            </div>
          </div>
          <button onClick={closeModal}>Fechar</button>
         {/*<button onClick={addService()}>Salvar</button>     -------- ajustar metodo de salvar */} 
        </div>
      </div>
    );
  }

  const addService= (product) => {
    const updatedCart = cart.filter(prod => prod.id === product.id);

    if (updatedCart.length === 0) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
    }

    product.quantity++;

    const updatedTotal = total + product.price;
    setTotal(parseFloat(updatedTotal.toFixed(2)));
  };

  const removeToCart = (product) => {
    const updatedCart = cart.filter(prod => prod.id === product.id);

    if (updatedCart.length === 1) {
      if (product.quantity === 1) {
        const updatedCart2 = cart.filter(prod => prod.id !== product.id);
        setCart(updatedCart2);
      }
    }

    product.quantity--;

    const updatedTotal = total - product.price;
    setTotal(parseFloat(updatedTotal.toFixed(2)));
  };

  const saveServiceToSearch = (event) => {
    setService(event.target.value);
  };

  const searchService = (service) => {
    if(service !== '') {
      console.log(service);
    }
  };

  return (
    <div>
      <header>
        <div>
          <span>
            <img src="https://i.pinimg.com/736x/3d/2d/3b/3d2d3bef6983ee086e2a102689150baf.jpg" alt="logo" height="80vh"></img>
          </span>
          <span className="inputToSearch">
            <input type="text" placeholder="Digite o que procura" value={serviceToSearch} onChange={saveServiceToSearch}></input>
            <img src="https://cdn4.iconfinder.com/data/icons/laboratory-equipment-9/512/Magnifier-512.png" className="icons" alt="Editar" onClick={() => searchService(serviceToSearch)}/>
          </span>
        </div>
        <hr></hr>
        <nav>
          <span className="navOptions">Gerenciar serviços/produtos</span>
          <span className="navOptions">Localizar uma loja</span>
          <span className="navOptions">Promoções para colaboradores</span>
          <span className="navOptions">Suporte</span>
        </nav>
      </header>
      <div className="banner">
        <div>
          <h2>Gerenciador de serviços/produtos</h2>
          <p>Sistema para visualizar, inserir, editar ou excluir serviços/produtos <br></br> oferecidos pelo Pet Shop</p>
        </div>
        <div className="addService">
          Não encontrou o serviço ou produto que busca? <span className="addServiceOpenModal" onClick={openModal}>Adicionar</span>
        </div>
      </div>
      <div className="background">
      <div className="buttons">
        <span><button>Filtrar serviço</button></span>
        <span><button onClick={openModal}>Adicionar serviço</button></span>
      </div>
        <div className="container">
          <div>
            {products.map(product => (
              <div key={product.id} className="product">
                <div>
                  <span>
                  <b>{product.name}</b> <br></br>
                  {product.description} | {product.weight}kg | R${product.price.toFixed(2)} <br></br>
                  </span>
                </div>
                <div>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoP4gGwwlUltwYf7JY9PO2Y22V8cGHlxIgnTeqRoztQ&s" className="icons" alt="Editar" onClick={openModal}/>
                  <img src="https://cdn-icons-png.freepik.com/256/12713/12713112.png?semt=ais_hybrid" className="icons" alt="Remover" onClick={() => removeToCart(product)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default App;
