import { useEffect, useState } from "react";
import './App.css';

//Lista de objetos para popular a visualização inicial de serviços/produtos
const productList = [
  { id: 1, name: 'Ração ROYAL CANIN', description: 'Para Gatos Adultos Com Tendencia De Obesidade, Frango', price: '239.99', weight: '5', category: 'ração', species: 'gato' },
  { id: 2, name: 'Banho cachorro', description: 'Grande porte, com adereços', price: '150', weight: '20', category: 'banho', species: 'cachorro' },
  { id: 3, name: 'Tosa coelho', description: 'Completa, Pequeno porte', price: '150', weight: '5', category: 'tosa', species: 'coelho' },
  { id: 4, name: 'Ração Adimax', description: 'Ração Origens Class Cães Porte Médio E Grande Carne E Frango', price: '130.40', weight: '15', category: 'ração', species: 'cachorro' },
  { id: 5, name: 'Ração Whiskas', description: 'Ração Para Gatos Sabor Peixe, Adultos', price: '19.90', weight: '1', category: 'ração', species: 'gato' },
  { id: 6, name: 'Ração PEDIGREE', description: 'Ração Pedigree Para Cães Adultos Raças Pequenas', price: '139.99', weight: '10', category: 'ração', species: 'cachorro' },
  { id: 7, name: 'Banho cachorro', description: 'Pequeno porte, sem adereços', price: '50', weight: '5', category: 'banho', species: 'cachorro' },
  { id: 8, name: 'Ração Purina Alpo', description: 'Ração Cães Adultos Carne E Frango', price: '99.89', weight: '10', category: 'ração', species: 'cachorro' },
  { id: 9, name: 'Tosa cachorro', description: 'Completa, Pequeno porte', price: '100', weight: '5', category: 'tosa', species: 'cachorro' },
  { id: 10, name: 'Ração Affinity GranPlus', description: 'Choice Cães Adultos Frango Carne', price: '148.47', weight: '15', category: 'ração', species: 'cachorro' }
]

const App = () => {
  //Inicialização dos arrays que vou utilizar
  const [products, setProducts] = useState(productList);
  const [serviceToSearch, setService] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState(products);

  //Atualiza o array matchedProducts sempre que products é alterado e limpa a input de pesquisa
  useEffect(() => {
    setMatchedProducts(products);
    setService('');
  }, [products]);

  //Abre o modal no modo edição ou inserção, de acordo com o mode passado
  const openModal = (mode, product) => {
    setCurrentService(mode === 'edit' ? product : null);
    setIsModalOpen(true);
  };

  //Fecha o modal 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  function Modal() {
    //Objeto momentaneo criado para popular o que está sendo inserido no formulário de adicionar/editar
    const [formData, setFormData] = useState({});

    //Preenche formulário com o que tem em currentService
    useEffect(() => {
      if (currentService) {
        setFormData(currentService)
      }
    }, [])

    //Atualiza o formulário enquanto o preenchimento é feito, a cada alteração
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    //Encaminha o salvamento do formulário para sobrescrever um objeto existente (edição) ou criar um novo objeto (inserção)
    const saveService = () => {
      if (currentService) {
        editService();
      } else {
        addService();
      }
    }

    //Lógica para salvar um novo produto/serviço
    const addService = () => {
      let newId = ++products.length;
      const newProduct = {
        id: newId,
        ...formData,
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight)
      };

      if (newProduct && newProduct !== undefined) {
        setProducts((prevProducts) => {
          const newList = [...prevProducts, newProduct]
          return newList.filter(product => product !== undefined)
        });
      }

      //Fechamento do modal após a inclusão
      closeModal();
    };

    //Lógica para salvar um produto/serviço editado
    const editService = () => {
      setProducts(prevService =>
        prevService.map(service =>
          service.id === formData.id ? { ...service, ...formData } : service
        )
      );

      //Fechamento do modal após a edição
      closeModal();
    };

    //Renderização do modal do formulário de inclusão/edição de produtos ou serviços
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Detalhes dos serviços/produtos</h2>
          <div className="infos">
            <div>
              <label>Título</label><input name="name" value={formData.name} onChange={handleChange} /><br />
              <label>Descrição</label><input name="description" value={formData.description} onChange={handleChange} /><br />
              <label>Categoria</label><input name="category" value={formData.category} onChange={handleChange} /><br />
            </div>
            <div>
              <label>Preço</label><input name="price" value={formData.price} onChange={handleChange} /><br />
              <label>Peso</label><input name="weight" value={formData.weight} onChange={handleChange} /><br />
              <label>Espécie</label><input name="species" value={formData.species} onChange={handleChange} /><br />
            </div>
          </div>
          <button onClick={closeModal}>Cancelar</button>
          <button onClick={saveService}>Salvar</button>
        </div>
      </div>
    );
  }

  //Lógica para remover um objeto de acordo com o id
  const removeService = (product) => {
    const listWithoutProduct = products.filter(prod => prod.id !== product.id);
    setProducts(listWithoutProduct);
  }

  //Método de apoio para salvar o valor inserido na input de busca enquanto está sendo digitado
  const handleSearchChange  = (event) => {
    setService(event.target.value);
  };

  //Lógica de pesquisa com nameWords e descriptionWords separando cada palavra existente em name e description e depois verificando quais objetos contem o valor inserido na input de busca
  const searchService = (service) => {
    const newMatchedProducts = products.filter(product => {
      const nameWords = product.name.toLowerCase().split(' ');
      const descriptionWords = product.description.toLowerCase().split(' ');
      const searchWord = service.toLowerCase().trim();
      return nameWords.includes(searchWord) || descriptionWords.includes(searchWord);
    });

    //Retorno que renderiza a listagem de produtos/serviços. Caso exista um filtro, retorna somente os correspondentes; caso não, retorna todos da lista
    if (newMatchedProducts.length > 0) {
      setMatchedProducts(newMatchedProducts);
    } else {
      setMatchedProducts(products);
    }
  };

  //Renderização da listagem de serviços/produtos
  return (
    <div>
      <header>
        <div>
          <span>
            {/* Logo do site */}
            <img src="https://i.pinimg.com/736x/3d/2d/3b/3d2d3bef6983ee086e2a102689150baf.jpg" alt="logo" height="80vh"></img>
          </span>
          <span className="inputToSearch">
            {/* Input de pesquisa e icone de lupa */}
            <input type="text" placeholder="Digite o que procura" value={serviceToSearch} onChange={handleSearchChange}></input>
            <img src="https://cdn4.iconfinder.com/data/icons/laboratory-equipment-9/512/Magnifier-512.png" className="icons" alt="Editar" onClick={() => searchService(serviceToSearch)} />
          </span>
        </div>
        <hr></hr>
        <nav>
          {/* Nav fictícia para navegação do site, apenas como enfeite */}
          <span className="navOptions">Gerenciar serviços/produtos</span>
          <span className="navOptions">Localizar uma loja</span>
          <span className="navOptions">Promoções para colaboradores</span>
          <span className="navOptions">Suporte</span>
        </nav>
      </header>
      {/* Banner do site com informações sobre o gerenciador */}
      <div className="banner">
        <div>
          <h2>Gerenciador de serviços/produtos</h2>
          <p>Sistema para visualizar, inserir, editar ou excluir serviços/produtos <br></br> oferecidos pelo Pet Shop</p>
        </div>
        {/* Opção de adicionar produto/serviço */}
        <div className="addService">
          Não encontrou o serviço ou produto que busca? <span className="addServiceOpenModal" onClick={() => openModal('add')}>Adicionar</span>
        </div>
      </div>
      {/* Body do site */}
      <div className="background">
        <div className="buttons">
          {/* Botão de opção para adicionar serviço/produto */}
          <span><button onClick={() => openModal('add')}>Adicionar serviço</button></span>
        </div>
        <div className="container">
          <div>
            {/* Exibição dos atuais objetos na lista. Depois de qualquer ação (inserção, edição ou exclusão), a exibição é atualizada */}
            {matchedProducts.map(product => (
              <div key={product.id} className="product">
                <div>
                  <span>
                    <b>{product.name}</b> <br></br>
                    {product.description} | {product.weight}kg | R${product.price} <br></br>
                  </span>
                </div>
                <div>
                  {/* Icones de ação para editar ou excluir o serviço com id correspondente na exibição */}
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoP4gGwwlUltwYf7JY9PO2Y22V8cGHlxIgnTeqRoztQ&s" className="icons" alt="Editar" onClick={() => openModal('edit', product)} />
                  <img src="https://cdn-icons-png.freepik.com/256/12713/12713112.png?semt=ais_hybrid" className="icons" alt="Remover" onClick={() => removeService(product)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chamada para abrir ou fechar o modal */}
      {isModalOpen && <Modal />}
    </div>
  );
};

export default App;
