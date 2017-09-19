import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { deleteItem } from './deleteItem'
import { createItem } from './createItem'
import './style.css';
export default class Admin extends Component {

        constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            products:[],
            condition: false,
            item: {nombre:'', descripcion:'', alto:0,ancho:0,largo:0,urlImagen:'' } 
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.urlChange = this.urlChange.bind(this);
        this.highChange = this.highChange.bind(this);
        this.weightChange = this.weightChange.bind(this);
        this.longChange = this.longChange.bind(this);
        this.createProduct = this.createProduct.bind(this);
    } 

    handleDelete(data) {
      deleteItem(data._id);
  }
  handleClick() {
    this.setState( { condition : !this.state.condition } ); 
}

nameChange(event) {
  const target = event.target;
  const value = target.value;
  this.state.item.nombre = target.value;
      this.setState(prevState => ({
        item: this.state.item
      }));
  }
  descChange(event) {
  const target = event.target;
  const value = target.value;
  this.state.item.descripcion = target.value;
      this.setState(prevState => ({
        item: this.state.item
      }));
  }
  urlChange(event) {
  const target = event.target;
  const value = target.value;
  this.state.item.urlImagen = target.value;
      this.setState(prevState => ({
        item: this.state.item
      }));
  }
  highChange(event) {
    const target = event.target;
    const value = target.value;
    this.state.item.alto = target.value;
        this.setState(prevState => ({
          item: this.state.item
        }));
    }
    weightChange(event) {
      const target = event.target;
      const value = target.value;
      this.state.item.ancho = target.value;
          this.setState(prevState => ({
            item: this.state.item
          }));
      }  
      longChange(event) {
        const target = event.target;
        const value = target.value;
        this.state.item.largo = target.value;
            this.setState(prevState => ({
              item: this.state.item
            }));
        }

        createProduct(){
          createItem(this.state.item);
        }
    
        componentDidMount() {


          fetch('/products').then(res => res.json()).then(products => this.setState({
            products
        }));


            fetch('/cotizaciones').then(res => res.json()).then(quotes => this.setState({
                quotes
            }));
        }

  render() {
    return (        
      <div className="evr">

          <div className={this.state.condition ? "quoteBG active" :"quoteBG"}>
                    <div className={this.state.condition ? "quote active" :"quote"}>
                        <form onSubmit={this.concatanateProducts}>
                            <label>
                            Nombre:<input required type="text" value={this.state.item.nombre} onChange={this.nameChange} />
                            </label>
                            <label>
                            Descripci&oacute;n:<input required type="text" value={this.state.item.descripcion} onChange={this.descChange} />
                            </label>
                            <label>
                            Url Imagen:<input required type="text" value={this.state.item.urlImagen} onChange={this.urlChange} />
                            </label>
                            <label>
                            Alto(m):<input required type="number" value={this.state.item.alto} onChange={this.highChange} />
                            </label>
                            <label>
                            Ancho(m):<input required type="number" value={this.state.item.ancho} onChange={this.weightChange} />
                            </label>
                            <label>
                            Largo(m):<input required type="number" value={this.state.item.largo} onChange={this.longChange} />
                            </label>
                          <button onClick={this.createProduct.bind(this)}>Agregar Producto</button>
                        </form> 
                    </div>
                </div>


          < button onClick ={this.handleClick.bind(this)}
            className={this.state.condition ? "shoppingCart active" :"shoppingCart"} > </button>

        {this.state.products.map(product=> <div className="obj">
        < img src = {product.urlImagen} /> <h2> {product.nombre} </h2><br />
          <button onClick={() => {this.handleDelete(product)}} >Eliminar Item</button> 
      </div>)}
        
         {this.state.quotes.map(post =>
    <div  key = { post.id } className="product">
      <h1>{post.nombre}</h1>
      <h2>{post.email}</h2>
      <h3>{post.telefono}</h3>
      <h4>{post.fecha}</h4>
      <ul>
                
            {
                post.productos.map((subitem) => {
                  return (
                     <li>{subitem.nombre}</li>
                  )
                })
               }
        
        
      </ul>
    </div>
    )}
        
        
      </div>
    );
  }
}
