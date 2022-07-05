const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

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
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      } );
    }
  }

  getIndex( id ) {
    if ( id === null ) {
      throw boom.badRequest( 'The product ID is necessary' );
    }

    const index = this.products.findIndex( ( item ) => { return( item.id === id ); } );
    if ( index === -1 ) {
      throw boom.notFound( 'The product with the ID "' + id + '" does not exists' );
    }

    if ( this.products[ index ].isBlocked === true ) {
      throw boom.unauthorized( 'The product with the ID "' + id + '" is blocked' );
    }

    return( index );
  }

  //--- Create ---
  async create( product ) { //(Receives JSON)
    const newProduct = {
      id: faker.datatype.uuid(),
      name: product.name,
      price: product.price,
      image: product.image,
      isBlocked: product.isBlocked || false
    }

    try {
      this.products.push( newProduct );
      return( newProduct );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while creating product' );
    }
  }

  //--- Read ---
  async read( id = null ) {
    if ( id !== null ) {
      const index = this.getIndex( id );
      return( this.products[ index ] );
    } else {
      return( this.products );
    }
  }

  //--- Update ---
  async update( id, data, type = 'patch' ) {
    const index = this.getIndex( id );

    let updatedProduct = {};

    if ( type === 'put' ) {
      updatedProduct = {
        ...data,
        id: this.products[ index ].id
      };
    } else if ( type === 'patch' ) {
      updatedProduct = {
        ...this.products[ index ],
        ...data,
        id: this.products[ index ].id
      }
    }

    try {
      this.products[ index ] = updatedProduct;
      return( this.products[ index ] );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while updating product with id ' + id );
    }
  }

  //--- Delete ---
  async delete( id = null ) {
    const index = this.getIndex( id );

    try {
      const deletedObject = this.products.splice( index, 1 )[ 0 ];
      return( deletedObject );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while deleting product with id ' + id );
    }
  }
}

module.exports = ProductServices;
