const faker = require( 'faker' );

class ProductServices {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate( amount = 10 ) { //(Random creation)
    for ( let i = 0; i < amount; i++ ) {
      this.products.push( {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(), 10 ),
        image: faker.image.imageUrl()
      } );
    }
  }

  getIndex( id ) {
    if ( id === null ) {
      throw new Error( 'The product ID is necessary' );
    }

    const index = this.products.findIndex( ( item ) => { return( item.id === id ); } );
    if ( index === -1 ) {
      throw new Error( 'The product ID does not exists' );
    }

    return( index );
  }

  //--- Create ---
  async create( product ) { //(Receives JSON)
    const newProduct = {
      id: faker.datatype.uuid(),
      name: product.name,
      price: product.price,
      image: product.image
    }

    this.products.push( newProduct );

    return( newProduct );
  }

  //--- Read ---
  async read( id = null ) {
    if ( id !== null ) {
      const product = this.products.find( ( item ) => { return( item.id === id ); } );
      return( product );
    } else {
      return( this.products );
    }
  }

  //--- Update ---
  async update( id, data, type = 'patch' ) {
    const index = this.getIndex( id );

    if ( type === 'put' ) {
      this.products[ index ] = {
        id: this.products[ index ].id,
        ...data
      };
    } else if ( type === 'patch' ) {
      this.products[ index ] = {
        ...this.products[ index ],
        ...data
      }
    }

    return( this.products[ index ] );

  }

  //--- Delete ---
  async delete( id = null ) {
    const index = this.getIndex( id );

    const deletedObject = this.products.splice( index, 1 );

    return( deletedObject );
  }
}

module.exports = ProductServices;
